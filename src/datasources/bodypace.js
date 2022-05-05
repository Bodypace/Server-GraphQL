const { RESTDataSource } = require('apollo-datasource-rest');

class BodypaceAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://127.0.0.1:3030/';
  }

  willSendRequest(request) {
    const { method, path } = request
    if (method !== "POST" && path !== "authentication") {
      request.headers.set('Authorization', this.context.auth);
    }
  }

  async onData(responsePromise, { reducer = undefined, onlyFirstResult = false } = {}) {
    const response = await responsePromise

    if (response.code !== undefined && response.code !== 200) {
      return []
    }

    if (response.total === undefined || response.total === 0) {
      return []
    }

    return reducer !== undefined
      ? onlyFirstResult
        ? reducer(response.data[0])
        : response.data.map(reducer)
      : onlyFirstResult
        ? response.data[0]
        : response.data
  }

  async nullOn404(responsePromise) {
    const response = await responsePromise

    if (response.code !== undefined && response.code === 404) {
      return null
    }

    return reponse
  }

  async loginUser(email, password) {
    const response = await this.post('authentication', { strategy: 'local', email, password })

    if (!response.accessToken) {
      return null
    }

    return {
      token: response.accessToken,
    }
  }

  async getUser() {
    return this.onData(
      this.get('users'),
      {
        onlyFirstResult: true,
        reducer: user => ({
          email: user.email,
          glassSize: user.glassSize,
          language: 'english',
          currency: 'USD'
        })
      }
    )
  }

  // Goal

  getGoals() {
    return this.onData(this.get('goals'))
  }

  getGoal(day) {
    // this has daySince
    return this.onData(this.get('goals', { id: 4 }), {
      onlyFirstResult: true
    })
  }

  patchGoal(id, data) {
    return this.patch(`goals/${id}`, data)
  }

  // Meal

  createMeal(data) {
    return this.post('meals', data)
  }

  getMeals() {
    return this.onData(this.get('meals'))
  }

  getMeal(id) {
    return this.get(`meals/${id}`)
  }

  patchMeal(id, data) {
    return this.patch(`meals/${id}`, data)
  }

  deleteMeal(id) {
    return this.delete(`meals/${id}`)
  }

  // MealTime

  getMealTimes(day) {
    return this.onData(this.get('mealtimes', { day }))
  }

  patchMealTime(id, data) {
    return this.patch(`mealtimes/${id}`, data)
  }

  // Water

  getWater(day) {
    return this.onData(this.get('water', { day }))
  }

  // Eat

  getEats(mealTimeId) {
    return this.onData(this.get('eats', { MealTimeId: mealTimeId }))
  }

  patchEat(id, data) {
    return this.patch(`eats/${id}`, data)
  }

  // Buy

  getBuy(id) {
    return this.nullOn404(this.get(`buys/${id}`))
  }

  // Product

  getProduct(id) {
    return this.get(`products/${id}`)
  }
}

module.exports = BodypaceAPI

import os


def join(a):
  return str.join("", a)

import_template = \
"""const {{
  typeDefs: {typename},
  resolvers: {filename}Resolvers
}} = require('./{folder}/{filename}')
"""

def get_typename(filename):
  return filename[0].upper() + filename[1:-3]

def format_import_template(folder, filename):
  return import_template.format(
    folder=folder,
    typename=get_typename(filename),
    filename=filename[:-3]
  )

def import_code(folder):
  return join(
    [format_import_template(folder, filename) for filename in os.listdir(folder)]
  )

typedef_template = "  {},\n"

def typedef_code(folder):
  return join(
    [typedef_template.format(get_typename(filename)) for filename in os.listdir(folder)]
  )

resolver_template = "  {}Resolvers,\n"

def resolver_code(folder):
  return join(
    [resolver_template.format(filename[:-3]) for filename in os.listdir(folder)]
  )

base = \
"""const Base = gql`
  # scalar Date 

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
"""

if __name__ == '__main__':
  code = join([
    "const { gql } = require('apollo-server')\n",
    "const { merge } = require('lodash')\n",
    import_code('basic'),
    import_code('screens'),
    "\n\n",
    base,
    "\n",
    "const typeDefs = [\n",
    "  Base,\n",
    typedef_code('basic'),
    typedef_code('screens'),
    "]",
    "\n\n",
    "const resolvers = merge({},\n",
    resolver_code('basic'),
    resolver_code('screens'),
    ")",
    "\n\n",
    "module.exports = { typeDefs, resolvers }"
  ])

  print(code)

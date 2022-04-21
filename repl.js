#!/bin/node
var repl = require("repl");

// A "local" node repl with a custom prompt
var local = repl.start(`client::REST> `);

const { ApolloClient, gql } = require("@apollo/client")

const client = new ApolloClient({
  uri: 'https://127.0.0.1:4000'
  // cache: new InMemoryCache()
});

// Exposing stuff to the local REPL's context.
local.context.client = client

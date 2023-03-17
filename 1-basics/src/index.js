 import { createServer } from 'node:http'
 import { createSchema, createYoga } from 'graphql-yoga'
 
/**
 * 5 Main types:
 * Scalar Types: String, Boolean, Int, Float, ID (unique to graphql)
 * A scalar type is a type that stores a single value 
 */
const schema = createSchema({
    typeDefs: /*Type definition */`
   type Query {
     me: User!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`,
resolvers: {
    Query: {
      me() {
        return {
            id: 'gattini12345',
            name: 'sasha',
            email: 'sasha@gattini.com'
        }
      }
    }
 }
})

// Create a yoga instance with a Graphql Schema 
const yoga = createYoga({ schema })
const server = createServer(yoga)

server.listen(4000, () => {
    console.info('The server is up on http://localhost:4000/graphql')
})
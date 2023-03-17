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
     greeting(name: String, position: String): String!
     me: User!
     firstPost: Post!
     add(a: Float!, b: Float!): Float!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`,
resolvers: {
    Query: {
      greeting(parent, args, ctx, info) {
        if (args.name, args.position) {
            return `Hello ${args.name}, you're my favorite ${args.position.toLowerCase()}`
        }
        return 'Hello' 
      },
      add(parent, args, ctx, info) {
        
            return args.a + args.b
       
        
      },
      me() {
        return {
            id: 'gattini12345',
            name: 'sasha',
            email: 'sasha@gattini.com'
        }
      },
      firstPost() {
        return {
         id: 'firstpost12345',
         title: 'Beware!',
         body: 'Sasha The Cat is online again!',
         published: true
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
 import { createServer } from 'node:http'
 import { createSchema, createYoga } from 'graphql-yoga'
 


const schema = createSchema({
    typeDefs: /*Type definition */`
   type Query {
      hello: String!
      name: String!
      location: String!
      bio: String!
   }
`,
resolvers: {
    Query: {
       hello() {
        return 'This is my first query!'
       },
       name() {
        return 'Sasha'
       },
       location() {
        return 'Turin'
       },
       bio() {
        return 'I like cats'
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
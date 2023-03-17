 import { createServer } from 'node:http'
 import { createSchema, createYoga } from 'graphql-yoga'
 
/**
 * 5 Main types:
 * Scalar Types: String, Boolean, Int, Float, ID (unique to graphql)
 * A scalar type is a type that stores a single value 
 */
// Demo User Data
const users = [{
    id: '1',
    name: 'Lyra',
    email: 'lyra@lyrathesnake.com'
},{
    id: '2',
    name: 'Pan',
    email: 'pan@panthesnake.com'
},{
    id: '3',
    name: 'Marjorie',
    email: 'marjorie@marjoriethesnake.com'
}]
// Demo Post Data
const posts = [{
   id: '1',
   title: '1',
   body: '1',
   published: true
},{
    id: '2',
    title: '2',
    body: '2',
    published: true
 },{
    id: '3',
    title: '3',
    body: '3',
    published: false
 }]

const schema = createSchema({
    typeDefs: /*Type definition */`
   type Query {
     posts(query: String): [Post!]!
     users(query: String): [User!]!
     me: User!
     firstPost: Post!
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
      users(parent, args, ctx, info) {
           if(!args.query) {
              return users
           }
           return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
           })
      },
      posts(parent, args, ctx, info) {
         if(!args.query) {
            return posts
         }
         return posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
         })
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
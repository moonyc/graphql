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
   id: '4',
   title: '1',
   body: '1',
   published: true,
   author: '1'
},{
    id: '5',
    title: '2',
    body: '2',
    published: true,
    author: '2'
 },{
    id: '6',
    title: '3',
    body: '3',
    published: false,
    author: '3'
 }]

 // Demo Comment Data
 const comments = [{
    id: '7',
    text: 'Nice!',
    author: '3',
    post: '5'
 },
 {
    id: '8',
    text: 'Brilliant!',
    author: '2',
    post: '5'
 },{
    id: '9',
    text: 'Sasha did it again!',
    author: '1',
    post: '6'
 }]

const schema = createSchema({
    typeDefs: /*Type definition */`
   type Query {
     posts(query: String): [Post!]!
     users(query: String): [User!]!
     comments(query: String): [Comment!]!
     me: User!
     firstPost: Post!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
      comments(parent, args, ctx, info) {
         if(!args.query) {
            return comments
         }
         return comments.filter((comment) => {
            return comment.text.toLowerCase().includes(args.query.toLowerCase())
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
    },
    Post: {
        author(parent, args, ctx, info) {
          return users.find((user) => {
              return user.id === parent.author
          })
        },
        comments(parent, args, ctx, info) {
           return comments.filter((comment) => {
            return comment.post === parent.id
           })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
          return comments.filter((comment) => {
            return comment.author === parent.id
          })
        }
    },
    Comment : {
        post(parent, args, ctx, info) {
          return posts.find((post) => {
             return post.id === parent.post
          })
        },
        author(parent, args, ctx, info) {
           return users.find((user) => {
            return user.id === parent.author
           })
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
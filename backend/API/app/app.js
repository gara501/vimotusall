import '@babel/polyfill'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
let { expressjwt } = require('express-jwt')

require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  }),
)

app.get('/', (req, res) => res.send('Vimotus API!'))

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return {
        error: true,
        msg: 'Session invalid' + error,
      }
    }
  }
}

const server = new ApolloServer({
  context: async ({ req }) => {
    // const user = req.user || null
    // return { user }
    if (req.headers && req.headers.authorization) {
      let auth = req.headers.authorization
      let parts = auth.split(' ')
      let bearer = parts[0]
      let token = parts[1]

      if (bearer === 'Bearer') {
        const user = getUser(token)
        if (user.error) {
          throw Error(user.msg)
        } else {
          const userName = Object.values(user)[0].data
          return { userName }
        }
      } else {
        throw Error('Authentication must use Bearer')
      }
    }
  },
  modules: [
    require('./graphql/activity'),
    require('./graphql/biodata'),
    require('./graphql/clients'),
    require('./graphql/bodyparts'),
    require('./graphql/exercise_categories'),
    require('./graphql/exercises'),
    require('./graphql/roles'),
    require('./graphql/routines'),
    require('./graphql/routine_exercises'),
    require('./graphql/users'),
  ],
})

server.start().then((res) => {
  server.applyMiddleware({ app })

  app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
  )
})

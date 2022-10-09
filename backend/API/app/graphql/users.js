import { gql } from 'apollo-server-express'
import db from '../database'
import { uuid } from 'uuidv4'
import jwt, { verify } from 'jsonwebtoken'
require('dotenv').config()

export const typeDefs = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
    viewer: User!
  }

  type User {
    id: ID!
    username: String
    password: String
    active: Boolean
    createdAt: String
    role: Role
    confirmed: Boolean
  }

  type SignInResponse {
    token: String
    error: String
  }

  type SignUpResponse {
    token: String
    error: String
  }

  input UserInputData {
    username: String!
    password: String!
    active: Boolean!
    confirmed: Boolean!
    role: Int!
  }

  type Mutation {
    addUser(username: String!, password: String!, role: String): String
    updateUser(id: ID!, userInput: UserInputData): User
    deleteUser(id: ID!): Boolean
    signIn(username: String, password: String): String
    getToken(username: String): String
    signUp(username: String, password: String): String
    deactivateUser(id: ID!, userInput: UserInputData): String
    rememberPassword(id: ID!, userInput: UserInputData): String
  }
`

export const resolvers = {
  Query: {
    users: async (obj, args, context, info) => {
      console.log(context)
      if (!context.userName) {
        throw new Error('You are not authenticated!')
      }

      return db.users.findAll()
    },
    user: async (obj, args, context, info) => {
      if (!context.userName) {
        throw new Error('You are not authenticated!')
      }

      db.users.findByPk(args.id)
    },
  },
  Mutation: {
    addUser: async (root, { username, password, role }, { user }) => {
      const isExistentUser = await db.users.findAll({
        where: {
          username: username,
        },
      })

      console.log('ID', isExistentUser.length, username)

      if (isExistentUser.length > 0) {
        throw new Error('User exists!')
      }

      try {
        await db.users
          .create({
            id: uuid(),
            username,
            password,
            active: true,
            createdAt: Date.now().toString(),
            role,
            confirmed: false,
          })
          .then((result) => result.id)
        return 'User has been created'
      } catch (err) {
        console.log(err)
      }
    },
    signIn: async (root, { username, password }, req) => {
      const { id, active, role } = await db.users.findAll({
        where: {
          username: username,
          password: password,
        },
      })
      return jwt.sign(
        {
          'http://localhost:5000/graphql': { data: username },
        },
        process.env.JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: 'id',
          expiresIn: '1d',
        },
      )
    },
    getToken: async (root, { username }, req) => {
      return jwt.sign(
        {
          'http://localhost:5000/graphql': { data: username },
        },
        process.env.JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: 'id',
          expiresIn: '1d',
        },
      )
    },
  },
}

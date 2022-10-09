import { gql, AuthenticationError } from 'apollo-server-express'
import db from '../database'
import { uuid } from 'uuidv4'

export const typeDefs = gql`
  extend type Query {
    clients: [Client]
    client(id: ID!): Client
  }

  type Client {
    id: ID!
    firstName: String
    lastName: String
    active: Boolean
    gender: Int
    birthdate: String
    createdAt: String
    cellphone: String
  }

  input ClientInputData {
    firstName: String!
    lastName: String!
    active: Boolean!
    gender: Int
    birthdate: String
    cellphone: String
  }

  extend type Mutation {
    addClient(id: ID!, clientInput: ClientInputData): String
    updateClient(id: ID!, clientInput: ClientInputData): String
    deleteClient(id: ID!): Boolean
  }
`
export const resolvers = {
  Query: {
    clients: async (obj, args, context, info) => {
      if (!context.userName) {
        throw new AuthenticationError('Invalid credentials')
      }
      return db.clients.findAll()
    },
    client: async (obj, args, context, info) => {
      if (!context.userName) {
        throw new AuthenticationError('Invalid credentials')
      }
      return db.clients.findByPk(args.id)
    },
  },
  Mutation: {
    addClient: async (root, { id, clientInput }) => {
      try {
        const client = await db.clients.findByPk(id)
        if (!client) {
          await db.clients.create({
            id: uuid(),
            firstName: clientInput.firstName,
            lastName: clientInput.lastName,
            active: clientInput.active,
            gender: clientInput.gender,
            cellphone: clientInput.cellphone,
            birthdate: clientInput.birthdate,
            active: true,
            createdAt: Date.now().toString(),
          })
          return 'Client created'
        }
      } catch (err) {
        console.log(err)
      }
    },
    updateClient: async (root, { id, clientInput }) => {
      const client = await db.clients.findByPk(id)
      if (client) {
        db.clients
          .update(
            {
              firstName: clientInput.firstName,
              lastName: clientInput.lastName,
              active: clientInput.active,
              gender: clientInput.gender,
              cellphone: clientInput.cellphone,
              birthdate: clientInput.birthdate,
            },
            { where: { id: id } },
          )
          .then((result) => {
            if (result > 0) {
              return 'Client updated'
            }
          })
      } else {
        return 'Client not found'
      }
    },
    deleteClient: async (root, { id }, req) => {
      const client = await db.clients.findByPk(id)
      if (client) {
        db.clients
          .destroy({
            where: {
              id: id,
            },
          })
          .then(
            (row) => {
              if (row === 1) {
                return true
              }
            },
            (err) => {
              console.log(err)
              return false
            },
          )
      } else {
        return false
      }
    },
  },
}

import { gql } from 'apollo-server-express'
import db from '../database'

export const typeDefs = gql`
  extend type Query {
    roles: [Role]
    role(id: ID!): Role
  }

  type Role {
    id: ID!
    role: String
    active: Boolean
  }
`

export const resolvers = {
  Query: {
    roles: async () => db.roles.findAll(),
    role: async (obj, args, context, info) => {
      db.roles.findByPk(args.id)
    },
  },
}

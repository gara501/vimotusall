import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    bodyparts: [Bodypart]
    bodypart(id: ID!): Bodypart
  }

  type Bodypart {
    id: ID!
    name: String
  }
`

export const resolvers = {
  Query: {
    bodyparts: async () => db.bodyparts.findAll(),
    bodypart: async (obj, args, context, info) => {
      db.bodyparts.findByPk(args.id)
    },
  },
}

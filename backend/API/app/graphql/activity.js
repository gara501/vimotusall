import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    activities: [Activity]
    activity(id: ID!): Activity
  }

  type Activity {
    id: ID!
    name: String
    value: Int
  }
`

export const resolvers = {
  Query: {
    activities: async () => db.activity.findAll(),
    activity: async (obj, args, context, info) => {
      db.activity.findByPk(args.id)
    },
  },
}

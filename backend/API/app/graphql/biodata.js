import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    biodatas: [Biodata]
    biodata(id: ID!): Biodata
  }

  type Biodata {
    Id: ID!
    client: Client
    weight: Int
    height: Int
    fatPerc: Int
    notes: String
    activity: Activity
  }
`

export const resolvers = {
  Query: {
    biodatas: async () => db.biodata.findAll(),
    biodata: async (obj, args, context, info) => {
      db.biodata.findByPk(args.id)
    },
    Client: {
      client: async (obj, args, context, info) => db.clients.findByPk(obj.id),
    },
    Activity: {
      activity: async (obj, args, context, info) =>
        db.activity.findByPk(obj.id),
    },
  },
}

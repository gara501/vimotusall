import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    routines: [Routine]
    routine(id: ID!): Routine
  }

  type Routine {
    id: ID!
    client: Client
    createdAt: Int
    endDate: Int
    active: Boolean
    name: String
    description: String
  }
`

export const resolvers = {
  Query: {
    routineExercises: async () => db.routines.findAll(),
    routineExercise: async (obj, args, context, info) => {
      db.routines.findByPk(args.id)
    },
  },
}

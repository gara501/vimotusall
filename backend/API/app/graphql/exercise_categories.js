import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    exerciseCategories: [ExerciseCategory]
    exerciseCategory(id: ID!): ExerciseCategory
  }

  type ExerciseCategory {
    id: ID!
    name: String
  }
`

export const resolvers = {
  Query: {
    exerciseCategories: async () => db.exercise_categories.findAll(),
    exerciseCategory: async (obj, args, context, info) => {
      db.exercise_categories.findByPk(args.id)
    },
  },
}

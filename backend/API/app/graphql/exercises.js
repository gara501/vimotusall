import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    exercises: [Exercise]
    exercise(id: ID!): Exercise
  }

  type Exercise {
    id: ID!
    name: String
    category: ExerciseCategory
    bodypart: Bodypart
    videoUrl: String
    imageUrl: String
  }
`

export const resolvers = {
  Query: {
    exercises: async () => db.exercises.findAll(),
    exercise: async (obj, args, context, info) => {
      db.exercises.findByPk(args.id)
    },
  },
}

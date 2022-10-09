import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
  extend type Query {
    routineExercises: [RoutineExercise]
    routineExercise(id: ID!): RoutineExercise
  }

  type RoutineExercise {
    id: ID!
    routine: Routine
    exercise: Exercise
    sets: Int
    reps: Int
    rest: String
    notes: String
  }
`

export const resolvers = {
  Query: {
    routineExercises: async () => db.routine_exercises.findAll(),
    routineExercise: async (obj, args, context, info) => {
      db.routine_exercises.findByPk(args.id)
    },
  },
}

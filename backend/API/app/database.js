import Sequelize from 'sequelize'

let db = {}

// TODO: move this credentials to a local environment keys
const sequelize = new Sequelize('vimotus_routines', 'root', '123456', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
})

let models = [
  require('./models/activity.js'),
  require('./models/biodata.js'),
  require('./models/bodyparts.js'),
  require('./models/clients.js'),
  require('./models/exercise_categories.js'),
  require('./models/exercises.js'),
  require('./models/roles.js'),
  require('./models/routine_exercises.js'),
  require('./models/routines.js'),
  require('./models/users.js'),
]

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize)
  db[seqModel.name] = seqModel
})

Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

var DataTypes = require("sequelize").DataTypes;
var _activity = require("./activity");
var _biodata = require("./biodata");
var _bodyparts = require("./bodyparts");
var _clients = require("./clients");
var _exercise_categories = require("./exercise_categories");
var _exercises = require("./exercises");
var _roles = require("./roles");
var _routine_exercises = require("./routine_exercises");
var _routines = require("./routines");
var _users = require("./users");

function initModels(sequelize) {
  var activity = _activity(sequelize, DataTypes);
  var biodata = _biodata(sequelize, DataTypes);
  var bodyparts = _bodyparts(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var exercise_categories = _exercise_categories(sequelize, DataTypes);
  var exercises = _exercises(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var routine_exercises = _routine_exercises(sequelize, DataTypes);
  var routines = _routines(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  biodata.belongsTo(activity, { as: "activity", foreignKey: "activity_id"});
  activity.hasMany(biodata, { as: "biodata", foreignKey: "activity_id"});
  exercises.belongsTo(bodyparts, { as: "bodypart", foreignKey: "bodypart_id"});
  bodyparts.hasMany(exercises, { as: "exercises", foreignKey: "bodypart_id"});
  biodata.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(biodata, { as: "biodata", foreignKey: "client_id"});
  routines.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(routines, { as: "routines", foreignKey: "client_id"});
  exercises.belongsTo(exercise_categories, { as: "category", foreignKey: "category_id"});
  exercise_categories.hasMany(exercises, { as: "exercises", foreignKey: "category_id"});
  routine_exercises.belongsTo(exercises, { as: "exercise", foreignKey: "exercise_id"});
  exercises.hasMany(routine_exercises, { as: "routine_exercises", foreignKey: "exercise_id"});
  users.belongsTo(roles, { as: "role_role", foreignKey: "role"});
  roles.hasMany(users, { as: "users", foreignKey: "role"});
  routine_exercises.belongsTo(routines, { as: "routine", foreignKey: "routine_id"});
  routines.hasMany(routine_exercises, { as: "routine_exercises", foreignKey: "routine_id"});

  return {
    activity,
    biodata,
    bodyparts,
    clients,
    exercise_categories,
    exercises,
    roles,
    routine_exercises,
    routines,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

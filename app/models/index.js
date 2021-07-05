const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.movie = require("../models/movie.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.schedule = require("../models/schedule.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.movie.hasMany(db.schedule, {
  foreignKey: 'movieId'
})
db.schedule.belongsTo(db.movie)

db.room.hasMany(db.schedule, {
  foreignKey: 'roomId'
})
db.schedule.belongsTo(db.room)

db.user.belongsToMany(db.schedule, {
  through: "user_schedules",
  foreignKey: "userId",
  otherKey: "scheduleId",
})
db.schedule.belongsToMany(db.user, {
  through: "user_schedules",
  foreignKey: "scheduleId",
  otherKey: "userId",
})

db.ROLES = ["user", "admin", "client"];

module.exports = db;

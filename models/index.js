const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  sync: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    logging: true,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connnection established successfully");
  } catch (error) {
    console.log(error, ">err in index model.");
  }
})();

const db = {
  users: require("./users")(sequelize, Sequelize.DataTypes),
  comments: require("./comments")(sequelize, Sequelize.DataTypes),
  likes: require("./likes")(sequelize, Sequelize.DataTypes),
  posts: require("./posts")(sequelize, Sequelize.DataTypes),
  friends: require("./friends")(sequelize, Sequelize.DataTypes),
};
//associations
db.likes.belongsTo(db.users, { foriegnKey: "userId" });

db.sequelize = sequelize;
db.transaction = (cb) => {
  try {
    return sequelize.transaction(cb);
  } catch (err) {
    throw err;
  }
};

module.exports = db;

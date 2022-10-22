const secrets = require("./keys");

module.exports = {
  development: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
       ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS,
      },
    },
  },
  test: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
       ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS,
      },
    },
  },
  production: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.dbPort,
    dialect: "postgres",
    use_env_variable: "DB_URL",
    dialectOptions: {
      bigNumberStrings: true,
      //   ssl: {
      //     ca: readFileSync(__dirname + "/mysql-ca-master.crt"),
      //   },
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS,
      },
    },
  },
};

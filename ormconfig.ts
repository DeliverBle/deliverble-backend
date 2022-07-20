module.exports = {
    "type": "mysql",
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.PASSWORD,
    "database": "deliverble_new2",
    "synchronize": true,
    "logging": false,
    "entities": [
      "src/entity/**/*.ts"
    ],
    "migrations": [
      "src/migration/**/*.ts"
    ],
    "subscribers": [
      "src/subscriber/**/*.ts"
    ]
  }
  
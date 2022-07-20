module.exports = {
    "type": "mysql",
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": "deliverble",
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
  
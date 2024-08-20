const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

/**
 * MongoDb Connection
 */
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://admin:lDC33kNMThkUqhXC@shopaholic.hqb68.mongodb.net/shopaholicdb?retryWrites=true&w=majority&appName=Shopaholic"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Getting the existing connection to database.
 * Reusing existing connection to avoid creating another connection.
 *
 * @returns Database connection instance
 */
const database = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.database = database;

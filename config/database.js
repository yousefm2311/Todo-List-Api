const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.URL_DB)
    .then((connect) => {
      console.log(
        `Database connected successfully : ${connect.connection.host}`
      );
    })
    .catch((error) => {
        process.exit(1)
    });
};

module.exports = dbConnection;

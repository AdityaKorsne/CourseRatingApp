const express = require("express");
const router = express.Router();
require("dotenv").config();

const courseController = require("./controller/courseController");
const userController = require("./controller/userController");

const app = express();
const PORT = process.env.PORT;

const connection = require("./database/mongodbConnect");
connection.mongodbConnection();

app.use(express.json());
app.use(router);
router.use("/courseratingapp/v1", courseController);
router.use("/users", userController);

app.listen(PORT, (err, data) => {
  if (err) console.log("Some error occured");
  else console.log(`server started on port ${PORT}`);
});

const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");

const courseController = require("./controller/courseController");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);
router.use("/courseratingapp/v1", courseController);

app.listen(PORT, (err, data) => {
  if (err) console.log("Some error occured");
  else console.log(`server started on port ${PORT}`);
});

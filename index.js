const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { authMiddleware } = require("./middlewares/auth");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(authMiddleware)
app.use("/user", userRouter);

app.get("/", async (req, res) => {
  try {
    res.send("this is home page");
  } catch (error) {
    res.send(error);
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`running on port ${process.env.PORT}`);
});

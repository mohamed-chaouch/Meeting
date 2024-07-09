const express = require("express");
const path = require("path")
const app = express();

const cors = require("cors");

app.use(cors());

const userRouter = require("./routes/userRouter");

app.use(express.json());


app.use("/user", userRouter);

app.use("/" , express.static(path.join(__dirname,"./uploads")));
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 4000" ); 
})
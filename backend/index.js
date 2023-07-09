const connectToMongo = require("./db");
// const path = require('path')
const express = require("express");
const cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors(
    {
    origin: ["https://inotes.vercel.app"],
    methods: ["POST", "DELETE", "PUT"],
    credentials: true,
  }
  )
);

app.get("/", (req,res)=>{
  res.json("hello")
})
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`INotes backend running at http://localhost:${port}`);
});

import express from "express";
import todosRoute from "./routes/todos.route";

const app = express();

app.get("/", (req, res) => {
  res.send("Express Server is running");
});

app.use("/api/v1/todos", todosRoute);

app.listen(process.env.PORT || 3000, () => {
  if (!process.env.PORT)
    console.log("Server is running on http://localhost:3000");
});

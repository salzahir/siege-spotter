import express from "express";
import waldoRouter from "./src/routes/waldoroutes";
import routerUser from "./src/routes/userroutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(waldoRouter)
app.use("/users", routerUser);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from "express";
import router from "./src/routes/waldoroutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
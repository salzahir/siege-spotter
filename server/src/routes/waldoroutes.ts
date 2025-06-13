import { Router } from "express";
import * as waldoController from "../controllers/waldo";

const router = Router();

router.get("/", waldoController.handleHome);
router.get("/check", waldoController.handlePosts);
router.post("/check", waldoController.handleWaldoCheck);

export default router;
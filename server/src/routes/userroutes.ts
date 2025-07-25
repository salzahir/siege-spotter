import { Router } from "express";
import * as userController from "../controllers/user";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", userController.handleGetUsers);
router.post("/", userController.handlePostUser);
router.get("/me", authenticateToken, userController.handleGetUser);
router.post("/login", userController.handleLoginUser);

export default router;
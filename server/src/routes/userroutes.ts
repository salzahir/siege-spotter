import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.get("/", userController.handleGetUsers);
router.post("/", userController.handlePostUser);
router.post("/login", userController.handleLoginUser);

export default router;
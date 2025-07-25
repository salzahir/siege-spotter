import * as userDb from '../db/users';
import { Request, Response } from 'express';
import { generateToken } from '../middleware/auth';

async function handleGetUsers(req: Request, res: Response) {
    try {
        const users = await userDb.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handlePostUser(req: Request, res: Response) {
    const { name, email, password, timer } = req.body;

    try {
        const user = await userDb.postUser(name, email, password, timer);
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleLoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await userDb.loginUser(email, password);
        const token = generateToken(String(user.id));
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json(
            {
                message: "Login successful",
                user,
            });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(401).json({ error: "Invalid email or password" });
    }
}


async function handleGetUser(req: Request, res: Response): Promise<void> {
    const userId = Number(req.user?.id);

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const user = await userDb.fetchUser(userId);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json(user); // ✅ no return statement
}

export { handleGetUsers, handlePostUser, handleLoginUser, handleGetUser };
import * as userDb from '../db/users';
import { Request, Response } from 'express';

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

export { handleGetUsers, handlePostUser };
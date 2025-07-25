import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface UserPayload extends jwt.JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token: string): UserPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            throw new Error("Invalid token payload");
        }
        return decoded as UserPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
}

export { generateToken, authenticateToken };
import { Request, Response } from "express";
import waldoTargets from "../models/waldo";

function handleHome(req: Request, res: Response): void {
  res.status(200).json({ message: "Welcome to the Waldo API!" });
}

function handlePosts(req: Request, res: Response): void {
  res.status(200).json({ message: "Please use POST /check with coordinates to find Waldo." });
}

async function handleWaldoCheck(req: Request, res: Response): Promise<void> {
  try {
    const { postX, postY } = req.body;
    for (const waldo of Object.values(waldoTargets)) {
      if (waldo.isWaldoFound(postX, postY)) {
        res.status(200).json({
          message: `${waldo.character} found! at coordinates (${postX}, ${postY})`, 
          character: waldo.character, 
        });
        return;
      }
    }
    res.status(404).json({message: "Character not found at the given coordinates."});
    return;
  } catch (error) {
    console.error("Error in waldo controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleHome, handlePosts, handleWaldoCheck };
import { Request, Response } from "express";
import { getWaldos } from "../db/waldos";
import Waldo from "../models/waldo";

function handleHome(req: Request, res: Response): void {
  res.status(200).json({ message: "Welcome to the Waldo API!" });
}

function handlePosts(req: Request, res: Response): void {
  res.status(200).json({ message: "Please use POST /check with coordinates to find Waldo." });
}

async function handleWaldoCheck(req: Request, res: Response): Promise<void> {
  try {
    const { postX, postY } = req.body;
    const waldoTargets: Waldo[] = await getWaldos();
    const found = waldoTargets.find(waldo => waldo.isWaldoFound(postX, postY));

    if (!found) {
      res.status(404).json({ message: "Waldo not found at the given coordinates." });
      return;
    }

    res.status(200).json({
      message: `${found.character} found! at coordinates (${postX}, ${postY})`,
      character: found.character,
    });
    return;
  } catch (error) {
    console.error("Error in waldo controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleHome, handlePosts, handleWaldoCheck };
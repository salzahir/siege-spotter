import { Request, Response } from "express";

class Waldo {
    constructor(public character: string, public posX: number, public posY: number, public marginError: number) {}
    isWaldoFound(postX: number, postY: number): boolean {
        const xInRange = postX >= this.posX - this.marginError && postX <= this.posX + this.marginError;
        const yInRange = postY >= this.posY - this.marginError && postY <= this.posY + this.marginError;
        return xInRange && yInRange;
    }
}

const data = {
    Waldo: new Waldo("White Turban Guy", 0.2540, 0.2533, 0.05)
}

function handleHome(req: Request, res: Response): void {
  res.status(200).json({ message: "Welcome to the Waldo API!" });
}

function handlePosts(req: Request, res: Response): void {
  res.status(200).json({ message: "Please use POST /check with coordinates to find Waldo." });
}

async function handleWaldoCheck(req: Request, res: Response): Promise<void> {
  try {
    const { postX, postY } = req.body;
    for (const waldo of Object.values(data)) {
      if (waldo.isWaldoFound(postX, postY)) {
        res.status(200).json({ found: true, character: waldo.character });
        return;
      }
    }
    res.status(404).json({ found: false, message: "Waldo not found" });
    return;
  } catch (error) {
    console.error("Error in waldo controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleHome, handlePosts, handleWaldoCheck };
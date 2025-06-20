import prisma from "./prisma";
import Waldo from "../models/waldo";

async function getWaldos(): Promise<Waldo[]> {
  try {
    const waldos = await prisma.waldo.findMany();
    return waldos.map((waldo: { name: string; xPos: number; yPos: number; marginError: number }) =>
      new Waldo(waldo.name, waldo.xPos, waldo.yPos, waldo.marginError)
    );
  } catch (error) {
    console.error("Error fetching Waldos:", error);
    throw error;
  }
}

export {
    getWaldos,
}
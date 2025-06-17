class Waldo {
    constructor(public character: string, public posX: number, public posY: number, public marginError: number) {}
    isWaldoFound(postX: number, postY: number): boolean {
        const xInRange = postX >= this.posX - this.marginError && postX <= this.posX + this.marginError;
        const yInRange = postY >= this.posY - this.marginError && postY <= this.posY + this.marginError;
        return xInRange && yInRange;
    }
}

const waldoTargets: Waldo[] = [
  // Top-left wall
  new Waldo("White Turban Guy", 0.2540, 0.2533, 0.05),

  // On elephant, mid-right
  new Waldo("Orange Shirt Guy", 0.6729, 0.2078, 0.05),

  // Catapult flag, mid-left
  new Waldo("Orange Flag", 0.3870, 0.6129, 0.05),

  // Rider on white horse, mid-top
  new Waldo("White Horse", 0.6090, 0.1717, 0.05),

  // Woman in red dress, bottom-center
  new Waldo("Red Dress Woman", 0.5226, 0.8235, 0.05),
];

export default waldoTargets;
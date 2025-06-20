class Waldo {
    constructor(public character: string, public posX: number, public posY: number, public marginError: number) {}
    isWaldoFound(postX: number, postY: number): boolean {
        const xInRange = postX >= this.posX - this.marginError && postX <= this.posX + this.marginError;
        const yInRange = postY >= this.posY - this.marginError && postY <= this.posY + this.marginError;
        return xInRange && yInRange;
    }
}

export default Waldo;
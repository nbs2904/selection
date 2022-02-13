export class Potential {
    public signalsReceived : number;
    public signalsTotal : number;
    public connections : number;

    constructor() {
        this.signalsReceived = 0;
        this.signalsTotal = 0;
        this.connections = 0;
    }

    public get potential() : number {
        return this.signalsReceived / this.signalsTotal;
    }
}
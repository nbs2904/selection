// * interfaces
import { Genome } from "@interfaces/genome.interface";

module.exports.saveGenome = jest.fn(saveGenome);

function saveGenome (genome : Genome, fileName : string, path? : string) : void {
    return;
}
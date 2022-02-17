import { Genome } from "@interfaces/genome.interface";
import fs = require("fs");

export function saveGenome(genome : Genome, fileName : string) {
    fs.writeFileSync(`lib/genomes/src/${fileName}.json`, JSON.stringify(genome));
}
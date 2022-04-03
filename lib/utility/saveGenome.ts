import fs = require("fs");

// * interfaces
import { Genome } from "@interfaces/genome.interface";


export function saveGenome(genome : Genome, fileName : string, path = "lib/genomes/src") {
    fs.mkdir(path, { recursive: true }, (err) => {
        console.log(err);        
    });

    fs.writeFileSync(`${path}/${fileName}.json`, JSON.stringify(genome));
}
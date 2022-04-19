import fs = require("fs");

// * interfaces
import { Genome } from "@interfaces/genome.interface";

/**
 * Creates a file containing genome as JSON-Object
 * @param Genome {@link Genome} to store
 * @param fileName Name of JSON file that will be created
 * @param path where file shall be saved
 */
export function saveGenome(genome : Genome, fileName : string, path = "lib/genomes/src") {
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(`${path}/${fileName}.json`, JSON.stringify(genome));
}
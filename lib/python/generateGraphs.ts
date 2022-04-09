import { saveGenome } from "@utility/saveGenome";
import { randomGenome } from "@utility/randomGenome";

/** generate random genomes and store them */
for (let i = 0; i < 10; i++) {
    const genome = randomGenome();
    saveGenome(genome, "genome_" + i.toString());
}
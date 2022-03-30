import { saveGenome } from "@utility/saveGenome";
import { randomGenome } from "@utility/randomGenome";

for (let i = 0; i < 10; i++) {
    const genome = randomGenome();
    saveGenome(genome, "genome_" + i.toString());
}
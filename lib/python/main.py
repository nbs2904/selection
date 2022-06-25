import json
import os

from config.config import PLOT_OUTPUT_EXTENSION
from lib.get_graph import get_graph
from lib.plot_graph import plot_graph


path = "./lib/simulations/20220625002326/"
output_base = "./lib/genomes/images/"
files = [file for file in os.listdir(path) if file.endswith(".json")]


for file in files:
    with open(path + file) as json_file:
        genome = json.load(json_file)
        graph = get_graph(genome)
        output = output_base + file.split(".")[0] + PLOT_OUTPUT_EXTENSION
        print(output)
        plot_graph(graph, output)

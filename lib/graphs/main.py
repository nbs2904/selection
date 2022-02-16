from igraph import *
import json

genome = {}

with open("./lib/graphs/genomes/genome.json") as json_file:
    genome = json.load(json_file)

g = Graph(directed=True)

g.add_vertex("Neuron 0")
g.vs[0]["label"] = g.vs[0]["name"]
g.vs[0]["size"] = 35

plot(g)

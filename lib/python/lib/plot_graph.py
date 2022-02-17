from igraph import *
from config.config import *


def plot_graph(graph, output):
    if len(graph.vs) < 6:
        bbox = (400, 400)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 12:
        bbox = (500, 500)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 18:
        bbox = (600, 600)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 24:
        bbox = (700, 700)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 26:
        bbox = (800, 800)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 50:
        bbox = (1000, 1000)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 130:
        bbox = (1200, 1000)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 150:
        bbox = (4000, 4000)
        layout = 'fruchterman_reingold'
    elif len(graph.vs) < 200:
        bbox = (4000, 4000)
        layout = 'kamada_kawai'
    else:
        bbox = (8000, 8000)
        layout = 'fruchterman_reingold'

    plot(graph, target=output, bbox=bbox,
         edge_curved=EDGES_CURVED, margin=MARGIN, layout=layout)

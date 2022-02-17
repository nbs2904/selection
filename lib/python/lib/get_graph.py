from igraph import *
from config.config import *

print(config)


def get_graph(genome):
    graph = Graph(directed=True)

    # ? add sensors
    for sensorName in genome["sensors"]:
        graph.add_vertex(name=sensorName)

    # ? add innerNeurons
    for neuronName in genome["innerNeurons"]:
        graph.add_vertex(name=neuronName)

    # ? add actions
    for actionName in genome["actions"]:
        graph.add_vertex(name=actionName)

    # ? add sensor connections
    for sensorName, sensor in genome["sensors"].items():
        for connection, weight in sensor["connections"].items():
            width = abs(weight)

            if weight > 0:
                color = "green"
            elif weight < 0:
                color = "red"
            else:
                color = "black"
                width = 1

            graph.add_edge(sensorName, connection, width=width,
                           color=color)

    # ? add neuron connections
    for neuronName, neuron in genome["innerNeurons"].items():
        for connection, weight in neuron["connections"].items():
            width = abs(weight) + 1

            if weight > 0:
                color = "green"
            elif weight < 0:
                color = "red"
            else:
                color = "black"
                width = 1

            graph.add_edge(neuronName, connection, width=width,
                           color=color)

    for vertex in graph.vs:
        vertex["size"] = VERTEX_SIZE
        if "Neuron" in vertex["name"]:
            # ? shorten label from "Neuron XY" to "NXY"
            vertex["label"] = "N" + vertex["name"].split(" ")[1]
        else:
            vertex["label"] = vertex["name"]

        if vertex["name"] in SENSOR_NAMES:
            vertex["color"] = SENSOR_COLOR
        elif vertex["name"] in ACTION_NAMES:
            vertex["color"] = ACTION_COLOR
        else:
            vertex["color"] = NEURON_COLOR

    return graph

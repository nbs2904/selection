# selection

## Preface
The goal behind this code is to simulate natural selection. This repository is an attempt to recreate something similiar to David R. Miller's [biosim4](https://github.com/davidrmiller/biosim4) project, whose work was a great inspiration.

## Outline
- [selection](#selection)
  - [Preface](#preface)
  - [Outline](#outline)
  - [Nodes](#nodes)
  - [Neurons](#neurons)
    - [Sensors](#sensors)
    - [Inner Neurons](#inner-neurons)
    - [Actions](#actions)
  - [Config](#config)
  - [Build Process](#build-process)
  - [Execution](#execution)



## Nodes
The creatures of a simulation are called [Nodes](./lib/classes/node.ts). Each Node has, among other attributes, a [Genome](./lib/interfaces/genome.interface.ts) and a [Brain](./lib/classes/brain.ts). The Genome represents the Blue Print for each Node. The Brain of the Node uses the Genome to generate and connect Neurons. Based on the Node's sensation of its surroundings, the Brain will determine which Neuron to activate, therefore, causing the Node to invoke an action.
## Neurons
There are three differrnt types of Neurons:
### Sensors
A Sensor has access to a pre-defined set of sensory inputs. Based on the given sensory inputs, the sensor will generate a value and pass it on to connected Neurons.

Different Senses of a Neuron are:
- XPos - X-Coordinate of its current location.
- YPos - Y-Coordinate of its current location.
- Age - Its age which increases with each step.
- Random - A random value between 0 and 1.
- Population - The number of Nodes left in the simulation.
- BorderXDistance - Its distance to top border of the grid.
- BorderYDistance - Its distance to right border of the grid.

### Inner Neurons
An Inner Neuron takes the input of Sensors or other Inner Neurons and passes it through its activation function. The ouput is then passed on to other Inner Neurons or Actions.

### Actions
An Action is bound to a specific function of the Node. When an Action fires, the function is invoked and therefore forcing the Node to change its state.

Possible Actions are:
- MoveX - Moves Node across the X-axis.
- MoveY - Moves Node across the Y-axis.
- MoveFwd - Moves Node forward, relative to its last direction.
- MoveBwd - Moves Node backward, relative to its last direction.
- MoveL - Moves Node left, relative to its last direction.
- MoveR - Moves Node right, relative to its last direction.
- MoveN - Moves Node north.
- MoveS - Moves Node south.
- MoveE - Moves Node east.
- MoveW - Moves Node west.
- MoveRnd - Moves Node in a random direction.
- Kill - Kills another Node, when it is right in front of it.
## Config
The configuration of the simulation is stored in an [ENV-File](config/env/.env). Parameters in this file can be changed to play around with the simulation's behaviour. Before a simulation is run, the ENV-File is checked for any missing parametres. Should anything be misconfigured, the programm will exit and an error message will be displayed.

In order to test the source code, another [ENV-File](config/env/.env.test) will be used. Changing this file might lead to failing tests.

## Build Process
Before execution, the source code should be transpiled to JavaScript. This is done by running the following command:
```
gulp build
```

## Execution
Once built, the programm can be executed by running the following command:
```
npm start
```
This will execute the programm in production mode. Logging will be limited to errors and warnings.

Once the programm is started, the user should go to "http://localhost:PORT". The PORT is defined in the [ENV-File](config/env/.env) and set to 3000 by default.

To run the programm in development mode, run the following command:
```
npm run dev
```
This will use the typescript files, therefore no transpilation is necessary.

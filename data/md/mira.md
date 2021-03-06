MIRA allows a developer to visually plot the logical flow of an application as connected modules, before decorating each module with tables of scripts and data. Connected game clients then travel along this graph like pieces on a game board, triggering scripts, receiving data collated locally in terms of the spatial relationships on the graph.  

The visual nature of the tool and the philosophy of strict server authority allows a game state to be queried at a glance, making the creation of game states and testing game logic a rapid, iterative process even when handling multiple parallel clients at once. There's a certain magic to manipulating the game state and watching several remote clients update their content in real time as you edit.  

MIRA was written to support a very content heavy multiplayer learning game exhibit, and meant that content creators and game designers were working directly on the game design implementation: We met our deadline with stable software and I didn't have to write a line of game logic. The final game graph consisted of upwards of 10 000 tables of data. Additionally, we used MIRA to solve other minor installations in the exhibition hall that included network logic: It simply turned out to be the simplest most direct way.  

Proudly written in Haxe/AIR for [Expology](http://www.expology.no)

# projectAster - A n-Body physics simulator

## TODO

First of all, the code base needs a bit of refactoring (Currently it is the first definition in the dictionary under spaghetti code). Hopefully, once everything is cleaned up, work can start on the following:

- Migrate project to node.js
- Add angular physics
- Implement accumulator time step found at <https://gafferongames.com/post/fix_your_timestep/>
- Leapfrog integration?
- Optimize physics engine state update using the Barnes-Hut algorithm and reduce internal loop count <https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation>
- Setup test against physics problems with know solutions to verify physics behavior
- Implement state saving and reloading
- Finish basic UI for initial state configuration plus debug information
- Look into complexity of running global physics server side with client physics for interpolation of local particles.

# projectAster - A n-Body physics simulator

## TODO

- Migrate project to typescript and node.js
- Add angular physics
- Change timestep to per particle variable timestep
- Optimize physics engine state update using the Barnes-Hut algorithm and reduce internal loop count <https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation>
- Setup test against physics problems with know solutions to verify physics behaviour
- Implement state saving and reloading
- Finish basic UI for initial state configuration plus debug information
- Look into complexity of running global physics server side with client physics for interpolation of local particles.

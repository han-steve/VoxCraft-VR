# VoxCraft VR - Experience Minecraft with the immersiveness of Virtual Reality 
_Built with A-Frame_

![Cover photo](./Cover.png?raw=true "Title")

by Steve Han and Grace Liu

_For Computer Graphics final project_

### Voxel Mesh 

- 32x32x32 chunks
- Generate the outside mesh of each chunk
- Heavily inspired by [this article](https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html)

  ![Voxel Mesh](https://media.giphy.com/media/CfkmiWTierqTPEcmqy/giphy.gif)

### Infinite Terrain 
- Display 5x5 grid of chunks 
- Generate and render new chunks as user walks around
- Store changes to old chunks
- Perlin noise
- Different voxel textures from texture atlas (by [Joshtimus](https://www.minecraftforum.net/members/Joshtimus)) according to height 
- Randomly generate trees/lanterns

  ![Infinite Terrain](https://i.ibb.co/rQZbBKk/Screen-Shot-2021-05-11-at-10-38-59-PM.png)

### Movement Modes
- Creaive: the sky's the limit
- Survival: gravity, autojump, and collision prevention

  ![Walking](https://media.giphy.com/media/JbCUca2NpB6RG57Hi4/giphy.gif)

### Building and Mining
- Create your own (virtual) reality 
- Pull trigger to build block on the selected face
- Repeatedly move your arm across a block to mine it. It’s an arm work out. 


  ![Building](https://media.giphy.com/media/qBF65k80atDQB0Bssq/giphy.gif)
  
### Inventory
- Hit button to toggle
- Ray casting to detect which item is selected
- Pickaxe gives you the power of almost instant mining

  ![Pickaxe](https://media.giphy.com/media/2O1PO59309L9LR6fZj/giphy.gif)


And don't forget... 

**NEVER DIG STRAIGHT DOWN!!**

![Dig Down](https://media.giphy.com/media/NDFzL2ejj6C7DvbHNS/giphy.gif)

## Demo
[link](https://hansteve.com/vr-minecraft)

[Our Video Walkthrough](https://youtu.be/OoZKp4ltCj0)

Compatibility only tested with Oculus 2. You can still view the infinite world on desktop and mobile browsers, but you won't be able to interact with it. 

Joystick to move, A to toggle inventory, B to toggle creative/survival, right trigger to build, move cursor around a block to mine, hover over inventory items to select. 

## Resources
[Our Final Presentation (video)](https://youtu.be/danqg_ZwkZQ)

[Our Presentation Slides (more gifs!)](https://docs.google.com/presentation/d/1Tq_JOM2Oneqv1TDhiUJuK-ranIs8vp45FR_SPWYpZf4/edit?usp=sharing)

[Our Write-up (explanation of implementation)](https://docs.google.com/document/d/1-1NP7lCpQEtxOhAAv9GmeBvKOzj4Ss3CtwvtZ_xAmsk/edit?usp=sharing)

[Behind the Scenes Video (development process walkthrough)](https://www.youtube.com/watch?v=JKQ4jm7BKLQ)


## Logistics
Contents:

- assets: all of the images/assets used in our VoxCraft world including textures and icons
- components: all of the A-frame components used in our project - these drive the logic behind our program
- shaders: a shader for the day/night sky gradient in our background
- utils: a Perlin noise library that we used to generate our infinitely random landscape
- aframe.js: an A-frame library - literally A-frame itself
- index.html: the organizational hierarchy of all the components and entities used in our project

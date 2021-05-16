# VoxCraft VR - Experience Minecraft with the immersiveness of virtual reality

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
- Generate and render new chunks when necessary
- Store changes to old chunks
- Perlin noise
- Different voxel textures from texture atlas (by [Joshtimus](https://www.minecraftforum.net/members/Joshtimus)) according to height 
- Randomly generate trees/lanterns


  ![Building](https://media.giphy.com/media/qBF65k80atDQB0Bssq/giphy.gif)
- Basic physical movement + flying mode 
- Texture-mapped voxels
- Day-night transition
- User inventory


## Logistics
Contents:

- assets: all of the images/assets used in our VoxCraft world including textures and icons
- components: all of the A-frame components used in our project - these drive the logic behind our program
- shaders: a shader for the day/night sky gradient in our background
- utils: a Perlin noise library that we used to generate our infinitely random landscape
- aframe.js: an A-frame library - literally A-frame itself
- index.html: the organizational hierarchy of all the components and entities used in our project

eCIS:

- I, Grace Liu (gyl242), affirm on my honor that I completed and submitted the eCIS for this course. :)
- I, Steve Han, affirm on my honor that I totally forgot to do the eCIS for this course :(

## Demo
[link](https://hansteve.com/vr-minecraft)

Compatibility only tested with Oculus 2. 

Joystick to move, A to toggle inventory, B to toggle creative/survival, right trigger to build, move cursor around a block to mine, hover over inventory items to select. 

## Files
[Our Presentation Slides (more gifs!)](https://docs.google.com/presentation/d/1Tq_JOM2Oneqv1TDhiUJuK-ranIs8vp45FR_SPWYpZf4/edit?usp=sharing)

[Our Write-up (explanation of implementation)](https://docs.google.com/document/d/1-1NP7lCpQEtxOhAAv9GmeBvKOzj4Ss3CtwvtZ_xAmsk/edit?usp=sharing)

[Our Video Walkthrough (product artifact)](https://youtu.be/OoZKp4ltCj0)


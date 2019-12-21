// set up render
// want to add antialiasing to get crispier/cleaner objects
const renderer = new THREE.WebGLRenderer({
  antialias: true
})

// makes size the size of browser
renderer.setSize(window.innerWidth, window.innerHeight)
// makes pixel ratio depending on device size
renderer.setPixelRatio(window.devicePixelRatio)
// what color will background be?
renderer.setClearColor(0x333333, 1)


// find the element to add the renderer to in this case the section tag
const section = document.querySelector("section")
// dom = document object model
// adding renderer
section.appendChild(renderer.domElement)



// create the scene
const scene = new THREE.Scene()


// create camera with 4 elements: FOV, AR, Far, Near

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000)

// need to move camera a bit
camera.position.z = -50
camera.lookAt(scene.position)

// add in animation loop to make it run

const animate = function () {
  renderer.render(scene, camera)
  // makes it continually run once its already ran initially
  requestAnimationFrame(animate)
}

// start animation
animate()


// let's make a function to make shapes

const createShape = function () {
  // shape geometry
  const geometry = new THREE.ConeGeometry(20, 20, 32)
  // shape material
  const material = new THREE.MeshBasicMaterial({
    color: 0x0b0b0b
  })

  const shape = new THREE.Mesh(geometry, material)
  shape.rotateX(.25)
  // need to add shape to scene
  scene.add(shape)
}

createShape()

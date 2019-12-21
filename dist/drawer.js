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
camera.position.z = -100
camera.lookAt(scene.position)

// adding lighting with color and opcity
const light = new THREE.DirectionalLight(0xffffff, 1)
// putting the light to come from the user
light.position.set(0, 0, -1)
scene.add(light)


// hold info about the shapes being added

const shapes = []

// add in animation loop to make it run

const animate = function () {
  renderer.render(scene, camera)
  // makes it continually run once its already ran initially
  requestAnimationFrame(animate)

  // lets rotate shapes eaach frame
  shapes.forEach(shape => {
    shape.rotateY(0.01)
  })
}

// start animation
animate()

// lets hold a state of hue

let hue = 0


const heartShape = new THREE.Shape();
const x = 0, y = 0
// heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
// let's make a function to make shapes
// a and b coordinate to position in shaape.position
const createShape = function (a, b) {
  // shape geometry
  const geometry = new THREE.ShapeGeometry(heartShape)
  // shape material
  // making flexible color so we can alter hue
  const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    // // emissive is the shadow color or whats not effected by light
    emissive: emissiveColor
  })

  const shape = new THREE.Mesh(geometry, material)
  // changing shape position, pageX/pageY dont correspond to same grid as
  // our webgl grid, so need to shift shapes to align with top right grid
  shape.position.set((window.innerWidth/2) - a, (window.innerHeight/2) - b, 400)

  shape.rotateX(3)
  // need to add shape to scene and to list of shapes
  shapes.push(shape)
  scene.add(shape)

  // update hue so for every time a shape is created hue shifts
  hue = hue + 1
}


// lets create shape on a draw
let isMouseDown = false

document.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY)
  }
})

document.addEventListener("mousedown", function () {
  isMouseDown = true
})

document.addEventListener("mouseup", function () {
  isMouseDown = false
})




document.addEventListener("touchmove", function (event) {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY)
  }
})

document.addEventListener("touchstart", function () {
  isMouseDown = true
})

document.addEventListener("touchend", function () {
  isMouseDown = false
})

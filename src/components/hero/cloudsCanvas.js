import Clod from './clod.svg'
import HandsomeClodImg from './handsome_clod.svg'
import Glasses from './glasses.svg'
import Coding from './coding.svg'

function loadImage (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', () => reject())
  })
}

function createBuffer (width, height) {
  const buffer = document.createElement('canvas')
  buffer.width = width
  buffer.height = height

  return buffer
}

function loadBuffer (buffer, img) {
  const bufferCtx = buffer.getContext('2d')
  bufferCtx.drawImage(img, 0, 0, buffer.width, buffer.height)
}

function changeBufferColor (buffer, color) {
  const bufferCtx = buffer.getContext('2d')
  bufferCtx.globalCompositeOperation = 'source-atop'
  bufferCtx.fillStyle = color
  bufferCtx.fillRect(0, 0, buffer.width, buffer.height)
  bufferCtx.globalCompositeOperation = 'source-over'
}

function drawOnBuffer (buffer, img, x, y, width, height) {
  const bufferCtx = buffer.getContext('2d')
  bufferCtx.drawImage(img, x, y, width, height)
}

export function CloudsCanvas (ref, loadedCallback) {
  this.ref = ref
  this.loadedCallback = loadedCallback

  this.initialized = false

  this.coveringWidth = 0
  this.coveringHeight = 0
  this.max_i = 0
  this.max_j = 0

  this.clodBuffer = createBuffer(120, 68)
  this.handsomeClodBuffer = createBuffer(120, 68)
  this.tinyClodBuffer = createBuffer(90, 51)
  this.superTinyClodBuffer = createBuffer(30, 17)
  this.myBuffer = createBuffer(467, 309)

  this.requestId = 0

  const canvasAngle = (Math.PI / 180) * (-10)
  const clodXOffset = 200
  const clodYOffset = 100
  const delta_t = 0.2

  this.init = () => {
    this.canvas = this.ref.current
  
    this.ctx = this.canvas.getContext('2d')

    this.lowerGradient = this.ctx.createLinearGradient(0, 0, 0, 150)
    this.lowerGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    this.lowerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)')

    const images = [Coding, Clod, HandsomeClodImg, Glasses]
    Promise.all(images.map(imgFile => loadImage(imgFile)))
    .then(imgs => {
      loadBuffer(this.myBuffer, imgs[0])
      loadBuffer(this.clodBuffer, imgs[1])

      const handsomeBuffers = [this.handsomeClodBuffer, this.tinyClodBuffer, this.superTinyClodBuffer]
      handsomeBuffers.map(buffer => loadBuffer(buffer, imgs[2]))

      changeBufferColor(this.tinyClodBuffer, '#e9fcff')
      changeBufferColor(this.superTinyClodBuffer, '#c6f7ff')
      drawOnBuffer(this.superTinyClodBuffer, imgs[3], 15, 4, 15, 6)

      const clodBuffers = [this.clodBuffer, this.handsomeClodBuffer, this.tinyClodBuffer, this.superTinyClodBuffer]
      clodBuffers.map(buffer => changeBufferColor(buffer, 'rgba(0, 20, 50, 0.45)'))

      this.resize(this.canvas, true)
      this.loadedCallback()
    })
  }

  this.tick = 60

  this.handsomeClods = []
  this.tinyClods = []

  function HandsomeClod (i, j, parent) {
    this.parent = parent
    this.i = i
    this.j = j
    this.live = true

    this.update = function () {
      this.i += 1
      if (this.i > this.parent.max_i) {
        this.live = false
      }
    }
  }

  function TinyClod (y, parent) {
    this.parent = parent
    this.x = -(this.parent.coveringWidth - this.parent.canvas.width) / 2 - this.parent.tinyClodBuffer.width
    this.y = y
    this.live = true
    this.superTiny = (Math.random() > 0.8)

    this.update = function () {
      if (this.superTiny) {
        this.x += 1.2
      } else {
        this.x += 0.4
      }
      if (this.x > this.parent.coveringWidth) {
        this.live = false
      }
    }
  }

  this.isHandsome = (i, j) => {
    for (let x = 0; x < this.handsomeClods.length; x++) {
      if (this.handsomeClods[x].i === i && this.handsomeClods[x].j === j) {
        return true
      }
    }

    return false
  }

  this.resize = (canvas, init = false) => {
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    if ((displayWidth !== canvas.width ||
        displayHeight !== canvas.height) || init) {
      this.coveringWidth = Math.ceil(displayWidth * Math.cos(Math.abs(canvasAngle)) +
                            displayHeight * Math.sin(Math.abs(canvasAngle)))
      this.coveringHeight = Math.ceil(displayWidth * Math.sin(Math.abs(canvasAngle)) +
                             displayHeight * Math.cos(Math.abs(canvasAngle)))

      canvas.width = displayWidth
      canvas.height = displayHeight

      this.max_i = (this.coveringWidth / clodXOffset) + 1
      this.max_j = (this.coveringHeight / clodYOffset) + 1

      this.handsomeClods = []
      this.tinyClods = []

      const obj = new HandsomeClod(Math.floor(Math.random() * this.max_i), Math.floor(Math.random() * this.max_j), this)
      this.handsomeClods.push(obj)

      return true
    }

    return false
  }

  this.drawCanvas = () => {
    this.ctx.resetTransform()

    this.resize(this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.rotate(canvasAngle)
    this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2)

    // generate and draw tiny clouds
    if (Math.random() > 0.9975) {
      const obj = new TinyClod(Math.floor(Math.random() * this.canvas.height), this)
      this.tinyClods.push(obj)
    }

    const tempTinyClods = []
    for (let i = 0; i < this.tinyClods.length; i++) {
      // ctx.clearRect(tinyClods[i].x-1, tinyClods[i].y-1, tinyClodBuffer.width+2, tinyClodBuffer.height+2);
      this.tinyClods[i].update()
      if (this.tinyClods[i].live) {
        tempTinyClods.push(this.tinyClods[i])

        if (this.tinyClods[i].superTiny) {
          this.ctx.drawImage(this.superTinyClodBuffer, this.tinyClods[i].x, this.tinyClods[i].y)
        } else {
          this.ctx.drawImage(this.tinyClodBuffer, this.tinyClods[i].x, this.tinyClods[i].y)
        }
      }
    }
    this.tinyClods = tempTinyClods

    // draw large clouds
    for (let i = 0; i < this.max_i; i++) {
      for (let j = 0; j < this.max_j; j++) {
        // const oldX = -(coveringWidth - canvas.width)/2 - 240 + i*clodXOffset + oldTick + (j%2)*(clodXOffset/2);

        const x = -(this.coveringWidth - this.canvas.width) / 2 - 240 + i * clodXOffset + this.tick + (j % 2) * (clodXOffset / 2)
        const y = -(this.coveringHeight - this.canvas.height) / 2 - 30 + j * clodYOffset

        // ctx.clearRect(oldX-1, y-1, clodBuffer.width+2, clodBuffer.height+2);

        if (i === 0 && this.tick === 0) {
          // mayhaps consider generating a handsome clod
          // if we're just starting off
          if (Math.random() > 0.95) {
            const obj = new HandsomeClod(i, j, this)
            this.handsomeClods.push(obj)
          }
        }

        if (this.isHandsome(i, j)) {
          this.ctx.drawImage(this.handsomeClodBuffer, x, y)
        } else {
          this.ctx.drawImage(this.clodBuffer, x, y)
        }
      }
    }

    this.tick += delta_t

    if (this.tick >= clodXOffset) {
      this.tick = 0

      const tempClods = []

      for (let i = 0; i < this.handsomeClods.length; i++) {
        this.handsomeClods[i].update()

        if (this.handsomeClods[i].live) {
          tempClods.push(this.handsomeClods[i])
        }
      }

      this.handsomeClods = tempClods
    }

    this.ctx.resetTransform()

    this.ctx.translate(0, this.canvas.height - 150)
    this.ctx.fillStyle = this.lowerGradient
    this.ctx.fillRect(0, 0, this.canvas.width, 150)
    this.ctx.resetTransform()

    this.ctx.drawImage(this.myBuffer, (this.canvas.width / 2) - 50, this.canvas.height - this.myBuffer.height + 50)

    this.requestId = requestAnimationFrame(this.drawCanvas)
  }

  this.cancel = () => {
    cancelAnimationFrame(this.requestId)
  }

  this.start = () => {
    if (!this.initialized) {
      this.init()
      this.initialized = true
    }

    this.requestId = requestAnimationFrame(this.drawCanvas)
  }
}

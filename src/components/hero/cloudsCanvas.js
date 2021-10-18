import Clod from './clod.svg'
import HandsomeClodImg from './handsome_clod.svg'
import Glasses from './glasses.svg'
import Coding from './coding.svg'
import { rhythmpx } from '../global'
import { rhythm } from '../../utils/typography'

function loadImage (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', () => reject())
  })
}

function createBuffer (width, height, dpr) {
  const buffer = document.createElement('canvas')
  buffer.width = width*dpr
  buffer.height = height*dpr

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

  const canvasAngle = (Math.PI / 180) * (-10)
  const clodXOffset = 200
  const clodYOffset = 100
  

  this.init = () => {
    this.dpr = window.devicePixelRatio || 1
    this.delta_t = 0.2*this.dpr

    this.coveringWidth = 0
    this.coveringHeight = 0
    this.max_i = 0
    this.max_j = 0
  
    this.clodBuffer = createBuffer(120, 68, this.dpr)
    this.handsomeClodBuffer = createBuffer(120, 68, this.dpr)
    this.tinyClodBuffer = createBuffer(90, 51, this.dpr)
    this.superTinyClodBuffer = createBuffer(30, 17, this.dpr)
    this.myBuffer = createBuffer(467, 309, this.dpr)
  
    this.requestId = 0
    
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

      changeBufferColor(this.clodBuffer, '#7AC1D4')
      changeBufferColor(this.handsomeClodBuffer, '#7AC1D4')
      changeBufferColor(this.tinyClodBuffer, '#45B8D6')
      changeBufferColor(this.superTinyClodBuffer, '#1DA7CB')
      drawOnBuffer(this.superTinyClodBuffer, imgs[3], 15*this.dpr, 4*this.dpr, 15*this.dpr, 6*this.dpr)

      const clodBuffers = [this.clodBuffer, this.handsomeClodBuffer, this.tinyClodBuffer, this.superTinyClodBuffer]
      // clodBuffers.map(buffer => changeBufferColor(buffer, 'rgba(0, 20, 50, 0.45)'))

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
    this.x = -(this.parent.coveringWidth - this.parent.displayWidth) / 2 - this.parent.tinyClodBuffer.width
    this.y = y
    this.live = true
    this.superTiny = (Math.random() > 0.95)

    this.update = function () {
      if (this.superTiny) {
        this.x += 1.2*this.parent.dpr
      } else {
        this.x += 0.4*this.parent.dpr
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
     this.displayWidth = Math.floor(canvas.clientWidth*this.dpr)
     this.displayHeight = Math.floor(canvas.clientHeight*this.dpr)

    if ((this.displayWidth !== canvas.width ||
        this.displayHeight !== canvas.height) || init) {
      this.coveringWidth = Math.ceil(this.displayWidth * Math.cos(Math.abs(canvasAngle)) +
                            this.displayHeight * Math.sin(Math.abs(canvasAngle)))
      this.coveringHeight = Math.ceil(this.displayWidth * Math.sin(Math.abs(canvasAngle)) +
                             this.displayHeight * Math.cos(Math.abs(canvasAngle)))

      canvas.width = this.displayWidth
      canvas.height = this.displayHeight

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

  this.resetTransform = () => {
    this.ctx.resetTransform()
    // this.ctx.scale(this.dpr, this.dpr)
  }

  this.drawCanvas = () => {
    this.resize(this.canvas)
    this.resetTransform()

    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight)

    this.ctx.translate(this.displayWidth / 2, this.displayHeight / 2)
    this.ctx.rotate(canvasAngle)
    this.ctx.translate(-this.displayWidth / 2, -this.displayHeight / 2)

    // generate and draw tiny clouds
    if (Math.random() > 0.999) {
      const obj = new TinyClod(Math.floor(Math.random() * this.displayHeight), this)
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
        // const oldX = -(coveringWidth - displayWidth)/2 - 240 + i*clodXOffset + oldTick + (j%2)*(clodXOffset/2);

        const x = -(this.coveringWidth - this.displayWidth) / 2 - 240*this.dpr + i * clodXOffset*this.dpr + this.tick + (j % 2) * (clodXOffset*this.dpr / 2)
        const y = -(this.coveringHeight - this.displayHeight) / 2 - 30*this.dpr + j * clodYOffset*this.dpr

        // ctx.clearRect(oldX-1, y-1, clodBuffer.width+2, clodBuffer.height+2);

        if (i === 0 && this.tick === 0) {
          // mayhaps consider generating a handsome clod
          // if we're just starting off
          if (Math.random() > 0.97) {
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

    this.tick += this.delta_t

    if (this.tick >= clodXOffset*this.dpr) {
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

    this.resetTransform()

    this.ctx.translate(0, this.displayHeight - 150)
    this.ctx.fillStyle = this.lowerGradient
    this.ctx.fillRect(0, 0, this.displayWidth, 150)
    this.resetTransform()

    const lineWidth = 10*this.dpr
    const borderGap = 20*this.dpr
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = '#FFF'

    if (this.displayWidth > 1280*this.dpr) {
      this.ctx.strokeRect((this.displayWidth - 1280*this.dpr)/2 + lineWidth/2 + borderGap, lineWidth/2 + borderGap,
        1280*this.dpr - lineWidth - 2*borderGap, this.displayHeight - lineWidth - 2*borderGap)
    } else {
      this.ctx.strokeRect(lineWidth/2 + borderGap, lineWidth/2 + borderGap,
        this.displayWidth - lineWidth - 2*borderGap, this.displayHeight - lineWidth - 2*borderGap)
    }

    this.resetTransform()

    if (this.displayWidth > 1200*this.dpr) {
      this.ctx.drawImage(this.myBuffer, (this.displayWidth / 2) + 50*this.dpr, this.displayHeight - this.myBuffer.height + rhythmpx(2))
    } else if (this.displayWidth > 700*this.dpr) {
      const x_0 = 700*this.dpr
      const x_1 = 1200*this.dpr
      const y_0 = -(this.myBuffer.width/2)
      const y_1 = 50*this.dpr
      const x = this.displayWidth
      const y = (y_0*(x_1 - x) + y_1*(x - x_0))/(x_1 - x_0)

      this.ctx.drawImage(this.myBuffer, (this.displayWidth/2) + y, this.displayHeight - this.myBuffer.height + rhythmpx(2))
    } else if (this.displayWidth > 600*this.dpr) {
      this.ctx.drawImage(this.myBuffer, (this.displayWidth / 2) - this.myBuffer.width/2, this.displayHeight - this.myBuffer.height + rhythmpx(2))
    } else {
      const drawWidth = this.displayWidth*0.75;
      const drawHeight = drawWidth*(this.myBuffer.height/this.myBuffer.width)
      this.ctx.drawImage(this.myBuffer, (this.displayWidth / 2) - drawWidth/2, this.displayHeight - drawHeight + rhythmpx(2), drawWidth, drawHeight)
    }

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

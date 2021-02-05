import Clod from './clod.svg'
import HandsomeClodImg from './handsome_clod.svg'
import Glasses from './glasses.svg'
import Coding from './coding.svg'

let cloudsRequestId

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

export function cloudsCancel () {
  cancelAnimationFrame(cloudsRequestId)
}

export function cloudsCanvas (ref, loadedCallback) {
  const canvas = ref.current

  const ctx = canvas.getContext('2d')
  let coveringWidth = 0
  let coveringHeight = 0
  const canvasAngle = (Math.PI / 180) * (-10)

  const clodXOffset = 200
  const clodYOffset = 100

  const delta_t = 0.2

  let max_i = 0
  let max_j = 0

  const clodBuffer = createBuffer(120, 68)
  const handsomeClodBuffer = createBuffer(120, 68)
  const tinyClodBuffer = createBuffer(90, 51)
  const superTinyClodBuffer = createBuffer(30, 17)
  const myBuffer = createBuffer(467, 309)

  const images = [Coding, Clod, HandsomeClodImg, Glasses]
  Promise.all(images.map(imgFile => loadImage(imgFile)))
  .then(imgs => {
    loadBuffer(myBuffer, imgs[0])
    loadBuffer(clodBuffer, imgs[1])

    const handsomeBuffers = [handsomeClodBuffer, tinyClodBuffer, superTinyClodBuffer]
    handsomeBuffers.map(buffer => loadBuffer(buffer, imgs[2]))

    changeBufferColor(tinyClodBuffer, '#e9fcff')
    changeBufferColor(superTinyClodBuffer, '#c6f7ff')
    drawOnBuffer(superTinyClodBuffer, imgs[3], 15, 4, 15, 6)

    const clodBuffers = [clodBuffer, handsomeClodBuffer, tinyClodBuffer, superTinyClodBuffer]
    clodBuffers.map(buffer => changeBufferColor(buffer, 'rgba(0, 20, 50, 0.45)'))

    resize(canvas, true)
    loadedCallback()
  })

  let tick = 60

  let handsomeClods = []
  let tinyClods = []

  function HandsomeClod (i, j) {
    this.i = i
    this.j = j
    this.live = true

    this.update = function () {
      this.i += 1
      if (this.i > max_i) {
        this.live = false
      }
    }
  }

  function TinyClod (y) {
    this.x = -(coveringWidth - canvas.width) / 2 - tinyClodBuffer.width
    this.y = y
    this.live = true
    this.superTiny = (Math.random() > 0.8)

    this.update = function () {
      if (this.superTiny) {
        this.x += 1.2
      } else {
        this.x += 0.4
      }
      if (this.x > coveringWidth) {
        this.live = false
      }
    }
  }

  function isHandsome (i, j) {
    for (let x = 0; x < handsomeClods.length; x++) {
      if (handsomeClods[x].i === i && handsomeClods[x].j === j) {
        return true
      }
    }

    return false
  }

  function resize (canvas, init = false) {
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    if ((displayWidth !== canvas.width ||
        displayHeight !== canvas.height) || init) {
      coveringWidth = Math.ceil(displayWidth * Math.cos(Math.abs(canvasAngle)) +
                            displayHeight * Math.sin(Math.abs(canvasAngle)))
      coveringHeight = Math.ceil(displayWidth * Math.sin(Math.abs(canvasAngle)) +
                             displayHeight * Math.cos(Math.abs(canvasAngle)))

      canvas.width = displayWidth
      canvas.height = displayHeight

      max_i = (coveringWidth / clodXOffset) + 1
      max_j = (coveringHeight / clodYOffset) + 1

      handsomeClods = []
      tinyClods = []

      const obj = new HandsomeClod(Math.floor(Math.random() * max_i), Math.floor(Math.random() * max_j))
      handsomeClods.push(obj)

      return true
    }

    return false
  }

  const lowerGradient = ctx.createLinearGradient(0, 0, 0, 150)
  lowerGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  lowerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)')

  function drawCanvas (now) {
    ctx.resetTransform()

    resize(canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(canvasAngle)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // generate and draw tiny clouds
    if (Math.random() > 0.9975) {
      const obj = new TinyClod(Math.floor(Math.random() * canvas.height))
      tinyClods.push(obj)
    }

    const tempTinyClods = []
    for (let i = 0; i < tinyClods.length; i++) {
      // ctx.clearRect(tinyClods[i].x-1, tinyClods[i].y-1, tinyClodBuffer.width+2, tinyClodBuffer.height+2);
      tinyClods[i].update()
      if (tinyClods[i].live) {
        tempTinyClods.push(tinyClods[i])

        if (tinyClods[i].superTiny) {
          ctx.drawImage(superTinyClodBuffer, tinyClods[i].x, tinyClods[i].y)
        } else {
          ctx.drawImage(tinyClodBuffer, tinyClods[i].x, tinyClods[i].y)
        }
      }
    }
    tinyClods = tempTinyClods

    // draw large clouds
    for (let i = 0; i < max_i; i++) {
      for (let j = 0; j < max_j; j++) {
        // const oldX = -(coveringWidth - canvas.width)/2 - 240 + i*clodXOffset + oldTick + (j%2)*(clodXOffset/2);

        const x = -(coveringWidth - canvas.width) / 2 - 240 + i * clodXOffset + tick + (j % 2) * (clodXOffset / 2)
        const y = -(coveringHeight - canvas.height) / 2 - 30 + j * clodYOffset

        // ctx.clearRect(oldX-1, y-1, clodBuffer.width+2, clodBuffer.height+2);

        if (i === 0 && tick === 0) {
          // mayhaps consider generating a handsome clod
          // if we're just starting off
          if (Math.random() > 0.95) {
            const obj = new HandsomeClod(i, j)
            handsomeClods.push(obj)
          }
        }

        if (isHandsome(i, j)) {
          ctx.drawImage(handsomeClodBuffer, x, y)
        } else {
          ctx.drawImage(clodBuffer, x, y)
        }
      }
    }

    tick += delta_t

    if (tick >= clodXOffset) {
      tick = 0

      const tempClods = []

      for (let i = 0; i < handsomeClods.length; i++) {
        handsomeClods[i].update()

        if (handsomeClods[i].live) {
          tempClods.push(handsomeClods[i])
        }
      }

      handsomeClods = tempClods
    }

    ctx.resetTransform()

    ctx.translate(0, canvas.height - 150)
    ctx.fillStyle = lowerGradient
    ctx.fillRect(0, 0, canvas.clientWidth, 150)
    ctx.resetTransform()

    ctx.drawImage(myBuffer, (canvas.clientWidth / 2) - 50, canvas.clientHeight - myBuffer.height + 50)

    cloudsRequestId = requestAnimationFrame(drawCanvas)
  }

  cloudsRequestId = requestAnimationFrame(drawCanvas)
}

import Clod from './clod.svg'
import HandsomeClodImg from './handsome_clod.svg'
import Glasses from './glasses.svg'
import Coding from './coding.svg'

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = url
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', () => reject())
  })
}

export function cloudsCanvas(ref) {
  const canvas = ref.current;

  const ctx = canvas.getContext("2d");
  let coveringWidth = 0;
  let coveringHeight = 0;
  const canvasAngle = (Math.PI/180)*(-10);

  let init = false;

  const clodXOffset = 200;
  const clodYOffset = 100;

  let max_i = 0;
  let max_j = 0;

  const clodBuffer = document.createElement('canvas');
  clodBuffer.width = 120;
  clodBuffer.height = 68;
  const handsomeClodBuffer = document.createElement('canvas');
  handsomeClodBuffer.width = 120;
  handsomeClodBuffer.height = 68;
  const tinyClodBuffer = document.createElement('canvas');
  tinyClodBuffer.width = 90;
  tinyClodBuffer.height = 51;
  const superTinyClodBuffer = document.createElement('canvas');
  superTinyClodBuffer.width = 30;
  superTinyClodBuffer.height = 17;

  const myBuffer = document.createElement('canvas');
  myBuffer.width = 467;
  myBuffer.height = 309;

  Promise.all([loadImage(Coding), loadImage(Clod),
    loadImage(HandsomeClodImg), loadImage(Glasses)])
  .then(imgs => {
    const me = imgs[0]
    const myBufferCtx = myBuffer.getContext("2d");
    myBufferCtx.drawImage(me, 0, 0);

    const clod = imgs[1]
    const clodBufferCtx = clodBuffer.getContext("2d");
    clodBufferCtx.drawImage(clod, 0, 0);

    const handsomeClod = imgs[2]
    const glasses = imgs[3]

    const handsomeClodCtx = handsomeClodBuffer.getContext("2d");
    handsomeClodCtx.clearRect(0, 0, handsomeClodBuffer.width, handsomeClodBuffer.height);
    handsomeClodCtx.drawImage(handsomeClod, 0, 0);

    const tinyClodCtx = tinyClodBuffer.getContext("2d");
    tinyClodCtx.clearRect(0, 0, tinyClodBuffer.width, tinyClodBuffer.height);
    tinyClodCtx.drawImage(handsomeClod, 0, 0, tinyClodBuffer.width, tinyClodBuffer.height);
    tinyClodCtx.globalCompositeOperation = "source-in";
    tinyClodCtx.fillStyle = "#e9fcff";
    tinyClodCtx.fillRect(0, 0, tinyClodBuffer.width, tinyClodBuffer.height);
    tinyClodCtx.globalCompositeOperation = "source-over";

    const superTinyClodCtx = superTinyClodBuffer.getContext("2d");
    superTinyClodCtx.clearRect(0, 0, superTinyClodBuffer.width, superTinyClodBuffer.height);
    superTinyClodCtx.drawImage(handsomeClod, 0, 0, superTinyClodBuffer.width, superTinyClodBuffer.height);
    superTinyClodCtx.globalCompositeOperation = "source-in";
    superTinyClodCtx.fillStyle = "#c6f7ff";
    superTinyClodCtx.fillRect(0, 0, superTinyClodBuffer.width, superTinyClodBuffer.height);
    superTinyClodCtx.globalCompositeOperation = "source-over";
    superTinyClodCtx.drawImage(glasses, 15, 4, 15, 6);
  })
  
  let oldTick = 59;
  let tick = 60;

  let handsomeClods = [];
  let tinyClods = [];

  function HandsomeClod(i, j) {
    this.i = i;
    this.j = j;
    this.live = true;

    this.update = function() {
      this.i += 1;
      if (this.i > max_i) {
        this.live = false;
      }
    }
  }

  function TinyClod(y) {
    this.x = -(coveringWidth-canvas.width)/2 - tinyClodBuffer.width;
    this.y = y;
    this.live = true;
    this.superTiny = (Math.random() > 0.8);

    this.update = function() {
      if (this.superTiny) {
        this.x += 6;
      } else {
        this.x += 2;
      }
      if (this.x > coveringWidth) {
        this.live = false;
      }
    }
  }

  function isHandsome(i, j) {
    for (let x = 0; x < handsomeClods.length; x++) {
      if (handsomeClods[x].i == i && handsomeClods[x].j == j) {
        return true;
      }
    }

    return false;
  }

  function resize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if ((displayWidth != canvas.width ||
        displayHeight != canvas.height) || !init) {

      coveringWidth = Math.ceil(displayWidth*Math.cos(Math.abs(canvasAngle)) +
                            displayHeight*Math.sin(Math.abs(canvasAngle)));
      coveringHeight = Math.ceil(displayWidth*Math.sin(Math.abs(canvasAngle)) +
                             displayHeight*Math.cos(Math.abs(canvasAngle)));

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      max_i = (coveringWidth/clodXOffset)+1;
      max_j = (coveringHeight/clodYOffset)+1;

      handsomeClods = [];
      tinyClods = [];

      const obj = new HandsomeClod(Math.floor(Math.random()*max_i), Math.floor(Math.random()*max_j));
      handsomeClods.push(obj);

      init = true;

      return true;
    }

    return false;
  }
  
  function drawCanvas(now) {
    ctx.resetTransform();

    resize(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(canvasAngle);
    ctx.translate(-canvas.width/2, -canvas.height/2);

    // generate and draw tiny clouds
    if (Math.random() > 0.99) {
      const obj = new TinyClod(Math.floor(Math.random()*canvas.height));
      tinyClods.push(obj);
    }

    let tempTinyClods = [];
    for (let i = 0; i < tinyClods.length; i++) {
      // ctx.clearRect(tinyClods[i].x-1, tinyClods[i].y-1, tinyClodBuffer.width+2, tinyClodBuffer.height+2);
      tinyClods[i].update();
      if (tinyClods[i].live) {
        tempTinyClods.push(tinyClods[i]);

        if (tinyClods[i].superTiny) {
          ctx.drawImage(superTinyClodBuffer, tinyClods[i].x, tinyClods[i].y);
        } else {
          ctx.drawImage(tinyClodBuffer, tinyClods[i].x, tinyClods[i].y);
        }
      }
    }
    tinyClods = tempTinyClods;

    // draw large clouds
    for (let i = 0; i < max_i; i++) {
      for (let j = 0; j < max_j; j++) {
        // const oldX = -(coveringWidth - canvas.width)/2 - 240 + i*clodXOffset + oldTick + (j%2)*(clodXOffset/2);

        const x = -(coveringWidth - canvas.width)/2 - 240 + i*clodXOffset + tick + (j%2)*(clodXOffset/2);
        const y = -(coveringHeight - canvas.height)/2 - 30 + j*clodYOffset;

        // ctx.clearRect(oldX-1, y-1, clodBuffer.width+2, clodBuffer.height+2);

        if (i == 0 && tick == 0) {
          // mayhaps consider generating a handsome clod
          // if we're just starting off
          if (Math.random() > 0.95) {
            const obj = new HandsomeClod(i, j);
            handsomeClods.push(obj);
          }
        }

        if (isHandsome(i, j)) {
          ctx.drawImage(handsomeClodBuffer, x, y);
        } else {
          ctx.drawImage(clodBuffer, x, y);
        }
      }
    }

    oldTick = tick;
    tick += 1;

    if (tick == clodXOffset) {
      tick = 0;

      let tempClods = [];

      for (let i = 0; i < handsomeClods.length; i++) {
        handsomeClods[i].update();

        if (handsomeClods[i].live) {
          tempClods.push(handsomeClods[i]);
        }
      }

      handsomeClods = tempClods;
    }

    ctx.resetTransform();

    ctx.fillStyle = "rgba(0, 20, 50, 0.3)";
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.globalCompositeOperation = "source-over";

    ctx.drawImage(myBuffer, (canvas.clientWidth/2) - 50, canvas.clientHeight - myBuffer.height + 50);
    
    requestAnimationFrame(drawCanvas);
  }

  return requestAnimationFrame(drawCanvas);
}
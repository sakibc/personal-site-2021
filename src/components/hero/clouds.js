import React, { useRef, useEffect, useState } from 'react'

import { css } from '@emotion/react'
import { CloudsCanvas } from './cloudsCanvas'

export default function Clouds (props) {
  const ref = useRef()
  const [clouds, setClouds] = useState(new CloudsCanvas(ref, props.loadedCallback))

  useEffect(() => {
    clouds.start()

    return () => clouds.cancel()
  })

  return (
    <canvas
      ref={ref}
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 80vh;

        z-index: 0;
      `}
    />
  )
}

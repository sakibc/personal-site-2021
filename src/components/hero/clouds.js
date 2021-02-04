import React, { useRef, useEffect } from 'react'

import { css } from '@emotion/react'
import { cloudsCanvas, cloudsCancel } from './cloudsCanvas'

export default function Clouds (props) {
  const ref = useRef()

  useEffect(() => {
    cloudsCanvas(ref)

    return () => cloudsCancel()
  }, [])

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

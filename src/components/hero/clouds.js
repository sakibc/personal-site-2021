import React, { useRef, useEffect, useState } from 'react'

import { css } from '@emotion/react'
import { CloudsCanvas } from './cloudsCanvas'
import { rhythm } from '../../utils/typography'

export default function Clouds (props) {
  const ref = useRef()
  const [clouds] = useState(new CloudsCanvas(ref, props.loadedCallback))

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
        width: 100%;
        height: calc(min(800px, 80vh) - ${rhythm(2)});

        z-index: 0;
      `}
    />
  )
}

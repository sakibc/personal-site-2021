import React from "react"
import { useRef, useEffect } from "react"
import { css } from "@emotion/react"
import { cloudsCanvas } from "./cloudsCanvas"

export default function Clouds(props) {
  const ref = useRef()
  let requestId;

  useEffect(() => {
    requestId = cloudsCanvas(ref)

    return () => cancelAnimationFrame(requestId)
  }, []);

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
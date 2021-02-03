import React from "react"
import  { css } from "@emotion/react"
import { rhythm } from "../../utils/typography"
import { cssContainer, cssGroup } from "../global-css"
import Clouds from "./clouds"

export default function Hero({ id, children }) {
  return (
    <section id={id} className="hero-container"
      css={css`
        ${cssContainer};
        height: 80vh;
        background: #1767A8;
      `}
    >
      <div className="hero-group" css={css`
        ${cssGroup};
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        z-index: 1;

        h1 {
          font-size: ${rhythm(4)};
          margin-bottom: ${rhythm(6)};
          color: white;
        //   letter-spacing: -${rhythm(0.2)};
        }
        // p {
        //   margin-bottom: ${rhythm(5)};
        //   margin-left: ${rhythm(0.5)};
        // }
      `}>
        {children}
      </div>
      {<Clouds></Clouds>}
    </section>
  )
}
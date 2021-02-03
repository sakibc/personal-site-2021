import React from "react"
import  { css } from "@emotion/react"
import { cssContainer, cssGroup } from "./global-css"

export default function About({ id, children }) {
  return (
    <section id={id} className="about-container" css={css`
      ${cssContainer};
    `}>
      <div className="about-group" css={cssGroup}>
        {children}
      </div>
    </section>
  )
}
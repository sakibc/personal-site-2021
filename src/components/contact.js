import React from "react"
import  { css } from "@emotion/react"
import { rhythm } from "../utils/typography"

import { cssContainer, cssGroup } from "./global-css"

import Development from "../images/development.png"
import Development2x from "../images/development@2x.png"
import Development3x from "../images/development@3x.png"

export default function Contact({ id }) {
  return (
    <section id={id} className="contact-container" css={cssContainer}>
      <div className="contact-group" css={css`
        ${cssGroup};
        display: flex;
      `}>
        <div css={css`
          margin-right: ${rhythm(0.5)};
          flex: 1 1 0;
          width: 0;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          text-align:center;
        `}>
          <h2>Contact</h2>
          <p>Send me an email at sakib_c@outlook.com</p>

          <h2 id="links">Links</h2>
        </div>
        
        <img css={css`
          margin-left: ${rhythm(0.5)};
          padding-top: ${rhythm(1)};
          flex: 1 1 0;
          width: 0;
        `} src={Development} srcSet={`${Development2x} 2x, ${Development3x} 3x`}/>
      </div>
    </section>
  )
}
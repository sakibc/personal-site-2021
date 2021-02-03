import React from "react"
import { cssContainer, cssGroup } from "./global-css"

export default function Contact({ id, children }) {
  return (
    <section id={id} className="contact-container" css={cssContainer}>
      <div className="contact-group" css={cssGroup}>
        {children}
      </div>
    </section>
  )
}
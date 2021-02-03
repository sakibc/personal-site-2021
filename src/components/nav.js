import React, { useState, useEffect } from "react"
import  { css } from "@emotion/react"
import { cssGroup, rhythmpx, vhpx } from "./global-css"
import { rhythm } from "../utils/typography"

export default function Nav({ children }) {
  const [navOverBody, setNavOverBody] = useState(false)

  let throttleTimeout = null

  const handleScroll = () => {
    if (throttleTimeout === null) {
      throttleTimeout = requestAnimationFrame(() => {
        if (window.scrollY >= vhpx(80) - rhythmpx(2)) {
          if (!navOverBody) {
            setNavOverBody(true)
          }
        } else {
          if (navOverBody) {
            setNavOverBody(false)
          }
        }

        throttleTimeout = null
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <nav
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        height: ${rhythm(2)};
        top: 0;
        margin-top: -${rhythm(2)};
        z-index: 10;
        transition: background 0.2s, box-shadow 0.2s;

        a {
          color: white;
          padding-right: ${rhythm(1)};
          text-decoration: none;
          transition: color 0.2s;
        }

        ${navOverBody && `
          background-color: #faf6f6;
          box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
          a {
            color: black;
          }
        `}
      `}
    >
      <div className="nav-group"
        css={cssGroup}
      >
        {children}
      </div>
    </nav>
  )
}
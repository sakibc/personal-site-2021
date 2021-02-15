import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { cssGroup, rhythmpx, vhpx } from './global'
import { rhythm } from '../utils/typography'

export default function Nav () {
  const [navOverBody, setNavOverBody] = useState(false)

  let throttleTimeout = null

  const handleScroll = () => {
    if (throttleTimeout === null) {
      throttleTimeout = setInterval(() => {
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
      }, 100)
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
        text-shadow: ${rhythm(0.04)} ${rhythm(0.06)} #000;

        a {
          color: white;
          padding-right: ${rhythm(1)};
          text-decoration: none;
          transition: color 0.2s;
        }

        a:last-of-type {
          padding-right: 0;
        }

        ${navOverBody && `
          background-color: #faf6f6;
          box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
          text-shadow: none;
          a {
            color: black;
          }
        `}
      `}
    >
      <div
        className='nav-group'
        css={css`
          ${cssGroup};
          display: flex;
      `}
      >
        <a href='#about'>About</a>
        <a href='#gallery'>Gallery</a>
        <a href='#contact'>Contact</a>
        <a href='#links'>Links</a>

        {navOverBody &&
          <a
            css={css`
              flex-grow: 1;
              text-align: right;
            `}
            className={navOverBody ? 'fadeIn' : 'fadeOut'} href='#top'
          >Back to Top
          </a>}
      </div>
    </nav>
  )
}

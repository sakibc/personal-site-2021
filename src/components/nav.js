import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { cssGroup, hoverSimple, activeSimple, rhythmpx, vhpx } from './global'
import { rhythm } from '../utils/typography'

export default function Nav () {
  const [navOverBody, setNavOverBody] = useState(false)

  let throttleTimeout = null

  const handleScroll = () => {
    if (throttleTimeout === null) {
      throttleTimeout = setInterval(() => {
        const windowScrollY = window.scrollY
        if (((windowScrollY >= vhpx(80) - rhythmpx(2)) && (vhpx(80) < 800)) ||
            ((windowScrollY >= 800 - rhythmpx(2)) && (vhpx(80) >= 800))) {
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
    <nav css={css`
      position: sticky;
      height: ${rhythm(2)};
      top: 0;
      z-index: 0;
    `}>
    <div
      css={css`
        display: flex;
        justify-content: center;
        /* align-items: center; */
        background-color: white;
        height: ${rhythm(2)};
        top: 0;
        /* margin-top: -${rhythm(2)}; */
        /* z-index: 1; */
        transition: background 0.2s, box-shadow 0.2s;
        /* text-shadow: ${rhythm(0.04)} ${rhythm(0.06)} #000; */
        box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);

        a {
          /* z-index: 0; */
          position: relative;
          color: black;
          background: white;
          padding: 0 ${rhythm(0.5)};
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: ${rhythm(2)};
          /* margin-right: ${rhythm(1)}; */
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.2s, padding 0.2s, height 0.2s;

          &:hover {
            transform: translate3d(0, -${rhythm(0.5)}, 0);
            padding-bottom: ${rhythm(0.5)};
            height: ${rhythm(2.5)};
          }

          ${activeSimple};
        }

        a:last-of-type {
          margin-right: 0;
        }

        ${navOverBody && `
          background-color: white;
          text-shadow: none;
          a {
            &::after {
              content: '';
              position: absolute;
              height: 100%;
              width: 100%;
              background-color: white;
              top: 0;
              left: 0;
              z-index: -10;
              transition: box-shadow 0.05s;
            }
            &:hover {
              transform: none;
              padding-bottom: 0;
              padding-top: ${rhythm(0.5)};
              height: ${rhythm(2.5)};
              &::after {
                box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
              }
            }
            &:active {
              &::after {
                z-index: -10;
              }
            }
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
          <div css={css`
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
          `}>
            <a
              className={navOverBody ? 'fadeIn' : 'fadeOut'} href='#top'
            >Back to Top
            </a>
          </div>}
      </div>
    </div>
    </nav>
  )
}

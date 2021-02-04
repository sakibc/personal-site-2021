import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import { cssContainer, cssGroup } from './global-css'

import Development from '../images/development.png'
import Development2x from '../images/development@2x.png'
import Development3x from '../images/development@3x.png'

export default function About ({ id, children }) {
  return (
    <section
      id={id} className='about-container' css={css`
      ${cssContainer};
    `}
    >
      <div
        className='about-group' css={css`
        ${cssGroup};
        display: flex;
      `}
      >
        <img
          css={css`
          margin-right: ${rhythm(0.5)};
          padding-top: ${rhythm(1)};
          flex: 1 1 0;
          width: 0;
        `} src={Development} srcSet={`${Development2x} 2x, ${Development3x} 3x`}
        />
        <div css={css`
          margin-left: ${rhythm(0.5)};
          flex: 1 1 0;
          width: 0;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          text-align: center;
        `}
        >
          <h2 css={css`margin-top: 0;`}>About</h2>
          <p>Hi, I'm Sakib Chowdhury. I like making things.</p>
          <p>You can see some of the things I've made on this site. Just keep scrolling.</p>

          <a
            href='#' css={css`
              margin-top: ${rhythm(1)};
            `}
          >Download Résumé
          </a>
        </div>
      </div>
    </section>
  )
}

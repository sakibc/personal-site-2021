import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'

import { cssContainer, cssGroup } from './global'

import Development from '../images/development.png'
import Development2x from '../images/development@2x.png'
import Development3x from '../images/development@3x.png'

export default function Contact ({ id }) {
  return (
    <section id={id} className='contact-container' css={cssContainer}>
      <div
        className='contact-group' css={css`
        ${cssGroup};
        display: grid;
        grid-template-rows: 1fr auto auto auto auto 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "space1 images"
          "title1 images"
          "copy1  images"
          "title2 images"
          "copy2  images"
          "space2 images";
        justify-items: center;
        align-items: center;
        grid-gap: ${rhythm(1)};

        h2 {
          margin-bottom: 0;
        }
      `}
      >
        <h2 css={css`grid-area: title1;`}>Contact</h2>
        <p css={css`grid-area: copy1; margin: 0;`}>Send me an email at <a href="mailto:sakib_c@outlook.com">sakib_c@outlook.com</a>.</p>

        <h2 css={css`grid-area: title2;`} id='links'>Links</h2>
        <div css={css`
          grid-area: copy2;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
        `}>
          <a href="https://github.com/sakibc">GitHub</a>
          <a href="https://www.linkedin.com/in/sakib-chowdhury">LinkedIn</a>
          <a href="https://www.instagram.com/skbby_c/">Instagram</a>
        </div>

        <img css={css`
          grid-area: images;
          margin: ${rhythm(3)} 0 ${rhythm(2)} 0;
        `}
          src={Development} alt="cartoon Sakib frantically chiseling a website out of marble"
          srcSet={`${Development2x} 2x, ${Development3x} 3x`}
        />
      </div>
    </section>
  )
}

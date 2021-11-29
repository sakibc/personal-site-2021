import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

import { hover, active, bodyButton, cssContainer, cssGroup, mq } from './global'

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

        grid-template-rows: auto auto auto auto auto;
        grid-template-columns: auto;
        grid-template-areas:
          "title1"
          "copy1"
          "title2"
          "copy2"
          "images";
        grid-gap: ${rhythm(1)};
        padding: ${rhythm(2)} ${rhythm(1)};

        ${mq[0]} {
          grid-template-rows: 1fr auto auto auto auto 1fr;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "space1 images"
            "title1 images"
            "copy1  images"
            "title2 images"
            "copy2  images"
            "space2 images";
          grid-gap: ${rhythm(1)};
          padding: 0 ${rhythm(1)};
        }

        justify-items: center;
        align-items: center;


        h2 {
          margin-bottom: 0;
        }
      `}
      >
        <h2 css={css`grid-area: title1;`}>Contact</h2>
        <p css={css`
          grid-area: copy1;
          margin: 0;
          text-align: center;
        `}>Send me an email at <a href="mailto:sakib_c@outlook.com">sakib_c@outlook.com</a>.</p>

        <h2 css={css`grid-area: title2;`} id='links'>Links</h2>
        <div css={css`
          grid-area: copy2;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
        `}>
          <a href="https://github.com/sakibc" css={css`
            ${bodyButton};
            ${hover};
            ${active};

            margin-top: 0;
            width: 100%;
            text-align: center;
          `}><FaGithub/> GitHub</a>
          <a href="https://www.linkedin.com/in/sakib-chowdhury" css={css`
            ${bodyButton};
            ${hover};
            ${active};

            width: 100%;
            text-align: center;
          `}><FaLinkedin/> LinkedIn</a>
          <a href="https://www.instagram.com/skbby_c/" css={css`
            ${bodyButton};
            ${hover};
            ${active};

            width: 100%;
            text-align: center;
          `}><RiInstagramFill/> Instagram</a>
        </div>

        <img css={css`
          grid-area: images;

          margin: 0;
          
          ${mq[0]} {
            margin: ${rhythm(3)} 0 ${rhythm(2)} 0;
          }
         
        `}
          src={Development} alt="cartoon Sakib frantically chiseling a website out of marble"
          srcSet={`${Development2x} 2x, ${Development3x} 3x`}
        />
      </div>
    </section>
  )
}

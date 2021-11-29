import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import { cssContainer, cssGroup, hover, active, mq, bodyButton } from './global'

import { FaFileDownload } from 'react-icons/fa'

import Standing from '../images/standing.png'
import Standing2x from '../images/standing@2x.png'
import Standing3x from '../images/standing@3x.png'

export default function About ({ id }) {
  return (
    <section
      id={id} className='about-container' css={css`
      ${cssContainer};
    `}
    >
      <div
        className='about-group' css={css`
        ${cssGroup};
        display: grid;
        
        justify-items: center;
        align-items: center;

        grid-template-rows: auto auto auto;
        grid-template-columns: 1fr 2fr;
        grid-template-areas:
          "title title"
          "images copy"
          "resume resume";
        grid-gap: 0;
        padding: ${rhythm(2)} ${rhythm(1)};

        ${mq[0]} {
          grid-template-rows: 1fr auto auto auto 1fr;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "images space1"
            "images title"
            "images copy"
            "images resume"
            "images space2";
          grid-gap: ${rhythm(1)};
          padding: 0 ${rhythm(1)};
        }
      `}
      >
        <img
          css={css`
          grid-area: images;
          margin: 0;

          ${mq[0]} {
            margin: ${rhythm(3)} 0 ${rhythm(2)} 0;
          }
        `}
          src={Standing}
          alt="cartoon Sakib standing and smiling"
          srcSet={`${Standing2x} 2x, ${Standing3x} 3x`}
        />
        <h2 css={css`
          grid-area: title;
          margin: 0;
        `}>About</h2>
        <div css={css`
          grid-area: copy;
          text-align: center;
          p:last-child {
            margin-bottom: 0;
          }
        `}
        >
          <p>Hi, I'm Sakib Chowdhury. I like making things.</p>
          <p>You can see some of the things I've made on this site. Just keep scrolling.</p>
        </div>
        <a
          href='/sakibc_resume_oct_21.pdf' css={css`
            grid-area: resume;

            ${bodyButton};
            ${hover};
            ${active};
          `}
        ><FaFileDownload/> Download Résumé
        </a>
      </div>
    </section>
  )
}

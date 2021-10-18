import React, { useState } from 'react'

import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { cssContainer, cssGroup, mq } from '../global'
import Clouds from './clouds'
import Typist from 'react-typist'

export default function Hero ({ id }) {
  const [typeTagline, setTypeTagline] = useState(false)
  const [loaded, setLoaded] = useState(false)

  function loadedCallback() {
    setLoaded(true)
  }

  return (
    <section
      id={id} className='hero-container'
      css={css`
        ${cssContainer};
        height: calc(min(800px, 80vh) - ${rhythm(2)});
        background: #0098BF;
      `}
    >
      {loaded && <div
        className='hero-group' css={css`
        ${cssGroup};
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        z-index: 1;
        padding: min(240px, 24vh) ${rhythm(2)} 0 ${rhythm(2)};
        
        ${mq[2]} {
          padding: min(240px, 24vh) ${rhythm(1)} 0 ${rhythm(1)};
        }

        h1 {
          display: flex;

          font-size: 8vw;
          margin: 0 0 1vw;
          padding: 1.6vw;
          
          
          line-height: 1;
          color: black;
          background: white;

          box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.3);
/* 
          ${mq[1]} {
            font-size: ${rhythm(3.5)};
            margin: 0 0 ${rhythm(0.4375)} 0;
            padding: ${rhythm(0.7)};
          } */

          ${mq[2]} {
            font-size: ${rhythm(4)};
            margin: 0 0 ${rhythm(0.5)} 0;
            padding: ${rhythm(0.8)};
          }
        }
        h2 {
          display: flex;
          margin: 0;
          line-height: 1;
          color: black;
          background: white;
          text-align: left;
          box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.3);

          font-size: 4.5vw;
          padding: 1.5vw 1.6vw;

          ${mq[0]} {
            font-size: 27px;
            padding: 9px 1.6vw;
          }

          ${mq[1]} {
            font-size: 3vw;
            padding: 1vw 1.6vw;
          }

          ${mq[2]} {
            font-size: ${rhythm(1.6)};
            padding: ${rhythm(0.5)} ${rhythm(0.8)};
          }
        }

      `}
      >
        <h1>
          Sakib Chowdhury
        </h1>
        <h2>
          {/* artist, engineering intern (EIT) */}
          artist, developer
        </h2>
      </div>}
      <Clouds loadedCallback={loadedCallback}/>
    </section>
  )
}

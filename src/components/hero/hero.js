import React, { useState } from 'react'

import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { cssContainer, cssGroup } from '../global-css'
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
        height: 80vh;
        background: #1767a8;
      `}
    >
      {loaded && <div
        className='hero-group' css={css`
        ${cssGroup};
        // display: flex;
        // flex-flow: column nowrap;
        // justify-content: center;
        padding-top: 24vh;
        z-index: 1;

        h1 {
          font-size: ${rhythm(4)};
          margin: 0;
          line-height: 0.9;
          color: white;
          text-shadow: ${rhythm(0.2)} ${rhythm(0.3)} #000;
        }
        h2 {
          font-size: ${rhythm(2)};
          margin: 0;
          padding-left: ${rhythm(1.7)};
          color: white;
          text-shadow: ${rhythm(0.08)} ${rhythm(0.15)} #000;
          text-align: left;
        }

      `}
      >
        <h1>
          <Typist
            avgTypingDelay={35}
            cursor={{
              element: '▍',
              hideWhenDone: true
            }}
            onTypingDone={() => { setInterval(() => { setTypeTagline(true) }, 1000) }}
          >
            <Typist.Delay ms={500} />
            Sakib Chowdhury
          </Typist>
        </h1>
        {typeTagline && <h2>
          <Typist
            avgTypingDelay={35}
            cursor={{
              element: '▍'
            }}
          >
            <Typist.Delay ms={1500} />
            artist, engineer
          </Typist>
        </h2>}
      </div>}
      <Clouds loadedCallback={loadedCallback}/>
    </section>
  )
}

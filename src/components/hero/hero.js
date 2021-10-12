import React, { useState } from 'react'

import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { cssContainer, cssGroup } from '../global'
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
        background: #0098BF;
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
          line-height: 1;
          color: white;
          text-shadow: ${rhythm(0.16)} ${rhythm(0.25)} #000;
        }
        h2 {
          font-size: ${rhythm(2)};
          margin: 0;
          padding-left: ${rhythm(0.8)};
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
          >
            <Typist.Delay ms={100} />
            Sakib Chowdhury
          </Typist>
        </h1>
        <h2>
          <Typist
            avgTypingDelay={10}
            cursor={{
              element: '▍',
              hideWhenDone: true
            }}
          >
            <Typist.Delay ms={100} />
            artist, engineering intern (EIT)
          </Typist>
        </h2>
      </div>}
      <Clouds loadedCallback={loadedCallback}/>
    </section>
  )
}

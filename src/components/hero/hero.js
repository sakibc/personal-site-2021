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
        padding-top: min(240px, 24vh);
        z-index: 1;

        h1 {
          display: flex;
          font-size: ${rhythm(4)};
          margin: 0 0 ${rhythm(0.5)} 0;
          line-height: 1;
          color: black;
          background: white;
          padding: ${rhythm(0.8)};
          box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.3);
        }
        h2 {
          display: flex;
          font-size: ${rhythm(1.6)};
          margin: 0;
          line-height: 1;

          color: black;
          background: white;
          text-align: left;
          padding: ${rhythm(0.5)};
          padding-left: ${rhythm(0.8)};
          box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.3);

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

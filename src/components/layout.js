import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import { cssGlobal } from './global'
import { Helmet } from 'react-helmet'
import './layout.css'

export default function Layout ({ children }) {
  return (
    <div css={cssGlobal}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Sakib Chowdhury</title>
      </Helmet>
      {children}
      <footer
        css={css`
          text-align: center;
          background: #007BA7;
          color: white;
          padding: ${rhythm(0.4)};
          box-shadow: inset 0 15px 15px -15px rgba(0, 0, 0, 0.4);
          p {
            margin: 0;
            font-size: ${rhythm(0.6)};
          }
        `}
      >
        <p>&copy; 2022 Sakib Chowdhury - All rights reserved</p>
      </footer>
    </div>
  )
}

import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import { cssGlobal } from './global'
import './layout.css'

export default function Layout ({ children }) {
  return (
    <div css={cssGlobal}>
      {children}
      <footer
        css={css`
          text-align: center;
          background: #1767a8;
          color: white;
          padding: ${rhythm(0.4)};
          box-shadow: inset 0 15px 15px -15px rgba(0, 0, 0, 0.4);
          p {
            margin: 0;
            font-size: ${rhythm(0.6)};
          }
        `}
      >
        <p>Made with Gatsby and React</p>
        <p>&copy; 2021 Sakib Chowdhury - All rights reserved</p>
      </footer>
    </div>
  )
}

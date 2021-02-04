import React from 'react'
import { cssContainer, cssGroup } from '../global-css'

export default function Gallery ({ id, children }) {
  return (
    <section id={id} className='gallery-container' css={cssContainer}>
      <div className='gallery-group' css={cssGroup}>
        {children}
      </div>
    </section>
  )
}

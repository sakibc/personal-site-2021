import React from 'react'
import { cssContainer, cssGroup } from '../global-css'
import GalleryItem from './gallery-item'

export default function Gallery ({ id, data, children }) {
  return (
    <section id={id} className='gallery-container' css={cssContainer}>
      <div className='gallery-group' css={cssGroup}>
        {children}

        {data.allFile.edges.map(({ node }, index) => (
          <GalleryItem key={index} node={node}/>
        ))}
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { cssContainer, cssGroup } from '../global'
import GalleryItem from './gallery-item'

export default function Gallery ({ id, data }) {
  const itemCount = data.allFile.edges.length
  const [maximized, setMaximized] = useState(true)
  const [itemMaximized, setItemMaximized] =
    useState(Array(itemCount).fill(true))

  function maximizeCallback(index) {
    let currItemMaximized = itemMaximized
    currItemMaximized[index] = true
    setItemMaximized(currItemMaximized)
    setMaximized(true)
  }

  function minimizeCallback(index) {
    let currItemMaximized = itemMaximized
    currItemMaximized[index] = false
    setItemMaximized(currItemMaximized)
    setMaximized(false)
  }

  useEffect(() => {
    setItemMaximized(Array(itemCount).fill(false))
    setMaximized(false)
  }, [itemCount])

  return (
    <section id={id} className='gallery-container' css={cssContainer}>
      <div className='gallery-group' css={cssGroup}>
        <h2>Recent Projects</h2>

        <div css={css`
          display: flex;

          ${!maximized && `
            flex-flow: row wrap;
            justify-content: space-between;
          `}

          ${maximized && `
            flex-flow: column nowrap;
            justify-content: flex-start;
          `}
        `}>
          {data.allFile.edges.map(({ node }, index) => (
            <GalleryItem key={index} node={node} index={index}
              itemMaximized={itemMaximized[index]}
              parentMaximized={maximized}
              maximizeCallback={maximizeCallback}
              minimizeCallback={minimizeCallback}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

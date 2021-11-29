import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { hover, active, mq } from '../global'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function GalleryButton({ index, node, maximizeCallback, maximizedItems, transitionTime }) {
  const selfRef = useRef(null)

  const [allowHover, setAllowHover] = useState(!maximizedItems[index])

  useEffect(() => {
    setTimeout(() => {
      setAllowHover(true)
    }, transitionTime)
  }, [transitionTime])

  return (
    <div ref={selfRef} css={css`
      width: calc((100% - ${rhythm(1)})/2);
      padding-bottom: calc((100% - ${rhythm(1)})/2);
      position: relative;
      margin-bottom: ${rhythm(1)};

      ${mq[0]} {
        width: calc((100% - ${rhythm(3)})/4);
        padding-bottom: calc((100% - ${rhythm(3)})/4);
      }
    `}>
      <button
        onClick={() => {
          setAllowHover(false)
          maximizeCallback(index, node, selfRef.current.getBoundingClientRect())
        }}
        css={css`
        box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.1);
        position: absolute;
        overflow: hidden;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        border: none;
        padding: 0;

        ${allowHover && hover};
        ${active};

        ${allowHover && css`
          :hover {
            p {
              padding-bottom: ${rhythm(1)};
            }
          }
        `}

        :active {
          border: none;
        }
      `}>
        <GatsbyImage
          image={getImage(node.childMarkdownRemark.frontmatter.thumb)}
          alt={node.childMarkdownRemark.frontmatter.title}
          loading="eager"
        />
        <p css={css`
          color: white;
          background: rgba(0,0,0,0.4);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          padding: ${rhythm(0.5)} 0;
          margin: 0;
          transition: padding 0.2s;
        `}>{node.childMarkdownRemark.frontmatter.title}</p>
      </button>
    </div>
  )
}
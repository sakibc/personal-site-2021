import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { hover, active } from '../global'

export default function GalleryItem({ index, node, itemMaximized, parentMaximized,
  maximizeCallback, minimizeCallback }) {
  if (itemMaximized) {
    return (
      <div css={css`
        box-shadow: 20px 20px 60px 0px rgba(0,0,0,0.1);

        background: #fff;
        padding: ${rhythm(1)};
        /* margin-bottom: ${rhythm(1)}; */
      
        border-radius: ${rhythm(1)};

        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "images title"
          "images copy";
        column-gap: ${rhythm(1)};

        h3 {
          margin-top: 0;
        }

        p:last-child {
          margin-bottom: 0;
        }
      `}>
        <div css={css`
          display: flex;
          justify-content: space-between;
        `}>
          <h3 css={css`grid-area: title;`}>{node.childMarkdownRemark.frontmatter.title}</h3>
          <button
            onClick={() => minimizeCallback(index)}
          >Close</button>
        </div>
        <div css={css`grid-area: images;`}>
          {node.childMarkdownRemark.frontmatter.images.map((image, index) => (
            <Img key={index} fixed={image.childImageSharp.fixed} />
          ))}
        </div>

        <div css={css`grid-area: copy;`} dangerouslySetInnerHTML={{ __html: node.childMarkdownRemark.html }} />
      </div>
    )
  } else if (!parentMaximized) {
    return (
      <div css={css`
        width: calc((100% - ${rhythm(3)})/4);
        padding-bottom: calc((100% - ${rhythm(3)})/4);
        position: relative;
      `}>
        <button
          onClick={() => maximizeCallback(index)}
          css={css`
          box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.1);
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          background: #fff;
          border: none;

          ${hover};
          ${active};

        `}>{node.childMarkdownRemark.frontmatter.title}</button>
      </div>
    )
  }

  return null
}
import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'

export default function GalleryItem({ node }) {
  return (
    <div css={css`
      box-shadow: 20px 20px 60px 0px rgba(0,0,0,0.1);

      background: #fff;
      padding: ${rhythm(1)};
      margin-bottom: ${rhythm(1)};
    
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
      <h3 css={css`grid-area: title;`}>{node.childMarkdownRemark.frontmatter.title}</h3>
      <div css={css`grid-area: images;`}>
        {node.childMarkdownRemark.frontmatter.images.map((image, index) => (
          <Img key={index} fixed={image.childImageSharp.fixed} />
        ))}
      </div>

      <div css={css`grid-area: copy;`} dangerouslySetInnerHTML={{ __html: node.childMarkdownRemark.html }} />
    </div>
  )
}
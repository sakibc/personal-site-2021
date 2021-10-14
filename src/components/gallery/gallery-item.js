import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { hover, active, hoverSimple, activeSimple } from '../global'
import Slider from 'react-slick'
import './slick.scss'
import './slick-theme.scss'

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function GalleryItem({ index, node, itemMaximized, parentMaximized,
  maximizeCallback, minimizeCallback }) {

  if (itemMaximized) {
    return (
      <div css={css`
        box-shadow: 20px 20px 60px 0px rgba(0,0,0,0.1);

        background: #fff;
        padding: ${rhythm(1)};
        /* margin-bottom: ${rhythm(1)}; */
      
        /* border-radius: ${rhythm(1)}; */

        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "images title"
          "images copy";
        column-gap: ${rhythm(1)};

        .gatsby-image-wrapper, img {
          margin: 0;
        }

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
            css={css`
              border: none;
              background: none;
              margin-bottom: ${rhythm(1)};
              padding: 0;

              ${hoverSimple};
              ${activeSimple};
            `}
            onClick={() => minimizeCallback(index)}
            title="Close Item" aria-label="Close Item"
          >✕</button>
        </div>
        
        {
          (node.childMarkdownRemark.frontmatter.images.length > 1)
          ? <div css={css`
              grid-area: images;
              width: 100%;
              height: 100%;
              font-size: 0;
              overflow: hidden;
              border-style: solid;

              .gatsby-image-wrapper, .axis-vertical, img {
                margin: 0;
              }
            `}>
              <Slider {...settings}>
                {node.childMarkdownRemark.frontmatter.images.map((image, index) => (
                  <Img key={index} fluid={image.childImageSharp.fluid} />
                ))}
              </Slider>
            </div>
          : <Img
              css={css`
                grid-area: images;
              `}
              fluid={node.childMarkdownRemark.frontmatter.images[0].childImageSharp.fluid} />
        }

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
          padding: 0;

          ${hover};
          ${active};

          :hover {
            p {
              padding-bottom: ${rhythm(1)};
            }
          }

          :active {
            border: none;
          }
        `}>
          <Img
            fluid={node.childMarkdownRemark.frontmatter.thumb.childImageSharp.fluid} />
          <p css={css`
            color: white;
            background: rgba(0,0,0,0.2);
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

  return null
}
import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../../utils/typography'
import { hover, active, hoverSimple, activeSimple, mq } from '../global'
import Slider from 'react-slick'
import './slick.scss'
import './slick-theme.scss'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

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

        grid-template-rows: auto auto auto;
        grid-template-columns: auto;
        grid-template-areas:
          "title"
          "images"
          "copy";

          p:first-child {
            margin-top: ${rhythm(1)};
          }

        ${mq[0]} {
          grid-template-rows: auto 1fr;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-areas:
            "images title"
            "images copy";
          column-gap: ${rhythm(1)};
          max-height: 600px;

          p:first-child {
            margin-top: ${rhythm(0)};
          }
        }
        
        img {
          margin: 0;
        }

        h3 {
          margin-top: 0;
        }

        p {
          margin-bottom: ${rhythm(0.5)};
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
              font-size: 0;
              overflow: hidden;

              .slick-slider {
                border: solid;
              }
            `}>
              <Slider
              {...settings}>
                {node.childMarkdownRemark.frontmatter.images.map((image, index) => (
                  <GatsbyImage key={index} image={getImage(image)} alt={node.childMarkdownRemark.frontmatter.title} />
                ))}
              </Slider>
            </div>
          : <div css={css`
              grid-area: images;
            `}>
              <GatsbyImage 
              image={getImage(node.childMarkdownRemark.frontmatter.images[0])} alt={node.childMarkdownRemark.frontmatter.title}/>
            </div>
        }

        <div css={css`
          grid-area: copy;
          height: 100%;
          overflow: auto;
        `} dangerouslySetInnerHTML={{ __html: node.childMarkdownRemark.html }} />
      </div>
    )
  } else if (!parentMaximized) {
    return (
      <div css={css`
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
          onClick={() => maximizeCallback(index)}
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

  return null
}
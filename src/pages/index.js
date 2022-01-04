import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Hero from '../components/hero/hero'
import Nav from '../components/nav'
import Gallery from '../components/gallery/gallery'
import About from '../components/about'
import Contact from '../components/contact'

// Check if in browser or SSR
const isBrowser = typeof window !== "undefined"

// smoothscrolling in Safari from
// https://jonaskuske.github.io/smoothscroll-anchor-polyfill/#start

if (isBrowser) {
  if (!('scrollBehavior' in document.documentElement.style)) {

    // Wait until the Polyfills are loaded
    Promise.all([
      import('smoothscroll-polyfill'),
      import('smoothscroll-anchor-polyfill')
    ])
    // then use the modules however you want
    .then(([smoothscrollPolyfill, smoothscrollAnchorPolyfill]) => {
      // (Unlike this package, smoothscroll-polyfill needs to be actively invoked: )
      smoothscrollPolyfill.polyfill();
    });
  }
}

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Hero id='top' />
      <Nav />
      <About id='about' />
      <Gallery id='gallery' data={data} />
      <Contact id='contact' />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query {
  allFile(filter: {relativeDirectory: {eq: "gallery-items"}, extension: {eq: "md"}}, sort: {fields: childrenMarkdownRemark___frontmatter___order}) {
    edges {
      node {
        childMarkdownRemark {
          html
          frontmatter {
            title
            images {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  aspectRatio:1
                )
              }
            }
            thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  aspectRatio:1
                )
              }
            }
          }
        }
      }
    }
  }
}
`

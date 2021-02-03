import * as React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero/hero"
import Nav from "../components/nav"
import Gallery from "../components/gallery/gallery"
import About from "../components/about"
import Contact from "../components/contact"

const IndexPage = ({data}) => {
  return (
    <Layout>
      <Hero id="top"/>

      <Nav/>

      <About id="about"/>

      <Gallery id="projects">
        <h2>Projects</h2>

        {data.allFile.edges.map(({node}, index) => (
          <div key={index}>
            <h3>{node.childMarkdownRemark.frontmatter.title}</h3>
            {node.childMarkdownRemark.frontmatter.images.map((image, index) => (
              <Img key={index} fixed={image.childImageSharp.fixed}/>
            ))}
            <div dangerouslySetInnerHTML={{__html: node.childMarkdownRemark.html}}/>
          </div>
        ))}
      </Gallery>

      <Contact id="contact"/>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query {
  allFile(filter: {relativeDirectory: {eq: "gallery-items"}, extension: {eq: "md"}}, sort: {fields: childrenMarkdownRemark___frontmatter___title}) {
    edges {
      node {
        childMarkdownRemark {
          html
          frontmatter {
            title
            images {
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
}
`
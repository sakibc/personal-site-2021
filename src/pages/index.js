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
      <Hero id="top">
        <h1>Sakib Chowdhury</h1>
        {/* <p>Artist, Engineer</p> */}
      </Hero>

      <Nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href="#links">Links</a>
        <a href="#top">Top</a>
      </Nav>

      <About id="about">
        <h2>About</h2>
        <p>Hi, I'm Sakib Chowdhury. I like making things.</p>
        <p>You can see some of the things I've made on this site. Just keep scrolling.</p>

        <a href="#">Résumé</a>
        {/* <a href="#">Download</a> */}
      </About>

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

      <Contact id="contact">
        <h2>Contact</h2>
        <p>Email: sakib_c@outlook.com</p>
        <p>Or, fill out this form:</p>

        <h2 id="links">Links</h2>
      </Contact>
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
import  { css } from "@emotion/react"
import { rhythm } from "../utils/typography"

export const cssGroup = css`
  width: min(100vw, 960px);
  padding: 0 ${rhythm(1)};
`

export const cssContainer = css`
  display: flex;
  justify-content: center;
  background: #faf6f6;
  scroll-margin-top: calc(${rhythm(2)} - 1px);
`

export const cssGlobal = css`
  .gatsby-image-wrapper {
    margin-bottom: ${rhythm(1)};
  }
`

export const fontSize = parseInt(getComputedStyle(document.documentElement).fontSize)

export function vhpx(value) {
  return window.innerHeight*(value/100)
}

export function rhythmpx(value) {
  return fontSize*parseFloat(rhythm(value))
}
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'

const breakpoints = [600, 900, 1200]
export const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)

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

export const bodyButton = css`
  margin-top: ${rhythm(0.5)};
  text-decoration: none;
  background: #007BA7;
  color: white;
  padding: ${rhythm(0.75)} ${rhythm(1)};
  border-radius: ${rhythm(2)};
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.1);
`

export const cssGlobal = css`
`

export const fontSize = typeof window !== 'undefined' ? parseInt(getComputedStyle(document.documentElement).fontSize) : null

export function vhpx (value) {
  return window.innerHeight * (value / 100)
}

export function rhythmpx (value) {
  return fontSize * parseFloat(rhythm(value))
}

export const hover = css`
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale3d(1.05, 1.05, 1);
    box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.1);
    cursor: pointer;
  }
`

export const active = css`
  &:active {
    transform: scale3d(1, 1, 1);
    transition: none;
    filter: brightness(95%);
    box-shadow: inset 5px 5px 15px 0px rgba(0,0,0,0.1);
  }
`

export const hoverSimple = css`
  &:hover {
    transform: scale3d(1.05, 1.05, 1);
  }
`

export const activeSimple = css`
  &:active {
    /* transform: scale3d(1, 1, 1); */
    transition: none;
    /* filter: brightness(95%); */
    background: #f2f2f2;
  }
`
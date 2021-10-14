import Typography from 'typography'

export const headerFontFamily = [
  'Space Grotesk',
  'sans-serif'
]

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.3,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Space Grotesk',
      styles: ['400']
    },
    {
      name: 'Open Sans',
      styles: ['400']
    }
  ],
  headerFontFamily: headerFontFamily,
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  headerWeight: '400',
  headerGray: 0,
  bodyGray: 0,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h2: {
      textAlign: 'center',
    },
    p: {
      marginBottom: rhythm(0.3),
    },
    a: {
      fontFamily: ['Space Grotesk'].join(','),
    }
  })
})

export default typography
export const rhythm = typography.rhythm

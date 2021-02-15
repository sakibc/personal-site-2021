import Typography from 'typography'

export const headerFontFamily = [
  'Dosis',
  'sans-serif'
]

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.3,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Dosis',
      styles: ['500']
    },
    {
      name: 'Open Sans',
      styles: ['400']
    }
  ],
  headerFontFamily: headerFontFamily,
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  headerWeight: '500',
  headerGray: 0,
  bodyGray: 0,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h2: {
      textAlign: 'center',
    },
    p: {
      marginBottom: rhythm(0.3)
    }
  })
})

export default typography
export const rhythm = typography.rhythm

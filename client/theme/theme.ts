import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b28b64',
    },
    // secondary: {
    //   main: grey[700],
    // },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h5: {
      fontSize: '1.75rem',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
})

export default theme

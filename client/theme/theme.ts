import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b28b64',
    },
    secondary: {
      main: 'rgb(233, 30, 99)',
    },
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

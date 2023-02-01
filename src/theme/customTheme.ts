import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#FF0000'
    }
  //  success:{
  //   main: "#699C5D"
  //  }
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif;`
  }
})

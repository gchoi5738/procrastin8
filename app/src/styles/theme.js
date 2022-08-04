import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes
  } from "@material-ui/core/styles";
  import { colors } from "@material-ui/core";
  
  let theme = createMuiTheme({
    palette: {
      type: "dark",
      secondary: {
        main: colors.blue[200]
      }
    }
  });
  export default theme = responsiveFontSizes(theme);
  
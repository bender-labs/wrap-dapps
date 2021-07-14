import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD000',
    },
    background: {
      default: '#000000',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        variant: 'outlined',
        position: 'static',
        color: 'transparent',
        elevation: 0,
        sx: {
          padding: 2
        }
      },
    },
    MuiToolbar: {
      defaultProps: {
        sx: {
          ml: 'auto',
        }
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
        sx: {
          borderRadius: 25,
          mx: 1,
        }
      },
      styleOverrides: {},
    },

  },
});

export default theme;

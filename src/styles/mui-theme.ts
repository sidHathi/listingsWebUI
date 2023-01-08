import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
        danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
        danger?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
          main: '#313192',
        },
        secondary: {
          main: '#8B288F',
        },
        info: {
          main: '#4300af',
        },
      },
      typography: {
        h1: {
          fontWeight: 700,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 700,
        },
        h6: {
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 20,
      },
      components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                }
            },
        },
        MuiSlider: {
          styleOverrides: {
            root: {
              fontFamily: 'Regular'
            }
          }
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + $track': {
                    opacity: 1,
                    border: 'none',
                },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
                border: '4 px solid rgba(49, 49, 146, 0.5)',
                borderRadius: 15,
                color: 'rgba(49, 49, 146)',
                height: 30,
                padding: '0 30px',
                textTransform: 'none',
                fontSize: '0.9em !important',
                fontFamily:'Regular',
                '&:hover': {
                    color: 'black',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 12px',
                    border: 'none'

                },
            },
        }
      },
      MuiStepLabel: {
        styleOverrides: {
          root: {
            fontFamily: 'Regular',
          }
        }
      }
    }
});

export default theme;

declare module '@mui/material/styles' {
  interface TypographyVariants {
    ctaButton: React.CSSProperties;
    popoverTitle: React.CSSProperties;
    popoverContent: React.CSSProperties;
    popoverSubContent: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    ctaButton?: React.CSSProperties;
    popoverTitle?: React.CSSProperties;
    popoverContent?: React.CSSProperties;
    popoverSubContent?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ctaButton: true;
    popoverTitle: true;
    popoverContent: true;
    popoverSubContent: true;
  }
}

const primaryTextColor = '#120051';
const secondaryTextColor = '#23C0AD';
const defaultFontFamily = 'Roboto, sans-serif';

export const siteTheme = {
  typography: {
    fontFamily: defaultFontFamily,
    h1: {
      fontSize: '56px',
      fontWeight: 300,
      color: primaryTextColor,
    },
    h2: {
      fontSize: '36px',
      color: primaryTextColor,
    },
    h3: {
      fontSize: '28px',
      fontWeight: 300,
      fontStyle: 'italic',
      color: primaryTextColor,
    },
    body1: {
      fontSize: '28px',
      fontWeight: 300,
      color: primaryTextColor,
    },
    body2: {
      fontSize: '18px',
      fontWeight: 300,
      color: primaryTextColor,
    },
    ctaButton: {
      fontSize: '16px',
      fontFamily: defaultFontFamily,
      fontWeight: 300,
      textTransform: 'none',
    },
    popoverTitle: {
      fontSize: '20px',
      fontStyle: 'italic',
    },
    popoverContent: {
      fontSize: '16px',
    },
    popoverSubContent: {
      fontSize: '14px',
      color: `${secondaryTextColor} !important`,
    },
  },
  palette: {
    primary: {
      main: secondaryTextColor,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: secondaryTextColor,
          borderColor: secondaryTextColor,
          '&:hover': {
            color: '#fff',
            backgroundColor: secondaryTextColor,
          },
        },
      },
    },
  },
};

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { Session } from "next-auth";
import FooterBar from "components/Layout/footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

function DebugObserver(): any {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}


const theme= createTheme ({
  palette: {
    primary: {
      main: '#a96766',
    }, 
    secondary: {
      main: '#529696',
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <DebugObserver />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <FooterBar />
          </ThemeProvider>
        </SnackbarProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

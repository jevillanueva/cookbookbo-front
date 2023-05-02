import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { Session } from "next-auth";
import FooterBar from "components/Layout/footer";

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <DebugObserver />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Component {...pageProps} />
          <FooterBar/>
        </SnackbarProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

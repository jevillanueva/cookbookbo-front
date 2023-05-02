import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
import type { AppContext, AppProps } from "next/app";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { Session } from "next-auth";
import App from 'next/app'
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
        </SnackbarProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}
export default MyApp;

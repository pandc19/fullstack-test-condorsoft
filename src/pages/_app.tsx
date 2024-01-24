import { type NextPage } from "next";
import { type AppProps } from "next/app";
import { type AppType } from "next/dist/shared/lib/utils";
import type { ReactElement, ReactNode } from "react";
import Layout from "~/components/layout";
import GlobalStyle from "~/styles/globalStyles";

import "~/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <Layout>
      <GlobalStyle />

      <Component {...pageProps} />
    </Layout>
  )
};

export default MyApp;

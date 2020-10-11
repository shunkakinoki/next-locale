import {AppProps} from "next/app";
import Head from "next/head";
import * as React from "react";

const CustomApp = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sentrei</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;

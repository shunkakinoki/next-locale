import Link from "next/link";
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import * as React from "react";

export default function Two(props: NextPageContext) {
  const router = useRouter();

  return (
    <>
      <p id="two">two page</p>
      <p id="props">{JSON.stringify(props)}</p>
      <p id="router-locale">{router.locale}</p>
      <p id="router-locales">{JSON.stringify(router.locales)}</p>
      <p id="router-query">{JSON.stringify(router.query)}</p>
      <p id="router-pathname">{router.pathname}</p>
      <p id="router-as-path">{router.asPath}</p>
      <Link href="/">
        <a id="to-index">to /</a>
      </Link>
      <br />
    </>
  );
}

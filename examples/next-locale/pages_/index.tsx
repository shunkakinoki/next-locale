import Link from "next/link";
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import * as React from "react";
import {useTranslation} from "next-locale";

export default function Index(props: NextPageContext): JSX.Element {
  const router = useRouter();
  const {t} = useTranslation();

  return (
    <>
      <p>{t("index:index")}</p>
      <p>{t("index:nested.nested")}</p>
      <p id="index">index page</p>
      <p id="props">{JSON.stringify(props)}</p>
      <p id="router-locale">{router.locale}</p>
      <p id="router-locales">{JSON.stringify(router.locales)}</p>
      <p id="router-query">{JSON.stringify(router.query)}</p>
      <p id="router-pathname">{router.pathname}</p>
      <p id="router-as-path">{router.asPath}</p>
      <Link href="/two">
        <a id="to-two">to /two</a>
      </Link>
      <br />
      <Link href="/gsp">
        <a id="to-gsp">to /gsp</a>
      </Link>
      <br />
      <Link href="/gsp/fallback/one">
        <a id="to-fallback-one">to /gsp/fallback/one</a>
      </Link>
      <br />
      <Link href="/gsp/fallback/two">
        <a id="to-fallback-two">to /gsp/fallback/two</a>
      </Link>
      <br />
      <Link href="/gsp/no-fallback/one">
        <a id="to-no-fallback-one">to /gsp/no-fallback/one</a>
      </Link>
      <br />
      <Link href="/gssp">
        <a id="to-gssp">to /gssp</a>
      </Link>
      <br />
      <Link href="/gssp/one">
        <a id="to-gssp-slug">to /gssp/one</a>
      </Link>
      <br />
    </>
  );
}

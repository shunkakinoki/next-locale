import Link from "next/link";
import {useRouter} from "next/router";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {ParsedUrlQuery} from "querystring";
import * as React from "react";

export interface Props {
  params: ParsedUrlQuery;
  locale: string;
  locales: string[];
}

const Slug = ({
  params,
  locale,
  locales,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) return "Loading...";

  return (
    <>
      <p id="gsp">gsp page</p>
      <p id="props">{JSON.stringify({params, locale, locales})}</p>
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
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  locale,
  locales,
}) => {
  return {
    props: {
      params,
      locale,
      locales,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: ["one", "two"].map(slug => ({
      params: {slug},
    })),
    fallback: true,
  };
};

export default Slug;

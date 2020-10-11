import Link from "next/link";
import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <>
      <p id="gssp">gssp page</p>
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
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

export default Slug;

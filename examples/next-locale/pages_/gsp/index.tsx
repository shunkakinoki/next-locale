import Link from "next/link";
import {useRouter} from "next/router";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import * as React from "react";
import {useTranslation} from "next-locale";

export interface Props {
  locale: string;
  locales: string[];
}

const Index = ({
  locale,
  locales,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const {t} = useTranslation();

  return (
    <>
      <p>{t("index:index")}</p>
      <p id="gsp">gsp page</p>
      <p id="props">{JSON.stringify({locale, locales})}</p>
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
  locale,
  locales,
}) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export default Index;

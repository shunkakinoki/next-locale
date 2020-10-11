import Link from "next/link";
import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export interface Props {
  locale: string;
  locales: string[];
}

const Index = ({
  locale,
  locales,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <>
      <p id="gssp">gssp page</p>
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
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

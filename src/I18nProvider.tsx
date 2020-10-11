import * as React from "react";
import {useRouter} from "next/router";
import I18nContext from "./context";

export interface Props {
  namespaces: {[key: string]: number};
  children: React.ReactNode;
  internals: {};
}

const NsContext = React.createContext({});

export const setInternals = (l: {}) => Object.assign({}, l);

export default function I18nProvider({namespaces, children, internals}: Props) {
  const router = useRouter();
  const {locale} = router;

  const ns = React.useContext(NsContext);
  const allNamespaces: {[key: string]: number} = {...ns, ...namespaces};

  setInternals({...internals, locale});

  function t(key: string): string {
    const [namespace, i18nKey] = key.split(":");
    const dic = allNamespaces[namespace] || {};

    return i18nKey;
  }

  return (
    <I18nContext.Provider value={{t}}>
      <NsContext.Provider value={allNamespaces}>{children}</NsContext.Provider>
    </I18nContext.Provider>
  );
}

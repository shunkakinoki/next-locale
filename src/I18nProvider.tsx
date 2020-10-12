import * as React from "react";
import I18nContext from "./context";

export interface Props {
  children: React.ReactNode;
  locale: string;
  namespaces: any;
  debug?: true;
}

const NsContext = React.createContext<any>({});

export default function I18nProvider({
  namespaces,
  locale,
  children,
  debug,
}: Props) {
  const ns = React.useContext(NsContext);
  const allNamespaces = {...ns, ...namespaces};

  function t(key: string) {
    const k = Array.isArray(key) ? key[0] : key;
    const [namespace, i18nKey] = k.split(":");

    if (debug) {
      console.log(
        `allNamespaces: ${JSON.stringify(
          allNamespaces,
        )}, namespace: ${namespace}, i18nKey: ${i18nKey}`,
      );
    }

    return JSON.stringify(allNamespaces[locale]);
  }
  return (
    <I18nContext.Provider value={{t}}>
      <NsContext.Provider value={allNamespaces}>{children}</NsContext.Provider>
    </I18nContext.Provider>
  );
}

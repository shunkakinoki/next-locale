import * as React from "react";
import I18nContext from "./context";

export interface Props {
  namespaces: {[key: string]: number};
  children: React.ReactNode;
}

const NsContext = React.createContext({});

export default function I18nProvider({namespaces, children}: Props) {
  const ns = React.useContext(NsContext);
  const allNamespaces = {...ns, ...namespaces};

  function t(key = "") {
    const k = Array.isArray(key) ? key[0] : key;
    const [namespace, i18nKey] = k.split(":");

    return `allNamespaces: ${JSON.stringify(
      allNamespaces,
    )}, namespace: ${namespace}, i18nKey: ${i18nKey}`;
  }
  return (
    <I18nContext.Provider value={{t}}>
      <NsContext.Provider value={allNamespaces}>{children}</NsContext.Provider>
    </I18nContext.Provider>
  );
}

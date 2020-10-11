import * as React from "react";
import I18nContext from "./context";

export interface Props {
  children: React.ReactNode;
  namespaces: {[key: string]: {[key: string]: string}};
  debug?: true;
}

const NsContext = React.createContext({});

export default function I18nProvider({namespaces, children, debug}: Props) {
  const ns = React.useContext(NsContext);
  const allNamespaces = {...ns, ...namespaces};

  function t(key = "") {
    const k = Array.isArray(key) ? key[0] : key;
    const [namespace, i18nKey] = k.split(":");

    if (debug) {
      console.log(
        `allNamespaces: ${JSON.stringify(
          allNamespaces,
        )}, namespace: ${namespace}, i18nKey: ${i18nKey}`,
      );
    }

    return i18nKey;
  }
  return (
    <I18nContext.Provider value={{t}}>
      <NsContext.Provider value={allNamespaces}>{children}</NsContext.Provider>
    </I18nContext.Provider>
  );
}

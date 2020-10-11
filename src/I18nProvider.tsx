import * as React from "react";

export interface Props {
  namespaces: {[key: string]: number};
  children: React.ReactNode;
  internals: {};
}

export const setInternals = (l: {}) => Object.assign({}, l);

export default function I18nProvider({namespaces, children}: Props) {
  return <>{children}</>;
}

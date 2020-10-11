import * as React from "react";

const NextLocaleContext = React.createContext({
  t: (k: string) => (Array.isArray(k) ? k[0] : k),
});

export default NextLocaleContext;

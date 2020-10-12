import * as React from "react";

const NextLocaleContext = React.createContext({
  t: (k: string) => k,
});

export default NextLocaleContext;

import * as React from "react";

export default React.createContext({
  t: (k: string) => k,
});

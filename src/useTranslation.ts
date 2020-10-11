import * as React from "react";
import I18nContext from "./context";

export default function useTranslation() {
  return React.useContext(I18nContext);
}

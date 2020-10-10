import {useRouter} from "next/router";

import fs from "fs";
import {join} from "path";

const localePath = join(process.cwd(), "next-locale.json");

export default function useTranslation() {
  const router = useRouter();
  const {locale, defaultLocale} = router;
  const localeFile = fs.readFileSync(localePath, "utf8");
  let localeJson = JSON.parse(localeFile);

  function t(key: string) {
    const k = Array.isArray(key) ? key[0] : key;
    const [namespace, i18nKey] = k.split(":");
    if (!localeJson[namespace][key]) {
      console.warn(`Translation ${key} for locale '${locale}' was not found!`);
    }
    return (
      localeJson[namespace][i18nKey] ||
      localeJson[defaultLocale!][i18nKey] ||
      ""
    );
  }

  return {
    t,
    locale,
  };
}

import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import glob from "glob";

const i18nFile = path.resolve(process.cwd(), "i18n.json");

/* Check for i18n.json */
if (!fs.existsSync(i18nFile)) {
  console.warn(`Please put i18n.json at the root.`);
  process.exit(1);
}

/* Parse i18n.json */
var json = JSON.parse(fs.readFileSync(i18nFile, "utf8"));

/* Assign each object */
const {
  allLanguages = [],
  currentPagesDir = "pages_",
  defaultLanguage = "en",
  finalPagesDir = "pages",
  localesPath = "locales",
  pages = {},
}: {
  allLanguages: string[];
  currentPagesDir: string;
  defaultLanguage: string;
  finalPagesDir: string;
  localesPath: string;
  pages: {};
} = json;

console.log(
  allLanguages,
  currentPagesDir,
  defaultLanguage,
  finalPagesDir,
  localesPath,
  pages,
);

/* Check for currentPagesDir */
if (!fs.existsSync(currentPagesDir)) {
  console.warn(`Please put currentPagesDir at root.`);
  process.exit(1);
}

/* Clean up finalPagesDir */
rimraf.sync(finalPagesDir);

/* Try mkdir finalPagesDir */
try {
  fs.mkdirSync(finalPagesDir);
} catch (e) {}

/* Add all pages to array */
const parsedDir = currentPagesDir.replace(/\\/g, "/");
const allPages = glob.sync(parsedDir + "/**/*.*");

function clearPageExt(page: string) {
  const rgx = /(\/index\.jsx)|(\/index\.js)|(\/index\.tsx)|(\/index\.ts)|(\/index\.mdx)|(\.jsx)|(\.js)|(\.tsx)|(\.ts)|(\.mdx)/gm;
  return page.replace(rgx, "");
}

/* Get namespace for a page */
function getPageNamespaces(pageId: string): string[] {
  //@ts-ignore
  const allNamespace = pages["*"];
  //@ts-ignore
  const pageNamespace = pages[pageId] ?? null;

  const namespaces = pageNamespace
    ? allNamespace.concat(pageNamespace)
    : allNamespace;

  return namespaces;
}

/* Build namespaces for each page */
allPages.forEach(async page => {
  const pageId =
    clearPageExt(page.replace(currentPagesDir, "")).replace(/\/index$/, "") ||
    "/";

  const namespaces = await getPageNamespaces(pageId);

  console.log(page, namespaces);
  buildPageInAllLocales(page, namespaces);
});

/* Check if custom next page */
function isNextInternal(pagePath: string): boolean {
  return (
    pagePath.startsWith(`${currentPagesDir}/_`) ||
    pagePath.startsWith(`${currentPagesDir}/404.`) ||
    pagePath.startsWith(`${currentPagesDir}/api/`)
  );
}

function hasExportName(data: string, name: string) {
  return data.match(
    new RegExp(`export (const|var|let|async function|function) ${name}`),
  );
}

function specialMethod(name: string, lang: string) {
  return `export const ${name} = ctx => _rest.${name}({ ...ctx, lang: "${lang}" })`;
}

function exportAllFromPage(page: string, lang: string) {
  const clearCommentsRgx = /\/\*[\s\S]*?\*\/|\/\/.*/g;
  const pageData = fs
    .readFileSync(page)
    .toString("utf8")
    .replace(clearCommentsRgx, "");

  const isGetStaticProps = hasExportName(pageData, "getStaticProps");
  const isGetStaticPaths = hasExportName(pageData, "getStaticPaths");
  const isGetServerSideProps = hasExportName(pageData, "getServerSideProps");
  const hasSomeSpecialMethod =
    isGetStaticProps || isGetStaticPaths || isGetServerSideProps;

  const exports = `
${isGetStaticProps ? specialMethod("getStaticProps", lang) : ""}
${isGetStaticPaths ? specialMethod("getStaticPaths", lang) : ""}
${isGetServerSideProps ? specialMethod("getServerSideProps", lang) : ""}
`;

  return {hasSomeSpecialMethod, exports};
}

function getPageTemplate(
  prefix: string,
  page: string,
  lang: string,
  namespaces: string[],
) {
  const {hasSomeSpecialMethod, exports} = exportAllFromPage(page, lang);

  return `// @ts-nocheck
import {I18nProvider} from "next-locale";
import React from "react";
import C${
    hasSomeSpecialMethod ? ", * as _rest" : ""
  } from "${prefix}/${clearPageExt(page)}"
${namespaces
  .map(
    (ns, i) =>
      `import ns${i} from "${prefix}/${localesPath}/${lang}/${ns}.json";`,
  )
  .join("\n")}

const namespaces = { ${namespaces
    .map((ns, i) => `"${ns}": ns${i}`)
    .join(", ")} }

export default function Page(p){
  return (
    <I18nProvider
      lang="${lang}"
      namespaces={namespaces}
    >
      <C {...p} />
    </I18nProvider>
  )
}

${exports}
`;
}

function buildPageLocale({
  prefix,
  pagePath,
  namespaces,
  lang,
  path,
}: {
  prefix: string;
  pagePath: string;
  namespaces: string[];
  lang: string;
  path: string;
}) {
  const finalPath = pagePath.replace(currentPagesDir, path);
  const template = getPageTemplate(prefix, pagePath, lang, namespaces);
  const [filename] = finalPath.split("/").reverse();
  const dirs = finalPath.replace(`/${filename}`, "");

  fs.mkdirSync(dirs, {recursive: true});
  fs.writeFileSync(finalPath, template);
}

/* Build page for all locales */
function buildPageInAllLocales(pagePath: string, namespaces: string[]) {
  let prefix = pagePath
    .split("/")
    .map(() => "..")
    .join("/");
  let rootPrefix = prefix.replace("/..", "");

  if (isNextInternal(pagePath)) {
    fs.copyFileSync(pagePath, pagePath.replace(currentPagesDir, finalPagesDir));
    return;
  }
  buildPageLocale({
    namespaces,
    pagePath,
    path: finalPagesDir,
    prefix: rootPrefix,
    lang: "en",
  });
}

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

rimraf(finalPagesDir, () => {});

/* Check for currentPagesDir */
if (!fs.existsSync(currentPagesDir)) {
  console.warn(`Please put currentPagesDir at root.`);
  process.exit(1);
}

/* Add all pages to array */
const parsedDir = currentPagesDir.replace(/\\/g, "/");
const allPages = glob.sync(parsedDir + "/**/*.*");

console.log(allPages);

/* Create final dir */
try {
  fs.mkdirSync(finalPagesDir);
} catch (e) {}

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
});

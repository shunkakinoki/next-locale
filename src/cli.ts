import fs from "fs";
import path from "path";
import rimraf from "rimraf";

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

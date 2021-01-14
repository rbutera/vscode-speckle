import * as path from "path";
import { TEST_FILE_SUFFIXES } from "./constant";
import { split } from "ramda";
const splitAtDots = split(".");

export function isTestFile(filePath: string) {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  const fileNameContainsSuffix = TEST_FILE_SUFFIXES.some((suffix) =>
    fileName.includes(`.${suffix}`)
  );
  const dirNameIsTest = path.basename(dirName) === "__tests__";
  return dirNameIsTest || fileNameContainsSuffix;
}

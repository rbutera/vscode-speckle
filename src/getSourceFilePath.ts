import * as path from "path";
import { endsWith } from "ramda";
import { TEST_FILE_SUFFIXES } from "./constant";
import {
  constructFilename,
  processFilename,
  removeTestFromPrefix,
} from "./processFilename";
import { OpenOption } from "./type";

// function removeTestSuffix(fileName: string) {
// TEST_FILE_SUFFIXES.forEach(suffix => {
// fileName = fileName.replace(`.${suffix}.`, '.')
// })
// return fileName
// }

function removeTestSuffix(fileName: string): string {
  const { name, extension, extensionPrefix } = processFilename(fileName);
  const extensionPrefixWithoutTest = extensionPrefix
    ? removeTestFromPrefix(extensionPrefix)
    : "";
  return constructFilename({
    name,
    extension,
    extensionPrefix: extensionPrefixWithoutTest,
  });
}
const endsWithTests = endsWith("__tests__");

export function getSourceFilePath(testFilePath: string): OpenOption {
  const fileFullName = path.basename(testFilePath); // sum.test.js or sum.service.test.js
  const testFileDir = path.dirname(testFilePath); // /user/demo/__tests__ or /user/demo/
  const testFileDirIsTests = endsWithTests(testFileDir);
  const sourceFolder = testFileDirIsTests
    ? path.dirname(testFileDir)
    : testFileDir;

  const fileName = removeTestSuffix(fileFullName); // sum.js
  const sourceFilePath = path.join(sourceFolder, fileName); // /user/demo/sum.js
  return { possiblePaths: [sourceFilePath], fileName };
}

import * as path from "path";
import { without, sortBy, identity, reverse, pipe } from "ramda";
import { TEST_FILE_SUFFIXES } from "./constant";
import { constructFilename, processFilename } from "./processFilename";
import { OpenOption } from "./type";

export function getTestFilePath(file: string): OpenOption {
  const fileName = path.basename(file);
  const { name, extension, extensionPrefix } = processFilename(fileName);
  const sourceFolder = path.dirname(file);
  const testsFolder = path.join(sourceFolder, "__tests__");
  const additionalExtensionPrefixes = TEST_FILE_SUFFIXES.map((x) =>
    extensionPrefix ? `${extensionPrefix}.${x}` : x
  );
  const allPossibleExtensionPrefixes = [
    extensionPrefix,
    ...additionalExtensionPrefixes,
  ];
  const allPossibleFilenames = allPossibleExtensionPrefixes.map((prefix) =>
    constructFilename({ name, extension, extensionPrefix: prefix })
  );
  const possiblePathsInSourceFolder = without(
    file,
    allPossibleFilenames.map((x) => path.join(sourceFolder, x))
  );
  const possiblePathsInTestsFolder = allPossibleFilenames.map((x) =>
    path.join(testsFolder, x)
  );
  const allPossiblePaths = [
    ...possiblePathsInTestsFolder,
    ...possiblePathsInSourceFolder,
  ];

  const possiblePaths: string[] = sortBy(identity, allPossiblePaths);
  return {
    possiblePaths,
    fileName,
  };
}

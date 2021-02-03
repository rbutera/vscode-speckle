import { isTestFile } from "../../src/isTestFile";

describe("isTestFile", () => {
  test("should return true when is .test file", () => {
    const result = isTestFile("/user/demo/sum.test.js");

    expect(result).toBeTruthy();
  });

  test("should return true when is .spec file", () => {
    const result = isTestFile("/user/demo/sum.spec.js");

    expect(result).toBeTruthy();
  });

  test("should return true when test file extension has prefix", () => {
    const testWithPrefix = isTestFile("/user/demo/sum.service.test.js");
    const specWithPrefix = isTestFile("/user/demo/sum.service.spec.js");

    expect(testWithPrefix).toBeTruthy();
    expect(specWithPrefix).toBeTruthy();
  });

  test("should return true if in __tests__ folder", () => {
    expect(isTestFile("/user/demo/__tests__/foo.js")).toBeTruthy();
  });

  test("should return false when is other file", () => {
    const result = isTestFile("/user/demo/sum.js");

    expect(result).toBeFalsy();
  });
});

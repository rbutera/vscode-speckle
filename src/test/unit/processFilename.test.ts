import {
  constructFilename,
  FilenameParts,
  processFilename,
  removeTestFromPrefix,
} from "../../processFilename";

describe("processFilename", () => {
  it("splits a filename with no prefix into its filename and extension", () => {
    expect(processFilename("foo.ts")).toEqual({
      name: "foo",
      extension: "ts",
      extensionPrefix: "",
    });
  });

  it("splits a filename with a prefix into its filename, extension, and extension prefix", () => {
    expect(processFilename("foo.bar.ts")).toEqual({
      name: "foo",
      extension: "ts",
      extensionPrefix: "bar",
    });

    expect(processFilename("foo.bar.baz.ts")).toEqual({
      name: "foo",
      extension: "ts",
      extensionPrefix: "bar.baz",
    });
  });
});

describe("constructFilename", () => {
  it("compiles a filename given filename parts", () => {
    expect(
      constructFilename({
        name: "foo",
        extension: "ts",
        extensionPrefix: "bar.baz",
      })
    ).toEqual("foo.bar.baz.ts");

    expect(
      constructFilename({
        name: "foo",
        extension: "ts",
        extensionPrefix: "",
      })
    ).toEqual("foo.ts");

    expect(
      constructFilename({
        name: "foo",
        extension: "ts",
        extensionPrefix: "bar",
      })
    ).toEqual("foo.bar.ts");
  });
});

describe("removeTestFromPrefix", () => {
  it("will remove test or spec from a string", () => {
    expect(removeTestFromPrefix("")).toEqual("");
    expect(removeTestFromPrefix("spec")).toEqual("");
    expect(removeTestFromPrefix("service.spec")).toEqual("service");
    expect(removeTestFromPrefix("service")).toEqual("service");
    expect(removeTestFromPrefix("service.bar.spec")).toEqual("service.bar");
    expect(removeTestFromPrefix("")).toEqual("");
    expect(removeTestFromPrefix("test")).toEqual("");
    expect(removeTestFromPrefix("service.test")).toEqual("service");
    expect(removeTestFromPrefix("service")).toEqual("service");
    expect(removeTestFromPrefix("service.bar.test")).toEqual("service.bar");
  });
});

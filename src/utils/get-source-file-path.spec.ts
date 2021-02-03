import { getSourceFilePath } from './get-source-file-path'
describe('getSourceFilePath', () => {
  test('should work with .test suffix', () => {
    const result = getSourceFilePath('/user/demo/__tests__/sum.test.js')
    const expected = {
      possiblePaths: ['/user/demo/sum.js'],
      fileName: 'sum.js',
    }

    expect(result).toEqual(expected)
  })

  test('should work with .spec suffix', () => {
    const result = getSourceFilePath('/user/demo/__tests__/sum.spec.js')
    const expected = {
      possiblePaths: ['/user/demo/sum.js'],
      fileName: 'sum.js',
    }

    expect(result).toEqual(expected)
  })

  test('should work with files with a prefix to file extension', () => {
    const result = getSourceFilePath('/user/demo/__tests__/sum.service.spec.js')
    const expected = {
      possiblePaths: ['/user/demo/sum.service.js'],
      fileName: 'sum.service.js',
    }

    expect(result).toEqual(expected)
  })

  test('should work with tests in the same folder', () => {
    const result = getSourceFilePath('/user/demo/sum.spec.js')
    const expected = {
      possiblePaths: ['/user/demo/sum.js'],
      fileName: 'sum.js',
    }
    expect(result).toEqual(expected)
  })

  test('should work with tests in the same folder if file extension has a prefix', () => {
    const result = getSourceFilePath('/user/demo/sum.service.spec.js')
    const expected = {
      possiblePaths: ['/user/demo/sum.service.js'],
      fileName: 'sum.service.js',
    }
    expect(result).toEqual(expected)
  })

  test('should work in tests folder without any .test or .spec suffix', () => {
    expect(
      getSourceFilePath('/user/demo/__tests__/foo.ts').possiblePaths[0]
    ).toEqual('/user/demo/foo.ts')
    expect(
      getSourceFilePath('/user/demo/__tests__/foo.ts').possiblePaths[0]
    ).toEqual('/user/demo/foo.ts')
    expect(
      getSourceFilePath('/user/demo/__tests__/foo.service.ts').possiblePaths[0]
    ).toEqual('/user/demo/foo.service.ts')
  })
})

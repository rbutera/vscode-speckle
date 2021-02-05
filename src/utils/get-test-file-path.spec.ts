import { getTestFilePath } from './get-test-file-path'

describe('getTestFilePath', () => {
  test('should return possible paths of source file', () => {
    const result = getTestFilePath('/user/demo/sum.js')
    const expected = {
      possiblePaths: [
        '/user/demo/__tests__/sum.js',
        '/user/demo/__tests__/sum.spec.js',
        '/user/demo/__tests__/sum.test.js',
        '/user/demo/sum.spec.js',
        '/user/demo/sum.test.js',
      ],
      fileName: 'sum.js',
    }

    expect(result).toEqual(expected)
  })

  test('it gets possible paths when file extension has prefix', () => {
    const result = getTestFilePath('/user/demo/sum.service.js')
    const expected = {
      possiblePaths: [
        '/user/demo/__tests__/sum.service.js',
        '/user/demo/__tests__/sum.service.spec.js',
        '/user/demo/__tests__/sum.service.test.js',
        '/user/demo/sum.service.spec.js',
        '/user/demo/sum.service.test.js',
      ],
      fileName: 'sum.service.js',
    }

    expect(result).toEqual(expected)
  })
})

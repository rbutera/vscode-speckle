import targetFile from './target-file'
import * as fs from 'fs'
describe('targetFile', () => {
  it('returns the first file that exists in the list of possible paths', () => {
    const possiblePaths = {
      find: jest.fn().mockReturnValue('bar'),
    }

    // @ts-expect-error possiblePaths is mocked out
    const result = targetFile({ possiblePaths, fileName: 'foo' })
    expect(possiblePaths.find).toHaveBeenCalledWith(fs.existsSync)
    expect(result).toEqual('bar')
  })

  it('throws an error if the target is missing', () => {
    const possiblePaths = {
      find: jest.fn().mockReturnValue(false),
    }

    expect(() =>
      // @ts-expect-error possiblePaths is mocked out
      targetFile({ possiblePaths, fileName: 'foo' })
    ).toThrowError()
  })
})

// eslint-disable-next-line unicorn/import-style
import * as fs from 'fs'

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  promises: {
    writeFile: jest.fn().mockResolvedValue(true),
  },
}))

import { createFile } from './create-file'
import { generateJavascriptTemplate } from './generate-template'
jest.mock('./generate-template')

describe('createFile', () => {
  describe('when the file does not exist', () => {
    beforeEach(() => {
      ;(fs.existsSync as any).mockReturnValue(false)
      ;(fs.promises.writeFile as any).mockResolvedValue(true)
    })

    afterEach(() => {
      ;(fs.promises.writeFile as any).mockClear()
    })

    it('creates a file if it does not exist', async () => {
      const filename = '/foo/bar.html'
      const contents = ''
      await expect(createFile(filename)).resolves.toEqual(filename)
      expect(fs.existsSync).toHaveBeenCalledWith(filename)
      expect(fs.promises.writeFile).toHaveBeenCalledWith(filename, contents)
    })

    it('uses a javascriptTemplate if the file ends with .ts or .js', async () => {
      ;(generateJavascriptTemplate as any).mockReturnValue('template')
      expect.assertions(16)
      for (const extension of ['ts', 'js', 'jsx', 'tsx']) {
        const filename = `/foo/bar/test-name.${extension}`
        const contents = 'template'
        await expect(createFile(filename)).resolves.toEqual(filename)
        expect(generateJavascriptTemplate).toHaveBeenCalledWith({
          name: 'testName',
          implementation: 'test-name',
        })
        expect(fs.existsSync).toHaveBeenCalledWith(filename)
        expect(fs.promises.writeFile).toHaveBeenCalledWith(filename, contents)
      }
    })

    it('passes the full name including extension prefix to generate the template', async () => {
      ;(generateJavascriptTemplate as any).mockReturnValue('template')
      expect.assertions(16)
      for (const extension of ['ts', 'js', 'jsx', 'tsx']) {
        const filename = `/foo/bar/test-name.${extension}`
        const contents = 'template'
        await expect(createFile(filename)).resolves.toEqual(filename)
        expect(generateJavascriptTemplate).toHaveBeenCalledWith({
          name: 'testName',
          implementation: 'test-name',
        })
        expect(fs.existsSync).toHaveBeenCalledWith(filename)
        expect(fs.promises.writeFile).toHaveBeenCalledWith(filename, contents)
      }
    })
  })

  describe('when the file already exists', () => {
    beforeEach(() => {
      ;(fs.existsSync as any).mockReturnValue(true)
      ;(fs.promises as any).writeFile.mockResolvedValue(true)
    })

    afterEach(() => {
      ;(fs.promises.writeFile as any).mockClear()
    })

    it('returns the filename if the file already exists', async () => {
      ;(fs.existsSync as any).mockReturnValue(true)
      ;(fs.promises.writeFile as any).mockResolvedValue(true)
      const filename = '/foo/bar.ts'
      await expect(createFile(filename)).resolves.toEqual(filename)
      expect(fs.existsSync).toHaveBeenCalledWith(filename)
      expect(fs.promises.writeFile).not.toHaveBeenCalled()
    })
  })
})

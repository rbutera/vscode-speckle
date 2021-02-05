import { split, last, dropLast, join, reject, isEmpty, without } from 'ramda'
import { TEST_FILE_SUFFIXES } from '../constants'
const arrayWithoutTestSuffixes = without(TEST_FILE_SUFFIXES)
const splitAtDots = split('.')
const allButLast = dropLast(1)
const joinWithDots = join('.')

const rejectEmpty = reject(isEmpty)

export type FilenameParts = {
  readonly name: string
  readonly extension: string
  readonly extensionPrefix: string
}

/**
 * splits a filename into its component parts
 * @param filename filename to process (e.g. foo.bar.ts)
 */
export function processFilename(filename: string): FilenameParts {
  const [name, ...rest] = splitAtDots(filename)
  const extension = last(rest) ?? ''
  const extensionPrefix = rest.length > 1 ? joinWithDots(allButLast(rest)) : ''

  return {
    name,
    extension,
    extensionPrefix,
  }
}

export function constructFilename(parts: FilenameParts): string {
  const partsAsArray = [parts.name, parts.extensionPrefix, parts.extension]
  const included = rejectEmpty(partsAsArray)
  return joinWithDots(included)
}

export function removeTestFromPrefix(prefix: string): string {
  const parts = splitAtDots(prefix)
  const partsWithoutTest = arrayWithoutTestSuffixes(parts)
  return parts.length > 0 ? joinWithDots(partsWithoutTest) : prefix
}

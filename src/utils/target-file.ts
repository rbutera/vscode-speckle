import * as fs from 'fs'
import { OpenOption } from '../types/open-option.type'

export default function targetFile({
  possiblePaths,
  fileName,
}: OpenOption): string {
  const target = possiblePaths.find(fs.existsSync)
  if (!target) {
    throw new Error(fileName)
  }
  return target
}

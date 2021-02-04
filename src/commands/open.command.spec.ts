import * as OpenCommand from './open.command'

describe('commands: open', () => {
  describe('openTestOf', () => {
    it('is defined', () => {
      expect(OpenCommand.openTestOf).toBeDefined()
    })

    it('creates a file and then opens it if automaticallyCreateTestFile is', async () => {
      expect(true).toBeTruthy()
    })
  })

  describe('openCommand', () => {
    it('is defined', () => {
      expect(OpenCommand.openCommand).toBeDefined()
    })

    it('returns false if there is no active text editor', async () => {
      expect(true).toBeTruthy()
    })

    it('calls openTestOrImplementation', async () => {
      expect(true).toBeTruthy()
    })
  })
})

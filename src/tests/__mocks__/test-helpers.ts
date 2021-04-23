export const testHelpers = {
    resetAll: () => {
        jest.clearAllMocks()
        jest.resetAllMocks()
        jest.restoreAllMocks()
        jest.clearAllTimers()
    }
}
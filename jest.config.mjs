import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Pointe vers ton dossier Next.js
  dir: './',
})

// Configuration de base pour tester le DOM
const config = {
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
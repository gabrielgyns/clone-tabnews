import type { Config } from "jest";
import nextJest from 'next/jest.js'

// DOCS: https://nextjs.org/docs/14/pages/building-your-application/testing/jest

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "<rootDir>"],
};

export default createJestConfig(config)
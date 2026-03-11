import type { Config } from "jest";
import nextJest from 'next/jest.js'

// DOCS: https://nextjs.org/docs/14/pages/building-your-application/testing/jest

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                jsc: {
                    parser: {
                        syntax: "typescript",
                        tsx: true,
                    },
                    target: "es2022",
                },
                module: {
                    type: "commonjs",
                },
            },
        ],
    },
};

export default createJestConfig(config)
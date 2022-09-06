// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: './lib/index.cjs.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: './lib/index.esm.js',
                format: 'es',
                sourcemap: true,
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationDir: undefined,
            }),
        ]
    },
    {
        input: './types/index.d.ts',
        output: {
            file: './lib/index.d.ts',
            format: 'es',
        },
        plugins: [
            dts({respectExternal: true})
        ]
    }
]
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      semi: ['error', 'never'],
      'prettier/prettier': 'error',
    },
  },
]

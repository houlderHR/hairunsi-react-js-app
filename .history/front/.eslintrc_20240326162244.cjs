module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
<<<<<<< HEAD
    'prettier',
=======
>>>>>>> d5e6d1c (fix: folder structure and move hairun_si into the folder front)
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
<<<<<<< HEAD
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
=======
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
>>>>>>> d5e6d1c (fix: folder structure and move hairun_si into the folder front)

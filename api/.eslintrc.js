const { createConfig } = require('eslint-config-galex/src/createConfig');
const { createTSOverride } = require('eslint-config-galex/src/overrides/typescript');

const packageJson = require('./package.json');

// since `createTSOverride` is entirely configurable, we need to inform it about its environment
const tsOverrideConfig = {
  react: {
    hasReact: false,
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'error',
    'promise/no-promise-in-callback': 'off',
    'promise/prefer-await-to-callbacks': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  },
  typescript: {
    hasTypeScript: true,
    // sync with package.json should you upgrade TS
    version: packageJson.dependencies.typescript,
  },
};

// solely an override for TS
const tsOverride = createTSOverride(tsOverrideConfig);

// pass it into createConfig as array as it will be merged with the other overrides
module.exports = {
  ...createConfig({ overrides: [tsOverride
    ]
  }),
  root: true,
};

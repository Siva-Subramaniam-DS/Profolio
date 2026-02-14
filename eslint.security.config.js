import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Security-focused rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-unsafe-innerhtml/no-unsafe-innerhtml': 'off', // Would need plugin
      
      // Prevent dangerous patterns
      'no-caller': 'error',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef-init': 'error',
      
      // React security rules
      'react/no-danger': 'error',
      'react/no-danger-with-children': 'error',
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-target-blank': ['error', { 
        allowReferrer: false,
        enforceDynamicLinks: 'always'
      }],
      
      // Prevent XSS vulnerabilities
      'react/no-unescaped-entities': 'error',
      
      // Input validation
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      
      // Secure coding practices
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { 
        allow: ['warn', 'error'] 
      }],
      
      // Prevent prototype pollution
      'no-proto': 'error',
      'no-extend-native': 'error',
      
      // Secure regular expressions
      'no-invalid-regexp': 'error',
      'no-regex-spaces': 'error',
      
      // Prevent information disclosure
      'no-debugger': 'error',
      'no-alert': 'warn',
      
      // Secure object handling
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      
      // Prevent timing attacks
      'no-compare-neg-zero': 'error',
      
      // Secure function usage
      'no-new-require': 'error',
      'no-path-concat': 'error',
      
      // Custom security rules
      'no-restricted-globals': ['error', 
        'eval', 
        'execScript',
        'setTimeout', // Only when used with strings
        'setInterval' // Only when used with strings
      ],
      
      'no-restricted-properties': ['error',
        {
          object: 'document',
          property: 'write',
          message: 'document.write can lead to XSS vulnerabilities'
        },
        {
          object: 'document',
          property: 'writeln',
          message: 'document.writeln can lead to XSS vulnerabilities'
        },
        {
          object: 'window',
          property: 'eval',
          message: 'eval() can lead to code injection vulnerabilities'
        }
      ],
      
      'no-restricted-syntax': ['error',
        {
          selector: 'CallExpression[callee.name="setTimeout"][arguments.0.type="Literal"]',
          message: 'setTimeout with string argument can lead to code injection'
        },
        {
          selector: 'CallExpression[callee.name="setInterval"][arguments.0.type="Literal"]',
          message: 'setInterval with string argument can lead to code injection'
        }
      ]
    },
  },
];
module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"prettier",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:react-hooks/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			},
			"rules": {
				'@typescript-eslint/no-shadow': ['error'],
				'no-shadow': 'off',
				'no-undef': 'off',
			},
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"react",
		"import",
		"react-hooks"
	],
	"rules": {
		"indent": [
			"error",
			4,
			{
				"SwitchCase": 1,
				"VariableDeclarator": 2
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		'react/no-did-mount-set-state': 2,
		'react/no-direct-mutation-state': 2,
		'react/jsx-uses-vars': 2,
		'no-undef': 2,
		"semi": 2,
		'react/prop-types': 2,
		'react/jsx-no-bind': 2,
		'react/jsx-no-duplicate-props': 2,
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		"no-duplicate-imports": "error",

	},
	"settings": {
		"import/resolver": {
			"typescript": {}
		}
	},
}

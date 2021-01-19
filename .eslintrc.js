module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		// 'plugin:vue/recommended',
	],
	// required to lint *.vue files
	plugins: [
		'vue',
		'prettier',
	],
	// add your custom rules here
	rules: {
		//'indent': ['error', 4],
		"vue/script-indent": ["error", 4, {
			"baseIndent": 1,
			"switchCase": 0,
			"ignores": []
		}],
		'vue/html-indent': ['error', 2, {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': [],
		}],
		'vue/max-attributes-per-line': [1, {
			'singleline': 4,
			'multiline': {
				'max': 1,
				'allowFirstLine': true,
			},
		},
		],
		'vue/html-self-closing': ['error', {
			'html': {
				'void': 'never',
				'normal': 'any',
				'component': 'any',
			},
			'svg': 'always',
			'math': 'always',
		}],
		'vue/component-name-in-template-casing': [
			'error',
			'PascalCase',
			{
				'ignores': [
					'nuxt',
					'nuxt-link',
					'nuxt-child',
					'transition',
				],
			},
		],
		'comma-spacing': ['error', {'before': false, 'after': true}],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
}

/**
 * External Dependencies
 */
const path = require('path');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		admin: path.resolve(process.cwd(), 'src', 'admin.js'),
		admin_style: path.resolve(process.cwd(), 'src', 'admin.scss'),
		editor: path.resolve(process.cwd(), 'src', 'editor.js'),
		panels: path.resolve(process.cwd(), 'src/panels', 'index.js'),
		modals: path.resolve(process.cwd(), 'src/modals', 'index.js'),
		settings: path.resolve(process.cwd(), 'src/settings', 'index.js'),
		settings_style: path.resolve(
			process.cwd(),
			'src/settings',
			'style.scss'
		),
	},
};

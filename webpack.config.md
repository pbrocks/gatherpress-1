const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		blocks_backend: path.resolve( process.cwd(), 'src/blocks', 'backend.js' ),
		blocks_frontend: path.resolve(
			process.cwd(),
			'src/blocks',
			'frontend.js',
		),
		blocks_style: path.resolve( process.cwd(), 'src', 'blocks/style.scss' ),
		panels: path.resolve( process.cwd(), 'src/panels', 'index.js' ),
		settings: path.resolve( process.cwd(), 'src/settings', 'index.js' ),
		settings_style: path.resolve( process.cwd(), 'src/settings', 'style.scss' ),
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				blocks_style: {
					name: 'blocks_style',
					test: /blocks_style\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true,
				},
				default: false,
			},
		},
	},
};

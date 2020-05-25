const path = require('path')

module.exports = {
	webpack: function(config, env) {
		config.resolve.alias['~'] = path.resolve(__dirname, 'src')
		// config.resolve.alias['@module'] = path.resolve(__dirname, 'src', 'modules')
		// config.resolve.alias['@component'] = path.resolve(__dirname, 'src', 'components')
		// config.resolve.alias['@view'] = path.resolve(__dirname, 'src', 'views')
		//,
		//       "@module/*": ["./src/modules/*"],
		//       "@component/*": ["./src/components/*"],
		//       "@view/*": ["./src/views/*"]
		return config
		// return Object.assign({}, config, {
		// 	resolve: {
		// 		alias: {
		// 			'~': path.resolve(__dirname, 'src'),
		// 			// '#modules': path.resolve(__dirname, 'src', 'modules'),
		// 			// '#components': path.resolve(__dirname, 'src', 'modules'),
		// 			// '#views': path.resolve(__dirname, 'src', 'views'),
		// 		}
		// 	}
		// });
	},
	// jest: function(config) {
	// 	return config;
	// },
	// devServer: function(configFunction) {
	// 	return function(proxy, allowedHost) {
	// 		const config = configFunction(proxy, allowedHost);
	// 		const fs = require('fs');
	// 		config.https = {
	// 			key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
	// 			cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
	// 			ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
	// 			passphrase: process.env.REACT_HTTPS_PASS
	// 		};
	//
	// 		return config;
	// 	};
	// },
	// paths: function(paths, env) {
	// 	return paths;
	// },
}

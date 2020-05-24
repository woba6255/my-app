const path = require('path')

module.exports = {
	webpack: function(config, env) {
		config.resolve.alias['~'] = path.resolve(__dirname, 'src')
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

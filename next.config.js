module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: [/\.(js|ts)x?$/],

			use: ['@svgr/webpack'],
		});
		return config;
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/all?page=1&perPage=4',
				permanent: true,
			},
		];
	},
};

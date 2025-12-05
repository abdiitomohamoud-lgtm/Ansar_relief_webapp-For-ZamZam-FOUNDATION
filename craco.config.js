module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the rule that handles SVG files
      const fileLoaderRule = webpackConfig.module.rules.find(rule => 
        rule.test && rule.test.test('.svg')
      );
      if (fileLoaderRule) {
        // Exclude SVG from the file loader
        fileLoaderRule.exclude = /\.svg$/i;
      }

      // Add a new rule for SVG files
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });

      return webpackConfig;
    }
  }
}; 
// Dependencies
const minifyCss = require( 'clean-css' );
const minifyJS = require( 'uglify-js' );
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Local dependencies
const fs = require('fs');

module.exports = ( eleventyConfig ) => {
	/**
	 * cssmin - Minify CSS filter
	 */
	eleventyConfig.addFilter( 'cssmin', ( code ) => {
		const minified = new minifyCss({}).minify( code ).styles;
		return minified;
	});

	/**
	 * jsmin - Minify JS filter
	 */
	eleventyConfig.addFilter( 'jsmin', ( code ) => {
		const minified = minifyJS.minify( code, {
			mangle: true,
			compress: true,
		});

		if( minified.error ) {
			console.log( 'UglifyJS error: ', minified.error );
			return code;
		}

		return minified.code;
	});

	/**
	 * Add syntax highlighting on the server side
	 */
	eleventyConfig.addPlugin(syntaxHighlight);

	/**
	 * Copy everything in the assets directory to the built site
	 */
	eleventyConfig.addPassthroughCopy({'src/_assets': 'assets'});
	eleventyConfig.addPassthroughCopy('src/CNAME');

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(error, browseSync) {

				browseSync.addMiddleware('*', (req, res) => {
					const content_404 = fs.readFileSync('_site/404.html');
					// Provides the 404 content without redirect.
					res.write(content_404);
					// Add 404 http status code in request header.
					// res.writeHead(404, { 'Content-Type': 'text/html' });
					res.writeHead(404);
					res.end();
				});
			}
		}
	});

	// The configuration object ( optional )
	return {
		dir: {
			input: 'src',
			includes: '_includes'
		},
		templateFormats : ['njk', 'md'],
		htmlTemplateEngine : 'njk',
		markdownTemplateEngine: 'njk',
	};
};
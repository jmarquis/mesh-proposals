var pickFiles = require("broccoli-static-compiler");
var browserify = require("broccoli-fast-browserify");
var mergeTrees = require("broccoli-merge-trees");
var less = require("broccoli-less-single");
var autoprefixer = require("broccoli-autoprefixer");
var svgo = require("broccoli-svgo");
var svgstore = require("broccoli-svgstore");

var sourceTree = "src";


var html = pickFiles(sourceTree, {
	srcDir: "/",
	files: ["index.html"],
	destDir: "/"
});


var js = browserify(sourceTree, {
	bundles: {
		"main.js": {
			transform: {
				tr: require("babelify"),
				options: {
					optional: ["es7.decorators", "es7.classProperties"]
				}
			},
			entryPoints: ["App.jsx"]
		}
	},
	browserify: {
		extensions: [".jsx"]
	}
});


var css = less(sourceTree, "styles/main.less", "styles/main.css", { paths: ["node_modules"] });
css = autoprefixer(css);


var icons = pickFiles(sourceTree, {
	srcDir: "/icons",
	files: ["*.svg"],
	destDir: "/icons"
});

icons = svgo(icons);

icons = svgstore(icons, {
	outputFile: "/icons/icons.svg"
});


module.exports = mergeTrees([html, js, css, icons]);

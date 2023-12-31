const fs = require("fs");
const htmlmin = require("html-minifier");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");


module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


  eleventyConfig.addCollection("Testing", function(collection) {
    return collection.getFilteredByGlob("/lessons/*.md");
});

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }


  return {
    dir: {
      input: "src",
      output: "docs",
    },
    pathPrefix: "/adl-lda/"

  }
};

function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}

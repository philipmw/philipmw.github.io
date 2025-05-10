import dirOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("**/*.png", {
    mode: "html-relative",
  });
  eleventyConfig.addPassthroughCopy("**/*.xsl");

  eleventyConfig.addPlugin(dirOutputPlugin);

  eleventyConfig.addPlugin(pluginFilters);

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
  // Bundle <style> content and adds a {% css %} paired shortcode
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
    // Add all <style> content to `css` bundle (use eleventy:ignore to opt-out)
    // supported selectors: https://www.npmjs.com/package/posthtml-match-helper
    bundleHtmlContentFromSelector: "style",
  });

  // Bundle <script> content and adds a {% js %} paired shortcode
  eleventyConfig.addBundle("js", {
    toFileDirectory: "dist",
    // Add all <script> content to the `js` bundle (use eleventy:ignore to opt-out)
    // supported selectors: https://www.npmjs.com/package/posthtml-match-helper
    bundleHtmlContentFromSelector: "script",
  });

  // https://www.11ty.dev/docs/plugins/rss/
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.atom",
    templateData: {
      eleventyNavigation: {
	key: "Feed",
	order: 4
      }
    },
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Philip in Seattle",
      subtitle: "This blog is about my life and things I find interesting.",
      base: "https://philipmw.github.io",
      author: {
        name: "Philip",
      },
    },
  });
}

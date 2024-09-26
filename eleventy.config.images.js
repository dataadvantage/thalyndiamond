const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const sizeOf = require("image-size");

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("imageSize", async function imageSizeShortcode(src) {
		let input;
		if (isFullUrl(src)) {
			input = src;
		} else {
			input = relativeToInputPath(this.page.inputPath, src);
		}
		const dimensions = sizeOf(input);
		return dimensions;
	});

	eleventyConfig.addAsyncShortcode(
		"getImage",
		async function getImage(src, width) {
			let input;
			if (isFullUrl(src)) {
				input = src;
			} else {
				input = relativeToInputPath(this.page.inputPath, src);
			}

			let metadata = await eleventyImage(input, {
				widths: [width],
				formats: ["webp"],
				outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			});

			return metadata["webp"][0].url;
		}
	);

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode(
		"image",
		async function imageShortcode(src, alt, widths, sizes, lazy = true) {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = [
				// "avif",
				"webp",
				"auto",
			];
			let input;
			if (isFullUrl(src)) {
				input = src;
			} else {
				input = relativeToInputPath(this.page.inputPath, src);
			}

			let metadata = await eleventyImage(input, {
				widths: widths?.split(",") || ["auto"],
				formats,
				outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			});

			// TODO loading=eager and fetchpriority=high
			let imageAttributes = {
				alt,
				sizes,
				loading: "lazy",
				decoding: "async",
			};

			const pictureTag = eleventyImage.generateHTML(metadata, imageAttributes);
			if (!lazy) {
				return pictureTag.replace('loading="lazy"', "");
			}
			return pictureTag;
		}
	);
};

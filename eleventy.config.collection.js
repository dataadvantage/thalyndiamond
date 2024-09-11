module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("field", (array, field) => {
		const result = array.map((i) => {
			return i.data[field];
		});
		return result;
	});

	eleventyConfig.addFilter("unique", (array) => {
		return [...new Set(array)];
	});

	eleventyConfig.addFilter("shuffle", (array) => {
		return array
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	});

	eleventyConfig.addFilter("sort", (array, key, ascending = true) => {
		if (ascending) {
			return array.sort((a, b) => {
				if (a.data[key] > b.data[key]) {
					return 1;
				}
				return -1;
			});
		} else {
			return array.sort((a, b) => {
				if (a.data[key] > b.data[key]) {
					return -1;
				}
				return 1;
			});
		}
	});
};

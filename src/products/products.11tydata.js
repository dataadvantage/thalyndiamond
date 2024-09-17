module.exports = {
	tags: ["products"],
	permalink:
		"/products/{% if url %}{{ url }}{% else %}{{name|slug}}{% endif %}/",
	layout: "layouts/product.njk",
};

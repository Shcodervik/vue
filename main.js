var app = new Vue({
	el: '#app',
	data: {
		brand: 'Vue Mastery',
		product: 'Socks',
		description: 'Foxy socks',
		selectedVariant: 0,
		link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
		onSale: true,
		details: ["80% cotton", "20% polyester", "Brutal 🤘"],
		variants: [
		{
			variantId: 2234,
			variantColor: "blue",
			variantImage: './images/socks-fox.png',
			variantQuantity: 0
		},
		{
			variantId: 2235,
			variantColor: "green",
			variantImage: './images/socks-fox-green.png',
			variantQuantity: 10
		}
		],
		sizes: [
		{
			sizeId: 11,
			sizeValue: "S"
		},
		{
			sizeId: 12,
			sizeValue: "M"
		},
		{
			sizeId: 13,
			sizeValue: "L"
		}
		],
		cart: 0
	},
	methods: {
		addToCart: function() {
			this.cart += 1;
		},
		deleteFromCart: function() {
			this.cart -= 1;
		},
		clearCart: function() {
			this.cart = 0;
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
			console.log(index)
		},
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		}
	}
})
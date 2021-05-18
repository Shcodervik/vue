Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: '<ul><li v-for="detail in details">{{ detail }}</li></ul>'
})

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `<div class="product">
				<div class="product-image"><img v-bind:src="image"></div>
				<div class="product-info">
					<h1>{{ title }}</h1> 
					<div>{{ description }} <span class="on-sale" v-if="onSale">On Sale!</span></div>
					<a v-bind:href="link">Link to the lesson</a>
					<p v-if="inStock">In Stock</p>
					<!--<p v-else-if="inventory <=10 && inventory > 0">Almost sold out!</p>-->
					<p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
					<p>Shipping: {{ shipping }}</p>
					<product-details :details="details"></product-details>
					<div class="flexbox">
						<div v-for="(variant, index) in variants" 
							:key="variant.variantId"
							class="color-box"
							:style="{ backgroundColor: variant.variantColor }"
							@mouseover="updateProduct(index)">
						</div>
					</div>
					<div class="flexbox">
						<div v-for="size in sizes" :key="size.sizeId">
							<p>{{ size.sizeValue }}</p>
						</div>
					</div>
					<div class="flexbox">
						<button v-on:click="addToCart" 
							:disabled="inventory == 0"
							:class="{ disabledButton: !inStock }">Add to Cart</button>
						<button @click="deleteFromCart"
							:disabled="cart <= 0"
							:class="{ disabledButton: cart <= 0 }">Delete from Cart</button>
						<button @click="clearCart"
							:disabled="cart <= 0"
							:class="{ disabledButton: cart <= 0 }">Clear Cart</button>
					</div>
				</div>
			</div>`,
	data() {
		return {
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
				variantQuantity: 2
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
			]
		}
	},
	methods: {
		addToCart: function() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},
		deleteFromCart: function() {
			this.$emit('delete-from-cart', this.variants[this.selectedVariant].variantId)
		},
		clearCart: function() {
			this.$emit('clear-cart')
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
		},
		shipping() {
			if (this.premium) {
				return "free"
			}
			return 2.99
		}
	}
			
})

var app = new Vue({
	el: '#app',
	data:{
		premium: true,
		cart: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		},
		deleteFromCart(id) {
			this.cart.pop(id)
		},
		clearCart() {
			this.cart = []
		}
	}
})
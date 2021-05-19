Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: '<ul><li v-for="detail in details">{{ detail }}</li></ul>'
})

Vue.component('product-review', {
	template: 
	`<form class="review-form" @submit.prevent="onSubmit">
		<p v-if="errors.length">
		  <b>Please correct the following error(s):</b>
		  <ul>
			<li v-for="error in errors">{{ error }}</li>
		  </ul>
		</p>
		<p>
			<label for="name">Name:</label>
			<input id="name" v-model="name">
		</p>
		<p>
			<label for="review">Review:</label>
			<textarea id="review" v-model="review"></textarea>
		</p>
		<p>
			<label for="rating">Rating:</label>
			<select id="rating" v-model.number="rating">
				<option>5</option>
				<option>4</option>
				<option>3</option>
				<option>2</option>
				<option>1</option>
			</select>
		</p>
		<p>Would you recommend this product?</p>
		<p>
			<label for="recommend">Yes</label><input type="radio" v-model="recommend" value="yes" id="recommend"></input>
			<label for="recommend">No</label><input type="radio" v-model="recommend" value="no" id="recommend"></input>
		</p>
		<p>
			<input type="submit" value="Submit">
		</p>
	</form>`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			recommend: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			this.errors = []
			if(this.name && this.review && this.rating) {
				let productReview = {
				  name: this.name,
				  review: this.review,
				  rating: this.rating,
				  recommend: this.recommend
				}
				this.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null
				this.recommend = null
			} else {
				if(!this.name) this.errors.push("Name required.")
				if(!this.review) this.errors.push("Review required.")
				if(!this.rating) this.errors.push("Rating required.")
			}
		}
	}
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
					<div>
						<h2>Reviews</h2>
						<p v-if="!reviews.length">There are no reviews yet.</p>
						<ul>
						  <li v-for="review in reviews">
						  <p>{{ review.name }}</p>
						  <p>Rating: {{ review.rating }}</p>
						  <p>{{ review.review }}</p>
						  <p v-if="review.recommend === 'yes'">Recommended</p>
						  </li>
						</ul>
						<product-review @review-submitted="addReview"></product-review>
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
			],
			reviews: [],
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
		addReview: function(productReview) {
			this.reviews.push(productReview)
		}
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
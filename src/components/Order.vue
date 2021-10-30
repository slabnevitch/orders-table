<template>
	<tr>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.transaction_id}}</td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.gender | gender}} <a href="#" class="text-blue-600 underline" @click.prevent="showInfoModal(order)">{{order.username}} {{order.last_name}}</a></td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{new Date(+order.created_at *1000) | dateFilter('date-time')}}</td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.total * exchange[baseCurrency] | toFixed | currencyFilter(baseCurrency)}}</td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.card_number | cardScreen}}</td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.card_type}}</td>
		<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{order.order_country}} ({{order.order_ip}})</td>
	</tr>
</template>

<script>
	import Modal from '@/components/Modal.vue'

	export default {

		name: 'Order',

		props: {
			order: {
				type: Object,
				default: {},
				require: true
			},
			baseCurrency: {
				type: String,
				default: "USD",
				require: true
			},
			exchange: {
				type: Object,
				default: {},
				require: true
			}
		},

		data () {
			return {

			}
		},
		components: {
			modal: Modal
		},
		filters: {
			cardScreen: (value) => {
				const cardNumArr = value.split('');
				cardNumArr.forEach((num, i, arr) => {
					if(i > 1 && i < arr.length - 4){
						arr[i] = "*";
					}
				});
				return cardNumArr.join('');
			},
			gender: (value) => {
				return value === "Male"? "Mr.": "Ms.";
			}
		},
		methods: {
		  showInfoModal(order){
		    this.$modal.show(
		      Modal,
		      {order},
		      {height: "auto"});
	    }
	}
}
</script>

<style lang="css" scoped>
</style>
<template>
	<table id="statistic-table" class="table-fixed">
		<thead>
			<tr>
				<th class="px-4 py-2 text-emerald-600 text-center" colspan="2">Statistic</th>
			</tr>
		</thead>
		<tbody>
			<tr class="bg-gray-300">
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-bold text-right w-1/2">Orders Count</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2">{{searchedOrders}}</td>
			</tr>
			<tr>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-bold text-right w-1/2">Orders Total</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2">{{ordersTotal * exchange[baseCurrency] | toFixed | currencyFilter(baseCurrency)}}</td>
			</tr>
			<tr class="bg-gray-300">
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-bold text-right w-1/2">Average Check</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2">{{averageCheck * exchange[baseCurrency] | toFixed | currencyFilter(baseCurrency)}}</td>
			</tr>
			<tr>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-bold text-right w-1/2">Average Check (Female)</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2" v-if="averageCheckFemale">{{averageCheckFemale * exchange[baseCurrency] | toFixed | currencyFilter(baseCurrency)}}</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2" v-else>n/a</td>
			</tr>
			<tr class="bg-gray-300">
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-bold text-right w-1/2">Average Check (Male)</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left w-1/2" v-if="averageCheckMale">{{averageCheckMale * exchange[baseCurrency] | toFixed | currencyFilter(baseCurrency)}}</td>
				<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium text-left" v-else>n/a</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {

  name: 'Stats',
  props: {
  	searchedOrders: {
  		type: Number,
  		default: 0,
  		required: true
  	},
	ordersTotal: {
  		type: Number,
  		default: 0,
  		required: true
  	},
	averageCheck: {
  		type: Number,
  		default: 0,
  		required: true
  	},
	averageCheckFemale: {
  		type: Number,
  		default: 0,
  		required: true
  	},
	averageCheckMale: {
  		type: Number,
  		default: 0,
  		required: true
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
  }

}
</script>

<style lang="css" scoped>
</style>
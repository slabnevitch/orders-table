<template>
	<div name="user" class="modal-content bg-gray-100">
		<div slot="top-right" class="text-right">
	      <button @click="$emit('close')">
	        ❌
	      </button>
	    </div>

		<div class="modal-avatar mb-2">
			<img :src="order.avatar"/>
		</div>
		<h2 class="text-3xl font-semibold mb-3">{{order.username}}</h2> 
		<p>Birthday: {{new Date(+order.birthday *1000) | dateFilter('date')}}</p>
		<p>Company: {{order.company.company_title}}</p>
		<p>Industry: {{order.company.company_industry}}</p>
		<p><i>{{order.company.company_sector}}</i></p>
	</div>
</template>

<script>
export default {

  name: 'Modal',

  props: {
    order: {
      type: Object,
      default: {},
      require: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
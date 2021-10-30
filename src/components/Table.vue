<template>
  <div>
    <div class="header pt-4 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex flex-row justify-between">
          <div>
            <span>Cyrrency select: </span>
            <button class="currency-button ml-1 mr-1 w-16 py-1 rounded-md font-semibold text-white ring-2"
            v-for="item in Object.keys(availableCurrencies)"
            :key="item"
            :class="{'bg-gray-0': item !== baseCurrency, 'bg-gray-500': item === baseCurrency, 'ring-gray-300': item !== baseCurrency, 'ring-gray-500': item === baseCurrency, 'text-gray-500': item !== baseCurrency,}"
            @click="currencySelect(item)"
            title="select the desired currency">{{item}}</button>
            
          </div>
          
          <div class="search">
           Search:
           <input type="text" id="search" class="border-gray-600 border-2 rounded" v-model.trim="search">
         </div>

         <a href="#statistic-table" class="text-blue-600 underline" title="Go to table statistic">Statistic</a>

       </div>
     </div>
   </div>  <!--   .header     -->
   <main class="content container mx-auto px-4">
   
    <table class="table-auto">
      <thead>
        <tr>
          <th v-for="th in header" 
          :key="th.title" 
          @click="headerClick(th)" 
          :class="{'bg-gray-400': th==activeTh,'text-white': th==activeTh }"
          class="px-4 py-2 text-emerald-600"
          tilte="sort the table by the given column"><span class="sort-value">{{th.title}}<span class="sort-marker" v-show="th==activeTh">&#8595;</span></span></th>
        </tr>
      </thead>
      <tbody>
        <order v-for="(order, i) in searchedOrders" 
        :key="order.id"
        :class="{'bg-gray-300': i%2 == 0}"
        :order="order"
        :exchange="exchange"
        :baseCurrency="baseCurrency"></order>
        
        <tr v-if="!searchedOrders.length">
        <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium" colspan="7">Nothing found</td>
      </tr>
    </tbody>
  </table>
  <stats :searchedOrders="searchedOrders.length"
    :ordersTotal="ordersTotal"
    :averageCheck="averageCheck"
    :averageCheckFemale="averageCheckFemale"
    :averageCheckMale="averageCheckMale"
    :baseCurrency="baseCurrency"
    :exchange="exchange"></stats>
</main>
<div class="cover" v-if="dataLoading"></div>
<Preloader v-if="dataLoading"></Preloader>
</div>
</template>

<script>
  import Order from '@/components/Order.vue'
  import Stats from '@/components/Stats.vue'
  import Preloader from '@/components/Preloader.vue'
  import {fetchData, fetchCurrency} from '@/functions/fetch.data.js'

  export default {
    name: 'Table',
    data () {
      return {
        users: [],
        orders: [],
        companies: [],
        header: [
          {
            sortValue: 'transaction_id',
            title: "Transaction ID",
            status: false
          },
          {
            sortValue: 'username',
            title: "User Info",
            status: false
          },
          {
            sortValue: 'created_at',
            title: "Order Date",
            status: false
          },
          {
            sortValue: 'total',
            title: "Order Amount",
            status: false
          },
          {
            sortValue: null,
            title: "Card Number",
            status: false
          },
          {
            sortValue: "card_type",
            title: "Card Type",
            status: false
          },
          {
            sortValue: "order_country",
            title: "Location",
            status: false
          }
        ],
        activeTh: null,
        sortParameter: null,
        search: '',
        // fetchedCurrency: {},
        baseCurrency: "USD",
        exchange: {
          USD: 1,
          EUR: null,
          RUB: null,
          CNY: null
        },
        dataLoading: false
      }
    },
    components: {
      order: Order,
      stats: Stats,
      Preloader
    },
    computed: {
      availableCurrencies(){
        return Object.fromEntries(Object.entries(this.exchange).filter(([key, value]) => value !== null));
      },
      modifiedUsers() {
        return this.users.map(user => {
          if(user.company_id !== null){
            const company = this.companies.find(comp => comp.id === user.company_id);
            return {...user, 
              title: company.title,
              industry: company.industry,
              sector: company.sector
            }
          }else{
            return {...user, 
              title: "n/a",
              industry: "n/a",
              sector: "n/a"
            }
          }


        });

      },
      concatedOrders(){
        return this.orders.map(order => {
          const orderUser = this.modifiedUsers.find(user => user.id === order.user_id);
          return {...order, 
            username: orderUser.first_name + ' ' +  orderUser.last_name,
            gender: orderUser.gender,
            avatar: orderUser.avatar,
            birthday: orderUser.birthday,
            company: {
              company_title: orderUser.title,
              company_industry: orderUser.industry,
              company_sector: orderUser.sector
            }
          }
        })
      },
      sorteddOrders(){
        const copy = [...this.concatedOrders];
        if(this.sortParameter){
          if(this.sortParameter != "total" && this.sortParameter != "order_country"){
            return copy.sort((a, b) => {
              if (a[this.sortParameter] > b[this.sortParameter]) {
                return 1;
              }
              if (a[this.sortParameter]< b[this.sortParameter]) {
                return -1;
              }
              return 0;
            });
          }
          if(this.sortParameter === "order_country"){
            return copy.sort((a, b) => {
              if ((a.order_country + " " + a.order_ip) > (b.order_country + " " + b.order_ip)) {
                return 1;
              }
              if ((a.order_country + " " + a.order_ip) < (b.order_country + " " + b.order_ip)) {
                return -1;
              }
              return 0;
            });
          }else{
            return copy.sort((a, b) => a[this.sortParameter] - b[this.sortParameter]);
          }

        }else{
          return this.concatedOrders;
        }

      },
      searchedOrders(){
        if(this.search.length > 1){
         return this.sorteddOrders.filter(order => {
          const finded = Object.entries(order).filter(([key, value], i) => {
            if(key === "transaction_id" || key === "username" || key === "total" || key === "card_type" || key === "order_country" && value){
              return value.toString().toLowerCase().includes(this.search.toLowerCase());
            }
          });
          return finded.length > 0;
        });
       }
       return this.sorteddOrders;
     },
     ordersTotal(){
      return this.searchedOrders.reduce((sum, current) => {
        // console.log((sum + (+current.total)).toFixed(2))
        return sum + (+current.total);
      }, 0);
    },
    averageCheck(){
      const summ = this.searchedOrders.reduce((sum, order) => {return sum + (+order.total)}, 0);

      return summ / this.searchedOrders.length;
    },
    averageCheckFemale(){
      const femaleOrders = this.searchedOrders.filter(order => order.gender === 'Female');

      if(femaleOrders.length > 0){

        const femaleSumm = femaleOrders.reduce((sum, order) => {return sum + (+order.total)}, 0);
        return femaleSumm / femaleOrders.length; 
      }else{
        return 0;
      }

    },
    averageCheckMale(){
      const maleOrders = this.searchedOrders.filter(order => order.gender === 'Male');

      if(maleOrders.length > 0){

        const maleSumm = maleOrders.reduce((sum, order) => {return sum + (+order.total)}, 0);
        return maleSumm / maleOrders.length;
      }else{            
       return 0;   
     }
   }
 },
 methods: {
    headerClick(th){
      this.activeTh = th;
      this.sortParameter = th.sortValue;
    },
    currencySelect(item){
      this.baseCurrency = item;
    },
    exchangeInstall(rates){
      console.log(rates);
      this.exchange.EUR = 1/rates.USD;
      this.exchange.RUB = (1/rates.USD) / (1/rates.RUB);
      this.exchange.CNY = (1/rates.USD) / (1/rates.CNY);
    }
  },
async created(){
 this.dataLoading = true;

 const dataFromServer = await fetchData();
 
 if(Object.keys(dataFromServer).length > 0){
   this.users = dataFromServer.users;
   this.orders = dataFromServer.orders;
   this.companies = dataFromServer.companies;

 }

 const currencyFromServer = await fetchCurrency();
 console.log(currencyFromServer);
 if(currencyFromServer.success){
    this.exchangeInstall(currencyFromServer.rates);
 }
   this.dataLoading = false;
 
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
   background-color: rgba(0,0,0, .5);
   z-index: 5;
}
/*h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: underline;
}*/
</style>

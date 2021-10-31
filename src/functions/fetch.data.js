const fetchData = async function() {
	try{
		const users = await fetch('https://raw.githubusercontent.com/wgnet/wg_forge_frontend/master/data/users.json').then(resp => resp.json());
		const orders = await fetch('https://raw.githubusercontent.com/wgnet/wg_forge_frontend/master/data/orders.json').then(resp => resp.json());
		const companies = await fetch('https://raw.githubusercontent.com/wgnet/wg_forge_frontend/master/data/companies.json').then(resp => resp.json());

		return {
			users,
			orders,
			companies
		}
	}catch(e){
		return e
	}
}
const fetchCurrency = async function() {
	try{
		// const res = await fetch(`http://data.fixer.io/api/latest?access_key=49656929fa6f6834e9007f4334997cd3&base=USD&symbols=GBP,EUR,RUB`);
		const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      	return await res.json();
	
	}catch(e){
		return e
	}
}
export {fetchData, fetchCurrency};
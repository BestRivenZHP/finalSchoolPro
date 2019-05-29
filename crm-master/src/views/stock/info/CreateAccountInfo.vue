<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			仓库:
		</div>
		<Table stripe :columns="columns5" :data="data5"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

				columns5: [{
					title: '商品编码',
          align: "center",
					key: 'date',
				}, {
					title: '品名',
          align: "center",
					key: 'name'
				}, {
					title: '规格型号',
					key: 'age',
          align: "center",
				}, {
					title: '期初数量',
					key: 'address',
          align: "center",
				}, {
					title: '单位',
					key: 'address',
          align: "center",
				}, {
					title: '期初金额',
					key: 'address',
          align: "center",
				}, {
					title: '期初单价',
					key: 'address',
          align: "center",
				}, {
					title: '建账日期',
					key: 'address',
          align: "center",
				}],
				data5: [{
						name: 'zhao',
						age: 18,
						address: 50,
						date: "0021"
					},
					{
						name: 'Jim Green',
						age: 24,
						address: 300,
						date: "0031"
					},
					{
						name: 'Joe Black',
						age: 30,
						address: 200,
						date: "010"
					},
					{
						name: 'Jon Snow',
						age: 26,
						address: 15,
						date: "031"
					}
				],
				pageSize: 10,
				dataCount: 100
			}
		}
	}
</script>

<style>

</style>

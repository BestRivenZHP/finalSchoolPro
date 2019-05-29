<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			<span>单号:{{$route.params.in_sale_num}}</span>
			<span style="margin-left: 20px;">客户:{{$route.params.in_sale_name}}</span>
			<span style="margin-left: 20px;">出库仓库:{{$route.params.in_sale_stock}}</span>
		</div>
		<Table :columns="columns5" :data="saleList"></Table>
	</div>
</template>

<script>
	import { srBillDetailList } from '../../../api/api'
	export default {
		data() {
			return {
				columns5: [{
					title: '序号',
					width: 60,
					key: 'numid',
          align: "center",
				}, {
					title: '商品编码',
					key: 'code',
          align: "center",
				}, {
					title: '商品名称',
					key: 'name',
          align: "center",
				}, {
					title: '规格型号',
					key: 'spec',
          align: "center",
				}, {
					title: '退货数量',
          align: "center",
					key: 'rejection_goods_count',
				}, {
					title: '单位',
          align: "center",
					key: 'unit_name',
				}, {
					title: '退货单价',
          align: "center",
					key: 'rejection_goods_price',
				}, {
					title: '退货金额',
          align: "center",
					key: 'rejection_sale_money',
				}, {
					title: '序列号',
          align: "center",
					key: 'sn_note',
				}],
				saleList: []
			}
		},
		mounted() {
			srBillDetailList({
        ticket: sessionStorage.getItem("ticket"),
				billId: this.$route.params.in_sale_id
			}).then(res => {
				/*console.log(res.data)*/
				this.saleList = res.data
				var num =1
				this.saleList.forEach((item, Index) => {
					item.numid = num++
				})
			})
		}
	}
</script>

<style>

</style>

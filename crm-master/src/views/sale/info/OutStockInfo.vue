<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			<span>单号:{{$route.params.out_num}}</span>
			<span style="margin-left: 20px;">客户:{{$route.params.out_user}}</span>
			<span style="margin-left: 20px;">出库仓库:{{$route.params.out_stock}}</span>
		</div>
		<Table :columns="columns5" :data="saleList"></Table>
	</div>
</template>

<script>
	import { wsBillDetailList } from '../../../api/api'
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
					title: '数量',
					key: 'goods_count',
          align: "center",
				}, {
					title: '单位',
          align: "center",
					key: 'unit_name',
				}, {
					title: '单价',
          align: "center",
					key: 'goods_price',
				}, {
					title: '销售金额',
          align: "center",
					key: 'goods_money',
				}, {
					title: '序列号',
          align: "center",
					key: 'sn_note',
				}, {
					title: '备注',
          align: "center",
					key: 'memo',
				}],
				saleList: []
			}
		},
		mounted() {
			wsBillDetailList({
        ticket: sessionStorage.getItem("ticket"),
				id: this.$route.params.out_id
			}).then(res => {
				/*console.log(res.data)*/
				this.saleList = res.data
				var num=1
				this.saleList.forEach((item, Index) => {
					item.numid = num++
				})
			})
		}
	}
</script>

<style>

</style>

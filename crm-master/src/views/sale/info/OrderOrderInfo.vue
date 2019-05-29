<template>
	<!--点击销售订单页面出库详情-->
	<div class="purchase_order">
		<div class="basic_indicators">
			销售订单出库详情
		</div>
		<Table :columns="columns5" :data="saleList"></Table>
	</div>
</template>

<script>
	import { soBillWSBillList } from '../../../api/api'
	export default {
		data() {
			return {
				columns5: [{
					title: '序号',
					width: 60,
					key: 'numid',
          align: "center",
				}, {
					title: '状态',
					key: 'bill_status',
          align: "center",
				}, {
					title: '单号',
          align: "center",
					key: 'ref',
				}, {
					title: '业务日期',
          align: "center",
					key: 'dateCreated',
				}, {
					title: '客户',
          align: "center",
					key: 'customerName',
				}, {
					title: '收款方式',
          align: "center",
					key: 'receivingType',
				}, {
					title: '销售金额',
          align: "center",
					key: 'amount',
				}, {
					title: '出库仓库',
          align: "center",
					key: 'warehouseName',
				}, {
					title: '业务员',
          align: "center",
					key: 'inputUserName',
				}, {
					title: '制单人',
          align: "center",
					key: 'bizUserName',
				}, {
					title: '制单时间',
          align: "center",
					key: 'bizDate',
				}, {
					title: '备注',
          align: "center",
					key: 'memo',
				}],
				saleList: []
			}
		},
		mounted() {
			soBillWSBillList({
        ticket: sessionStorage.getItem("ticket"),
				soBillId: this.$route.params.sale_order_id
			}).then(res => {
				/*console.log(res.data)*/
				this.saleList = res.data
				var num = 1
				this.saleList.forEach((item, Index) => {
					item.numid = num++
						if(item.bill_status == 0) {
							item.bill_status = '待审核'
						} else
					if(item.bill_status == 1000) {
						item.bill_status = '已审核'
					} else if(item.bill_status == 1001) {
						item.bill_status = '订单取消'
					} else if(item.bill_status == 2000) {
						item.bill_status = '部分出库'
					} else if(item.bill_status == 2001) {
						item.bill_status = '部分出库-订单关闭'
					} else if(item.bill_status == 3000) {
						item.bill_status = '全部出库'
					} else {
						item.bill_status = '全部出库-订单关闭'
					}
				})
			})
		}
	}
</script>

<style>

</style>

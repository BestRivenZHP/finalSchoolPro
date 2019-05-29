<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			<span>{{$route.params.ref_type}}</span> - 单号:
			<span>{{$route.params.ref_number}}</span>
		</div>
		<Table stripe :columns="columns5" :data="info_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
	import {payRecordList} from '../../../../api/api'
	export default {
		data() {
			return {
				columns5: [{
					title: '收款日期',
          align: "center",
					key: 'dateCreated',
				}, {
					title: '收款金额',
          align: "center",
					key: 'actMoney'
				}, {
					title: '收款人',
          align: "center",
					key: 'bizUserName',
				}, {
					title: '录入时间',
          align: "center",
					key: 'bizDate'
				}, {
					title: '录入人',
          align: "center",
					key: 'bizDate'
				}, {
					title: '备注',
          align: "center",
					key: 'remark'
				}],
				pageSize: 10,
				dataCount: 0,
				info_list:[],//列表数据
			}
		},
		mounted(){
			payRecordList({
        ticket: sessionStorage.getItem("ticket"),
				refType:this.$route.params.ref_type,
				refNumber:this.$route.params.ref_number
			}).then(res=>{
				this.info_list=res.data.data.dataList
				this.dataCount=res.data.data.totalCount
			})
		},
		methods:{
			changepage(){}
		}
	}
</script>

<style>
	.acc_info {
		padding: 0 20px;
	}
</style>

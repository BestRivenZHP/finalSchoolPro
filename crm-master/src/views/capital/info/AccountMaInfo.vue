<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			业务单据
		</div>
		<Table stripe :columns="columns5" :data="info_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
	import {payDetailList} from '../../../api/api'
	export default {
		data() {
			return {
				columns5: [{
					title: '业务类型',
          align: "center",
					key: 'refType',
				}, {
					title: '单号',
          align: "center",
					key: 'refNumber'
				}, {
					title: '业务日期',
          align: "center",
					key: 'bizDT',
				}, {
					title: '应付金额',
          align: "center",
					key: 'payMoney'
				}, {
					title: '已付金额',
          align: "center",
					key: 'balanceMoney'
				}, {
					title: '未收金额',
          align: "center",
					key: 'actMoney'
				}, {
					title: '创建时间',
          align: "center",
					key: 'dateCreated'
				}, {
					title: '操作',
					key: 'action',
					fixed: 'right',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('p', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'default'
								},
								style: {
									marginRight: '8px'
								},
								on: {
									click: () => {
										this.$router.push('/c/account-mainfoinfo/'+params.row.refType+'/'+params.row.refNumber)
									}
								}
							}, '查看'),
						]);
					}
				}],
				pageSize: 10,
				dataCount: 0,
				info_list:[],//列表数据
			}
		},
		mounted(){
			payDetailList({
        ticket: sessionStorage.getItem("ticket"),
				caType:this.$route.params.account_type,
				caId:this.$route.params.account_id
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

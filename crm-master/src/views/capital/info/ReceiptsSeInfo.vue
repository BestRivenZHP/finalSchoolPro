<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			现金收支流水明细
		</div>
		<Table stripe :columns="detailaccountlist" :data="detailaccountdata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
  import { DetailAccount } from '../../../api/api'
	export default {
		data() {
			return {
				detailaccountlist: [{
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
					title: '收',
          align: "center",
					key: 'inMoney'
				}, {
					title: '支',
          align: "center",
					key: 'outMoney'
				}, {
					title: '余额',
          align: "center",
					key: 'balanceMoney'
				}, {
					title: '创建时间',
          align: "center",
					key: 'dateCreated'
				}/*, {
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
										this.$router.push('/c/account-mainfo')
									}
								}
							}, '查看'),
						]);
					}
				}*/],
				detailaccountdata: [],
				pageSize: 20,
				dataCount: 0,
			}
		},
    methods:{
      changepage(index){
        DetailAccount({
          ticket: sessionStorage.getItem("ticket"),
          date: this.$route.params.date,
          page: index
        }).then(res => {
          this.detailaccountdata = res.data.data.dataList
          this.dataCount = res.data.data.totalCount
        })
      },
      getdetailaccount(){
        DetailAccount({
          ticket: sessionStorage.getItem("ticket"),
          date: this.$route.params.date,
          page: 1
        }).then(res => {
          this.detailaccountdata = res.data.data.dataList
          this.dataCount = res.data.data.totalCount
        })
      }
    },
    mounted(){
      this.getdetailaccount()
    }
	}
</script>

<style>
	.acc_info {
		padding: 0 20px;
	}
</style>

<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			应收账款账龄分析表
		</div>
		<!--<Row>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">业务日期:</Col>
				<Col span="18">
				<DatePicker type="month" placeholder="Select date"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin: 20px 0;margin-left: 20px;">
			<Button type="primary">查询</Button>
			</Col>
		</Row>-->
		<!--<div class="basic_indicators" style="margin-bottom: 30px;">
			销售月报表-用户汇总
		</div>-->
		<Table stripe :columns="accountlist" :data="accountdata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>

    <div class="basic_indicators" style="margin-bottom: 30px;margin-top:100px;">
      应收账款汇总
    </div>
    <Table stripe :columns="AccountMoneycountlist" :data="AccountMoneycountdata"></Table>
	</div>
</template>

<script>
  import { searchAccountMoneyReport,getAccountMoneyReport } from '../../../api/api'
	export default {
		data() {
			return {
				accountlist: [{
					title: '往来单位性质',
          align: "center",
					key: 'caType',
				}, {
					title: '往来单位编码',
          align: "center",
					key: 'caCode'
				}, {
					title: '往来单位',
          align: "center",
					key: 'caName'
				}, {
					title: '当初余额',
          align: "center",
					key: 'balanceMoney'
				}, {
					title: '账龄30天内',
          align: "center",
					key: 'money30'
				}, {
					title: '账龄30~60天',
          align: "center",
					key: 'money30to60'
				}, {
					title: '账龄60~90天',
          align: "center",
					key: 'money60to90'
				}, {
					title: '账龄大于90天',
          align: "center",
					key: 'money90'
				},
//				{
//					title: '操作',
//					key: 'action',
//					fixed: 'right',
//					align: 'center',
//					render: function(h, params) {
//						return h('p', [
//							h('Button', {
//								props: {
//									type: 'primary',
//									size: 'small'
//								},
//								style: {
//									marginRight: '8px'
//								},
//								on: {
//									click: function() {
//										console.log(params)
//									}
//								}
//							}, '编辑'),
//							h('Button', {
//								props: {
//									type: 'error',
//									size: 'small'
//								},
//								style: {
//									marginRight: '8px'
//								},
//								on: {
//									click: function() {
//										console.log(params)
//									}
//								}
//							}, '删除'),
//						]);
//					}
//				}
			],
				accountdata: [],
				pageSize: 10,
				dataCount: 0,
        AccountMoneycountlist:[
        {
          title: '当期余额',
          align: "center",
          key: 'balanceMoney',
        },{
          title: '账龄30天内',
          align: "center",
          key: 'money30',
        },{
          title: '账龄30~60天',
          align: "center",
          key: 'money30to60',
        },{
          title: '账龄60~90天',
          align: "center",
          key: 'money60to90',
        },{
          title: '账龄大于90天',
          align: "center",
          key: 'money90',
        }
        ],
        AccountMoneycountdata: [],
			}
		},
    methods:{
      changepage(index){
        searchAccountMoneyReport({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
        }).then(res => {
          this.accountdata = res.data.data.dataList
          this.dataCount = res.data.data.totalCount

        getAccountMoneyReport().then(res => {
          this.AccountMoneycountdata = res.data.data
        })
        })
      },
      getAccountMoney(){
        searchAccountMoneyReport({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          this.accountdata = res.data.data.dataList
          this.dataCount = res.data.data.totalCount

        getAccountMoneyReport().then(res => {
          this.AccountMoneycountdata = res.data.data
        })
        })
      }
    },
    mounted(){
      this.getAccountMoney()
    }
	}
</script>

<style>
	.sale_day_goods {
		padding: 0 20px;
	}
</style>

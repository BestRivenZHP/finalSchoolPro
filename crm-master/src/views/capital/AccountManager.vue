<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">往来单位:</Col>
				<Col span="18">
				<Select v-model="unit_id">
					<Option value="supplier">供应商</Option>
					<Option value="customer">客户</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">分类:</Col>
				<Col span="18">
				<Select v-model="customer_id">
					<Option v-for="(item,index) in customer_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin: 20px 0;margin-left: 20px;">
			<Button type="primary" @click="search">查询</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			应收账款管理列表
		</div>
		<Table stripe :columns="columns5" :data="pay_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
	import {payList,payCategoryList} from '../../api/api'
	export default {
		data() {
			return {
				columns5: [{
						title: '编码',
            align: "center",
						key: 'code',
					},
					{
						title: '名称',
            align: "center",
						key: 'name'
					},
					{
						title: '应收金额',
            align: "center",
						key: 'balanceMoney',
					},
					{
						title: '已收金额',
            align: "center",
						key: 'payMoney'
					},
					{
						title: '未收金额',
            align: "center",
						key: 'actMoney'
					}, {
						title: '操作',
						key: 'action',
						fixed: 'right',
						width: 100,
						align: 'center',
						render: (h, params)=> {
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
										click: ()=> {
											this.$router.push('/c/account-mainfo/'+this.unit_id+'/'+params.row.caId)
										}
									}
								}, '查看'),
							]);
						}
					}
				],
				pageSize: 20,
				dataCount: 0,
				customer_list:[],//分类列表
				unit_id:'supplier',//绑定往来单位的id,默认是供应商
				customer_id:'',//绑定分类的id
				pay_list:[],//首页列表
			}
		},
		mounted(){
			this.getCustomerList();
			this.getPayList();
		},
		methods:{
			changepage(){},
			search(){
				this.pay_list=[]
				payList({
          ticket: sessionStorage.getItem("ticket"),
					caType:this.unit_id,
					categoryId:this.customer_id
				}).then(res=>{
					this.pay_list=res.data.data.dataList

				})
			},
			getPayList(){
				payList({
          ticket: sessionStorage.getItem("ticket"),
					caType:this.unit_id
				}).then(res=>{
					this.pay_list=res.data.data.dataList
          this.dataCount = res.data.data.dataList.length
				})
			},
			getCustomerList(){
				payCategoryList({
          ticket: sessionStorage.getItem("ticket"),
					type:this.unit_id
				}).then(res=>{
					/*console.log(res)*/
          this.customer_list=res.data.data
				})
			}
		},
		watch:{
			'unit_id':'getCustomerList'
		}
	}
</script>

<style>
/*   .account {
  padding: 0 20px;
} */
</style>

<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">供应商分类</Col>
				<Col span="18">
				<Select v-model="category_id">
					<Option v-for="(item,index) in supliercategorylist" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin: 20px 0;margin-left: 20px;">
			<Button type="primary" @click="search">查询</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			预付款管理列表
			<Button type="primary" style="margin-left: 50px;" @click="getMoney">预付供应商采购货款</Button>
			<Button type="primary" style="margin-left: 30px;" @click="returnMoney">供应商退回采购预付款</Button>
		</div>
		<Table stripe :columns="columns5" :data="pay_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
		<Modal v-model="get_money" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>预付供应商采购货款</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">供应商</Col>
					<Col span="18">
					<Select v-model='supplierId'>
						<Option v-for="(item,index) in suplier_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">收款日期</Col>
					<Col span="18">
					<DatePicker type="date" style='width: 100%;' placeholder="请选择日期" v-model='bizDT' :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">预付金额</Col>
					<Col span="18">
					<Input v-model='inMoney'></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">付款人</Col>
					<Col span="18">
					<Select v-model="user_id">
						<Option v-for="(item,index) in alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="keepMoney">保存</Button>
				<Button type="primary" @click="closeGetModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="return_money" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>供应商退回采购货款</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">供应商</Col>
					<Col span="18">
					<Select v-model='return_supplierId'>
						<Option v-for="(item,index) in suplier_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">退款日期</Col>
					<Col span="18">
					<DatePicker type="date" style='width: 100%;' placeholder="请选择日期" v-model='return_bizDT' :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">退款金额</Col>
					<Col span="18">
					<Input v-model="return_inMoney"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">收款人</Col>
					<Col span="18">
					<Select v-model="user_id">
						<Option v-for="(item,index) in alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="returnModal">保存</Button>
				<Button type="primary" @click="closeReturnModal">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getSupplierCategoryList, prepaymentList, addPrePayment, getAllSupplier, returnPrePayment, getAllUsers } from '../../api/api'
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
				get_money: false,
				return_money: false,
				columns5: [{
						title: '客户编码',
            align: "center",
						key: 'code',
					},
					{
						title: '客户名称',
            align: "center",
						key: 'name'
					},
					{
						title: '收',
            align: "center",
						key: 'inMoney',
					},
					{
						title: '支',
            align: "center",
						key: 'outMoney'
					},
					{
						title: '预付款余额',
            align: "center",
						key: 'balanceMoney'
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
											this.$router.push('/c/payadvance-info/' + params.row.id)
										}
									}
								}, '查看详情'),
							]);
						}
					}
				],
				pageSize: 20,
				dataCount: 0,
				supliercategorylist: [],
				category_id: '',
				pay_list: [],
				supplierId: '', //供应商id
				bizDT: '', //日期
				inMoney: '', //绑定的金额
				suplier_list: [], //绑定供应商列表
				return_supplierId: '', //返还时供应商id
				return_bizDT: '', //返还时日期
				return_inMoney: '', //返还时绑定的金额
				alluserslist:[],
				user_id:''
			}
		},
		methods: {
			changepage() {},
			//点击预付供应商采购货款出现弹窗
			getMoney() {
				this.get_money = true;
			},
			//点击点击预付供应商采购货款出现弹窗中的保存按钮
			keepMoney() {
				addPrePayment({
          ticket: sessionStorage.getItem("ticket"),
					supplierId: this.supplierId,
					bizDT: this.bizDT,
					inMoney: this.inMoney
				}).then(res => {
					this.$Message.info(res.msg)
					this.get_money = false;
					this.supplierId = ''
					this.bizDT = ''
					this.inMoney = ''
				})
			},
			//点击点击预付供应商采购货款出现弹窗中的取消按钮
			closeGetModal() {
				this.get_money = false;
			},
			//点击点击返还供应商采购货款出现弹窗
			returnMoney() {
				this.return_money = true;
			},
			//点击返还弹窗的保存按钮
			returnModal() {
				returnPrePayment({
          ticket: sessionStorage.getItem("ticket"),
					supplierId: this.return_supplierId,
					bizDT: this.return_bizDT,
					inMoney: this.return_inMoney
				}).then(res => {
					this.$Message.info(res.msg)
					this.return_money = false;
					this.return_supplierId = ''
					this.return_bizDT = ''
					this.return_inMoney = ''
				})
			},
			closeReturnModal() {
				this.return_money = false;
			},
			/*获取供应商分类列表*/
			getSupplierCategoryinfo() {
				getSupplierCategoryList({
					ticket: this.$store.state.ticket
				}).then(res => {
					this.supliercategorylist = res.data
					this.category_id = this.supliercategorylist[0].id
					this.getPayList();
					var num = 1
					this.supliercategorylist.forEach((item, index) => {
						item['numid'] = num++
					})
				})
			},
			getPayList() {
				prepaymentList({
          ticket: sessionStorage.getItem("ticket"),
					categoryId: this.category_id
				}).then(res => {
					this.pay_list = res.data.data.dataList
					this.dataCount = res.data.data.dataList.length
				})
			},
			search() {
				this.pay_list = []
				prepaymentList({
          ticket: sessionStorage.getItem("ticket"),
					categoryId: this.category_id
				}).then(res => {
					this.pay_list = res.data.data.dataList
					this.dataCount = res.data.data.totalCount
				})
			},

		},
		mounted() {
      this.$store.state.ticket = sessionStorage.getItem("ticket")
			this.getSupplierCategoryinfo(),
				getAllSupplier({
					ticket: this.$store.state.ticket
				}).then(res => {
					this.suplier_list = res.data
				})
			getAllUsers({
        ticket: sessionStorage.getItem("ticket"),
      }).then(res => {
				res.data.forEach((item, index) => {
					var temp = {}
					temp.value = item.id
					temp.label = item.name
					this.alluserslist.push(temp)
				})
				console.log(this.alluserslist)
			})
		}
	}
</script>

<style>
	.account {
		padding: 0 20px;
	}
</style>

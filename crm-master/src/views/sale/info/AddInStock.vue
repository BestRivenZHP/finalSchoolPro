<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			新建销售退货出库单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">客户</Col>
				<Col span="16">
				<Select v-model="customerId" disabled>
					<Option v-for="(item,index) in customerslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">单号</Col>
				<Col span="16">{{odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">业务日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" v-model='bizDT' :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">入库仓库</Col>
				<Col span="16">
				<Select v-model="warehouseId">
					<Option v-for="(item,index) in stock_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">业务员</Col>
				<Col span="16">
				<Select v-model='bizUserId'>
					<Option v-for="(item,index) in alluserslist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">付款方式</Col>
				<Col span="16">
				<Select v-model='receivingType'>
					<Option v-for="(item,index) in paymentlist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<div class="ivu-table-wrapper">
			<div class="ivu-table ivu-table-stripe">
				<div class="ivu-table-header">
					<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
						<thead>
							<tr>
								<th class="">
									<div class="ivu-table-cell">
										<span>序号</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>商品编码</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>商品名称</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>规格型号</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>退货数量</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>单位</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>退货单价</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>退货金额</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>销售数量</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>销售单价</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>销售金额</span>
									</div>
								</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="ivu-table-tip">
					<div class='Modal'>
						<table cellspacing="0" cellpadding="0">
							<tbody>
								<tr class='tr_parent_trash' v-for="(list, key) in table.lists">
									<td>{{key+1}}</td>
									<!--<td>
										<i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
									</td>-->
									<td class="">{{list.code}}</td>
									<td class="">{{list.name}}</td>
									<td class="">{{list.spec}}</td>
									<td class="">
										<Input placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.goodsCount'></Input>
									</td>
									<td class="">{{list.unit_name}}</td>
									<td class="">
										<Input placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.goodsPrice"></Input>
									</td>
									<td class="">
										{{list.goodsMoney | filterByNumber}}
									</td>
									<td class="">{{list.sn}}</Input>
									</td>
									<td class="">
										<Input placeholder="备注" class='modea_input' v-model="list.memo"></Input>
									</td>
									<td class="">
									</td>
								</tr>
								<tr>
									<!--<td></td>-->
									<td>

									</td>
									<td class=""></td>
									<td class=""></td>
									<td class=""></td>
									<td class="">
									</td>
									<td class=""></td>
									<td class="">销售金额合计：
									</td>
									<td class="">
										{{totalPrice | filterByNumber}}
									</td>
									<td class=""></td>
									<td class="">
									</td>
									<td class=""></td>
								</tr>
							</tbody>
						</table>
						<Modal v-model="add_orders" width="1000">
							<p slot="header" style="color:#2D8CF0;text-align:left">
								<span>选择商品</span>
							</p>
							<i-table border :columns="goodsTitle" :data="goods_list" height="400" :highlight-row="hrow" @on-row-click="appendTitle"></i-table>
						</Modal>
					</div>
				</div>
			</div>
		</div>
		<div style="float: right;margin: 30px;">
			<Button type="primary" @click="submitAddOrder">提交</Button>
			<Button type="primary" style="margin-left:30px;">取消</Button>
		</div>
		<Modal v-model="choose_sale" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>请选择销售出库单</span>
			</p>
			<div>
				<Table height="350" :columns="saleList" :data="sale_data" @on-row-click='saleClick'></Table>
			</div>
			<div slot="footer">

			</div>
		</Modal>
	</div>
</template>

<script>
	import { getGoods, allCustomer, getAllOrgs, getAllUsers, getUser, editWSBill, getAllStock, selectWSBillList, getWSBillInfoForSRBill, editSRBill } from '../../../api/api'
	export default {
		mounted() {
			this.$store.state.ticket = sessionStorage.getItem("ticket")
			this.getGoodsList();
			this.getAllCustomers();
			this.getAllOrgsinfo();
			this.getAllUsersinfo();
			this.getStockList();
			this.getSaleModal();
		},
		data() {
			return {
				options: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
				odd_number: '保存后自动添加',
				hrow: true,
				checkVriable: 0,
				totalPrice: 0,
				taxalPrice: 0,
				taxtTotalMoney: 0,
				saleList: [{
					title: '序号',
					key: 'numid',
					align: "center",
					width: '60'
				}, {
					title: '单号',
					key: 'ref',
					align: "center",
				}, {
					title: '业务日期',
					key: 'bizDate',
					align: "center",
				}, {
					title: '客户',
					key: 'customerName',
					align: "center",
				}, {
					title: '销售金额',
					key: 'amount',
					align: "center",
				}, {
					title: '出库仓库',
					key: 'warehouseName',
					align: "center",
				}, {
					title: '业务员',
					align: "center",
					key: 'inputUserName'
				}, {
					title: '录单人',
					align: "center",
					key: 'bizUserName'
				}],
				goodsTitle: [{
						title: '商品编码',
						key: 'code',
						align: "center",
					},
					{
						title: '商品',
						key: 'name',
						align: "center",
					},
					{
						title: '规格型号',
						key: 'spec',
						align: "center",
					},
					{
						title: '单位',
						key: 'unit_name',
						align: "center",
					},
					{
						title: '建议采购价',
						key: 'goodsPrice',
						align: "center",
					},
					{
						title: '备注',
						key: 'memo',
						align: "center",
					}
				],
				table: {
					lists: [{
						goodsId: '',
						code: '',
						name: "",
						spec: "",
						goodsCount: 0, //采购数量
						unit_name: "",
						goodsPrice: 0, //采购单价
						goodsMoney: 0, //采购总额
						soBillDetailId: '', //序列号
						sn: '',
						memo: '', //描述
					}]
				},
				add_orders: false,
				goods_list: [],
				tab_key: 0,
				tax: 0,
				customerslist: [], //客户列表

				bizDT: '', //绑定的业务时间
				customerId: '', //绑定客户id
				dealAddress: '', //交货的地址
				contact: '', //联系人
				tel: '', //电话
				fax: '', //传真
				orgId: '', //组织机构id
				bizUserId: "00CA9226-FCC0-11E7-9E81-00163E03B878", //业务员id
				receivingType: 0, //付款传的的id
				billMemo: "", //备注
				warehouseId: '7C2763B4-FB23-11E7-9E81-00163E03B878', //仓库的id
				sobillRef: '',
				orgslist: [], //组织机构列表
				alluserslist: [], //业务员列表
				paymentlist: [{
					value: '0',
					label: '记应收账款'
				}, {
					value: '1',
					label: '现金付款'
				}],
				stock_list: [], //仓库列表
				choose_sale: true, //
				sale_data: [], //弹窗里面的数据集合
				sale_id: '', //绑定当前点击行的id
			}
		},
		filters: {
			filterByNumber(value) {
				return isNaN(value) ? '' : parseFloat(value).toFixed(2);
			}
		},
		methods: {
			saleClick(params) {
				this.sale_id = params.id;
				this.choose_sale = false
				console.log(this.sale_id)
			},
			getSaleModal() {
				selectWSBillList({
          loginUserId: sessionStorage.getItem('ticket'),
        }).then(res => {
					this.sale_data = res.data
					var num = 1
					this.sale_data.forEach((item, index) => {
						item.numid = num++
					})
				})
			},
			showProduct(key) {
				this.tab_key = key;
				this.add_orders = true;
			},
			delInput(key) {
				if(key != 0) {
					this.table.lists.splice(key, 1);
					this.sumTotalPrice(key - 1);
				}
			},
			addInput() {
				this.table.lists.push({
					goodsId: '',
					code: '',
					name: "",
					spec: "",
					goodsCount: 0, //采购数量
					unit_name: "",
					goodsPrice: 0, //采购单价
					goodsMoney: 0, //采购总额
					soBillDetailId: '', //序列号
					sn: '',
					memo: '', //描述
				});
			},
			getGoodsList() {
				getGoods({
					ticket: this.$store.state.ticket,
				}).then(res => {
					this.goods_list = res.data
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
					})
				})
			},
			appendTitle(currentRow) {
				consol.log(currentRow)
				for(var i = 0; i < this.table.lists.length; i++) {
					if(this.table.lists[i].goodsId == currentRow.id) {
						this.$Message.info("不可选择重复商品")
						return
					}
				}

				this.table.lists[this.tab_key].name = currentRow.name;
				this.table.lists[this.tab_key].spec = currentRow.spec;
				this.table.lists[this.tab_key].unit_name = currentRow.unit_name;
				this.table.lists[this.tab_key].code = currentRow.code;
				this.table.lists[this.tab_key].goodsId = currentRow.id
				this.table.lists[this.tab_key].memo = currentRow.memo
				this.table.lists[this.tab_key].soBillDetailId = ''
				this.table.lists[this.tab_key].sn = ''
				this.add_orders = false;
			},
			sumTotalPrice(key) {
				this.table.lists[key].goodsMoney =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice);
				this.table.lists[key].tax =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice) * 0.17;
				this.table.lists[key].moneyWithTax = this.table.lists[key].goodsMoney + this.table.lists[key].tax;
				this.totalPrice = 0, this.taxalPrice = 0, this.taxtTotalMoney = 0;
				this.table.lists.forEach((item, index) => {
					this.totalPrice += parseFloat(item.goodsMoney);
					this.taxalPrice += item.tax;
					this.taxtTotalMoney += item.moneyWithTax;
				})
			},
			submitAddOrder() {
				if(this.bizDT == "") {
					this.$Message.info('请输入业务日期!')
					return;
				}
				if(this.warehouseId == "") {
					this.$Message.info('请选择入库仓库!')
					return;
				}
				if(this.bizUserId == "") {
					this.$Message.info('请选择业务员!')
					return;
				}

				var adduser = {}
				var datenow = new Date(this.bizDT)
				this.bizDT = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
				adduser.id = '';
				adduser.loginUserId = sessionStorage.getItem('ticket')
				adduser.bizDT = this.bizDT;
				adduser.customerId = this.customerId;
				adduser.wsBillId = this.sale_id
				adduser.warehouseId = this.warehouseId;
				adduser.bizUserId = this.bizUserId;
				adduser.receivingType = this.receivingType;
				adduser.billMemo = this.billMemo;
				adduser.dealAddress = this.dealAddress;
				adduser.sobillRef = this.sobillRef;
				adduser.items = this.table.lists;
				editSRBill({
					jsonStr: adduser,
					loginUserId: sessionStorage.getItem('ticket'),
				}).then(res => {
					if(res.retcode == 2000) {
						this.$Message.info(res.msg)
						this.$router.push('/x/saleinstock')
					} else {
						this.$Message.info(res.msg)
					}
				})
			},
			/*获取客户数据*/
			getAllCustomers() {
				allCustomer({
          loginUserId: sessionStorage.getItem('ticket'),
        }).then(res => {
					res.data.forEach((item, index) => {
						var temp = {}
						temp.label = item.name
						temp.value = item.id
						this.customerslist.push(temp)
					})
				})
			},
			/*获取组织机构列表*/
			getAllOrgsinfo() {
				getAllOrgs({
          ticket: sessionStorage.getItem('ticket'),
        }).then(res => {
					res.data.forEach((item, index) => {
						var temp = {}
						temp.value = item.id
						temp.label = item.name
						this.orgslist.push(temp)
					})
				})
			},
			/*获取业务员列表*/
			getAllUsersinfo() {
				getUser({
          ticket: sessionStorage.getItem('ticket'),
        }).then(res => {
					/*console.log(res)*/
					res.data.forEach((item, index) => {
						var temp = {}
						temp.value = item.id
						temp.label = item.nickname
						this.alluserslist.push(temp)
					})
				})
			},
			//获取仓库列表
			getStockList() {
				getAllStock({
          ticket: sessionStorage.getItem('ticket'),
        }).then(res => {
					this.stock_list = res.data;
				})
			},
			getSaleDataInfo() {
				getWSBillInfoForSRBill({
          loginUserId: sessionStorage.getItem('ticket'),
					id: this.sale_id
				}).then(res => {
					this.table.lists = res.data.item
					this.totalPrice = parseFloat(res.data.item[0].goodsMoney).toFixed(2)
					this.customerId = res.data.customer_id
					var datenow = new Date()
					this.bizDT = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
				})
			}
		},
		watch: {
			'sale_id': 'getSaleDataInfo'
		}
	}
</script>

<style>
	input::-ms-input-placeholder {
		text-align: center;
	}

	input::-webkit-input-placeholder {
		text-align: center;
	}

	.Modal td {
		border-right: 1px solid #e9eaec;
	}

	.modea_input {
		width: 80%;
		text-align: center;
	}
</style>

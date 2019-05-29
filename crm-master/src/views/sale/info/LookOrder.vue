<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查看销售订单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">单号</Col>
				<Col span="16">{{odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 销售日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" v-model='dealDate' disabled></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 客户</Col>
				<Col span="16">
				<Select v-model="customerId" disabled>
					<Option v-for="(item,index) in customerslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">销售地址</Col>
				<Col span="16">
				<Input v-model="dealAddress" disabled></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">联系人</Col>
				<Col span="18">
				<Input v-model="contact" disabled></Input>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">电话</Col>
				<Col span="16">
				<Input v-model="tel" disabled></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">传真</Col>
				<Col span="16">
				<Input v-model="fax" disabled></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 组织机构</Col>
				<Col span="16">
				<Select v-model='orgId' disabled>
					<Option v-for="(item,index) in orgslist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 销售员</Col>
				<Col span="16">
				<Select v-model='bizUserId' disabled>
					<Option v-for="(item,index) in alluserslist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">收款方式</Col>
				<Col span="18">
				<Select v-model='receivingType' disabled>
					<Option v-for="(item,index) in paymentlist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="16">
			<Col span="2" style="text-align: center;">备注</Col>
			<Col span="22">
			<Input v-model="billMemo" disabled></Input>
			</Col>
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
								<th style="width: 220px;">
									<div class="ivu-table-cell">
										<span>选择商品</span>
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
										<span>销售数量</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>单位</span>
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
								<th class="">
									<div class="ivu-table-cell">
										<span>折扣</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>结算价格</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>赠品(是/否)</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>剩余库存</span>
									</div>
								</th>
								<!-- <th class="">
                  <div class="ivu-table-cell">
                    <span>税率(%)</span>
                  </div>
                </th>
                <th class="">
                  <div class="ivu-table-cell">
                    <span>税金</span>
                  </div>
                </th>
                <th class="">
                  <div class="ivu-table-cell">
                    <span>价税合计</span>
                  </div>
                </th> -->
								<th class="">
									<div class="ivu-table-cell">
										<span>备注</span>
									</div>
								</th>
								<th class="">
									<div class="ivu-table-cell">
										<span>操作</span>
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
									<td style="width: 220px;">
										<i-button disabled type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
										<i-button  disabled type="ghost" icon="qr-scanner" @click='showSan(key)'>扫码入库</i-button>
									</td>
									<td class="">{{list.goodsCode}}</td>
									<td class="">{{list.goodsName}}</td>
									<td class="">{{list.goodsSpec}}</td>
									<td class="">
										<Input disabled placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.goodsCount'></Input>
									</td>
									<td class="">{{list.unitName}}</td>
									<td class="">
										<Input disabled placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.goodsPrice"></Input>
									</td>
									<td class="">
										{{list.goodsMoney | filterByNumber}}
									</td>
									<!--折扣-->
									<td class="">
										<Input disabled placeholder="折扣" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.discount"></Input>
									</td>
									<!--结算价格-->
									<td class="">
										{{list.accountPrice | filterByNumber}}
									</td>
									<!--是否赠品-->
									<td class="">
										<Select disabled v-model="list.isGiveaway" @on-change="sumTotalPrice(key)">
											<Option v-for="item in giveawaySelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</td>
									<!--剩余库存-->
									<td class="">
										{{list.surplusInventory}}
									</td>
									<!-- <td class="">17%</td>
                  <td class="">
                    {{list.tax|filterByNumber}}
                  </td>
                  <td class="">
                    {{list.moneyWithTax|filterByNumber}}
                  </td> -->
									<td class="">
										<Input disabled placeholder="备注" class='modea_input' v-model="list.memo"></Input>
									</td>
									<td class="">
										<span v-on:click="addInput"><Icon type="android-add-circle" style='font-size:25px;margin-right:10px;' ></Icon></span>
										<span v-on:click="delInput(key)" v-if="key > 0"><Icon type="ios-trash" style='font-size:25px;'></Icon></span>
										<span v-else><Icon type="ios-trash-outline" style='font-size:25px;color: #ccc;'></Icon></span>
									</td>
								</tr>
								<tr>
									<td></td>
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
									<!--折扣-->
									<td>
										结算价格合计：
									</td>
									<!--结算价格-->
									<td>
										{{accountPriceTotal | filterByNumber}}
									</td>
									<!--是否赠品-->
									<td>
										抹零：
									</td>
									<!--剩余库存-->
									<td>
										<Input disabled placeholder="抹零" class='modea_input' @on-keyup="getReviceableMoney" v-model="removeZero"></Input>
									</td>
									<!-- <td class=""></td>
                  <td class="">
                    {{taxalPrice | filterByNumber}}
                  </td>
                  <td class="">{{taxtTotalMoney| filterByNumber}}</td> -->
									<td class="">
										应收账款：
									</td>
									<td class="">
										{{receivableMoney | filterByNumber}}
									</td>
								</tr>
							</tbody>
						</table>
						<Modal v-model="add_orders" width="1000">
							<p slot="header" style="color:#2D8CF0;text-align:left">
								<span>选择商品</span>
							</p>
							<i-table border :columns="goodsTitle" :data="goods_list" height="400" :highlight-row="hrow" @on-row-click="appendTitle"></i-table>
						</Modal>
						<Modal v-model="scanmodal" width="700">
							<p slot="header" style="color:#2D8CF0;text-align:left;font-size:20px;">
								<span>扫描商品码</span>
							</p>
							<div slot="footer">
							</div>
							<input @change='chooseGoods' style="width: 100%;height: 30px;line-height: 30px;border-radius: 5px;border: 1px solid #CCCCCC;" v-model="scancode" type="" name="getfoucs" id="getfoucs" value="" placeholder="请扫描商品码" autofocus />
						</Modal>
					</div>
				</div>
			</div>
		</div>
		<!--<div style="float: right;margin: 30px;">
			<Button type="primary" @click="submitAddOrder">提交</Button>
			<Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
		</div>-->
	</div>
</template>

<script>
	import { getGoods, allCustomer, getAllOrgs, getAllUsers, getUser, addSOBill, soBillInfo, getOneGoods, getZsmInfo } from '../../../api/api'
	import util from '../../../common/util.js'
	export default {
		mounted() {
			this.$store.state.ticket = sessionStorage.getItem("ticket")
			this.getGoodsList();
			this.getAllCustomers();
			this.getAllOrgsinfo();
			this.getAllUsersinfo();
			this.getEditOrderData();
		},
		data() {
			return {
				odd_number: '保存后自动添加',
				hrow: true,
				checkVriable: 0,
				totalPrice: 0,
				taxalPrice: 0,
				taxtTotalMoney: 0,
				accountPriceTotal: 0, //结算价格合计
				removeZero: 0, //抹零
				receivableMoney: 0, //应收账款
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
						align: "center",
						key: 'unit_name'
					},
					{
						title: '建议采购价',
						align: "center",
						key: 'goodsPrice'
					},
					{
						title: '备注',
						align: "center",
						key: 'memo'
					}
				],
				table: {
					lists: []
				},
				sale_obj: {
					goodsId: '',
					goodsCode: '',
					goodsName: "",
					goodsSpec: "",
					goodsCount: 0, //采购数量
					unitName: "",
					goodsPrice: 0, //采购单价
					goodsMoney: 0, //采购总额
					discount: "0.00", //折扣
					accountPrice: 0, //结算价格
					isGiveaway: 0, //是否赠品
					surplusInventory: 0, //剩余库存

					taxRate: 0.17, //税率
					tax: 0, //税金
					moneyWithTax: 0, //价税合计
					memo: '', //描述
				},
				add_orders: false,
				goods_list: [],
				tab_key: 0,
				tax: 0,
				customerslist: [], //客户列表

				dealDate: '', //绑定的业务时间
				customerId: '', //绑定客户id
				dealAddress: '', //交货的地址
				contact: '', //联系人
				tel: '', //电话
				fax: '', //传真
				orgId: '', //组织机构id
				bizUserId: "", //业务员id
				receivingType: '', //付款传的的id
				billMemo: "", //备注

				orgslist: [], //组织机构列表
				alluserslist: [], //业务员列表
				paymentlist: [{
					value: 0,
					label: '记应收账款'
				}, {
					value: 1,
					label: '现金付款'
				}],
				scanmodal: false,
				scancode: "",
				giveawaySelectList: [{
						value: 0,
						label: "否",
					},
					{
						value: 1,
						label: "是",
					}
				],
			}
		},
		filters: {
			filterByNumber(value) {
				return isNaN(value) ? '' : parseFloat(value).toFixed(2);
			}
		},
		methods: {
			//点击取消按钮
			escquit() {
				window.history.back()
			},
			//点击扫码入库
			showSan(key) {
				this.scanmodal = true;
				this.getFoucs();
				this.tab_key = key
			},
			//点击扫码入库时弹出扫码入库模态框,点击模态框的确定事件
			chooseGoods() {
				var hell = this.scancode.split(',').length
				if(hell > 1) {
					getZsmInfo({
            ticket: sessionStorage.getItem("ticket"),
						zsm: this.scancode.split(',')[0]
					}).then(res => {
						for(var i = 0; i < this.table.lists.length; i++) {
							if(this.table.lists[i].goodsId == res.data.id) {
								this.$Message.info("不可选择重复商品")
								this.scancode = ''
								return
							}
						}
						this.sale_obj.goodsName = res.data.name;
						this.sale_obj.goodsSpec = res.data.spec;
						this.sale_obj.unit_name = res.data.unit_name;
						this.sale_obj.goodsCode = res.data.code;
						this.sale_obj.goodsId = res.data.id
						this.sale_obj.discount = "0.00"
						this.sale_obj.accountPrice = 0
						this.sale_obj.isGiveaway = 0
						this.sale_obj.surplusInventory = 0
						this.sale_obj.memo = res.data.memo
						this.table.lists[this.tab_key] = util.deepClone(this.sale_obj)
						this.tab_key++;
						this.scancode = '';
						this.scanmodal = false;
					})
				} else {
					getOneGoods({
            ticket: sessionStorage.getItem("ticket"),
						bar_code: this.scancode
					}).then(res => {
						for(var i = 0; i < this.table.lists.length; i++) {
							if(this.table.lists[i].goodsId == res.data.id) {
								this.$Message.info("不可选择重复商品")
								this.scancode = ''
								return
							}
						}
						this.sale_obj.goodsName = res.data.name;
						this.sale_obj.goodsSpec = res.data.spec;
						this.sale_obj.unit_name = res.data.unit_name;
						this.sale_obj.goodsCode = res.data.code;
						this.sale_obj.goodsId = res.data.id
						this.sale_obj.discount = "0.00"
						this.sale_obj.accountPrice = 0
						this.sale_obj.isGiveaway = 0
						this.sale_obj.surplusInventory = 0
						this.sale_obj.memo = res.data.memo
						this.table.lists[this.tab_key] = util.deepClone(this.sale_obj)
						this.tab_key++
							this.scancode = ''
						this.scanmodal = false;
					})
				}
			},
			//获取焦点事件,因dom加载导致方法不能成功生效,第一:用自己写的input,第二:加30毫秒的延迟
			getFoucs() {
				setTimeout(function() {
					document.querySelector('#getfoucs').focus();
				}, 30);
			},
			//获取指定id对应的数据
			getEditOrderData() {
				soBillInfo({
          ticket: sessionStorage.getItem("ticket"),
					id: this.$route.params.look_id
				}).then(res => {
					this.odd_number = res.data.ref
					this.dealDate = res.data.dealDate;
					this.dealAddress = res.data.dealAddress;
					this.customerId = res.data.customerId;
					this.customerName = res.data.customerName;
					this.contact = res.data.contact;
					this.tel = res.data.tel;
					this.fax = res.data.fax;
					this.orgId = res.data.orgId;
					this.bizUserId = Number(res.data.bizUserId);
					this.receivingType = res.data.receivingType;
					this.billMemo = res.data.billMemo;
					this.removeZero = res.data.removeZero;
					this.accountPriceTotal = res.data.totalPrice.accountPrice;
					this.receivableMoney = res.data.totalPrice.accountPrices;
					this.table.lists = res.data.items;
					this.totalPrice = res.data.totalPrice.goodsPrice;
					this.taxalPrice = res.data.totalPrice.tax;
					this.taxtTotalMoney = res.data.totalPrice.moneyWithTax;
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
					goodsCode: '',
					goodsName: "",
					goodsSpec: "",
					goodsCount: 0, //采购数量
					unitName: "",
					goodsPrice: 0, //采购单价
					goodsMoney: 0, //采购总额
					discount: "0.00",
					accountPrice: 0,
					isGiveaway: 0,
					surplusInventory: 0,

					taxRate: 0.17, //税率
					tax: 0, //税金
					moneyWithTax: 0, //价税合计
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
				for(var i = 0; i < this.table.lists.length; i++) {
					if(this.table.lists[i].goodsId == currentRow.id) {
						this.$Message.info("不可选择重复商品")
						return
					}
				}

				this.table.lists[this.tab_key].goodsName = currentRow.name;
				this.table.lists[this.tab_key].goodsSpec = currentRow.spec;
				this.table.lists[this.tab_key].unitName = currentRow.unit_name;
				this.table.lists[this.tab_key].goodsCode = currentRow.code;
				this.table.lists[this.tab_key].goodsId = currentRow.id
				this.table.lists[this.tab_key].memo = currentRow.memo
				this.sale_obj.discount = "0.00"
				this.sale_obj.accountPrice = 0
				this.sale_obj.isGiveaway = 0
				this.sale_obj.surplusInventory = 0
				this.add_orders = false;
			},
			sumTotalPrice(key) {
				this.table.lists[key].goodsMoney =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice);
				/*结算价格*/
				this.table.lists[key].accountPrice =
					parseFloat(this.table.lists[key].goodsMoney) * parseFloat(this.table.lists[key].discount);

				this.table.lists[key].tax =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice) * 0.17;
				this.table.lists[key].moneyWithTax = this.table.lists[key].goodsMoney + this.table.lists[key].tax;
				this.totalPrice = 0, this.taxalPrice = 0, this.taxtTotalMoney = 0, this.accountPriceTotal = 0, this.receivableMoney = 0;
				this.table.lists.forEach((item, index) => {
					if(item.discount == "0.00" || item.discount == "") {
						item.accountPrice = item.goodsMoney
					}
					this.totalPrice += parseFloat(item.goodsMoney);
					if(item.isGiveaway == 1) {
						item.accountPrice = 0
					}
					this.accountPriceTotal += parseFloat(item.accountPrice);
					this.taxalPrice += item.tax;
					this.taxtTotalMoney += item.moneyWithTax;
				})
				this.receivableMoney = this.accountPriceTotal - this.removeZero;
			},
			submitAddOrder() {
				if(this.customerId.trim() == '') {
					this.$Message.info("请选择用户!")
					return;
				}
				if(this.dealDate == '') {
					this.$Message.info("请选择业务时间!")
					return;
				}
				if(this.orgId.trim() == '') {
					this.$Message.info("请选择组织机构!")
					return;
				}
				if(this.bizUserId == '') {
					this.$Message.info("请选择业务员!")
					return;
				}
				if(this.table.lists[0].name == '') {
					this.$Message.info("请选择商品!")
					return;
				}
				var adduser = {}
				var datenow = new Date(this.dealDate)
				this.dealDate = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
				adduser.id = this.$route.params.look_id;
				adduser.removeZero = this.removeZero;
				adduser.dealDate = this.dealDate;
				adduser.customerId = this.customerId;
				adduser.dealAddress = this.dealAddress;
				adduser.contact = this.contact;
				adduser.tel = this.tel;
				adduser.fax = this.fax;
				adduser.orgId = this.orgId;
				adduser.bizUserId = this.bizUserId;
				adduser.receivingType = this.receivingType;
				adduser.billMemo = this.billMemo;
				adduser.items = this.table.lists;
				addSOBill({
					jsonStr: adduser,
					loginUserId: sessionStorage.getItem('ticket'),
				}).then(res => {
					if(res.retcode == 2000) {
						this.$Message.info(res.msg)
						this.$router.push('/x/saleorder')
					} else {
						this.$Message.info(res.msg)
					}
				})
			},
			getReviceableMoney() {
				this.receivableMoney = this.accountPriceTotal - this.removeZero;
			},
			/*获取客户数据*/
			getAllCustomers() {
				allCustomer({
          ticket: sessionStorage.getItem("ticket"),
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
          ticket: sessionStorage.getItem("ticket"),
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
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					res.data.forEach((item, index) => {
						var temp = {}
						temp.value = item.id
						temp.label = item.nickname
						this.alluserslist.push(temp)
					})
				})
			},
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

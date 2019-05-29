<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			编辑销售出库单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">单号</Col>
				<Col span="16">{{outStockSaleObj.odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 业务日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" v-model='outStockSaleObj.bizDT'></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 业务员</Col>
				<Col span="16">
				<Select v-model='outStockSaleObj.bizUserId'>
					<Option v-for="(item,index) in outStockSaleObj.alluserslist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 出库仓库</Col>
				<Col span="16">
				<Select v-model="outStockSaleObj.warehouseId">
					<Option v-for="(item,index) in outStockSaleObj.stock_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 客户</Col>
				<Col span="16">
				<Select v-model="outStockSaleObj.customerId">
					<Option v-for="(item,index) in outStockSaleObj.customerslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">收款方式</Col>
				<Col span="16">
				<Select v-model='outStockSaleObj.receivingType'>
					<Option v-for="(item,index) in outStockSaleObj.paymentlist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="8">
			<Row>
				<Col span="4" style="text-align: center;">送货地址</Col>
				<Col span="20">
				<Input v-model="outStockSaleObj.dealAddress"></Input>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="16">
			<Col span="2" style="text-align: center;">备注</Col>
			<Col span="22">
			<Input v-model="outStockSaleObj.billMemo"></Input>
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
								<th class="" style="width: 220px;">
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
										<span>序列号</span>
									</div>
								</th>
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
										<i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
										<i-button type="ghost" icon="qr-scanner" @click='showSan(key)'>扫码入库</i-button>
									</td>
									<td class="">{{list.goodsCode}}</td>
									<td class="">{{list.goodsName}}</td>
									<td class="">{{list.goodsSpec}}</td>
									<td class="">
										<Input placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.goodsCount'></Input>
									</td>
									<td class="">{{list.unitName}}</td>
									<td class="">
										<Input placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.goodsPrice"></Input>
									</td>
									<td class="">
										{{list.goodsMoney | filterByNumber}}
									</td>
									<td class="">{{list.sn}}</Input>
									</td>
									<!--<td class="">17%</td>
									<td class="">
										{{list.tax|filterByNumber}}
									</td>
									<td class="">
										{{list.moneyWithTax|filterByNumber}}
									</td>-->
									<td class="">
										<Input placeholder="备注" class='modea_input' v-model="list.memo"></Input>
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
										{{outStockSaleObj.totalPrice | filterByNumber}}
									</td>
									<td class=""></td>
									<!--<td class="">
										{{taxalPrice | filterByNumber}}
									</td>
									<td class="">{{taxtTotalMoney| filterByNumber}}</td>-->
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
							<i-table border :columns="outStockSaleObj.goodsTitle" :data="outStockSaleObj.goods_list" height="400" :highlight-row="outStockSaleObj.hrow" @on-row-click="appendTitle"></i-table>
						</Modal>
						<Modal v-model="outStockSaleObj.scanmodal" width="700">
							<p slot="header" style="color:#2D8CF0;text-align:left;font-size:20px;">
								<span>扫描商品码</span>
							</p>
							<div slot="footer">
							</div>
							<input @change='chooseGoods' style="width: 100%;height: 30px;line-height: 30px;border-radius: 5px;border: 1px solid #CCCCCC;" v-model="outStockSaleObj.scancode" type="" name="getfoucs" id="getfoucs" value="" placeholder="请扫描商品码" autofocus />
						</Modal>
					</div>
				</div>
			</div>
		</div>
		<div style="float: right;margin: 30px;">
			<Button type="primary" @click="submitAddOrder">提交</Button>
			<Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
		</div>
	</div>
</template>

<script>
	import { getGoods, allCustomer, getAllOrgs, getAllUsers,getUser, editWSBill, getAllStock, wsBillInfo, getOneGoods, getZsmInfo } from '../../../api/api'
  import util from '../../../common/util.js'
	import objGroup from '../../../common/target.js'
	export default {
		mounted() {
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.outStockSaleObj = util.deepClone(objGroup.saleOrderObj)
      this.table.lists[0] = this.outStockSaleObj.outstock_sale_obj
      var datenow = new Date()
      this.outStockSaleObj.bizDT = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
      this.outStockSaleObj.bizUserId = parseInt(sessionStorage.getItem("user_id"))
			this.getGoodsList();
			this.getAllCustomers();
			this.getAllOrgsinfo();
			this.getAllUsersinfo();
			this.getStockList();
			this.getOutStockData()
		},
		data() {
			return {
				table: {
					lists: []
				},
        outStockSaleObj: {},
				add_orders: false,
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
			//点击扫码入库触发事件
			showSan(key) {
				this.outStockSaleObj.scanmodal = true;
        this.outStockSaleObj.scancode = "";
				this.getFoucs();
				this.outStockSaleObj.tab_key = key
			},
			//获取焦点事件,因dom加载导致方法不能成功生效,第一:用自己写的input,第二:加30毫秒的延迟
			getFoucs() {
				setTimeout(function() {
					document.querySelector('#getfoucs').focus();
				}, 30);
			},
			//点击扫码入库时弹出扫码入库模态框,当输入内容的时候
			chooseGoods() {
        var hell = this.outStockSaleObj.scancode.split('，').length
        if(hell > 1) {
          getZsmInfo({
            ticket: sessionStorage.getItem("ticket"),
            zsm: this.outStockSaleObj.scancode.split('，')[0],
            pzwh: this.outStockSaleObj.scancode.split('，')[2],
          }).then(res => {
            /*console.log(res)*/
            if(res.retcode == "2001") {
              this.$Message.info("没有该商品，请重新扫描!");
              this.outStockSaleObj.scancode = "";
              return;
            }
            if(res.data.length>1){
              this.add_orders = true;
              this.outStockSaleObj.goods_list = res.data;
              this.outStockSaleObj.scanmodal = false;
              return;
            }else if(res.data[0]){
              for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goodsId == res.data[0].id) {
                this.$Message.info("不可选择重复商品");
                this.outStockSaleObj.scancode = '';
                return;
              }
            }
              this.checkData(res.data[0]);
              return
            }
            for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goodsId == res.data.id) {
                this.$Message.info("不可选择重复商品");
                this.outStockSaleObj.scancode = '';
                return;
              }
            }
            this.checkData(res.data);
          })
				} else {
					getOneGoods({
            ticket: sessionStorage.getItem("ticket"),
						bar_code: this.outStockSaleObj.scancode
					}).then(res => {
            if(!res.data){
              this.$Message.info("没有该商品，请重新扫描!")
                this.outStockSaleObj.scancode = ""
                return
            }
						for(var i = 0; i < this.table.lists.length; i++) {
							if(this.table.lists[i].goodsId == res.data.id) {
								this.$Message.info("不可选择重复商品")
								this.outStockSaleObj.scancode = ''
								return
							}
						}
            this.checkData(res.data)
					})
				}
			},
      checkData(obj){
        this.outStockSaleObj.sale_obj.goodsName = obj.name;
        this.outStockSaleObj.sale_obj.goodsSpec = obj.spec;
        this.outStockSaleObj.sale_obj.unitName = obj.unit_name;
        this.outStockSaleObj.sale_obj.goodsCode = obj.code;
        this.outStockSaleObj.sale_obj.goodsId = obj.id
        this.outStockSaleObj.sale_obj.goodsPrice = obj.sale_price
        this.outStockSaleObj.sale_obj.memo = obj.memo
        this.table.lists[this.outStockSaleObj.tab_key] = util.deepClone(this.outStockSaleObj.sale_obj)
        this.outStockSaleObj.tab_key++
        this.outStockSaleObj.scancode = ''
        this.outStockSaleObj.scanmodal = false;
      },
			showProduct(key) {
				this.outStockSaleObj.tab_key = key;
				this.add_orders = true;
        this.getGoodsList();
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
					soBillDetailId: '', //序列号
					sn: '',
					memo: '', //描述
				});
			},
			getGoodsList() {
				getGoods({
					ticket: this.$store.state.ticket,
				}).then(res => {
					this.outStockSaleObj.goods_list = res.data
					var num = 1
					this.outStockSaleObj.goods_list.forEach((item, index) => {
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
				this.table.lists[this.outStockSaleObj.tab_key].goodsName = currentRow.name;
				this.table.lists[this.outStockSaleObj.tab_key].goodsSpec = currentRow.spec;
				this.table.lists[this.outStockSaleObj.tab_key].unitName = currentRow.unit_name;
				this.table.lists[this.outStockSaleObj.tab_key].goodsCode = currentRow.code;
        this.table.lists[this.outStockSaleObj.tab_key].goodsId = currentRow.id
				this.table.lists[this.outStockSaleObj.tab_key].goodsPrice = currentRow.sale_price
				this.table.lists[this.outStockSaleObj.tab_key].memo = currentRow.memo
				this.table.lists[this.outStockSaleObj.tab_key].soBillDetailId = ''
				this.table.lists[this.outStockSaleObj.tab_key].sn = ''
				this.add_orders = false;
			},
			sumTotalPrice(key) {
				this.table.lists[key].goodsMoney =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice);
				this.table.lists[key].tax =
					parseFloat(this.table.lists[key].goodsCount) * parseFloat(this.table.lists[key].goodsPrice) * 0.17;
				this.table.lists[key].moneyWithTax = this.table.lists[key].goodsMoney + this.table.lists[key].tax;
				this.outStockSaleObj.totalPrice = 0, this.outStockSaleObj.taxalPrice = 0, this.outStockSaleObj.taxtTotalMoney = 0;
				this.table.lists.forEach((item, index) => {
					this.outStockSaleObj.totalPrice += parseFloat(item.goodsMoney)
					this.outStockSaleObj.taxalPrice += item.tax;
					this.outStockSaleObj.taxtTotalMoney += item.moneyWithTax;
				})
			},
			submitAddOrder() {
				if(this.outStockSaleObj.customerId.trim() == '') {
					this.$Message.info("请选择用户!")
					return;
				}
				if(this.outStockSaleObj.bizDT == '') {
					this.$Message.info("请选择业务时间!")
					return;
				}
				if(this.outStockSaleObj.warehouseId.trim() == '') {
					this.$Message.info("请选择出库仓库!")
					return;
				}
				if(this.outStockSaleObj.bizUserId == '') {
					this.$Message.info("请选择业务员!")
					return;
				}
				if(this.table.lists[0].name == '') {
					this.$Message.info("请选择商品!")
					return;
				}
        for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goodsCount == "" || this.table.lists[i].goodsCount == 0){
            this.$Message.info("请选择采购数量")
            return
          }
          }
          for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goodsPrice == "" || this.table.lists[i].goodsPrice == 0){
            this.$Message.info("请选择采购单价")
            return
          }
          }
				/*console.log(this.table.lists)*/
				var adduser = {}
				var datenow = new Date(this.outStockSaleObj.bizDT)
				this.outStockSaleObj.bizDT = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
				adduser.id = this.$route.params.edit_out_id;
				adduser.bizDT = this.outStockSaleObj.bizDT;
				adduser.customerId = this.outStockSaleObj.customerId;
				adduser.warehouseId = this.outStockSaleObj.warehouseId;
				adduser.bizUserId = this.outStockSaleObj.bizUserId;
				adduser.receivingType = this.outStockSaleObj.receivingType;
				adduser.billMemo = this.outStockSaleObj.billMemo;
				adduser.dealAddress = this.outStockSaleObj.dealAddress;
				adduser.sobillRef = this.outStockSaleObj.sobillRef;
				adduser.items = this.table.lists;
				editWSBill({
					jsonStr: adduser,
          loginUserId: sessionStorage.getItem('ticket'),
				}).then(res => {
					if(res.retcode == 2000) {
						this.$Message.info(res.msg)
						this.$router.push('/x/saleoutstock')
					} else {
						this.$Message.info(res.msg)
					}

				})
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
						this.outStockSaleObj.customerslist.push(temp)
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
						this.outStockSaleObj.orgslist.push(temp)
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
						this.outStockSaleObj.alluserslist.push(temp)
					})
				})
			},
			//获取仓库列表
			getStockList() {
				getAllStock({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					this.outStockSaleObj.stock_list = res.data;
				})
			},
      /*获取当前编辑出库单的数据*/
			getOutStockData() {
				wsBillInfo({
					id: this.$route.params.edit_out_id,
          ticket: sessionStorage.getItem("ticket"),
				}).then(res => {
					this.outStockSaleObj.odd_number = res.data.ref
					this.outStockSaleObj.bizDT = res.data.bizDT
					this.outStockSaleObj.customerId = res.data.customerId
					this.outStockSaleObj.bizUserId = res.data.bizUserId
					this.outStockSaleObj.warehouseId = res.data.warehouseId
					this.outStockSaleObj.receivingType = res.data.receivingType
					this.outStockSaleObj.dealAddress = res.data.dealAddress
					this.outStockSaleObj.billMemo = res.data.memo
					this.table.lists = res.data.items
					this.outStockSaleObj.totalPrice = parseFloat(res.data.totalMoney)
				})
			}
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

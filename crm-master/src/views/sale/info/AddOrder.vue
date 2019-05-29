<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			新建销售订单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">单号</Col>
				<Col span="16">{{saleOrderObj.odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 销售日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" v-model='params.time'></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 客户</Col>
				<Col span="16">
				<Input v-model="params.name"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">销售地址</Col>
				<Col span="16">
				<Input v-model="params.adress"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">联系人</Col>
				<Col span="18">
				<Input v-model="params.clickMan"></Input>
				</Col>
			</Row>
			</Col>
				<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">商品名</Col>
				<Col span="18">
					<Select v-model='params.goodId'>
					<Option v-for="(item) in data" :label="item.goodName" :value="item.goodId" :key="item.goodName"></Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			
				<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 销售数量</Col>
				<Col span="16">
				<Input v-model="params.number"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">电话</Col>
				<Col span="16">
				<Input v-model="params.tel"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">传真</Col>
				<Col span="16">
				<Input v-model="params.fax"></Input>
				</Col>
			</Row>
			</Col>
		
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;"><span style="color: red;">*</span> 销售员</Col>
				<Col span="16">
				<Input v-model="params.faxe"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">收款方式</Col>
				<Col span="16">
				<Select v-model='saleOrderObj.receivingType'>
					<Option v-for="(item,index) in saleOrderObj.paymentlist" :value="item.value" :key="item.value">{{item.label}}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="16">
			<Col span="2" style="text-align: center;">备注</Col>
			<Col span="22">
			<Input v-model="params.billMemo"></Input>
			</Col>
			</Col>
		</Row>
		<div class="ivu-table-wrapper">
			<div class="ivu-table ivu-table-stripe">
				<div class="ivu-table-header">
	
				</div>
			</div>
		</div>
		<div style="float: right;margin: 30px;">
			<Button type="primary" @click="addParams">提交</Button>
			<Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
		</div>
	</div>
</template>

<script>
	import { getGoods, allCustomer, getAllOrgs, getAllUsers, getUser, addSOBill, getOneGoods, getZsmInfo } from '../../../api/api'
  import util from '../../../common/util'
	import objGroup from '../../../common/target'
	export default {
		mounted() {
     this.$ajax
        .get('/api/GoodInformation/findAllGoods')
				.then(response => (this.data = response.data.data));



			this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.saleOrderObj = util.deepClone(objGroup.saleOrderObj)
			this.saleOrderObj.bizUserId = parseInt(sessionStorage.getItem("user_id"))
			var datenow = new Date()
			this.saleOrderObj.dealDate = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
      this.table.lists[0] = this.saleOrderObj.sale_obj
      this.getGoodsList()
      this.getAllUsersinfo()
      this.getAllOrgsinfo()
      this.getAllCustomers()
		},
		watch: {

		},
		data() {
			return {
      params:{
				goodId:'',
				number:'',
				time:'',
				name:'',
				oddNum:'',
				adress:'',
				clickMan:''		
			},
      data:[],



				table: {
					lists: []
				},
				saleOrderObj: {},
				add_orders: false,
			}
		},
		filters: {
			filterByNumber(value) {
				return isNaN(value) ? '' : value.toFixed(2);
			}
		},
		methods: {
    addParams(){
         this.$ajax
				.get('/api/CustomerSales/insert',{params:this.params});
				this.params={
				goodId:'',
				number:'',
				time:'',
				name:'',
				oddNum:'',
				adress:'',
				clickMan:''		
			}		
			this.$notify({
                  title: "成功",
                  message: "保存数据成功",
                  type: "success",
                  duration: 2000
                });  
		},












			/*获取商品列表*/
      getGoodsList(){
        getGoods({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          this.saleOrderObj.goods_list = res.data
          var num = 1
          this.saleOrderObj.goods_list.forEach((item, index) => {
            item.unmid = num++
          })
        })
      },
       /*获取业务员列表*/
      getAllUsersinfo(){
        getUser({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.nickname
            this.saleOrderObj.alluserslist.push(temp)
          })
        })
      },
      /*获取组织机构列表*/
      getAllOrgsinfo(){
        getAllOrgs({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.saleOrderObj.orgslist.push(temp)
          })
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
            this.saleOrderObj.customerslist.push(temp)
          })
        })
      },
			//点击取消按钮
			escquit() {
				window.history.back()
			},
			//点击扫码入库
			showSan(key) {
				this.saleOrderObj.scanmodal = true;
				this.saleOrderObj.scancode = ""
				this.getFoucs();
				this.saleOrderObj.tab_key = key
			},
			//点击扫码入库时弹出扫码入库模态框
			chooseGoods() {
				var hell = this.saleOrderObj.scancode.split('，').length
				if(hell > 1) {
					getZsmInfo({
						ticket: sessionStorage.getItem("ticket"),
						zsm: this.saleOrderObj.scancode.split('，')[0],
            pzwh: this.saleOrderObj.scancode.split('，')[2],
					}).then(res => {
						/*console.log(res)*/
						if(res.retcode == "2001" || !res.data) {
							this.$Message.info("没有该商品，请重新扫描!");
							this.saleOrderObj.scancode = "";
							return;
						}
						if(res.data.length>1){
							this.add_orders = true;
							this.saleOrderObj.goods_list = res.data;
							this.saleOrderObj.scanmodal = false;
							return;
						}else if(res.data[0]){
              for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goodsId == res.data[0].id) {
                this.$Message.info("不可选择重复商品");
                this.saleOrderObj.scancode = '';
                return;
              }
            }
              this.checkData(res.data[0]);
              return
            }
						for(var i = 0; i < this.table.lists.length; i++) {
							if(this.table.lists[i].goodsId == res.data.id) {
								this.$Message.info("不可选择重复商品");
								this.saleOrderObj.scancode = '';
								return;
							}
						}
						this.checkData(res.data);
					})
				} else {
					getOneGoods({
						ticket: sessionStorage.getItem("ticket"),
						bar_code: this.saleOrderObj.scancode
					}).then(res => {
              if(!res.data) {
                this.$Message.info("没有该商品，请重新扫描!")
                this.saleOrderObj.scancode = ""
                return
              }
              for(var i = 0; i < this.table.lists.length; i++) {
                if(this.table.lists[i].goodsId == res.data.id) {
                  this.$Message.info("不可选择重复商品")
                  this.saleOrderObj.scancode = ''
                  return
                }
              }
						  this.checkData(res.data);
					})
				}
			},
      checkData(obj){
            this.saleOrderObj.sale_obj.name = obj.name;
            this.saleOrderObj.sale_obj.spec = obj.spec;
            this.saleOrderObj.sale_obj.unit_name = obj.unit_name;
            this.saleOrderObj.sale_obj.code = obj.code;
            this.saleOrderObj.sale_obj.goodsId = obj.id
            this.saleOrderObj.sale_obj.goodsPrice = obj.sale_price
            this.saleOrderObj.sale_obj.discount = "0.00"
            this.saleOrderObj.sale_obj.accountPrice = 0
            this.saleOrderObj.sale_obj.isGiveaway = 0
            this.saleOrderObj.sale_obj.surplusInventory = parseInt(obj.goods_balance_count)
            this.saleOrderObj.saleNumList[this.saleOrderObj.tab_key] = util.deepClone(this.saleOrderObj.sale_obj.surplusInventory)
            this.saleOrderObj.sale_obj.memo = obj.memo
            this.table.lists[this.saleOrderObj.tab_key] = util.deepClone(this.saleOrderObj.sale_obj)
            this.saleOrderObj.tab_key++;
            this.saleOrderObj.scancode = '';
            this.saleOrderObj.scanmodal = false;
      },
			//获取焦点事件,因dom加载导致方法不能成功生效,第一:用自己写的input,第二:加30毫秒的延迟
			getFoucs() {
				setTimeout(function() {
					document.querySelector('#getfoucs').focus();
				}, 30);
			},
			showProduct(key) {
				this.saleOrderObj.tab_key = key;
				this.add_orders = true;
				this.getGoodsList()
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
			appendTitle(currentRow) {
				/*console.log(currentRow)*/
				for(var i = 0; i < this.table.lists.length; i++) {
					if(this.table.lists[i].goodsId == currentRow.id) {
						this.$Message.info("不可选择重复商品")
						return
					}
				}
				this.saleOrderObj.sale_obj.name = currentRow.name;
				this.saleOrderObj.sale_obj.spec = currentRow.spec;
				this.saleOrderObj.sale_obj.unit_name = currentRow.unit_name;
				this.saleOrderObj.sale_obj.code = currentRow.code;
        this.saleOrderObj.sale_obj.goodsId = currentRow.id
				this.saleOrderObj.sale_obj.goodsPrice = currentRow.sale_price
				this.saleOrderObj.sale_obj.discount = "0.00"
				this.saleOrderObj.sale_obj.accountPrice = 0
				this.saleOrderObj.sale_obj.isGiveaway = 0
				this.saleOrderObj.sale_obj.surplusInventory = parseInt(currentRow.goods_balance_count)
        this.saleOrderObj.saleNumList[this.saleOrderObj.tab_key] = util.deepClone(this.saleOrderObj.sale_obj.surplusInventory)
				this.saleOrderObj.sale_obj.memo = currentRow.memo
				this.table.lists[this.saleOrderObj.tab_key] = util.deepClone(this.saleOrderObj.sale_obj)
				this.add_orders = false;
			},
			getReviceableMoney() {
				this.saleOrderObj.receivableMoney = this.saleOrderObj.accountPriceTotal - this.saleOrderObj.removeZero;
			},
			//修改销售数量时同步修改剩余库存数
			numberChange(key) {
				//if( this.table.lists[key].goodsCount )saleNumList
      /*console.log(this.saleNumList)*/  //
				this.table.lists[key].surplusInventory = parseInt(this.saleOrderObj.saleNumList[key]) - parseInt(this.table.lists[key].goodsCount);

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
				this.saleOrderObj.totalPrice = 0, this.saleOrderObj.taxalPrice = 0, this.saleOrderObj.taxtTotalMoney = 0, this.saleOrderObj.accountPriceTotal = 0, this.saleOrderObj.receivableMoney = 0;
				this.table.lists.forEach((item, index) => {
					if(item.discount == "0.00" || item.discount == "") {
						item.accountPrice = item.goodsMoney
					}
					this.saleOrderObj.totalPrice += item.goodsMoney;
					if(item.isGiveaway == 1) {
						item.accountPrice = 0
					}

					this.saleOrderObj.accountPriceTotal += item.accountPrice;
					this.saleOrderObj.taxalPrice += item.tax;
					this.saleOrderObj.taxtTotalMoney += item.moneyWithTax;
				})
				this.saleOrderObj.receivableMoney = this.saleOrderObj.accountPriceTotal - this.saleOrderObj.removeZero;
			},
			submitAddOrder() {
				if(this.saleOrderObj.customerId.trim() == '') {
					this.$Message.info("请选择客户!")
					return;
				}
				if(this.saleOrderObj.dealDate == '') {
					this.$Message.info("请选择业务时间!")
					return;
				}
				this.saleOrderObj.orgId = ''
				if(this.saleOrderObj.bizUserId == '') {
					this.$Message.info("请选择销售员!")
					return;
				}
				if(this.table.lists[0].name == '') {
					this.$Message.info("请选择商品!")
					return;
				}
				for(var i = 0; i < this.table.lists.length; i++) {
					if(this.table.lists[i].goodsCount == "" || this.table.lists[i].goodsCount == 0) {
						this.$Message.info("请选择采购数量")
						return
					}
				}
				for(var i = 0; i < this.table.lists.length; i++) {
					if(this.table.lists[i].goodsPrice == "" || this.table.lists[i].goodsPrice == 0) {
						this.$Message.info("请选择采购单价")
						return
					}
				}
				var adduser = {}
				var datenow = new Date(this.saleOrderObj.dealDate)
				this.saleOrderObj.dealDate = datenow.getFullYear() + '-' + (datenow.getMonth() + 1) + '-' + datenow.getDate()
				adduser.id = '';
				adduser.removeZero = this.saleOrderObj.removeZero;
				adduser.dealDate = this.saleOrderObj.dealDate;
				adduser.customerId = this.saleOrderObj.customerId;
				adduser.dealAddress = this.saleOrderObj.dealAddress;
				adduser.contact = this.saleOrderObj.contact;
				adduser.tel = this.saleOrderObj.tel;
				adduser.fax = this.saleOrderObj.fax;
				adduser.orgId = this.saleOrderObj.orgId;
				adduser.bizUserId = this.saleOrderObj.bizUserId;
				adduser.receivingType = this.saleOrderObj.receivingType;
				adduser.billMemo = this.saleOrderObj.billMemo;
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

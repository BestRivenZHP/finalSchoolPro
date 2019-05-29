<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="4">
			<Row>
				<Col span="6" class="from-text">状态</Col>
				<Col span="18">
				<Select v-model="billStatus">
					<Option v-for="(item,index) in status_list" :value="item.code" :key="item.code">{{ item.value }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">单号</Col>
				<Col span="18">
				<Input v-model="ref"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">业务日期(起)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model='fromDT' :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">业务日期(止)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model='toDT' :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" class="from-text">客户</Col>
				<Col span="18">
				<Select v-model="customerId">
					<Option v-for="(item,index) in user_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row>
			<Col span="4">
			<Row>
				<Col span="6" class="from-text">仓库</Col>
				<Col span="18">
				<Select v-model="warehouseId">
					<Option v-for="(item,index) in stock_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">收款方式</Col>
				<Col span="18">
				<Select v-model="receivingType">
					<Option v-for="(item,index) in money_list" :value="item.code" :key="item.code">{{ item.value }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="2" style="text-align: center;margin-left:30px;">
			<Button type="primary" @click="search">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="replay">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			订单详情
			<Button type="primary" style="margin-left:50px;" @click="addOutstock">新建销售出库单</Button>
			<Button type="primary" id="look" style="margin-left:20px;" @click="lookOutstock">查看</Button>
			<Button type="primary" id="edit" style="margin-left:20px;" @click="editOutstock">编辑</Button>
			<Button type="primary" id="delect" style="margin-left:20px;" @click="delectOrder">删除</Button>
			<Button type="primary" id="commit" style="margin-left:20px;" @click="commitOutstock">提交出库</Button>
		</div>
		<Table :columns="columns5" @on-row-click='rowClick' :row-class-name="rowClassName" :data="out_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
		<Modal v-model="del_modal" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>您确认删除此销售出库订单吗?</span>
			</p>
			<p>您正在执行删除操作!</p>
			<div slot="footer">
				<Button type="primary" @click="delTrue">确认</Button>
				<Button type="primary" @click="delFalse">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { wsbillList, deleteWSBill, wsSelect, getWarehouse,commitWSBill } from '../../api/api'
	export default {
		data() {
			return {
				options: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
				columns5: [{
						title: '序号',
						width: 60,
						align: "center",
						key: 'numid',
					},
					{
						title: '状态',
						width: 130,
						align: "center",
						key: 'bill_status'
					},
					{
						title: '单号',
						width: 130,
						align: "center",
						key: 'ref'
					}, {
						title: '业务日期',
						width: 180,
						align: "center",
						key: 'date_created'
					}, {
						title: '客户',
						width: 100,
						align: "center",
						key: 'customer_name'
					},
					{
						title: '送货地址',
						width: 130,
						key: 'deal_address',
						align: "center",
					},
					{
						title: '收款方式',
						width: 100,
						align: "center",
						key: 'receiving_type'
					},
					{
						title: '销售金额',
						width: 100,
						align: "center",
						key: 'sale_money'
					}, {
						title: '出库仓库',
						width: 120,
						align: "center",
						key: 'warehouse_name'
					}, {
						title: '业务员',
						width: 100,
						align: "center",
						key: 'input_user_name'
					}, {
						title: '制单人',
						width: 110,
						align: "center",
						key: 'biz_user_name'
					}, {
						title: '制单时间',
						width: 180,
						align: "center",
						key: 'bizdt'
					}, {
						title: '备注',
						width: 180,
						align: "center",
						key: 'memo'
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						width: 105,
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
											this.$router.push('/x/out-stock-info/' + params.row.id + '/' + params.row.ref + '/' + params.row.customer_name + '/' + params.row.warehouse_name)
										}
									}
								}, '查看详情'),
							]);
						}
					}
				],
				out_list: [],
				pageSize: 20,
				dataCount: 0,
				curr_row_data: {},
				eidit: false,
				curr_index: '',
				del_modal: false,
				billStatus: '', //绑定状态值
				ref: '', //单号
				fromDT: '', //业务开始时间
				toDT: '', //业务截止时间
				warehouseId: '', //仓库
				customerId: '', //客户
				receivingType: '', //支付方式

				status_list: [], //状态列表
				user_list: [], //客户列表
				stock_list: [], //仓库列表
				money_list: [], //付款方式
			}
		},
		methods: {
			//提交出库
			commitOutstock(){
        if(!this.out_list.length){
          this.$Message.info('表格中没有订单可以提交出库')
          return
        }
				if(this.curr_row_data.id == undefined) {
					this.$Message.info('请选择想要提交出库的订单!')
					return
				}
				commitWSBill({
					id:this.curr_row_data.id,
					loginUserId:sessionStorage.getItem('ticket')
				}).then(res=>{
					this.$Message.info(res.msg)
          if(res.retcode == "2000"){
          this.curr_row_data.bill_status = "已出库"
          this.buttonStatus()
          }
				})
			},
			//编辑销售入库单
			editOutstock() {
        if(!this.out_list.length){
          this.$Message.info('表格中没有订单可以编辑')
          return
        }
				if(this.curr_row_data.id == undefined) {
					this.$Message.info('请选择需要编辑的销售出库单!')
					return
				}
				this.$router.push('/x/edit-outstock/' + this.curr_row_data.id)
			},
			lookOutstock() {
        if(!this.out_list.length){
          this.$Message.info('表格中没有订单可以查看')
          return
        }
				if(this.curr_row_data.id == undefined) {
					this.$Message.info('请选择想要查看的销售出库单!')
					return
				}
				this.$router.push('/x/look-outstock/' + this.curr_row_data.id)
			},
			//重置方法
			replay() {
				this.billStatus = ''
				this.ref = ''
				this.fromDT = ''
				this.toDT = ''
				this.warehouseId = ''
				this.customerId = ''
				this.receivingType = ''
			},
			//查询方法
			search() {
        if(!this.fromDT == "NaN-NaN-NaN" || !this.toDT == "NaN-NaN-NaN" || !this.toDT == "" || !this.fromDT == ""){
          if(this.fromDT == "NaN-NaN-NaN" || this.fromDT == ""){
            this.$Message.info("请输入销售开始日期")
            return
          }else if(this.toDT == "NaN-NaN-NaN" || this.toDT == ""){
            this.$Message.info("请输入销售结束日期")
            return
          }
        var start = new Date(this.fromDT)
        var month1 = (start.getMonth() + 1)>=10?(start.getMonth() + 1):'0'+(start.getMonth() + 1)
        var day1 = start.getDate()>=10?start.getDate():'0'+start.getDate()
        this.fromDT = start.getFullYear() + '-' + month1 + '-' + day1
        var end = new Date(this.toDT)
        var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):'0'+(end.getMonth() + 1)
        var day2 = end.getDate()>=10?end.getDate():'0'+end.getDate()
        this.toDT = end.getFullYear() + '-' + month2 + '-' + day2
        if(this.fromDT == 'NaN-NaN-NaN'){
          this.fromDT = ''
        }
        if(this.toDT == 'NaN-NaN-NaN'){
          this.toDT = ''
        }
        }
				this.out_list = []
				wsbillList({
					/*loginUserId: sessionStorage.getItem('ticket'),*/
					loginUserId: sessionStorage.getItem('ticket'),
					billStatus: this.billStatus,
					ref: this.ref,
					fromDT: this.fromDT,
					toDT: this.toDT,
					warehouseId: this.warehouseId,
					customerId: this.customerId,
					receivingType: this.receivingType,
					limit: this.pageSize
				}).then(res => {
					this.out_list = res.data.ress
					this.dataCount = res.data.total
					var num = 1
					this.out_list.forEach((item, index) => {
						item.numid = num++
							if(item.bill_status == 1000) {
								item.bill_status = '已出库'
							} else {
								item.bill_status = '待出库'
							}
						if(item.receiving_type == 0) {
							item.receiving_type = '记应收账款'
						} else {
							item.receiving_type = '现金收款'
						}
					})
				})
			},
			delTrue() {
				deleteWSBill({
          loginUserId: sessionStorage.getItem('ticket'),
					id: this.curr_row_data.id
				}).then(res => {
					this.$Message.info(res.msg)
					this.getOutStock();
					this.del_modal = false
          this.curr_row_data.id = ""
				})
			},
			delFalse() {
				this.del_modal = false
			},
			//删除销售出库订单
			delectOrder() {
        if(!this.out_list.length){
          this.$Message.info('表格中没有订单可以删除')
          return
        }
				if(this.curr_row_data.id == undefined  || this.curr_row_data.id == "") {
					this.$Message.info('请选择想要删除的订单!')
					return
				}
				this.del_modal = true
			},
			addOutstock() {
				this.$router.push('/x/add-outstock')
			},
			//获取销售出库列表数据
			getOutStock() {
				wsbillList({
					loginUserId: sessionStorage.getItem('ticket'),
					page: 1,
					limit: this.pageSize
				}).then(res => {
					this.out_list = res.data.ress
					this.dataCount = res.data.total
					var num = 1
					this.out_list.forEach((item, index) => {
						item.numid = num++
							if(item.bill_status == 1000) {
								item.bill_status = '已出库'
							} else {
								item.bill_status = '待出库'
							}
						if(item.receiving_type == 0) {
							item.receiving_type = '记应收账款'
						} else {
							item.receiving_type = '现金收款'
						}
					})
				})
			},
			rowClick(currentRow, index) {
				this.curr_row_data = currentRow
				this.eidit = true
				this.curr_index = index
				if(this.curr_row_data.bill_status == '待出库') {
					document.getElementById('look').disabled = true
					document.getElementById('edit').disabled = false
					document.getElementById('commit').disabled = false
					document.getElementById('delect').disabled = false
				} else {
					document.getElementById('look').disabled = false
					document.getElementById('edit').disabled = true
					document.getElementById('commit').disabled = true
					document.getElementById('delect').disabled = true
				}
			},
      buttonStatus(){
        if(this.curr_row_data.bill_status == '待出库') {
          document.getElementById('look').disabled = true
          document.getElementById('edit').disabled = false
          document.getElementById('commit').disabled = false
          document.getElementById('delect').disabled = false
        } else {
          document.getElementById('look').disabled = false
          document.getElementById('edit').disabled = true
          document.getElementById('commit').disabled = true
          document.getElementById('delect').disabled = true
        }
      },
			rowClassName(row, index) {
				if(index == this.curr_index && this.eidit == true) {
					return 'demo-row-red';
				}
				return '';
			},
			changepage(index) {
				this.out_list = []
				wsbillList({
					loginUserId: sessionStorage.getItem('ticket'),
					page: index,
					limit: this.pageSize
				}).then(res => {
					this.out_list = res.data.ress
					this.dataCount = res.data.total
					var num = 1
					this.out_list.forEach((item, index) => {
						item.numid = num++
							if(item.bill_status == 1000) {
								item.bill_status = '已出库'
							} else {
								item.bill_status = '待出库'
							}
						if(item.receiving_type == 0) {
							item.receiving_type = '现金收账'
						} else {
							item.receiving_type = '记应收账款'
						}
					})
				})
			},
		},
		mounted() {
			this.getOutStock();
			wsSelect({
        loginUserId: sessionStorage.getItem('ticket'),
      }).then(res => {
				this.status_list = res.data.status_bill
				this.user_list = res.data.user_name
        /*this.money_list = res.data.receiving_type*/
				this.money_list.push(res.data.receiving_type[0])
			})
			this.$store.state.ticket = sessionStorage.getItem("ticket")
			getWarehouse({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.stock_list = res.data
			})
		}
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
  } */

	.ivu-table .demo-row-red td {
		background-color: rgb(235, 247, 255);
	}
</style>

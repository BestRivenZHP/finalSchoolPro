<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">

			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">单号</Col>
				<Col span="18">
				<Input v-model="serchKind.oddNum"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">销售日期(起)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model='serchKind.time'></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">销售日期(止)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model='toDT'></DatePicker>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">客户</Col>
				<Col span="18">
			<Input v-model="serchKind.name"></Input>
				</Col>
			</Row>
			</Col>
			
			<Col span="2" style="text-align: center;margin-left:30px;">
			<Button type="primary" @click="searchClickOn">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="replayOn">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			订单详情
			<Button type="primary" style="margin-left:50px;" @click="addOrder">新建销售订单</Button>
			
		</div>



	<div class="main-style">
    <el-table
      :data="msg"
      style="width: 100%">
			 <el-table-column
        prop="bb"
        label="单号"
        >
				<template slot-scope="scope">{{ scope.row.oddNum }}</template>
      </el-table-column>

       <el-table-column
        label="商家"
        >
			<template slot-scope="scope">{{ scope.row.name }}</template>

       </el-table-column>
      <el-table-column
        prop="bb"
        label="商品名"
        >
				<template slot-scope="scope">{{ scope.row.goodInformation.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="cc"
        label="商品价格">
				<template slot-scope="scope">{{ scope.row.goodInformation.priceGoods }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="销售数量">
					<template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="订单时间">
				<template slot-scope="scope">{{ scope.row.time | FormatDate('yyyy-MM-dd-HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column label="操作" width="140" class="tablecolumn">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onUpdateBtnClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="onDeleteBtnClick(scope.row.customerSalesId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="fenye">
    <el-pagination
     background
     :current-page="this.data.pageNum"
     :page-sizes="this.pageSizes"
     :page-size="this.data.pageSize"
     :total="this.data.total"
     layout="total, sizes, prev, pager, next"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
    >
    </el-pagination>
    </div>





		<Modal v-model="del_modal" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>您确认删除此销售订单吗?</span>
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
	import { sobillList, getSoSelect, deleteSOBill, commitSOBill, cancelConfirmSOBill, addSOBill } from '../../api/api'
	export default {
		inject:['reload'],

    mounted(){
			 
    this.$ajax
        .get('/api/CustomerSales/findAllCustomerSalesWithPage?pageNum=1&pageSize=2')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data));
		 },

		data() {
			return {
			data:[],
      pageSizes:[2,5,10],
      msg:[],
      params:{pageNum : '',pageSize : '',searchKey:''},
      serchKind:{oddNum:null,name:null,time:null},





        options: {
                   disabledDate (date) {
                       return date && date.valueOf() > Date.now();
                   }
               },
				model1: '',
				value: "",
				cityList: "",
				curr_row_data: {}, //当前行的数据
				curr_index: '', //当前行索引
				curr_str: '', //点击操作跳到下一页时传的字符串
				state_list: [], //状态列表
				user_list: [], //用户列表
				pay_list: [], //支付方式
				bill_status: '', //绑定状态
				ref: '', //单号
				fromDT: '', //开始时间
				toDT: '', //结束时间
				customerId: '', //客户id
				receivingType: '', //支付方式
				eidit: false,
				del_modal: false, //删除的弹窗
				curr_delectid: '', //当前点击删除行的id
				columns5: [{
						title: '序号',
						key: 'numid',
            align: "center",
					},
					{
						title: '状态',
						key: 'bill_status',
            align: "center",
					},
					{
						title: '销售订单号',
            align: "center",
						key: 'ref'
					}, {
						title: '销售日期',
            align: "center",
						key: 'deal_date'
					},
				/*	{
						title: '销售地址',
						width: 120,
            align: "center",
						key: 'deal_address',
					},*/
					{
						title: '客户',
            align: "center",
						key: 'customer_name',
					},
          /*{
            title: '发货仓库',
            align: "center",
            key: ''
          },*/
          {
            title: '总金额',
            align: "center",
            key: 'goods_money'
          },
					/*{
						title: '客户联系人',
						width: 120,
            align: "center",
						key: 'contact'
					},
					{
						title: '客户电话',
						width: 110,
            align: "center",
						key: 'tel'
					},
					{
						title: '客户传真',
						width: 110,
            align: "center",
						key: 'fax'
					}, *//*{
						title: '税金',
						width: 110,
            align: "center",
						key: 'tax'
					}, {
						title: '价税合计',
						width: 110,
            align: "center",
						key: 'money_with_tax'
					},*/ {
						title: '收款方式',
            align: "center",
						key: 'receiving_type'
					}, {
						title: '销售员',
            align: "center",
						key: 'biz_user_name'
					},/* {
						title: '组织机构',
						width: 110,
						ellipsis: true,
            align: "center",
						key: 'org_name'
					},*//* {
						title: '制单人',
						width: 100,
            align: "center",
						key: 'input_user_name'
					}, {
						title: '制单时间',
						width: 110,
            align: "center",
						key: 'date_created'
					}, {
						title: '审核人',
						width: 100,
            align: "center",
						key: 'confirm_user_id'
					}, {
						title: '审核时间',
						width: 110,
            align: "center",
						key: 'confirm_date'
					}, */{
						title: '备注',
            align: "center",
						key: 'bill_memo'
					},
					{
						title: '操作',
						key: 'action',
						width: 110,
						fixed: 'right',
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
											this.$router.push('/x/order-user-info/' + params.row.id + '/' + params.row.ref + '/' + params.row.customer_name + '/' + params.row.receiving_type + '/' + params.row.biz_user_name + '/' + params.row.deal_date)
										}
									}
								}, '订单详情'),
								/*h('Button', {
									props: {
										type: 'primary',
										size: 'default'
									},
									style: {
										marginRight: '8px'
									},
									on: {
										click: () => {
											this.$router.push('/x/order-order-info/' + params.row.id)
										}
									}
								}, '出库详情'),*/
							]);
						}
					}
				],
				saleList: [],
				pageSize: 20,
				dataCount: 0,
				saleList: [],
				statusList:[],
			}
		},
		methods: {
			searchClickOn(){
        this.$ajax
        .get('/api/CustomerSales/findAllCustomerSalesWithPage?pageNum=1&pageSize=2',{params:this.serchKind})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data));
			
			},
			replayOn(){
				this.serchKind={oddNum:null,name:null,time:null}
			},
			  onRefreshBtnClick() {
     this.reload();
    },

			onDeleteBtnClick(val){

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax
          .get('/api/CustomerSales/delete',{params : {customerSalesId:val}});
        this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage?pageNum=1&pageSize=2&goodKind=1')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           
           this.onRefreshBtnClick();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
           },

   handleSizeChange(val) {
        this.params.pageNum = this.data.pageNum;
        this.params.pageSize = val;
        this.$ajax
        .get('/api/CustomerSales/findAllCustomerSalesWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
    },

     handleCurrentChange(val) {
       this.params.pageNum = val;
        this.params.pageSize = this.data.pageSize;
      this.$ajax
        .get('/api/CustomerSales/findAllCustomerSalesWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
        },












      /*跳转打印页面*/
      printSOBill(){
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以打印')
          return;
        }
        if(this.curr_row_data.id == undefined  || this.curr_row_data.id == "") {
          this.$Message.info('请选择您想要打印的销售订单!')
          return;
        }
        this.$router.push('/x/add-order-print/'+this.curr_row_data.id)
      },
			//重置按钮
			replay() {
				this.bill_status = ''
				this.ref = ''
				this.fromDT = ''
				this.toDT = ''
				this.customerId = ''
				this.receivingType = ''
			},
			//点击删除按钮时
			delectSOBill(){
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以删除')
          return;
        }
				if(this.curr_row_data.id==undefined  || this.curr_row_data.id == ""){
					this.$Message.info('请选择您删除的销售订单!')
					return;
				}
				this.del_modal = true
			},
			//点击查看按钮
			lookOrder(){
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以查看')
          return;
        }
				if(this.curr_row_data.id==undefined  || this.curr_row_data.id == ""){
					this.$Message.info('请选择您需要查看的销售订单!')
					return;
				}
				this.$router.push('/x/look-order/'+this.curr_row_data.id)
			},
			//点击编辑按钮
			editOrder(){
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以编辑')
          return;
        }
				if(this.curr_row_data.id == undefined || this.curr_row_data.id == ""){
					this.$Message.info('请选择您需要编辑的销售订单!')
					return;
				}
				this.$router.push('/x/edit-order/'+this.curr_row_data.id)
			},
			//审核指定订单
			commitSOBill() {
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以审核')
          return;
        }
				if(this.curr_row_data.id == undefined || this.curr_row_data.id == "") {
					this.$Message.info('请先选择需要审核的销售订单!');
					return;
				} else {
					commitSOBill({
						id: this.curr_row_data.id,
						loginUserId: sessionStorage.getItem('ticket')
					}).then(res => {
						this.$Message.info(res.msg);
						this.getSaleList();
            if(res.retcode == "2000"){
              this.curr_row_data.bill_status = '已审核'
            this.buttonStatus()
            }
					})
				}
			},
			//取消审核指定订单
			cancelConfirmSOBill() {
        if(!this.saleList.length){
          this.$Message.info('表格中没有订单可以取消审核')
          return;
        }
				if(this.curr_row_data.id == undefined || this.curr_row_data.id == "") {
					this.$Message.info('请先选择需要取消审核的销售订单!');
					return;
				} else {
					cancelConfirmSOBill({
						id: this.curr_row_data.id,
						loginUserId: sessionStorage.getItem('ticket')
					}).then(res => {
						this.$Message.info(res.msg);
						this.getSaleList();
            if(res.retcode == "2000"){
              this.curr_row_data.bill_status = '待审核'
            this.buttonStatus()
            }
					})
				}
			},
			//查询指定订单
			searchClick() {
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
				this.saleList = []
				sobillList({
					loginUserId: sessionStorage.getItem('ticket'),
					bill_status: this.bill_status,
					ref: this.ref,
					fromDT: this.fromDT,
					toDT: this.toDT,
					customerId: this.customerId,
					receivingType: this.receivingType,
					limit: this.pageSize,
					page: 1
				}).then(res => {
					this.dataCount = res.data.total
					this.saleList = res.data.ress
					var num = 1
					this.saleList.forEach((item, Index) => {
						item.numid = num++
					})
				})
			},
			changepage(index) {
				this.saleList = []
				sobillList({
					loginUserId: sessionStorage.getItem('ticket'),
					bill_status: this.bill_status,
					ref: this.ref,
					fromDT: this.fromDT,
					toDT: this.toDT,
					customerId: this.customerId,
					receivingType: this.receivingType,
					page: index,
					limit: this.pageSize
				}).then(res => {
					this.saleList = res.data.ress
					this.dataCount = res.data.total
					var num = 1
					this.saleList.forEach((item, Index) => {
						item.numid = num++
					})
				})
			},
			addOrder() {
				this.curr_str = 'add'
				this.$router.push('/x/add-order')
			},
			rowClick(currentRow, index) {
				this.curr_row_data = currentRow
				this.eidit = true
				this.curr_index = index
				if(this.curr_row_data.bill_status == '待审核') {
					document.getElementById('look_order').disabled = true
					document.getElementById('edit_order').disabled = false
					document.getElementById('revi_order').disabled = false
					document.getElementById('cancle_order').disabled = true
					document.getElementById('delect_order').disabled = false
//					document.getElementById('buile_order').disabled = true
				} else {
					document.getElementById('look_order').disabled = false
					document.getElementById('edit_order').disabled = true
					document.getElementById('revi_order').disabled = true
					document.getElementById('delect_order').disabled = true
					document.getElementById('cancle_order').disabled = false
//					document.getElementById('buile_order').disabled = false
				}
			},
      buttonStatus(){
        if(this.curr_row_data.bill_status == '待审核') {
          document.getElementById('look_order').disabled = true
          document.getElementById('edit_order').disabled = false
          document.getElementById('revi_order').disabled = false
          document.getElementById('cancle_order').disabled = true
          document.getElementById('delect_order').disabled = false
//          document.getElementById('buile_order').disabled = true
        } else {
          document.getElementById('look_order').disabled = false
          document.getElementById('edit_order').disabled = true
          document.getElementById('revi_order').disabled = true
          document.getElementById('delect_order').disabled = true
          document.getElementById('cancle_order').disabled = false
//          document.getElementById('buile_order').disabled = false
        }
      },
			getSaleList() {
				sobillList({
					loginUserId: sessionStorage.getItem('ticket'),
					page: 1,
					limit: this.pageSize
				}).then(res => {
					/*console.log(res)*/
					this.saleList = res.data.ress
					this.dataCount = res.data.total
					var num = 1
					this.saleList.forEach((item, Index) => {
						item.numid = num++
					})
				})
			},
			rowClassName(row, index) {
				if(index == this.curr_index && this.eidit == true) {
					return 'demo-row-red';
				}
				return '';
			},
			getSelectList() {
				getSoSelect({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					this.state_list = res.data.status_bil
					this.user_list = res.data.customers
          /*this.pay_list = res.data.receiving_type*/
					this.pay_list.push(res.data.receiving_type[0])
				})
			},
			delTrue() {
				deleteSOBill({
          ticket: sessionStorage.getItem("ticket"),
					id: this.curr_row_data.id
				}).then(res => {
					this.$Message.info(res.msg);
					this.del_modal=false
					this.getSaleList();
          this.curr_row_data.id = ""
				})
			},
			delFalse() {
				this.del_modal = false
			}
		}
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
  } */

	 .ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
  .demo-ruleForm{

}
 .fenye{
   padding-left: 30%;
 }
 
 .main-style{
   padding: 10px;
    padding-left: 20px;
 }

 .page-container {
    min-height: calc(100vh - 64px);
    background-color: white;
}

.page-title {
    padding: 10px 10px 5px 15px;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.page-top-toolbar {
    padding: 4px 0;
    
}

.filter-container{
 float: right;
}


.filter-item{

}
.page-btns{

padding: 10px;
}

    
        .filter-item {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 10px;     
    
}

.panel-title-text {
    padding: 10px 10px 5px 15px;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.el-range-editor--mini .el-range-separator {
    line-height: 15px;
    font-size: 12px;
}

.table-search-total-bar {
    margin: 8px 0;
    .sel-condition {
        border: 1px solid #3d9ee9;
        padding: 0 5px;
        margin-right: 10px;
        padding: 3px;
        span {
            text-decoration: none;
            color: #3d9ee9;
            font-size: 13px;
        }
        i {
            margin-left: 5px;
        }
    }
    button {
        padding: 3px 10px;
    }
}

.datagrid-pagination {
    float: right;
    margin-top: 10px
}

.dg-cell-enable-flag-T {
    color: #7c7cda;
}

.dg-cell-enable-flag-F {
    color: #b3b3b3;
}

	.ivu-table .demo-row-red td {
		background-color: rgb(235, 247, 255);
	}
</style>

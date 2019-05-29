<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">单号</Col>
				<Col span="18">
				<Input v-model="serchKind.oddNum"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">采购日期(起)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model="serchKind.times" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">采购日期(止)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" v-model="serchKind.time" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">付款方式</Col>
				<Col span="18">
				<Select v-model="paymenttypevalue">
					<Option v-for="item in paymenttypelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="search" id="searchBtn">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="reset">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			订单详情
      <Button type="primary" style="margin-left:50px;" @click="addOrder">新建采购订单</Button>
     
     <!--  <Button type="primary" style="margin-left:30px;" id="closeOrder" @click="closeOrders">关闭采购订单</Button>
     <Button type="primary" style="margin-left:30px;" id="closeOrderesc" @click="EscCloseOrder">取消采购订单关闭状态</Button> -->
		</div>



<div class="main-style">
    		<el-table
      :data="msg"
      style="width: 100%">
       <el-table-column
        prop="bb"
        label="订单号"
        >
				<template slot-scope="scope">{{ scope.row.oddNum }}</template>
      </el-table-column>
      <el-table-column
        prop="bb"
        label="商品名"
        >
				<template slot-scope="scope">{{ scope.row.g.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="cc"
        label="入库价格">
				<template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
			  <el-table-column
        prop="cc"
        label="入库数量">
				<template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="入库总额">
					<template slot-scope="scope">{{ scope.row.allCommodityInventory }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="入库时间">
				<template slot-scope="scope">{{ scope.row.time | FormatDate('yyyy-MM-dd-HH:mm:ss') }}</template>
      </el-table-column>
					 <el-table-column
        prop="cc"
        label="备注">
				<template slot-scope="scope">{{ scope.row.col  }}</template>
      </el-table-column>	
       <el-table-column label="操作" width="140" class="tablecolumn">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onUpdateBtnClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
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
        <span>您确认删除此采购订单吗?</span>
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
  import { getPurchaseOrderList,getAllSupplier,deletePurchaseOrder,closePurchaseOrder,closeESCPurchaseOrder,checkESCPurchaseOrder,checkPurchaseOrder } from '../../api/api'
	export default {


    inject:['reload'],

    mounted(){
			 
    this.$ajax
        .get('/api/CommodityInventory/findCommodityInventoryWithPage?pageNum=1&pageSize=2')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data));
		 },






		methods:{
      search(){
         this.$ajax
        .get('/api/CommodityInventory/findCommodityInventoryWithPage?pageNum=1&pageSize=2',{params:this.serchKind})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data));
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
          .get('/api/CommodityInventory/delete',{params : {id:val}});
        this.$ajax
        .get('/api/CommodityInventory/findCommodityInventoryWithPage?pageNum=1&pageSize=2&goodKind=1')
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
        .get('/api/CommodityInventory/findCommodityInventoryWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
    },

     handleCurrentChange(val) {
       this.params.pageNum = val;
        this.params.pageSize = this.data.pageSize;
      this.$ajax
        .get('/api/CommodityInventory/findCommodityInventoryWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
        },









      /*关闭采购订单*/
      closeOrders(){
         if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要关闭的订单")
          return
        }
        closePurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('订单关闭成功')
            this.getPurchaseOrderListinfo()
            this.buttonStatus()
          }
        })
      },
      /*取消采购订单关闭状态*/
      EscCloseOrder(){
         if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要取消关闭的订单")
          return
        }
        closeESCPurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('取消订单关闭状态成功')
            this.getPurchaseOrderListinfo()
            this.buttonStatus()
          }
        })
      },
      /*审核*/
      CheckOrder(){
         if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要审核的订单")
          return
        }
        checkPurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('审核成功')
            this.getPurchaseOrderListinfo()
            this.currentTableObj.orderstatus = "已审核"
            this.buttonStatus()
          }
        })
      },
      /*取消审核*/
      EscCheckOrder(){
        if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要取消审核的订单")
          return
        }
        checkESCPurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('取消审核成功')
            this.currentTableObj.orderstatus = "待审核"
            this.getPurchaseOrderListinfo()
            this.buttonStatus()
          }
        })
      },
      /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        this.currentTableObj = currentRow
        this.CurrenTableindex = index
        if(currentRow.orderstatus == "待审核"){
          document.getElementById('edit').disabled = false
          document.getElementById('del').disabled = false
          document.getElementById('check').disabled = false
          document.getElementById('checkesc').disabled = true
          document.getElementById('getstockorder').disabled = true
          /*document.getElementById('closeOrder').disabled = true
          document.getElementById('closeOrderesc').disabled = true*/
        }else{
          document.getElementById('edit').disabled = true
          document.getElementById('del').disabled = true
          document.getElementById('check').disabled = true
          document.getElementById('checkesc').disabled = false
          document.getElementById('getstockorder').disabled = false
          /*document.getElementById('closeOrder').disabled = false
          document.getElementById('closeOrderesc').disabled = false*/
        }
      },
      /*获取按钮状态*/
      buttonStatus(){
        if(this.currentTableObj.orderstatus == "待审核"){
          document.getElementById('edit').disabled = false
          document.getElementById('del').disabled = false
          document.getElementById('check').disabled = false
          document.getElementById('checkesc').disabled = true
          document.getElementById('getstockorder').disabled = true
          /*document.getElementById('closeOrder').disabled = true
          document.getElementById('closeOrderesc').disabled = true*/
        }else{
          document.getElementById('edit').disabled = true
          document.getElementById('del').disabled = true
          document.getElementById('check').disabled = true
          document.getElementById('checkesc').disabled = false
          document.getElementById('getstockorder').disabled = false
          /*document.getElementById('closeOrder').disabled = false
          document.getElementById('closeOrderesc').disabled = false*/
        }
      },
      /*为当前选中行添加样式*/
      rowClassName (row, index) {
          if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';
      },
      /*删除确认操作*/
      delTrue(){
        this.deletePurchaseOrders()
      },
      /*删除取消操作*/
      delFalse(){
        this.del_modal = false
      },
      /*新建采购订单操作*/
			addOrder(){
        this.$router.push('/d/add-purchase-order')
      },
      /*生成采购入库单*/
      getPurchaseOrder(){
        if(!this.purchaseorderdata.length){
          this.$Message.info("表格中没有订单可以生成采购入库")
          return
        }
        if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要生成采购入库的订单")
          return
        }
        this.$router.push('/d/getPurchaseOrder/'+this.currentTableObj.ref)
      },
      /*编辑采购入库单*/
      editOrder(){
        if(!this.purchaseorderdata.length){
          this.$Message.info("表格中没有订单可以编辑")
          return
        }
        if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要编辑的订单")
          return
        }
				this.$router.push('/d/edit-purchase-order/'+this.currentTableObj.ref)
			},
      /*判断采购订单状态*/
      getOrderStatus(obj){
        if(obj.bill_status == 0){
          obj['orderstatus'] = '待审核'
        }else if(obj.bill_status == 1000){
          obj['orderstatus'] = '已审核'
        }else if(obj.bill_status == 1001){
          obj['orderstatus'] = '订单取消'
        }else if(obj.bill_status == 2000){
          obj['orderstatus'] = '部分入库'
        }else if(obj.bill_status == 4001){
          obj['orderstatus'] = '部分入库-订单关闭'
        }else if(obj.bill_status == 3000){
          obj['orderstatus'] = '全部入库'
        }else if(obj.bill_status == 4002){
          obj['orderstatus'] = '全部入库-订单关闭'
        }else if(obj.bill_status == 4000){
          obj['orderstatus'] = '订单关闭'
        }
      },
      /*分页*/
      changepage(index){
        this.purchaseorderdata = []
        if(this.orderstatusvalue == '500'){
          this.orderstatusvalue = ''
        }
        this.hello_curr = 1
        if(this.ref == '' || this.ref == null){
          this.ref = ''
        }
        if(this.bill_status == '' || this.bill_status == null){
          this.bill_status = ''
        }
        if(this.supplier_id == '' || this.supplier_id == null){
          this.supplier_id = ''
        }
        if(this.start_time == '' || this.start_time == null){
          this.start_time = ''
        }
        if(this.end_time == '' || this.end_time == null){
          this.end_time = ''
        }
        if(this.payment_type == '' || this.payment_type == null){
          this.payment_type = ''
        }
        getPurchaseOrderList({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
          ref: this.ref,
          bill_status: this.bill_status,
          supplier_id: this.supplier_id,
          start_time: this.start_time,
          end_time: this.end_time,
          payment_type: this.payment_type,
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            this.getOrderStatus(item.base_info)
            item.base_info['numid'] = num++
            this.purchaseorderdata.push(item.base_info)
            this.dataCount = item.count
          })
        })
      },
      /*获取采购订单列表*/
      getPurchaseOrderListinfo(){
        this.purchaseorderdata = []
        getPurchaseOrderList({
          ticket: sessionStorage.getItem("ticket"),
           page: 1,
           ref:'',
           bill_status:'',
           supplier_id:'',
           start_time:'',
           end_time:'',
           payment_type: '',
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            this.getOrderStatus(item.base_info)
            item.base_info['numid'] = num++
            this.purchaseorderdata.push(item.base_info)
            this.dataCount = item.count
          })
        })
        /*console.log(this.purchaseorderdata)*/
      },
      /*重置*/
      reset(){
        this.ordernumber = ''
        this.orderstatusvalue = ''
        this.supplierlistvalue = ''
        this.starttime = ''
        this.endtime = ''
        this.paymenttypevalue = ''
        this.getPurchaseOrderListinfo()
      },
      /*查询*/
      searchPurchase(){
        this.dataCount = 0
        document.getElementById("searchBtn").disabled = true
        /*console.log(this.orderstatusvalue)*/
        this.purchaseorderdata = []
        if(this.orderstatusvalue == '500'){
          this.orderstatusvalue = ''
        }

        var start = new Date(this.starttime)
        this.starttime = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
        var end = new Date(this.endtime)
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.starttime == 'NaN-NaN-NaN'){
          this.starttime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN'){
          this.endtime = ''
        }

        getPurchaseOrderList({
           ticket: sessionStorage.getItem("ticket"),
           ref: this.ordernumber,
           page: 1,
           bill_status: this.orderstatusvalue,
           supplier_id: this.supplierlistvalue,
           start_time: this.starttime,
           end_time: this.endtime,
           payment_type: this.paymenttypevalue,
        }).then(res => {
          if(!res || res.retcode != "2000"){
              this.$Message.info("没有符合条件的订单")
              document.getElementById("searchBtn").disabled = false
              return
            }
          var num = 1
          res.data.forEach((item,index) => {
            this.getOrderStatus(item.base_info)
            item.base_info['numid'] = num++
            this.purchaseorderdata.push(item.base_info)
            this.dataCount = item.count
            document.getElementById("searchBtn").disabled = false

          })
        })
      },
      /*获取供应商列表*/
      getSupplierList(){
        getAllSupplier({
          ticket: this.$store.state.ticket
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      },

      /*删除订单*/
      openDelModal(){
        if(!this.purchaseorderdata.length){
          this.$Message.info("表格中没有订单可以删除")
          return
        }
        if(!this.currentTableObj.id){
          this.$Message.info("请在表格中选择要删除的订单")
          return
        }
        this.del_modal = true
      },
      deletePurchaseOrders(){
      /*  if(this.delbill_status != 0){
          this.$Message.info('只可删除待审核状态订单')
          this.del_modal = false
          return
        }*/
        deletePurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.del_modal = false
            this.$Message.success('删除成功')
           this.getPurchaseOrderListinfo()
           this.currentTableObj.id = ""
          }else if(res.retcode == 4000){
            this.del_modal = false
            this.$Message.success('删除失败')
            this.getPurchaseOrderListinfo()
          }
        })
      }
		},
		data() {
			return {

      data:[],
      pageSizes:[2,5,10],
      msg:[],
      params:{pageNum : '',pageSize : '',searchKey:''},
      serchKind:{oddNum:null,times:null},











        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        currentTableObj: '',
        CurrenTableindex: 0,
        del_modal: false,
        deletePurchaseOrderId: '',
        delbill_status: '',
        starttime: '',
        endtime: '',
        ordernumber: '',
        orderstatusvalue: '500',
        paymenttypevalue: "",
        supplierlistvalue: '',
        supplierlist: [],
        paymenttypelist: [
        /*{
          value: 0,
          label: '记应付账款'
        },*/{
          value: 1,
          label: '现金付款'
        }/*,{
          value: 2,
          label: '预付款'
        },*/
        ],
        orderstatuslist:[
        {
          value: '500',
          label: '全部'
        },{
          value: 0,
          label: '待审核'
        },{
          value: 1000,
          label: '已审核'
        },{
          value: 1001,
          label: '订单取消'
        },{
          value: 2000,
          label: '部分入库'
        },{
          value: 4001,
          label: '部分入库-订单关闭'
        },{
          value: 3000,
          label: '全部入库'
        },{
          value: 4002,
          label: '全部入库-订单关闭'
        },{
          value: 4000,
          label: '订单关闭'
        },
        ],
        hello_curr: 1,
        ref: '',
        bill_status: '',
        supplier_id: '',
        start_time: '',
        end_time: '',
        payment_type: '',
				purchaseorderlist: [{
					title: '序号',
					key: 'numid',
          align: "center",
          width: 60,
				}, {
					title: '状态',
          width: 110,
					key: 'orderstatus',
           align:"center",
				}, {
					title: '采购订单号',
          width: 130,
					key: 'ref',
           align:"center",
					/*sortable: true*/
				}, {
					title: '交货日期',
          width: 110,
					key: 'deal_date',
           align:"center",
				}, {
					title: '交货地址',
          width: 160,
					key: 'deal_address',
           align:"center",
				}, {
					title: '供应商',
          width: 160,
					key: 'supplier_name',
           align:"center",
				}, {
					title: '供应商联系人',
					key: 'contact01',
          width: 110,
           align:"center",
				}, {
					title: '供应商电话',
					key: 'tel01',
          width: 130,
           align:"center",
				}, {
					title: '供应商传真',
          width: 110,
					key: 'fax',
           align:"center",
				}, {
					title: '采购金额',
          width: 110,
					key: 'goods_money',
           align:"center",
				}, {
					title: '税金',
          width: 100,
					key: 'tax',
           align:"center",
				}, {
					title: '价税合计',
          width: 100,
					key: 'money_with_tax',
           align:"center",
				}, {
					title: '付款方式',
          width: 110,
					key: 'payment_type',
           align:"center",
				}, {
					title: '业务员',
          width: 120,
					key: 'sale_info_name',
           align:"center",
				}, /*{
          title: '组织机构',
          width: 135,
          key: 'department_info',
           align:"center",
        },*/ {
          title: '制单人',
          width: 120,
          key: 'input_menu_info',
           align:"center",
        }, {
          title: '制单时间',
          width: 180,
           align:"center",
          key: 'date_created'
        }, {
          title: '审核人',
          width: 135,
           align:"center",
          key: 'confirm_user_id'
        },{
          title: '审核时间',
          width: 180,
           align:"center",
          key: 'confirm_date'
        },{
					title: '备注',
          width: 150,
           align:"center",
					key: 'bill_memo'
				}, {
					title: '操作',
					key: 'action',
					width: 260,
					fixed: 'right',
					align: 'center',
					render: (h, params) => {
						return h('p', [
							h('Button', {
                props: {
                  type: 'primary',
                  size: 'default',

                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click:()=> {
                   /* console.log(this.$router)*/
                    this.$router.push('/d/purchaseorderdetial/'+params.row.ref+"/"+params.row.supplier_name)
                  }
                }
              },'订单详情'),
              h('Button', {
								props: {
									type: 'primary',
									size: 'default',

								},
								style: {
									marginRight: '8px'
								},
								on: {
									click:()=> {
                    this.$router.push('/d/purchaseorderstock/'+params.row.ref)
									}
								}
							},'入库详情'),
						/*	h('Button', {
								props: {
									type: 'error',
									size: 'default'
								},
								style: {
									marginRight: '8px'
								},
								on: {
									click: () => {
                    this.del_modal = true
										this.deletePurchaseOrderId = params.row.id
                    this.delbill_status = params.row.bill_status
									}
								}
							}, '删除'),*/
						]);
					}
				}],
				purchaseorderdata: [],
				pageSize: 20,
				dataCount: 0,
				look_world:'查看',
        cityList: [],
			}
		},
	}
</script>

<style>
/*   .purchase_order {
  padding: 0 20px;
} */
  .ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
	.ha_hidden {
		display: none;
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
</style>

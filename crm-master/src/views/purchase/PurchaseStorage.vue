<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		    <Row style="margin: 20px 0;">
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">状态</Col>
        <Col span="18">
        <Select v-model="orderstatusvalue">
          <Option v-for="item in orderstatuslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">单号</Col>
        <Col span="18">
        <Input v-model="ordernumber"></Input>
        </Col>
      </Row>
      </Col>
      <Col span="5">
      <Row>
        <Col span="8" class="from-text">交货日期(起)</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="" v-model="starttime" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="5">
      <Row>
        <Col span="8" class="from-text">交货日期(止)</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="" v-model="endtime" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row>
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">供应商</Col>
        <Col span="18">
        <Select v-model="supplierlistvalue">
          <Option v-for="item in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
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
			订单详情  <Button type="primary" style="margin-left:50px;" @click="addOrder">新建采购入库单</Button>
       <Button type="primary" style="margin-left:30px;"  id="edit" @click="editPurchase">编辑</Button>
       <Button type="primary" style="margin-left:30px;"  id="del" @click="openDelModal">删除</Button>
     <Button type="primary" style="margin-left:30px;" id="commit" @click="commitstock">提交入库</Button>
		</div>
		<Table :columns="stockslist" :data="stocksdata" @on-row-click="rowClick" :row-class-name="rowClassName"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
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
  import { getPurchaseStoreList,deletePurchaseStore,searchPurchaseStoreList,getAllSupplier,commitStore } from '../../api/api'
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        cityList: [],
        currentTableObj: '',
        CurrenTableindex: '',
				stockslist: [{
					title: '编号',
					key: 'numid',
					width:100,
           align:"center",
				}, {
					title: '状态',
					key: 'orderstatus',
					width:100,
           align:"center",
				}, {
					title: '入库单号',
					key: 'ref',
					width:200,
           align:"center",
				}, {
					title: '业务日期',
					key: 'biz_dt',
					width:200,
           align:"center",
				}, {
					title: '供应商',
					key: 'supplier_name',
					width:200,
           align:"center",
				}, {
					title: '采购金额',
					key: 'goods_money',
					width:180,
           align:"center",
				}, {
					title: '付款方式',
					key: 'payment_type',
					width:180,
           align:"center",
				}, {
					title: '入库仓库',
					key: 'warehouse_name',
					width:200,
           align:"center",
				}, {
					title: '业务员',
					key: 'sale_info_name',
					width:200,
           align:"center",
				}, {
					title: '制单人',
					key: 'input_menu_info',
					width:180,
           align:"center",
				}, {
					title: '制单时间',
					key: 'date_created',
					width:200,
           align:"center",
				}, {
					title: '备注',
					key: 'bill_memo',
					width:200,
           align:"center",
				}, {
					title: '操作',
					key: 'action',
					width:180,
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
                    this.$router.push('/d/purchasestorageinfo/'+params.row.ref+"/"+params.row.supplier_name+'/'+params.row.warehouse_name)
                  }
                }
              },'查看'),
            ]);
          }
        }],
         paymenttypelist: [
       /* {
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
          value: 0,
          label: '待入库'
        },{
          value: '1000',
          label: '已入库'
        },{
          value: '500',
          label: ''
        }
        ],
				stocksdata: [],
				pageSize: 20,
				dataCount: 0,
        starttime: "",
        endtime: "",
        ordernumber: "",
        orderstatusvalue: "",
        paymenttypevalue: "",
        supplierlistvalue: "",
        supplierlist: [],
        delId: '',
        del_modal: false,
			}
		},
    methods:{
      /*提交入库*/
      commitstock(){
        commitStore({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == "2000"){
            this.$Message.success("提交入库成功")
            this.getPurchaseStoreListinfo()
            this.currentTableObj.orderstatus = "已入库"
            this.buttonStatus(this.currentTableObj)
          }
        })
      },
      /*编辑*/
      editPurchase(){
        if(!this.stocksdata.length){
          this.$Message.info('表格中没有订单可以编辑')
          return
        }
        if(!this.currentTableObj){
          this.$Message.info('请在表格中选择要编辑的订单')
          return
        }
        this.$router.push('/d/edit-Storeage-order/'+this.currentTableObj.ref)
      },
      /*删除*/
      deletePurchase(){
        deletePurchaseStore({
          ticket: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.getPurchaseStoreListinfo()
            this.del_modal = false
            this.$Message.success('删除成功')
            this.currentTableObj.id = ""
          }
        })
      },
      openDelModal(){
         if(!this.stocksdata.length){
          this.$Message.info('表格中没有订单可以删除')
          return
        }
        if(!this.currentTableObj){
          this.$Message.info('请在表格中选择要删除的订单')
          return
        }
        this.del_modal = true
      },
      /*删除确认操作*/
      delTrue(){
        this.deletePurchase()
      },
      delFalse(){
        this.del_modal = false
      },
      /*选中当前行*/
      rowClassName (row, index) {
          if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';
      },
       /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        this.currentTableObj = currentRow
        this.CurrenTableindex = index
        this.buttonStatus(currentRow)
      },

      /*获取按钮状态*/
      buttonStatus(obj){
         if(obj.orderstatus == "待入库"){
          document.getElementById('edit').disabled = false
          document.getElementById('del').disabled = false
          document.getElementById('commit').disabled = false
        }else{
          document.getElementById('edit').disabled = true
          document.getElementById('del').disabled = true
          document.getElementById('commit').disabled = true
        }
      },
      /*删除采购入库*/


      /*获取订单入库状态和付款方式*/
      getOrderStatusPayment(obj){
        if(obj.bill_status == 0){
          obj['orderstatus'] = '待入库'
        }else if(obj.bill_status == 1000){
          obj['orderstatus'] = '已入库'
        }
        if(obj.payment_type == 0){
          obj.payment_type = '记应付账款'
        }else if(obj.payment_type == 1){
          obj.payment_type = '现金付款'
        }else if(obj.payment_type == 2){
          obj.payment_type = '预付款'
        }
      },
      /*分页*/
      changepage(index){
        this.stocksdata = []
        getPurchaseStoreList({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
          ref: ''
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            this.getOrderStatusPayment(item.base_info)
            item.base_info['numid'] = num++
            this.stocksdata.push(item.base_info)
            this.dataCount = item.count
          })
        })
      },
      addOrder(){
        this.$router.push('/d/add-Storeage-order')
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
      /*查询对应条件订单*/
      search(){
        this.stocksdata = []
        this.dataCount = 0
        document.getElementById("searchBtn").disabled = true
        /*console.log(this.orderstatusvalue)*/
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
        searchPurchaseStoreList({
          ticket: sessionStorage.getItem("ticket"),
          page: 1,
          ref: this.ordernumber,
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
            this.getOrderStatusPayment(item.base_info)
            this.dataCount = item.count
            item.base_info['numid'] = num++
            this.stocksdata.push(item.base_info)
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
      /*获取采购入库单列表*/
      getPurchaseStoreListinfo(){
        this.stocksdata = []
        getPurchaseStoreList({
          ticket: sessionStorage.getItem("ticket"),
          page: 1,
          ref: '',
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            this.getOrderStatusPayment(item.base_info)
            this.dataCount = item.count
            item.base_info['numid'] = num++
            this.stocksdata.push(item.base_info)
          })
        })
      },
    },
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getPurchaseStoreListinfo()
      this.getSupplierList()
    },
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
  } */
    .ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
</style>

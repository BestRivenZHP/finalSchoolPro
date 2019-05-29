<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      采购订单入库详情
    </div>
    <Table stripe :columns="purchaseorderstocklist" :data="purchaseorderstockdata"></Table>
   <!--  <div class="page_unit">
     <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
   </div> -->
  </div>
</template>

<script>
  import { getPurchaseOrderList } from '../../../api/api'
  export default {
    data() {
      return {
        purchaseordernumber: '',
        suppliername: '',
        purchaseorderstocklist: [{
          title: '序号',
          fixed: 'left',
          align: "center",
          key: 'numid',
        }, {
          title: '状态',
          align: "center",
          fixed: 'left',
          key: 'orderstatus'
        }, {
          title: '入库单号',
          align: "center",
          key: 'ref',
        }, {
          title: '业务日期',
          align: "center",
          key: 'biz_dt'
        }, {
          title: '供应商',
          align: "center",
          key: 'supplier_name',
        }, {
          title: '采购金额',
          align: "center",
          key: 'goods_money'
        }, {
          title: '付款方式',
          align: "center",
          key: 'payment_type'
        }, {
          title: '入库仓库',
          align: "center",
          key: 'warehouse_name'
        }, {
          title: '业务员',
          align: "center",
          key: 'sale_info_name'
        }, {
          title: '制单人',
          align: "center",
          key: 'input_menu_info'
        }, {
          title: '制单时间',
          align: "center",
          key: 'date_created',
        },
      ],
      purchaseorderstockdata: [],
      pageSize: 20,
      dataCount: 0,
      tempdata: [],
      }
    },
    methods: {
      getPurchaseOrderinfo(){
        this.purchaseorderstockdata = []
        this.purchaseordernumber = this.$route.params.ref
        this.suppliername = this.$route.params.supplier
        getPurchaseOrderList({
          ticket: sessionStorage.getItem("ticket"),
           page: 1,
           ref: this.purchaseordernumber,
           bill_status:'',
           supplier_id:'',
           start_time:'',
           end_time:'',
           payment_type: '',
        }).then(res => {
          if(res.data){
            var num = 1
          res.data.forEach((item,index) => {
            this.tempdata[index] = item.order_info[index]
            this.dataCount = item.count
          })
          for(var i = 0;i < this.tempdata.length;i++){
            this.tempdata[i]['numid'] = num++
            if(this.tempdata[i].bill_status == 0){
              this.tempdata[i]['orderstatus'] = '待审核'
            }else if(this.tempdata[i].bill_status == 1000){
              this.tempdata[i]['orderstatus'] = '已审核'
            }else if(this.tempdata[i].bill_status == 1001){
              this.tempdata[i]['orderstatus'] = '订单取消'
            }else if(this.tempdata[i].bill_status == 2000){
              this.tempdata[i]['orderstatus'] = '部分入库'
            }else if(this.tempdata[i].bill_status == 4001){
              this.tempdata[i]['orderstatus'] = '部分入库-订单关闭'
            }else if(this.tempdata[i].bill_status == 3000){
              this.tempdata[i]['orderstatus'] = '全部入库'
            }else if(this.tempdata[i].bill_status == 4002){
              this.tempdata[i]['orderstatus'] = '全部入库-订单关闭'
            }else if(this.tempdata[i].bill_status == 4000){
              this.tempdata[i]['orderstatus'] = '订单关闭'
            }
            if(this.tempdata[i].payment_type == 0){
              this.tempdata[i].payment_type = '记应付账款'
            }else if(this.tempdata[i].payment_type == 1){
              this.tempdata[i].payment_type = '现金付款'
            }else if(this.tempdata[i].payment_type == 2){
              this.tempdata[i].payment_type = '预付款'
            }
            this.purchaseorderstockdata.push(this.tempdata[i])
          }
          }
        })
      },
       /*分页*/
      changepage(index){
        this.purchaseorderstockdata = []
        getPurchaseOrderList({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
          ref: this.purchaseordernumber,
          bill_status:'',
          supplier_id:'',
          start_time:'',
          end_time:'',
          payment_type: '',
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            this.dataCount = item.count
            this.tempdata[index] = item.order_info[index]
          })
          for(var i = 0;i < this.tempdata.length;i++){
            this.tempdata[i]['numid'] = num++
            if(this.tempdata[i].bill_status == 0){
              this.tempdata[i]['orderstatus'] = '待审核'
            }else if(this.tempdata[i].bill_status == 1000){
              this.tempdata[i]['orderstatus'] = '已审核'
            }else if(this.tempdata[i].bill_status == 1001){
              this.tempdata[i]['orderstatus'] = '订单取消'
            }else if(this.tempdata[i].bill_status == 2000){
              this.tempdata[i]['orderstatus'] = '部分入库'
            }else if(this.tempdata[i].bill_status == 4001){
              this.tempdata[i]['orderstatus'] = '部分入库-订单关闭'
            }else if(this.tempdata[i].bill_status == 3000){
              this.tempdata[i]['orderstatus'] = '全部入库'
            }else if(this.tempdata[i].bill_status == 4002){
              this.tempdata[i]['orderstatus'] = '全部入库-订单关闭'
            }else if(this.tempdata[i].bill_status == 4000){
              this.tempdata[i]['orderstatus'] = '订单关闭'
            }
            this.purchaseorderstockdata.push(this.tempdata[i])
          }
        })
      },
    },
    mounted(){
      this.getPurchaseOrderinfo()
    }
  }
</script>

<style>
  .sale_day_goods {
    padding: 0 20px;
  }
</style>

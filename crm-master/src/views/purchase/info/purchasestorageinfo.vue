<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      <span>单号:{{ purchaseordernumber }}</span>   <span style="margin-left:20px">供应商:{{ suppliername }}</span><span style="margin-left:20px">入库仓库:{{ warehousename }}</span>
    </div>
    <Table stripe :columns="purchaseorderdetiallist" :data="purchaseorderdetialdata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  import { getPurchaseStoreList } from '../../../api/api'
  export default {
    data() {
      return {
        purchaseordernumber: '',
        suppliername: '',
        warehousename: '',
        purchaseorderdetiallist: [{
          title: '序号',
          align: "center",
          key: 'numid',
        }, {
          title: '商品编码',
          align: "center",
          key: 'code'
        }, {
          title: '商品名称',
          align: "center",
          key: 'goods_name',
        }, {
          title: '规格型号',
          align: "center",
          key: 'spec'
        }, {
          title: '入库数量',
          align: "center",
          key: 'goods_count'
        }, {
          title: '单位',
          align: "center",
          key: 'unit'
        }, {
          title: '采购单价',
          align: "center",
          key: 'goods_price'
        }, {
          title: '采购金额',
          align: "center",
          key: 'goods_money'
        }, {
          title: '备注',
          align: "center",
          key: 'memo'
        },
      ],
      purchaseorderdetialdata: [],
      pageSize: 20,
      dataCount: 0,
      tempdata: [],
      }
    },
    methods: {
      getPurchaseOrderinfo(){
        this.purchaseorderdetialdata = []
        this.purchaseordernumber = this.$route.params.ref
        this.suppliername = this.$route.params.supplier
        this.warehousename = this.$route.params.warehouse
        getPurchaseStoreList({
          ticket: sessionStorage.getItem("ticket"),
           page: 1,
           ref: this.purchaseordernumber
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
             if(item.goods_info[0].goods_count){
              this.tempdata = item.goods_info
            }
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
            this.purchaseorderdetialdata = this.tempdata
          }
          this.dataCount = this.purchaseorderdetialdata.length
        })
      },
       /*分页*/
      changepage(index){
        this.purchaseorderdetialdata = []
        getPurchaseStoreList({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
          ref: this.purchaseordernumber
        }).then(res => {
         var num = 1
          res.data.forEach((item,index) => {
            this.tempdata[index] = item.goods_info[index]
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
            this.purchaseorderdetialdata.push(this.tempdata[i])
          }
          this.dataCount = this.purchaseorderdetialdata.length
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

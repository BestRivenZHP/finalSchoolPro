<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      <span>单号:{{ purchaseordernumber }}</span>   <span style="margin-left:20px">供应商:{{ suppliername }}</span>
    </div>
    <Table stripe :columns="purchaseorderdetiallist" :data="purchaseorderdetialdata"></Table>
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
        purchaseorderdetiallist: [{
          title: '序号',
          width: 60,
          fixed: 'left',
          align: "center",
          key: 'numid',
        }, {
          title: '商品编码',
          fixed: 'left',
          width: 100,
          align: "center",
          key: 'code'
        }, {
          title: '商品名称',
          width: 150,
          align: "center",
          key: 'goods_name',
        }, {
          title: '规格型号',
          width: 260,
          align: "center",
          key: 'spec'
        }, {
          title: '采购数量',
          key: 'goods_count',
          width: 100,
          align: "center",
        }, {
          title: '入库数量',
          width: 100,
          key: 'left_count',
          align: "center",
        }, {
          title: '未入库数量',
          width: 100,
          align: "center",
          key: 'pw_count'
        }, {
          title: '单位',
          width: 100,
          align: "center",
          key: 'unit'
        }, {
          title: '采购单价',
          width: 100,
          align: "center",
          key: 'goods_price'
        }, {
          title: '采购金额',
          width: 100,
          align: "center",
          key: 'goods_money'
        }, {
          title: '税率(%)',
          key: 'tax_rate',
          align: "center",
          width: 100,
        }, {
          title: '税金',
          align: "center",
          width: 100,
          key: 'tax'
        }, {
          title: '价税合计',
          width: 100,
          align: "center",
          key: 'money_with_tax'
        }, {
          title: '备注',
          width: 180,
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
          var num = 1
          res.data.forEach((item,index) => {
            this.tempdata = item.goods_info
            this.dataCount = item.count
          })
          for(var i = 0;i < this.tempdata.length;i++){
            this.tempdata[i]['numid'] = num++
            this.purchaseorderdetialdata.push(this.tempdata[i])
          }
        })
      },
       /*分页*/
      changepage(index){
        this.purchaseorderdetialdata = []
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
            this.tempdata = item.goods_info
            this.dataCount = item.count
          })
          for(var i = 0;i < this.tempdata.length;i++){
            this.tempdata[i]['numid'] = num++
            this.purchaseorderdetialdata.push(this.tempdata[i])
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

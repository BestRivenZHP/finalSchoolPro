<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      查询条件
    </div>
    <Row style="margin: 20px 0;">
      <Col span="8">
      <Row>
       <span>业务日期:</span> <span style="margin-left:10px;margin-right:8px;">从</span><DatePicker type="date" placeholder="请选择开始日期" v-model="starttime"></DatePicker>
       <span style="margin-left:10px;margin-right:8px;">到</span><DatePicker type="date" placeholder="请选择结束日期" v-model="endtime"></DatePicker>
      </Row>
      </Col>
      <Col span="1" style="text-align: center;margin-left:20px;">
      <Button type="primary" @click="search">查询</Button>
      </Col>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      <!-- <Col span="1" style="text-align: center;">
      <Button type="primary">重置</Button>
      </Col> -->
    </Row>
    <Table stripe :columns="stockbilllist" :data="stockbilldata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  import { getStockBillListDetail } from '../../../api/api'
  export default {
    data() {
      return {
        starttime: '',   /*业务日期开始*/
        endtime: '',     /*业务日期结束*/
        goods_id: '',   /*商品id*/
        warehouse_id: '',  /*仓库id*/
        stockbilllist: [
        {
          title: '序号',
          width: 100,
          align: "center",
          key: 'numid',
        },{
          title: '商品编码',
          width: 100,
          align: "center",
          key: 'code',
        }, {
          title: '商品名称',
          width: 150,
          align: "center",
          key: 'name'
        }, {
          title: '规格型号',
          width: 260,
          align: "center",
          key: 'spec',
        }, {
          title: '商品单位',
          width: 100,
          align: "center",
          key: 'unit'
        }, {
          title: '入库数量',
          width: 100,
          align: "center",
          key: 'in_count'
        }, {
          title: '入库单价',
          width: 100,
          align: "center",
          key: 'in_price'
        }, {
          title: '入库金额',
          width: 100,
          align: "center",
          key: 'in_money'
        }, {
          title: '出库数量',
          width: 100,
          align: "center",
          key: 'out_count'
        }, {
          title: '出库单价',
          width: 120,
          align: "center",
          key: 'out_price'
        }, {
          title: '出库金额',
          width: 120,
          align: "center",
          key: 'out_money'
        }, {
          title: '余额数量',
          width: 100,
          align: "center",
          key: 'balance_count'
        }, {
          title: '余额单价',
          width: 120,
          align: "center",
          key: 'balance_price'
        }, {
          title: '余额金额',
          width: 120,
          align: "center",
          key: 'balance_money'
        }, {
          title: '业务日期',
          width: 100,
          align: "center",
          key: 'balance_count'
        }, {
          title: '业务员',
          width: 120,
          align: "center",
          key: 'sale_info_name'
        }, {
          title: '业务类型',
          width: 120,
          align: "center",
          key: 'ref_type'
        }, {
          title: '业务单号',
          width: 120,
          align: "center",
          key: 'ref_number'
        }],
        stockbilldata: [],  /*库存数据*/
        pageSize: 20,
        dataCount: 0
      }
    },
    methods:{
      /*返回*/
      goBack(){
        window.history.back()
      },
      /*查询*/
      search(){
         if(this.starttime == null || this.starttime == ''){
          this.starttime = ''
         }
         if(this.endtime == null || this.endtime == ''){
          this.endtime = ''
         }
         var start = new Date(this.starttime)
         var month1 = (start.getMonth()+1)>=10?(start.getMonth()+1):'0'+(start.getMonth()+1)
         var day1 = start.getDate()>=10?start.getDate():'0'+start.getDate()
         this.starttime = start.getFullYear() + '-' + month1 + '-' + day1
         var end = new Date(this.endtime)
         var month2 = (end.getMonth()+1)>=10?(end.getMonth()+1):'0'+(end.getMonth()+1)
         var day2 = end.getDate()>=10?end.getDate():'0'+end.getDate()
         this.endtime = end.getFullYear() + '-' + month2 + '-' + day2
         if(this.starttime == 'NaN-NaN-NaN'){
          this.starttime = ''
         }
         if(this.endtime == 'NaN-NaN-NaN'){
          this.endtime = ''
         }
         this.stockbilldata = []
         /*console.log(this.starttime)
         console.log(this.endtime)*/
         getStockBillListDetail({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.warehouse_id,
          goods_id: this.goods_id,
          start_time: this.starttime,
          end_time: this.endtime,
          page: 1
        }).then(res => {
         /* console.log(res)*/
         if(!res.data || res.retcode != "2000"){
            this.dataCount = 0
            return
          }
          var num = 1
          res.data.forEach((item,index) => {
            item['numid'] = num++
          this.dataCount = item.count
          })
          this.stockbilldata = res.data
        })
      },
      /*分页*/
      changepage(index){
        if(this.starttime == null || this.starttime == ''){
          this.starttime = ''
         }
        if(this.endtime == null || this.endtime == ''){
         this.endtime = ''
        }
        getStockBillListDetail({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.warehouse_id,
          goods_id: this.goods_id,
          start_time: this.starttime,
          end_time: this.endtime,
          page: index
        }).then(res => {
          if(!res.data || res.retcode != "2000"){
            this.dataCount = 0
            return
          }
          var num = 1
          res.data.forEach((item,index) => {
            item['numid'] = num++
            this.dataCount = item.count
          })
          this.stockbilldata = res.data
        })
      },
      /*获取库存列表详情数据*/
      getBillInfoDetial(){
        this.goods_id = this.$route.params.goods_id
        this.warehouse_id = this.$route.params.warehouse_id
        getStockBillListDetail({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.warehouse_id,
          goods_id: this.goods_id,
          start_time: '',
          end_time: '',
          page: 1
        }).then(res => {
          if(!res.data || res.retcode != "2000"){
            this.dataCount = 0
            return
          }
          var num = 1
          res.data.forEach((item,index) => {
            item['numid'] = num++
            this.dataCount = item.count
          })
          this.stockbilldata = res.data
        })
      }
    },
    mounted(){
      this.getBillInfoDetial()
    }
  }
</script>

<style>

</style>

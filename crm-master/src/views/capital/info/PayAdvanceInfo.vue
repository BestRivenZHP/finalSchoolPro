<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      查询条件
    </div>
    <Row style='margin: 20px 0;line-height: 30px;'>
      <Col span="1">业务日期 </Col>
      <Col span="3">
      <DatePicker type="date" placeholder="开始时间" v-model="starttime" :options="options"></DatePicker>
      </Col>
      <Col span="3">
      <DatePicker type="date" placeholder="结束时间" v-model="endtime" :options="options"></DatePicker>
      </Col>
      <Col span="2" style="margin-left: 20px;">
      <Button type="primary" @click="getpreinmoneydetialinfo">查询</Button> </Col>
    </Row>
    <div class="basic_indicators" style="margin-bottom: 30px;">
      预付款明细
    </div>
    <Table stripe :columns="perinmoneydetiallist" :data="perinmoneydetialdata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  import { prepaymentDetailList } from '../../../api/api'
  export default {
    data() {
      return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        perinmoneydetiallist: [{
            title: '业务类型',
            key: 'refType',
            align: "center",
          },
          {
            title: '单号',
            align: "center",
            key: 'refNumber'
          },
          {
            title: '业务日期',
            align: "center",
            key: 'bizDT',
            //            sortable: true
          },
          {
            title: '付供应商预付款',
            key: 'inMoney',
            align: "center",
          },{
            title: '支付货款',
            key: 'outMoney',
            align: "center",
          },{
            title: '采购预收款余额',
            key: 'balanceMoney',
            align: "center",
          },{
            title: '创建时间',
            align: "center",
            key: 'dateCreated'
          },{
            title: '业务员',
            align: "center",
            key: 'bizUserName'
          },{
            title: '制单人',
            align: "center",
            key: 'inputUserName'
          }],
        perinmoneydetialdata: [],
        pageSize: 20,
        dataCount: 0,
        starttime: '',
        endtime: '',
      }
    },
    methods:{
      /*分页*/
      changepage(index){
        prepaymentDetailList({
          ticket: sessionStorage.getItem("ticket"),
          customerId: this.$route.params.payadvance-info,
          dtFrom: this.starttime,
          dtTo: this.endtime,
          page: index
        }).then(res => {
          this.dataCount = res.data.data.totalCount
          this.perinmoneydetialdata = res.data.data.dataList
        })
      },
      getpreinmoneydetialinfo(){
        if(this.starttime){
          var start = new Date(this.starttime)
          var month1 = (start.getMonth()+1)>=10?(start.getMonth()+1):'0'+(start.getMonth()+1)
          var day1 = start.getDate()>=10?start.getDate():'0'+start.getDate()
          this.starttime = start.getFullYear() + '-' + month1 + '-' + day1
        }else{
          this.$Message.info("请选择开始时间")
        }
        if(this.endtime){
          var end = new Date(this.endtime)
          var month1 = (end.getMonth()+1)>=10?(end.getMonth()+1):'0'+(end.getMonth()+1)
          var day1 = end.getDate()>=10?end.getDate():'0'+end.getDate()
          this.endtime = end.getFullYear() + '-' + month1 + '-' + day1
        }else{
          this.$Message.info("请选择结束时间")
        }
        prepaymentDetailList({
          ticket: sessionStorage.getItem("ticket"),
          customerId: this.$route.params.payadvance-info,
          dtFrom: this.starttime,
          dtTo: this.endtime
        }).then(res => {
          this.dataCount = res.data.data.totalCount
          this.perinmoneydetialdata = res.data.data.dataList
        })
      }
    },
    mounted(){

    }
  }
</script>

<style>
  /* .receipts {
    padding: 0 20px;
  } */
</style>

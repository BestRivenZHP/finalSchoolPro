<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      查询条件
    </div>
    <Row>
      <Col span="4" style="margin: 20px 0;">
      <Row>
        <Col span="6" class="from-text">业务日期:</Col>
        <Col span="18">
        <DatePicker type="date" v-model="datetime" placeholder="Select date" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="1" style="margin: 20px 0;margin-left: 20px;">
      <Button type="primary" @click="getdayreports">查询</Button>
      </Col>
    </Row>
    <div class="basic_indicators" style="margin-bottom: 30px;">
      销售日报表-商品汇总
    </div>
    <Table stripe :columns="dayreportlist" :data="dayreportdata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
 import { getDayReport,searchDayReport } from '../../../api/api'
  export default {
    data() {
      return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        datetime: '',
        dayreportlist: [{
          title: '业务日期',
          key: 'time'
        }, {
          title: '商品编码',
          key: 'goodsCode'
        }, {
          title: '商品名称',
          key: 'goodsName',
          sortable: true
        }, {
          title: '规格型号',
          key: 'goodsSpec'
        }, {
          title: '销售出库数量',
          key: 'saleCount'
        }, {
          title: '计量单位',
          key: 'unitName'
        }, {
          title: '销售出库金额',
          key: 'saleMoney'
        }, {
          title: '退货入库数量',
          key: 'rejCount'
        }, {
          title: '退货入库金额',
          key: 'rejMoney'
        }, {
          title: '净销售数量',
          key: 'c'
        }, {
          title: '净销售金额',
          key: 'm'
        }, {
          title: '毛利',
          key: 'profit'
        }, {
          title: '毛利率',
          key: 'rate'
        },
//        {
//          title: '操作',
//          key: 'action',
//          fixed: 'right',
//          align: 'center',
//          render: function(h, params) {
//            return h('p', [
//              h('Button', {
//                props: {
//                  type: 'primary',
//                  size: 'small'
//                },
//                style: {
//                  marginRight: '8px'
//                },
//                on: {
//                  click: function() {
//                    console.log(params)
//                  }
//                }
//              }, '编辑'),
//              h('Button', {
//                props: {
//                  type: 'error',
//                  size: 'small'
//                },
//                style: {
//                  marginRight: '8px'
//                },
//                on: {
//                  click: function() {
//                    console.log(params)
//                  }
//                }
//              }, '删除'),
//            ]);
//          }
//        }
        ],
        dayreportdata: [],
        pageSize: 10,
        dataCount: 100,
        time: '',
      }
    },
    methods:{
      changepage(){

      },
      getdayreports(){
        this.time = new Date(this.datetime)
        var month = (this.time.getMonth() + 1)>=10?(this.time.getMonth() + 1):'0'+(this.time.getMonth() + 1)
        var day = this.time.getDate()>=10?this.time.getDate():'0'+this.time.getDate()
        this.time = this.time.getFullYear() + '-' + month + '-' + day
        searchDayReport({
          date: this.time,
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          this.dayreportdata = res.data.data.dataList
          this.dayreportdata.forEach((item,index) => {
            item['time'] = this.time
          })
          this.dataCount = res.data.data.totalCount
        })
      }
    },
    mounted(){
    }
  }
</script>

<style>
  .sale_day_goods {
    padding: 0 20px;
  }
</style>

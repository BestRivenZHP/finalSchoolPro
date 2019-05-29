<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      建账仓库: {{ stockName }}
    </div>
    <Row style="margin: 15px 0px;">
    <Col span="10">
    <span>商品分类</span>
    <Select v-model="shopcategoryvalue" style="width: 500px;" @on-change="gettable">
      <Option v-for="item in supplierslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </Col>
    </Row>
    <Row>
    <Col span="24">
    <Table :row-class-name="rowClassName" on-row-click="rowClick" :columns="stockslist" :data="stocksdata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
    </Col>
    </Row>
    <Modal v-model="edit_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
      <span style="color:rgb(51, 110, 218);margin-right:15px;">编辑当前商品信息:</span>
      </p>
      <p>
      <span style="margin-right:15px;">商品编码:</span><br><br>
      <span style="margin-right:15px;">品名:</span><br><br>
      <span style="margin-right:15px;">规格型号:</span><br><br>
      <span style="margin-right:15px;">期初数量:</span><Input v-model="value" style="width: 230px"></Input><br><br>
      <span style="margin-right:15px;">计量单位:</span><br><br>
      <span style="margin-right:15px;">期初金额:</span><Input v-model="value" style="width: 230px"></Input><br><br>
      <span style="margin-right:15px;">期初单价:</span><br><br>
      </p>
      <div slot="footer" style="text-align:center;">
        <Button type="primary">保存当前商品的建账信息</Button><br><br>
        <span>保存后自动跳转到下一条记录</span>
      </div>
    </Modal>
  </div>
</template>

<script>
 import { getGoodsCategory,getGoods } from '../../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getshopcategorys()
    },
    data() {
      return {
        options: {
                   disabledDate (date) {
                       return date && date.valueOf() > Date.now();
                   }
               },
        edit_modal: false,
        value: '',
        shopcategoryvalue: '',
        supplierslist: [],
        stockName: '',
        stockslist: [{
          title: '序号',
          align: "center",
          key: 'numid'
        }, {
          title: '商品编码',
          align: "center",
          key: 'code'
        }, {
          title: '品名',
          align: "center",
          key: 'name',
        }, {
          title: '规格型号',
          align: "center",
          key: 'spec'
        }, {
          title: '期初数量',
          align: "center",
          key: 'startcount'
        }, {
          title: '单位',
          align: "center",
          key: 'unit_name'
        }, {
          title: '期初金额',
          align: "center",
          key: 'startmoney'
        }, {
          title: '期初单价',
          align: "center",
          key: 'startprice'
        },{
          title: '操作',
          key: 'action',
          align: 'center',
          render:  (h, params)=> {
            return h('p', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                on: {
                  click:  ()=> {
                    this.edit_modal = true
                  }
                }
              }, '编辑')
            ]);
          }
        }
        ],
        stocksdata: [],
        pageSize: 10,
        dataCount: 0,
        currentTableObj: '',
        CurrenTableindex: '',
        value: '',
      }
    },
    methods:{
       /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        /*this.currentTableObj = currentRow
        this.CurrenTableindex = index*/
      },
      rowClassName (row, index) {
          /*if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';*/
      },
      changepage(index){
         getGoodsCategory({
          ticket: this.$store.state.ticket,
          page: index
        }).then(res => {
          res.data.forEach((item,index) => {
            let temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierslist.push(temp)
          })
        })
      },
      getshopcategorys(){
        getGoodsCategory({
          ticket: this.$store.state.ticket
        }).then(res => {
          res.data.forEach((item,index) => {
            let temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierslist.push(temp)
          })
        })
      },
      gettable(value){
        getGoods({
          ticket: this.$store.state.ticket,
          category_id: value
        }).then(res => {
          if(res.data){
          var num = 1
          res.data.forEach((item,index) => {
            item['numid'] = num++
          })
          this.stocksdata = res.data
          this.dataCount = res.data.length
          }
        })
      }
    },
  }
</script>

<style>
</style>

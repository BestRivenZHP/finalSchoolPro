<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      生成采购入库单
    </div>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">单号</Col>
        <Col span="16">{{odd_number}}</Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">业务日期</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="请输入日期" v-model="exchangedate" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">供应商</Col>
        <Col span="16">
        <Select v-model="suppliervalue">
          <Option v-for="item in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">仓库</Col>
        <Col span="16">
        <Select v-model="stockvalue">
          <Option v-for="item in allstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">业务员</Col>
        <Col span="16">
        <Select v-model="allusersvalue">
          <Option v-for="item in alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="6" style="text-align: center;">付款方式</Col>
        <Col span="18">
        <Select v-model="paymentvalue">
          <Option v-for="item in paymentlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="12">
      <Col span="2" style="text-align: center;">备注</Col>
      <Col span="22">
      <Input v-model="nodetxt"></Input>
      </Col>
      </Col>
    </Row>
   <Row>
    <div class="ivu-table ivu-table-stripe">
    <div class="ivu-table-header">
      <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
      <thead>
       <tr>
        <th class="">
         <div class="ivu-table-cell">
          <span>序号</span>
         </div></th>
     <!--    <th class="">
      <div class="ivu-table-cell">
       <span>商品选择</span>
      </div></th> -->
         <th class="">
         <div class="ivu-table-cell">
          <span>商品编码</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>商品名称</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>规格型号</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>采购数量</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>单位</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>采购单价</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>采购金额</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>备注</span>
         </div></th>
       <!--  <th class="">
        <div class="ivu-table-cell">
         <span>操作</span>
        </div></th> -->
       </tr>
      </thead>
     </table>
    </div>
    <div class="ivu-table-tip">
      <div class='Modal'>
    <table cellspacing="0" cellpadding="0">
      <tbody>
        <tr class='tr_parent_trash' v-for="(list, key) in table.lists">
          <td>{{key+1}}</td>
          <!-- <td>
            <i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
            <input type="hidden" v-model="list.goods_id">
          </td> -->
          <td class="">{{list.code}}<input type="hidden" v-model="list.goods_id"></td>
          <td class="">{{list.name}}</td>
          <td class="">{{list.spec}}</td>
          <td class="">
            <Input placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.goods_count'></Input>
          </td>
          <td class="">{{list.unit_id}}</td>
          <td class="">
            <!-- <Input placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.goods_price"></Input> -->
            {{list.goods_price | filterByNumber}}
          </td>
          <td class="">
            {{list.goods_money | filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input' v-model='purchase_money'></Input>-->
          </td>
          <td class="">
            <Input placeholder="备注" class='modea_input' v-model="list.memo"></Input>
          </td>
          <!-- <td class="">
            <span v-on:click="addInput"><Icon type="android-add-circle" style='font-size:25px;margin-right:10px;' ></Icon></span>
            <span v-on:click="delInput(key)" v-if="key > 0"><Icon type="ios-trash" style='font-size:25px;'></Icon></span>
            <span v-else><Icon type="ios-trash-outline" style='font-size:25px;color: #ccc;'></Icon></span>
          </td> -->
        </tr>
        <tr>
          <td></td>
          <td>

          </td>
          <!-- <td class=""></td> -->
          <td class=""></td>
          <td class="">
          </td>
          <td class=""></td>
          <td class=""></td>
          <td class="">采购合计：
          </td>
          <td class="">
            {{totalPrice | filterByNumber}}
          </td>

          <td class="">
          </td>
          <!-- <td class=""></td> -->
        </tr>
      </tbody>
    </table>
    <Modal v-model="add_orders" width="1000">
      <p slot="header" style="color:#2D8CF0;text-align:left">
        <span>选择商品</span>
      </p>
      <i-table border :columns="goodsTitle" :data="goods_list" height="400" :highlight-row="hrow" @on-row-click="appendTitle"></i-table>
    </Modal>
    <div style="margin-top:30px;">
      <Button type="primary" @click="toEdit">保存</Button>
      <Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
   </div>
  </div>
    </div>
   </div>
   </Row>
  </div>
</template>
<script type="text/javascript">
  import myTableHeader from '../myTableHeader'
  import myTableTbody from '../myTableTbody'
  import { getUser,getAllOrgs,getAllSupplier,getGoods,addStore,getPurchaseOrderList,getAllStock } from '../../../api/api'
  export default {
    data() {
      return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        editid: '',
        is_edit: false,
        exchangedate: '', //交货日期
        suppliervalue: '', //供应商
        allusersvalue: '', //业务员
        paymentvalue: 1, //付款方式
        nodetxt: '', //备注
        stockvalue: '',//仓库
        supplierlist: [],
        orgslist: [],
        paymentlist: [
        {
          value: 0,
          label: '记应付账款'
        },{
          value: 1,
          label: '现金付款'
        },{
          value: 2,
          label: '预付款'
        },
        ],
        alluserslist: [],
        odd_number: '保存后自动生成',

        hrow: true,
        checkVriable: 0,
        totalPrice:0,
        taxalPrice:0,
        taxtTotalMoney:0,
        goodsTitle: [{
            title: '商品编码',
            key: 'code',
            /*sortable: true,*/
            align: "center",
          },
          {
            title: '商品',
            align: "center",
            key: 'name'
          },
          {
            title: '规格型号',
            key: 'spec',
            align: "center",
          },
          {
            title: '单位',
            align: "center",
            key: 'unit_name'
          },
          {
            title: '建议采购价',
            align: "center",
            key: 'purchase_price'
          },
          {
            title: '备注',
            align: "center",
            key: 'memo'
          }
        ],
        table: {
          lists: [{
            goods_id: '',
            code: "",
            name: "",
            spec: "",
            goods_count: 0, //采购数量
            unit_id: "",
            goods_price: 0, //采购单价
            goods_money: 0, //采购总额
            memo: '', //备注
          }]
        },
        add_orders: false,
        goods_list: [],
        tab_key: 0,
        taxation:0,
        allstockslist: [],
        tempdata: [],
      }
    },
    filters:{
      filterByNumber(value){
        return isNaN(value)?'':value.toFixed(2);
      }
    },
    /*components: {
         myTableHeader: myTableHeader,
         myTableTbody: myTableTbody,
      },*/
      methods:{
        /*获取仓库列表*/
        getAllStocks(){
        getAllStock({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            let temp = {}
            temp.value = item.id
            temp.label = item.name
            this.allstockslist.push(temp)
          })
        })
      },
        /*取消*/
        escquit(){
          window.history.back()
        },
        /*获取列表*/
        getPurchaseOrderinfo(){
         getPurchaseOrderList({
          ticket: sessionStorage.getItem("ticket"),
           page: 1,
           ref: this.$route.params.ref,
           bill_status:'',
           supplier_id:'',
           start_time:'',
           end_time:'',
           payment_type: '',
        }).then(res => {
          /*console.log(res)*/
          var num = 1
          res.data.forEach((item,index) => {
            if(item.goods_info.goods_id){
            this.table.lists[index] = item.goods_info[index]
            }
            if(item.base_info){
            this.editid = item.base_info.id
            this.odd_number = item.base_info.ref
            this.exchangedate = item.base_info.deal_date
            this.suppliervalue = item.base_info.supplier_id
            this.stockvalue = item.base_info.supplier_id
            this.allusersvalue = Number(item.base_info.biz_user_id)
            this.paymentvalue = item.base_info.payment_type
            this.nodetxt = item.base_info.bill_memo
            }
            if(item.goods_info[0].code){
              this.tempdata = item.goods_info
            }
          })
          for(var i = 0;i<this.tempdata.length;i++){
            this.table.lists[i].code = this.tempdata[i].code
            this.table.lists[i].goods_id = this.tempdata[i].goods_id
            this.table.lists[i].name = this.tempdata[i].goods_name
            this.table.lists[i].spec = this.tempdata[i].spec
            this.table.lists[i].goods_count = parseFloat(this.tempdata[i].goods_count)
            this.table.lists[i].unit_id = this.tempdata[i].unit
            this.table.lists[i].goods_price = parseFloat(this.tempdata[i].goods_price)
            this.table.lists[i].goods_money = parseFloat(this.tempdata[i].goods_money)
            /*this.table.lists[i].tax_rate = parseFloat(this.tempdata[i].tax_rate)
            this.table.lists[i].tax = parseFloat(this.tempdata[i].tax)
            this.table.lists[i].money_with_tax = parseFloat(this.tempdata[i].money_with_tax)*/
            this.table.lists[i].memo = this.tempdata[i].memo
            if(i != this.tempdata.length-1){
              this.table.lists.push({
              name: "",
              goods_id: "",
              spec: "",
              goods_count: 0, //采购数量
              unit_id: "",
              goods_price: 0, //采购单价
              goods_money: 0, //采购总额
              /*tax_rate: 0.17, //税率
              tax: 0, //税金
              money_with_tax: 0, //价税合计*/
            });
            }
          }

          this.totalPrice=0,this.taxalPrice  = 0,this.taxtTotalMoney  = 0;
          this.table.lists.forEach((item, index) => {
          this.totalPrice += item.goods_money;
          this.taxalPrice += item.tax;
          this.taxtTotalMoney+=item.money_with_tax;
        })
        })
      },
        /*获取业务员列表*/
      getAllUsersinfo(){
        getUser({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.nickname
            this.alluserslist.push(temp)
          })
        })
      },
      /*获取组织机构列表*/
      getAllOrgsinfo(){
        getAllOrgs({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.orgslist.push(temp)
          })
        })
      },
      /*获取供应商列表*/
      getAllSupplierinfo(){
        getAllSupplier({
          ticket: this.$store.state.ticket
        }).then(res => {
          /*console.log(res)*/
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      },

      toEdit(){
        if(this.exchangedate == "" || this.exchangedate == null){
          this.$Message.info("请填写日期")
          return
        }
        if(this.suppliervalue == "" || this.suppliervalue == null){
          this.$Message.info("请选择供应商")
          return
        }
        if(this.allusersvalue == "" || this.allusersvalue == null){
          this.$Message.info("请选择业务员")
          return
        }
       /* if(this.paymentvalue == "" || this.paymentvalue == null){
          this.$Message.info("请选择付款方式")
          return
        }*/
         if(this.stockvalue == "" || this.stockvalue == null){
          this.$Message.info("请选择仓库")
          return
        }
        /*console.log(this.table.lists)*/
        if(this.exchangedate){
          var time = new Date(this.exchangedate)
          var month = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.exchangedate = time.getFullYear() + '-' + month + '-' + day
        }else{
          this.exchangedate = ""
        }
        this.table.lists.forEach((item, index) => {
          if(item.goods_count == 0){
            this.table.lists = ""
          }
        })
        this.allusersvalue = Number(this.allusersvalue)
        addStore({
          ticket: sessionStorage.getItem("ticket"),
          po_id: this.editid,
          biz_dt: this.exchangedate,
          supplier_id: this.suppliervalue,
          warehouse_id: this.stockvalue,
          biz_user_id: this.allusersvalue,
          payment_type: this.paymentvalue,
          bill_memo: this.nodetxt,
          store_list: this.table.lists
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('生成入库单成功')
            this.$router.push("/d/purchase-order")
          }
        })
      },
      showProduct: function(key) {
        this.tab_key = key;
        this.add_orders = true;
      },
      delInput(key) {
        if(key != 0) {
          this.table.lists.splice(key, 1);
          this.sumTotalPrice(key-1);
        }
      },
      addInput: function() {
        this.table.lists.push({
          goods_id: "",
          name: "",
          spec: "",
          goods_count: 0, //采购数量
          unit_id: "",
          goods_price: 0, //采购单价
          goods_money: 0, //采购总额
        });
      },
      getGoodsList() {
        getGoods({
          ticket: this.$store.state.ticket,
        }).then(res => {
          /*console.log(res)*/
          this.goods_list = res.data
          var num = 1
          this.goods_list.forEach((item, index) => {
            item.unmid = num++
          })
        })
      },
      appendTitle(currentRow) {
         for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_id == currentRow.id){
            this.$Message.info("不可选择重复商品")
            return
          }
        }

        this.table.lists[this.tab_key].goods_id = currentRow.id;
        this.table.lists[this.tab_key].code = currentRow.code;
        this.table.lists[this.tab_key].name = currentRow.name;
        this.table.lists[this.tab_key].spec = currentRow.spec;
        this.table.lists[this.tab_key].unit_id = currentRow.unit_name;
        this.add_orders = false;
      },
      sumTotalPrice(key){
        /*console.log(key)*/
        this.table.lists[key].goods_money =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price);

        this.totalPrice=0,this.taxalPrice  = 0,this.taxtTotalMoney  = 0;
        this.table.lists.forEach((item, index) => {
          this.totalPrice += item.goods_money;
          this.taxalPrice += item.tax;
          this.taxtTotalMoney+=item.money_with_tax;
        })
      }
    },
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getAllUsersinfo()
      this.getAllOrgsinfo()
      this.getAllSupplierinfo()
      this.getGoodsList()
      this.getPurchaseOrderinfo()
      this.getAllStocks()
    }
  }
</script>
<style>
  .ivu-table {
    width: inherit;
    height: auto;
    max-width: 100%;
    overflow: hidden;
    color: #495060;
    font-size: 12px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
input::-ms-input-placeholder {
    text-align: center;
  }

  input::-webkit-input-placeholder {
    text-align: center;
  }

  .Modal td {
    border-right: 1px solid #e9eaec;
  }

  .modea_input {
    width: 80%;
    text-align: center;
  }
</style>

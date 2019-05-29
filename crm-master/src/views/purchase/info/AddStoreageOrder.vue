<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      新建采购入库单
    </div>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">单号</Col>
        <Col span="16">{{purchaseStoreageObj.odd_number}}</Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>业务日期</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="请输入日期" v-model="purchaseStoreageObj.exchangedate" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>供应商</Col>
        <Col span="16">
        <Select v-model="purchaseStoreageObj.suppliervalue">
          <Option v-for="item in purchaseStoreageObj.supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>仓库</Col>
        <Col span="16">
        <Select v-model="purchaseStoreageObj.stockvalue">
          <Option v-for="item in purchaseStoreageObj.allstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>业务员</Col>
        <Col span="16">
        <Select v-model="purchaseStoreageObj.allusersvalue">
          <Option v-for="item in purchaseStoreageObj.alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="6" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>付款方式</Col>
        <Col span="18">
        <Select v-model="purchaseStoreageObj.paymentvalue">
          <Option v-for="item in purchaseStoreageObj.paymentlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="12">
      <Col span="2" style="text-align: center;">备注</Col>
      <Col span="22">
      <Input v-model="purchaseStoreageObj.nodetxt"></Input>
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
        <th style="width:220px;text-align:center;">
         <div class="ivu-table-cell">
          <span>商品选择</span>
         </div></th>
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
          <span>入库数量</span>
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
        <th class="">
         <div class="ivu-table-cell">
          <span>操作</span>
         </div></th>
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
          <td style="width:220px;">
            <i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
            <i-button type="ghost" icon="qr-scanner" v-on:click="showSan(key)">扫码入库</i-button>
            <input type="hidden" v-model="list.goods_id">
          </td>
          <td class="">{{list.code}}</td>
          <td class="">{{list.name}}</td>
          <td class="">{{list.spec}}</td>
          <td class="">
            <Input placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.goods_count'></Input>
          </td>
          <td class="">{{list.unit_id}}</td>
          <td class="">
            <Input placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.goods_price"></Input>
          </td>
          <td class="">
            {{list.goods_money | filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input' v-model='purchase_money'></Input>-->
          </td>
          <td class="">
            <Input placeholder="备注" class='modea_input' v-model="list.memo"></Input>
          </td>
          <td class="">
            <span v-on:click="addInput"><Icon type="android-add-circle" style='font-size:25px;margin-right:10px;' ></Icon></span>
            <span v-on:click="delInput(key)" v-if="key > 0"><Icon type="ios-trash" style='font-size:25px;'></Icon></span>
            <span v-else><Icon type="ios-trash-outline" style='font-size:25px;color: #ccc;'></Icon></span>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>

          </td>
          <td class=""></td>
          <td class=""></td>
          <td class="">
          </td>
          <td class=""></td>
          <td class=""></td>
          <td class="">采购合计：
          </td>
          <td class="">
            {{purchaseStoreageObj.totalPrice | filterByNumber}}
          </td>
         <!--  <td class=""></td>
         <td class="">
           {{taxalPrice | filterByNumber}}
         </td>
         <td class="">{{taxtTotalMoney| filterByNumber}}</td> -->
          <td class="">
          </td>
          <td class=""></td>
        </tr>
      </tbody>
    </table>
    <Modal v-model="add_orders" width="1000">
      <p slot="header" style="color:#2D8CF0;text-align:left">
        <span>选择商品</span>
      </p>
      <i-table border :columns="purchaseStoreageObj.goodsTitle" :data="purchaseStoreageObj.goods_list" height="400" :highlight-row="purchaseStoreageObj.hrow" @on-row-click="appendTitle"></i-table>
    </Modal>
  </div>
    </div>
   </div>
   </Row>
    <div style="margin-top:30px;">
      <Button type="primary" @click="toAdd">保存</Button>
      <Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
   </div>
   <Modal v-model="purchaseStoreageObj.scanmodal" width="700">
      <p slot="header" style="color:#2D8CF0;text-align:left;font-size:20px;">
        <span>扫描商品码</span>
      </p>
      <input @change="getGoodsInfo" style="width: 100%;height: 30px;line-height: 30px;border-radius: 5px;border: 1px solid #CCCCCC;" v-model="purchaseStoreageObj.scancode" type="" name="getfoucs" id="getfoucs" value=""  placeholder="请扫描商品码" autofocus/>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script type="text/javascript">
  import myTableHeader from '../myTableHeader'
  import myTableTbody from '../myTableTbody'
  import util from '../../../common/util'
  import objGroup from '../../../common/target'
  import { getAllUsers,addStore,getOneGoods,getZsmInfo,getGoods,getUser,getAllOrgs,getAllSupplier,getAllStock } from '../../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.purchaseStoreageObj = util.deepClone(objGroup.purchaseOrderObj)
      this.table.lists[0] = this.purchaseStoreageObj.storage_goods_obj
      this.purchaseStoreageObj.exchangedate = new Date()   /*日期默认值为当前日期*/
      this.purchaseStoreageObj.allusersvalue = Number(sessionStorage.getItem("user_id"))   /*业务员默认值为当前登录用户*/
      this.getGoodsList()
      this.getAllUsersinfo()
      this.getAllOrgsinfo()
      this.getAllSupplierinfo()
      this.getAllStocks()
    },
    data() {
      return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        purchaseStoreageObj: {},
        /*商品列表数据*/
        table: {
          lists: []
        },
        add_orders: false,
      }
    },
    /*过滤数据    保留两位小数*/
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
        /*获取商品列表*/
        getGoodsList(){
          getGoods({
            ticket: sessionStorage.getItem("ticket"),
          }).then(res => {
            this.purchaseStoreageObj.goods_list = res.data
            var num = 1
            this.purchaseStoreageObj.goods_list.forEach((item, index) => {
              item.unmid = num++
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
              this.purchaseStoreageObj.alluserslist.push(temp)
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
              this.purchaseStoreageObj.orgslist.push(temp)
            })
          })
        },
        /*获取供应商列表*/
        getAllSupplierinfo(){
          getAllSupplier({
            ticket: sessionStorage.getItem("ticket")
          }).then(res => {
            /*console.log(res)*/
            res.data.forEach((item,index) => {
              var temp = {}
              temp.value = item.id
              temp.label = item.name
              this.purchaseStoreageObj.supplierlist.push(temp)
            })
          })
        },
         /*获取仓库列表*/
        getAllStocks(){
          getAllStock({
            ticket: sessionStorage.getItem("ticket"),
          }).then(res => {
            res.data.forEach((item,index) => {
              let temp = {}
              temp.value = item.id
              temp.label = item.name
              this.purchaseStoreageObj.allstockslist.push(temp)
            })
          })
        },
         /*根据扫描得到的码获取商品信息*/
        getGoodsInfo(){
           var hell = this.purchaseStoreageObj.scancode.split('，').length
        if(hell > 1) {
          /*根据溯源码获取商品信息*/
          getZsmInfo({
            ticket: sessionStorage.getItem("ticket"),
            zsm: this.purchaseStoreageObj.scancode.split('，')[0],
            pzwh: this.purchaseStoreageObj.scancode.split('，')[2],
          }).then(res => {
            /*console.log(res)*/
            if(res.retcode == "2001" || !res.data) {
              this.$Message.info("没有该商品，请重新扫描!");
              this.purchaseStoreageObj.scancode = "";
              return;
            }
            /*判断返回的商品数据量*/
            if(res.data.length>1){
              this.add_orders = true;
              this.purchaseStoreageObj.goods_list = res.data;
              this.purchaseStoreageObj.scanmodal = false;
              return;
            }else if(res.data[0]){
              for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goods_id == res.data[0].id) {
                this.$Message.info("不可选择重复商品");
                this.purchaseStoreageObj.scancode = '';
                return;
              }
            }
              this.checkData(res.data[0]);
              return
            }
            for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goods_id == res.data.id) {
                this.$Message.info("不可选择重复商品");
                this.purchaseStoreageObj.scancode = '';
                return;
              }
            }
            this.checkData(res.data);
          })
           }else {
             getOneGoods({
                ticket: sessionStorage.getItem("ticket"),
                 bar_code: this.purchaseStoreageObj.scancode
             }).then(res => {
              if(!res.data){
                this.$Message.info("没有该商品，请重新扫描!")
                  this.purchaseStoreageObj.scancode = ""
                  return
              }
               for(var i=0;i<this.table.lists.length;i++){
               if(this.table.lists[i].goods_id == res.data.id){
                 this.$Message.info("不可选择重复商品")
                 this.purchaseStoreageObj.scancode = ""
                 return
                  }
                }
                this.checkData(res.data)
             })
           }
        },
        /*选择商品存到列表中*/
        checkData(obj){
          this.purchaseStoreageObj.storage_goods_obj.goods_id = obj.id;
          this.purchaseStoreageObj.storage_goods_obj.code = obj.code;
          this.purchaseStoreageObj.storage_goods_obj.name = obj.name;
          this.purchaseStoreageObj.storage_goods_obj.spec = obj.spec;
          this.purchaseStoreageObj.storage_goods_obj.unit_id = obj.unit_name;
          this.table.lists[this.purchaseStoreageObj.tab_key] = util.deepClone(this.purchaseStoreageObj.storage_goods_obj)
          this.purchaseStoreageObj.scancode = ""
          this.purchaseStoreageObj.scanmodal = false;
          this.purchaseStoreageObj.tab_key ++
        },
        /*显示扫码弹框*/
        showSan(key){
          this.purchaseStoreageObj.scanmodal = true
          this.purchaseStoreageObj.scancode = ""
          this.purchaseStoreageObj.tab_key = key
          this.getFoucs()
        },
        /*扫码框获取焦点*/
        getFoucs() {
        setTimeout(function(){document.querySelector('#getfoucs').focus();}, 30);
        },
      /*取消*/
      escquit(){
        window.history.back()
      },
      /*添加提交*/
      toAdd(){
        if(this.purchaseStoreageObj.exchangedate == "" || this.purchaseStoreageObj.exchangedate == null){
          this.$Message.info("请填写日期")
          return
        }
        if(this.purchaseStoreageObj.suppliervalue == "" || this.purchaseStoreageObj.suppliervalue == null){
          this.$Message.info("请选择供应商")
          return
        }
        if(this.purchaseStoreageObj.allusersvalue == "" || this.purchaseStoreageObj.allusersvalue == null){
          this.$Message.info("请选择业务员")
          return
        }
       /* if(this.paymentvalue == "" || this.paymentvalue == null){
          this.$Message.info("请选择付款方式")
          return
        }*/
        if(this.purchaseStoreageObj.stockvalue == "" || this.purchaseStoreageObj.stockvalue == null){
          this.$Message.info("请选择仓库")
          return
        }
        for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_count == "" || this.table.lists[i].goods_count == 0){
            this.$Message.info("请选择入库数量")
            return
          }
          }
          for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_price == "" || this.table.lists[i].goods_price == 0){
            this.$Message.info("请选择采购单价")
            return
          }
          }
        if(this.purchaseStoreageObj.exchangedate){
          var time = new Date(this.purchaseStoreageObj.exchangedate)
          var month = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.purchaseStoreageObj.exchangedate = time.getFullYear() + '-' + month + '-' + day
        }else{
          this.purchaseStoreageObj.exchangedate = ""
        }
        this.table.lists.forEach((item, index) => {
          if(item.goods_count == 0){
            this.table.lists = ""
          }
        })
        this.purchaseStoreageObj.allusersvalue = Number(this.purchaseStoreageObj.allusersvalue)
        addStore({
          ticket: sessionStorage.getItem("ticket"),
          po_id: "",
          biz_dt: this.purchaseStoreageObj.exchangedate,
          supplier_id: this.purchaseStoreageObj.suppliervalue,
          warehouse_id: this.purchaseStoreageObj.stockvalue,
          biz_user_id: this.purchaseStoreageObj.allusersvalue,
          payment_type: this.purchaseStoreageObj.paymentvalue,
          bill_memo: this.purchaseStoreageObj.nodetxt,
          store_list: this.table.lists
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('新建采购订单成功')
            this.$router.push("/d/purchase-storage")
          }else{
            return
          }
        })
      },
      /*显示商品列表模态框*/
      showProduct: function(key) {
        this.purchaseStoreageObj.tab_key = key;
        this.add_orders = true;
        this.getGoodsList()
      },
      /*删除一行*/
      delInput(key) {
        if(key != 0) {
          this.table.lists.splice(key, 1);
          this.sumTotalPrice(key-1);
        }
      },
      /*增加一行 */
      addInput: function() {
        this.table.lists.push({
          goods_id: "",
          name: "",
          spec: "",
          goods_count: 0, //采购数量
          unit_id: "",
          goods_price: 0, //采购单价
          goods_money: 0, //采购总额
          /*tax_rate: 0.17, //税率
          tax: 0, //税金
          money_with_tax: 0, //价税合计*/
        });
      },
      /*将选中商品数据填充到当前行*/
      appendTitle(currentRow) {
        for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_id == currentRow.id){
            this.$Message.info("不可选择重复商品")
            return
          }
        }
        this.purchaseStoreageObj.storage_goods_obj.goods_id = currentRow.id;
        this.purchaseStoreageObj.storage_goods_obj.code = currentRow.code;
        this.purchaseStoreageObj.storage_goods_obj.name = currentRow.name;
        this.purchaseStoreageObj.storage_goods_obj.spec = currentRow.spec;
        this.purchaseStoreageObj.storage_goods_obj.unit_id = currentRow.unit_name;
        this.table.lists[this.purchaseStoreageObj.tab_key] = util.deepClone(this.purchaseStoreageObj.storage_goods_obj)
        this.add_orders = false;
      },
      /*计算商品数据合计*/
      sumTotalPrice(key){
        this.table.lists[key].goods_money =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price);
       /* this.table.lists[key].tax =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price)*0.17;

        this.table.lists[key].money_with_tax =  this.table.lists[key].goods_money + this.table.lists[key].tax;*/

        this.purchaseStoreageObj.totalPrice=0,this.purchaseStoreageObj.taxalPrice  = 0,this.purchaseStoreageObj.taxtTotalMoney  = 0;
        this.table.lists.forEach((item, index) => {
          this.purchaseStoreageObj.totalPrice += item.goods_money;
         /* this.taxalPrice += item.tax;
          this.taxtTotalMoney+=item.money_with_tax;*/
        })
      }
    },
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

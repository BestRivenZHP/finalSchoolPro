<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      编辑采购订单
    </div>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;">单号</Col>
        <Col span="16">{{purchaseOrderObj.odd_number}}</Col>
        <input type="hidden" name="" v-model="purchaseOrderObj.editid">
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>交货日期</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="请输入日期" v-model="purchaseOrderObj.exchangedate" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>供应商</Col>
        <Col span="16">
        <Select v-model="purchaseOrderObj.suppliervalue">
          <Option v-for="item in purchaseOrderObj.supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>交货地址</Col>
        <Col span="16">
        <Input v-model="purchaseOrderObj.exchangearea"></Input>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="6" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>联系人</Col>
        <Col span="18">
        <Input v-model="purchaseOrderObj.contactman"></Input>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>电话</Col>
        <Col span="16">
        <Input v-model="purchaseOrderObj.tel"></Input>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>传真</Col>
        <Col span="16">
        <Input v-model="purchaseOrderObj.fax"></Input>
        </Col>
      </Row>
      </Col>
      <!-- <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>组织机构</Col>
        <Col span="16">
        <Select v-model="orgsvalue">
          <Option v-for="item in orgslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col> -->
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>业务员</Col>
        <Col span="16">
        <Select v-model="purchaseOrderObj.allusersvalue">
          <Option v-for="item in purchaseOrderObj.alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="4">
      <Row>
        <Col span="8" style="text-align: center;"><span style="color:red;font-size:16px;">*</span>付款方式</Col>
        <Col span="16">
        <Select v-model="purchaseOrderObj.paymentvalue">
          <Option v-for="item in purchaseOrderObj.paymentlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;line-height: 32px;">
      <Col span="16">
      <Col span="2" style="text-align: center;">备注</Col>
      <Col span="22">
      <Input v-model="purchaseOrderObj.nodetxt"></Input>
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
          <span>税率(%)</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>税金</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>价税合计</span>
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
          <td class="">{{ list.tax_rate }}</td>
          <td class="">
            {{list.tax|filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input'></Input>-->
          <!--  {{list.purchase_number*list.purchase_price*0.17|filterByNumber}}-->
          </td>
          <td class="">
            {{list.money_with_tax|filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input'></Input>-->
            <!--{{list.purchase_number*list.purchase_price+list.purchase_number*list.purchase_price*0.17|filterByNumber}}-->
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
            {{purchaseOrderObj.totalPrice | filterByNumber}}
          </td>
          <td class=""></td>
          <td class="">
            {{purchaseOrderObj.taxalPrice | filterByNumber}}
          </td>
          <td class="">{{purchaseOrderObj.taxtTotalMoney| filterByNumber}}</td>
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
      <i-table border :columns="purchaseOrderObj.goodsTitle" :data="purchaseOrderObj.goods_list" height="400" :highlight-row="purchaseOrderObj.hrow" @on-row-click="appendTitle"></i-table>
    </Modal>
  </div>
    </div>
   </div>
   </Row>
    <div style="margin-top:30px;">
      <Button type="primary" @click="toEdit">保存</Button>
      <Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
   </div>
   <Modal v-model="purchaseOrderObj.scanmodal" width="700">
      <p slot="header" style="color:#2D8CF0;text-align:left;font-size:20px;">
        <span>扫描商品码</span>
      </p>
      <input @change="getGoodsInfo" style="width: 100%;height: 30px;line-height: 30px;border-radius: 5px;border: 1px solid #CCCCCC;" v-model="purchaseOrderObj.scancode" type="" name="getfoucs" id="getfoucs" value=""  placeholder="请扫描商品码" autofocus/>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script type="text/javascript">
  import myTableHeader from '../myTableHeader'
  import myTableTbody from '../myTableTbody'
  import util from '../../../common/util'
  import objGroup from '../../../common/target.js'
  import { addPurchaseOrder,getPurchaseOrderList,getOneGoods,getZsmInfo,getGoods,getUser,getAllOrgs,getAllSupplier } from '../../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.purchaseOrderObj =  util.deepClone(objGroup.purchaseOrderObj)
      this.table.lists[0] = util.deepClone(this.purchaseOrderObj.goods_obj);
      this.purchaseOrderObj.exchangedate = new Date()
      this.purchaseOrderObj.allusersvalue = Number(sessionStorage.getItem("user_id"))
      this.getPurchaseOrderinfo()
      this.getGoodsList()
      this.getAllUsersinfo()
      this.getAllOrgsinfo()
      this.getAllSupplierinfo()
    },
    data() {
      return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
              },
        purchaseOrderObj: {},
        table: {
          lists: []
        },
        add_orders: false,
      }
    },
    /*过滤数据  保留两位小数*/
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
            this.purchaseOrderObj.goods_list = res.data
            var num = 1
            this.purchaseOrderObj.goods_list.forEach((item, index) => {
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
              this.purchaseOrderObj.alluserslist.push(temp)
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
              this.purchaseOrderObj.orgslist.push(temp)
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
              this.purchaseOrderObj.supplierlist.push(temp)
            })
          })
        },
         /*根据扫描得到的码获取商品信息*/
        getGoodsInfo(){
        var hell = this.purchaseOrderObj.scancode.split('，').length
        if(hell > 1) {
          /*根据追溯码获取商品信息*/
          getZsmInfo({
            ticket: sessionStorage.getItem("ticket"),
            zsm: this.purchaseOrderObj.scancode.split('，')[0],
            pzwh: this.purchaseOrderObj.scancode.split('，')[2],
          }).then(res => {
            /*console.log(res)*/
            if(res.retcode == "2001" || !res.data) {
              this.$Message.info("没有该商品，请重新扫描!");
              this.purchaseOrderObj.scancode = "";
              return;
            }
            /*判断数据返回量*/
            if(res.data.length>1){
              this.add_orders = true;
              this.purchaseOrderObj.goods_list = res.data;
              this.purchaseOrderObj.scanmodal = false;
              return;
            }else if(res.data[0]){
              for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goods_id == res.data[0].id) {
                this.$Message.info("不可选择重复商品");
                this.purchaseOrderObj.scancode = '';
                return;
              }
            }
              this.checkData(res.data[0]);
              return
            }
            for(var i = 0; i < this.table.lists.length; i++) {
              if(this.table.lists[i].goods_id == res.data.id) {
                this.$Message.info("不可选择重复商品");
                this.purchaseOrderObj.scancode = '';
                return;
              }
            }
            this.checkData(res.data);
          })
           }else {
            /*根据二维码获取商品数据*/
             getOneGoods({
              ticket: sessionStorage.getItem("ticket"),
                 bar_code: this.purchaseOrderObj.scancode
             }).then(res => {
              if(!res.data){
                this.$Message.info("没有该商品，请重新扫描!")
                  this.purchaseOrderObj.scancode = ""
                  return
              }
               for(var i=0;i<this.table.lists.length;i++){
               if(this.table.lists[i].goods_id == res.data.id){
                 this.$Message.info("不可选择重复商品")
                 this.purchaseOrderObj.scancode = ""
                 return
                  }
                }
                this.checkData(res.data);
             })
           }

        },
        /*将获取到的商品数据保存到商品列表中*/
        checkData(obj){
          this.purchaseOrderObj.goods_obj.goods_id = obj.id;
          this.purchaseOrderObj.goods_obj.goods_price = obj.sale_price;
          this.purchaseOrderObj.goods_obj.code = obj.code;
          this.purchaseOrderObj.goods_obj.name = obj.name;
          this.purchaseOrderObj.goods_obj.spec = obj.spec;
          this.purchaseOrderObj.goods_obj.unit_id = obj.unit_name;
          this.table.lists[this.purchaseOrderObj.tab_key] = util.deepClone(this.purchaseOrderObj.goods_obj)
          this.purchaseOrderObj.scancode = ""
          this.purchaseOrderObj.scanmodal = false;
          this.purchaseOrderObj.tab_key ++
        },
        /*显示扫码弹框*/
        showSan(key){
          this.purchaseOrderObj.tab_key = key
          this.purchaseOrderObj.scanmodal = true
          this.purchaseOrderObj.scancode = ""
          this.getFoucs()
        },
        /*扫码框自动获得焦点*/
        getFoucs() {
        setTimeout(function(){document.querySelector('#getfoucs').focus();}, 30);
        },

         /*验证手机号*/
        regtel(){
          var telreg = /^1[3|4|5|7|8][0-9]{9}$/;
          if(this.purchaseOrderObj.tel == "" || this.purchaseOrderObj.tel == null){
          this.$Message.info("请填写电话")
          return
        }
          if(!telreg.test(this.purchaseOrderObj.tel)) {
          this.$Message.info('请输入正确的手机号码')
          return;
        }
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
          /*console.log(this.$route.params.ref)*/
          var num = 1
          res.data.forEach((item,index) => {
            /*if(item.goods_info.goods_id){
            this.table.lists[index] = item.goods_info[index]
            }*/
            if(item.base_info){
            this.purchaseOrderObj.editid = item.base_info.id
            this.purchaseOrderObj.odd_number = item.base_info.ref
            this.purchaseOrderObj.exchangedate = item.base_info.deal_date
            this.purchaseOrderObj.suppliervalue = item.base_info.supplier_id
            this.purchaseOrderObj.exchangearea = item.base_info.deal_address
            this.purchaseOrderObj.contactman = item.base_info.contact01
            this.purchaseOrderObj.tel = item.base_info.tel01
            this.purchaseOrderObj.fax = item.base_info.fax
            this.purchaseOrderObj.orgsvalue = item.base_info.org_id
            this.purchaseOrderObj.allusersvalue = Number(item.base_info.biz_user_id)
            this.purchaseOrderObj.paymentvalue = item.base_info.payment_type
            this.purchaseOrderObj.nodetxt = item.base_info.bill_memo
            }
            /*console.log(res)*/
            if(item.goods_info){
              this.tempdata = item.goods_info
            }
          })

          for(var i = 0;i<this.tempdata.length;i++){
            this.purchaseOrderObj.goods_obj.code = this.tempdata[i].code
            this.purchaseOrderObj.goods_obj.goods_id = this.tempdata[i].goods_id
            this.purchaseOrderObj.goods_obj.name = this.tempdata[i].goods_name
            this.purchaseOrderObj.goods_obj.spec = this.tempdata[i].spec
            this.purchaseOrderObj.goods_obj.goods_count = parseFloat(this.tempdata[i].goods_count)
            this.purchaseOrderObj.goods_obj.unit_id = this.tempdata[i].unit
            this.purchaseOrderObj.goods_obj.goods_price = parseFloat(this.tempdata[i].goods_price)
            this.purchaseOrderObj.goods_obj.goods_money = parseFloat(this.tempdata[i].goods_money)
            this.purchaseOrderObj.goods_obj.tax_rate = parseFloat(this.tempdata[i].tax_rate)
            this.purchaseOrderObj.goods_obj.tax = parseFloat(this.tempdata[i].tax)
            this.purchaseOrderObj.goods_obj.money_with_tax = parseFloat(this.tempdata[i].money_with_tax)
            this.purchaseOrderObj.goods_obj.memo = this.tempdata[i].memo
            this.table.lists[i] = util.deepClone(this.purchaseOrderObj.goods_obj)

            if(i != this.tempdata.length-1){
              this.table.lists.push({
              goods_id: "",
              name: "",
              spec: "",
              goods_count: 0, //采购数量
              unit_id: "",
              goods_price: 0, //采购单价
              goods_money: 0, //采购总额
              tax_rate: 0.17, //税率
              tax: 0, //税金
              money_with_tax: 0, //价税合计
            });
            }
          }
          /*console.log( this.table.lists )*/
          this.purchaseOrderObj.totalPrice = 0,this.purchaseOrderObj.taxalPrice  = 0,this.purchaseOrderObj.taxtTotalMoney  = 0;
          this.table.lists.forEach((item, index) => {
          this.purchaseOrderObj.totalPrice += item.goods_money;
          this.purchaseOrderObj.taxalPrice += item.tax;
          this.purchaseOrderObj.taxtTotalMoney+=item.money_with_tax;
        })
        })
      },

      /*保存编辑*/
      toEdit(){
        /*console.log(this.table.lists)*/
        if(this.purchaseOrderObj.exchangedate == "" || this.purchaseOrderObj.exchangedate == null){
          this.$Message.info("请填写日期")
          return
        }
        if(this.purchaseOrderObj.suppliervalue == "" || this.purchaseOrderObj.suppliervalue == null){
          this.$Message.info("请选择供应商")
          return
        }
        if(this.purchaseOrderObj.exchangearea == "" || this.purchaseOrderObj.exchangearea == null){
          this.$Message.info("请填写地址")
          return
        }
        if(this.purchaseOrderObj.contactman == "" || this.purchaseOrderObj.contactman == null){
          this.$Message.info("请填写联系人")
          return
        }
        if(this.purchaseOrderObj.tel == "" || this.purchaseOrderObj.tel == null){
          this.$Message.info("请填写电话")
          return
        }else if(!(/^1[3|4|5|7|8][0-9]{9}$/).test(this.purchaseOrderObj.tel)){
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        if(this.purchaseOrderObj.fax == "" || this.purchaseOrderObj.fax == null){
          this.$Message.info("请填写传真")
          return
        }
        this.purchaseOrderObj.orgsvalue = ""
        if(this.purchaseOrderObj.allusersvalue == "" || this.purchaseOrderObj.allusersvalue == null){
          this.$Message.info("请选择业务员")
          return
        }

        for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_count == "" || this.table.lists[i].goods_count == 0){
            this.$Message.info("请选择采购数量")
            return
          }
          }
        for(var i=0;i<this.table.lists.length;i++){
        if(this.table.lists[i].goods_price == "" || this.table.lists[i].goods_price == 0){
          this.$Message.info("请选择采购单价")
          return
        }
        }
       /* if(this.paymentvalue == "" || this.paymentvalue == null){
          this.$Message.info("请选择付款方式")
          return
        }*/

        if(this.purchaseOrderObj.exchangedate){
          var time = new Date(this.purchaseOrderObj.exchangedate)
          var month = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.purchaseOrderObj.exchangedate = time.getFullYear() + '-' + month + '-' + day
        }else{
          this.purchaseOrderObj.exchangedate = ""
        }
        this.table.lists.forEach((item, index) => {
          if(item.goods_count == 0){
            this.table.lists = ""
          }
        })
        addPurchaseOrder({
          ticket: sessionStorage.getItem("ticket"),
          id: this.purchaseOrderObj.editid,
          deal_date: this.purchaseOrderObj.exchangedate,
          supplier_id: this.purchaseOrderObj.suppliervalue,
          deal_address: this.purchaseOrderObj.exchangearea,
          contact: this.purchaseOrderObj.contactman,
          tel: this.purchaseOrderObj.tel,
          fax: this.purchaseOrderObj.fax,
          org_id: this.purchaseOrderObj.orgsvalue,
          biz_user_id: this.purchaseOrderObj.allusersvalue,
          payment_type: this.purchaseOrderObj.paymentvalue,
          bill_memo: this.purchaseOrderObj.nodetxt,
          goods_list: this.table.lists,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改采购订单成功')
            this.$router.push("/d/purchase-order")
          }
        })
      },
      /*展示商品列表*/
      showProduct: function(key) {
        this.purchaseOrderObj.tab_key = key;
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
      /*添加一行*/
      addInput: function() {
        this.table.lists.push({
          goods_id: "",
          name: "",
          spec: "",
          goods_count: 0, //采购数量
          unit_id: "",
          goods_price: 0, //采购单价
          goods_money: 0, //采购总额
          tax_rate: 0.17, //税率
          tax: 0, //税金
          money_with_tax: 0, //价税合计
        });
      },
      /*选择一行商品数据填充到当前表格内*/
      appendTitle(currentRow) {
         for(var i=0;i<this.table.lists.length;i++){
          if(this.table.lists[i].goods_id == currentRow.id){
            this.$Message.info("不可选择重复商品")
            return
          }
        }
        this.purchaseOrderObj.goods_obj.goods_id = currentRow.id;
        this.purchaseOrderObj.goods_obj.code = currentRow.code;
        this.purchaseOrderObj.goods_obj.name = currentRow.name;
        this.purchaseOrderObj.goods_obj.spec = currentRow.spec;
        this.purchaseOrderObj.goods_obj.unit_id = currentRow.unit_name;
        this.table.lists[this.purchaseOrderObj.tab_key] = util.deepClone(this.purchaseOrderObj.goods_obj)
        this.add_orders = false;
      },
      /*计算商品数据合计*/
      sumTotalPrice(key){
        /*console.log(key)*/
        this.table.lists[key].goods_money =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price);
        this.table.lists[key].tax =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price)*0.17;

        this.table.lists[key].money_with_tax =  this.table.lists[key].goods_money + this.table.lists[key].tax;

        this.purchaseOrderObj.totalPrice=0,this.purchaseOrderObj.taxalPrice  = 0,this.purchaseOrderObj.taxtTotalMoney  = 0;
        this.table.lists.forEach((item, index) => {
          this.purchaseOrderObj.totalPrice += item.goods_money;
          this.purchaseOrderObj.taxalPrice += item.tax;
          this.purchaseOrderObj.taxtTotalMoney+=item.money_with_tax;
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

<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			新建调拨单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">单号</Col>
				<Col span="18">{{odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">业务日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				 <Col span="8" class="from-text">调出仓库</Col>
        <Col span="16">
        <Select v-model="outstockvalue">
          <Option v-for="item in alloutstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				 <Col span="8" class="from-text">调入仓库</Col>
        <Col span="16">
        <Select v-model="instockvalue">
          <Option v-for="item in allinstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        <th class="">
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
          <span>调拨数量</span>
         </div></th>
        <th class="">
         <div class="ivu-table-cell">
          <span>单位</span>
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
          <td>
            <i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
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
            <span v-on:click="addInput"><Icon type="android-add-circle" style='font-size:25px;margin-right:10px;' ></Icon></span>
            <span v-on:click="delInput(key)" v-if="key > 0"><Icon type="ios-trash" style='font-size:25px;'></Icon></span>
            <span v-else><Icon type="ios-trash-outline" style='font-size:25px;color: #ccc;'></Icon></span>
          </td>
        </tr>
<!--         <tr>
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
    {{totalPrice | filterByNumber}}
  </td>
  <td class=""></td>
  <td class="">
    {{taxalPrice | filterByNumber}}
  </td>
  <td class="">{{taxtTotalMoney| filterByNumber}}</td>
  <td class="">
  </td>
  <td class=""></td>
</tr> -->
      </tbody>
    </table>
    <Modal v-model="add_orders" width="1000">
      <p slot="header" style="color:#2D8CF0;text-align:left">
        <span>选择商品</span>
      </p>
      <i-table border :columns="goodsTitle" :data="goods_list" height="400" :highlight-row="hrow" @on-row-click="appendTitle"></i-table>
    </Modal>
    <div style="margin-top:30px;">
      <Button type="primary" @click="toAdd">保存</Button>
      <Button type="primary" style="margin-left:30px;" @click="escquit">取消</Button>
   </div>
  </div>
    </div>
   </div>
   </Row>
  </div>
</template>

<script>
  import { getAllStock,getAllUsers,getAllOrgs,getAllSupplier,getGoods,addPurchaseOrder } from '../../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getAllStocks()
      this.getAllUsersinfo()
      this.getGoodsList()
    },
    data() {
      return {
        options: {
                   disabledDate (date) {
                       return date && date.valueOf() > Date.now();
                   }
               },
        add_orders: false,
        goods_list: [],
        goodsTitle: [{
            title: '商品编码',
            key: 'code',
            align: "center",
          },
          {
            title: '商品',
            key: 'name',
            align: "center",
          },
          {
            title: '规格型号',
            key: 'spec',
            align: "center",
          },
          {
            title: '单位',
            key: 'unit_name',
            align: "center",
          },
          {
            title: '建议采购价',
            key: 'purchase_price',
            align: "center",
          },
          {
            title: '备注',
            key: 'memo',
            align: "center",
          }
        ],
        hrow: true,
        checkVriable: 0,
        totalPrice:0,
        taxalPrice:0,
        taxtTotalMoney:0,
        tab_key: 0,
        taxation:0,
         table: {
          lists: [{
            goods_id: '',
            code: "",
            name: "",
            spec: "",
            goods_count: 0, //采购数量
            unit_id: "",
          }]
        },
        outstockvalue: "",
        alloutstockslist: [],
        instockvalue: "",
        allinstockslist: [],
        allusersvalue: "",
        alluserslist: [],
        odd_number: '保存后自动生成',
        data5: [],
        columns5: [{
          title: '序号',
          align: "center",
          key: 'date',
        }, {
          title: '商品编码',
          align: "center",
          key: 'name'
        }, {
          title: '商品名称',
          align: "center",
          key: 'age',
        }, {
          title: '规格型号',
          align: "center",
          key: 'address'
        }, {
          title: '调拨数量',
          align: "center",
          key: 'address'
        }, {
          title: '单位',
          align: "center",
          key: 'address'
        }, {
          title: '操作',
          align: "center",
          key: 'address'
        }],
      }
    },
    filters:{
      filterByNumber(value){
        return isNaN(value)?'':value.toFixed(2);
      }
    },
    methods:{
      toAdd(){},
      escquit(){
        window.history.back()
      },
      datelink(currentRow){

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
            this.allinstockslist.push(temp)
            this.alloutstockslist.push(temp)
          })
        })
      },
        /*获取业务员列表*/
      getAllUsersinfo(){
        getAllUsers({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.alluserslist.push(temp)
          })
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
          tax_rate: 0.17, //税率
          tax: 0, //税金
          money_with_tax: 0, //价税合计
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
        this.table.lists[key].tax =
        parseFloat(this.table.lists[key].goods_count) * parseFloat(this.table.lists[key].goods_price)*0.17;

        this.table.lists[key].money_with_tax =  this.table.lists[key].goods_money + this.table.lists[key].tax;

        this.totalPrice=0,this.taxalPrice  = 0,this.taxtTotalMoney  = 0;
        this.table.lists.forEach((item, index) => {
          this.totalPrice += item.goods_money;
          this.taxalPrice += item.tax;
          this.taxtTotalMoney+=item.money_with_tax;
        })
      }
    },
	}
</script>

<style>
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

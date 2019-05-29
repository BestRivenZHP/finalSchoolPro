<template>
  <div class='Modal'>
    <table cellspacing="0" cellpadding="0">
      <tbody>
        <tr class='tr_parent_trash' v-for="(list, key) in table.lists">
          <td>{{key+1}}</td>
          <td>
            <i-button type="ghost" icon="ios-search" v-on:click="showProduct(key)">选择商品</i-button>
          </td>
          <td class="">{{list.code}}</td>
          <td class="">{{list.name}}</td>
          <td class="">{{list.spec}}</td>
          <td class="">
            <Input placeholder="数量" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model='list.purchase_number'></Input>
          </td>
          <td class="">{{list.unit_name}}</td>
          <td class="">
            <Input placeholder="单价" class='modea_input' @on-keyup="sumTotalPrice(key)" v-model="list.purchase_price"></Input>
          </td>
          <td class="">
            {{list.purchase_money | filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input' v-model='purchase_money'></Input>-->
          </td>
          <td class="">{{ list.tax_rate }}</td>
          <td class="">
            {{list.taxation|filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input'></Input>-->
          <!--  {{list.purchase_number*list.purchase_price*0.17|filterByNumber}}-->
          </td>
          <td class="">
            {{list.total_money|filterByNumber}}
            <!--<Input placeholder="0.00" class='modea_input'></Input>-->
            <!--{{list.purchase_number*list.purchase_price+list.purchase_number*list.purchase_price*0.17|filterByNumber}}-->
          </td>
          <td class="">
            <Input placeholder="备注" class='modea_input' v-model="list.note"></Input>
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
      <Button type="primary" @click="toAdd">保存</Button>
      <Button type="primary" style="margin-left:30px;">取消</Button>
   </div>
  </div>

</template>
<style type="text/css">
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
<script type="text/javascript">
  import { getGoods } from '../../api/api'
  export default {
    mounted() {
      this.getGoodsList();
    },
    data() {
      return {
        hrow: true,
        checkVriable: 0,
        totalPrice:0,
        taxalPrice:0,
        taxtTotalMoney:0,
        goodsTitle: [{
            title: '商品编码',
            key: 'code',
            sortable: true
          },
          {
            title: '商品',
            key: 'name'
          },
          {
            title: '规格型号',
            key: 'spec',
            sortable: true
          },
          {
            title: '单位',
            key: 'unit_name'
          },
          {
            title: '建议采购价',
            key: 'purchase_price'
          },
          {
            title: '备注',
            key: 'memo'
          }
        ],
        table: {
          lists: [{
            code: "",
            name: "",
            spec: "",
            purchase_number: 0, //采购数量
            unit_name: "",
            purchase_price: 0, //采购单价
            purchase_money: 0, //采购总额
            tax_rate: 0.17, //税率
            taxation: 0, //税金
            total_money: 0, //价税合计
            note: '', //备注
          }]
        },
        add_orders: false,
        goods_list: [],
        tab_key: 0,
        taxation:0,
      }
    },
    filters:{
      filterByNumber(value){
        return isNaN(value)?'':value.toFixed(2);
      }
    },
    methods: {
      toAdd(){
        console.log(this.table.lists)
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
          name: "",
          spec: "",
          purchase_number: 0, //采购数量
          unit_name: "",
          purchase_price: 0, //采购单价
          purchase_money: 0, //采购总额
          tax_rate: 0.17, //税率
          taxation: 0, //税金
          total_money: 0, //价税合计
        });
      },
      getGoodsList() {
        getGoods({
          company_id: '4D74E1E4-A129-11E4-9B6A-782BCBD7746B',
        }).then(res => {
          this.goods_list = res.data
          var num = 1
          this.goods_list.forEach((item, index) => {
            item.unmid = num++
          })
        })
      },
      appendTitle(currentRow) {
        this.table.lists[this.tab_key].code = currentRow.code;
        this.table.lists[this.tab_key].name = currentRow.name;
        this.table.lists[this.tab_key].spec = currentRow.spec;
        this.table.lists[this.tab_key].unit_name = currentRow.unit_name;
        this.add_orders = false;
      },
      sumTotalPrice(key){
        /*console.log(key)*/
        this.table.lists[key].purchase_money =
        parseFloat(this.table.lists[key].purchase_number) * parseFloat(this.table.lists[key].purchase_price);
        this.table.lists[key].taxation =
        parseFloat(this.table.lists[key].purchase_number) * parseFloat(this.table.lists[key].purchase_price)*0.17;

        this.table.lists[key].total_money =  this.table.lists[key].purchase_money + this.table.lists[key].taxation;

        this.totalPrice=0,this.taxalPrice  = 0,this.taxtTotalMoney  = 0;
        this.table.lists.forEach((item, index) => {
          this.totalPrice += item.purchase_money;
          this.taxalPrice += item.taxation;
          this.taxtTotalMoney+=item.total_money;
        })
      }
    }
  }
</script>

<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			数据概览
		</div>
		<div>
			<ul class="file_data">
				<li>
					<div class="file_data_left"><img src="../../assets/file_one.png" alt="" /></div>
					<div class="file_data_right">
						<p><span  class="file_data_num">{{AllCustomerSales|filterNumber}}</span></p>
						<p>销售总额</p>
					</div>
				</li>
				<li>
					<div class="file_data_left"><img src="../../assets/file_two.png" alt="" /></div>
					<div class="file_data_right">
						<p class=""><span class="file_data_num">{{AllGoodsNum|filterNumber}}</span></p>
						<p>库存总额</p>
					</div>
				</li>
				<li>
					<div class="file_data_left"><img src="../../assets/file_three.png" alt="" /></div>
					<div class="file_data_right">
						<p><span class="file_data_num">{{AllCommodityInventory|filterNumber}}</span></p>
						<p>采购总额</p>
					</div>
				</li>
				<!-- <li>
          <div class="file_data_left"><img src="../../assets/file_four.png" alt="" /></div>
          <div class="file_data_right">
            <p><span class="file_data_num">{{balanceMoney_shou|filterNumber}}</span></p>
            <p>应收账款</p>
          </div>
        </li> -->
			<!--   <li>
        <div class="file_data_left"><img src="../../assets/file_five.png" alt="" /></div>
        <div class="file_data_right">
          <p class="file_data_num"><span class="file_data_num">{{balanceMoney_fu|filterNumber}}</span></p>
          <p>应付账款</p>
        </div>
      </li> -->
			</ul>
		</div>
		<div style="height: 1px;"></div>
		<div>
			<Tabs value="sale">
				<TabPane label="销售看板" name="sale" style='padding-top: 20px;'>
					<el-table
      :data="AllCustomerSalesMsg"
      style="width: 100%">
      <el-table-column
        label="商家"
        >
			<template slot-scope="scope">{{ scope.row.name }}</template>

       </el-table-column>
      <el-table-column
        prop="bb"
        label="商品名"
        >
				<template slot-scope="scope">{{ scope.row.goodInformation.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="cc"
        label="商品价格">
				<template slot-scope="scope">{{ scope.row.goodInformation.priceGoods }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="销售数量">
					<template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="订单时间">
				<template slot-scope="scope">{{ scope.row.time | FormatDate('yyyy-MM-dd-HH:mm:ss') }}</template>
      </el-table-column>
    </el-table>
				</TabPane>



				<TabPane label="库存看板" name="stock" style='padding-top: 20px;'>
						<el-table
      :data="AllGoodsMsg"
      style="width: 100%">
      <el-table-column
        prop="bb"
        label="商品名"
        >
				<template slot-scope="scope">{{ scope.row.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="cc"
        label="商品编码">
				<template slot-scope="scope">{{ scope.row.goodCode }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="商品类别">
					<template slot-scope="scope">{{ scope.row.goodKind }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="商品数量">
				<template slot-scope="scope">{{ scope.row.goodNum }}</template>
      </el-table-column>
					 <el-table-column
        prop="cc"
        label="商品价格">
				<template slot-scope="scope">{{ scope.row.priceGoods  }}</template>
      </el-table-column>
			   </el-table-column>
					 <el-table-column
        prop="cc"
        label="计量单位">
				<template slot-scope="scope">{{ scope.row.unitOfMeasurement  }}</template>
      </el-table-column>
    </el-table>
				</TabPane>



				<TabPane label="采购看板" name="purchase" style='padding-top: 20px;'>
						<el-table
      :data="AllCommodityInventoryMsg"
      style="width: 100%">
      <el-table-column
        prop="bb"
        label="商品名"
        >
				<template slot-scope="scope">{{ scope.row.g.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="cc"
        label="入库价格">
				<template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
			  <el-table-column
        prop="cc"
        label="入库数量">
				<template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="入库总额">
					<template slot-scope="scope">{{ scope.row.allCommodityInventory }}</template>
      </el-table-column>
			 <el-table-column
        prop="cc"
        label="入库时间">
				<template slot-scope="scope">{{ scope.row.time | FormatDate('yyyy-MM-dd-HH:mm:ss') }}</template>
      </el-table-column>
					 <el-table-column
        prop="cc"
        label="备注">
				<template slot-scope="scope">{{ scope.row.col  }}</template>
      </el-table-column>	   
    </el-table>
				</TabPane>
				<!-- <TabPane label="资金看板" name="capital" style='padding-top: 20px;'>
          <Table stripe :columns="moneyList" :data="moneyData"></Table>
        </TabPane> -->
			</Tabs>
		</div>
	</div>
</template>

<script>
	import { salePortal, inventoryPortal, purchasePortal, moneyPortal } from '../../api/api'
	export default {
		data() {
			return {
				AllCustomerSalesMsg:[],
				AllGoodsMsg:[],
				AllCommodityInventoryMsg:[],
				/*销售看板*/
				AllGoodsNum:'',
				AllCommodityInventory:'',
				AllCustomerSales:''
			}	
		},
    filters:{
      filterNumber(value){
        if(value){
        return value+'元'
        }else{
        return '0.00元'
        }
      }
    },

		mounted() {
			this.$ajax
        .get('/api/CustomerSales/findAllCustomerSales')
				.then(response => (this.AllCustomerSales = response.data.data)),
					this.$ajax
        .get('/api/CustomerSales/findCustomerSales')
				.then(response => (this.AllCustomerSalesMsg = response.data.data)),
				this.$ajax
        .get('/api/GoodInformation/findAllGoodsNum')
				.then(response => (this.AllGoodsNum = response.data.data)),
				this.$ajax
        .get('/api/GoodInformation/findAllGoods')
				.then(response => (this.AllGoodsMsg = response.data.data)),
				this.$ajax
        .get('/api/CommodityInventory/findCommodityInventory')
				.then(response => (this.AllCommodityInventoryMsg = response.data.data)),
				this.$ajax
        .get('/api/CommodityInventory/findAllCommodityInventory')
				.then(response => (this.AllCommodityInventory = response.data.data))
		}
		
	}
</script>

<style>
	.file_data:after,
	.file_data li:after {
		display: table;
		clear: both;
		content: "";
	}

/*   .file_index {
  padding: 0 20px;
} */

	.file_data li {
		width: 20%;
		float: left;
	}

	.file_data_left {
		margin: 100px 0;
		float: left;
		width: 40%;
		height: 50px;
		padding-left: 15%;
		border-right: 1px solid #ccc;
	}

	.file_data_left img {
		width: 50px;
		height: 50px;
	}

	.file_data_right {
		float: right;
		margin: 100px 0;
		width: 59%;
		height: 50px;
	}

	.file_data_right p {
		padding-left: 15px;
		line-height: 25px;
		font-size: 16px;
	}

	.file_data_num {
		color: rgb(38, 101, 216);
		font-weight: bold;
		font-size: 25px;
	}
</style>

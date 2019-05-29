<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			库存超上限明细表
		</div>
		<!--<Row>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">业务日期:</Col>
				<Col span="18">
				<DatePicker type="month" placeholder="Select date"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin: 20px 0;margin-left: 20px;">
			<Button type="primary">查询</Button>
			</Col>
		</Row>-->
		<!--<div class="basic_indicators" style="margin-bottom: 30px;">
			销售月报表-用户汇总
		</div>-->
		<Table stripe :columns="inventoryUpperlist" :data="inventoryUpperdata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
  import { inventoryUpperData } from "../../../api/api"
	export default {
		data() {
			return {
				inventoryUpperlist: [{
					title: '序号',
          align: "center",
					key: 'numid',
				}, {
					title: '仓库编码',
          align: "center",
					key: 'warehouseCode'
				}, {
					title: '仓库',
          align: "center",
					key: 'warehouseName',
				}, {
					title: '商品编码',
          align: "center",
					key: 'goodsCode'
				}, {
					title: '商品名称',
          align: "center",
					key: 'goodsName'
				}, {
					title: '规格型号',
          align: "center",
					key: 'goodsSpec'
				}, {
					title: '库存上限',
          align: "center",
					key: 'iuCount'
				}, {
					title: '当前库存',
          align: "center",
					key: 'invCount'
				}, {
					title: '存货超量',
          align: "center",
					key: 'delta',
          className: 'moreinfo'
				}, {
					title: '计量单位',
          align: "center",
					key: 'unitName'
				},
			],
			inventoryUpperdata: [],
			pageSize: 20,
			dataCount: 0
			}
		},
    methods:{
       getinventoryUpperData(){
        inventoryUpperData({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          /*console.log(res)*/
          this.inventoryUpperdata = res.data.data.dataList
          let num = 1
          this.inventoryUpperdata.forEach((item,index) => {
            item["numid"] = num++
          })
          this.dataCount = res.data.data.totalCount
        })
      },
      changepage(index){
        inventoryUpperData({
          page: index,
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          this.inventoryUpperdata = res.data.data.dataList
          let num = 1
          this.inventoryUpperdata.forEach((item,index) => {
            item["numid"] = num++
          })
          this.dataCount = res.data.data.totalCount
        })
      },
    },
    mounted(){
      this.getinventoryUpperData()
    }
	}
</script>

<style>
	.sale_day_goods {
		padding: 0 20px;
	}
</style>

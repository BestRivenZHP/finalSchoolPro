<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">商品编号</Col>
				<Col span="16">
				<Input v-model="code"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">品名</Col>
				<Col span="16">
				<Input v-model="name"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="8" class="from-text">规格型号</Col>
				<Col span="16">
				<Input v-model="spec"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="text-align: center;margin-left:20px;">
			<Button type="primary" @click="search">查询</Button>
			</Col>
			<Col span="1" style="text-align: center;">
			<Button type="primary" @click="reset">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			仓库[{{ stockname }}]的总账
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
		</div>
		<Table stripe :columns="stockbilllist" :data="stockbilldata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
  import { getStockBillList } from '../../../api/api'
	export default {
		data() {
			return {
        stockname: '',  //仓库名
        value: '',
        code: '',  //商品编码
        name: '',  //品名
        spec: '',  //规格型号
        /*总账列表*/
				stockbilllist: [{
					title: '商品编码',
          width: 100,
          align: "center",
					key: 'code',
				}, {
					title: '商品名称',
          width: 150,
          align: "center",
					key: 'name'
				}, {
					title: '规格型号',
          width: 260,
          align: "center",
					key: 'spec',
				}, {
					title: '商品单位',
          width: 100,
          align: "center",
					key: 'unit'
				}, {
					title: '在途数量',
          width: 100,
          align: "center",
					key: 'afloat_count'
				}, {
					title: '在途单价',
          width: 100,
          align: "center",
					key: 'afloat_price'
				}, {
					title: '在途金额',
          width: 100,
          align: "center",
					key: 'afloat_money'
				}, {
					title: '入库数量',
          width: 100,
          align: "center",
					key: 'in_count'
				}, {
					title: '平均入库单价',
          width: 120,
          align: "center",
					key: 'in_price'
				}, {
					title: '入库总金额',
          width: 120,
          align: "center",
					key: 'in_money'
				}, {
					title: '出库数量',
          width: 100,
          align: "center",
					key: 'out_count'
				}, {
					title: '平均出库单价',
          width: 120,
          align: "center",
					key: 'out_money'
				}, {
					title: '出库总金额',
          width: 120,
          align: "center",
					key: 'out_price'
				}, {
					title: '余额数量',
          width: 100,
          align: "center",
					key: 'balance_count'
				}, {
					title: '余额平均单价',
          width: 120,
          align: "center",
					key: 'balance_price'
				}, {
					title: '余额总金额',
          width: 120,
          align: "center",
					key: 'balance_money'
				}, {
					title: '操作',
					key: 'action',
					fixed: 'right',
					width: 150,
					align: 'center',
					render: (h, params) => {
						return h('p', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'default'
								},
								style: {
									marginRight: '8px'
								},
								on: {
									click: () => {
                    this.$router.push('/s/accountinfodetial/'+this.$route.params.id+'/'+params.row.goods_id)
									}
								}
							}, '查看明细'),
						]);
					}
				}],
				stockbilldata: [],
				pageSize: 20,
				dataCount: 0
			}
		},
    methods:{
      /*返回*/
      goBack(){
        window.history.back()
      },
      /*重置*/
      reset(){
        this.code = ''
        this.name = ''
        this.spec = ''
        this.getBillInfo()
      },
      /*查询*/
      search(){
         this.stockbilldata = []
         getStockBillList({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.$route.params.id,
          code: this.code,
          name: this.name,
          spec: this.spec,
          page: 1,
        }).then(res => {
          this.stockbilldata = res.data
          this.dataCount = res.data.length
        })
      },
      /*分页*/
      changepage(index){
        getStockBillList({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.$route.params.id,
          page: index,
          code: '',
          name: '',
          spec: ''
        }).then(res => {
          this.stockbilldata = res.data
          this.dataCount = res.data.length
        })
      },
      /*获取总账列表数据*/
      getBillInfo(){
        this.stockname = this.$route.params.name
        getStockBillList({
          ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.$route.params.id,
          code: '',
          name: '',
          spec: '',
          page: 1,
        }).then(res => {
          this.stockbilldata = res.data
          this.dataCount = res.data.length
        })
      }
    },
    mounted(){
      this.getBillInfo()
    }
	}
</script>

<style>

</style>

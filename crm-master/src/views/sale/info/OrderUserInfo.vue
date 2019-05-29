<template>
	<!--销售订单->客户详情-->
	<div class="purchase_order">
		<div class="basic_indicators">
      <Row>
        <Col span="5">
        <span>单号： {{$route.params.sale_user_num}}</span>
        </Col>
        <Col span="5">
        <span>客户： {{$route.params.sale_user_name}}</span>
        </Col>
        <!-- <Col span="5">
        <span>出货仓库:{{$route.params.sale_user_name}}</span>
        </Col> -->
        <Col span="5">
        <span>应收款项(合计)： {{this.accountPrice | filterByNumber}}</span>
        </Col>
        <Col span="5">
        <span>收款方式： {{ $route.params.receiving_type }}</span>
        </Col>
      </Row>
       <Row style="margin-top:20px;margin-bottom:10px;">
        <Col span="5">
        <span>销售员： {{$route.params.biz_user_name}}</span>
        </Col>
        <Col span="5">
        <span>日期： {{$route.params.deal_date}}</span>
        </Col>
      </Row>
		</div>
		<Table :columns="columns5" :data="saleList"></Table>
	</div>
</template>

<script>
	import { soBillDetailList } from '../../../api/api'
	export default {
		data() {
			return {
        accountPrice: 0,
				columns5: [{
					title: '序号',
					width: 60,
					key: 'numid',
          align: "center",
				}, /*{
					title: '商品编码',
          align: "center",
					key: 'code',
				},*/ {
					title: '商品名称',
					key: 'name',
          align: "center",
				}, {
					title: '规格型号',
					key: 'spec',
          align: "center",
				},  {
          title: '单位',
          align: "center",
          key: 'unit_name',
        },{
					title: '销售数量',
          align: "center",
					key: 'goods_count',
				},/* {
					title: '出库数量',
          align: "center",
					key: 'numid',
				}, {
					title: '未出库数量',
          align: "center",
					key: 'numid',
				}, */{
					title: '销售单价',
          align: "center",
					key: 'goods_price',
				}, {
					title: '销售金额',
          align: "center",
					key: 'goods_money',
				}, {
					title: '折扣',
          align: "center",
					key: 'discount',
				}, {
					title: '结算价格(元)',
          align: "center",
					key: 'accountPrice',
				}, {
          title: '所属仓库',
          align: "center",
          key: 'warehousename',
        } ,{
					title: '备注',
          align: "center",
					key: 'memo',
				}],
				saleList: []
			}
		},
    filters: {
      filterByNumber(value) {
        return isNaN(value) ? '' : value.toFixed(2);
      },
    },
		mounted() {
			soBillDetailList({
        ticket: sessionStorage.getItem("ticket"),
				id: this.$route.params.sale_user_id
			}).then(res => {
				this.saleList = res.data;
				var num = 1
				this.saleList.forEach((item, Index) => {
					item.numid = num++
						if(item.bill_status == 0) {
							item.bill_status = '待审核'
						} else
					if(item.bill_status == 1000) {
						item.bill_status = '已审核'
					} else if(item.bill_status == 1001) {
						item.bill_status = '订单取消'
					} else if(item.bill_status == 2000) {
						item.bill_status = '部分出库'
					} else if(item.bill_status == 2001) {
						item.bill_status = '部分出库-订单关闭'
					} else if(item.bill_status == 3000) {
						item.bill_status = '全部出库'
					} else {
						item.bill_status = '全部出库-订单关闭'
					}

          this.accountPrice += parseFloat(item.goods_money)
				})
				/*console.log(this.saleList)*/
			})
		}
	}
</script>

<style>
	.order_info {
		padding: 0 20px;
	}
</style>

<template>
	<div class="box">
		<div style="text-align: center;font-size: 24px;height: 50px;line-height: 50px;">
			单据
		</div>
		<div class="box-title">
			<div class="box-item box-info">
				单号 :
				<span v-text="ref"></span>
			</div>
			<div class="box-item box-info">
				日期 :
				<span v-text="dealDate"></span>
			</div>
			<div class="box-item box-info">
				销售员 :
				<span v-text="bizUserName"></span>
			</div>
			<div class="box-item box-info">
				客户 :
				<span v-text="customerName"></span>
			</div>
		</div>
		<!--<div style="clear: both;">
			<Table :columns="tableList" :data="tableData" size="small"></Table>
		</div>-->
		<div>
			<div class="box-title" style="border-top: 2px solid #000000;">
				<div class="box-item">商品名称</div>
				<div class="box-item">规格</div>
				<div class="box-item">单位</div>
				<div class="box-item">单价</div>
				<div class="box-item">数量</div>
				<div class="box-item">金额</div>
				<div class="box-item">折扣</div>
				<div class="box-item">结算价格</div>
				<div class="box-item">备注</div>
			</div>
			<div class="box-main" v-for='(table,index) in tableData' style="border-top: 1px solid #CCCCCC">
				<div class="box-item" v-text="table.goodsName"></div>
				<div class="box-item" v-text="table.goodsSpec"></div>
				<div class="box-item" v-text="table.unitName"></div>
				<div class="box-item" v-text="table.goodsPrice"></div>
				<div class="box-item" v-text="table.goodsCount"></div>
				<div class="box-item" v-text="table.goodsMoney"></div>
				<div class="box-item" v-text="table.discount"></div>
				<div class="box-item" v-text="table.accountPrice"></div>
				<div class="box-item" v-text="table.isGiveaway"></div>
			</div>
		</div>
		<div class="box-title" style="border-top: 1px solid #CCCCCC;border-bottom: 2px solid #000000;">
			<div class="box-item" style="text-align: center;">合计</div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item" v-text="numberTotal"></div>
			<div class="box-item" v-text="goodsPrice"></div>
			<div class="box-item"></div>
			<div class="box-item" v-text="accountPrice"></div>
			<div class="box-item"></div>
		</div>
		<div class="box-title">
			<div class="box-item">地址:</div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item">其他优惠:</div>
			<div class="box-item" v-text='removeZero'></div>
			<div class="box-item"></div>
		</div>
		<div class="box-title">
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item">应收账款:</div>
			<div class="box-item" v-text='accountPrices'></div>
			<div class="box-item"></div>
		</div>
		<div class="box-title">
			<div class="box-item">备注:</div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
			<div class="box-item"></div>
		</div>

		<div style="text-align: right;margin-right: 30px;">
			<Button type="primary" @click="doPrint" id="printBtn">打印</Button>
		</div>

	</div>
</template>

<script>
	import { soBillInfo } from '../../../api/api'
	export default {
		data() {
			return {
				ref: '', //单号
				dealDate: '', //制单日期
				bizUserName: '', //销售员
				customerName: '', //客户
				tableList: [{ //table的表头
					"title": "商品名称",
					"key": "goodsName",
					"fixed": "center",
				}, {
					"title": "规格",
					"key": "goodsSpec",
					"fixed": "center",
				}, {
					"title": "单位",
					"key": "unitName",
					"fixed": "center",
				}, {
					"title": "单价",
					"key": "goodsPrice",
					"fixed": "center",
				}, {
					"title": "数量",
					"key": "goodsCount",
					"fixed": "center",
				}, {
					"title": "金额",
					"key": "goodsMoney",
					"fixed": "center",
				}, {
					"title": "折扣",
					"key": "discount",
					"fixed": "center",
				}, {
					"title": "结算价格",
					"key": "accountPrice",
					"fixed": "center",
				}, {
					"title": "备注",
					"key": "isGiveaway",
					"fixed": "center",
				}],
				tableData: [], //表格所需要的数据
				goodsPrice: '', //为折扣前金额合计
				accountPrice: '', //结算价格合计
				accountPrices: '', //去掉抹零后的应付金额
				removeZero: '', //抹零金额
				numberTotal: 0, //合计数量
			}
		},
		mounted() {
			soBillInfo({
				id: this.$route.params.add_order_print_id
			}).then(res => {
				this.ref = res.data.ref;
				this.dealDate = res.data.dealDate;
				this.bizUserName = res.data.bizUserName;
				this.customerName = res.data.customerName;
				this.tableData = res.data.items
				this.tableData.forEach((item, index) => {
					if(item.isGiveaway == 0) {
						item.isGiveaway = ''
					} else {
						item.isGiveaway = '赠品'
					}
					this.numberTotal += item.goodsCount
				})
				this.removeZero = res.data.removeZero
				this.goodsPrice = res.data.totalPrice.goodsPrice
				this.accountPrice = res.data.totalPrice.accountPrice
				this.accountPrices = parseFloat(res.data.totalPrice.accountPrices).toFixed(2)
			})
		},
		methods: {
      /*remove() {
        var hkey_root, hkey_path, hkey_key;
        hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        try {
          var RegWsh = new ActiveXObject("WScript.Shell");
          RegWsh.RegWrite(hkey_path + "header", "");
          RegWsh.RegWrite(hkey_path + "footer", "");
        } catch(e) {}
      },*/

			doPrint() {
       /* if(!!window.ActiveXObject || "ActiveXObject" in window) {
          this.remove();
        }*/
        document.getElementById("printBtn").style.display = "none"
				var newstr = document.getElementsByClassName('box')[0].innerHTML
				document.body.innerHTML = newstr
				window.print()
				// 重新加载页面，以刷新数据
				window.location.reload()
			}
		}
	}
</script>

<style>
	.box-title,.box-main {
		display: flex;
	}

	.box-item {
		text-align: center;
		height: 40px;
		line-height: 40px;
		flex: 1;
	}
	.ivu-table-wrapper .ivu-table th{
		width: 11%;
	}
	.ivu-table-small td{
		width: 11%;
	}
</style>

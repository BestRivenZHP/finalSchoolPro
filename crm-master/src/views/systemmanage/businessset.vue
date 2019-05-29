<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			业务设置
			<!-- <Button type="primary" style="margin-left: 50px;" @click="showSet">设置</Button> -->
		</div>
		<Row style="margin: 20px 0;">
			<Col span="8">
			<Row>
				<Col span="6" class="from-text">公司</Col>
				<Col span="18">
				<Select v-model="ticket">
					<Option v-for="(item,index) in company_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Table stripe :columns="configListInfo" :data="config_list"></Table>
		<!--<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>-->
		<Modal v-model="business_set">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>业务设置</span>
			</p>
			<div>
				<Tabs value="name1">
					<TabPane label="公司" name="name1">
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">公司名称</Col>
							<Col span="18">
							<Input v-model='system.company_name'></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">公司地址</Col>
							<Col span="18">
							<Input v-model="system.company_add"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">公司电话</Col>
							<Col span="18">
							<Input v-model="system.company_ipn"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">公司传真</Col>
							<Col span="18">
							<Input v-model="system.company_chuan"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">公司邮编</Col>
							<Col span="18">
							<Input v-model="system.company_you"></Input>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="采购" name="name2">
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">采购入库默认仓库</Col>
							<Col span="18">
							<Select v-model="system.purchase_stock">
								<Option v-for="(item,index) in stock_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">采购订单默认付款方式</Col>
							<Col span="18">
							<Select v-model="system.purchase_ding_money">
								<Option v-for="(item,index) in purchase_ding_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">采购入库单付款方式</Col>
							<Col span="18">
							<Select v-model="system.purchase_ruku_money">
								<Option v-for="(item,index) in purchase_ding_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">采购入库数量控制</Col>
							<Col span="18">
							<Select v-model="system.purchase_ruku_number">
								<Option v-for="(item,index) in purchase_ruku_number_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="销售" name="name3">
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售出库默认仓库</Col>
							<Col span="16">
							<Select v-model="system.sale_stock">
								<Option v-for="(item,index) in stock_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售出库单允许编辑销售单价</Col>
							<Col span="16">
							<Select v-model="system.sale_money">
								<Option v-for="(item,index) in sale_money_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售出库单默认收款方式</Col>
							<Col span="16">
							<Select v-model="system.sale_chuku_shoukuan">
								<Option v-for="(item,index) in sale_chuku_shoukuan_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售订单默认收款方式</Col>
							<Col span="16">
							<Select v-model="system.sale_ding_shoukuan">
								<Option v-for="(item,index) in sale_ding_shoukuan_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售出库数量控制</Col>
							<Col span="16">
							<Select v-model="system.sale_number">
								<Option v-for="(item,index) in sale_number_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="存货" name="name4">
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">存货计价方法</Col>
							<Col span="18">
							<Select v-model="system.cunhuo_method">
								<Option v-for="(item,index) in cunhuo_method_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="财务" name="name5">
						<Row style="margin: 10px 0;">
							<Col span="6" style="line-height: 32px;text-align: center;">增值税税率</Col>
							<Col span="18">
							<Input v-model="system.zengzhi"></Input>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="单号前缀" name="name6">
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">采购订单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.purchase_ding_zhui"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">采购入库单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.purchase_ruku_zhui"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">采购退货出库单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.purchase_tuihuo_zhui"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售出库单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.sale_chuku_zhui"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售退货入库单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.sale_tuihuo_zhui"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">调拨单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.diaobo_id"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">盘点单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.pandian_id"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">销售订单单号前缀</Col>
							<Col span="16">
							<Input v-model="system.sale_ding_zhui"></Input>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="系统" name="name37">
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">产品名称</Col>
							<Col span="16">
							<Input v-model="system.goods_name"></Input>
							</Col>
						</Row>
						<Row style="margin: 10px 0;">
							<Col span="8" style="line-height: 32px;text-align: center;">模块打开方式</Col>
							<Col span="16">
							<Select v-model="system.module_method">
								<Option v-for="(item,index) in module_method_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
							</Col>
						</Row>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer">
        <Button type="primary" @click="keepData">保存</Button>
        <Button type="primary" @click="closeSetModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { getConfig, getCompany, getWarehouse, configTotal } from '../../api/api'
  export default {
		mounted() {
			this.getCompanyList();
			this.getConfigList();
			this.getStockList();
		},
    data() {
      return {
        business_set: false,
        configListInfo: [{
            title: '序号',
            align: "center",
            width: 60,
            key: 'numid',
          },
          {
            title: '设置项',
            align: "center",
            key: 'name'
          }, {
            title: '值',
            align: "center",
            width: 300,
            key: 'value'
          }, {
            title: '备注',
            align: "center",
            key: 'note'
          }
        ],
        dataCount: 0,
        config_list: [], //业务列表
        company_list: [], //公司列表
        ticket: '', //绑定公司id
        system: {
          company_name: '',
          company_add: '',
          company_ipn: '',
          company_chuan: '',
          company_you: '',
          purchase_stock: '',
          purchase_ding_money: "",
          purchase_ruku_money: "",
          purchase_ruku_number: "",
          sale_stock: "",
          sale_money: "",
          sale_chuku_shoukuan: "",
          sale_ding_shoukuan: "",
          sale_number: "",
          cunhuo_method: '',
          zengzhi: '',
          purchase_ding_zhui: '',
          purchase_ruku_zhui: '',
          purchase_tuihuo_zhui: '',
          sale_chuku_zhui: '',
          sale_tuihuo_zhui: '',
          diaobo_id: '',
          pandian_id: '',
          sale_ding_zhui: '',
          goods_name: '',
          module_method: '',
        },
        stock_list: [], //仓库列表
        pageSize: 10, //每页的页数
        //采购订单默认付款方式以及采购入库单付款方式
        purchase_ding_list: [{
          id: 0,
          name: '记应付账款'
        }, {
          id: 1,
          name: '现金付款'
        }, {
          id: 2,
          name: '预付款'
        }],
        //采购入库数量控制
        purchase_ruku_number_list: [{
          id: 0,
          name: '不做限制'
        }, {
          id: 1,
          name: '不能超过采购订单未入库量'
        }],
        //销售出库单允许编辑销售单价
        sale_money_list: [{
          id: 0,
          name: '不允许编辑销售单价',
        }, {
          id: 1,
          name: '允许编辑销售单价',
        }],
        //销售出库单默认收款方式
        sale_chuku_shoukuan_list: [{
          id: 0,
          name: '记应收账款'
        }, {
          id: 1,
          name: '现金付款'
        }, {
          id: 2,
          name: '用预付款支付'
        }],
        //销售订单默认收款方式
        sale_ding_shoukuan_list: [{
          id: 0,
          name: '记应收账款'
        }, {
          id: 1,
          name: '现金付款'
        }],
        //销售出库数量控制
        sale_number_list: [{
          id: 0,
          name: '不做限制'
        }, {
          id: 1,
          name: '不能超过销售订单未出库量'
        }],
        //存货计价方法
        cunhuo_method_list: [{
          id: 0,
          name: '移动平均法'
        }, {
          id: 1,
          name: '先进先出法'
        }],
        //模块打开方式
        module_method_list: [{
          id: 0,
          name: '原窗口打开'
        }, {
          id: 1,
          name: '新窗口打开'
        }]
      }
    },
		methods: {
			changepage() {},
			//获取业务列表
			getConfigList() {
				this.system = {}
				getConfig({
					ticket: this.ticket
				}).then(res => {
					this.config_list = res.data
					var num = 1
					this.config_list.forEach((item, index) => {
						item.numid = num++
					})
					this.getStockList();
					this.system.company_name = this.config_list[0].value
					this.system.company_add = this.config_list[1].value
					this.system.company_ipn = this.config_list[2].value
					this.system.company_chuan = this.config_list[3].value
					this.system.company_you = this.config_list[4].value
					this.system.purchase_stock = this.config_list[5].value
					this.system.purchase_ding_money = this.config_list[6].value
					this.system.purchase_ruku_money = this.config_list[7].value
					this.system.purchase_ruku_number = this.config_list[8].value
					this.system.sale_stock = this.config_list[9].value
					this.system.sale_money = this.config_list[10].value
					this.system.sale_chuku_shoukuan = this.config_list[11].value
					this.system.sale_ding_shoukuan = this.config_list[12].value
					this.system.sale_number = this.config_list[13].value
					this.system.cunhuo_method = this.config_list[14].value
					this.system.zengzhi = this.config_list[15].value
					this.system.purchase_ding_zhui = this.config_list[16].value
					this.system.purchase_ruku_zhui = this.config_list[17].value
					this.system.purchase_tuihuo_zhui = this.config_list[18].value
					this.system.sale_chuku_zhui = this.config_list[19].value
					this.system.sale_tuihuo_zhui = this.config_list[20].value
					this.system.diaobo_id = this.config_list[21].value
					this.system.pandian_id = this.config_list[22].value
					this.system.sale_ding_zhui = this.config_list[23].value
					this.system.goods_name = this.config_list[24].value
					this.system.module_method = this.config_list[25].value
				})
			},
			//获取公司列表
			getCompanyList() {
				getCompany({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					this.company_list = res.data
					this.ticket = res.data[0].id
				})
			},
			//获取仓库列表
			getStockList() {
				getWarehouse({
					ticket: this.ticket
				}).then(res => {
					/*console.log(res)*/
					this.stock_list = res.data
				})
			},
			showSet() {
				this.business_set = true;
			},
			closeSetModal() {
				this.business_set = false;
			},
			keepData() {
				var curr_arr = []
				curr_arr.push({
					"name": "公司名称",
					"value": this.system.company_name
				}, {
					"name": "公司地址",
					"value": this.system.company_add
				}, {
					"name": "公司电话",
					"value": this.system.company_ipn
				}, {
					"name": "公司传真",
					"value": this.system.company_chuan
				}, {
					"name": "公司邮编",
					"value": this.system.company_you
				}, {
					"name": "采购入库默认仓库",
					"value": this.system.purchase_stock
				}, {
					"name": "采购订单默认付款方式",
					"value": this.system.purchase_ding_money
				}, {
					"name": "采购入库单默认付款方式",
					"value": this.system.purchase_ruku_money
				}, {
					"name": "采购入库数量控制",
					"value": this.system.purchase_ruku_number
				}, {
					"name": "销售出库默认仓库",
					"value": this.system.sale_stock
				}, {
					"name": "销售出库单允许编辑销售单价",
					"value": this.system.sale_money
				}, {
					"name": "销售出库单默认收款方式",
					"value": this.system.sale_chuku_shoukuan
				}, {
					"name": "销售订单默认收款方式",
					"value": this.system.sale_ding_shoukuan
				}, {
					"name": "销售出库数量控制",
					"value": this.system.sale_number
				}, {
					"name": "存货计价方法",
					"value": this.system.cunhuo_method
				}, {
					"name": "增值税税率",
					"value": this.system.zengzhi
				}, {
					"name": "采购订单单号前缀",
					"value": this.system.purchase_ding_zhui
				}, {
					"name": "采购入库单单号前缀",
					"value": this.system.purchase_ruku_zhui
				}, {
					"name": "采购退货出库单单号前缀",
					"value": this.system.purchase_tuihuo_zhui
				}, {
					"name": "销售出库单单号前缀",
					"value": this.system.sale_chuku_zhui
				}, {
					"name": "销售退货入库单单号前缀",
					"value": this.system.sale_tuihuo_zhui
				}, {
					"name": "调拨单单号前缀",
					"value": this.system.diaobo_id
				}, {
					"name": "盘点单单号前缀",
					"value": this.system.pandian_id
				}, {
					"name": "销售订单单号前缀",
					"value": this.system.sale_ding_zhui
				}, {
					"name": "产品名称",
					"value": this.system.goods_name
				}, {
					"name": "模块打开方式",
					"value": this.system.module_method
				})
				configTotal({
					ticket: this.ticket,
					info:curr_arr
				}).then(res => {
					this.$Message.info(res.msg)
					this.business_set=false
					this.getConfigList();
				})
			}
		},
		watch: {
			'ticket': 'getConfigList',
			//			'ticket':'getStockList'
		}
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
  } */
</style>

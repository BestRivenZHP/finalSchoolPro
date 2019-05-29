<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">状态</Col>
				<Col span="18">
				<Select v-model="statusValue">
					<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">单号</Col>
				<Col span="18">
				<Input></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">交货日期(起)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">交货日期(止)</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">供应商</Col>
				<Col span="18">
				<Select v-model="supplierlistvalue">
          <Option v-for="item in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
				</Col>
			</Row>
			</Col>
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">仓库</Col>
        <Col span="18">
        <Select v-model="stockvalue">
          <Option v-for="item in allstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">付款方式</Col>
				<Col span="18">
				<Select v-model="paymenttypevalue">
          <Option v-for="item in paymenttypelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
				</Col>
			</Row>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			订单详情  <Button type="primary" style="margin-left:50px;" @click="addOrder">新建采购退货出库单</Button>
		</div>
		<Table stripe :columns="columns5" :data="data5"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
  import { getAllSupplier,getAllStock } from '../../api/api'
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        cityList: [],
        statusList:[
        /*{
          value: 500,
          label: "全部",
        },*/
        {
          value: 1000,
          label: "已出库",
        },
        {
          value: 0,
          label: "待出库",
        }
        ],
        statusValue: "",  //订单状态
        supplierlistvalue: "",  //供应是
        supplierlist: [],
        allstockslist: [], //仓库列表
        stockvalue: '',  //仓库
        paymenttypevalue: "", //付款方式
        paymenttypelist: [
        {
          value: 0,
          label: '记应付账款'
        },{
          value: 1,
          label: '现金付款'
        },{
          value: 2,
          label: '预付款'
        },
        ],
				columns5: [{
					title: '编号',
					key: 'date',
           align:"center",
				}, {
					title: '状态',
					key: 'name',
           align:"center",
				}, {
					title: '单号',
					key: 'age',
           align:"center",
				}, {
					title: '业务日期',
					key: 'address',
           align:"center",
				}, {
					title: '供应商',
					key: 'name',
           align:"center",
				}, {
					title: '收款方式',
					key: 'name',
           align:"center",
				}, {
					title: '出库仓库',
					key: 'address',
           align:"center",
				}, {
					title: '退款金额',
					key: 'name',
           align:"center",
				}, {
					title: '业务员',
					key: 'date',
           align:"center",
				}, {
					title: '制单人',
					key: 'name',
           align:"center",
				}, {
					title: '制单时间',
					key: 'date',
           align:"center",
				}, {
					title: '操作',
					key: 'action',
					width: 180,
					fixed: 'right',
					align: 'center',
					render: function(h, params) {
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
									click: function() {
										console.log(params)
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'default'
								},
								on: {
									click: function() {
										console.log(params)
									}
								}
							}, '删除')
						]);
					}
				}],
				data5: [{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03'
				}, {
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park',
					date: '2016-10-01'
				}, {
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					date: '2016-10-02'
				}, {
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park',
					date: '2016-10-04'
				}, {
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					date: '2016-10-02'
				}],
				pageSize: 10,
				dataCount: 100
			}
		},
    methods:{
      addOrder(){},
      changepage(index){},
      /*获取仓库列表*/
        getAllStocks(){
        getAllStock().then(res => {
          res.data.forEach((item,index) => {
            let temp = {}
            temp.value = item.id
            temp.label = item.name
            this.allstockslist.push(temp)
          })
        })
      },
       /*获取供应商列表*/
      getSupplierList(){
        getAllSupplier({
          ticket: this.$store.state.ticket
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      },
    },
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getSupplierList()
      this.getAllStocks()
    }
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
  } */
</style>

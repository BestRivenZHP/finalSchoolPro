<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			新建采购订单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">单号</Col>
				<Col span="16">{{odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">交货日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" v-model="exchangedata"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">供应商</Col>
				<Col span="16">
				<Select v-model="suppliervalue">
          <Option v-for="item in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">交货地址</Col>
				<Col span="16">
				<Input v-model="exchangearea"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">联系人</Col>
				<Col span="18">
				<Input v-model="contactman"></Input>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">电话</Col>
				<Col span="16">
				<Input v-model="tel"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">传真</Col>
				<Col span="16">
				<Input v-model="fax"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">组织机构</Col>
				<Col span="16">
				<Select v-model="orgsvalue">
          <Option v-for="item in orgslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">付款方式</Col>
				<Col span="18">
				<Select v-model="paymentvalue">
          <Option v-for="item in paymentlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="16">
			<Col span="2" style="text-align: center;">备注</Col>
			<Col span="22">
			<Input v-model="nodetxt"></Input>
			</Col>
			</Col>
		</Row>
		<Table stripe :columns="tablelist" :data="tabledata"></Table>
		<div style="float: right;margin: 30px;">
			<Button type="primary">确定</Button>
			<Button type="primary" style="margin-left:30px;">取消</Button>
		</div>
	</div>
</template>

<script>
  import { getAllUsers,getAllOrgs,getAllSupplier } from '../../../api/api'
	export default {
		data() {
			return {
        is_edit: false,
        exchangedata: '', //交货日期
        exchangearea: '', //交货地址
        contactman: '', //联系人
        tel: '', //电话
        fax: '', //传真
        nodetxt: '', //备注
        suppliervalue: '',
        supplierlist: [],
        orgsvalue: '',
        orgslist: [],
        paymentvalue: 1,
        paymentlist: [
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
        allusersvalue: '',
        alluserslist: [],
				odd_number: '保存后自动生成',
				tablelist: [{
					title: '序号',
					key: 'date',
				}, {
					title: '商品编码',
					key: 'name'
				}, {
					title: '商品名称',
					key: 'age',
				}, {
					title: '规格型号',
					key: 'address'
				}, {
					title: '采购数量',
					key: 'address'
				}, {
					title: '单位',
					key: 'address'
				}, {
					title: '采购单价',
					key: 'address'
				}, {
					title: '采购金额',
					key: 'address'
				}, {
					title: '税率(%)',
					key: 'address'
				}, {
					title: '税金',
					key: 'address'
				}, {
					title: '价税合计',
					key: 'address'
				}, {
					title: '备注',
					key: 'address'
				}, {
					title: '操作',
					key: 'address'
				}],
        tabledata: [],
			}
		},
    methods: {
      edit(){

      },
      datelink(){

      },
      getAllUsersinfo(){
        getAllUsers().then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.alluserslist.push(temp)
          })
        })
      },
      getAllOrgsinfo(){
        getAllOrgs().then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.orgslist.push(temp)
          })
        })
      },
      getAllSupplierinfo(){
        getAllSupplier({
          ticket: this.$store.state.ticket
        }).then(res => {
          console.log(res)
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      }
    },
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getAllUsersinfo()
      this.getAllOrgsinfo()
      this.getAllSupplierinfo()
    }
	}
</script>

<style>
	/* .add_order {
    padding: 0 20px;
  } */
</style>

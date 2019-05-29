<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			新建采购退货出库单
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
				<DatePicker type="date" placeholder="请输入日期" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">供应商</Col>
				<Col span="16">
				<Select v-model="model1">
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">交货地址</Col>
				<Col span="16">
				<Input></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">联系人</Col>
				<Col span="18">
				<Input></Input>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">电话</Col>
				<Col span="16">
				<Input></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">传真</Col>
				<Col span="16">
				<Input></Input>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">组织机构</Col>
				<Col span="16">
				<Select v-model="model1">
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">业务员</Col>
				<Col span="16">
				<Select>
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">付款方式</Col>
				<Col span="18">
				<Select>
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="16">
			<Col span="2" style="text-align: center;">传真</Col>
			<Col span="22">
			<Input></Input>
			</Col>
			</Col>
		</Row>
		<Table stripe :columns="columns5" :data="data5" @on-row-click="datelink"></Table>
		<div style="float: right;margin: 30px;">
			<Button type="primary">确定</Button>
			<Button type="primary" style="margin-left:30px;">取消</Button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
				odd_number: '保存后自动生成',
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
					title: '采购数量',
          align: "center",
					key: 'address'
				}, {
					title: '单位',
          align: "center",
					key: 'address'
				}, {
					title: '采购单价',
          align: "center",
					key: 'address'
				}, {
					title: '采购金额',
          align: "center",
					key: 'address'
				}, {
					title: '税率(%)',
          align: "center",
					key: 'address'
				}, {
					title: '税金',
          align: "center",
					key: 'address'
				}, {
					title: '价税合计',
          align: "center",
					key: 'address'
				}, {
					title: '备注',
          align: "center",
					key: 'address'
				}, {
					title: '操作',
          align: "center",
					key: 'address'
				}],
			}
		}
	}
</script>

<style>
	.add_order {
		padding: 0 20px;
	}
</style>

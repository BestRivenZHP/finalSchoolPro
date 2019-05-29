<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			编辑盘点单
		</div>
		<Row style="margin: 20px 0;line-height: 32px;">
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">单号</Col>
				<Col span="18">{{odd_number}}</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">业务日期</Col>
				<Col span="16">
				<DatePicker type="date" placeholder="请输入日期" :options="options"></DatePicker>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">调出仓库</Col>
				<Col span="16">
				<Select v-model="model1">
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="8" style="text-align: center;">调入仓库</Col>
				<Col span="16">
				<Select v-model="model1">
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="4">
			<Row>
				<Col span="6" style="text-align: center;">业务员</Col>
				<Col span="18">
				<Select v-model="model1">
					<Option></Option>
				</Select>
				</Col>
			</Row>
			</Col>
		</Row>
		<Table stripe :columns="columns5" :data="data5" @on-row-click="datelink"></Table>
		<div style="float: right;margin: 30px;">
			<Button type="primary">确定</Button>  <Button type="primary" style="margin-left:30px;">取消</Button>
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
					key: 'name',
          align: "center",
				}, {
					title: '商品名称',
					key: 'age',
          align: "center",
				}, {
					title: '规格型号',
					key: 'address',
          align: "center",
				}, {
					title: '盘点后库存数量',
					key: 'address',
          align: "center",
				}, {
					title: '单位',
          align: "center",
					key: 'address'
				}, {
					title: '盘点后库存金额',
					key: 'address',
          align: "center",
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
/*   .add_alllot {
  padding: 0 20px;
} */
</style>

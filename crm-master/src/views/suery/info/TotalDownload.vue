<template>
	<div class="purchase_order">
		<!--<div class="crumbs_me">
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/">首页</BreadcrumbItem>
				<BreadcrumbItem>概况</BreadcrumbItem>
				<BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
				<BreadcrumbItem to="/totaldownload">总下载量</BreadcrumbItem>
			</Breadcrumb>
		</div>-->
		<div class="small_title">
			用户签到地区统计
		</div>

		<Table border :columns="historyColumns" :data="historyData" style="margin-right: 20px;"></Table>

		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import { downloadList } from '../../../api/api'
	export default {
		data() {
			return {
				// 初始化信息总条数
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
				historyColumns: [{
						title: '序号',
						key: 'numid',
						width: 70
					}, {
						title: '设备号',
						key: 'device',
					},
					{
						title: '省份',
						key: 'province',
					},
					{
						title: '城市',
						key: 'city',
					},
					{
						title: '区',
						key: 'area',
					},
					{
						title: '蛋鸡管家版本号',
						key: 'cur_version',
					},
					{
						title: '手机型号',
						key: 'phone_model',
					},
					{
						title: '手机类型',
						key: 'phone_model_type',
					},
					{
						title: '下载时间',
						key: 'downloadtime',
						width: 180
					}
				],
				historyData: [],
				total_down_list: [], //总数据存放的地方
			}
		},
		methods: {
			getDownloadDate() {
				downloadList().then(res => {
					this.historyData = res.data.total_down_list.list;
					this.dataCount = res.data.total_down_list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.phone_model_type == '1') {
							item.phone_model_type = '安卓'
						} else {
							item.phone_model_type = 'IOS'
						}
						item['numid'] = i++
					})

				})
			},
			changepage(index) {
				downloadList({
					c_page: index
				}).then(res => {
					this.historyData = res.data.total_down_list.list;
					this.dataCount = res.data.total_down_list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.phone_model_type == '1') {
							item.phone_model_type = '安卓'
						} else {
							item.phone_model_type = 'IOS'
						}
						item['numid'] = i++
					})
				})
			},
		},
		mounted() {
			this.getDownloadDate();
		}
	}
</script>
<style>
	.ivu-table-cell {
		text-align: center;
	}

	.ivu-table-border td,
	.ivu-table-border th {
		text-align: center;
	}

	.total-info {
		padding-left: 20px;
	}
</style>

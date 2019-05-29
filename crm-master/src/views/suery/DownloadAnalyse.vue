<template>
	<div class="download-analyse">
		<!--<div class="crumbs_me">
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/">首页</BreadcrumbItem>
				<BreadcrumbItem>概况</BreadcrumbItem>
				<BreadcrumbItem>下载量分析</BreadcrumbItem>
			</Breadcrumb>
		</div>-->
		<div style="margin-top: 10px;padding: 10px 0; ">
			<DatePicker type="date" v-model='begintime' placeholder="选择开始时间"></DatePicker>
			<DatePicker type="date" v-model='endtime' placeholder="选择结束时间" style="margin: 0 20px;"></DatePicker>
			<Button type="primary" @click="seachDownload">搜索</Button>
		</div>
		<div class="small_title">
			下载时段统计
		</div>

		<div style="height: 300px;width: 100%;padding: 0;margin-top: 20px;" id="download-analyse-hour"></div>

		<div class="small_title">
			下载地区统计
		</div>
		<div style="height: 300px;width: 100%;padding: 0;" id="download-analyse-city"></div>
		<Row>
			<Col span="7" >
			<div class="small_title ">下载版本统计</div>
			</Col>
			<Col span="7" offset='1'>
			<div class="small_title">下载注册率</div>
			</Col>
			<Col span="7" offset='1'>
			<div class="small_title">下载手机类型</div>
			</Col>
		</Row>
		<Row style="margin-bottom: 20px;">
			<Col span="7" class="download-border">
			<div style="height: 300px;width:100%;padding: 0;text-align: center;" id="download-analyse-version"></div>
			</Col>
			<Col span="7" offset='1' class="download-border">
			<div style="height: 300px;width:100%;padding: 0;text-align: center;" id="download-analyse-register"></div>
			</Col>
			<Col span="7" offset='1' class="download-border">
			<div style="height: 300px;width:100%;padding: 0;text-align: center;" id="download-analyse-type"></div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getDownLoadToTime, getDownLoadArea, getVersionStatistics, getDownloadRegister, getDownloadPhoneStatistics } from '../../api/api'
	export default {
		data() {
			return {
				begintime: '',
				endtime: '',
				down_time_num: [], //获取下载时段统计数量
				down_time_date: [], //获取下载时段统计时间
				down_area_num: [], //获取下载地区统计数量
				down_area_date: [], //获取下载地区统计时间
				down_version: [], //获取下载版本所有数据
				down_version_num: [], //获取下载版本统计数量
				down_version_date: [], //获取下载版本统计时间
				doload_count: "", //获取总下载人数
				register_count: "", //获取总注册人数
				ipone_ios: "", //苹果手机用户数量
				ipone_an: "", //安卓手机用户数量
			}
		},
		methods: {
			//获取下载时段数据
			getDownloadTime() {
				getDownLoadToTime({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.down_time_num.push(item.count)
						this.down_time_date.push(item.hour)
					})
					this.draWbatter()
				})
			},
			//获取下载地区统计数据
			getDownloadArea() {
				getDownLoadArea({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.down_area_num.push(item.count)
						this.down_area_date.push(item.province)
					})
					this.draWcity();
				})
			},
			//获取下载版本统计数据
			getDownloadVersion() {
				getVersionStatistics({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.down_version_num.push(item.count)
						this.down_version_date.push(item.cur_version)
						this.down_version.push({
							'value': item.count,
							"name": item.cur_version
						})
					})
					this.draWversion();
				})
			},
			//获取下载注册率统计数据
			getDownloadRegister() {
				getDownloadRegister({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.doload_count = res.result.doload_count[0].view;
					this.register_count = res.result.register_count[0].view;
					this.draWRegister()
				})
			},
			//获取下载手机类型统计数据
			getDownloadIpone() {
				getDownloadPhoneStatistics({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.ipone_ios = res.result[1].count;
					this.ipone_an = res.result[0].count;
					this.draWiphoneType()
				})
			},
			//下载时段统计图表
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-hour'));
				var colors = ['#5793f3', '#d14a61', '#675bba'];
				myChart.setOption({
					color: colors,
					tooltip: {
						axisPointer: {
							
						}
					},
					legend: {
						
					},
					grid: {
						top: 30,
						bottom: 30,
						left: 50,
						right: 50,
					},
					xAxis: [{
						type: 'category',
						name: '时',
						boundaryGap: false,
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							onZero: true,
							lineStyle: {
								color: '#000'
							}
						},
						data: this.down_time_date,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						name: '人数',
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					series: [{
						name: '下载量',
						type: 'line',
						smooth: true,
						symbol: 'circle', //拐点样式
						symbolSize: 10, //拐点大小
						data: this.down_time_num,
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default',
								},
								color: 'rgb(232,245,253)',
								lineStyle: {
									color: '#2d8cf0'
								},
								borderColor: '#2d8cf0'
							}
						}
					}]
				});
			},
			//下载地区统计图表
			draWcity() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-city'));
				myChart.setOption({
					color: ['#2d8cf0'],
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						top: 30,
						bottom: 30,
						left: 50,
						right: 50,
					},
					xAxis: [{
						type: 'category',
						data: this.down_area_date,
						name: '地区',
						axisTick: {
							alignWithLabel: true
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						name: '人数',
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					series: [{
						name: '下载量',
						type: 'bar',
						barWidth: '60%',
						data: this.down_area_num
					}]
				})
			},
			//下载版本统计图表
			draWversion() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-version'));
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						left: 'center',
						data: this.down_version_date
					},
					series: [{
						name: '版本',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: this.down_version,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
					color: ['#3A7CE8', '#3DB0E9', '#2ACDAC', '#85EB50', '#D7F76C', '#FACD61']
				})
			},
			//下载注册率
			draWRegister() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-register'));
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						left: 'center',
						data: ['总下载', '总注册']
					},
					series: [{
						name: '下载注册率',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [{
								value: this.doload_count,
								name: '总下载'
							},
							{
								value: this.register_count,
								name: '总注册'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
					color: ['#FFC968', '#3DB0E9']
				})
			},
			//下载手机类型统计图表
			draWiphoneType() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-type'));
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						left: 'center',
						data: ['苹果', '安卓']
					},
					series: [{
						name: '手机类型',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [{
								value: this.ipone_ios,
								name: '苹果'
							},
							{
								value: this.ipone_an,
								name: '安卓'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
					color: ['#3DB0E9', '#2ACDAC']
				})
			},
			//点击搜索按钮时触发
			seachDownload() {
				this.down_time_num = [];
				this.down_time_date = [];
				this.down_area_num = [];
				this.down_area_date = [];
				this.down_version = [];
				this.down_version_num = [];
				this.down_version_date = [];
				this.doload_count = "";
				this.register_count = "";
				this.ipone_ios = "";
				this.ipone_an = "";
				var now_time = new Date();
				if(this.endtime > now_time) {
					this.$Message.info('结束时间不能大于当前日期!')
					return
				}
				if(this.begintime > this.endtime) {
					this.$Message.info('结束时间需大于开始时间!')
					return
				}
				var begin = new Date(this.begintime);
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
				var end = new Date(this.endtime);
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				this.getDownloadTime();
				this.getDownloadArea();
				this.getDownloadVersion();
				this.getDownloadRegister();
				this.getDownloadIpone();
			}
		},
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getDownloadTime();
			this.getDownloadArea();
			this.getDownloadVersion();
			this.getDownloadRegister();
			this.getDownloadIpone();
		}
	}
</script>

<style>
	.download-analyse {
		padding-left: 20px;
	}
	/*.time-pad {
		padding: 20px 0;
	}
	
	.download-border {
		border: 1px solid rgb(206, 230, 207);
	}*/
</style>
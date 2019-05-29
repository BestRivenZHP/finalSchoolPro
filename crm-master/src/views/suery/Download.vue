<template>
	<div class="download">
		<div class="basic_indicators"> 
			基本指标
		</div>
		<Row style='margin-top: 10px;'>
			<router-link tag='div' to='/totaldownload'>
				<Col class="trend-col" span="3" >
					<span class='date-num'>{{total_down}}</span></br>
					<span>总下载量</span></br>
				</Col>
			</router-link>
		</Row>
		<div class="small_title">
			<Row>
				<Col span="3" class="table-title">
				<span>每天下载次数</span>
				<!--<span style="font-size:16px;margin-left:40px;">请选择开始时间 : </span>
				<DatePicker v-model="begintime" type="date" placeholder="选择开始时间"></DatePicker>
				<span style="font-size:16px;margin-left:40px ;">请选择结束时间 : </span>
				<DatePicker v-model='endtime' type="date" placeholder="选择结束时间"></DatePicker>
				<Button style="background:#57b663;color: #FFFFFF;margin: 0 20px;" @click="searchDownload">搜索</Button>-->
				</Col>
			</Row>
			<div style="height: 300px;width: 100%;margin-top: 20px;" id="download-line"></div>
		</div>
	</div>
</template>
<script>
	import { downloadList, dayDownload } from '../../api/api'
	export default {
		data() {
			return {
				begintime: '',
				endtime: '',
				total_down: '', //总下载量
				down_num: [], //获取日期区间的下载数量
				down_date: [], //获取日期区间的日期值
			}
		},
		methods: {
			//获取每日下载量数据
			getDayDownloadNumber() {
				this.$Spin.show();
				dayDownload({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.$Spin.hide();
					res.result.forEach((item, index) => {
						this.down_num.push(item.count);
						this.down_date.push(item.date);
					})
					this.draWbatter();
				})
			},
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('download-line'));
				var colors = ['#5793f3', '#d14a61', '#675bba'];
				var _this = this
				myChart.on('click', function(pa) {
					_this.$router.push('/downloadinfo/' + pa.name + '/' + pa.value)
				})
				myChart.setOption({
					color: colors,
					tooltip: {
						axisPointer: {
							//							type: 'cross'
						}
					},
					legend: {
//						data: ['下载量']
					},
					grid: {
						top: 30,
						bottom: 30,
						left: 50,
						right: 50,
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						name: "时间",
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							onZero: true,
							lineStyle: {
								color: '#000'
							}
						},
						data: this.down_date
					}],
					yAxis: [{
						type: 'value',
						name: "次数",
					}],
					series: [{
						name: '下载量',
						type: 'line',
						smooth: true,
						symbol: 'circle', //拐点样式
						symbolSize: 10, //拐点大小
						data: this.down_num,
						itemStyle: {
							normal: {
								areaStyle: {
//									color: ['rgba(87,182,99,1)', 'rgba(87,182,99,0.1)']
								},
								color: 'rgb(232,245,253)',
								lineStyle: {
									color: '#2d8cf0'
								},
								borderColor:'#2d8cf0'
							}
						}
					}]
				});
			},
			searchDownload() {
				var now_time = new Date();
				if(this.endtime > now_time) {
					this.$Message.info('结束时间不能大于当前日期!')
					return
				}
				if(this.begintime > this.endtime) {
					this.$Message.info('结束时间需大于开始时间!')
					return
				}
				this.down_num = []
				this.down_date = []
				var begin = new Date(this.begintime)
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
				var end = new Date(this.endtime)
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				this.getDayDownloadNumber();

			},
			//获取总下载量
			getDownloadDate() {
				this.$Spin.show();
				downloadList().then(res => {
					this.$Spin.hide();
					this.total_down = res.data.count;
				})
			}
		},
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getDownloadDate();
			this.getDayDownloadNumber();
		}
	}
</script>
<style>
	.download {
		padding-left: 20px;
	}
</style>
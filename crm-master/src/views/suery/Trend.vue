<template>
	<div class="trend">
		<div class="trend-top">
			<div class="basic_indicators">
				<span style="float: left;">基本指标</span>
				<Dropdown style="margin-right: 20px;float: right;" trigger="click">
					<Button type="primary" style="width: 200px;"><span style="float: left;padding-left: 15px;">其他数据</span><Icon type="arrow-down-b" style="float: right;padding-top: 3px;"></Icon></Button>
					<DropdownMenu slot="list" style="width: 200px;">
						<DropdownItem>今日下载量</DropdownItem>
						<router-link to="/totaldownload" tag='div'>
							<DropdownItem>昨日下载量</DropdownItem>
						</router-link>
						<DropdownItem>今日注册量</DropdownItem>
						<DropdownItem>昨日注册量</DropdownItem>
						<DropdownItem>昨日签到人数</DropdownItem>
						<DropdownItem>昨日分享人数</DropdownItem>
						<DropdownItem>昨日鸡蛋报价人数</DropdownItem>
						<DropdownItem>昨日原料报价人数</DropdownItem>
						<DropdownItem>昨日阅读文章数</DropdownItem>
						<DropdownItem>昨日活跃用户(PV)</DropdownItem>
						<DropdownItem>昨日活跃用户(UV)</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<Row style='margin-top: 10px;'>
				<router-link tag='div' to='/p/total-download'>
					<Col class="trend-col" span="3" title="总下载量">
					<span class='date-num'>{{total_down}}</span></br>
					<span>总下载量</span>
					</Col>
				</router-link>
				<!--<router-link tag='div' to='/todaydownload'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{today_down}}</span></br>
					<span>今日下载量</span></br>
					</Col>
				</router-link>
				<router-link tag='div' to='/yesdownload'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_down}}</span></br>
					<span>昨日下载量</span></br>
					</Col>
				</router-link>-->
				<router-link tag='div' to='/totalregist'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{total_regist}}</span></br>
					<span>总注册用户数</span></br>
					</Col>
				</router-link>
				<!--<router-link tag='div' to='/todayregist'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{today_regist}}</span></br>
					<span>今日增加注册数</span></br>
					</Col>
				</router-link>
				<router-link tag='div' to='/yesregist'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_regist}}</span></br>
					<span>昨日增加注册数</span></br>
					</Col>
				</router-link>-->
				<!--<router-link tag='div' to='/yessign'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_sign}}</span></br>
					<span>昨日签到人数</span></br>
					</Col>
				</router-link>
				<router-link tag='div' to='/yesshare'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_share}}</span></br>
					<span>昨日分享人数</span></br>
					</Col>
				</router-link>-->
				<router-link tag='div' to='/totalegg'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{total_egg}}</span></br>
					<span>鸡蛋报价总人数</span></br>
					</Col>
				</router-link>
				<!--<router-link tag='div' to='/yesegg'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_egg}}</span></br>
					<span>昨日鸡蛋报价总人数</span></br>
					</Col>
				</router-link>-->
				<router-link tag='div' to='/totalmaterial'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{total_material}}</span></br>
					<span>原料报价总人数</span></br>
					</Col>
				</router-link>
				<!--<router-link tag='div' to='/yesmaterial'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_material}}</span></br>
					<span>昨日原料报价总人数</span>
					</Col>
				</router-link>-->
				<!--<router-link tag='div' to='/yesread'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_read}}</span></br>
					<span>昨日阅读文章数</span></br>
					</Col>
				</router-link>
				<router-link tag='div' to='/yesuserpv'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_user_pv}}</span></br>
					<span>昨日活跃用户(PV)</span></br>
					</Col>
				</router-link>
				<router-link tag='div' to='/yesuseruv'>
					<Col class="trend-col" span="3">
					<span class='date-num'>{{yes_user_uv}}</span></br>
					<span>昨日活跃用户(UV)</span></br>
					</Col>
				</router-link>-->
			</Row>
		</div>
		<div class="trend-bottom">
			<div class="small_title">
				<span>新增注册用户趋势</span>
				<!--<DatePicker v-model="between" confirm  type="daterange" placeholder="选择开始时间"></DatePicker>-->
				<!--<span style="font-size:16px;margin-left:40px ;">请选择开始时间 : </span>
				<DatePicker v-model="begintime" type="date" placeholder="选择开始时间"></DatePicker>
				<span style="font-size:16px;margin-left:40px ;">请选择结束时间 : </span>
				<DatePicker v-model='endtime' type="date" placeholder="选择结束时间"></DatePicker>
				<Button style="background:#57b663;color: #FFFFFF;margin: 0 20px;" @click="searchTrend">搜索</Button>-->
				<!--<Button style="background:#57b663;color: #FFFFFF;margin: 0 20px;" @click="searchTrend">搜索</Button>-->
			</div>
			<div style="height: 300px;width: 100%;margin-top: 20px;" id="line"></div>
		</div>
	</div>
</template>

<script>
	import { downloadList, registerList, signShareList, EggPriceList, readAndActiveList, getNewDownByDate, telSearchRegist, getTodayActiveUser } from '../../api/api'
	export default {
		methods: {
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('line'));
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
						name: "时间",
						boundaryGap: false,
						axisTick: {
							alignWithLabel: true,
						},
						axisLine: {
							onZero: true,
							lineStyle: {
								color: '#000'
							}
						},
						data: this.new_user_date,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						name: '数量',
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					series: [{
						name: '新增注册用户',
						type: 'line',
						smooth: true, //代表折线或者曲线
						symbol: 'circle', //拐点样式
						symbolSize: 10, //拐点大小
						data: this.new_user_num,
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
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
			searchTrend() {
				this.new_user_num = []
				this.new_user_date = []
				var begin = new Date(this.begintime)
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
				var end = new Date(this.endtime)
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				this.getNewUser();
			},
			//获取下载数据,获取下载详情 ,总下载量,今日下载量,昨日下载量
			getDownloadDate() {
				this.$Spin.show();
				downloadList().then(res => {
					this.$Spin.hide();
					this.total_down = res.data.count;
					this.today_down = res.data.today_down_list.count;
					this.yes_down = res.data.yes_down_list.count;
				})
			},
			//获取注册数据,总注册量,今日注册量,昨日注册量
			getRegisterDate() {
				this.$Spin.show();
				telSearchRegist({
					tel: '',
					type: 1,
					star_time: '',
					end_time: '',
					c_page: 1
				}).then(res => {
					this.$Spin.hide();
					this.total_regist = res.data.count.total;
					this.today_regist = res.data.count.today;
					this.yes_regist = res.data.count.yes;
				})
			},
			//获取昨日签到人数,昨日分享人数
			getSinShare() {
				this.$Spin.show();
				signShareList().then(res => {
					this.$Spin.hide();
					this.yes_sign = res.data.yes_sigin.count;
					this.yes_share = res.data.yes_share.count
				})
			},
			//获取鸡蛋报价原料报价总人数和昨日总人数详情 鸡蛋报价总人数 和昨日鸡蛋报价总人数 原料报价总人数 昨日原料报价总人数
			getEggList() {
				this.$Spin.show();
				EggPriceList().then(res => {
					this.$Spin.hide();
					this.total_egg = res.data.total_egg_price.count;
					this.total_material = res.data.total_staple_price.count;
					this.yes_egg = res.data.yes_egg_price.count;
					this.yes_material = res.data.yes_staple_price.count;
				})
			},
			//获取pv,nv昨日阅读数等
			getReadAndActiveList() {
				this.$Spin.show();
				readAndActiveList().then(res => {
					this.$Spin.hide();
					this.yes_read = res.data.yes_read.views;
				})
				getTodayActiveUser({
					page: '1',
					currentPage: 20,
					keyword: ''
				}).then(res => {
					this.yes_user_pv = res.result.count;
					this.yes_user_uv = res.result.count_uv;
				})
			},

			//获取新增用户趋势
			getNewUser() {
				this.$Spin.show();
				getNewDownByDate({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.$Spin.hide();
					console.log(res)
					res.data.new_down.forEach((item, index) => {
						this.new_user_num.push(item.count)
						this.new_user_date.push(item.date)
					})
					this.draWbatter();
				})
			},
		},
		data() {
			return {
//				begintime: '',
//				endtime: '',
				total_down: '', //总下载量
				today_down: '', //今日下载量
				yes_down: '', //昨日下载量
				total_regist: '', //总注册量
				today_regist: '', //今日注册量
				yes_regist: '', //昨日注册量
				yes_sign: '', //昨日签到人数,
				yes_share: "", //昨日分享人数
				total_egg: '', //鸡蛋报价总人数
				yes_egg: '', //昨日鸡蛋报价总人数
				total_material: '', //原料报价总人数
				yes_material: "", //昨日原料报价总人数
				yes_read: "", //昨日阅读文章数
				yes_user_pv: "", //昨日活跃用户pv
				yes_user_uv: "", //昨日活跃用户uv
				new_user_num: [], //新增用户的总数量
				new_user_date: [], //新增用户的日期
				between:[]
			}
		},
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.between.push(this.begintime,this.endtime)
			this.getDownloadDate();
			this.getRegisterDate();
			this.getSinShare();
			this.getEggList();
			this.getReadAndActiveList();
			this.getNewUser();
		}
	}
</script>

<style>
</style>
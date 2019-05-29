<template>
	<div class="report">
		<pheader></pheader>
		<div style="clear: both;margin-top: 70px;">
			<div class="layout-content">
				<Row>
					<Col span="3" class="nav_bor">
					<Menu width="auto" :active-name="active_name" :open-names="['1','2','3','4']" accordion>
						<Submenu name="1">
							<template slot="title">
								<!--<Icon type="ios-navigate"></Icon>-->
								商品类别
							</template>
							<router-link v-for='(nav,index) in nav_list' :to='nav.to' style='color: #333;' :key="nav.name">
								<MenuItem :name="nav.name">
								<Icon style="display: inline-block;width: 20px;" size='16' :type="nav.icon"></Icon> <span v-html='nav.text'></span>
								</MenuItem>
							</router-link>
						</Submenu>
					
					</Menu>
					</Col>
					<Col span="21" style="height:1200px;overflow-y:scroll;">
					<router-view></router-view>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
	import pheader from '../common/header'
	export default {
		data() {
			return {
				active_name: "1-1",
				nav_list: [{
					to: '/r/saleday-goods',
					name: '1-1',
					text: '服装类',
					icon: 'clipboard'
				}, {
					to: '/r/saleday-user',
					name: '1-2',
					text: '食品类',
					icon: 'clipboard'
				}, {
					to: '/r/saleday-store',
					name: '1-3',
					text: '酒类',
					icon: 'clipboard'
				}, {
					to: '/r/saleday-man',
					name: '1-4',
					text: '家电类',
					icon: 'clipboard'
				}]
			}
		},
		mounted() {
			this.nav_list.forEach((item, index) => {
				if(item.to == this.$route.path) {
					this.active_name = item.name;
				}
			})
			this.nav_list1.forEach((item, index) => {
				if(item.to == this.$route.path) {
					this.active_name = item.name;
				}
			})
			this.nav_list2.forEach((item, index) => {
				if(item.to == this.$route.path) {
					this.active_name = item.name;
				}
			})
			this.nav_list3.forEach((item, index) => {
				if(item.to == this.$route.path) {
					this.active_name = item.name;
				}
			})
		},
		components: {
			pheader
		}
	}
</script>

<style>

</style>

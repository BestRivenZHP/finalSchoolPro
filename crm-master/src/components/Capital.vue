<template>
	<div class="capital">
		<pheader></pheader>
		<div style="clear: both;margin-top: 70px;">
			<div class="layout-content">
				<Row>
					<Col span="3" class="nav_bor">
					<Menu width="auto" :active-name="active_name" :open-names="['1','2','3','4']">
						<Submenu name="1">
							<template slot="title">
								<!--<Icon type="ios-navigate"></Icon>-->
								资金
							</template>
							<router-link v-for='(nav,index) in nav_list' :to='nav.to' style='color: #333;' :key="nav.name">
								<MenuItem :name="nav.name">
								<Icon style="display: inline-block;width: 20px;" size='16' :type="nav.icon"></Icon> <span v-html='nav.text'></span>
								</MenuItem>
							</router-link>
						</Submenu>
					</Menu>
					</Col>
					<Col span="21" style="height:1200px;overflow-y:scroll">
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
				nav_list: [{
						to: '/c/account-manager',
						name: '1-1',
						text: '应收账款管理',
						icon: 'social-usd-outline'
					},
					{
						to: '/c/pay-manager',
						name: '1-2',
						text: '应付账款管理',
						icon: 'social-usd'
					},
					{
						to: '/c/receipts-search',
						name: '1-3',
						text: '现金收支查询',
						icon: 'social-yen-outline'
					},
					{
						to: '/c/receipts-advance',
						name: '1-4',
						text: '预收款管理',
						icon: 'social-yen'
					},
					{
						to: '/c/pay-advance',
						name: '1-5',
						text: '预付款管理',
						icon: 'social-euro-outline'
					}
				],
				active_name: "1-1",
			}
		},
		mounted() {
			this.nav_list.forEach((item, index) => {
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

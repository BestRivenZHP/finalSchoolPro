<style>
  .ivu-modal-wrap .ivu-modal {
    top: 35%;
  }
</style>
<template>
	<div>
		<topheader></topheader>
		<div style="clear: both;margin-top: 70px;">
			<div class="layout-content">
				<Row>
					<Col span="3" class="nav_bor">
					<Menu width="auto" :active-name="active_name" :open-names="['1','2','3','4']">
						<Submenu name="1">
							<template slot="title" style="background: #2D8CF0;">
								<!--<Icon type="ios-navigate"></Icon>-->
								采购
							</template>
							<router-link v-for="(nav,index) in nav_list" :to='nav.to' style='color: #333;' :key="nav.name">
								<MenuItem :name="nav.name">
								<Icon style="display: inline-block;width: 20px;" size='16' :type="nav.icon"></Icon> {{nav.text}}</MenuItem>
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
	import topheader from '../common/header'
	export default {
		components: {
			topheader
		},
		methods: {

		},
		mounted() {
			this.nav_list.forEach((item, index) => {
				if(item.to == this.$route.path) {
					this.active_name = item.name;
				}
			})
		},
		data() {
			return {
				nav_list: [{
						to: '/d/purchase-order',
						name: '1-1',
						text: '采购订单',
						icon: 'clipboard'
					}
					/*{
						to: '/d/purchase-return',
						name: '1-3',
						text: '采购退货入库',
						icon: 'ios-cloud-download'
					}*/
				],
				active_name: "1-1",
			}
		}
	}
</script>

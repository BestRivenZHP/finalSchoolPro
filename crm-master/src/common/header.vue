<template>
	<div>
		<div class="header_big">
			<div class="header_logo">
				<img src="../assets/jianong_friend.png" style="display: inline-block;height: 35px;width: 30px;float: left;margin-top: 16px;" alt="" />
				<div style="float: left;line-height: 20px;margin-top: 25px;font-size: 18px;margin-left: 10px;font-weight: bold;">
					<span>流通企业进销存管理系统</span>
				</div>
			</div>
			<ul>
				<router-link v-for='(nav,index) in top_nav' :to="nav.to" tag='li' :key="nav.state" v-if="nav.status == 0">
					<li :class="nav.state">
						<Icon size="16" :type="nav.icon"></Icon> {{nav.text}}</li>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				top_nav: [{
					to: "/",
					text: '首页',
					icon: 'ios-folder-outline',
					state: '',
          status: 1,
					join: '/p/'
				}, {
					to: '/userdata',
					text: '采购',
          status: 1,
					icon: 'ios-filing-outline',
					join:'/d/',
					state: ''
				}, {
					to: '/stock',
					text: '库存',
          status: 1,
					icon: 'ios-box-outline',
          join: '/s/',
					state: ''
				}, {
					to: '/sale',
					text: '销售',
          status: 1,
					icon: 'ios-cart-outline',
          join: '/x/',
					state: ''
				}, {
					to: '/userrelation',
          text: '客户关系',
          status: 1,
          icon: 'ios-copy-outline',
          join:'/user/',
          state: ''
				}, /*{
					to: '/capital',
          text: '资金',
          status: 0,
          icon: 'ios-calculator-outline',
          join:'/c/',
          state: ''
				},*/ {
					to: '/report',
          text: '商品',
          status: 1,
          icon: 'navicon',
          join:'/r/',
          state: ''
				}, {
					to: '/basedata',
					text: '基础数据',
          status: 1,
					icon: 'ios-briefcase-outline',
          join: '/b/',
					state: ''
				}, {
          to: '/systemmanage',
          text: '系统管理',
          status: 1,
          icon: 'ios-gear-outline',
          join: '/m/',
          state: ''
        }],
			}
		},
		mounted(){
	
  
      if(sessionStorage.getItem('is_admin') == 0){
				
        this.top_nav[this.top_nav.length-1]["status"] = 0
			}
			if(sessionStorage.getItem('is_admin') == 1){
				this.top_nav[0]["status"] = 0;
				this.top_nav[1]["status"] = 0;
				this.top_nav[2]["status"] = 0;
				this.top_nav[3]["status"] = 0;
				this.top_nav[4]["status"] = 0;
				this.top_nav[5]["status"] = 0;
				this.top_nav[6]["status"] = 0;
				
		}
		}
	}
</script>

<style>
 .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #ffffff !important;
    border-right: 2px solid #2d8cf0;
    z-index: 2;
}
</style>

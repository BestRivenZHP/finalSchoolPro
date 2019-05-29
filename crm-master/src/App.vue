<template>
	<div id="app">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		 provide (){
     return {
       reload:this.reload
		  }
		 },
		  data(){
       return {
       isRouterAlive:true
     } 
   },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
		}
	}
	}
</script>

<style>
	.ivu-tabs-bar {
		padding: 0;
		margin: 0;
	}
	/*.ivu-tabs-bar {
		border: none;
		height: 72px;
		background: linear-gradient(to right, rgb(41, 69, 203), rgb(55, 152, 254));
	}*/
	/*.ivu-tabs-nav .ivu-tabs-tab {
		height: 72px;
		line-height: 72px;
		font-size: 16px;
		padding: 0 20px;
		color: #FFFFFF;
	}*/

	.nav_bor {
		/* min-height: 900px; */
    min-height: 1200px;
		/*border-right: 1px solid rgb(50,117,226);*/
		background: linear-gradient(to bottom, rgb(48, 106, 218), rgb(55, 152, 254));
	}

	.ivu-menu-item {
		font-size: 12px;
	}

	.header_big:after,
	.header_big:before,
	.basic_indicators:after {
		clear: both;
		content: "";
		display: table;
	}

	.header_big {
		height: 72px;
		line-height: 70px;
		border-bottom: 2px solid linear-gradient(to right, rgb(47, 105, 216), rgb(56, 153, 254));
		width: 100%;
		background: linear-gradient(to right, rgb(47, 105, 216), rgb(56, 153, 254));
		color: #FFFFFF;
		font-size: 16px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.header_big ul {
		margin-left: 250px;
	}

	.header_big ul li {
		float: left;
		/* width: 100px; */
    padding: 0 15px;
		text-align: center;
		height: 70px;
		cursor: pointer;
	}

	.header_logo {
		float: left;
		margin-left: 20px;
	}

	.small_title {
		margin: 10px 0;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-bottom: 2px solid #e3e8ee;
	}

	.trend {
		padding-left: 20px;
	}

	.basic_indicators {
		font-size: 18px;
		color: rgb(51, 110, 218);
		padding: 10px 0;
		margin-top: 10px;
		font-weight: bold;
		border-bottom: 2px solid #e3e8ee;
	}

	.trend-bottom {
		position: relative;
	}

	.trend-col {
		cursor: pointer;
		margin-bottom: 10px;
	}

	.date-num {
		font-size: 32px;
		color: #464c5b;
		line-height: 48px;
		display: inline-block;
		width: 100%;
	}

	.date-num:hover {
		color: #2d8cf0;
	}

	.trend-col:hover {
		color: #2d8cf0;
	}

	.nav_border {
		border-bottom: 4px solid #fff;
	}

	.ivu-menu-item {
		background: rgb(49, 114, 227);
		border-right: 2px solid #2D8CF0;
		color: #fff;
	}

	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		color: #fff;
		background: rgb(114, 156, 229);
		border: none;
	}

	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
		border: none;
	}

	.ivu-menu-submenu-title {
		background: rgb(47, 106, 217);
		color: #fff;
	}

	.from-text {
		line-height: 30px;
		text-align: center;
	}

	.page_unit {
		margin-top: 20px;
		float: right;
	}

	.ivu-table:after,
	.ivu-table:before {
		background: none;
	}

	.ivu-table-wrapper {
		border: none;
	}

	.ivu-table th,
	.ivu-table-cell {
		text-align: center;
	}

	.ivu-table td.datelink {
		color: rgba(56, 153, 254, .9);
	}

	.ivu-table td.datelink:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, .5);
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(56, 153, 254, .5);
	}

	::-webkit-scrollbar-thumb:active {
		background-color: rgba(56, 153, 254, .7)
	}

	html,
	body {
		scrollbar-3dlight-color: rgba(56, 153, 254, .3);
		scrollbar-highlight-color: rgba(56, 153, 254, .3);
		scrollbar-face-color: rgba(56, 153, 254, .3);
		scrollbar-arrow-color: rgba(56, 153, 254, .3);
		scrollbar-shadow-color: rgba(56, 153, 254, .3);
		scrollbar-dark-shadow-color: rgba(56, 153, 254, .3);
		scrollbar-base-color: rgba(56, 153, 254, .3);
		scrollbar-track-color: rgba(56, 153, 254, .3);
	}

	scrollbar {
		width: 8px;
		height: 8px;
		-moz-appearance: none !important;
		background: rgba(56, 153, 254, .5) !important;
	}
	/* 滚动条按钮颜色 */

	thumb,
	scrollbarbutton {
		-moz-appearance: none !important;
		background-color: rgba(56, 153, 254, .5) !important;
	}
	/* 鼠标悬停时按钮颜色 */

	thumb:hover,
	scrollbarbutton:hover {
		-moz-appearance: none !important;
		background-color: rgba(56, 153, 254, .5) !important;
	}
	/* 隐藏上下箭头 */

	scrollbarbutton {
		display: none !important;
	}
	/* 设置导航栏层级 */

	.ivu-menu-vertical .ivu-menu-item,
	.ivu-menu-vertical .ivu-menu-submenu-title {
		z-index: 900;
	}

	.ivu-menu-vertical .ivu-menu-item,
	.ivu-menu-vertical .ivu-menu-submenu-title {
		z-index: 900;
	}
	/* 模态框居中 */

	.ivu-modal-wrap .ivu-modal {
		top: 15%;
	}

  body,html {
   height: 100%;
   overflow:scroll;
   overflow-x:hidden;
   overflow-y:hidden;
  /* padding-bottom:5%; */
  }
  .purchase_order {
    padding: 5px 20px;
    padding-bottom: 50px;
    position:fixed;
    top:6em;
    bottom:0;
    width: 87.5%;
    overflow:scroll;
    overflow-x:hidden;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #ffffff !important;
    border-right: 2px solid #2d8cf0;
    z-index: 2;
}





  .ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0 !important;
    border-left: 0px !important;
  }
  .ivu-table-wrapper .ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #ffffff;
    border-left: 0px;
  }
  .ivu-table-wrapper .ivu-table,.ivu-table-wrapper .ivu-table-border td, .ivu-table-wrapper .ivu-table-border th {
    border-right: 0px;
    border-left: 0px;
}
.ivu-table-wrapper .ivu-table:after {
    content: '';
    width: 0px;
    height: 100%;
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    background-color: #dddee1;
    z-index: 3;
}
.ivu-table-wrapper .ivu-table-header,.ivu-table-wrapper .ivu-table-body{
  border-left: 0px;
}
.ivu-menu-item:hover{
  color: #ffffff;
  background: #4876FF !important;
}
/* .ivu-menu-vertical .ivu-menu-submenu-title:hover{
  color: rgb(56, 153, 254);
  background: rgba(255,255,255,.3);
}
.ivu-menu-vertical .ivu-menu-item:hover{
  color: rgb(56, 153, 254);
  background: rgba(255,255,255,.3);
} */
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: #4876FF !important;
}

.ivu-table td.moreinfo {
    color: red;
}
ivu-table-wrapper ivu-table ivu-table-cell {
  text-align: left;
}
</style>

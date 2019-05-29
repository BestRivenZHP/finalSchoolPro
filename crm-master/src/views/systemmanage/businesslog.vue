<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			业务日志
		</div>
		<Table stripe :columns="logListInfo" :data="log_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
	import { getBizLog } from '../../api/api'
	export default {
		data() {
			return {
				model1: true,
				value: "",
				cityList: "",
				logListInfo: [{
						title: '序号',
            align: "center",
            key: 'numid',
						/*key: 'id',*/
					},
					{
						title: '登录名',
            align: "center",
						key: 'login_name',
					}, {
						title: '姓名',
            align: "center",
						key: 'user_name',
					}, {
						title: 'IP',
            align: "center",
						key: 'ip',
					}, {
						title: 'IP所属地',
						key: 'ip_from',
            align: "center",
					}, {
						title: '日志分类',
						key: 'log_category',
            align: "center",
					}, {
						title: '日志内容',
						key: 'info',
            align: "center",
					}, {
						title: '日志记录时间',
						key: 'date_created',
            align: "center",
					}
				],
				log_list: [],
				pageSize: 20,
				dataCount: 0
			}
		},
		methods: {
      /*分页*/
			changepage(index) {
				this.log_list=[]
				getBizLog({
          ticket: sessionStorage.getItem("ticket"),
					id: sessionStorage.getItem('uid'),
					page: index
				}).then(res => {
          var num = 1
          res.data.list.forEach((item,index) => {
            item['numid'] = num++
          })
					this.dataCount = res.data.count
					this.log_list = res.data.list
				})
			},
		},
		mounted() {
      /*获取业务日志列表*/
			getBizLog({
        ticket: sessionStorage.getItem("ticket"),
				id: sessionStorage.getItem('uid'),
				page: 1
			}).then(res => {
        var num = 1
          res.data.list.forEach((item,index) => {
            item['numid'] = num++
          })
				this.dataCount = res.data.count
				this.log_list = res.data.list
			})
		}
	}
</script>

<style>
	/* .purchase_order {
    padding: 0 20px;
    padding-bottom: 400px;
  } */
</style>

<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件(请选择日期)
		</div>
		<Row style='margin: 20px 0;line-height: 30px;'>
			<Col span="1">业务日期 </Col>
			<Col span="3">
			<DatePicker type="date" placeholder="开始时间" v-model="starttime" :options="options"></DatePicker>
			</Col>
			<Col span="3">
			<DatePicker type="date" placeholder="结束时间" v-model="endtime" :options="options"></DatePicker>
			</Col>
			<Col span="2" style="margin-left: 20px;">
			<Button type="primary" @click="gettotalaccount">查询</Button> </Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			现金收支流水明细
		</div>
		<Table stripe :columns="totalaccountlist" :data="totalaccountdata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
	</div>
</template>

<script>
  import { totalAccount } from '../../api/api'
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
				totalaccountlist: [{
						title: '业务日期',
            align: "center",
						key: 'bizDT',
					},
					{
						title: '收',
            align: "center",
						key: 'inMoney'
					},
					{
						title: '支',
            align: "center",
						key: 'outMoney',
						//						sortable: true
					},
					{
						title: '余额',
            align: "center",
						key: 'balanceMoney'
					}, {
						title: '操作',
						key: 'action',
						fixed: 'right',
						width: 100,
						align: 'center',
						render: (h, params) => {
							return h('p', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'default'
									},
									style: {
										marginRight: '8px'
									},
									on: {
										click: () => {
											this.$router.push('/c/receipts-seinfo/' + params.row.bizDT)
										}
									}
								}, '查看明细'),
							]);
						}
					}
				],
				totalaccountdata: [],
				pageSize: 20,
				dataCount: 0,
        starttime: '',
        endtime: '',
			}
		},
    methods:{
      /*分页*/
      changepage(index){
        totalAccount({
          ticket: sessionStorage.getItem("ticket"),
          dtFrom: this.starttime,
          dtTo: this.endtime,
          page: index
        }).then(res => {
          this.dataCount = res.data.data.totalCount
          this.totalaccountdata = res.data.data.dataList
        })
      },
      gettotalaccount(){
        if(this.starttime){
          var start = new Date(this.starttime)
          var month1 = (start.getMonth()+1)>=10?(start.getMonth()+1):'0'+(start.getMonth()+1)
          var day1 = start.getDate()>=10?start.getDate():'0'+start.getDate()
          this.starttime = start.getFullYear() + '-' + month1 + '-' + day1
        }else{
          this.$Message.info("请选择开始时间")
        }
        if(this.endtime){
          var end = new Date(this.endtime)
          var month1 = (end.getMonth()+1)>=10?(end.getMonth()+1):'0'+(end.getMonth()+1)
          var day1 = end.getDate()>=10?end.getDate():'0'+end.getDate()
          this.endtime = end.getFullYear() + '-' + month1 + '-' + day1
        }else{
          this.$Message.info("请选择结束时间")
        }
        totalAccount({
          ticket: sessionStorage.getItem("ticket"),
          dtFrom: this.starttime,
          dtTo: this.endtime
        }).then(res => {
          this.dataCount = res.data.data.totalCount
          this.totalaccountdata = res.data.data.dataList
        })
      }
    },
    mounted(){

    }
	}
</script>

<style>
	.receipts {
		padding: 0 20px;
	}
</style>

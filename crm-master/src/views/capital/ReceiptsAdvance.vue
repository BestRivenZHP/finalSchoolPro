<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row>
			<Col span="4" style="margin: 20px 0;">
			<Row>
				<Col span="6" class="from-text">客户分类</Col>
				<Col span="18">
				<Select v-model="usercategoryvalue">
					<Option v-for="item in usercategorylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin: 20px 0;margin-left: 20px;">
			<Button type="primary" @click="getreceiptsadvance">查询</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			预收款管理列表
			<Button type="primary" style="margin-left: 50px;" @click="getMoney">收取预收款</Button>
			<Button type="primary" style="margin-left: 30px;" @click="returnMoney">退还预收款</Button>
		</div>
		<Table stripe :columns="receiptsadvancelist" :data="receiptsadvancedata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
		<Modal v-model="get_money" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>收取客户预付款</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>客户</Col>
					<Col span="18">
					<Select v-model="incustomervalue">
          <Option v-for="item in customerslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>收款日期</Col>
					<Col span="18">
					<DatePicker type="date" style='width: 100%;' placeholder="请选择日期" v-model="inmoneydate" :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>收款金额</Col>
					<Col span="18">
					<Input v-model="inpremoney"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>收款人</Col>
					<Col span="18">
					<Select v-model="inmoneyuservalue">
          <Option v-for="item in alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="getpreinmoneys">保存</Button>
				<Button type="primary" @click="closeGetModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="return_money" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>退还客户预付款</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>客户</Col>
					<Col span="18">
					<Select v-model="outcustomervalue">
          <Option v-for="item in customerslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>退款日期</Col>
					<Col span="18">
					<DatePicker type="date" style='width: 100%;' placeholder="请选择日期" v-model="outmoneydate" :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>退款金额</Col>
					<Col span="18">
					<Input v-model="outpremoney"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>退款人</Col>
					<Col span="18">
					<Select v-model="outmoneyuservalue">
          <Option v-for="item in alluserslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="outpreinmoneys">保存</Button>
				<Button type="primary" @click="closeReturnModal">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
  import { getAllUserList,perInMoney,getAllUsers,allCustomer,getPreInmoney,outPreInmoney } from '../../api/api'
	export default {
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        incustomervalue: '',
        outcustomervalue: '',
        inmoneyuservalue: '',
        outmoneyuservalue: '',
        inmoneydate: '',
        outmoneydate: '',
        inpremoney: '',
        outpremoney: '',
        usercategorylist: [],
        alluserslist: [],
        customerslist: [],
        usercategoryvalue: 'ADFE740D-F66A-11E7-9E81-00163E03B878',
				get_money: false,
				return_money:false,
				receiptsadvancelist: [{
						title: '客户编码',
            align: "center",
						key: 'code',
					},
					{
						title: '客户名称',
            align: "center",
						key: 'name'
					},
					{
						title: '收',
            align: "center",
						key: 'inMoney',
					},
					{
						title: '支',
            align: "center",
						key: 'outMoney'
					},
					{
						title: '预付款余额',
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
                      this.$router.push('/c/ReceiptsAdvanceinfo/' + params.row.customerId)
                    }
                  }
                }, '查看明细'),
              ]);
            }
          }
				],
				receiptsadvancedata: [],
				pageSize: 20,
				dataCount: 0,
        company_id: '6C2A09CD-A129-11E4-9B6A-782BCBD7746B',
			}
		},
		mounted() {
      this.getusercategorys()
      this.getUsers()
      this.getreceiptsadvance()
      this.getAllCustomers()
		},
    /*watch:{
      'usercategoryvalue': 'getreceiptsadvance'
    },*/
		methods: {
      /*收取预收款*/
      getpreinmoneys(){
        if(!this.incustomervalue){
          this.$Message.info('请选择客户')
        }
        if(!this.inpremoney){
          this.$Message.info('请输入收款金额')
        }
        if(!this.inmoneydate){
          this.$Message.info('请选择收款日期')
        }
        if(this.inmoneydate){
          var time = new Date(this.inmoneydate)
          var month1 = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day1 = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.inmoneydate = time.getFullYear() + '-' + month1 + '-' +day1
        }else{
          this.inmoneydate = ""
        }
        getPreInmoney({
          ticket: sessionStorage.getItem("ticket"),
          customerId: this.incustomervalue,
          bizDT: this.inmoneydate,
          inMoney: this.inpremoney,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('收取成功')
            this.closeGetModal()
            this.getreceiptsadvance()
          }
        })
      },
      /*退还预收款*/
      outpreinmoneys(){
        if(!this.outcustomervalue){
          this.$Message.info('请选择客户')
        }
        if(!this.outpremoney){
          this.$Message.info('请输入收款金额')
        }
        if(!this.outmoneydate){
          this.$Message.info('请选择收款日期')
        }
        if(this.outmoneydate){
          var time = new Date(this.outmoneydate)
          var month1 = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day1 = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.outmoneydate = time.getFullYear() + '-' + month1 + '-' +day1
        }else{
          this.outmoneydate = ""
        }
        outPreInmoney({
          ticket: sessionStorage.getItem("ticket"),
          customerId: this.outcustomervalue,
          bizDT: this.outmoneydate,
          outMoney: this.outpremoney,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('退还成功')
            this.closeReturnModal()
            this.getreceiptsadvance()
          }
        })
      },
      /*分页*/
      changepage(){

      },
      /*获取客户数据*/
      getAllCustomers(){
        allCustomer({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.label = item.name
            temp.value = item.id
             this.customerslist.push(temp)
          })
        })
      },
      /*获取收款人列表*/
      getUsers(){
        getAllUsers({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.alluserslist.push(temp)
          })
        })
      },
      /*获取客户分类*/
      getusercategorys(){
        getAllUserList({
          ticket: sessionStorage.getItem("ticket"),
          loginUserId: this.company_id,
          page: 1,
          limit: 20
        }).then(res => {
          res.data.data.forEach((item,index) => {
            if(item.name){
              var temp = {}
              temp.value = item.id
              temp.label = item.name
              this.usercategorylist.push(temp)
            }
          })
        })
       /* console.log(this.usercategorylist)*/
      },
      /*获取预收款管理列表*/
      getreceiptsadvance(){
        this.receiptsadvancedata = []
        this.dataCount = 0
        perInMoney({
          ticket: sessionStorage.getItem("ticket"),
          categoryId: this.usercategoryvalue
        }).then(res => {
          this.receiptsadvancedata = res.data.data.dataList
          this.dataCount = res.data.data.totalCount
        })
      },
			getMoney() {
				this.get_money = true;
			},
			closeGetModal() {
				this.get_money = false;
			},
			returnMoney(){
				this.return_money=true;
			},
			closeReturnModal(){
				this.return_money=false;
			}
		}
	}
</script>

<style>
	/* .account {
    padding: 0 20px;
  } */
</style>

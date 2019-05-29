<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			仓库
			<Button type="primary" style="margin-left:50px;" @click="addStock">新增仓库</Button>
			<!-- <Button type="primary" style="margin-left:30px;" @click="toaccount">打开库存建账模块</Button> -->
		</div>
		<Table stripe :columns="stockdata" :data="stocklist"></Table>
		<!--<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>-->

		<!--新增仓库弹窗-->
		<Modal v-model="add_stock" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增仓库</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>仓库编码</Col>
					<Col span="18">
					<Input v-model="addStockCode"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>仓库名称</Col>
					<Col span="18">
					<Input v-model="addStockName"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addStocks">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<!--编辑仓库弹窗-->
		<Modal v-model="edit_stock" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑仓库</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;" >仓库编码</Col>
					<Col span="18">
					<Input v-model="editStockCode" disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">仓库名称</Col>
					<Col span="18">
					<Input v-model="editStockName"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="editStocks">保存</Button>
				<Button type="primary" @click="closeEditModal">取消</Button>
			</div>
		</Modal>
		<!--修改数据域弹窗-->
		<Modal v-model="revise_data" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>修改数据域</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">仓库编码</Col>
					<Col span="18">
					<Input v-model="dataorgCode"  disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">仓库名称</Col>
					<Col span="18">
					<Input v-model="dataorgName"  disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;color:#000;">原数据域</Col>
					<Col span="18">
					<Input v-model="dataorg" disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">新数据域</Col>
					<Col span="18">
					<Select v-model="newDataOrg" @on-change="getOption1">
          <Option v-for="item in alldataorgs" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="updateDataOrgs">保存</Button>
				<Button type="primary" @click="closeReviseModal">取消</Button>
			</div>
		</Modal>
    <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此仓库吗?</span>
      </p>
      <p>您正在执行删除操作!</p>
      <div slot="footer">
        <Button type="primary" @click="delTrue">确认</Button>
        <Button type="primary" @click="delFalse">取消</Button>
      </div>
    </Modal>
	</div>
</template>

<script>
  import { addNewStock,getStockinfos,deleteStock,updatedataorg,getAlldatedataorg } from '../../api/api'
	export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getStockInfo()
      this.getAlldatedataorginfo()
    },
    data() {
      return {
        add_stock: false,
        edit_stock: false,
        revise_data: false,  //修改数据域模态框
        del_modal: false,
        addStockName: '',  //仓库名称
        addStockCode: '',  //仓库编码
        editStockName: '',
        editStockCode: '',
        editStockId: '',
        deleteStockId: '',
        dataorgCode: '',  //修改数据域时仓库编码
        dataorgName: '',  //修改数据域时仓库名称
        dataorg: '',  //数据域
        alldataorgs: [],
        newDataOrg: '',
        value: "",
        cityList: "",
        stockoptions: [],
        stockdata: [{
            title: '序号',
            key: 'numid',
            align: "center",
          },
          {
            title: '仓库编码',
            key: 'code',
            align: "center",
          }, {
            title: '仓库名称',
            key: 'name',
            align: "center",
          }, {
            title: '库存建账',
            key: 'finishStatus',
            align: "center",
          }, {
            title: '创建人的数据域',
            key: 'data_org',
            align: "center",
          },
          {
            title: '操作',
            key: 'action',
            width: 270,
            /*fixed: 'right',*/
            align: 'center',
            render: (h, params) => {
              return h('p', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'default'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.edit_stock = true;
                      this.editStockName = params.row.name
                      this.editStockCode = params.row.code
                      this.editStockId = params.row.id
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'default'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.deleteStockId = params.row.id;
                      this.del_modal = true
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: ()=> {
                      this.revise_data = true
                      this.dataorgId = params.row.id
                      this.dataorg = params.row.data_org
                      this.dataorgName = params.row.name
                      this.dataorgCode = params.row.code
                    }
                  }
                }, '修改数据域')
              ]);
            }
          }
        ],
        stocklist: [],
        pageSize: 10,
        dataCount: 100,
        selectValue: '',
      }
    },
    methods: {
      /*删除确认操作*/
      delTrue(){
        this.deleteStocks()
        this.del_modal = false
      },
      delFalse(){
        this.del_modal = false
      },
      /*跳转到仓库建账*/
      toaccount(){
        this.$router.push('/s/stockcreateaccount')
      },
      /*添加仓库*/
      addStocks(){
        if(this.addStockName == "" || this.addStockCode == ""){
          this.$Message.info("请您填写完整添加信息")
          return
        }
        addNewStock({
          ticket: this.$store.state.ticket,
          name: this.addStockName,
          code: this.addStockCode
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功');
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.addStockName = ''
             this.addStockCode = ''
             this.getStockInfo()
             this.closeAddModal()
             return
          }
        this.closeAddModal()
        this.getStockInfo()
        this.addStockName = ''
        this.addStockCode = ''
        })
      },
      /*编辑仓库*/
      editStocks(){
        addNewStock({
          ticket: this.$store.state.ticket,
          name: this.editStockName,
          code: this.editStockCode,
          id: this.editStockId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改成功');
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getStockInfo()
             this.closeEditModal()
             return
          }
        this.closeEditModal()
        this.getStockInfo()
        })
      },
      /*删除仓库*/
      deleteStocks(){
        deleteStock({
          ticket: this.$store.state.ticket,
          id: this.deleteStockId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('删除成功');
          }else{
            this.$Message.info(res.msg);
          }
          this.getStockInfo()
        })
      },
      /*获取仓库列表*/
      getStockInfo(){
        getStockinfos({
          ticket: this.$store.state.ticket,
        }).then(res => {
          this.stocklist = res.data
          let num = 1
          this.stocklist.forEach((item,index) => {
            item["numid"] = num++
            if(item.inited == 1){
              item["finishStatus"] = "建账完毕"
            }else if(item.inited == 0){
              item["finishStatus"] = "未建账"
            }
          })
        })
      },
      /*获取下拉表单值*/
      getOption1(value){
        this.selectValue = value
      },
      /*获取数据域列表*/
      getAlldatedataorginfo(){
        getAlldatedataorg({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            if(item.data_org){
            temp.value = item.data_org
            temp.label = item.data_org
            this.alldataorgs.push(temp)
            }
          })
        })
      },
      /*修改数据域*/
      updateDataOrgs(){
        updatedataorg({
          ticket: this.$store.state.ticket,
          id: this.dataorgId,
          data_org: this.selectValue
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改数据域成功');
          }
          this.closeReviseModal()
          this.getStockInfo()
        })
      },
      changepage() {},
      /*  显示添加仓库模态框  */
      addStock() {
        this.add_stock = true;
        this.addStockCode = ""
        this.addStockName = ""
      },
      closeAddModal() {
        this.add_stock = false;
      },
      closeEditModal() {
        this.edit_stock = false;
      },
      closeReviseModal(){
        this.revise_data = false;
      }
    },
	}
</script>

<style>
	/*.purchase_order {
		padding: 0 20px;
	}*/
</style>

<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			价格体系
			<Button type="primary" style="margin-left:50px;" @click="addPrice">新增价格</Button>
		</div>
		<Table stripe :columns="priceSystemData" :data="priceSystemList"></Table>
		<!--<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>-->
		<!--添加价格弹窗-->
		<Modal v-model="add_price" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增价格</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>价格名称</Col>
					<Col span="18">
					<Input v-model="addPricename"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>销售基准倍数</Col>
					<Col span="18">
					<Input v-model="addFactor"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addPrices">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<!--编辑价格弹窗-->
		<Modal v-model="edit_price" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑价格</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;" >价格名称</Col>
					<Col span="18">
					<Input v-model="editPricename" disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">销售基准倍数</Col>
					<Col span="18">
					<Input v-model="editFactor"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="editPrices">保存</Button>
        <Button type="primary" @click="closeEditModal">取消</Button>
      </div>
    </Modal>
    <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此价格体系吗?</span>
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
  import { PriceSystemListinfo,addNewPrice,deletePrice } from '../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getPriceSystemList()
    },
    data() {
      return {
        add_price:false,
        edit_price:false,
        del_modal: false,
        model1: true,
        value: "",
        addFactor: '',   //销售基准倍数
        addPricename: '',  //价格名称
        editId: '',
        editFactor: '',
        editPricename: '',
        deleteId: '',
        priceSystemData: [{
            title: '序号',
            key: 'numid',
            align: "center",
          },
          {
            title: '价格名称',
            key: 'name',
            align: "center",
          }, {
            title: '销售基准价的倍数',
            key: 'factor',
            align: "center",
          },
          {
            title: '操作',
            key: 'action',
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
                    click: ()=> {
                      console.log(params.row)
                      this.edit_price=true;
                      this.editId = params.row.id
                      this.editPricename = params.row.name
                      this.editFactor = params.row.factor
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
                      this.del_modal = true
                      this.deleteId = params.row.id
                      /*this.deletePrices()*/
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        priceSystemList: [],
        pageSize: 10,
        dataCount: 0,
      }
    },
    methods: {
      /*删除确认操作*/
      delTrue(){
        this.deletePrices()
        this.del_modal = false
      },
      delFalse(){
        this.del_modal = false
      },
      /*获取价格体系列表*/
      getPriceSystemList(){
        PriceSystemListinfo({
          ticket:this.$store.state.ticket,
        }).then(res => {
          this.priceSystemList = res.data
          this.dataCount = res.data.length
          var num = 1
          this.priceSystemList.forEach((item,index) => {
            item['numid'] = num++
          })
        })
      },
      /*新增价格*/
      addPrices(){
        if(this.addPricename == "" || this.addFactor == ""){
          this.$Message.info("请您填写完整添加信息")
          return
        }
        addNewPrice({
          ticket:this.$store.state.ticket,
          name: this.addPricename,
          factor: this.addFactor
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功');
            this.getPriceSystemList()
            this.closeAddModal()
            this.addPricename = ''
            this.addFactor = ''
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getPriceSystemList()
             this.closeAddModal()
             this.addPricename = ''
             this.addFactor = ''
          }
        })
      },
      /*编辑价格*/
      editPrices(){
        if(this.editPricename == "" || this.editFactor == ""){
          this.$Message.info("请您填写完整信息")
          return
        }
        addNewPrice({
          ticket:this.$store.state.ticket,
          name: this.editPricename,
          factor: this.editFactor,
          id: this.editId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改成功');
            this.getPriceSystemList()
            this.closeEditModal()
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getPriceSystemList()
             this.closeEditModal()
          }
        })
      },
      /*删除价格*/
      deletePrices(){
        deletePrice({
          ticket: sessionStorage.getItem("ticket"),
          id: this.deleteId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('删除成功');
            this.getPriceSystemList()
            this.del_modal = false
          }
        })
      },
      changepage() {},
      /*显示添加价格模态框*/
      addPrice(){
        this.add_price=true;
        this.addPricename = ""
        this.addFactor = ""
      },
      closeAddModal(){
        this.add_price=false;
      },
      closeEditModal(){
        this.edit_price=false;
      }
    },
	}
</script>

<style>
	/*.purchase_order {
		padding: 0 20px;
	}*/
</style>

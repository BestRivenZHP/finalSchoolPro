<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      供应商分类
      <Button type="primary" style="margin-left:50px;" @click="addSupplier">新增供应商分类</Button>
    </div>
    <Table stripe :columns="supliercategorydata" :data="supliercategorylist"></Table>
    <!--<div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>-->
    <!--新增供应商分类弹窗-->
    <Modal v-model="add_supplier" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增供应商分类</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>分类编码</Col>
					<Col span="18">
					<Input v-model='addcategoryCode'></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>分类名称</Col>
					<Col span="18">
					<Input v-model='addcategoryName'></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addCategorys">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<!---->
		<Modal v-model="edit_supplier" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑供应商分类</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">分类编码</Col>
					<Col span="18">
					<Input v-model='editcategoryCode' disabled></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">分类名称</Col>
					<Col span="18">
					<Input v-model='editcategoryName'></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="editCategorys">保存</Button>
				<Button type="primary" @click="closeEditModal">取消</Button>
			</div>
		</Modal>
    <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此价供应商分类吗?</span>
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
  import { getSupplierCategoryList,addSupplierCategory,deleteSupplierCategory } from '../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getSupplierCategoryinfo()
    },
    methods:{
      /*删除确认操作*/
      delTrue(){
        this.deleteCategorys()
        this.del_modal = false
      },
      delFalse(){
        this.del_modal = false
      },
      /*获取供应商分类列表*/
      getSupplierCategoryinfo(){
        getSupplierCategoryList({
          ticket: this.$store.state.ticket,
        }).then(res => {
          this.supliercategorylist = res.data
          this.dataCount = res.data.length
          var num = 1
          this.supliercategorylist.forEach((item,index) => {
            item['numid'] = num++
          })
        })
      },
      /*新增供应商分类*/
      addCategorys(){
        if(this.addcategoryName == "" || this.addcategoryCode == ""){
          this.$Message.info("请您填写完整添加信息")
          return
        }
        addSupplierCategory({
          ticket: this.$store.state.ticket,
          name: this.addcategoryName,
          code: this.addcategoryCode,
          data_org: ''
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加分类成功');
            this.closeAddModal()
            this.getSupplierCategoryinfo()
             this.addcategoryName = ""
             this.addcategoryCode = ""
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
              this.addcategoryName = ""
             this.addcategoryCode = ""
             this.getSupplierCategoryinfo()
             this.closeAddModal()
          }
        })
      },
      /*编辑供应商分类*/
      editCategorys(){
        if(this.editcategoryName == "" || this.editcategoryCode == ""){
          this.$Message.info("请您填写完整添加信息")
          return
        }
        addSupplierCategory({
          ticket: this.$store.state.ticket,
          name: this.editcategoryName,
          code: this.editcategoryCode,
          data_org: this.editdataorg,
          id: this.editcategoryId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改分类成功');
          }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getSupplierCategoryinfo()
             this.closeEditModal()
          }
          this.closeEditModal()
          this.getSupplierCategoryinfo()
        })
      },
      /*删除供应商分类*/
      deleteCategorys(){
        deleteSupplierCategory({
          ticket: this.$store.state.ticket,
          id: this.deletecategoryId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('删除成功');
            this.getSupplierCategoryinfo()
          }
        })
      },
      changepage(){},
      /*显示添加供应商模态框*/
      addSupplier(){
        this.add_supplier=true;
        this.addcategoryCode = ""
        this.addcategoryName = ""
      },
      closeAddModal(){
        this.add_supplier=false;
      },
      closeEditModal(){
        this.edit_supplier=false;
      }
    },
    data() {
      return {
        del_modal: false,
        addcategoryCode: '',
        addcategoryName: '',
        editcategoryCode: '',
        editcategoryName: '',
        editdataorg: '',
        deletecategoryId: '',
      	add_supplier:false,
      	edit_supplier:false,
        supliercategorydata: [{
            title: '序号',
            width: 60,
            key: 'numid',
            align: "center",
          },
          {
            title: '分类编号',
            key: 'code',
            align: "center",
          },{
            title: '供应商分类',
            width: 100,
            align: "center",
            key: 'name'
          },{
            title: '供应商个数',
            align: "center",
            key: 'supplier_num'
          },
          {
            title: '操作',
            key: 'action',
            /*fixed: 'right',*/
            width: 375,
            align: 'center',
            render:  (h, params)=> {
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
                    click: ()=> {
                      var categoryId = params.row.id
                      var name = params.row.name
                      this.$router.push('/b/supplier-list/'+categoryId+'/'+name)
                    }
                  }
                }, '查看'),
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
                      this.edit_supplier=true;
                      this.editcategoryCode = params.row.code
                      this.editcategoryName = params.row.name
                      this.editdataorg = params.row.data_org,
                      this.editcategoryId = params.row.id
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
                      this.deletecategoryId = params.row.id
                      this.del_modal = true
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        supliercategorylist: [],
        pageSize: 10,
        dataCount: 100
      }
    }
  }
</script>

<style>
  .purchase_order {
    padding: 0 20px;
  }
</style>

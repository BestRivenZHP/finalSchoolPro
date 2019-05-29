<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			客户数据
			<Button type="primary" style="margin-left: 50px;" @click='addUserState'>新增客户资料</Button>

		</div>




  <div class="main-style">
    <el-table
      :data="msg"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="客服名字"
        width="180">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="年龄"
        width="180">
        <template slot-scope="scope">{{ scope.row.age }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="电话号码">
        <template slot-scope="scope">{{ scope.row.teleNum }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="qq">
        <template slot-scope="scope">{{ scope.row.qqNum }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="微信">
        <template slot-scope="scope">{{ scope.row.weChat }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="备注"> 
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>
      
         <el-table-column
        prop="address"
        label="加入时间">
          <template slot-scope="scope">{{ scope.row.time }}</template>
        </el-table-column>
          
      


      <el-table-column label="操作" width="140" class="tablecolumn">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onDeleteBtnClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="fenye">
    <el-pagination
     background
     :current-page="this.data.pageNum"
     :page-sizes="this.pageSizes"
     :page-size="this.data.pageSize"
     :total="this.data.total"
     layout="total, sizes, prev, pager, next"
     @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>
    </div>






		<Modal v-model="add_user_state" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增客户分类</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>名字</Col>
					<Col span="18">
					<Input v-model="dataList.name"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>年龄</Col>
					<Col span="18">
					<Input v-model="dataList.age"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>电话</Col>
					<Col span="18">
					<Input v-model="dataList.teleNum"></Input>
					</Col>
				</Row>
        <Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>地址</Col>
					<Col span="18">
					<Input v-model="dataList.address"></Input>
					</Col>
				</Row>
        <Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>qq</Col>
					<Col span="18">
					<Input v-model="dataList.qqNum"></Input>
					</Col>
				</Row>
        <Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>微信</Col>
					<Col span="18">
					<Input v-model="dataList.weChat"></Input>
					</Col>
				</Row>
          <Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>备注</Col>
					<Col span="18">
					<Input v-model="dataList.remarks"></Input>
					</Col>
				</Row>
        <Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>时间</Col>
					<Col span="18">
					 <el-date-picker
      v-model="dataList.time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="insertOn">新增</Button>
				<Button type="primary" @click="closeaddModal">取消</Button>
			</div>
		</Modal>
    
    
    <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此客户分类吗?</span>
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
  import { getAllUserList,getAllSupplier,getAllPriceInfo,addUserCategorys,updateUserCategorys,deleteUserCategorys } from '../../api/api'
  import axios from 'axios'
  export default {
    inject:['reload'],
    mounted(){
    this.$ajax
        .get('/api/CustomerInformation/findAllCustomerWithPage?pageNum=1&pageSize=2')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data));





      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getUsersListInfo()
      this.getAllPriceInfos()
    },
    data() {
      return {
      msg:[],
      params:{pageNum : '',pageSize : '', searchKey: ''},
      pageSizes:[2,5,8],
      data:[],
      
      dataList: {
       name:'',
       age:'',
       teleNum:'',
       address:'',
       qqNum:'',
       weChat:'',
       remarks:'',
       time:''
      },

      add_user_state: false, 


        addpricelist: [],   //价格体系列表
        addprice: '',   //价格体系值
        editpricelist: [],
        editprice: '',
        edit_user_state: false,
        cityList: [],
        categoryID: sessionStorage.getItem("ticket"),
        /*客户分类列表*/
        userslist: [{
          title: '类别编码',
          align: "center",
          key: 'code',
        }, {
          title: '类别',
          align: "center",
          key: 'name',
        }, {
          title: '价格体系',
          key: 'ps_name',
          align: "center",
        }, {
          title: '客户数',
          key: 'cnt',
          align: "center",
        }, {
          title: '操作',
          key: 'action',
          width: 250,
          /*fixed: 'right',*/
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
                    this.$router.push('/user/user-list/'+this.categoryID+'/'+params.row.id+'/'+params.row.name)
                  }
                }
              }, '查看'),
            ]);
          }
        }],
        usersdata: [], //客户分类数据
        pageSize: 20,
        dataCount: 0,
        addusercode: '',   /*用户编码*/
        addcategoryname: '',  /*分类名称*/
        addprice: '',  /*价格体系*/
        editusercode: '',
        editcategoryname: '',
        editprice: '',
        currentTableObj: '',  /*当前行*/
        CurrenTableindex: '',  /*当前行索引*/
        del_modal: false,
      }
    },
    methods: {
  onDeleteBtnClick(val){

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax
          .get('/api/CustomerInformation/delete',{params : val});
        this.$ajax
        .get('/api/CustomerInformation/findAllCustomerWithPage?pageNum=1&pageSize=2')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           
           this.onRefreshBtnClick();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
           },

         onRefreshBtnClick() {
     this.reload();
    },
    insertOn(){
 this.$ajax
         .get('/api/CustomerInformation/insert',{params : this.dataList})
           this.$notify({
                  title: "成功",
                  message: "保存数据成功",
                  type: "success",
                  duration: 2000
                });   
                this.dataList = {
                                name:'',
                                age:'',
                                teleNum:'',
                                address:'',
                                qqNum:'',
                                weChat:'',
                                remarks:'',
                                time:''
                     }
                           this.add_user_state=false;
      this.onRefreshBtnClick();
                     
    },

     handleSizeChange(val) {
        this.params.pageNum = this.data.pageNum;
        this.params.pageSize = val;
        this.$ajax
        .get('/api/CustomerInformation/findAllCustomerWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
    },

     handleCurrentChange(val) {
       this.params.pageNum = val;
        this.params.pageSize = this.data.pageSize;
      this.$ajax
        .get('/api/CustomerInformation/findAllCustomerWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
        },






      /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        this.currentTableObj = currentRow
        this.CurrenTableindex = index
        this.editusercode = this.currentTableObj.code
        this.editcategoryname = this.currentTableObj.name
        this.editprice = this.currentTableObj.ps_id
      },
      /*为选中行添加样式*/
      rowClassName (row, index) {
          if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';
      },
      /*分页*/
      changepage(index){
         getAllUserList({
          loginUserId: sessionStorage.getItem("ticket"),
          page: index,
          limit: 20,
        }).then(res => {
          this.usersdata = res.data.data
          this.dataCount = res.data.total
        })
      },
      /*获取供应商列表*/
      getSupplierList(){
        getAllSupplier({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      },
      /*获取价格体系信息*/
      getAllPriceInfos(){
        getAllPriceInfo({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.priceList.forEach((item,index) => {
           if(item.name){
           let temp = {}
           temp.value = item.id
           temp.label = item.name
           this.addpricelist.push(temp)
           this.editpricelist.push(temp)
           }
          })
        })
      },
      /*新增客户分类*/
      addusercategory(){
        if(this.addusercode == "" || this.addprice == "" || this.addcategoryname == ""){
          this.$Message.info('请您填写完整添加信息')
          return
        }
        addUserCategorys({
          loginUserId: sessionStorage.getItem("ticket"),
          code: this.addusercode,
          psId: this.addprice,
          name: this.addcategoryname,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功')
            this.getUsersListInfo()
            this.add_user_state = false
          }else if(res.retcode == 4000){
            this.$Message.info(res.msg)
          }
        })
      },
      /*编辑客户分类*/
      editusercategory(){
        if(this.editusercode == "" || this.editprice == "" || this.editcategoryname == ""){
          this.$Message.info('请您填写完整信息')
          return
        }
        updateUserCategorys({
          loginUserId: sessionStorage.getItem("ticket"),
          code: this.editusercode,
          psId: this.editprice,
          name: this.editcategoryname,
          id: this.currentTableObj.id,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改成功')
            this.getUsersListInfo()
            this.edit_user_state = false
          }
        })
      },
      /*删除客户分类*/
      deleteUserCategory(){
        deleteUserCategorys({
          loginUserId: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('删除成功')
            this.getUsersListInfo()
            this.closedelModal()
          }else if(res.retcode == 4000){
            this.$Message.info(res.msg)
            this.closedelModal()
          }
        })
      },
      delTrue(){
        this.deleteUserCategory()
      },
      delFalse(){
        this.closedelModal()
      },
      /*获取客户分类列表*/
      getUsersListInfo(){
        /*axios.get('https://crm.jianong.com.cn/api/v1/customer/categoryList?loginUserId=6C2A09CD-A129-11E4-9B6A-782BCBD7746B').then(res => {
          console.log(res)
        })*/
        getAllUserList({
          loginUserId: sessionStorage.getItem("ticket"),
          page: 1,
          limit: 20
        }).then(res => {
          this.usersdata = res.data.data
          this.dataCount = res.data.total
        })
      },
      addUserState() {
        this.add_user_state = true
      },
      closeaddModal(){
        this.add_user_state=false;
      },
      /*编辑客户分类*/
      editUserState() {
        if(!this.currentTableObj){
          this.$Message.info("请在表格中选择要编辑的客户分类项")
          return
        }
        this.edit_user_state = true
      },
      closeeditModal(){
        this.edit_user_state = false;
      },
      /*删除客户分类*/
      delUserState() {
        if(!this.currentTableObj){
          this.$Message.info("请在表格中选择要删除的客户分类项")
          return
        }
        this.del_modal = true
      },
      closedelModal(){
        this.del_modal=false;
      },
    },
	}
</script>

<style>
	/* .user_info {
    padding: 0 20px;
  } */
    .ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
  .demo-ruleForm{

}
 .fenye{
   padding-left: 30%;
 }
 
 .main-style{
   padding: 10px;
    padding-left: 20px;
 }

 .page-container {
    min-height: calc(100vh - 64px);
    background-color: white;
}

.page-title {
    padding: 10px 10px 5px 15px;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.page-top-toolbar {
    padding: 4px 0;
    
}

.filter-container{
 float: right;
}


.filter-item{

}
.page-btns{

padding: 10px;
}

    
        .filter-item {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 10px;     
    
}

.panel-title-text {
    padding: 10px 10px 5px 15px;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
}

.el-range-editor--mini .el-range-separator {
    line-height: 15px;
    font-size: 12px;
}

.table-search-total-bar {
    margin: 8px 0;
    .sel-condition {
        border: 1px solid #3d9ee9;
        padding: 0 5px;
        margin-right: 10px;
        padding: 3px;
        span {
            text-decoration: none;
            color: #3d9ee9;
            font-size: 13px;
        }
        i {
            margin-left: 5px;
        }
    }
    button {
        padding: 3px 10px;
    }
}

.datagrid-pagination {
    float: right;
    margin-top: 10px
}

.dg-cell-enable-flag-T {
    color: #7c7cda;
}

.dg-cell-enable-flag-F {
    color: #b3b3b3;
}
</style>

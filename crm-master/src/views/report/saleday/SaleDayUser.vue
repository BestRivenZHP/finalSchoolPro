<template>
 <div class="page-container">

    <div class="page-top-toolbar">
      <div class="page-btns">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="addGoods">新增商品信息 </el-button>
        <el-button size="medium" @click="onRefreshBtnClick">刷新</el-button>

       <div class="filter-container">
        <el-input 
          v-model="params.searchKey"
          placeholder="输入关键字检索"
          size="medium"
          style="width: 200px;height: 36px;"
          class="filter-item"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="medium"
          @click="clickSearch"
        >查询</el-button>
       </div>
      </div>
      
    </div>
    <div class="main-style">
    <el-table
      :data="msg"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="商品id"
        width="180">
        <template slot-scope="scope">{{ scope.row.goodId }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
        <template slot-scope="scope">{{ scope.row.goodName }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="商品编码">
        <template slot-scope="scope">{{ scope.row.goodCode }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="计量单位">
        <template slot-scope="scope">{{ scope.row.unitOfMeasurement }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="商品描述">
        <template slot-scope="scope">{{ scope.row.goodDescription }}</template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="商品数量"> 
        <template slot-scope="scope">{{ scope.row.goodNum }}</template>
      </el-table-column>
      
         <el-table-column
        prop="address"
        label="商品价格">
          <template slot-scope="scope">{{ scope.row.priceGoods }}</template>
        </el-table-column>
          
         <el-table-column
        prop="address"
        label="商品价格">
          <template slot-scope="scope">{{ scope.row.priceGoods }}</template>
        </el-table-column>
      <el-table-column label="操作" width="140" class="tablecolumn">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onUpdateBtnClick(scope.row)">修改</el-button>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
  
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品id">
          <el-input  v-model="ruleForm2.goodId" :disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :disabled="false">
          <el-input  v-model="ruleForm2.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" >
          <el-input v-model="ruleForm2.goodCode"></el-input>
        </el-form-item>
         <el-form-item label="计量单位" >
          <el-input v-model="ruleForm2.unitOfMeasurement"></el-input>
        </el-form-item>
         <el-form-item label="商品描述"  >
          <el-input v-model="ruleForm2.goodDescription"></el-input>
        </el-form-item>
         <el-form-item label="商品数量" >
          <el-input  v-model="ruleForm2.goodNum"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" >
          <el-input v-model="ruleForm2.priceGoods"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2','is')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
</el-dialog>


 </div>
  </template>

  <script>
 
    export default {
      inject:['reload'],
      data() {
       return{ 
         is:'1',
         ruleForm2: {
          goodId:'',
          goodName:'',
          goodCode:'',
          goodKind:'3',
          unitOfMeasurement:'',
          goodDescription:'',
          goodNum:'',
          priceGoods:'',
          allGoodPriceNum: '1'
        },
         dialogVisible: false,
         pageSizes:[2,5,10],
         msg:[],
         data:[],
         params:{pageNum : '',pageSize : '',goodKind: '3', searchKey: ''},
         
      };
        },
        
      mounted(){
        this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage?pageNum=1&pageSize=2&goodKind=3')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      },
        methods:{
          onUpdateBtnClick(val){
          this.dialogVisible=true;
          this.$ajax
          .get('/api/GoodInformation/getInfoById',{params : val})
          .then(response => (this.ruleForm2 = response.data.data));
          this.is = '0';
          },
           onDeleteBtnClick(val){
              this.$ajax
          .get('/api/GoodInformation/getInfoById',{params : val})
          .then(response => (this.ruleForm2 = response.data.data));

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax
          .get('/api/GoodInformation/delete',{params : val});
           this.val = '1';
        this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage?pageNum=1&pageSize=2&goodKind=3')
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

          addGoods(){
           this.dialogVisible=true;
            this.$nextTick(() => {
            this.$refs["dataForm"].clearValidate();
          });
          },
      handleSizeChange(val) {
        this.params.pageNum = this.data.pageNum;
        this.params.pageSize = val;
        this.params.goodKind = 3;
        this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
    },

     handleCurrentChange(val) {
       this.params.pageNum = val;
        this.params.pageSize = this.data.pageSize;
        this.params.goodKind = 3;
      this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage',{params : this.params})
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      
        },

      onRefreshBtnClick() {
     this.reload();
    },
      clickSearch() {
        this.params.pageNum = 1;
        this.params.pageSize = this.data.pageSize;
        this.params.goodKind = 3;
        this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage',{params : this.params})
        .then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
        },


        submitForm(formName,val) {
         
          if(this.is=='1'){
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$ajax
         .get('/api/GoodInformation/insert',{params : this.ruleForm2})
         .then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
         this.dialogVisible=false;
           this.$notify({
                  title: "成功",
                  message: "保存数据成功",
                  type: "success",
                  duration: 2000
                });   
                this.ruleForm2 = {
                    goodId:'',
                    goodName:'',
                    goodCode:'',
                    goodKind:'3',
                    unitOfMeasurement:'',
                    goodDescription:'',
                    goodNum:'',
                    priceGoods:'',
                    allGoodPriceNum: '1'
                   }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          } else {
             this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$ajax
         .get('/api/GoodInformation/update',{params : this.ruleForm2})
         .then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
         this.dialogVisible=false;
           this.$notify({
                  title: "成功",
                  message: "保存数据成功",
                  type: "success",
                  duration: 2000
                });   
                this.ruleForm2 = {
                    goodId:'',
                    goodName:'',
                    goodCode:'',
                    goodKind:'3',
                    unitOfMeasurement:'',
                    goodDescription:'',
                    goodNum:'',
                    priceGoods:'',
                    allGoodPriceNum: '1'
                   }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          }
          this.is='1';
         this.$ajax
        .get('/api/GoodInformation/findAllGoodsWithPage?pageNum=1&pageSize=2&goodKind=3')
				.then(response => (this.msg = response.data.data.list,this.data = response.data.data ));
      this.onRefreshBtnClick();
      },
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
        }
      }
    }
  </script>
 
 <style>
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
 

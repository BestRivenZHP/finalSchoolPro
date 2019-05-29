<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      品牌
      <Button type="primary" style="margin-left:50px;" @click="addBrand">新增品牌</Button>
    </div>
    <Table stripe :columns="goodsbrandData" :data="goodsBrandList"></Table>
    <!--<div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>-->
    <!-- 添加品牌弹窗 -->
    <Modal v-model="add_brand" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>新增品牌</span>
      </p>
      <div style="line-height: 32px;">
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>品牌</Col>
          <Col span="18">
          <Input v-model="addName"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>上级品牌</Col>
          <Col span="18">
          <Select v-model="model1" @on-change="getOption1">
          <Option v-for="item in upbrands" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addBrands">保存</Button>
        <Button type="primary" @click="closeAddModal">取消</Button>
      </div>
    </Modal>
    <!-- 编辑品牌弹窗 -->
    <Modal v-model="edit_brand" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>编辑价格</span>
      </p>
      <div style="line-height: 32px;">
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;">品牌</Col>
          <Col span="18">
          <Input v-model="editName" disabled></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;">上级品牌</Col>
          <Col span="18">
          <Select v-model="model2" @on-change="getOption2">
          <Option v-for="item in upbrands" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="editBrands">保存</Button>
        <Button type="primary" @click="closeEditModal">取消</Button>
      </div>
    </Modal>
    <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此商品品牌吗?</span>
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
  import { brandList,deleteBrand,addBrand } from '../../api/api'
  export default {
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getBrandListData()
      this.getupbrands()
    },
    data() {
      return {
        add_brand: false,   //添加商品品牌模态框状态
        del_modal: false,   //删除商品品牌模态框状态
        delId: '',//删除id
        edit_brand: false,   //编辑品牌模态框状态
        model1: '',
        model2: '',
        addName: '',
        editName: '',
        editId: '',
        upbrands: [],
        goodsbrandData: [
          {
            title: '序号',
            align: "center",
            key: 'numid',
          },
          {
            title: '品牌',
            align: "center",
            key: 'name',
          }, {
            title: '全名',
            align: "center",
            key: 'full_name',
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
                      /*console.log(params.row)*/
                      this.editId = params.row.id
                      this.editName = params.row.name
                      this.model2 = params.row.parent_id
                      this.edit_brand = true
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
                      this.delId = params.row.id
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        goodsBrandList: [],
        pageSize: 10,
        dataCount: 0,
        selectValue1: '',
        selectValue2: '',
      }
    },
    methods: {
      /*删除确认操作*/
      delTrue(){
        deleteBrand({
          ticket: sessionStorage.getItem("ticket"),
          delGoodsBrand: this.$store.state.ticket,
          id: this.delId
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('删除成功');
            this.getBrandListData()
            this.del_modal = false
          }
        })
      },
      /*删除取消*/
      delFalse(){
        this.del_modal = false
      },
      /*添加品牌*/
      addBrands(){
        if(this.addName == ""){
          this.$Message.info("请填写完整信息")
          return
        }
        if(this.model1 == ""){
        addBrand({
          ticket:this.$store.state.ticket,
          name: this.addName,
          parent_id: ''
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功');
          }
        this.closeAddModal()
        this.getBrandListData()
        })
        }else{
          addBrand({
          ticket:this.$store.state.ticket,
          name: this.addName,
          parent_id: this.selectValue1
          }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功');
            this.closeAddModal()
           this.getBrandListData()
            }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getBrandListData()
             this.closeAddModal()
          }

          })
        }
      },
      /*获取添加上级品牌选中id*/
      getOption1(value){
        this.selectValue1 = value
      },
      /*获取编辑上级品牌选中id*/
      getOption2(value){
        this.selectValue2 = value
      },
      /*编辑品牌*/
      editBrands(){
      if(this.editName == ""){
        this.$Message.info("请填写完整信息")
        return
      }
      if(this.model2 == ""){
      addBrand({
        ticket:this.$store.state.ticket,
        name: this.editName,
        id: this.editId,
        parent_id: ''
      }).then(res => {
        if(res.retcode == 2000){
          this.$Message.success('修改成功');
           this.closeEditModal()
          this.getBrandListData()
        }else if(res.retcode == 2002){
             this.$Message.info(res.msg);
             this.getBrandListData()
             this.closeEditModal()
          }
      })
      }else{
        addBrand({
        ticket:this.$store.state.ticket,
        name: this.editName,
        id: this.editId,
        parent_id: this.selectValue2
        }).then(res => {
        if(res.retcode == 2000){
          this.$Message.success('修改成功');
        }
        this.closeEditModal()
        this.getBrandListData()
        })
      }
      },
      /*获取上级品牌列表*/
      getupbrands(){
        brandList({
          ticket:this.$store.state.ticket
        }).then(res => {
          res.data.data.forEach((item,index) => {
            var temp = {}
            temp["value"] = item.id
            temp["label"] = item.name
            this.upbrands[this.upbrands.length] = temp
          })
        })
      },
      /*获取品牌列表*/
      getBrandListData(){
        brandList({
          ticket:this.$store.state.ticket
        }).then(res => {
          this.goodsBrandList = res.data.data
          this.dataCount = res.data.count
          var num = 1
          this.goodsBrandList.forEach((item,index) => {
          item['numid'] = num++
          })
        })
      },
      changepage() {},

      /*显示添加品牌模态框*/
      addBrand(){
        this.add_brand = true;
        this.addName = ""
        this.model1 = ""
      },
      /*隐藏添加品牌模态框*/
      closeAddModal(){
        this.add_brand = false;
      },
      /*隐藏编辑品牌模态框*/
      closeEditModal(){
        this.edit_brand = false;
      }
    },
  }
</script>

<style>

</style>

<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      商品计量单位
      <Button type="primary" style="margin-left:50px;" @click="addUnit">新增计量单位</Button>
    </div>
    <Table stripe :columns="unitlistinfo" :data="unit_list"></Table>
    <!--<div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>-->

    <Modal v-model="add_unit" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>新增商品计量单位</span>
      </p>
      <div style="line-height: 32px;">
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>计量单位</Col>
          <Col span="18">
          <Input v-model="add_ji"></Input>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="keepAddUnit">保存</Button>
        <Button type="primary" @click="closeAddModal">取消</Button>
      </div>
    </Modal>
    <Modal v-model="edit_unit" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>编辑商品计量单位</span>
      </p>
      <div style="line-height: 32px;">
        <Row style='margin: 10px 0;'>
          <Col span="6" style="text-align:center;">计量单位</Col>
          <Col span="18">
          <Input v-model="edit_ji"></Input>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="keepEditUnit">保存</Button>
        <Button type="primary" @click="closeEditModal">取消</Button>
      </div>
    </Modal>
    <Modal v-model="del_unit" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此商品计量单位吗?</span>
      </p>
      <div slot="footer">
        <Button type="primary" @click="delTrue">确认</Button>
        <Button type="primary" @click="delFalse">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { getGoodsUnit, addGoodsUnit,editGoodsUnit,delGoodsUnit } from '../../api/api'
  export default {
    mounted() {
      this.getUnitList();
      this.$store.state.ticket = sessionStorage.getItem("ticket")
    },
    data() {
      return {
        unit_list: [],
        add_unit: false, //添加计量单位弹窗
        edit_unit: false, //修改计量单位弹窗
        del_unit:false,//删除计量单位弹窗
        add_ji: '', //绑定添加计量单位值
        edit_ji:'',//绑定编辑计量单位值
        edit_id:'',//编辑时传的id
        del_id:'',//删除时传的id
        model1: true,
        value: "",
        unitlistinfo: [{
            title: '序号',
            key: 'unmid',
            align: "center",
          },
          {
            title: '商品计量单位',
            key: 'name',
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
                    click: () => {
                      this.edit_unit = true;
                      this.edit_ji=params.row.name;
                      this.edit_id=params.row.id
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
                    click: ()=> {
                      this.del_id=params.row.id
                      this.del_unit=true;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageSize: 10,
        dataCount: 0,
        ticket: "",
      }
    },
    methods: {
      changepage() {},
      addUnit() {
        this.add_unit = true;
        this.add_ji = ""
      },
      closeAddModal() {
        this.add_unit = false;
      },
      closeEditModal() {
        this.edit_unit = false;
      },
      //保存新增计量单位
      keepAddUnit() {
        if(this.add_ji.trim() == '') {
          this.$Message.info('请输入计量单位');
          return;
        }
        addGoodsUnit({
          ticket: this.$store.state.ticket,
          name: this.add_ji
        }).then(res => {
          if(res.retcode == '2000') {
            this.$Message.info(res.msg);
            this.add_unit = false;
            this.getUnitList();
          } else {
            this.$Message.info(res.msg);
          }
        })
      },
      //获取计量单位列表,自循环序号
      getUnitList() {
        getGoodsUnit({
          ticket: this.$store.state.ticket
        }).then(res => {
          this.unit_list = res.data
          var num = 1
          this.unit_list.forEach((item, index) => {
            item.unmid = num++
          })
        })
      },
      //保存修改计量单位
      keepEditUnit(){
        if(this.edit_ji.trim() == '') {
          this.$Message.info('请输入计量单位');
          return;
        }
        editGoodsUnit({
          ticket: this.$store.state.ticket,
          name: this.edit_ji,
          id:this.edit_id
        }).then(res=>{
          if(res.retcode == '2000') {
            this.$Message.info(res.msg);
            this.edit_unit = false;
            this.getUnitList();
          } else {
            this.$Message.info(res.msg);
             this.edit_unit = false;
            this.getUnitList();
          }
        })
      },
      //确认删除该计量单位
      delTrue(){
        delGoodsUnit({
          ticket: this.$store.state.ticket,
          id:this.del_id
        }).then(res=>{
          if(res.retcode == '2000') {
            this.$Message.info(res.msg);
            this.getUnitList();
            this.del_unit=false;
          } else {
            this.$Message.info(res.msg);
          }
        })
      },
      delFalse(){
        this.del_unit=false;
      }
    }
  }
</script>
<style>

</style>

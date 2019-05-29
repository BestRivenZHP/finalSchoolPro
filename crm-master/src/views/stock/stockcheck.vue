<template>
  <div class="purchase_order">
    <div class="basic_indicators">
      查询条件
    </div>
    <Row style="margin: 20px 0;">
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">状态</Col>
        <Col span="18">
        <Select v-model="checkstatusvalue">
          <Option v-for="item in checkstatuslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="5" style="margin-left:20px;">
      <Row>
        <Col span="6" class="from-text">单号</Col>
        <Col span="18">
        <Input v-model="value"></Input>
        </Col>
      </Row>
      </Col>
      <Col span="5" style="margin-left:20px;">
      <Row>
        <Col span="8" class="from-text">业务日期(起)</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
      <Col span="5" style="margin-left:20px;">
      <Row>
        <Col span="8" class="from-text">业务日期(止)</Col>
        <Col span="16">
        <DatePicker type="date" placeholder="" :options="options"></DatePicker>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row style="margin: 20px 0;">
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">仓库</Col>
        <Col span="18">
        <Select v-model="checkstockvalue">
          <Option v-for="item in checkstockslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      </Col>
      <Col span="1" style="text-align: center;margin-left:30px;">
      <Button type="primary">查询</Button>
      </Col>
      <Col span="1" style="text-align: center;">
      <Button type="primary">重置</Button>
      </Col>
    </Row>
    <div class="basic_indicators" style="margin-bottom: 30px;">
      仓库
      <Button type="primary" style="margin-left:50px;" @click="addCheck">新建盘点单</Button>
    </div>
    <Table stripe :columns="columns5" :data="data5" @on-row-click="datelink"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  import { getAllStock } from '../../api/api'
  export default {
    data() {
      return {
         options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        checkstatusvalue: "",
        checkstatuslist: [
          {
            value: "",
            label: "全部",
          },
          {
            value: 0,
            label: "待盘点",
          },
          {
            value: 1000,
            label: "已盘点",
          }
        ],
        checkstockvalue: "",
        checkstockslist: [],


        dataCount:"",
        value: "",
        columns5: [{
            title: '序号',
            align: "center",
            key: 'id',
          },
          {
            title: '状态',
            align: "center",
            key: 'status'
          },
          {
            title: '单号',
            align: "center",
            key: 'ordernumber'
          },{
            title: '业务日期',
            align: "center",
            key: 'workdate'
          },
          {
            title: '盘点仓库',
            align: "center",
            key: 'outstock',
            /*sortable: true,*/
          },
          {
            title: '业务员',
            align: "center",
            key: 'user'
          },
          {
            title: '制单人',
            align: "center",
            key: 'orderuser'
          },
          {
            title: '制单时间',
            align: "center",
            key: 'ordertime'
          },
          {
            title: '操作',
            key: 'action',
            width:290,
            align: 'center',
            render:  (h, params)=> {
              return h('p', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                    marginRight: '8px',
                  },
                  on: {
                    click:()=> {
                      this.$router.push('/s/edit-check')
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'default'
                  },
                  style: {
                    marginRight: '8px',
                  },
                  on: {
                    click: function () {
//                    mCheck.singleDel(params.row, params.index);
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
                    click: function () {
//                    mCheck.singleDel(params.row, params.index);
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  on: {
                    click: function () {
//                    mCheck.singleDel(params.row, params.index);
                    }
                  }
                }, '提交')
              ]);
            }
          }
        ],
        data5: [{
            id : 1,
            status : "已调拨",
            ordernumber : "IT20180336331",
            workdate : "2018-01-10",
            outstock : "北京仓库",
            instock : "测试仓库001",
            user : "系统管理员",
            orderuser : "系统管理员",
            ordertime : "2018-01-10 15:00:03",
          },
          {
            id : 2,
            status : "已调拨",
            ordernumber : "IT20180336331",
            workdate : "2018-01-10",
            outstock : "北京仓库",
            instock : "测试仓库001",
            user : "系统管理员",
            orderuser : "系统管理员",
            ordertime : "2018-01-10 15:00:03",
          },
          {
            id : 3,
            status : "已调拨",
            ordernumber : "IT20180336331",
            workdate : "2018-01-10",
            outstock : "北京仓库",
            instock : "测试仓库001",
            user : "系统管理员",
            orderuser : "系统管理员",
            ordertime : "2018-01-10 15:00:03",
          },
          {
            id : 4,
            status : "已调拨",
            ordernumber : "IT20180336331",
            workdate : "2018-01-10",
            outstock : "北京仓库",
            instock : "测试仓库001",
            user : "系统管理员",
            orderuser : "系统管理员",
            ordertime : "2018-01-10 15:00:03",
          },
          {
            id : 5,
            status : "已调拨",
            ordernumber : "IT20180336331",
            workdate : "2018-01-10",
            outstock : "北京仓库",
            instock : "测试仓库001",
            user : "系统管理员",
            orderuser : "系统管理员",
            ordertime : "2018-01-10 15:00:03",
          },
        ],
        pageSize: 10,
        dataCount: 100
      }
    },
    methods:{
       /*获取仓库列表*/
        getAllStocks(){
        getAllStock({
           ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
          res.data.forEach((item,index) => {
            let temp = {}
            temp.value = item.id
            temp.label = item.name
            this.checkstockslist.push(temp)
          })
        })
      },
      datelink(currentRow, oldCurrentRow){
        console.log(currentRow.stockname)
      },
      changepage(){

      },
      addCheck(){
      	this.$router.push('/s/add-check')
      }
    },
    mounted(){
      this.getAllStocks()
    }
  }
</script>

<style scoped>
  /* .purchase_order {
    padding: 0 20px;
  } */
</style>

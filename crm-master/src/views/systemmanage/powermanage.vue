<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      角色
      <Button type="primary" style="margin-left:50px;">新增角色</Button>
    </div>
    <Table stripe :columns="columns5" :data="data5"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model1: true,
        value: "",
        cityList: "",
        columns5: [{
            title: '序号',
            align: "center",
            key: 'id',
          },
          {
            title: '商品计量单位',
            align: "center",
            key: 'status',
          },
          {
            title: '操作',
            key: 'action',
            /*fixed: 'right',*/
            width: 390,
            align: 'center',
            render: function (h, params) {
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
                    click: function () {
                      mCheck.singleDel(params.row, params.index);
                    }
                  }
                }, '查看权限列表'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                  marginRight: '8px'
                  },
                  on: {
                    click: function () {
                      mCheck.singleDel(params.row, params.index);
                    }
                  }
                }, '查看人员列表'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'default'
                  },
                  style: {
                  marginRight: '8px'
                  },
                  on: {
                    click: function () {
                      mCheck.singleDel(params.row, params.index);
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
                      mCheck.singleDel(params.row, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data5: [{
            id : 1,
            data: "测试测试",
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
            data: "测试测试",
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
            data: "测试测试",
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
            data: "测试测试",
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
            data: "测试测试",
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
      changepage(){},
    }
  }
</script>

<style>
 /* .purchase_order {
    padding: 0 20px;
  }*/
</style>

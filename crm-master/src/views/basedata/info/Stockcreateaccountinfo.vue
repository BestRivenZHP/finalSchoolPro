<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      仓库:<p>{{ 默认仓库名 }}</p>
    </div>
    <Table stripe :columns="columns5" :data="data5" @on-row-click="datelink"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stockname: '默认仓库名',
        dataCount:"",
        value: "",
        columns5: [{
            title: '序号',
            key: 'id',
          },
          {
            title: '仓库编码',
            key: 'status'
          },
          {
            title: '仓库名称',
            key: 'ordernumber'
          },{
            title: '建账完毕',
            key: 'workdate'
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
                }, '建账'),
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
                }, '标记建账完毕'),
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
                }, '取消建账完毕标记'),
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
      datelink(currentRow, oldCurrentRow){
        console.log(currentRow.stockname)
      },
      changepage(){

      },
      addCheck(){
        this.$router.push('/s/add-check')
      }
    }
  }
</script>

<style scoped>
  .purchase_order {
    padding: 0 20px;
  }
</style>

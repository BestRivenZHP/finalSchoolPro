<template>
  <div class="purchase_order">
    <div class="basic_indicators" style="margin-bottom: 30px;">
      仓库
    </div>
   <!--  <Row style="margin-bottom:20px;">
   <Button type="primary" style="margin-left:30px;" id="newaccount" @click="createaccount">建账</Button>
   <Button type="primary" style="margin-left:30px;" id="newaccount" @click="">查看</Button>
   <Button type="primary" style="margin-left:30px;" id="finished" @click="finishtab">标记建账完毕</Button>
   <Button type="primary" style="margin-left:30px;" id="escfinished" @click="escfinishtab">取消建账完毕标记</Button>
   </Row> -->
    <Table :row-class-name="rowClassName" @on-row-click="rowClick" :columns="allstockslist" :data="allstocksdata"></Table>
    <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  import { getAllStock,TabCreateAccount,ESCTabCreateAccount } from '../../api/api'
  export default {
    data() {
      return {
        dataCount:"",
        value: "",
        allstockslist: [{
            title: '序号',
            align: "center",
            key: 'numid',
          },
          {
            title: '仓库编码',
            align: "center",
            key: 'code'
          },
          {
            title: '仓库名称',
            align: "center",
            key: 'name',
          },{
            title: '建账完毕',
            align: "center",
            key: 'accountstatus',
          },
          /*{
          title: '操作',
          key: 'action',
          align: 'center',
          render:  (h, params)=> {
            return h('p', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                on: {
                  click:  ()=> {
                    this.$router.push('/s/account-info/'+params.row.id+"/"+params.row.name)
                  }
                }
              }, '查看')
            ]);
          }
        }*/
        ],
        allstocksdata: [],
        pageSize: 20,
        dataCount: 0,
        currentTableObj: '',
        CurrenTableindex: ''
      }
    },
    methods:{
      /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        this.currentTableObj = currentRow
        this.CurrenTableindex = index
        if(currentRow.accountstatus == "完毕"){
          document.getElementById('newaccount').disabled = true
          document.getElementById('finished').disabled = true
          document.getElementById('escfinished').disabled = false
        }else{
          document.getElementById('newaccount').disabled = false
          document.getElementById('finished').disabled = false
          document.getElementById('escfinished').disabled = true
        }
      },
      rowClassName (row, index) {
          if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';
      },
      /*建账*/
      createaccount(){
        this.$router.push('/s/newcreateaccount/'+this.currentTableObj.name)
      },
      /*标记建账完毕*/
      finishtab(){
        TabCreateAccount({
           ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('标记建账完毕成功')
          }
          this.getAllStocks()
        })
      },
      /*取消建账完毕标记*/
      escfinishtab(){
        ESCTabCreateAccount({
           ticket: sessionStorage.getItem("ticket"),
          warehouse_id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('标记建账完毕成功')
          }
          this.getAllStocks()
        })
      },

      /*获取仓库列表*/
      getAllStocks(){
        getAllStock({
           ticket: sessionStorage.getItem("ticket"),
          page: 1,
        }).then(res => {
          console.log(res)
          var num = 1
          res.data.forEach((item,index) => {
            item["numid"] = num++
            if(item.inited == 0){
              item['accountstatus'] = '未完'
            }else if(item.inited == 1){
              item['accountstatus'] = '完毕'
            }
          })
          this.allstocksdata = res.data
          this.dataCount = res.data.length
        })
      },
      changepage(index){
         getAllStock({
           ticket: sessionStorage.getItem("ticket"),
          page: index,
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            item["numid"] = num++
            if(item.inited == 0){
              item['accountstatus'] = '未完'
            }else if(item.inited == 1){
              item['accountstatus'] = '完毕'
            }
          })
          this.allstocksdata = res.data
          this.dataCount = res.data.length
        })
      },
    },
    mounted(){
      this.getAllStocks()
    }
  }
</script>

<style>
.ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
  /* .purchase_order {
    padding: 0 20px;
  } */
</style>

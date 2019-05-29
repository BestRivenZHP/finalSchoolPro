<template>
  <div class="purchase_order">
<!--     <div class="basic_indicators">
  查询条件
</div>
<Row style="margin: 20px 0;">
  <Col span="5">
  <Row>
    <Col span="8" class="from-text">商品编号</Col>
    <Col span="16">
    <Input v-model="value"></Input>
    </Col>
  </Row>
  </Col>
  <Col span="5" style="margin-left:20px;">
  <Row>
    <Col span="8" class="from-text">品名</Col>
    <Col span="16">
    <Input v-model="value"></Input>
    </Col>
  </Row>
  </Col>
  <Col span="5" style="margin-left:20px;">
  <Row>
    <Col span="8" class="from-text">规格型号</Col>
    <Col span="16">
    <Input v-model="value"></Input>
    </Col>
  </Row>
  </Col>
  <Col span="1" style="text-align: center;margin-left:20px;">
  <Button type="primary">查询</Button>
  </Col>
  <Col span="1" style="text-align: center;">
  <Button type="primary">重置</Button>
  </Col>
</Row> -->
    <div class="basic_indicators" style="margin-bottom: 30px;">
    仓库
  </div>
  <Table stripe :columns="allstockslist" :data="allstocksdata"></Table>
  <!-- <div class="page_unit">
    <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
  </div> -->
  </div>
</template>

<script>
  import { getAllStock } from '../../api/api'
  export default {
    data() {
      return {
        dataCount:"",
        value: "",
        /*仓库列表表格*/
        allstockslist: [{
            title: '序号',
            align: "center",
            key: 'numid',
          },
          {
            title: '仓库编号',
            align: "center",
            key: 'code'
          },
          {
            title: '仓库名称',
            align: "center",
            key: 'name',
          },
          {
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
        }
        ],
        /*仓库列表数据*/
        allstocksdata: [],
        pageSize: 10,
        dataCount: 0
      }
    },
    methods:{
      /*打印*/
     /* createPdf(){
          let newWindow = window.open("_blank");   //打开新窗口
          let codestr = document.getElementsByClassName("purchase_order")[0].innerHTML;   //获取需要生成pdf页面的div代码
            newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
            newWindow.document.close();     //关闭document的输出流, 显示选定的数据
            newWindow.print();   //打印当前窗口
            return true;
        },*/
        /*获取所有仓库*/
      getAllStocks(){
        getAllStock({
          ticket: sessionStorage.getItem("ticket"),
          page: 1,
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            item["numid"] = num++
          })
          this.allstocksdata = res.data
          this.dataCount = res.data.length
        })
      },
      /*分页*/
      changepage(index){
        getAllStock({
          ticket: sessionStorage.getItem("ticket"),
          page: index,
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            item["numid"] = num++
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
/*   .purchase_order {
  padding: 0 20px;
} */
</style>

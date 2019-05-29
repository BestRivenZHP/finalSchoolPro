<template>
  <div id="vcharts-demo">
    <ve-line :data="chartData" ref="chart1"></ve-line>
  </div>
</template>
<script type="text/ecmascript-6">
  // 引入提示框组件、标题组件、工具箱组件、图例组件。
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/toolbox';
  import 'echarts/lib/component/legendScroll';
 // 引入v-charts折线图组件。
  import VeLine from 'v-charts/lib/line';
  import 'v-charts/lib/style.css';
  
  export default {
    components: {
      VeLine
    },
    data() {
      return {
        chartData: {
          columns: ['日期', '销售额-1季度'],
          rows: [
            {'日期': '1月1日', '销售额-1季度': 1523},
            {'日期': '1月2日', '销售额-1季度': 1223},
            {'日期': '1月3日', '销售额-1季度': 2123},
            {'日期': '1月4日', '销售额-1季度': 4123},
            {'日期': '1月5日', '销售额-1季度': 3123},
            {'日期': '1月6日', '销售额-1季度': 7123}
          ]
        }
      };
    },
    created() {
// 这是模拟动态数据用的
      setTimeout(() => {
        this.chartData = {};
        this.chartData = {
          columns: ['日期', '销售额-1季度'],
          rows: [
            {'日期': '1月1日', '销售额-1季度': 1523},
            {'日期': '1月2日', '销售额-1季度': 1223},
            {'日期': '1月3日', '销售额-1季度': 2123},
            {'日期': '1月4日', '销售额-1季度': 4123},
            {'日期': '1月5日', '销售额-1季度': 3123},
            {'日期': '1月6日', '销售额-1季度': 7123},
            {'日期': '1月7日', '销售额-1季度': 1583},
            {'日期': '1月8日', '销售额-1季度': 1273},
            {'日期': '1月9日', '销售额-1季度': 2163},
            {'日期': '1月10日', '销售额-1季度': 4523},
            {'日期': '1月11日', '销售额-1季度': 3323},
            {'日期': '1月12日', '销售额-1季度': 7223}
          ]
        };
      }, 2000);
    },
    mounted() {
    }
  };
</script>

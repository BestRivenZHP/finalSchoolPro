<template>
<div>
<el-table :data="msg" border style="width: 100%">
      <el-table-column label="姓名" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
    </el-table>

        <el-button type="text" @click="changeType">清空</el-button>
    </div>

</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: []
    }
  },
  mounted () {
    this.$ajax
      .get('/api/abc/emp/all')
      .then(response => (this.msg = response.data))
  },
  methods: {
    changeType () {
      this.$ajax
        .get('/api/abc/emp/all')
        .then(response => (this.msg = response.data))
      debugger
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

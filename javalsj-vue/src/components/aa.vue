<template>
  <div class="hello">
    aa
  </div>

</template>

<script>
export default {
  name: 'aa',
  data () {
    return {
      msg: null
    }
  },
  mounted () {
    this.$ajax
      .get('http://localhost:7777/abc/emp/all')
      .then(response => (this.msg = response))
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

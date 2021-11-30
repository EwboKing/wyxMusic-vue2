<template>
  <div class="">
    AlbumDetail 组件
  </div>
</template>

<script>
export default {
  name: 'AlbumDetail',
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style>
</style>

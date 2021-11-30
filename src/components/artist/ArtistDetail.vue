<template>
  <div class="">
    ArtistDetail 组件
  </div>
</template>

<script>
export default {
  name: 'ArtistDetail',
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

<template>
  <div class="song">
    SongDetail 组件
  </div>
</template>

<script>
export default {
  name: 'SongDetail',
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

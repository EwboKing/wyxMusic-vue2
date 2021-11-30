<template>
  <div class="artists">
    <div class="items" v-for="item in artists" :key="item.id">
      <div class="mask h-hand" @click="goArtistDetailById(item.id)"></div>
      <img class="m-b-8" :src="`${item.img1v1Url}?param=130y130`">
      <p>
        <span v-html="item.name" @click="goArtistDetailById(item.id)" class="h-hand h-t-d-u"></span>
        <i class="bg-icon" v-if="item.identityIconUrl"></i>
      </p>
    </div>
    <div class="empty" :style="{'--emptyWidth' : emptyWidth}" v-if="emptyWidth"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Artists',
  props: ['artists'],
  computed: {
    ...mapGetters(['keyword'])
  },
  data () {
    return {
      emptyWidth: ''
    }
  },
  created () {
    const num = 6 - this.artists.length % 6
    if (num !== 6) {
      this.emptyWidth = num * 130 + (num - 1) * 24 + 'px'
    }
  },
  watch: {
    artists () {
      const num = 6 - this.artists.length % 6
      if (num !== 6) {
        this.emptyWidth = num * 130 + (num - 1) * 24 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .artists {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #000;
    font-size: 12px;
    margin-top: 20px;

    .items {
      width: 130px;
      height: 154px;

      p {
        display: flex;
        justify-content: space-between;

        .bg-icon {
          display: inline-block;
          width: 17px;
          height: 18px;
          background-position: 0 -740px;
          vertical-align: middle;
        }
      }

      .mask{
        width: 130px;
        height: 130px;
        position: absolute;
        background: url(../../assets/imgs/coverall.png) no-repeat 0 -680px;
      }

    }

    .empty{
      width: var(--emptyWidth);
    }
  }

</style>

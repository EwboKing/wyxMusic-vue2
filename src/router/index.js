import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/Home') },
  { path: '/discover', name: 'Discover', component: () => import('@/pages/Home') },
  { path: '/discover/artist', name: 'Artist', component: () => import('@/pages/Artist') },
  { path: '/discover/album', name: 'Album', component: () => import('@/pages/Album') },
  { path: '/discover/playlist', name: 'Playlist', component: () => import('@/pages/Playlist') },
  { path: '/artist', name: 'ArtistDetail', component: () => import('@/components/artist/ArtistDetail') },
  { path: '/album', name: 'AlbumDetail', component: () => import('@/components/album/AlbumDetail') },
  { path: '/playlist', name: 'PlaylistDetail', component: () => import('@/components/playlist/PlaylistDetail') },
  { path: '/toplist', name: 'Toplist', component: () => import('@/pages/Toplist') },
  { path: '/song', name: 'SongDetail', component: () => import('@/components/song/SongDetail') },
  { path: '/my', name: 'My', component: () => import('@/pages/My') },
  { path: '/download', name: 'Download', component: () => import('@/pages/Download') },
  { path: '/search', name: 'Search', component: () => import('@/pages/Search') }
]

const router = new VueRouter({
  routes
})

export default router

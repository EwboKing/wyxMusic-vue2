// import axios from 'axios'
// import conf from './config.js'

// const http = axios.create(conf)

// // 注册
// export const registerPhone = params => {
//   return http.get('/register/cellphone', { params })
// }
// // 检测手机号是否存在
// export const checkPhoneExistence = params => {
//   return http.get('/cellphone/existence/check', { params })
// }
// // 发送验证码
// export const sendCaptcha = params => {
//   return http.get('/captcha/sent', { params })
// }
// // 获取轮播图
// export const getSwiperList = () => {
//   return http.get('/banner')
// }
/*
 setsss: (state, sss) => {
   state.sss = sss
   window.sessionStorage.setItem('sss', JSON.stringify('sss'))
 }
 */

import { get } from './http.js'
// import { get, post } from './http.js'

// =============== 歌单相关 ===============
// 获取推荐歌单
export const getPersonalizedPlaylist = (num = 10) => get('/personalized', { limit: num })
// 获取歌单分类列表
export const getPlaylist = () => get('/playlist/catlist')
// 获取热门歌单分类列表
export const getPlaylistHot = () => get('/playlist/hot')
// 根据 id 获取歌单详情
export const getPlaylistDetailById = id => get('/playlist/detail', { id: id * 1 })
// 获取精选歌单
export const getTopPlaylist = (cat = '全部', page = 1, order, limit = 25) => get('/top/playlist', { cat: cat, order: order, offset: (page - 1) * limit })
// 获取评论
export const getCommentById = (id, page = 1, limit = 20) => get('/comment/playlist', { id: id, limit: limit, offset: (page - 1) * limit })

// =============== 歌手相关 ===============
// 获取歌手分类列表
export const getSingerList = () => get('/artist/list')
// 获取热门歌手列表
export const getHotSingerList = (num = 10, offset = 0) => get('/top/artists', { offset: offset, limit: num })

// =============== 歌曲相关 ===============
// 根据歌手 id 查询歌曲
export const getSongBySingerId = id => get('/artist/songs', { id: id })
// 根据歌曲 id 查询歌曲
export const getSongBySongId = id => get('/song/detail', { ids: id + '' })
// 获取音乐播放地址
export const getMusicUrlById = id => get('/song/url', { id: id + '' })
// 获取歌词
export const getLyric = id => get('/lyric', { id: id })

// =============== 碟片相关 ===============
// 获取新碟上架列表
export const getAlbumNewestList = () => get('/album/newest')
// 根据 id 获取碟片详情
export const getAlbumDetailById = id => get('/album', { id: id })

// =============== 榜单相关 ===============
// 获取所有榜单
export const getAllToplist = () => get('/toplist')

// =============== 用户相关 ===============
// 发送验证码
export const sendCaptcha = phone => get('/captcha/sent', { phone: phone })
// 获取用户信息
export const getUserInfo = () => get('/user/subcount')

// 获取轮播图
export const getBannersList = () => get('/banner')

// 搜索
export const searchByKeyword = (keyword, type, page, limit = 30) => get('/search', { keywords: keyword, offset: (page - 1) * limit, type: type * 1 })

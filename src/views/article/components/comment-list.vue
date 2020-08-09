<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import { stringify } from 'json-bigint'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.onLoad()
    console.log(this.source)
    console.log(this.list)
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getComments({
          type: this.type, //评论类型 对文章 对评论
          source: stringify(this.source), //源id，文章id或评论id
          offset: this.offset, //获取评论数的偏移量
          limit: this.limit //获取评论数据的个数
        })
        console.log(data)
        //2.将数据添加到列表中
        const { results } = data.data
        console.log(results)
        this.list.push(...results)

        //把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        //3.将loading设置为false
        this.loading = false

        //4.判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }

        //  有就更新获取下一页的数据页码
        //  没有就将finished设置结束
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
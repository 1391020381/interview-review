* [nuxt-v3](https://nuxt.com.cn/)
* [nuxtjs-服务端渲染容灾及监控](https://forsomething.cn/content?id=112)


```
export default {
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.get(`/api/data/${params.id}`);
      return { data: response.data }; // 将获取到的数据合并到组件的data中
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: null, error: 'Failed to load data' }; // 返回错误信息
    }
  },
  created() {
    if (this.data) {
      console.log('Data fetched successfully:', this.data);
      // 在这里可以进行数据的进一步处理或验证
    } else if (this.error) {
      console.log('Failed to fetch data:', this.error);
      // 处理错误情况，如显示错误消息给用户
    }
  }
};

```
* 在组件（页面组件）每次加载之前被调用的，无论是服务端渲染还是客户端激活。
* asyncData 负责获取数据并将其合并到组件的data中。
* create钩子在 asyncData之后执行, 可以在这里访问 asyncData 设置的数据
* asyncData 出错误无法降级    BFF 无法统一错误捕获   ->  原生 vueSSR 
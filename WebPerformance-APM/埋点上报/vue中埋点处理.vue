<script>
import { ref } from 'vue';

const vReportExposure = {
  beforeMount(el, binding, vnode) {
    el._reportExposure = false; // 初始化上报标志
  },
  mounted(el, binding, vnode) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !el._reportExposure) {
          // 元素进入视口且尚未上报
          console.log('Element is visible for the first time. Reporting...');
          // 执行上报逻辑
          // ...

          el._reportExposure = true; // 设置上报标志为true
          observer.unobserve(el); // 停止观察元素
        }
      });
    }, {
      threshold: 0.1 // 设置阈值
    });

    observer.observe(el); // 开始观察元素
  },
  unmounted(el) {
    if (el._reportExposureObserver) {
      el._reportExposureObserver.disconnect();
      delete el._reportExposureObserver;
    }
  }
};

export default vReportExposure;

// app.directive('my-directive', myDirective);
</script>
import { useEffect, useRef } from 'react';

// 自定义Hook，用于上报元素首次曝光
function useReportExposure(ref, reportExposure) {
  const hasReported = useRef(false); // 使用ref来存储状态，避免组件重渲染时重置

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasReported.current) {
          // 元素进入视口且尚未上报
          console.log('Element is visible for the first time. Reporting...');
          reportExposure(); // 调用传入的上报函数
          hasReported.current = true; // 更新状态，标记为已上报
        }
      });
    }, {
      threshold: 0.1 // 设置阈值
    });

    // 开始观察元素
    if (ref.current) observer.observe(ref.current);

    // 清理函数，组件卸载时断开观察器
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [ref, reportExposure]); // 依赖于ref和reportExposure函数
}
// ref 和 reportExposure 函数本身并不是React组件状态的响应式数据。
// 然而，在React中，useEffect 的依赖数组是用来告诉React哪些变量的变化应该触发 useEffect 中副作用的重新执行。
// 这包括了组件的props、state以及任何在 useEffect 外部定义但可能在组件生命周期内发生变化的值。
// 使用自定义Hook的组件示例
function MyComponent({ reportExposure }) {
  const elementRef = useRef(null);

  useReportExposure(elementRef, reportExposure);

  return <div ref={elementRef}>...</div>;
}

export default MyComponent;
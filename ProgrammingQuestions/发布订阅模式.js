// js 发布订阅模式的基本原理是:
//  有一个主题对象 该对象维护一个订阅者列表,当主题对象发生变化时,主题对象会遍历订阅者,调用每个订阅者的更新方法,通知订阅者进行相应的处理。

// 子定义事件  回调函数实现发布订阅模式

// https://juejin.cn/post/7231172059103117372

// 消息代理
class MessageBroker {
    constructor() {
      this.subscriptions = {};
    }
  
    subscribe(topic, callback) {
      if (!this.subscriptions[topic]) {
        this.subscriptions[topic] = [];
      }
      this.subscriptions[topic].push(callback);
    }
  
    publish(topic, data) {
      if (!this.subscriptions[topic]) {
        return;
      }
      this.subscriptions[topic].forEach((callback) => {
        callback(data);
      });
    }
  }
  
  // 发布者
  class Publisher {
    constructor(broker) {
      this.broker = broker;
    }
  
    publishMessage(topic, message) {
      this.broker.publish(topic, message);
    }
  }
  
  // 订阅者
  class Subscriber {
    constructor(broker, name) {
      this.broker = broker;
      this.name = name;
    }
  
    subscribeToTopic(topic) {
      this.broker.subscribe(topic, (data) => {
        console.log(`Subscriber ${this.name} received message: ${data}`);
      });
    }
  }
  
  // 使用示例
  const broker = new MessageBroker();
  const publisher = new Publisher(broker);
  
  const subscriber1 = new Subscriber(broker, 'Alice');
  const subscriber2 = new Subscriber(broker, 'Bob');
  
  subscriber1.subscribeToTopic('news');
  subscriber2.subscribeToTopic('weather');
  
  publisher.publishMessage('news', 'Breaking news: the sky is blue');
  publisher.publishMessage('weather', 'It will be sunny tomorrow');
  
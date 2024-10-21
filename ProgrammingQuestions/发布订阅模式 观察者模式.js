// 观察者    观察者 被观察者
class Subject {
  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.name === observer.name);
    this.observerList.splice(index, 1);
  }

  notifyObservers(message) {
    const observers = this.observeList;
    observers.forEach((observer) => observer.notified(message));
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    if (subject) {
      subject.addObserver(this);
    }
  }

  notified(message) {
    console.log(this.name, "got message", message);
  }
}

const subject = new Subject();
const observerA = new Observer("observerA", subject);
const observerB = new Observer("observerB");
subject.addObserver(observerB);
subject.notifyObservers("Hello from subject");
subject.removeObserver(observerA);
subject.notifyObservers("Hello again");

// 发布订阅模式   发布者 订阅者  发布订阅中心     发布者 订阅者  class 中传入 发布订阅中心的 实例,然后在  调用发布订阅中心方法进行 订阅和触发

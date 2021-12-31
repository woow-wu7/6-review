// promise

class _Promise {
  PENDING = "pending";
  FULFILLED = "fulfilled";
  REJECTED = "rejected";

  status = this.PENDING;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    if (typeof executor !== "function")
      throw new TypeError(
        `Promise resolver ${executor} is not a function` // 因为不是函数时，是可以直接获取的
      );

    // try...catch 是为了保证在promise内部发生错误时，能在内部被捕获
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value) => {
    if (this.status === this.PENDING) {
      this.status = this.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
    }
  };
  reject = (reason) => {
    if (this.status === this.PENDING) {
      this.status = this.REJECTED;
      this.reason = reason;
    }
  };

  then = (onFulfilled, onRejected) => {
    // 穿透效果
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => reason;
    }

    if (this.status === this.FULFILLED) {
      setTimeout(() => {
        // 保证了then的onFulfilled参数函数在同步任务执行完后，再执行
        onFulfilled(this.value);
      });
    }
    if (this.status == this.REJECTED) {
      setTimeout(() => {
        onRejected(this.reason);
      });
    }
    if (this.status === this.PENDING) {
      this.onFulfilledCallbacks.push(
        (value) => setTimeout(() => onFulfilled(value))
        // 这里把onFulfilled再包装一层的原因是：可以传入参数，而参数正是终值
      );
      this.onRejectedCallbacks.push((reason) =>
        setTimeout(() => onRejected(reason))
      );
    }
  };
}

_Promise.all = (promiseList) => {
  // Promise.all
  // 1. 是静态方法
  // 2. 返回一个新的 promise
  return new Promise((resolve, reject) => {
    const promiseArr = [...promiseList];
    const len = promiseList.length;
    const promiseValueResult = []; // 用来存储参数数组成员转成promise对象后的，fulfilled状态的所有终值
    promiseArr.forEach((promise) => {
      Promise.resolve(promise).then((value) => {
        promiseValueResult.push(value);
        if (promiseValueResult.length === len) {
          return resolve(promiseValueResult); // aa. 所有都是fulfilled状态，就resolve整个终值数组
        }
      }, reject); // --------------------------- bb. 如果一个promise状态变成rejected，整个就rejected
    });
  });
};

// ------------- 分割线 -------------
// ------------- 分割线 -------------
// ------------- 分割线 -------------
// promise的执行顺序
console.log(1);
const promise2 = new _Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    console.log(4);
    resolve("Promise");
    console.log(5);
    // 1. 当 resolve 函数后面还有代码时，还是会往下执行，除非有 return resolve("Promise")
    // 2. 并且还要保证 resolve 后面的同步任务在then的回调函数执行前执行
  });
}).then(
  (value) => {
    console.log(6);
  },
  (reason) => {
    console.log(`reason`, reason);
  }
);
console.log(3);

// ------------- 分割线 -------------
// ------------- 分割线 -------------
// ------------- 分割线 -------------
// test Promise.all()
const promiseX = new _Promise((resolve) => resolve("x"));
const promiseY = new _Promise((resolve, rejected) => {
  resolve("y");
  // rejected(1);
});
const all = _Promise.all([promiseX, promiseY]).then(
  (values) => console.log(`values`, values),
  (reason) => console.log(`reason`, reason)
);

// ------------- 分割线 -------------
// ------------- 分割线 -------------
// ------------- 分割线 -------------
// 原生 promise 的执行顺序
console.log("aaa");
const promise1 = new Promise((resolve, reject) => {
  console.log("bbb");
  setTimeout(() => {
    console.log("ddd");
    resolve("Promise");
    console.log("eee"); // promise中异步，同时异步中有同步时，也要保证then的执行在异步任务中的同步任务执行完成后，再执行
  });
}).then(
  (value) => {
    console.log("fff");
  },
  (reason) => console.log("拒因", reason)
);
console.log("ccc");
// 执行顺序 a b c d e
// 注意：ddd 和 eee 的执行顺序，要保证 ddd先执行

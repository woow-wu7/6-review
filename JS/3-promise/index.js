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

    executor(this.resolve, this.reject);
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
      this.value = reason;
    }
  };

  then = (onFulfilled, onRejected) => {
    if (this.status === this.FULFILLED) {
      setTimeout(() => {
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
        // setTimeout(() => { // 这里不用setTimeout包装，是因为在Promise的constructor中本来就存在异步，resolve的执行可定在同步任务之后，而then回调是在resolve中执行的
        //   onFulfilled(this.value);
        // })
        (value) => setTimeout(() => onFulfilled(value))
      );
      this.onRejectedCallbacks.push(
        // setTimeout(() => {
        //   onRejected(this.reason);
        // })
        (reason) => setTimeout(() => onRejected(reason))
      );
    }
  };
}

console.log(1);
const promise2 = new _Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve("Promise");
    console.log(4);
  });
}).then((value) => {
  console.log(5);
});
console.log(3);

// ------------- 分割线 -------------
// ------------- 分割线 -------------
// ------------- 分割线 -------------
// 原生 promise 的执行顺序
console.log("aaa");
const promise1 = new Promise((resolve, reject) => {
  console.log("bbb");
  setTimeout(() => {
    resolve("Promise");
    console.log("ddd"); // promise中异步，同时异步中有同步时，也要保证then的执行在异步任务中的同步任务执行完成后，再执行
  });
}).then(
  (value) => {
    console.log("eee");
  },
  (reason) => console.log("拒因", reason)
);
console.log("ccc");
// 执行顺序 a b c d e
// 注意：ddd 和 eee 的执行顺序，要保证 ddd先执行

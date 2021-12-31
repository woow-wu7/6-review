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
        (value) => onFulfilled(value)
      );
      this.onRejectedCallbacks.push(
        // setTimeout(() => {
        //   onRejected(this.reason);
        // })
        (reason) => onRejected(reason)
      );
    }
  };
}

console.log(1);
const promise2 = new _Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve("Promise");
  });
}).then((value) => {
  console.log(4);
});
console.log(3);

// const promise1 = new Promise((resolve, reject) => {
//   console.log("Promise");
//   resolve("Promise");
// }).then(
//   (value) => console.log("终值", value),
//   (reason) => console.log("拒因", reason)
// );

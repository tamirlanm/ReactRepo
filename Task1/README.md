# JavaScript Runtime and Async Homework

This project demonstrates JavaScript Closures, Call Stack,
Promises, async/await, Event Loop, Tasks and Microtasks.
The project uses only HTML, CSS and vanilla JavaScript.

## 1. Closure and private counter

Each task is created using the `createTask()` function.
Example:

```javascript
const task = createTask("Load Users");
```

Inside `createTask()` there is a private variable:
```javascript
let count = 0;
```

The variable cannot be accessed directly from outside the function.
However, the returned functions `run()`, `getCount()`, `reset()` can still access it. This is called a **closure**.
Each call to `createTask()` creates a separate closure, so every task has its own independent counter.

For example:
```javascript
const task1 = createTask("Load Users");
const task2 = createTask("Load Posts");
```

`task1` and `task2` have different private counters.

## 2. Call Stack
JavaScript executes functions using the **Call Stack**.
For example, when:

```javascript
task.run();
```

is called, the `run()` function is added to the Call Stack.

Inside `run()`, the program calls `simulateLoading()`, which creates a Promise and starts a `setTimeout()`.

The timer does not stay on the Call Stack while it is waiting. Because of this, JavaScript can continue executing other code.

When the synchronous part of `run()` finishes, it is removed from the Call Stack.

---

## 3. How JavaScript continues while setTimeout is waiting

`setTimeout()` does not block JavaScript execution.

For example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 1000);

console.log("End");
```

The result is:

```text
Start
End
Timer
```

JavaScript starts the timer and immediately continues executing the next line.

When the timer finishes, its callback is placed in the **Task Queue**.

The Event Loop waits until the Call Stack is empty and then allows the callback to execute.

---

## 4. Event Loop predicted and actual output

Before running the Event Loop demo, the predicted output is:

```text
1. Start
2. Async start
3. End
4. Promise 1
5. Async after await
6. Promise 2
7. Timer 1
8. Timer 2
```

The actual output is:

```text
1. Start
2. Async start
3. End
4. Promise 1
5. Async after await
6. Promise 2
7. Timer 1
8. Timer 2
```

The result happens because JavaScript first executes synchronous code.

After the Call Stack becomes empty, JavaScript processes all Microtasks.

Promise callbacks and code after `await` are Microtasks.

After all Microtasks are finished, JavaScript processes callbacks from the Task Queue, such as `setTimeout()`.

The simplified order is:

```text
Call Stack
↓
Microtask Queue
↓
Task Queue
↓
Event Loop
```

---

## 5. Tasks and Microtasks

JavaScript has different queues for asynchronous operations.

### Microtasks

Examples:

- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- continuation after `await`

### Tasks

Examples:

- `setTimeout()`
- `setInterval()`
- browser events

Microtasks have higher priority than Tasks.

After synchronous code finishes, JavaScript executes all Microtasks before taking the next Task from the Task Queue.

For example:

```javascript
setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("Sync");
```

Output:

```text
Sync
Promise
Timer
```

Even though the timer has `0 ms`, the Promise callback runs first because it is a Microtask.

---

## 6. Multiple Promises and error handling

Each task returns a Promise.

A task can either complete successfully or fail randomly.

When running all tasks together, the project uses:

```javascript
Promise.allSettled()
```

Example:

```javascript
await Promise.allSettled([
    task1.run(),
    task2.run(),
    task3.run()
]);
```

`Promise.allSettled()` waits until every Promise is finished.

It returns information about both successful and failed Promises.

This is useful for this project because `"All tasks finished"` should appear only after every task has either completed or failed.

If one task fails, the other tasks can still continue.

Individual task errors are handled using `try/catch`.

Example:

```javascript
try {
    await task.run();
} catch (error) {
    console.error(error.message);
}
```

---

## 7. Sequential vs Concurrent execution

### Sequential execution

Sequential execution waits for one task before starting the next one.

Example:

```javascript
await task1.run();
await task2.run();
await task3.run();
```

If the tasks take:

```text
Task 1 = 1000 ms
Task 2 = 1500 ms
Task 3 = 800 ms
```

the total execution time is approximately:

```text
1000 + 1500 + 800 = 3300 ms
```

---

### Concurrent execution

Concurrent execution starts all tasks without waiting for the previous task to finish.

Example:

```javascript
await Promise.allSettled([
    task1.run(),
    task2.run(),
    task3.run()
]);
```

If the same tasks take:

```text
Task 1 = 1000 ms
Task 2 = 1500 ms
Task 3 = 800 ms
```

the total execution time is approximately:

```text
1500 ms
```

This happens because all three timers are waiting at the same time.

Therefore, concurrent execution is usually faster for independent asynchronous operations.

---

## Conclusion

This project demonstrates how JavaScript handles asynchronous operations using:

- Closures
- Call Stack
- Promises
- async/await
- setTimeout
- Event Loop
- Task Queue
- Microtask Queue
- Sequential execution
- Concurrent execution

It also demonstrates how closures can be used to keep data private and how `Promise.allSettled()` can be used to handle several asynchronous operations even when some of them fail.
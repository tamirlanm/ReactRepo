const tasksContainer = document.getElementById("tasks");
const allStatus = document.getElementById("allStatus");
const comparisonOutput = document.getElementById("comparisonOutput");
const eventLoopOutput = document.getElementById("eventLoopOutput");

function createTask(name){
    let count = 0;
    let status = "Idle";
    let loadingTime = 0;

    function updateUI(){
        const element = document.querySelector(
            `[data-task="${name}"]`
        );
        if(!element){
            return;
        }

        element.querySelector(".status").textContent = status;
        element.querySelector(".count").textContent = count;
        element.querySelector(".time").textContent = loadingTime === 0 ? "-" : `${loadingTime} ms`;
    }

    async function run(){
        count++;
        status = "Running";
        loadingTime = 0;

        updateUI();

        const startTime = performance.now();

        try{
            await simulateLoading();
            loadingTime = Math.round(performance.now() - startTime);
            status = "Completed";
            updateUI();
            return `${name} Completed`;
        }
        catch(error){
            loadingTime = Math.round(performance.now() - startTime);

            status = "Failed";
            updateUI();
            throw new Error(`${name} Failed`);
        }
    }

    function simulateLoading(){
        return new Promise((resolve, reject) => {
            const delay = Math.floor(Math.random() * 1501) + 500;

            setTimeout(() => {
                const failed = Math.random() < 0.25;
                if(failed){
                    reject(new Error(`${name} failed`));
                }else{
                    resolve();
                }
            }, delay);
        });
    }

    function getCount(){
        return count;
    }

    function reset(){
        count = 0;
        status = "Idle";
        loadingTime = 0;

        updateUI();
    }

    return {
        name, 
        run,
        getCount,
        reset
    };
}

const task1 = createTask("Load Users");
const task2 = createTask("Load Posts");
const task3 = createTask("Load Comments");

const tasks = [task1, task2, task3];

function renderTask(){
    tasksContainer.innerHTML = "";
    tasks.forEach(task => {
        const div = document.createElement("div");

        div.className = "task";
        div.dataset.task = task.name;

        div.innerHTML = `
        <h3>${task.name}</h3>
            <p>
                Status:
                <strong class="status">Idle</strong>
            </p>
            <p>
                Execution count:
                <strong class="count">0</strong>
            </p>
            <p>
                Loading time:
                <strong class="time">-</strong>
            </p>
            <button class="run-task-btn">
                Run
            </button>
        `;
        const button = div.querySelector(".run-task-btn");

        button.addEventListener("click", async () => {
            try{
                const result = await task.run();
                console.log(result);
            }catch(error){
                console.error(error.message);
            }
        });
        tasksContainer.appendChild(div);
    });
}

renderTask();

// run all tasks

document.getElementById("runAllBtn").addEventListener("click", async () => {
    allStatus.textContent = "Running all tasks...";

    const promises = tasks.map(task => task.run());

    const results = await Promise.allSettled(promises);

    console.log("Run all results:");

    results.forEach(result => {
        if(result.status === "fulfilled"){
            console.log(result.value);
        }else{
            console.log(result.reason.message);
        }
    });

    allStatus.textContent = "All tasks finished";
});

// reset 

document.getElementById("resetBtn").addEventListener("click", () => {
    tasks.forEach(task => task.reset());
    allStatus.textContent = "";
    comparisonOutput.textContent = "No test executed yet.";
});

// sequential 

document.getElementById("sequentialBtn").addEventListener("click", runSequential);

async function runSequential() {
    comparisonOutput.textContent = "Running sequentially...";

    const start = performance.now();

    for(const task of tasks){
        try{
            await task.run();
        }catch(error){
            console.error(error.message);
        }
    }

    const end = performance.now();
    const totalTime = Math.round(end - start);
    comparisonOutput.textContent = `Sequential execution: ${totalTime} ms`;
}

// concurrent

document.getElementById("concurrentBtn").addEventListener("click", runConcurrent);

async function runConcurrent() {
    comparisonOutput.textContent = "Running concurrently...";

    const start = performance.now();

    await Promise.allSettled(tasks.map(task => task.run())
    );
    const end = performance.now();
    const totalTime = Math.round(end - start);
    comparisonOutput.textContent = `Concurrent execution: ${totalTime} ms`;
}

// event loop demo

document.getElementById("eventLoopBtn").addEventListener("click", runEventLoopDemo);

function runEventLoopDemo(){
    eventLoopOutput.textContent = "";

    function log(message){
        console.log(message);
        eventLoopOutput.textContent += message + "\n";
    }

    log("1. Start");
    //task queue
    setTimeout(() => {
        log("7. Timer 1");
    }, 0);

    // Microtask Queue
    Promise.resolve().then(() => {
        log("4. Promise 1");
    });

    async function asyncExample(){
        log("2. Async start");
        await Promise.resolve();
        log("5. Async after await");
    }

    asyncExample();

    // another microtask
    Promise.resolve().then(() => {
        log("6. Promise 2");
    });

    // another task
    setTimeout(() => {
        log("8. Timer 2");
    }, 0);

    log("3. End");
}
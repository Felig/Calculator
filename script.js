const numbers = document.querySelectorAll(".number"),
    operations = document.querySelectorAll(".operator"),
    clearBtns = document.querySelectorAll(".clear-btn"),
    decimalBtn = document.getElementById("decimal"),
    display = document.getElementById("display");
let MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = "";

numbers.forEach(item => {
    item.addEventListener("click", (e) => {
        numberPress(e.target.textContent);
    });
});

operations.forEach(item => {
    item.addEventListener("click", (e) => {
        operationPress(e.target.textContent);
    });
});

clearBtns.forEach(item => {
    item.addEventListener("click", (e) => {
        clear(e.target.textContent);
    });
});

decimalBtn.addEventListener("click", () => {
    if (MemoryNewNumber) {
        display.value = "0.";
        MemoryNewNumber = false;
    } else if (display.value.indexOf(".") === -1) {
        display.value += "."
    }
});

const numberPress = (number) => {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    };
};

const operationPress = (op) => {
    localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== "=") {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === "+") {
            MemoryCurrentNumber += +localOperationMemory;
        } else if (MemoryPendingOperation === "-") {
            MemoryCurrentNumber -= +localOperationMemory;
        } else if (MemoryPendingOperation === "×") {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (MemoryPendingOperation === "/") {
            MemoryCurrentNumber /= +localOperationMemory;
        } else {
            MemoryCurrentNumber = +localOperationMemory;
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
};

const clear = (id) => {
    if (id === "ce") {
        display.value = "0";
        MemoryNewNumber = true;
    } else if (id === "c") {
        display.value = "0"
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = "";
    }
};


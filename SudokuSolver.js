let inputs = []; // Array to store input elements

document.addEventListener('DOMContentLoaded', (event) => {
    fillTheInputArray();
    let solveButton = document.getElementById("SolveButton");
    solveButton.addEventListener('click', () => solve());
});

function fillTheInputArray() {
    for (let i = 0; i <= 80; i++) {
        let id = "box" + i;
        let temporaryInputElement = document.getElementById(id);
        inputs.push(temporaryInputElement);
    }
}

function solve() {
    markTheInputsTheUserMade();
    if (!fillTheSudoku()) {
        console.log("No solution found!");
    }
}

function fillTheSudoku() {
    let currentInputBoxIndex = 0;
    let stack = [];

    while (currentInputBoxIndex < 81) {
        let currentInputBox = inputs[currentInputBoxIndex];

        if (!currentInputBox.classList.contains("UserInput")) {
            let start = currentInputBox.value === "" ? 1 : parseInt(currentInputBox.value) + 1;

            let placed = tryPlaceUntilLegal(currentInputBox, currentInputBoxIndex, start);

            if (placed) {
                stack.push(currentInputBoxIndex);
                currentInputBoxIndex++;
            } else {
                currentInputBox.value = "";
                if (stack.length === 0) {
                    return false; // No solution found
                }
                currentInputBoxIndex = stack.pop();
            }
        } else {
            currentInputBoxIndex++;
        }
    }
    return true;
}

function tryPlaceUntilLegal(x, index, start) {
    for (let currentTry = start; currentTry <= 9; currentTry++) {
        if (isLegal(currentTry, index)) {
            x.value = currentTry;
            return true;
        }
    }
    return false;
}

function isLegal(currentTry, index) {
    let theBoxWeWorkWith = document.getElementById("box" + index);
    let theBoxesThatCantHaveTheSameNumber = [];
    let classes = getLastThreeClasses(theBoxWeWorkWith);

    for (let item of inputs) {
        if (containsSomeButNotAllClasses(item, classes)) {
            theBoxesThatCantHaveTheSameNumber.push(item);
        }
    }

    for (let item of theBoxesThatCantHaveTheSameNumber) {
        if (item.value === currentTry.toString()) {
            return false;
        }
    }
    return true;
}

function containsSomeButNotAllClasses(element, classList) {
    const containsAny = classList.some(className => element.classList.contains(className));
    const containsAll = classList.every(className => element.classList.contains(className));
    return containsAny && !containsAll;
}

function getLastThreeClasses(element) {
    const classes = Array.from(element.classList);
    return classes.slice(-3);
}

function markTheInputsTheUserMade() {
    inputs.forEach((item) => {
        if (item.value !== "") {
            item.classList.add("UserInput");
        }
    });
}

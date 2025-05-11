//Create grid container
const gridContainer = document.getElementById("gridContainer");
gridContainer.classList.add("glow");

//Create change layout button
const popupBtn = document.createElement("button");
popupBtn.setAttribute("id", "popupBtn");
popupBtn.textContent = "Change Layout";
document.body.insertBefore(popupBtn, gridContainer);

//Create popup container
const popup = document.createElement("div");
popup.setAttribute("id", "popup");
popup.classList.add("popup");

//Create span container
const spanContainer = document.createElement("div");
spanContainer.setAttribute("id", "spanContainer");

const span = document.createElement("span");
span.setAttribute("id", "span");
span.textContent = "Enter a number between 1 and 100";
spanContainer.appendChild(span);

//Create input container
const inputContainer = document.createElement("div");
inputContainer.setAttribute("id", "inputContainer");

const input = document.createElement("input");
input.setAttribute("id", "input");
input.setAttribute("type", "number");
input.setAttribute("min", "1");
input.setAttribute("max", "100");
inputContainer.appendChild(input);

//create OK and cancel buttons
const okBtn = document.createElement("button");
okBtn.setAttribute("id", "okBtn");
okBtn.textContent = "OK";

const cancelBtn = document.createElement("button");
cancelBtn.setAttribute("id", "cancelBtn");
cancelBtn.textContent = "Cancel";

//Button container
const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("id", "buttonContainer");
buttonContainer.appendChild(cancelBtn);
buttonContainer.appendChild(okBtn);

//Build popup structure
popup.appendChild(spanContainer);
popup.appendChild(inputContainer);
popup.appendChild(buttonContainer);

//Hide popup initially
popup.style.display = "none";
document.body.appendChild(popup);

//Toggle popup on button click
popupBtn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "none" ? "block" : "none";
});

//Cancel button hides popup
cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

//Alert if less than 1 or more than 100
okBtn.addEventListener("click", () => {
    const size = parseInt(input.value);
    if (isNaN(size) || size < 1 || size > 100) {
        alert ("Please enter a number between 1 and 100");
        return;
    }

    gridContainer.innerHTML = "";

    //Create grid
    function createGrid(size) {
        const totalCells = size * size;
        const cellSize = 100 / size + "%";
        let isMouseDown = false;

        document.body.addEventListener("mousedown", () => isMouseDown = true);
        document.body.addEventListener("mouseup", () => isMouseDown = false);

        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement("div");
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cell.style.border = "1px solid #333";
            cell.style.boxSizing = "border-box";
            
            cell.setAttribute("data-darken", "0");
            cell.addEventListener("mouseover", () => {
                if (!isMouseDown) return;

                let darkenLevel = parseInt(cell.getAttribute("data-darken")) || 0;
            
            
                if (!cell.style.backgroundColor || cell.style.backgroundColor === "transparent") {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                } else if (darkenLevel < 10) {
                    darkenLevel++;
                    cell.setAttribute("data-darken", darkenLevel.toString());
                    const brightness = 100 - darkenLevel * 10;
                    cell.style.filter = `brightness(${brightness}%)`;
                }
            });

            gridContainer.appendChild(cell);
        }
    }

    createGrid(size);
    popup.style.display = "none";
});
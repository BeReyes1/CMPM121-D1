import notlikeduck from "./NotLikeDuck.png";
import "./style.css";

let counter: number = 0;
let growthRate: number = 0;

let aPrice: number = 10;
let bPrice: number = 100;
let cPrice: number = 1000;

let aItems: number = 0;
let bItems: number = 0;
let cItems: number = 0;

document.body.innerHTML = `
   <div id="counterText">0 ducks</div>
   <div id="growthText"> 0 cookies/sec</div>
   <div id= "itemsText"> 0 A, 0 B, 0 C</div>
`;

const clickButton = document.createElement("button");
clickButton.style.backgroundImage = `url(${notlikeduck})`;
clickButton.style.backgroundSize = "contain";
clickButton.style.backgroundColor = "transparent";
clickButton.style.width = "64px";
clickButton.style.height = "64px";
document.body.append(clickButton);

const purchaseButtonA = document.createElement("button");
document.body.append(purchaseButtonA);
const purchaseButtonB = document.createElement("button");
document.body.append(purchaseButtonB);
const purchaseButtonC = document.createElement("button");
document.body.append(purchaseButtonC);

const counterText = document.getElementById("counterText")!;
const itemsText = document.getElementById("itemsText")!;
const growthText = document.getElementById("growthText")!;

clickButton.addEventListener("click", () => {
  counter++;
  counterText.textContent = `${counter.toFixed(0)} ducks`;
});

purchaseButtonA.addEventListener("click", () => {
  if (counter >= aPrice) {
    counter -= aPrice;
    growthRate += 0.1;
    aPrice *= 1.15;
    aItems++;
  }
});

purchaseButtonB.addEventListener("click", () => {
  if (counter >= bPrice) {
    counter -= bPrice;
    growthRate += 2;
    bPrice *= 1.15;
    bItems++;
  }
});

purchaseButtonC.addEventListener("click", () => {
  if (counter >= cPrice) {
    counter -= cPrice;
    growthRate += 50;
    cPrice *= 1.15;
    cItems++;
  }
});

let lastTime = performance.now();
function autoStepClick(timestamp: number) {
  const elapsedTime = (timestamp - lastTime) / 1000;
  lastTime = performance.now();

  counter += elapsedTime * growthRate;
  counterText.textContent = `${counter.toFixed(0)} ducks`;
  itemsText.textContent =
    `${aItems} Cursors, ${bItems} Duck Assistants, ${cItems} Community Parks`;
  growthText.textContent = `${growthRate.toFixed(1)} ducks/second`;

  purchaseButtonA.textContent = `Cursor: Costs ${aPrice.toFixed(2)}`;
  purchaseButtonB.textContent = `Duck Assistant: Costs ${bPrice.toFixed(2)}`;
  purchaseButtonC.textContent = `Community Park: Costs ${cPrice.toFixed(2)}`;
  purchaseButtonA.disabled = counter < aPrice;
  purchaseButtonB.disabled = counter < bPrice;
  purchaseButtonC.disabled = counter < cPrice;

  requestAnimationFrame(autoStepClick);
}

requestAnimationFrame(autoStepClick);

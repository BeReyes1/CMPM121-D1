import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let growthRate: number = 0;

let aItems: number = 0;
let bItems: number = 0;
let cItems: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
   <div id="counterText">0 ducks</div>
   <div id="growthText"> 0 cookies/sec</div>
   <div id= "itemsText"> 0 A, 0 B, 0 C</div>
`;

const clickButton = document.createElement("button");
clickButton.textContent = "🦆";
document.body.append(clickButton);

const purchaseButtonA = document.createElement("button");
purchaseButtonA.textContent = "Auto Click A: Costs 10";
document.body.append(purchaseButtonA);
const purchaseButtonB = document.createElement("button");
purchaseButtonB.textContent = "Auto Click B: Costs 100";
document.body.append(purchaseButtonB);
const purchaseButtonC = document.createElement("button");
purchaseButtonC.textContent = "Auto Click C: Costs 1000";
document.body.append(purchaseButtonC);

const counterText = document.getElementById("counterText")!;
const itemsText = document.getElementById("itemsText")!;
const growthText = document.getElementById("growthText")!;

clickButton.addEventListener("click", () => {
  counter++;
  counterText.textContent = `${counter.toFixed(0)} ducks`;
});

purchaseButtonA.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    aItems++;
  }
});

purchaseButtonB.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    bItems++;
  }
});

purchaseButtonC.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
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
    `${aItems} A Items, ${bItems} B Items, ${cItems} C Items`;
  growthText.textContent = `${growthRate.toFixed(1)} ducks/second`;

  purchaseButtonA.disabled = counter < 10;
  purchaseButtonB.disabled = counter < 100;
  purchaseButtonC.disabled = counter < 1000;

  requestAnimationFrame(autoStepClick);
}

requestAnimationFrame(autoStepClick);

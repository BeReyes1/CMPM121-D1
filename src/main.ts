import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let growthRate: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
   <div id="counterText">0 ducks</div>
`;

const clickButton = document.createElement("button");
clickButton.textContent = "🦆";
document.body.append(clickButton);
const purchaseButton = document.createElement("button");
purchaseButton.textContent = "Auto Click: Costs 10";
document.body.append(purchaseButton);

const counterText = document.getElementById("counterText")!;

clickButton.addEventListener("click", () => {
  counter++;
  counterText.textContent = `${counter.toFixed(0)} ducks`;
});

purchaseButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate++;
  }
});

let lastTime = performance.now();
function autoStepClick(timestamp: number) {
  const elapsedTime = (timestamp - lastTime) / 1000;
  lastTime = performance.now();

  counter += elapsedTime * growthRate;
  counterText.textContent = `${counter.toFixed(0)} ducks`;

  purchaseButton.disabled = counter < 10;

  requestAnimationFrame(autoStepClick);
}

requestAnimationFrame(autoStepClick);

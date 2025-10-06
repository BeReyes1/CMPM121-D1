import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
   <div id="counterText">0 ducks</div>
`;

const clickButton = document.createElement("button");
clickButton.textContent = "🦆";
document.body.append(clickButton);

const counterText = document.getElementById("counterText")!;

setInterval(autoClick, 1000);

clickButton.addEventListener("click", () => {
  counter++;
  counterText.textContent = `${counter} ducks`;
});

function autoClick() {
  counter++;
  counterText.textContent = `${counter} ducks`;
}

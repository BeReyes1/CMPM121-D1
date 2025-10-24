import notlikeduck from "./NotLikeDuck.png";
import notlikeduckbg from "./notlikeduckbg.png";
import "./style.css";

//center button
/**
 * UI
 * Setup for user interface
 */
document.body.style.backgroundImage = `url(${notlikeduckbg})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";

document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";

/**
 * STARTING VARIABLES
 * Setup for the main variables
 */
let counter: number = 0;
let growthRate: number = 0;

/**
 * SECTION: SETUP
 * Interfaces and constants that define game state and purchasable items
 */

interface DuckUpgrade {
  name: string;
  cost: number;
  rate: number;
  totalAmount: number;
  description: string;
}

const purchasableUpgrades: DuckUpgrade[] = [
  {
    name: "Cursor",
    cost: 10,
    rate: 0.1,
    totalAmount: 0,
    description: "Get some help from a duck cursor.",
  },
  {
    name: "Duck Assistant",
    cost: 100,
    rate: 2,
    totalAmount: 0,
    description: "He is not a vicious duck.",
  },
  {
    name: "Community Park",
    cost: 1000,
    rate: 50,
    totalAmount: 0,
    description: "Bread Swarm",
  },
  {
    name: "The Beach",
    cost: 5000,
    rate: 200,
    totalAmount: 0,
    description: "Duck attack on the Beach!",
  },
  {
    name: "Take Over",
    cost: 1000000,
    rate: 10000,
    totalAmount: 0,
    description: "The ducks have conquered The World.",
  },
];

/**
 * SECTION: TEXT
 * Setup for text.
 */

document.body.innerHTML = `
   <div id="counterText">0 ducks</div>
   <div id="growthText"> 0 cookies/sec</div>
   <div id= "itemsText"> 0 A, 0 B, 0 C</div>
`;

const counterText = document.getElementById("counterText")!;
const itemsText = document.getElementById("itemsText")!;
const growthText = document.getElementById("growthText")!;

/**
 * SECTION: BUTTON ELEMENTS
 * Setup for the buttons.
 */

const clickButton = document.createElement("button");
clickButton.style.backgroundImage = `url(${notlikeduck})`;
clickButton.style.backgroundSize = "contain";
clickButton.style.backgroundColor = "transparent";
clickButton.style.width = "256px";
clickButton.style.height = "256px";
//clickButton.style.position = "absolute";
document.body.append(clickButton);

clickButton.addEventListener("click", () => {
  counter++;
  counterText.textContent = `${counter.toFixed(0)} ducks`;
});

const purchaseButtons: HTMLButtonElement[] = [];
for (const upgrade of purchasableUpgrades) {
  const button = document.createElement("button");
  button.textContent = `${upgrade.name}: Costs ${upgrade.cost}`;
  button.title = upgrade.description;
  document.body.append(button);

  button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.cost *= 1.15;
      upgrade.totalAmount++;
    }
  });

  purchaseButtons.push(button);
}

/**
 * SECTION: GAMEPLAY
 * Manages runtime and how the game changes.
 */

let lastTime = performance.now();
function autoStepClick(timestamp: number) {
  const elapsedTime = (timestamp - lastTime) / 1000;
  lastTime = performance.now();

  counter += elapsedTime * growthRate;
  itemsText.textContent = purchasableUpgrades.map((upgrade) =>
    `${upgrade.totalAmount} ${upgrade.name}s`
  ).join(", ");
  growthText.textContent = `${growthRate.toFixed(1)} ducks/second`;

  for (let i = 0; i < purchasableUpgrades.length; i++) {
    const upgrade = purchasableUpgrades[i];
    const button = purchaseButtons[i];
    button.textContent = `${upgrade.name}: Costs ${upgrade.cost.toFixed(2)}`;
    button.disabled = counter < upgrade.cost;
  }

  requestAnimationFrame(autoStepClick);
}

requestAnimationFrame(autoStepClick);

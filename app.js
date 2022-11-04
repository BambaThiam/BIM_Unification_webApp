/*Start code from ifc.js crash course*/

import { projects } from "./projects.js";

// Get all cards
const projectContainer = document.getElementById("projects-container");
const projectCards = Array.from(projectContainer.children);
console.log(projectCards);

const templateProjectCard = projectCards[0];

const baseURL = "./model-viewer.html";

for (let project of projects) {
  // Create a new card
  const newCard = templateProjectCard.cloneNode(true);

  // Add project name to card
  const cardTitle = newCard.querySelector("h2");
  cardTitle.textContent = project.name;

  // Add project URL to card
  const button = newCard.querySelector("a");
  button.href = baseURL + `?id=${project.id}`;

  // Add card to container
  projectContainer.appendChild(newCard);
}

templateProjectCard.remove();

/*End code from ifc.js crash course*/

/***** Mouse effect ********/
const mouses = document.querySelectorAll(".mouse");

window.addEventListener("mousemove", (e) => {
  mouses.forEach((mouse) => {
    mouse.style.top = e.y + "px";
    mouse.style.left = e.x + "px";
  });
});

// window.addEventListener("mousemove", (e) => {
//   cursor.style.top = e.y + "px";
//   cursor.style.left = e.x + "px";

//   mouse1.style.top = e.y + "px";
//   mouse1.style.left = e.x + "px";

//   mouse2.style.top = e.y + "px";
//   mouse2.style.left = e.x + "px";
// })

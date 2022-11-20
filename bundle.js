const projects = [
  {
    name: "Hypervision chantier temps réel",
    id: "1",
    url: "./02_Hypervision_WebApp_Videos/index.html",
  },

  {
    name: "E-learning formation au poste prémur",
    id: "2",
    url: "./03_E-learning_App/index.html",
  },

  {
    name: "BIM Unification webApp",
    id: "3",
    url: "./01_BIM_unification_WebApp/web_ifc/index.html",
  },

  {
    name: "Réalité virtuelle formation au poste prémur",
    id: "4",
    url: "./04_VR_App/index.html",
  },
  // {
  //   name: "Formation aux postes prémurs en réalité virtuelle",
  //   id: "5",
  //   url: "./05_App_visibility/index.html",
  // },
  // {
  //   name: "Floor Plans app",
  //   id: "6",
  //   url: "./06_App_floor/index.html",
  // },
  // {
  //   name: "GIS app",
  //   id: "7",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "Scan 3D Viewer app",
  //   id: "8",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "Model editing app",
  //   id: "9",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "BIM 4D app",
  //   id: "10",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "BIM & low carbon app",
  //   id: "11",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "BIM & Safety app",
  //   id: "12",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "BIM 5D",
  //   id: "13",
  //   url: "./comming_soon/index.html",
  // },
  // {
  //   name: "BIM 5D",
  //   id: "14",
  //   url: "./comming_soon/index.html",
  // },
];

/*Start code from ifc.js crash course*/

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

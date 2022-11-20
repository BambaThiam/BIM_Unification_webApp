import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({
  container,
  backgroundColor: new Color(0xffffff),
});
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
  await viewer.IFC.setWasmPath("../../wasm/");
  const model = await viewer.IFC.loadIfcUrl(url);
  model.removeFromParent(); //ajouté
  await viewer.shadowDropper.renderShadow(model.modelID);
  viewer.context.renderer.postProduction.active = true;
  await setupAllCategories(); //ajouté
}

loadIfc("../ifc_files/BIM.ifc");

// Properties menu

window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

window.ondblclick = async () => {
  const result = await viewer.IFC.selector.highlightIfcItem();
  if (!result) return;
  const { modelID, id } = result;
  const props = await viewer.IFC.getProperties(modelID, id, true, false);
  createPropertiesMenu(props);
};

const propsGUI = document.getElementById("ifc-property-menu-root");

function createPropertiesMenu(properties) {
  console.log(properties);

  removeAllChildren(propsGUI);

  const psets = properties.psets;
  const mats = properties.mats;
  const type = properties.type;

  delete properties.psets;
  delete properties.mats;
  delete properties.type;

  for (let key in properties) {
    createPropertyEntry(key, properties[key]);
  }
}

function createPropertyEntry(key, value) {
  const propContainer = document.createElement("div");
  propContainer.classList.add("ifc-property-item");

  if (value === null || value === undefined) value = "undefined";
  else if (value.value) value = value.value;

  const keyElement = document.createElement("div");
  keyElement.textContent = key;
  propContainer.appendChild(keyElement);

  const valueElement = document.createElement("div");
  valueElement.classList.add("ifc-property-value");
  valueElement.textContent = value;
  propContainer.appendChild(valueElement);

  propsGUI.appendChild(propContainer);
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// ****** Test search *
const data_base = [
  {
    question: "Combien de prémur(s) doit-on poser ?",
    reponse: "Nous devons poser 4 prémurs",
  },
  {
    question: "Quel est le prémur à poser aujourd'hui ?",
    reponse: "Nous devons poser le prémur n°2",
  },
  {
    question:
      "Quels sont les ouvriers habilités et ayant fait la formation au poste de travail pose prémur ?",
    reponse: {
      prenom: "Jean",
      nom: "HULARD",
      poste: "chef d'équipe",
      prenom: "Alexis",
      nom: "LOPES",
      poste: "coffreur",
      prenom: "Alexandre",
      nom: "BOMPARD",
      poste: "coffreur",
      prenom: "Rémy",
      nom: "SICARD",
      poste: "grutier",
    },
  },
  {
    question: "Quelle est la procédure concernant la tâche ?",
    reponse:
      "Se rapporter à la procedure d'excution n°670601 actuellement en statut BPE (Bon Pour Execution)",
  },
  {
    question: "Quels sont les plans concernés par la tâche ?",
    reponse:
      "Plan de pose n°761 - version 4, pour les aciers de liaisons, se reférer au plan d'armatures n°358703",
  },
  {
    question:
      "Quels sont les risques propres liés à la tâche de pose de prémur ?",
    reponse: {
      Risques: "Riques de heurt ou d'écrasement / chut de hauteur",
      Mesure_prev: {
        Mesure_1: "le grutier est formé et habilité (CACES)",
        Mesure_2:
          "la zone d'évolution de l'engin doit-être délimitée et le grutier formé et habilité (CACES)",
        Mesure_3:
          "Pas de personnel sous la charge / pas de survol au-dessus du personnel",
        Mesure_4: "respecter le port des EPI",
        Mesure_5: "Se référer à la procédure pour le reste",
      },

      Risques: "Chute de charge/coincement de la personne",
      Mesure_prev: {
        Mesure_1: "Utiliser des accessoires de levages adaptés et contrôlés",
        Mesure_2:
          "Respecter les consignes du chef de chantier ou chef de manoeuvre",
        Mesure_3: "Ne pas se positionner entre un élement fixe et la charge",
        Mesure_4: "Se référer à la procédure pour le reste",
      },

      Risques: "Circulation des toupies / Heurte-Ecrasement",
      Mesure_prev: {
        Mesure_1: "Guidage des toupies lors des marches arrières",
        Mesure_2: "Suivre le plan de circulation",
        Mesure_3:
          "S'assurer de la mise en place de toutes les protections individuelles",
        Mesure_4: "S'assurer d'être vu à tout moment par le chauffeur",
        Mesure_5: "Se référer à la procédure pour le reste",
      },
    },
  },

  {
    question: "Combien d'écart a été constaté lors de la journée d'hier",
    reponse:
      "Lors de la journée d'hier, il a été constaté 1 écart sécurité liés à l'utilisation d'une échelle interdite",
  },
];

const searchinput = document.getElementById("searchInput");
const searchValue = document.getElementById("suggestions");

searchinput.addEventListener("keyup", () => {
  const input = searchinput.value;

  const result = data_base.filter((item) =>
    item.question.toLowerCase().includes(input.toLowerCase())
  );

  let suggestion = "";

  if (input != "") {
    result.forEach(
      (resulItem) =>
        (suggestion += `
        <div class="suggestion">${resulItem.question}</div>
      `)
    );
  }
  document.getElementById("suggestions").innerHTML = suggestion;
}),
  searchValue.addEventListener("click", (e) => {
    searchinput.value = e.target.outerText;
    let index = data_base.findIndex(
      (element) => element.question === searchinput.value
    );
    let searchResponse = data_base[index].reponse;
    document.getElementById("responses").innerHTML = `<h3>Réponse:</h3>
        <br>
        <div class="responses">${data_base[index].reponse}</div>
        `;
  });

//************ Début test Filtre suivant réponse pour selectionner mur ***********/
// const resp = document.getElementById("responses");
// console.log(resp.value);

// if (condition == "Nous devons poser le prémur n°2") {

// }

//************ Fin Filtre suivant réponse pour selectionner mur ***********/

// container.remove();
// let index = data_base.findIndex(
//   (element) => element.question === searchinput.value
// );
// let searchResponse = data_base[index].reponse;
// document.getElementById("responses").innerHTML =
//         `<h3>Réponse:</h3>
//         <br>
//         <div class="responses">${data_base[index].reponse}</div>
//         `;
// });

///****************************************** Selection App  ******************************************* */

import {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
} from "web-ifc";

// async function loadIfc(url) {
// 	await viewer.IFC.setWasmPath("../../../");
// 	const model = await viewer.IFC.loadIfcUrl(url);
// 	model.removeFromParent();
// 	await viewer.shadowDropper.renderShadow(model.modelID);

// 	await setupAllCategories();
// }

// loadIfc('../../../IFC/01.ifc');

const scene = viewer.context.getScene();

// List of categories names
const categories = {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCFURNISHINGELEMENT,
  IFCDOOR,
  IFCWINDOW,
  IFCPLATE,
  IFCMEMBER,
};

// Gets the name of a category
function getName(category) {
  const names = Object.keys(categories);
  return names.find((name) => categories[name] === category);
}

// Gets all the items of a category
async function getAll(category) {
  return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}

// Creates a new subset containing all elements of a category
async function newSubsetOfType(category) {
  const ids = await getAll(category);
  return viewer.IFC.loader.ifcManager.createSubset({
    modelID: 0,
    scene,
    ids,
    removePrevious: true,
    customID: category.toString(),
  });
}

// Stores the created subsets
const subsets = {};

async function setupAllCategories() {
  const allCategories = Object.values(categories);
  for (let i = 0; i < allCategories.length; i++) {
    const category = allCategories[i];
    await setupCategory(category);
  }
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
  subsets[category] = await newSubsetOfType(category);
  setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
  const name = getName(category);
  const checkBox = document.getElementById(name);
  checkBox.addEventListener("change", (event) => {
    const checked = event.target.checked;
    const subset = subsets[category];
    if (checked) scene.add(subset);
    else subset.removeFromParent();
  });
}

// Display / Hide

const fenetre = document.querySelector(".activator");
const fenetre_contain = document.querySelector(".card-all");
const message = document.querySelector(".simple-card");

fenetre_contain.style.display = "none";
message.style.display = "none";

fenetre.addEventListener("click", () => {
  //   console.log("hello world");

  if (fenetre_contain.style.display === "none") {
    fenetre_contain.style.display = "flex";
    message.style.display = "flex";
  } else {
    fenetre_contain.style.display = "none";
    message.style.display = "none";
  }
});

// const filtr = document.querySelector(".but");
// console.log(filtr);

const send_button = document.querySelector(".send-button");
const skill_button = document.querySelector(".skill-button");
let dailyChampionInput = document.getElementById("guess-input");
let dailySkillInput = document.getElementById("skill-input");
let guessList = document.getElementById("guess-list"); // let champions = new Array();
let dailyChampion;
let dailySkill;
let dailyskillImg = document.getElementById("skill-img");
let skill = "QWER";
let randomSkill = skill[Math.floor(Math.random() * skill.length)];
let randomDegrees = [90, 180, 270];
let listContainer = document.getElementById("input-list");
let skillSection = document.getElementById("guess-skill");
let guessSection = document.getElementById("guess-champion");
let tableContainer = document.querySelector(".table-container");
$(document).ready(function () {
  // fetch("/loldle_champions.json")
  //   .then((response) => response.json())
  //   .then((json) => {
  //     champions = json;
  // dailyChampion = champions[Math.floor(Math.random() * champions.length)];
  //     console.log(dailyChampion);
  //   });
  dailyChampion = champions[Math.floor(Math.random() * champions.length)];
  dailySkill = champions[Math.floor(Math.random() * champions.length)];
  dailyskillImg.src =
    "images" + "/Spells" + "/" + dailySkill.Name + randomSkill + ".png";

  dailyskillImg.style.transform =
    "rotate" +
    "(" +
    randomDegrees[Math.floor(Math.random() * randomDegrees.length)] +
    "deg";
  (")");

  console.log(dailyChampion);
  console.log(dailySkill);
});

dailyChampionInput.addEventListener("input", function () {
  let inputValue = dailyChampionInput.value;

  let filteredChampions = champions.filter(function (item) {
    return item.Name.toLowerCase().startsWith(inputValue.toLowerCase());
  });
  removeGuessListItems();

  if (inputValue == "" || filteredChampions.length == 0) {
    listContainer.classList.add("hidden");
    return;
  }
  listContainer.classList.remove("hidden");
  inputLister(filteredChampions);
});
dailyChampionInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    generateChampionRow();
  }
});

send_button.addEventListener("click", generateChampionRow);
function generateChampionRow() {
  let userInput;

  if (guessList.children.length > 0) {
    userInput =
      guessList.children[0].getElementsByClassName("input-item-name")[0]
        .innerHTML;
    listContainer.classList.add("hidden");

    removeGuessListItems();
  } else {
    return;
  }

  inputProcessor(userInput);
  tableContainer.classList.remove("class", "hidden");
  // console.log(tableContainer.classList);
}
function arrayComparator(arr1, arr2, cell) {
  cell.children[0].innerHTML = arr1.join(", ");

  if (JSON.stringify(arr1.sort()) == JSON.stringify(arr2.sort())) {
    return (cell.style.backgroundColor = "Green");
  } else {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          return (cell.style.backgroundColor = "Yellow");
        }
      }
    }
    return (cell.style.backgroundColor = "Red");
  }
}

function intComparator(str1, str2, cell) {
  let div = document.createElement("span");
  cell.appendChild(div);
  cell.style.position = "relative";
  div.style.position = "absolute";
  if (parseInt(str1) == parseInt(str2)) {
    div.innerHTML = str1;
  } else if (parseInt(str1) < parseInt(str2)) {
    div.innerHTML = str1;
    cell.children[0].classList.add("arrow-container");
  } else {
    div.innerHTML = str1;
    cell.children[0].classList.add("arrow-container");
    cell.children[0].style.transform = "rotate(180deg)";
  }
}

function createCell(row, index) {
  let div = document.createElement("div");
  let cell = row.insertCell(index);
  cell.appendChild(div);
  return cell;
}

function createImage(imageSrc) {
  let img = document.createElement("img");
  img.src = "images" + "/Champions" + "/" + imageSrc + ".png";
  img.style.height = "100px";
  img.style.width = "100px";

  return img;
}

function guessAlert(guessedChampion, targetChampion) {
  if (guessedChampion == targetChampion) {
    alert("You win!");
    guessSection.setAttribute("class", "hidden");
    skillSection.classList.remove("hidden");
  }
}

dailySkillInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    skillComparator();
  }
});
skill_button.addEventListener("click", skillComparator);

function skillComparator() {
  let userSkillInput = document.getElementById("skill-input").value;
  document.getElementById("skill-input").value = "";

  let tableSkill = document
    .getElementById("skillTable")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < champions.length; i++) {
    if (userSkillInput.toLowerCase() === champions[i].Name.toLowerCase()) {
      let skillRow = tableSkill.insertRow(0);
      createCell(skillRow, 0).children[0].appendChild(
        createImage(champions[i].Image)
      );
      dailySkillStringComparator(
        champions[i].Name,
        dailySkill.Name,
        skillRow.cells[0]
      );
      guessAlert(champions[i].Name, dailySkill.Name);
      champions.splice(i, 1);
      break;
    }
  }
}

let dailySkillStringComparator = (str1, str2, cell) => {
  return (cell.style.backgroundColor = str1 === str2 ? "Green" : "Red");
};

function stringComparator(str1, str2, cell, shouldWriteCell = true) {
  if (shouldWriteCell) {
    cell.children[0].innerHTML = str1;
  }
  return dailySkillStringComparator(str1, str2, cell);
}

function onClickListItem(e) {
  let inputValue =
    e.target.getElementsByClassName("input-item-name")[0].innerHTML;

  listContainer.classList.add("hidden");
  tableContainer.classList.remove("class", "hidden");
  removeGuessListItems();
  inputProcessor(inputValue);
}

function inputProcessor(userInput) {
  document.getElementById("guess-input").value = "";

  let table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];

  let selectedChampionIndex = champions.findIndex(
    (champion) => champion.Name.toLowerCase() == userInput.toLowerCase()
  );

  if (selectedChampionIndex == -1) {
    return;
  }
  const selectedChampion = champions[selectedChampionIndex];

  let row = table.insertRow(0);

  createCell(row, 0).children[0].appendChild(
    createImage(selectedChampion.Image)
  );
  stringComparator(
    selectedChampion.Gender,
    dailyChampion.Gender,
    createCell(row, 1)
  );
  arrayComparator(
    selectedChampion.Position,
    dailyChampion.Position,
    createCell(row, 2)
  );
  arrayComparator(
    selectedChampion.Species,
    dailyChampion.Species,
    createCell(row, 3)
  );
  stringComparator(
    selectedChampion.Resource,
    dailyChampion.Resource,
    createCell(row, 4)
  );
  arrayComparator(
    selectedChampion.RangeType,
    dailyChampion.RangeType,
    createCell(row, 5)
  );
  arrayComparator(
    selectedChampion.Region,
    dailyChampion.Region,
    createCell(row, 6)
  );
  let releaseYearCell = createCell(row, 7);
  stringComparator(
    selectedChampion.ReleaseYear,
    dailyChampion.ReleaseYear,
    releaseYearCell,
    false
  );
  intComparator(
    selectedChampion.ReleaseYear,
    dailyChampion.ReleaseYear,
    releaseYearCell
  );
  guessAlert(selectedChampion.Name, dailyChampion.Name);
  champions.splice(selectedChampionIndex, 1);
}
function inputLister(array) {
  for (i = 0; i < array.length; i++) {
    let listItem = document.createElement("li");
    let pictureContainer = document.createElement("div");
    let titleContainer = document.createElement("div");
    let imgItem = document.createElement("img");
    let titleItem = document.createElement("p");
    pictureContainer.setAttribute("class", "input-list-img");
    titleItem.classList.add("input-item-name");
    titleContainer.setAttribute("class", "input-list-title");
    listItem.appendChild(pictureContainer);
    listItem.appendChild(titleContainer);
    pictureContainer.appendChild(imgItem);
    titleContainer.appendChild(titleItem);
    listItem.addEventListener("click", onClickListItem);
    imgItem.src = "images" + "/Champions" + "/" + array[i].Image + ".png";
    titleItem.innerHTML = array[i].Name;
    guessList.appendChild(listItem);
  }
}

function removeGuessListItems() {
  while (guessList.firstChild) {
    guessList.firstChild.removeEventListener("click", onClickListItem);
    guessList.firstChild.remove();
  }
}

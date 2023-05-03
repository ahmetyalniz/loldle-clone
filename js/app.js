const send_button = document.querySelector(".send-button");
const skill_button = document.querySelector(".skill-button");
let dailyChampionInput = document.getElementById("guess-input");
let dailySkillInput = document.getElementById("skill-input");

// let champions = new Array();
let dailyChampion;
let dailySkill;
let dailyskillImg = document.getElementById("skill-img");
let skill = "QWER";
let randomSkill = skill[Math.floor(Math.random() * skill.length)];
let randomDegrees = [0, 90, 180, 270];
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
  console.log(randomDegrees[Math.floor(Math.random() * randomDegrees.length)]);
  console.log(dailyChampion);
});

dailyChampionInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    generateChampionRow();
  }
});
send_button.addEventListener("click", generateChampionRow);
function generateChampionRow() {
  let userInput = document.getElementById("guess-input").value;

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
    releaseYearCell
  );
  intComparator(
    selectedChampion.ReleaseYear,
    dailyChampion.ReleaseYear,
    releaseYearCell
  );
  guessAlert(selectedChampion.Name, dailyChampion.Name);
  champions.splice(selectedChampionIndex, 1);
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
  if (parseInt(str1) == parseInt(str2)) {
    cell.children[0].innerHTML = str1;
  } else if (parseInt(str1) < parseInt(str2)) {
    cell.children[0].innerHTML = ">" + str1;
  } else {
    cell.children[0].innerHTML = "<" + str1;
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

function stringComparator(str1, str2, cell) {
  cell.children[0].innerHTML = str1;
  return dailySkillStringComparator(str1, str2, cell);
}

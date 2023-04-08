const send_button = document.querySelector(".send-button");
var input = document.getElementById("guess-input");
// var champions = new Array();
var dailyChampion;
$(document).ready(function () {
  // fetch("/loldle_champions.json")
  //   .then((response) => response.json())
  //   .then((json) => {
  //     champions = json;
  // dailyChampion = champions[Math.floor(Math.random() * champions.length)];
  //     console.log(dailyChampion);
  //   });
  dailyChampion = champions[Math.floor(Math.random() * champions.length)];
  console.log(dailyChampion);
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    generateChampionRow();
  }
});
send_button.addEventListener("click", generateChampionRow);
function generateChampionRow() {
  var userInput = document.getElementById("guess-input").value;

  document.getElementById("guess-input").value = "";

  var table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < champions.length; i++) {
    if (userInput.toLowerCase() === champions[i].Name.toLowerCase()) {
      var row = table.insertRow(0);

      createCell(row, 0).appendChild(createImage(champions[i].Image));
      stringComparator(
        champions[i].Gender,
        dailyChampion.Gender,
        createCell(row, 1)
      );
      arrayComparator(
        champions[i].Position,
        dailyChampion.Position,
        createCell(row, 2)
      );
      arrayComparator(
        champions[i].Species,
        dailyChampion.Species,
        createCell(row, 3)
      );
      stringComparator(
        champions[i].Resource,
        dailyChampion.Resource,
        createCell(row, 4)
      );
      arrayComparator(
        champions[i].RangeType,
        dailyChampion.RangeType,
        createCell(row, 5)
      );
      arrayComparator(
        champions[i].Region,
        dailyChampion.Region,
        createCell(row, 6)
      );
      var releaseYearCell = createCell(row, 7);
      stringComparator(
        champions[i].ReleaseYear,
        dailyChampion.ReleaseYear,
        releaseYearCell
      );
      intComparator(
        champions[i].ReleaseYear,
        dailyChampion.ReleaseYear,
        releaseYearCell
      );
      guessAlert(champions[i].Name, dailyChampion.Name);
      champions.splice(i, 1);

      break;
    }
  }
}
function arrayComparator(arr1, arr2, cell) {
  cell.innerHTML = arr1;

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

function stringComparator(str1, str2, cell) {
  cell.innerHTML = str1;
  return (cell.style.backgroundColor = str1 === str2 ? "Green" : "Red");
}

function intComparator(str1, str2, cell) {
  if (parseInt(str1) == parseInt(str2)) {
    cell.innerHTML = str1;
  } else if (parseInt(str1) < parseInt(str2)) {
    cell.innerHTML = ">" + str1;
  } else {
    cell.innerHTML = "<" + str1;
  }
}

function createCell(row, index) {
  return row.insertCell(index);
}

function createImage(imageSrc) {
  var img = document.createElement("img");
  img.src = "/Champions" + "/" + imageSrc + ".png";
  img.style.height = "72.6px";
  img.style.width = "66px";

  return img;
}

function guessAlert(guessedChampion, targetChampion) {
  if (guessedChampion == targetChampion) {
    alert("You win!");
  }
}

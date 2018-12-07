function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  gotSearch();
  gotCharacters(userDatas);
  var aliveCharacters = gotCharacters(userDatas);
  gotSort(aliveCharacters);
  gotPicturesAndNames(aliveCharacters);
  getCharacter(aliveCharacters);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function gotCharacters(characters) {
  var alive = [];
  for ( var i = 0; i < characters.length; i++) {
    if (!characters[i].dead) {
      alive.push(characters[i]);
    }
  }
// console.log(alive);
  return alive;
}

function gotSort(characters) {
  characters.sort(function sortedCharacter(first, second) {
    if (first.name > second.name) {
      return 1;
    } return -1;
  });
  console.log(characters);
  return characters;
}

// add pictures and names
function gotPicturesAndNames(characters) {
  var table = '';
  for (var i = 0; i < characters.length; i++) {
    table += `
          <div class="main__div__div">
            <img src="${characters[i].portrait}">
            <p>${characters[i].name}</p>
          </div>
  `;
  }
  document.querySelector('#main__div').innerHTML = table;
}

// add search
function gotSearch(characters) {
  document.querySelector('#aside__inputButton').addEventListener('click', function fc() { filterCharacter(characters)} );
}

function filterCharacter(characters) {
  var info = document.querySelector('#aside__div2');
  var table2 = '';
  var search = document.querySelector('#aside__inputText').value;
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].name === search) {
      table2 +=
      `
      <img src="${characters[i].picture}">
      <p>${characters[i].name}</p>
      <img src="${characters[i].house}.png" alt="house">
      <p>${characters[i].bio}</p>
      `;
      info.innerHTML = table2;
      return;
    }
  }
  info.innerHTML = 'Nincs ilyen ';
}

function getCharacter(characters) {
  filterCharacter(characters);
  var search = document.querySelector('#aside__inputText').value;
  characters.filter(function src(k) {
    return k.toLowerCase().indexOf(search.value) > -1;
  });
}


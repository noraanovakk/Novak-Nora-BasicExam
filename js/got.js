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
  gotCharacters(userDatas);
  var aliveCharacters = gotCharacters(userDatas);
  gotSort(aliveCharacters);
  gotPicturesAndNames(aliveCharacters);
  // getCharacter(aliveCharacters);
  gotSearch(aliveCharacters);
  // filterCharacter(aliveCharacters);
  // gotSearchName(aliveCharacters);
  getContainerElement(aliveCharacters);
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

// add pictures and names to main
function gotPicturesAndNames(characters) {
  var table = '';
  for (var i = 0; i < characters.length; i++) {
    table += `
          <div class="main__div__div">
            <img src="${characters[i].portrait}">
            <p id="main__p">${characters[i].name}</p>
          </div>
  `;
  }
  document.querySelector('#main__div').innerHTML = table;
}

// add search
function gotSearch(characters) {
  document.querySelector('#aside__inputButton').addEventListener('click', function () {filterCharacter( characters);});
}


function filterCharacter(characters) {
  var info = document.querySelector('#aside__div2');
  var table2 = '';
  // var search = document.querySelector('#aside__inputText').value;
  var search = getContainerElement();
  console.log(search);
  console.log(characters.length);
  for (var i = 0; i < characters.length; i++) {
    var house = '';
    if (characters[i].house) {
      house = `<img src="/assets/houses/${characters[i].house}.png" alt="house"></img>`;
    } else {
      house = '';
    }
    table2 =
    `
    <img id="aside__img" src="${characters[i].picture}"></img>
    <p id="aside__name">${characters[i].name}</p>
    <p id="aside__house">${house}</p>
    <p id="aside__bio">${characters[i].bio}</p>
    `;
    if (characters[i].name === search) {
      info.innerHTML = table2;
      console.log(i);
      break;
    } else {
      info.innerHTML = 'Character not found';
    }
  }
}

// assign p to listener
function getContainerElement(characters) {
  var container = document.querySelector('#main__div');
  var personalContainer = container.children;
  for (var i = 0; i < personalContainer.length; i++) {
    // console.log(personalContainer[i].children[1]);
    var paragraph = personalContainer[i].children[1];
    addCustomListenerForParagraph(paragraph, characters, i);
  }
}

// sense click and forwards to printElementContent
function addCustomListenerForParagraph(element, characters, index) {
  element.addEventListener('click', function() { printElementContent(characters, index); });
}

// give back name when clicked
function printElementContent(characters, index) {
  var info = document.querySelector('#aside__div2');
  var table2 = '';
  var house = '';
  if (characters[index].house) {
    house = `<img src="/assets/houses/${characters[index].house}.png" alt="house"></img>`;
  } else {
    house = '';
  }
  table2 =
  `
  <img id="aside__img" src="${characters[index].picture}"></img>
  <p id="aside__name">${characters[index].name}</p>
  <p id="aside__house">${house}</p>
  <p id="aside__bio">${characters[index].bio}</p>
  `;
  info.innerHTML = table2;
}

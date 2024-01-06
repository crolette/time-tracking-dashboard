let cards = document.getElementsByClassName("dashboard__card");
let choices = document.getElementsByClassName("choice__select");
let timelineChoice = "";

addEventListener("DOMContentLoaded", (e) => {
  checkLocalStorage();
  retrieveJson();
  listenerChoices();
});

function listenerChoices() {
  for (const choice of choices) {
    choice.addEventListener("click", (e) => {
      e.preventDefault();
      timelineChoice = choice.id;
      localStorage.setItem("timeline", timelineChoice);
      timelineChoiceClass();
      retrieveJson();
    });
  }
}

function checkLocalStorage() {
  if (localStorage.getItem("timeline") == null) {
    localStorage.setItem("timeline", "daily");
  } else {
    timelineChoice = localStorage.getItem("timeline");
    timelineChoiceClass();
  }
}

function timelineChoiceClass() {
  for (const choice of choices) {
    choice.classList.remove("active");
  }
  choices[timelineChoice].classList.add("active");
}

async function retrieveJson() {
  const requestURL = "data.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const datas = await response.json();
  updateDatas(datas);
}

function updateDatas(datas) {
  for (const card of cards) {
    let cardName = card.id;
    if (cardName != "user") {
      let element = getDataJson(datas, cardName);
      card.children[1].childNodes[3].children[0].firstElementChild.innerText =
        element.current;
      card.children[1].childNodes[3].children[1].firstElementChild.innerText =
        element.previous;
    }
  }
}

function getDataJson(datas, cardName) {
  for (const key in datas) {
    let dataName = datas[key].title.toLowerCase().replace(" ", "");
    if (dataName === cardName) {
      const element = datas[key].timeframes[timelineChoice];
      return element;
    }
  }


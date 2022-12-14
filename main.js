let img = document.querySelector(".img");
let nameBox = document.querySelectorAll(".game h3");
let textBox = document.querySelectorAll(".game h5");
let box;
let send;
let index = "";
fetch("https://mystake.com/api/game/getgametemplates/1/1/1")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    box = data;
    let allGamesSum = (document.querySelector(
      ".box_allGames_info"
    ).innerHTML = `( ${box.GameTemplates.length} )`);
    send = box.GameTemplates.sort(function (a, b) {
      if (a.ID > b.ID) {
        return 1;
      }
      if (a.ID < b.ID) {
        return -1;
      }
      return 0;
    });

    for (let i = 0; i < box.GameTemplateNameTranslations.length; i++) {
      index =
        box.GameTemplateNameTranslations[i].Value.trim()
          .toUpperCase()
          .split(" ")
          .join("") +
        "," +
        index;
    }
    PlayGames();
    document.querySelector(".ourSite").style.display = "flex";
    document.querySelector(".loader").style.display = "none";
  });

const render = (tag, properties = null, children = null) => {
  const element = document.createElement(tag);

  if (properties !== null) {
    for (let [key, value] of Object.entries(properties)) {
      if (key in element) {
        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }
  if (children !== null) {
    if (children instanceof Array) {
      element.append(...children);
    } else {
      element.append(children);
    }
  }
  return element;
};
let textNoGames = document.querySelector(".gameNone");
let articleDiv = document.querySelector("section.games");
let btnMore = document.querySelector(".button");
btnMore.addEventListener("click", PlayGames);
let num = 0;
function PlayGames() {
  for (let i = 0; i <= 59; i++) {
    let match = box.GameTemplateImages.find((item) => {
      return item.GameTemplateId === send[num].ID;
    });
    let matchText = box.GameTemplateNameTranslations.find((item) => {
      return item.GameTemplateId === send[num].ID;
    });
    const element = render("a", { className: "game" }, [
      render("img", {
        className: "images",
        src: "https://static.inpcdn.com/" + match.CdnUrl,
      }),
      render("h3", {
        className: "titles",
        textContent: matchText.Value,
      }),
    ]);
    articleDiv.appendChild(element);
    num = num + 1;
  }
}
//  ???????????? ???????????? ???? ??????????
let input = document.getElementById("input");
let enter = document.getElementById("enter").onclick = myFunc;
function myFunc() {
  let searchWord = input.value.toLowerCase();
  if (input.value === "") {
    btnMore.style.display = "flex";;
    PlayGames()
  } else {
    btnMore.style.display = "none";
  }
  const result = box.GameTemplateNameTranslations.filter((item) => {
    return item.Value?.toLowerCase().includes(searchWord);
  });
  if (result.length === 0) {
    return (articleDiv.innerHTML = "?????????????????? ??????????????? ????????????????????? ?????? ????????????????????????");
  }
  articleDiv.innerHTML = "";
  for (let a = 0; a < result.length; a++) {
    let match = box.GameTemplateImages.find(
      (item) => item.GameTemplateId === result[a].GameTemplateId
    );
    result[a].url = match?.CdnUrl;
  }
  for (let i = 0; i < result.length; i++) {
    const element = render("a", { className: "game" }, [
      render("img", {
        className: "images",
        src: "https://static.inpcdn.com/" + result[i].url,
      }),
      render("h3", { className: "titles", textContent: result[i].Value }),
    ]);
    articleDiv.appendChild(element);
  }
}

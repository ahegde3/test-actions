import data from "./model.js";
import Application from "./application.js";
import { loadQuestionPage } from "./views/question.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild } from "./domops.js";

const app = new Application(data);

window.onload = function () {
  // fill me with relevant code
  loadFrame();
  loadQuestionPage();
};

const loadFrame = () => {
  // header
  let header = document.getElementById("header");
  let empty = createEle({ type: "div" });
  let title = createEle({
    type: "div",
    classes: ["title"],
    innerHTML: "Fake Stack Overflow",
  });
  let search = createEle({
    type: "input",
    id: "searchBar",
    event: {
      keydown: (e) => {
        if (e.key == "Enter") {
          e.preventDefault();
          loadQuestionPage("Search Results", "newest", search.value);
        }
      },
    },
    attributes: { placeholder: "Search ...", type: "text" },
  });

  appendEleChild(header, [empty, title, search]);

  // main
  let main = document.getElementById("main");
  let menu = createEle({
    type: "div",
    id: "sideBarNav",
    classes: ["sideBarNav"],
  });
  let questionbtn = createEle({
    type: "div",
    id: "menu_question",
    innerHTML: "Questions",
    classes: ["menu_button", "menu_selected"],
    event: {
      click: () => {
        loadQuestionPage();
      },
    },
  });
  let tagbtn = createEle({
    type: "div",
    id: "menu_tag",
    innerHTML: "Tags",
    classes: ["menu_button"],
    event: {
      click: () => {
        loadTagPage();
      },
    },
  });
  let right = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  appendEleChild(menu, [questionbtn, tagbtn]);
  appendEleChild(main, [menu, right]);
};

const loadTagPage = () => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let header = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let tagcnt = createEle({
    type: "div",
    innerHTML: app.getTagCount() + " Tags",
    classes: ["bold_title"],
  });

  let title = createEle({
    type: "div",
    innerHTML: "All Tags",
    classes: ["bold_title"],
  });

  appendEleChild(header, [tagcnt, title, askQuestionBtn()]);

  let tagList = createEle({
    type: "div",
    classes: ["tag_list", "right_padding"],
  });

  let tarray = app.getTags().map((t) => {
    let tag = createEle({
      type: "div",
      classes: ["tagNode"],
      event: {
        click: () => {
          loadQuestionPage(t.name, "newest", "[" + t.name + "]");
        },
      },
    });
    let tagname = createEle({
      type: "div",
      classes: ["tagName"],
      innerHTML: t.name,
    });
    let tagQcnt = createEle({
      type: "div",
      innerHTML: app.getQuestionCountByTag(t.tid) + " questions",
    });

    appendEleChild(tag, [tagname, tagQcnt]);
    return tag;
  });

  appendEleChild(tagList, tarray);
  appendEleChild(main, [header, tagList]);

  setMenuButton("tag");
};

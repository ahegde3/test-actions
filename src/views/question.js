import data from "../model.js";
import Application from "../application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors } from "../domops.js";
import { loadAnswersPage } from "./answer.js";

const app = new Application(data);

const loadNewQuestionPage = () => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);
  //let main = document.getElementById("right_main");

  // Clear the existing content
  //main.innerHTML = "";

  // Create the form for new question
  let form = createEle({
    type: "form",
    id: "newQuestionForm",
    classes: ["question_form"],
  });

  // Question title
  let titleLabel = createEle({
    type: "label",
    innerHTML: "Question Title*",
    classes: ["form_question_title_label"],
  });
  let titleHint = createEle({
    type: "div",
    innerHTML: "Limit title to 100 characters or less",
    classes: ["form_question_title_hint"],
  });
  let titleInput = createEle({
    type: "input",
    id: "formTitleInput",
    classes: ["form_question_title_input"],
    attributes: { type: "text" },
  });

  // Question text
  let textLabel = createEle({
    type: "label",
    innerHTML: "Question Text*",
    classes: ["form_text_label"],
  });
  let textHint = createEle({
    type: "div",
    innerHTML: "Add details",
    classes: ["form_question_tags_hint"],
  });
  let textInput = createEle({
    type: "textarea",
    id: "formTextInput",
    //attributes: { placeholder: "Add details" },
    classes: ["form_text_input"],
  });

  // Tags
  let tagsLabel = createEle({
    type: "label",
    innerHTML: "Tags*",
    classes: ["form_question_tags_label"],
  });
  let tagsHint = createEle({
    type: "div",
    innerHTML: "Add keywords separated by whitespace",
    classes: ["form_question_tags_hint"],
  });
  let tagsInput = createEle({
    type: "input",
    id: "formTagInput",
    //attributes: { placeholder: "Add keywords separated by whitespace" },
    classes: ["form_question_tags_input"],
  });

  // Username
  let usernameLabel = createEle({
    type: "label",
    innerHTML: "Username*",
    classes: ["form_username_lable"],
  });
  let usernameInput = createEle({
    type: "input",
    id: "formUsernameInput",
    classes: ["form_username_input"],
    //attributes: { placeholder: "Enter username" },
  });

  // Create a container for postBtn and mandatoryIndicator
  let btnIndicatorContainer = createEle({
    type: "div",
    classes: ["btn_indicator_container"],
  });

  // Post question button
  let postBtn = createEle({
    type: "button",
    innerHTML: "Post Question",
    classes: ["form_postBtn"],
    event: {
      click: (e) => {
        e.preventDefault();
        let isValid = true;

        clearAllErrors();

        if (!titleInput.value) {
          displayError(titleInput, "Title cannot be empty");
          isValid = false;
        } else if (titleInput.value.length > 100) {
          displayError(titleInput, "Title cannot be more than 100 characters");
          isValid = false;
        }


        if (!textInput.value) {
          displayError(textInput, "Question text cannot be empty");
          isValid = false;
        }


        let tags = tagsInput.value
          .split(" ")
          .filter((tag) => tag.trim() !== ""); // Filter out empty tags
        if (tags.length < 1) {
          displayError(tagsInput, "Should have at least 1 tag");
          isValid = false;

        }
        if (tags.length > 5) {
          displayError(tagsInput, "Cannot have more than 5 tags");
          isValid = false;

        }

        for (let tag of tags) {
          if (tag.length > 20) {
            displayError(tagsInput, "New tag length cannot be more than 20");
            isValid = false;
            break; // Exit early since we've already found an invalid tag
          }
        }


        if (!usernameInput.value) {
          displayError(usernameInput, "Username cannot be empty");
          isValid = false;
        }

        if (isValid) {
          // 1. Construct new question object

          let question = {
            title: titleInput.value,
            text: textInput.value,
            tags: tags,
            askedBy: usernameInput.value,
          };

          app.addQuestion(question);

          loadQuestionPage();
        }
      },
    },
  });

  // Mandatory fields indicator
  let mandatoryIndicator = createEle({
    type: "div",
    innerHTML: "* indicates mandatory fields",
    classes: ["mandatory_indicator"],
  });

  // Append postBtn and mandatoryIndicator to the container
  appendEleChild(btnIndicatorContainer, [postBtn, mandatoryIndicator]);

  appendEleChild(form, [
    titleLabel,
    titleHint,
    titleInput,
    textLabel,
    textHint,
    textInput,
    tagsLabel,
    tagsHint,
    tagsInput,
    usernameLabel,
    usernameInput,
    btnIndicatorContainer,
  ]);
  appendEleChild(main, [form]);

  setMenuButton();
};

const loadQuestionPage = (
  title_text = "All Questions",
  order = "newest",
  search = ""
) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let header = createEle({ type: "div" });

  let first = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let title = createEle({
    type: "div",
    innerHTML: title_text,
    classes: ["bold_title"],
  });

  appendEleChild(first, [title, askQuestionBtn()]);

  let second = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let qcnt = createEle({ type: "div", id: "question_count" });

  let btns = createEle({ type: "div", classes: ["btns"] });
  let newbtn = createEle({
    type: "button",
    innerHTML: "Newest",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("newest", search));
      },
    },
  });

  let actbtn = createEle({
    type: "button",
    innerHTML: "Active",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("active", search));
      },
    },
  });

  let unansbtn = createEle({
    type: "button",
    innerHTML: "Unanswered",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("unanswered", search));
      },
    },
  });

  appendEleChild(btns, [newbtn, actbtn, unansbtn]);
  appendEleChild(second, [qcnt, btns]);
  appendEleChild(header, [first, second]);

  appendEleChild(main, [header]);
  appendEleChild(main, [getQuestions(order, search)]);

  setMenuButton("question");
};

const getQuestions = (order = "newest", search = "") => {
  let qlist = app.getQuestionsByFilter(order, search);

  let qcntEle = document.getElementById("question_count");
  qcntEle.textContent = qlist.length + " questions";

  if (search.length && qlist.length == 0) {
    let noresult = createEle({
      type: "div",
      id: "question_list",
      classes: ["bold_title", "right_padding", "question_list"],
      innerHTML: "No Questions Found",
    });
    return noresult;
  }

  let questionsList = createEle({
    type: "div",
    id: "question_list",
    classes: ["question_list"],
  });

  let qarray = qlist.map((q) => {
    let question = createEle({
      type: "div",
      classes: ["question", "right_padding"],
      event: {
        click: () => {
          loadAnswersPage(q.qid);
        },
      },
    });

    let left = createEle({ type: "div", classes: ["postStats"] });
    let answers = createEle({
      type: "div",
      innerHTML: q.getAnswerCount() + " answers",
    });
    let views = createEle({
      type: "div",
      innerHTML: q.getQuestionViews() + " views",
    });
    appendEleChild(left, [answers, views]);

    let mid = createEle({ type: "div", classes: ["question_mid"] });
    let qTitle = createEle({
      type: "div",
      innerHTML: q.title,
      classes: ["postTitle"],
    });

    let qTags = createEle({ type: "div", classes: ["question_tags"] });

    let tarray = q.getTagsId().map((tid) => {
      let t = app.getTagById(tid);
      let tbn = createEle({
        type: "button",
        innerHTML: t.name,
        classes: ["question_tag_button"],
        event: {
          click: (e) => {
            e.stopPropagation();
            loadQuestionPage(t.name, "newest", "[" + t.name + "]");
          },
        },
      });

      return tbn;
    });

    appendEleChild(qTags, tarray);
    appendEleChild(mid, [qTitle, qTags]);

    let right = createEle({ type: "div", classes: ["lastActivity"] });
    let author = createEle({
      type: "div",
      innerHTML: q.askedBy,
      classes: ["question_author"],
    });
    let blank = createEle({
      type: "div",
      innerHTML: "&nbsp",
    });
    let meta = createEle({
      type: "div",
      innerHTML: "asked " + q.calculateTimeElapsed(),
      classes: ["question_meta"],
    });

    appendEleChild(right, [author, blank, meta]);
    appendEleChild(question, [left, mid, right]);

    return question;
  });

  appendEleChild(questionsList, qarray);

  return questionsList;
};

export { loadQuestionPage, loadNewQuestionPage }
import data from "../model.js";
import Application from "../application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors } from "../domops.js";

const app = new Application(data);

const loadAnswersPage = (qid) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let question = app.getQuestionById(qid);
  let ans = app.getQuestionAnswer(question);

  question.addViewCount();

  let header = createEle({
    type: "div",
    id: "answersHeader",
    classes: ["space_between", "right_padding"],
  });

  let anscnt = createEle({
    type: "div",
    innerHTML: question.getAnswerCount() + " answers",
    classes: ["bold_title"],
  });

  let title = createEle({
    type: "div",
    innerHTML: question.title,
    classes: ["bold_title", "answer_question_title"],
  });

  appendEleChild(header, [anscnt, title, askQuestionBtn()]);

  let qbody = createEle({
    type: "div",
    id: "questionBody",
    classes: ["questionBody", "right_padding"],
  });

  let views = createEle({
    type: "div",
    classes: ["bold_title", "answer_question_view"],
    innerHTML: question.getQuestionViews() + " views",
  });

  let qText = createEle({
    type: "div",
    innerHTML: question.text,
    classes: ["answer_question_text"],
  });

  let right = createEle({ type: "div", classes: ["answer_question_right"] });

  let author = createEle({
    type: "div",
    innerHTML: question.askedBy,
    classes: ["question_author"],
  });

  let meta = createEle({
    type: "div",
    innerHTML: "asked " + question.calculateTimeElapsed(),
    classes: ["answer_question_meta"],
  });

  appendEleChild(right, [author, meta]);

  appendEleChild(qbody, [views, qText, right]);

  let anslist = createEle({ type: "div" });
  let ansarray = ans.map((a) => {
    let answer = createEle({
      type: "div",
      classes: ["answer", "right_padding"],
    });
    let answerText = createEle({
      type: "div",
      innerHTML: a.text,
      id: "answerText",
      classes: ["answerText"],
    });

    let ansRight = createEle({ type: "div", classes: ["answerAuthor"] });

    let ansAuthor = createEle({
      type: "div",
      innerHTML: a.ansBy,
      classes: ["answer_author"],
    });

    let ansMeta = createEle({
      type: "div",
      innerHTML: a.calculateTimeElapsed(),
      classes: ["answer_question_meta"],
    });

    appendEleChild(ansRight, [ansAuthor, ansMeta]);
    appendEleChild(answer, [answerText, ansRight]);

    return answer;
  });

  appendEleChild(anslist, ansarray);

  let addAnsbtn = createEle({
    type: "button",
    innerHTML: "Answer Question",
    classes: ["bluebtn", "ansButton"],
    event: {
      click: () => {
        loadNewAnswerPage(qid);
      },
    },
  });

  appendEleChild(main, [header, qbody, anslist, addAnsbtn]);
  setMenuButton();
};

const loadNewAnswerPage = (qid) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  // Create the form for new question
  let form = createEle({
    type: "form",
    id: "newAnswerForm",
    classes: ["answer_form"],
  });

  // Username
  let usernameLabel = createEle({
    type: "label",
    innerHTML: "Username*",
    classes: ["form_username_lable"],
  });
  let usernameInput = createEle({
    type: "input",
    id: "answerUsernameInput",
    classes: ["form_username_input"],
    //attributes: { placeholder: "Enter username" },
  });

  // Answer text
  let textLabel = createEle({
    type: "label",
    innerHTML: "Answer Text*",
    classes: ["form_text_label"],
  });
  let textInput = createEle({
    type: "textarea",
    id: "answerTextInput",
    //attributes: { placeholder: "Add details" },
    classes: ["form_text_input"],
  });

  let btnIndicatorContainer = createEle({
    type: "div",
    classes: ["btn_indicator_container"],
  });

  // Post Answer button
  let postBtn = createEle({
    type: "button",
    innerHTML: "Post Answer",
    classes: ["form_postBtn"],
    event: {
      click: (e) => {
        e.preventDefault();

        clearAllErrors();

        let isValid = true;

        if (!usernameInput.value) {
          displayError(usernameInput, "Username cannot be empty");
          isValid = false;
        }

        if (!textInput.value) {
          displayError(textInput, "Answer text cannot be empty");
          isValid = false;
        }


        if (isValid) {
          let answer = {
            text: textInput.value,
            ansBy: usernameInput.value,
          };

          app.addAnswer(qid, answer);

          loadAnswersPage(qid);
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

  appendEleChild(form, [
    usernameLabel,
    usernameInput,
    textLabel,
    textInput,
    btnIndicatorContainer,
  ]);
  appendEleChild(btnIndicatorContainer, [postBtn, mandatoryIndicator]);
  appendEleChild(main, [form]);
  setMenuButton();
};

export { loadAnswersPage };
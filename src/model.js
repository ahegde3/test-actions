const data = {
  questions: [
    {
      qid: "q1",
      title: "Programmatically navigate using React router",
      text: "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.",
      tagIds: ["t1", "t2"],
      askedBy: "JoJi John",
      askDate: new Date("December 17, 2020 03:24:00"),
      ansIds: ["a1", "a2"],
      views: 10,
    },
    {
      qid: "q2",
      title:
        "android studio save string shared preference, start activity and load the saved string",
      text: "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
      tagIds: ["t3", "t4", "t2"],
      askedBy: "saltyPeter",
      askDate: new Date("January 01, 2022 21:06:12"),
      ansIds: ["a3", "a4", "a5"],
      views: 121,
    },
    {
      qid: "q3",
      title: "iOS development concurrent modification exception",
      text: "I am trying to use the same data structure for multiple threads in Swift and getting concurrent modification exception",
      tagIds: ["t5", "t6"],
      askedBy: "leo",
      askDate: new Date("January 18, 2022 00:00:00"),
      ansIds: ["a6", "a7"],
      views: 200,
    },
    {
      qid: "q4",
      title: "cross platform mobile application development",
      text: "What tool would you suggest me to use to develop apps for both android and iOS",
      tagIds: ["t3", "t4", "t5"],
      askedBy: "duke",
      askDate: new Date("March 19, 2023 00:00:00"),
      ansIds: ["a8"],
      views: 103,
    },
  ],
  tags: [
    {
      tid: "t1",
      name: "react",
    },
    {
      tid: "t2",
      name: "javascript",
    },
    {
      tid: "t3",
      name: "android-studio",
    },
    {
      tid: "t4",
      name: "shared-preferences",
    },
    {
      tid: "t5",
      name: "iOS",
    },
    {
      tid: "t6",
      name: "Swift",
    },
    {
      tid: "t7",
      name: "Flutter",
    },
  ],

  answers: [
    {
      aid: "a1",
      text: "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      ansBy: "hamkalo",
      ansDate: new Date("March 02, 2022 15:30:00"),
    },
    {
      aid: "a2",
      text: "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
      ansBy: "azad",
      ansDate: new Date("January 31, 2022 15:30:00"),
    },
    {
      aid: "a3",
      text: "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
      ansBy: "abaya",
      ansDate: new Date("April 21, 2022 15:25:22"),
    },
    {
      aid: "a4",
      text: "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
      ansBy: "alia",
      ansDate: new Date("December 02, 2022 02:20:59"),
    },
    {
      aid: "a5",
      text: "I just found all the above examples just too confusing, so I wrote my own. ",
      ansBy: "sana",
      ansDate: new Date("December 31, 2022 20:20:59"),
    },
    {
      aid: "a6",
      text: "You cannot have multiple threads modifying the same resource at the same time. ",
      ansBy: "abhi",
      ansDate: new Date("September 10, 2023 18:20:59"),
    },
    {
      aid: "a7",
      text: "Use locks for resources so that they can synchronize while multithreading. ",
      ansBy: "moon",
      ansDate: new Date("October 10, 2023 17:19:59"),
    },
    {
      aid: "a8",
      text: "Flutter would be an excellent tool to start with cross platform development. ",
      ansBy: "ihba001",
      ansDate: new Date("October 11, 2023 21:17:53"),
    },
  ],
};

export default data;

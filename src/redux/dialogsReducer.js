const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

let initialState = {
  dialogs: [
    {
      userId: 1,
      userName: "Jason Statham",
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      postDate: "27 Июл 2019"
    },
    {
      userId: 2,
      userName: "Tony Stark",
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      postDate: "25 Июл 2019"
    },
    {
      userId: 3,
      userName: "Vin Diesel",
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      postDate: "23 Июл 2019"
    }
  ],
  messages: [
    {
      userId: 1,
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit, necessitatibus ullam deserunt vitae enim? Aliquid commodi, amet beatae sit fuga blanditiis architecto modi voluptatum? Possimus eaque accusantium consequuntur reiciendis?",
      date: "12:54",
      userType: false
    },
    {
      userId: 2,
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      message: "Lorem",
      date: "12:54",
      userType: false
    },
    {
      userId: 3,
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      message: "Lorem",
      date: "12:43",
      userType: "owner"
    },
    {
      userId: 4,
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      message: "Здарова придурок!",
      date: "12:43",
      userType: "owner"
    },
    {
      userId: 5,
      avatar:
        "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
      message: "Где макет?)",
      date: "12:43",
      userType: false
    }
  ],
  newMessageText: ""
};
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        userId: 3,
        avatar:
          "https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg",
        message: state.newMessageText,
        date: "02:51",
        userType: "owner"
      };
      state.messages.push(newMessage);
      state.newMessageText = "";
      return state;
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageText = action.newText;
      return state;
    default:
      return state;
  }
};

export let sendMessageActionCreator = () => ({ type: SEND_MESSAGE });
export let updateNewMessageBodyActionCreator = text => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newText: text
});

export default dialogsReducer;

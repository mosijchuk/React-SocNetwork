import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          name: "Jason Statham",
          date: "8 July 2019",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
          likes: 7
        },
        {
          id: 2,
          name: "Jason Statham",
          date: "7 July 2019",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
          likes: 42
        },
        {
          id: 3,
          name: "Jason Statham",
          date: "6 July 2019",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
          likes: 54
        }
      ],
      newPostText: ""
    },
    dialogsPage: {
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
    },
    navbar: {
      navFriends: [
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Angel"
        },
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Nina"
        },
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Olga"
        },
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Yana"
        },
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Julia"
        },
        {
          id: 1,
          avatar: "http://cs323820.vk.me/v323820656/ae8f/BAQuccGFMIU.jpg",
          name: "Polina"
        }
      ]
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {},
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.navbar = navbarReducer(this._state.navbar, action);
    this._callSubscriber(this._state);
  }
};

export default store;

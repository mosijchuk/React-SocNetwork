const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
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
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        name: "Jason Statham",
        date: "29 July 2019",
        message: state.newPostText,
        likes: 0
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;
    default:
      return state;
  }
};

export let addPostActionCreator = () => ({ type: ADD_POST });
export let updateNewPostTextActionCreator = text => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
});

export default profileReducer;

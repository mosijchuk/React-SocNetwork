import React from "react";
import profileReducer, {
  addPostAction,
  deletePostAC
} from "./profileReducer";

let initialState = {
  posts: [{
      id: 1,
      name: "Jason Statham",
      date: "8 July 2019",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
      likes: 7
    },
    {
      id: 2,
      name: "Jason Statham",
      date: "7 July 2019",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
      likes: 42
    },
    {
      id: 3,
      name: "Jason Statham",
      date: "6 July 2019",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
      likes: 54
    }
  ]
};

it("posts length should be incremented", () => {
  let action = addPostAction('bla bla');

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(4);
})


it("posts length should be decremented", () => {
  let action = deletePostAC(2);

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(2);
})
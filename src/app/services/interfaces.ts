
export interface Chat {
  chatId: number;
  chatName: string;
  creationDate: string;
  ownerId: number;
}

export interface Person {
  userId: number;
  personId: number;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phonenumber: string;
  email: string;
}

export interface CompletePerson {
  userId: number;
  personId: number;
  firstName: string;
  lastName: string;
  birthday: string;
  phonenumber: string;
  email: string;
  username: string;
  password: string;
}

export interface Post {
  postId: number;
  chatId: number;
  userId: number;
  messageId: number;
  photourl: string;
  postDate: string;
  content: string;
  username: string;
}

// interface Reactions {
//   type: string;
//   messageId: number;
//   count: number;
// }

export interface Reactions {
  messageId: number;
  likes: number;
  dislikes: number;
}

export interface Reply {
  messageId: number;
  postId: number;
  userId: number;
  content: string;
  messageDate: string;
  username: string;
}

export interface User {
  userId: number;
  userName: string;
  personId: number;
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  birthday: string;
}
// interface NewAccount {
//   userName: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNum: number;
//   email: string;
//   birthday: string;
// }

export interface Credentials {
  userName: string;
  password: string;
}

export interface NewUser {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  birthday: string;
}

// ----------------------STATISTICS ----------------------------------------------//

export interface Hashtag {
  hashtag: string;
  countOnDay: number;
  position: number;
}

export interface PostPerDay {
  day: string;
  total: number;
}
export interface Reaction {
  reactionId: number;
  userId: number;
  postId: number;
  messageId: number;
  type: string;
  reactionDate: string;
}
export interface PostForSelect {
  postId: number;
  caption: string;
}

//Demo data
const users = [{
  id: '1',
  name: "PhiBang",
  email: "b@gmail.com",
  age: 27
}, {
  id: '2',
  name: "Loi",
  email: "l@gmail.com",
}, {
  id: '3',
  name: "Hung",
  email: "h@gmail.com"
}]

const posts = [{
    id: "10",
    title: "học bài",
    body: "hôm nay phải học bài",
    published: false,
    author: "1"
  },
  {
    id: "11",
    title: "tắm",
    body: "tắm",
    published: true,
    author: "1"
  },
  {
    id: "13",
    title: "ăn cơm",
    body: "ăn cơm",
    published: true,
    author: "2"
  }
]

 const comments = [{
  id: "1",
  text: "Hoc5 con cu",
  author: "1",
  post: "10"
}, {
  id: "2",
  text: "đi chơi đi",
  author: "2",
  post: "11"
}, {
  id: "3",
  text: "mệt mõi",
  author: "3",
  post: "11"
}, {
  id: "4",
  text: "text",
  author: "1",
  post: "13"
  }]


const db = {
  users,
  comments,
  posts
}

export {db as default}
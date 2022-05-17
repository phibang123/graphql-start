import { gql } from 'apollo-boost';

const createUser = gql`
  mutation ($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
const getUser = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation ($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

const myPost = gql`
  query {
    myPosts {
      id
      title
      body
      published
    }
  }
`;



const createPost = gql`
    mutation($data: CreatePostInput!) {
      createPost(data: $data){
          id
          title
          body
          published
      }
    }
  `;

const updatePost = gql`
mutation($id: ID!, $data: UpdatePostInput!){ 
 updatePost(
   id: $id
   data: $data
 ){
   id
   title
   body
   published
 }
}
`;

const deletePost = gql`
mutation ($data: ID!) {
    deletePost(id: $data){
     id
  }
}
`;
// variable cũng như nhập vào paramerter trong mutation,
// hướng dẫn ở trên

export { createUser, getProfile, login, getUser, getPosts, myPost ,updatePost , createPost, deletePost};

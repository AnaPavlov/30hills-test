import createUserCard from "./helper.js";

const usersDiv = document.querySelector(".users");

fetch("../data.json")
  .then(res => res.json())
  .then(res => displayUsers(res));

function displayUsers(users) {
  if (users) {
    users.forEach(user => {
      createUserCard(user, usersDiv);
    });
  }
}

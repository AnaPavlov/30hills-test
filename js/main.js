import createUserCard from "./helper.js";

const usersDiv = document.querySelector(".users");

fetch("https://raw.githubusercontent.com/AnaPavlov/30hills-test/master/data.json")
  .then(res => res.json())
  .then(res => displayUsers(res));

function displayUsers(users) {
  if (users) {
    users.forEach(user => {
      createUserCard(user, usersDiv);
    });
  }
}

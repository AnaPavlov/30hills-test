import createUserCard from "./helper.js";

const usersDiv = document.querySelectorAll('.users') 

let allUsers, currentUser;
fetch("https://raw.githubusercontent.com/AnaPavlov/30hills-test/gh-pages/data.json")
  .then(res => res.json())
  .then(res => getCurrentUser(res));

const params = window.location.search.split("&");
const id = Number(params[0].split("=")[1]);
const imgNum = params[1].split("=")[1];

const imgDiv = document.querySelector(".user-img")
const infoDiv = document.querySelector(".user-info")
let friendsOfFriends = [], suggestedFriends = []

function getCurrentUser(users) {
  allUsers = users;
  allUsers.forEach(user => {
    if ((user.id === id)) {
      currentUser = user;
      displayUserInfo(currentUser);
      findConnections(user.id, currentUser.friends)
    }
  });
}

function displayUserInfo(user) {
  let name = document.createElement("p")
  let age = document.createElement("p")
  let gender= document.createElement("p")
  let img = document.createElement("img")
  img.src = `https://github.com/AnaPavlov/30hills-test/blob/gh-pages/img/${user.gender}${imgNum}.png`
  name.innerHTML = "Name: " + user.firstName + " " + user.surname
  age.innerHTML = user.age ? ("Age: " + user.age) : ''
  gender.innerHTML = "Gender: " + user.gender
  imgDiv.appendChild(img)
  infoDiv.appendChild(name)
  infoDiv.appendChild(age)
  infoDiv.appendChild(gender)
}

function findConnections(userId, friends) {
    friends.forEach(friend => {
        allUsers.forEach(user => {
            if(user.id === friend) {
                friendsOfFriends.push(...user.friends)
                friendsOfFriends = friendsOfFriends.filter(person => {
                    return (person != userId  && person != friend)
                })
            }
        })
    })
        let valuesSoFar = [];
        for (var i = 0; i < friendsOfFriends.length; ++i) {
            var value = friendsOfFriends[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                suggestedFriends.push(value)
            } else {
            valuesSoFar.push(value);
            }
        }
        displayFriends(friends)
        displayFoF(valuesSoFar)
        if (suggestedFriends.length > 0) {
          displaySuggestedFriends(suggestedFriends)
        } 
    }

function displaySuggestedFriends(persons) {
  let p = document.createElement('p')
  p.innerHTML = 'Suggested'
  p.className = 'user-type'
  document.querySelector('.suggested-friends').prepend(p)
  persons.forEach(person => {
    allUsers.forEach(user => {
      if (person == user.id) {
        createUserCard(user, usersDiv[0])
    }
  })
})
}

function displayFriends(persons) {
  persons.forEach(person => {
    allUsers.forEach(user => {
      if (person == user.id) {
        createUserCard(user, usersDiv[1])
    }
  })
})
}

function displayFoF(persons) {
  persons.forEach(person => {
    allUsers.forEach(user => {
      if (person == user.id) {
        createUserCard(user, usersDiv[2])
    }
  })
})
}




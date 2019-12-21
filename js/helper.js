 export default function createUserCard(user, usersDiv) {
    let div = document.createElement('div')
        div.id = user.id
        div.className = 'userCard'
        let name = document.createElement('p')
        let img = document.createElement('img')
        let randomNum = Math.floor(Math.random() * 6)
        img.src = (`https://github.com/AnaPavlov/30hills-test/blob/gh-pages/img/${user.gender}${randomNum}.png`)
        name.innerHTML = user.firstName + ' ' + user.surname
        div.addEventListener('click', () => {
            displayUserPage(user.id, randomNum)
        })
        div.appendChild(img)
        div.appendChild(name)
        usersDiv.appendChild(div)
}

function displayUserPage(id, randomNum) {
    window.location.href = `userpage.html?id=${id}&img=${randomNum}`
}

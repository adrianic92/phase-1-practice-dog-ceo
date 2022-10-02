const dogContainer = document.getElementById("dog-image-container")
const breedList = document.getElementById("dog-breeds")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const select = document.getElementById("breed-dropdown")
let dogImages
let dogBreeds

select.addEventListener("change", changer)

fetch(imgUrl)
.then(resp => resp.json())
.then(data => {
    dogImages = data.message
    renderDogs(dogImages)
})

function renderDogs(dogImages) {
    dogImages.forEach(dog => {
        const img = document.createElement("img")
        img.src = dog
        img.style.width = "25%"
        dogContainer.append(img)
    })
}

fetch(breedUrl)
.then(resp => resp.json())
.then(data => {
    dogBreeds = Object.keys(data.message)
    renderBreeds(dogBreeds)
})

function renderBreeds(dogBreeds) {
    dogBreeds.forEach(dog => {
        const li = document.createElement("li")
        li.innerText = dog
        li.id = dog
        li.addEventListener("click", () => {
            li.style.color = "blue"
            li.style.fontSize = "2rem"
        })
        breedList.append(li)
    })
}

function changer(e) {
    const letter = e.target.value
    const dogLetterList = dogBreeds.filter(dog => dog.startsWith(letter))
    breedList.innerHTML = ""
    renderBreeds(dogLetterList)
}
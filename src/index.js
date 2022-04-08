let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm();
  getToys();
  newToyForm();
});

const newToyForm = () => {
  // get form
const toyForm = document.querySelector('.add-toy-form');

// add event listener for submit
toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get values from form -- either e.target.quereySelector('') and choose or e.target.name.value -- use name property on html thats on form
  // console.log(e.target.name.value) // checking to see if we pull buzz, create new variable
  const newToyName = e.target.name.value;
  // console.log(e.target.image.value);
  const newImageName = e.target.image.value;

  // since we already have a function that renders toys by taking in an object

  const newToyObj = {
    name: newToyName,
    image: newImageName,
    likes: 0
  }
  renderToy(newToyObj); // this lets me not write any repeating code-- is it DRY (Do NOT repeat yourself)

})

  //get the info from the form 

  // get the toy

}

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())  // implicitly returned (arrow function)
  .then(toys => toys.forEach(toy => renderToy(toy))) 
}

const renderToy = (toy) => {
  // for each div with the class "card"
    const toyCard = document.createElement('div');
    toyCard.className = "card"
  // h2 child of div, div child of toy collection   

    const toyName = document.createElement('h2');
    toyName.innerText = toy.name; //toy is the object, name is the key -- as long as toy name going on DOM good

    const toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.className = 'toy-avatar';

    const toyLikes = document.createElement('p');
    toyLikes.innerText = `${toy.likes} Likes`;

    const likeBtn = document.createElement('button');
    likeBtn.innerText = `Like ❤️`;
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;

    // add event listener for buttons a part of the for each 
    // likes and buttons are siblings--- previous sibling givs back a string that we can split 

    likeBtn.addEventListener('click', (e) => {
      const currentLikeString = e.target.previousSibling.innerText;
      const actualLikes = currentLikeString.split(" ")[0];
      
      e.target.previousSibling.innerText = `${parseInt(actualLikes) + 1} Likes`;

    })

    toyCard.append(toyName, toyImage, toyLikes, likeBtn);

    // append that div toycollection
    // get the collection div
    const toyCollection = document.querySelector('#toy-collection');
    // append it
    toyCollection.append(toyCard);
}

// h2 child of div, div child of toy collection 
const toggleForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}


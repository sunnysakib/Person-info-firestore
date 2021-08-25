const list = document.querySelector("#person-list");
const form = document.querySelector("#add-person-form");


// RENDER DATA
let personRender = (doc) => {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let address = document.createElement("span");
  let cross = document.createElement("div")
  
  li.setAttribute("data-id", doc.id);
  
  name.textContent = doc.data().name;
  address.textContent = doc.data().address;
  cross.textContent = "x";
  
  li.appendChild(name);
  li.appendChild(address);
  list.appendChild(li);
  li.appendChild(cross);


  

};

// getting data
db.collection("persons")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
      personRender(doc);
    });
  });

  // ADD DATA
form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("persons").add({
    name: form.name.value,
    address: form.address.value
  })
  form.name.value = '';
  form.address.value = '';
})
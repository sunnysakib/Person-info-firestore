const list = document.querySelector("#person-list");
const form = document.querySelector("#add-person-form");

// RENDER DATA
let personRender = (doc) => {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let address = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);

  name.textContent = doc.data().name;
  address.textContent = doc.data().address;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(address);
  list.appendChild(li);
  li.appendChild(cross);

 
  // DELETING DATA
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("persons").doc(id).delete();
  });
};


// Realtime data add and delete
db.collection("persons").orderBy("name").onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      personRender(change.doc);
  }
  if (change.type === "removed") {
      let li = list.querySelector("[data-id ="+ change.doc.id + "]");
      list.removeChild(li);
  }
  })
 
})


// ADD DATA
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(form.name.value != "" && form.address.value != ""){
    db.collection("persons").add({
      name: form.name.value,
      address: form.address.value,
    });
  }else{
    alert("Please Enter input value")
  }
  
  form.name.value = "";
  form.address.value = "";
});


var nameInput = document.getElementById("name");
var handleInput = document.getElementById("handle");
var addBtn = document.getElementById("add");

if (localStorage.getItem("change")) {
    let contact = JSON.parse(localStorage.getItem("person"));
    nameInput.value = contact.name;
    handleInput.value = contact.handle;
    addBtn.innerText = "UPDATE CONTACT";
    document.title = "Update contact";
} else {
    addBtn.innerText = "ADD CONTACT";
    document.title = "Add contact";
}


function add() {
    if (nameInput.value != "" && handleInput.value != "") {
        let newContact = {
            name: nameInput.value,
            handle: handleInput.value,
        };
        localStorage.setItem("person",JSON.stringify(newContact));
        window.location.href = "index.html";
    } else {
        window.alert("Please provide name and handle.")
    }
}

addBtn.onclick = add;
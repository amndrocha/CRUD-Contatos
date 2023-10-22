//localStorage.clear();

var data;

if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
} else {
    data = [{
        name: "Ana Britto",
        handle: "ana_britto",
    },
    {
        name: "Ricardo Costa",
        handle: "ricardocosta",
    },
    {
        name: "Tiago Montana",
        handle: "tiagomontana",
    }];

    localStorage.setItem("data", JSON.stringify(data));
}

var ul = document.getElementById("contact-list");
var liArray = document.querySelectorAll("li");

function createContact(name,handle) {
    let contact, edit, cancel, li, i;
    li = document.createElement('li');

    contact = document.createElement('div');
    contact.innerHTML = name + '<br/>' + handle;
    contact.className = "nameBox";
    li.appendChild(contact);

    edit = document.createElement('img');
    edit.className = "edit";
    edit.src = "icons/edit.svg";
    li.appendChild(edit);

    cancel = document.createElement('img');
    cancel.className = "cancel";
    cancel.src = "icons/cancel.svg";
    li.appendChild(cancel);

    ul.appendChild(li);

    i = liArray.length;

    cancel.onclick = function() {
        liArray[i].remove();
        data.splice(i,1);
        localStorage.setItem("data", JSON.stringify(data));
        location.reload();
    };

    edit.onclick = function() {
        let person = {
            name: name,
            handle: handle,
        }
        localStorage.setItem("person", JSON.stringify(person));
        localStorage.setItem("change", JSON.stringify(i));
        window.location.href = 'createcontact.html';
    };
}

if (localStorage.getItem("person")) {
    let contact = JSON.parse(localStorage.getItem("person"));
    if (localStorage.getItem("change")) {
        let i = JSON.parse(localStorage.getItem("change"));
        data [i] = {
            name: contact.name,
            handle: contact.handle,
        };
        localStorage.removeItem("change");
    } else {
        data.push({
        name: contact.name,
        handle: contact.handle,
    });
    }
    localStorage.removeItem("person");
    localStorage.setItem("data", JSON.stringify(data));
}

var input = document.getElementById("search-input");

function searchContact() {
    for (let i = 0; i < liArray.length; i++) {
        let name = data[i].name.toUpperCase();
        let handle = data[i].handle.toUpperCase();
        let keyword = input.value.toUpperCase();
        if (name.includes(keyword) || handle.includes(keyword)) {
            liArray[i].style.display = "flex";
        } else {
            liArray[i].style.display = "none";
        }
    }
}

var temp;

input.onfocus = function() {
    temp = setInterval(searchContact, 200);
}
input.onblur = function() {
    clearInterval(temp);
}

data.forEach((person) => {
    createContact(person.name,person.handle);
    liArray = document.querySelectorAll("li");
})
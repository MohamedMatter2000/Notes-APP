let Addbox = document.querySelector(".notes");
let popup = document.querySelector(".pop");
let popupbox = document.querySelector(".pop-box");
let popuppargr = document.querySelector(".head p");
let deletShow = document.querySelector(".head i");
let container = document.querySelector(".container");
let addbtn = document.querySelector("form button");
let title = document.querySelector("#title");
let Description = document.querySelector("#Description");
let notes = JSON.parse(localStorage.getItem("notes") || []);
let isUpdate = false,
  updateId;
let data = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

Addbox.addEventListener("click", showpopup);
deletShow.addEventListener("click", Hidepopup);

function shownotes() {
  document.querySelectorAll(".card").forEach((e) => e.remove());

  notes.forEach((note, index) => {
    let litag = `
    <div class="card">
      <div class="content">
        <h2>${note.title}</h2>
        <p>${note.Description}</p>
      </div>
      <div class="Settings">
        <span class="data">${note.data}</span>
        <div class="change">
          <i onclick="showicon(this)" class="fa-solid fa-ellipsis"></i>
          <div class="edit-remove">
            <div class="Edit"
              data-id="${index}"
              data-title="${note.title.replace(/"/g, "&quot;")}"
              data-desc="${note.Description.replace(/"/g, "&quot;")}"
              onclick="handleEdit(this)">
              <i class="fa-solid fa-pen"></i> edit
            </div>
            <div class="Delete" onclick="deletenotes(${index})">
              <i class="fa-solid fa-trash"></i> delete
            </div>
          </div>
        </div>
      </div>
    </div>`;
    Addbox.insertAdjacentHTML("afterend", litag);
  });
}
shownotes();

function showpopup() {
  title.focus();
  popup.classList.add("show");
  popupbox.classList.add("show");
}

function Hidepopup() {
  isUpdate = false;
  title.value = "";
  Description.value = "";
  addbtn.innerHTML = "Add Note";
  popuppargr.innerHTML = "Add a new Note";
  popup.classList.remove("show");
  popupbox.classList.remove("show");
}

function showicon(el) {
  el.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function deletenotes(noteid) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteid, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  shownotes();
}

function handleEdit(el) {
  const id = el.getAttribute("data-id");
  const titleVal = el.getAttribute("data-title");
  const descVal = el.getAttribute("data-desc");
  updatenotes(id, titleVal, descVal);
}

function updatenotes(noteid, tite, desc) {
  isUpdate = true;
  updateId = noteid;
  title.value = tite;
  Description.value = desc;
  addbtn.innerHTML = "Update Note";
  popuppargr.innerHTML = "Update a Note";
  Addbox.click();
}

addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let notetitle = title.value;
  let notedesc = Description.value;
  if (notedesc || notetitle) {
    let data = new Date(),
      month = months[data.getMonth()],
      day = data.getDate(),
      year = data.getFullYear();
    let noteInfo = {
      title: notetitle,
      Description: notedesc,
      data: `${month}, ${day} ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    Hidepopup();
    shownotes();
  }
});

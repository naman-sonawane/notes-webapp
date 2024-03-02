function popup() {
    const popupBox = document.createElement("div")
    popupBox.innerHTML = `
    <div id="popupBox">
        <h1 id="headerTitle">Create a new note</h1>
        <textarea id="note-text" placeholder="Start typing..."></textarea>
    </div>
    
    <div id="btn-container">
        <button id="submitBtn" onclick="createNote()">✔️</button>
        <button id="closeBtn" onclick="closePopup()">❌</button>
    </div>
    `
    document.body.appendChild(popupBox)
}

function createNote () {
    const popupBox = document.getElementById("popupBox")
    const noteText = document.getElementById("note-text").value
    const submitB = document.getElementById("submitBtn")
    const closeB = document.getElementById("closeBtn")

    if (noteText.trim() !== '') {
        const note = {id: new Date().getTime(), text: noteText}
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        existingNotes.push(note)
        localStorage.setItem('notes', JSON.stringify(existingNotes))
        document.getElementById("note-text").value = ''
        popupBox.remove()
        submitB.remove()
        closeB.remove()

        displayNotes()
    }
}

function displayNotes () {
    const notesList = document.getElementById("notes-list")
    notesList.innerHTML = ""

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {
        const listItem = document.createElement("li")
        listItem.innerHTML=`
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
        notesList.appendChild(listItem)
    })
}

function editNote(noteID) {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    const noteBeingEdited = notes.find(note => note.id == noteID)
    const noteText = noteBeingEdited ? noteBeingEdited.text : ''
    const editingBox = document.createElement("div")

    editingBox.innerHTML = `
    <div id="editing-box" data-note-id=${noteID}>
        <h1>Edit Note</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="submitBtn" onclick="updateNote()">Done</div>
        <div id="closeBtn" onclick="closePopup()">Cancel</div>
    </div>
    `
    document.body.appendChild(editingBox)
}

function closePopup() {
    const popup = document.getElementById("popupBox")
    const buttons = document.getElementById("btn-container")
    const box = document.getElementById("editing-box")
    box.close()
    popup.remove()
    buttons.remove()
}

function updateNote () {
    const noteText = document.getElementById("note-text").value.trim()
    const editingBox = document.getElementById("editing-box")

    if (noteText !== '') {
        const noteID = editingBox.getAttribute("data-note-id")
        let notes = JSON.parse(localStorage.getItem("notes")) || []

        const updatedNotes = notes.map(note => {
            if (note.id == noteID) {
                return {id: note.id, text:noteText}
            }
            return note
        })

        localStorage.setItem("notes", JSON.stringify(updatedNotes))
        editingBox.remove()
        displayNotes()
    }
}

function deleteNote (noteID) {
    let notes = JSON.parse(localStorage.getItem("notes")) || []
    notes = notes.filter(note => note.id !== noteID)

    localStorage.setItem("notes", JSON.stringify(notes))
    displayNotes()
}

displayNotes()
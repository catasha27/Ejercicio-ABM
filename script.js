const $ = (selector) => document.querySelector(selector)

let shoppingList = []
let currentEditId = 0

const addItem = () => {
    const item = $("#item-entry").value.toUpperCase()
    shoppingList.push(item)
    $("#entry-form").reset()
}

const renderList = () => {
    $("#list").innerHTML = ""
    shoppingList.forEach((item, index) => {
        $("#list").innerHTML += `
        <li>
            <span>${item}</span>
            <button id="btn-edit-${index}">
                <i class="fa-solid fa-pen" aria-hidden="true"></i>
            </button>
            <button id="btn-delete-${index}">
                <i class="fa-solid fa-trash" aria-hidden="true"></i>
            </button>
        </li>`
    })
    shoppingList.forEach((item, index) => {
        $(`#btn-edit-${index}`).addEventListener("click", (e) => {
            e.preventDefault()
            $("#modal-edit-container").classList.remove("hidden")
            $("#edit-item").value = item
            currentEditId = index
        })
                
        $(`#btn-delete-${index}`).addEventListener("click", (e) => {
            e.preventDefault()
            deleteItem(index)
            renderList()
        })
    })
}

const editItem = () => {
    shoppingList[currentEditId] = $("#edit-item").value.toUpperCase()
    renderList()
}

$("#edit-modal-btn").addEventListener("click", (e) => {
    e.preventDefault()
    $("#modal-edit-container").classList.add("hidden")
    editItem()
})

const deleteItem = (index) => {
    shoppingList.splice(index, 1)
}

$("#btn-add-item").addEventListener("click", (e) => {
    e.preventDefault()
    addItem()
    renderList()
})


// SET LIGHT MODE

$("#btn-light-mode").addEventListener("click", () => {
    $("#btn-dark-mode").classList.remove("hidden")
    $("#btn-light-mode").classList.add("hidden")
    $("body").setAttribute("data-theme", "light-theme")
})

// SET DARK MODE

$("#btn-dark-mode").addEventListener("click", () => {
    $("#btn-dark-mode").classList.add("hidden")
    $("#btn-light-mode").classList.remove("hidden")
    $("body").removeAttribute("data-theme", "light-theme")
})
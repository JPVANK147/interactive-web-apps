
import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js"

const range = [0, 36]
const matches = books
let page = 1

if (!books || !Array.isArray(books)) throw new Error('Source required')
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

/**
 * This code show the preview of every book - image, title and author
 */
//This code loads the books into the grid and if you click on a item in the grid it brings up the preview overlay
function createPreview({ author, id, image, title }) {
    const preview = document.createElement("button")
    preview.classList.add("preview")
    preview.setAttribute("data-preview", id)

    //The innerHTML content for the preview list of books
    preview.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `
    // AddEventListener to open the preview books
    preview.addEventListener("click", () => {
        const active = books.find((book) => book.id === id)
        if (!active) return

        const overlay = document.querySelector('[data-list-active]')
        const overlayBlur = document.querySelector('[data-list-blur]')
        const overlayImage = document.querySelector('[data-list-image]')
        const overlayTitle = document.querySelector('[data-list-title]')
        const overlaySubtitle = document.querySelector('[data-list-subtitle]')
        const overlayDescription = document.querySelector("[data-list-description]")
        const closeButton = document.querySelector("[data-list-close]")

        // Update overlay content
        overlayBlur.src = active.image
        overlayImage.src = active.image
        overlayTitle.textContent = active.title
        overlaySubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        overlayDescription.textContent = active.description

        // Display the overlay
        overlay.open = true

        // Close button
        closeButton.addEventListener("click", () => {
            overlay.open = false
        })
    })

    return preview
}

const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

// Create the Preview of Author, Id, image, title
for (const { author, image, title, id } of extracted) {
    const preview = createPreview({
        author,
        id,
        image,
        title,
    })

    fragment.appendChild(preview)
}

document.querySelector('[data-list-items]').appendChild(fragment)

/**
 * This code show the 'Show More' Button
 */
//This code give the 'Show more' Button that it wil load the page with more preview of the books
const dataListItem = document.querySelector('[data-list-items]')
const dataListButton = document.querySelector('[data-list-button]')

//Button - 'Show More'
const dataListButtonRemaining = matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0
dataListButton.innerHTML = /* html */
    `<span>Show more</span>
     <span class="list__remaining">(${dataListButtonRemaining})</span>`

//EventListener that show more books when you click on the Button(show more)
dataListButton.addEventListener('click', () => {
    const startIndex = page * BOOKS_PER_PAGE
    const endIndex = startIndex + BOOKS_PER_PAGE
    const extracted = matches.slice(startIndex, endIndex)

    const fragment = document.createDocumentFragment()

    for (const { author, image, title, id } of extracted) {
        const preview = createPreview({
            author,
            id,
            image,
            title
        });

        fragment.appendChild(preview)
    }

    dataListItem.appendChild(fragment)
    page++

    const remaining = matches.length - page * BOOKS_PER_PAGE
    dataListButton.disabled = remaining <= 0

    dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

/**
 * Setting Overlay to change the theme to light and Dark
 */
// Open the Setting overlay when the setting button is clicked
const dataHeaderSettings = document.querySelector('[data-header-settings]')
dataHeaderSettings.addEventListener('click', () => {
    dataSettingsOverlay.open = true
})

// Close the Setting overlay when the cancel button is clicked
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
dataSettingsCancel.addEventListener('click', () => {
    dataSettingsOverlay.open = false
})

// Apply the selected theme and close the overlay when the save button is clicked
const dataSettingsForm = document.querySelector('[data-settings-form]')
dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    applyTheme(result.theme)

    dataSettingsOverlay.open = false
})

// This Code handles the form submission within the overlay
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
dataSettingsOverlay.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    applyTheme(result.theme)

    dataSettingsOverlay.open = false
})

// This is the colour of dark and light
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

// This Code initial the theme setup based on Night and Day meaning Dark and Light theme
function applyTheme(theme) {
    const css = theme === 'night' ? night : day

    document.documentElement.style.setProperty('--color-dark', css.dark)
    document.documentElement.style.setProperty('--color-light', css.light)
}

/**
 * This Code show the Search Overlay to search for a specific author, title and genre
 */
//This code is open the search overlay
const dataSearchTitle = document.querySelector('[data-search-title]')

const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataHeaderSearch = document.querySelector('[data-header-search]')

dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.open = true
    dataSearchTitle.focus()
})

//This piece of code add the All Genres option in the search overlay
const dataSearchGenres = document.querySelector('[data-search-genres]')

const allGenresOption = document.createElement('option')
allGenresOption.value = 'all'
allGenresOption.textContent = 'All Genres'
dataSearchGenres.appendChild(allGenresOption)

for (const [genreId, genreName] of Object.entries(genres)) {
    const option = document.createElement('option')
    option.value = genreId
    option.textContent = genreName
    dataSearchGenres.appendChild(option)
}

//This piece of code add the All Author option in the search overlay
const dataSearchAuthors = document.querySelector('[data-search-authors]')

const allAuthorsOption = document.createElement('option')
allAuthorsOption.value = 'all'
allAuthorsOption.textContent = 'All Authors'
dataSearchAuthors.appendChild(allAuthorsOption)

for (const [authorId, authorName] of Object.entries(authors)) {
    const option = document.createElement('option')
    option.value = authorId
    option.textContent = authorName
    dataSearchAuthors.appendChild(option)
}

// This code let the search button work accordingly to the search you want
const dataSearchForm = document.querySelector('[data-search-form]')
dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(dataSearchForm)
    const title = formData.get('title')
    const genre = formData.get('genre')
    const author = formData.get('author')

    const filteredResults = filterResults(title, genre, author)

    updateList(filteredResults)

    dataSearchForm.reset()

    dataSearchOverlay.open = false
})

// This code give the Filter Results of the book 
function filterResults(title, genre, author) {
    const filteredResults = []

    for (const book of books) {
        const titleMatch = title === '' || book.title.toLowerCase().includes(title.toLowerCase())
        const genreMatch = genre === 'all' || book.genres.includes(genre)
        const authorMatch = author === 'all' || book.author === author

        if (titleMatch && genreMatch && authorMatch) {
            filteredResults.push(book)
        }
    }

    return filteredResults
}

// This Function is to update the list of preview that you select in the search overlay
function updateList(filteredResults) {
    const dataListItems = document.querySelector('[data-list-items]')
    const dataListMessage = document.querySelector('[data-list-message]')
    
    dataListItems.innerHTML = ''

    if (filteredResults.length > 0) {
        for (const book of filteredResults) {
            const listItem = createPreview(book)
            dataListItems.appendChild(listItem)
        }
        dataListMessage.style.display = 'none'

        const dataListButton = document.querySelector('[data-list-button]')
        dataListButton.disabled = true
        dataListButton.innerHTML = '<span>Show More (0)</span>'        
    } else {
        dataListMessage.style.display = 'block'

        const dataListButton = document.querySelector('[data-list-button]')
        dataListButton.disabled = true
        dataListButton.innerHTML = '<span>Show More (0)</span>'
    }
}

//this Code let you go out of the search overlay by means of the cancel button
const dataSearchCancel = document.querySelector('[data-search-cancel]')
dataSearchCancel.addEventListener('click', () => {
    dataSearchOverlay.open = false
})

/*
const genres = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

dataSearchGenres.appendChild(genres)

const authors = document.createDocumentFragment(element)
const element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option')
    element.value = id
    element.innerText = name
    authors.appendChild(element)
}

dataSearchAuthors.appendChild(authors)

const dataSearchCancel = document.querySelector('[data-search-cancel]')

dataSearchCancel.addEventListener('click', () => {
     data-search-overlay.open === false 
})

const dataSettingscancel = document.querySelector('[data-setting-overlay]')

dataSettingscancel.addEventListener('click', () => {
    data-settings-overlay.open === false 
})

const dataSettingsform = document.querySelector('[data-setting-form]')

dataSettingsform.addEventListener('submit', () => {
    actions.settings.submit
})

dataSettingsform.addEventListener('submit', () => {
    actions.settings.submit
})

dataSettingsform.addEventListener('click', () => {
    data-list-active.open === false
})


dataHeaderSearch.addEventListener('click', () => {
    data-search-overlay.open === true;
    data-search-title.focus();
})


data-search-form.addEventListener('click', (event) => {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true } }
        }
    }

    if titleMatch && authorMatch && genreMatch => result.push(book)
})

if (window.scrollTo({ top: 0, behavior: 'smooth' })) {
    data-search-overlay.open = false
    }


/*

if (!books && !Array.isArray(books)) throw new Error('Source required')
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

//this is the search tab
const genres = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}

dataSearchGenres.appendChild(genres)

const authors = document.createDocumentFragment(element)
const element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option')
    element.value = id
    element.innerText = name
    authors.appendChild(element)
}

dataSearchAuthors.appendChild(authors)

dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

const dataSearchCancel = document.querySelector('[data-search-cancel]')

dataSearchCancel.addEventListener('click', () => {
     data-search-overlay.open === false 
})

const dataSettingscancel = document.querySelector('[data-setting-overlay]')

dataSettingscancel.addEventListener('click', () => {
    data-settings-overlay.open === false 
})

const dataSettingsform = document.querySelector('[data-setting-form]')

dataSettingsform.addEventListener('submit', () => {
    actions.settings.submit
})

dataSettingsform.addEventListener('submit', () => {
    actions.settings.submit
})

dataSettingsform.addEventListener('click', () => {
    data-list-active.open === false
})

const datalistitem = document.querySelector('[data-list-items]')


dataListbutton.addEventListener('click', () => {
    datalistitem.appendChild(createPreviewsFragment(matches, page * `${BOOKS_PER_PAGE}`, {`${page}` + 1} x `${BOOKS_PER_PAGE}`))
    actions.list.updateRemaining()
    page = page + 1
    })

dataHeaderSearch.addEventListener('click', () => {
    data-search-overlay.open === true;
    data-search-title.focus();
})


data-search-form.addEventListener('click', (event) => {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true } }
        }
    }

    if titleMatch && authorMatch && genreMatch => result.push(book)
})

if (display.length < 1) {
    data-list-message.class.add('list__message_show')
} else {
    data-list-message.class.remove('list__message_show')
}

data-list-items.innerHTML = ''

const fragment = document.createDocumentFragment()
const extracted = source.slice(range[0], range[1])

for ({ author, image, title, id }; extracted; i++) {
    const { author: authorId, id, image, title } = props

    element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = /* html */ /*
`<img
class="preview__image"
src="${image}"
/>
 
<div class="preview__info">
<h3 class="preview__title">${title}</h3>
<div class="preview__author">${authors[authorId]}</div>
</div>`

fragment.appendChild(element)
}

data-list-items.appendChild(fragments)

initial === matches.length - [page * BOOKS_PER_PAGE]
remaining === hasRemaining ? initial : 0
data-list-button.disabled = initial > 0


if (window.scrollTo({ top: 0, behavior: 'smooth' })) {
data-search-overlay.open = false
}



data-list-items.addEventListener('click', (event) => {
pathArray = Array.from(event.path || event.composedPath())
active;

for (node; pathArray; i++) {
if (active) break;
const previewId = node?.dataset?.preview

for (const singleBook of books) {
    if (singleBook.id === id) active = singleBook
}
}

if (!active) return
data-list-active.open === true
data-list-blur + data-list-image === active.image
data-list-title === active.title

data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
data-list-description === active.description
}) */

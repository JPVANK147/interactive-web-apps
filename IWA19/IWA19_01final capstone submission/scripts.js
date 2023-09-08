
import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js"

const range = [0, 36]
const matches = books
let page = 1

if (!books || !Array.isArray(books)) throw new Error('Source required')
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

/**
 * This code show the preview list of every book - image, title and author
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

        // Update the overlay content
        overlayBlur.src = active.image
        overlayImage.src = active.image
        overlayTitle.textContent = active.title
        overlaySubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        overlayDescription.textContent = active.description

        // Display the overlay preview
        overlay.open = true

        // Using a EventListener click to Close button for the preview
        closeButton.addEventListener("click", () => {
            overlay.open = false
        })
    })

    return preview
}

// // Document fragment is a lightweight container for holding multiple DOM elements
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
 * This code give the 'Show more' Button that it wil load the page with more preview of the books
 */
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

    // Document fragment is a lightweight container for holding multiple DOM elements
    const fragment = document.createDocumentFragment()

    // This loop iterates over each book object in the array. Each book, it destructures the properties of author, image, title and id and used to create a book preview
    for (const { author, image, title, id } of extracted) {
        const preview = createPreview({
            author,
            id,
            image,
            title
        });

        fragment.appendChild(preview)
    }

    // This adds the new books to the existing list of books on the page
    dataListItem.appendChild(fragment)

    page++

    // These lines update the "Show more" button based on the remaining number of books to display
    const remaining = matches.length - page * BOOKS_PER_PAGE
    dataListButton.disabled = remaining <= 0

    dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `
    // This line scrolls the page to the top using a smooth scrolling animation
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
    // This code can handle the form submission without leaving or refreshing the page
    event.preventDefault()

    // Collects all the form input field values as key-value pairs using the form element that triggered the 'submit' event
    const formData = new FormData(event.target)

    // This object will contain all the form field values, with field names as keys and the user-entered values as values
    const result = Object.fromEntries(formData) 
    
    // Applying a Theme using the result object
    applyTheme(result.theme)
    
    // Closing the Setting Overlay
    dataSettingsOverlay.open = false
})


const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
dataSettingsOverlay.addEventListener('submit', (event) => {
    // This code can handle the form submission without leaving or refreshing the page
    event.preventDefault()

    // Collects all the form input field values as key-value pairs using thethe form element that triggered the 'submit' event
    const formData = new FormData(event.target) 
    
    // This object will contain all the form field values, with field names as keys and the user-entered values as values
    const result = Object.fromEntries(formData) 
    
    //Applying a Theme using the result object
    applyTheme(result.theme)

    // Closing the Setting Overlay
    dataSettingsOverlay.open = false
})

// This is the theme colour of dark and light
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
const dataSearchTitle = document.querySelector('[data-search-title]')

const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataHeaderSearch = document.querySelector('[data-header-search]')

// Open the Search Overlay
dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.open = true
    dataSearchTitle.focus()
})

// This piece of code add the All Genres option in the search overlay
const dataSearchGenres = document.querySelector('[data-search-genres]')

// Creating the All Genres Option
const allGenresOption = document.createElement('option')
allGenresOption.value = 'all'
allGenresOption.textContent = 'All Genres'

// This line appends the newly created "All Genres" option to the <select> element
dataSearchGenres.appendChild(allGenresOption)

for (const [genreId, genreName] of Object.entries(genres)) {
    // Creating Genre Options
    const option = document.createElement('option')
    option.value = genreId
    option.textContent = genreName
    // This adds all the genre options to the dropdown list below the "All Genres" option
    dataSearchGenres.appendChild(option)
}

//This piece of code add the All Author option in the search overlay
const dataSearchAuthors = document.querySelector('[data-search-authors]')

// Creating the "All Author" Option
const allAuthorsOption = document.createElement('option')
allAuthorsOption.value = 'all'
allAuthorsOption.textContent = 'All Authors'

// This line appends the newly created "All Author" option to the <select> element
dataSearchAuthors.appendChild(allAuthorsOption)

for (const [authorId, authorName] of Object.entries(authors)) {
    // Creating Author Options
    const option = document.createElement('option')
    option.value = authorId
    option.textContent = authorName
    // This adds all the genre options to the dropdown list below the "All Author" option
    dataSearchAuthors.appendChild(option)
}

// This code let the search button work accordingly to the search you want
const dataSearchForm = document.querySelector('[data-search-form]')
dataSearchForm.addEventListener('submit', (event) => {
    // This code can handle the form submission using JavaScript without leaving or refreshing the page
    event.preventDefault()
    
    // Extracting Form Data into specific form field values using get. It extracts the values for the title, genre, and author fields from the form.
    const formData = new FormData(dataSearchForm)
    const title = formData.get('title')
    const genre = formData.get('genre')
    const author = formData.get('author')
    
    // Filter the Results
    const filteredResults = filterResults(title, genre, author)
    
    //Update the Results
    updateList(filteredResults)
    
    //Resetting the Form - the code resets the form to clear any previously entered search criteria
    dataSearchForm.reset()
    
    // Closing the Searcg Overlay
    dataSearchOverlay.open = false
})

// This code give the Filter Results of the book 
function filterResults(title, genre, author) {
    const filteredResults = [] // This array will be used to store the books that match the user's search criteria

    for (const book of books) {
        const titleMatch = title === '' || book.title.toLowerCase().includes(title.toLowerCase())
        const genreMatch = genre === 'all' || book.genres.includes(genre)
        const authorMatch = author === 'all' || book.author === author

        if (titleMatch && genreMatch && authorMatch) {
            filteredResults.push(book)
        }
    }
    // Returns the filteredResults array, which contains only the books that match the user's search criteria
    return filteredResults
}

// This Function is to update the list of preview that you select in the search overlay
function updateList(filteredResults) {
    const dataListItems = document.querySelector('[data-list-items]')
    const dataListMessage = document.querySelector('[data-list-message]')
    
    // This line clears the existing content inside datalistitem
    dataListItems.innerHTML = '' 
    
    if (filteredResults.length > 0) {
        // This loop iterates through each book in the array
        for (const book of filteredResults) {
            const listBooks = createPreview(book)
            dataListItems.appendChild(listBooks)
        }
        dataListMessage.style.display = 'none'

        const dataListButton = document.querySelector('[data-list-button]')
        dataListButton.disabled = true
        const noneRemaining = !(matches.length - page * BOOKS_PER_PAGE)
        dataListButton.innerHTML = `
            <span>Show more (${noneRemaining > 0 ? noneRemaining : 0})</span>`       
    } else {
        dataListMessage.style.display = 'block'

        const dataListButton = document.querySelector('[data-list-button]')
        dataListButton.disabled = true
        const noneRemaining = !(matches.length - page * BOOKS_PER_PAGE)
        dataListButton.innerHTML = `
            <span>Show more (${noneRemaining > 0 ? noneRemaining : 0})</span>`
    }
}

//this Code let you go out of the search overlay by means of the cancel button
const dataSearchCancel = document.querySelector('[data-search-cancel]')
dataSearchCancel.addEventListener('click', () => {
    dataSearchOverlay.open = false
})
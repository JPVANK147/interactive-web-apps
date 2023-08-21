import { BOOKS_PER_PAGE, authors, genres } from './data'

const matches = books
const page = 1

if (!books && !Array.isArray(books)) throw new Error('Source required')
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

for (const { author, image, title, id } of extracted) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

dataListItems.appendChild(fragment)

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

const css = dataSettingsTheme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? night : day
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' | 'day'

document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);
dataListButton.textContent = `Show more (${books.length - page * BOOKS_PER_PAGE})`

dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

data-list-button.innerHTML = /* html */[
    `<span>Show more</span>,
    '<span class="list__remaining"> (${matches.length} - [${page} * ${BOOKS_PER_PAGE}] > 0 ? ${matches.length} - [${page} * ${BOOKS_PER_PAGE}] : 0})</span>`,
]
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

    element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

    fragment.appendChild(element)
}

data-list-items.appendChild(fragments)

initial === matches.length - [page * BOOKS_PER_PAGE]
remaining === hasRemaining ? initial : 0
data-list-button.disabled = initial > 0

data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

if (window.scrollTo({ top: 0, behavior: 'smooth' })) {
    data-search-overlay.open = false
}

data-settings-overlay.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark)
    document.documentElement.style.setProperty('--color-light', css[result.theme].light)
    
    data-settings-overlay.open === false
})

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
})

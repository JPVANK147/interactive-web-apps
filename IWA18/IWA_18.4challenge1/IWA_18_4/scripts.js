/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */

import {
    state,
    createOrderData,
    COLUMNS,
    TABLES
} from './data.js'

import {
    html,
    createOrderHtml,
    updateDraggingHtml,
    moveToColumn
} from './view.js'

const handleDragOver = (event) => {
    event.preventDefault()
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}
// Drag start 
const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.dataset.id)
    event.target.classList.add('dragging')
}
// Drag drop 
const handleDragEnd = (event) => {
    event.target.classList.remove('dragging')
}
// Add the "Help" overlay
const handleHelpToggle = (event) => {
    if (html.help.overlay.hasAttribute('open')) {
        html.help.overlay.removeAttribute('open')
    } else {
        html.help.overlay.setAttribute('open', '')
    }
}
// Add the "Add order" overlay
const handleAddToggle = (event) => {
    if (html.add.overlay.hasAttribute('open')) {
        html.add.overlay.removeAttribute('open')
    } else {
        html.add.overlay.setAttribute('open', '')
    }
}
// Add the order number submit button
const handleAddSubmit = (event) => {
    event.preventDefault()
    const title = html.add.title.value
    const table = html.add.table.value

    if (title && table) {
        const order = createOrderData({ title, table, column: 'ordered' })
        state.orders[order.id] = order
        html.columns.ordered.appendChild(createOrderHtml(order))
        html.add.overlay.removeAttribute('open')
    }
}
// Edit the edit toggle overlay
const handleEditToggle = (event) => {
    const orderId = event.target?.getAttribute('data-id')
    if (orderId) {
        const order = state.orders[orderId]
        html.edit.id.value = order.id
        html.edit.title.value = order.title
        html.edit.table.value = order.table
        html.edit.column.value = order.column
        html.edit.overlay.setAttribute('open', '')
        html.edit.title.focus()
    } else {
        if (html.edit.overlay.hasAttribute('open')) {
            html.edit.overlay.removeAttribute('open')
            html.other.add.focus()
        }
    }
}
// Edit the edit submit overlay
const handleEditSubmit = (event) => {
    event.preventDefault()
    const id = html.edit.id.value
    const title = html.edit.title.value
    const table = html.edit.table.value
    const column = html.edit.column.value

    if (title && table && column) {
        const order = state.orders[id]
        if (!order) return

        order.title = title
        order.table = table
        order.column = column

        document.querySelector(`[data-id="${id}"]`).querySelector('[data-order-title]').textContent = title
        document.querySelector(`[data-id="${id}"]`).querySelector('[data-order-table]').textContent = table

        moveToColumn(id, column)
        updateDraggingHtml({ over: column })

        html.edit.overlay.removeAttribute('open')
    }
}
// Edit the Delete in the Edit Order overlay
const handleDelete = (event) => {
    const orderDelete = document.querySelector(`[data-id="${html.edit.id.value}"]`)
    if (orderDelete) {
        orderDelete.remove()
        delete state.orders[html.edit.id.value]
    }

    html.edit.overlay.removeAttribute('open')
}
// This is the drag and drop to a targer column 
const handleDrop = (event) => {
    event.preventDefault()
    const orderId = event.dataTransfer.getData('text/plain')
    const targetColumn = event.target?.dataset.area

    if (orderId && targetColumn) {
       
        state.orders[orderId].column = targetColumn

        moveToColumn(orderId, targetColumn)
        
        updateDraggingHtml({ over: null })
    }
}

html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
    htmlArea.addEventListener('drop', handleDrop)
}

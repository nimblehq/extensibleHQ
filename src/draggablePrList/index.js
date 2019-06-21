import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable'
import firebase from 'firebase/app'
import 'firebase/database'

const repositoryName = () => {
  // TODO: Implement new way to identify repository
  return 'braive-web'
}

const getDatabaseOrder = async () => {
  const snapshot = await firebase
    .database()
    .ref(`${repositoryName()}/prOrder`)
    .once('value')
  const order = snapshot.val()

  return order === null ? [] : order
}

const setDatabaseOrder = order => {
  firebase
    .database()
    .ref(`${repositoryName()}/prOrder`)
    .set(order)
}

const shiftElementArray = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0])
}

const addMissingElementToArray = (arrayBig, arraySmall) => {
  const missingElements = arrayBig.filter(element => {
    return !arraySmall.includes(element)
  })

  return [...arraySmall, ...missingElements]
}

const removePrList = table => {
  while (table.firstChild) {
    table.removeChild(table.firstChild)
  }
}

const addPrList = (table, prListElements, order) => {
  order.forEach(id => {
    const node = prListElements.find(prElement => {
      const prLink = prElement.querySelector(`a[href*="${id}"]`)

      if (prLink) {
        const prUrl = prLink.attributes.href.value
        const index = prUrl.lastIndexOf('/')
        const prId = prUrl.substr(index + 1)

        return prId
      }
    })

    if (node !== undefined) {
      table.append(node)
    }
  })
}

const initializeSortable = (table, order) => {
  const sortable = new Sortable(table, {
    draggable: '[data-qa="pull-request-row"]',
  })

  sortable.on('sortable:stop', ({ oldIndex, newIndex }) => {
    shiftElementArray(order, oldIndex, newIndex)
    setDatabaseOrder(order)
  })
}

export default () => {
  observe('tbody', {
    add: async table => {
      const prListElements = [].slice.call(table.children)
      const bitBucketOrder = prListElements.map(prElement => {
        const prLink = prElement.querySelector(
          'a[data-qa="pull-request-row-link"]'
        )

        if (prLink) {
          const prUrl = prLink.attributes.href.value
          const index = prUrl.lastIndexOf('/')
          const prId = prUrl.substr(index + 1)

          return prId
        }
      })

      removePrList(table)

      const databaseOrder = await getDatabaseOrder()
      const order = addMissingElementToArray(bitBucketOrder, databaseOrder)

      addPrList(table, prListElements, order)
      initializeSortable(table, order)
    },
  })
}

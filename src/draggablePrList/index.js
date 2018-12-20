import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable';
import firebase from 'firebase/app';
import 'firebase/database';

const repositoryName = () => {
  return JSON.parse(document.querySelector('body').getAttribute('data-current-repo')).slug;
}

const getDatabaseOrder = async () => {
  const snapshot = await firebase.database().ref(`${repositoryName()}/prOrder`).once('value');
  const order = snapshot.val();

  return order === null ? [] : order;
}

const setDatabaseOrder = (order) => {
  firebase.database().ref(repositoryName()).set({
    prOrder: order
  });
}

const shiftElementArray = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

const addMissingElementToArray = (arrayBig, arraySmall) => {
  const missingElements = arrayBig.filter((element) => {
    return !arraySmall.includes(element)
  })

  return [...arraySmall, ...missingElements]
}

const reorderPrList = (table, prListElements, order) => {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  order.forEach((id) => {
    const node = prListElements.find((prElement) => {
      return prElement.attributes['data-pull-request-id'].value === id
    })
    table.append(node);
  });
}

const initializeSortable = (table, order) => {
  const sortable = new Sortable(table, {
    draggable: '.pull-request-row'
  })

  sortable.on('sortable:stop', ({ oldIndex, newIndex }) => {
    shiftElementArray(order, oldIndex, newIndex)
    setDatabaseOrder(order);
  });
}

export default () => {
  observe('tbody', {
    add: async (table) => {
      const prListElements = [].slice.call(table.children);
      const bitBucketOrder = prListElements.map(prElement => {
        return prElement.attributes['data-pull-request-id'].value
      });
      const databaseOrder = await getDatabaseOrder();

      const order = addMissingElementToArray(bitBucketOrder, databaseOrder);

      reorderPrList(table, prListElements, order);
      initializeSortable(table, order);
    },
  })
}

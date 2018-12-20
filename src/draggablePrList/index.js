import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable';

const getDatabaseOrder = () => {
  const order = localStorage.getItem('prOrder');

  return order === null ? [] : order.split(",");
}

const setDatabaseOrder = (order) => {
  localStorage.setItem('prOrder', order);
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
    add(table) {
      const databaseOrder = getDatabaseOrder();
      const prListElements = [].slice.call(table.children);
      const bitBucketOrder = prListElements.map(prElement => {
        return prElement.attributes['data-pull-request-id'].value
      });

      const order = addMissingElementToArray(bitBucketOrder, databaseOrder);

      reorderPrList(table, prListElements, order);
      initializeSortable(table, order);
    },
  })
}

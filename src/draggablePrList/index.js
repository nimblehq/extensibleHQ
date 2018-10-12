import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable';

export default () => {
  observe('tbody', {
    add(table) {
      console.log(table);
      const sortable = new Sortable(table, {
        draggable: '.pull-request-row'
      })

      console.log(sortable);
    },
  })
}

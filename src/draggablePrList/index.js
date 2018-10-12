import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable';

export default () => {
  observe('tbody', {
    add(table) {
      console.log('active');
      const order = ["141", "149", "137"]

      let items = [].slice.call(table.children);
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      order.forEach((id) => {
        const node = items.find((item) => {
          return item.attributes['data-pull-request-id'].value === id
        })
        table.append(node);
      });

      let notInDatabase = items.filter((item) => {
        return !order.includes(item.attributes['data-pull-request-id'].value)
      })

      console.log(notInDatabase);

      notInDatabase.sort(function(a,b) { 
        return a.attributes['data-pull-request-id'].value - b.attributes['data-pull-request-id'].value 
      });
      
      notInDatabase.forEach(function(item) {
        table.append(item);
      })

      const sortable = new Sortable(table, {
        draggable: '.pull-request-row'
      })

      sortable.on('sortable:start', (evt) => {
        console.log('sortable:start');
        console.log(evt);
      });

      sortable.on('sortable:stop', (evt) => {
        console.log('sortable:stop');
        console.log(evt);
      });
    
    },
  })
}

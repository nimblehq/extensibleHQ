import { observe } from 'selector-observer'
import { Sortable } from '@shopify/draggable';

export default () => {
  observe('tbody', {
    add(table) {
      console.log('active');
      const databaseOrder = localStorage.getItem('prOrder').split(",");

      let items = [].slice.call(table.children);

      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      databaseOrder.forEach((id) => {
        const node = items.find((item) => {
          return item.attributes['data-pull-request-id'].value === id
        })
        table.append(node);
      });

      let notInDatabase = items.filter((item) => {
        return !databaseOrder.includes(item.attributes['data-pull-request-id'].value)
      })

      notInDatabase.sort(function(a,b) { 
        return a.attributes['data-pull-request-id'].value - b.attributes['data-pull-request-id'].value 
      });

      let order = [].slice.call(table.children).map((item) => {
        return item.attributes['data-pull-request-id'].value
      });
      console.log(order);
      
      notInDatabase.forEach(function(item) {
        table.append(item);
      })


      const sortable = new Sortable(table, {
        draggable: '.pull-request-row'
      })

      const move = function (array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
      };

      sortable.on('sortable:stop', ({oldIndex, newIndex}) => {
        move(order, oldIndex, newIndex)
        console.log(order);
        localStorage.setItem('prOrder', order)
      });
    
    },
  })
}

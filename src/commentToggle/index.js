import { observe } from  'selector-observer'

export default () => {
  observe('.diff-action, .secondary', {
    add(element) {
      const commentToggleButton = document.createElement('button');
      const commentToggleText = document.createTextNode('Toggle comments');
      commentToggleButton.appendChild(commentToggleText);
      commentToggleButton.className = ('execute click aui-button aui-button-light sbs');
      element.prepend(commentToggleButton);
    }
  })
}
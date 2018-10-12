import { observe } from  'selector-observer'

export default () => {
  const toggleCommentDisplay = (fileDiffContainer) => {
    const commentContainers = fileDiffContainer.querySelectorAll('.comment-thread-container');

    commentContainers.forEach((container) => {
      if (container.style.display !== 'none') {
        container.style.display = 'none'; 
      } else {
        container.style.display = 'block'; 
      }
    })
  }

  observe('.diff-action, .secondary', {
    add(element) {
      const commentToggleButton = document.createElement('button');
      const commentToggleText = document.createTextNode('Toggle comments');
      commentToggleButton.appendChild(commentToggleText);
      commentToggleButton.className = ('execute click aui-button aui-button-light sbs');
      element.prepend(commentToggleButton);
      const fileDiffContainer = element.closest('.diff-container');
      element.addEventListener('click', () => toggleCommentDisplay(fileDiffContainer));
    }
  })
}
import { observe } from  'selector-observer'

export default () => {
  const toggleCommentDisplay = (fileDiffContainer, commentToggleButton) => {
    const commentContainers = fileDiffContainer.querySelectorAll('.comment-thread-container');

    commentContainers.forEach((container) => {
      if (container.style.display !== 'none') {
        container.style.display = 'none'; 
        commentToggleButton.classList.toggle('btn-comment-toggle--hide');
      } else {
        container.style.display = 'block'; 
        commentToggleButton.classList.toggle('btn-comment-toggle--hide');
      }
    })
  }

  observe('.diff-action, .secondary', {
    add(element) {
      const commentToggleButton = document.createElement('button');
      const commentToggleText = document.createTextNode('Toggle comments');
      commentToggleButton.appendChild(commentToggleText);
      commentToggleButton.className = ('btn-comment-toggle execute click aui-button aui-button-light sbs');
      element.prepend(commentToggleButton);
      const fileDiffContainer = element.closest('.diff-container');
      commentToggleButton.addEventListener('click', () => toggleCommentDisplay(fileDiffContainer, commentToggleButton));
    }
  })
}
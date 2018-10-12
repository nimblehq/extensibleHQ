import { observe } from 'selector-observer'

export default () => {
  observe('.ProseMirror', {
    add(textArea) {
      if (textArea.childNodes[0].nodeName === "UL") {
        textArea.removeChild(textArea.childNodes[0])
      }
      
      const template = `
        <p><strong>What Happened</strong></p>
        <p><br></p>
        <p><strong>Insight</strong></p>
        <p><br></p>
        <p><strong>Proof of Work</strong></p>
      `
      const templateHtml = document.createRange().createContextualFragment(template);
      textArea.appendChild(templateHtml);
    },
  })
}
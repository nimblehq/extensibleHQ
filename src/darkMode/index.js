import { observe } from  'selector-observer'

export default () => {
  observe('*', {
    add(element) {
      // Background
      if (window.getComputedStyle(element, null).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
        element.style.backgroundColor = '#0D1117';
      }

      // Inner Background
      if (window.getComputedStyle(element, null).getPropertyValue('background-color') === 'rgb(244, 245, 247)') {
        element.style.backgroundColor = '#202735';
      }

      // Text and title color
      if (window.getComputedStyle(element, null).getPropertyValue('color') === 'rgb(23, 43, 77)') {
        element.style.color = '#FFFFFF';
      }

      // Subtitle color
      if (window.getComputedStyle(element, null).getPropertyValue('color') === 'rgb(80, 95, 121)') {
        element.style.color = '#505F79';
      }
    }
  })
}
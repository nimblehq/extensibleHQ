export default () => {
  chrome.runtime.onMessage.addListener(() => {
    document.body.classList.toggle('extensibl3-dark-mode');
  });

  const body = document.body
  const observer = new MutationObserver(function (event) {
    if (event[0].target.classList.contains('extensibl3-dark-mode')) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  })

  observer.observe(body, {
    attributes: true, 
    attributeFilter: ['class'],
    childList: false, 
    characterData: false
  })

  const enableDarkMode = () => {
    document.querySelectorAll('*').forEach(function(element) {
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
    });
  }

  const disableDarkMode = () => {
    document.querySelectorAll('*').forEach(function(element) {
      // Background
      if (window.getComputedStyle(element, null).getPropertyValue('background-color') === 'rgb(13, 17, 23)') {
        element.style.backgroundColor = 'rgb(255, 255, 255)';
      }

      // Inner Background
      if (window.getComputedStyle(element, null).getPropertyValue('background-color') === 'rgb(32, 39, 53)') {
        element.style.backgroundColor = 'rgb(244, 245, 247)';
      }

      // Text and title color
      if (window.getComputedStyle(element, null).getPropertyValue('color') === 'rgb(255, 255, 255)') {
        element.style.color = 'rgb(23, 43, 77)';
      }

      // Subtitle color
      if (window.getComputedStyle(element, null).getPropertyValue('color') === 'rgb(80, 95, 121)') {
        element.style.color = 'rgb(80, 95, 121)';
      }
    });
  }
}
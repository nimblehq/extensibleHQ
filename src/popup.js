var darkModeButton = document.getElementById('btn-toggle-dark-mode');
function toggleDarkMode() {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, 'msgObj');
    });
  });
}
darkModeButton.addEventListener('click', toggleDarkMode);
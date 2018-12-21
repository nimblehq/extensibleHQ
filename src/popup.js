var darkModeButton = document.getElementById('btn-toggle-dark-mode');
var pivotalKeyInput = document.getElementById('pivotal-key-input');
var savePivotalKeyButton = document.getElementById('btn-save-pivotal-key');

function toggleDarkMode() {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, 'msgObj');
    });
  });
}

function savePivotalAPIKey() {
  localStorage.setItem('pivotal_tracker_api_key', pivotalKeyInput.value);
}

pivotalKeyInput.value = localStorage.getItem('pivotal_tracker_api_key')

darkModeButton.addEventListener('click', toggleDarkMode);
savePivotalKeyButton.addEventListener('click', savePivotalAPIKey);

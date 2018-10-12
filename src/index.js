import {
  isPullRequest,
  isCreatePullRequestURL,
  isPullRequestList
} from './pageDetect';

import prTemplate from './prTemplate';
import commentToggle from './commentToggle'
import darkMode from './darkMode'
import draggablePrList from './draggablePrList';

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      commentToggle();
      darkMode();
    } else if (isCreatePullRequestURL()) {
      prTemplate();
    } else if (isPullRequestList()) {
      draggablePrList();
    }
  });
}

init();
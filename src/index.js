import {
  isPullRequest,
  isCreatePullRequestURL,
  isPullRequestList
} from './pageDetect';

import prTemplate from './prTemplate';
import draggablePrList from './draggablePrList';

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      console.log('Pull request page');
    } else if (isCreatePullRequestURL()) {
      prTemplate();
    } else if (isPullRequestList()) {
      draggablePrList();
    }
  });
}

init();
import {
  isPullRequest,
  isCreatePullRequestURL
} from './pageDetect';

import prTemplate from './prTemplate';

function init() {
  document.addEventListener("DOMContentLoaded", function() {
    if(isPullRequest()) {
      console.log('Pull request page');
    } else if (isCreatePullRequestURL) {
      prTemplate();
    }
  });
}

init();
import { observe } from "selector-observer";
import firebase from "firebase/app";
import "firebase/database";

const repositoryName = () => {
  return JSON.parse(document.querySelector('body').getAttribute('data-current-repo')).slug;
}

const gethiddenFileList = async () => {
  const snapshot = await firebase.database().ref(`${repositoryName()}/hiddenFileList`).once('value');
  const hiddenFileList = snapshot.val();

  return hiddenFileList === null ? [] : hiddenFileList;
}

const hideDiff = (fileDiffContainer, hiddenFileList) => {
  const filename = fileDiffContainer.getAttribute('data-filename').split('/').pop();
  const container = fileDiffContainer.querySelector(
    ".diff-content-container"
  );

  if (hiddenFileList.includes(filename)) {
    container.style.display = "none";
  }
}

const toggleDiffDisplay = (fileDiffContainer, diffToggleButton) => {
  const container = fileDiffContainer.querySelector(
    ".diff-content-container"
  );

  if (container.style.display !== "none") {
    container.style.display = "none";
    diffToggleButton.classList.toggle("btn-diff-toggle--hide");
  } else {
    container.style.display = "block";
    diffToggleButton.classList.toggle("btn-diff-toggle--hide");
  }
};

export default async () => {
  const hiddenFileList = await gethiddenFileList();

  observe(".diff-action, .secondary", {
    add(element) {
      const diffToggleButton = document.createElement("button");
      const diffToggleText = document.createTextNode("Toggle Diff");
      diffToggleButton.appendChild(diffToggleText);
      diffToggleButton.className =
        "btn-diff-toggle execute click aui-button aui-button-light sbs";
      element.prepend(diffToggleButton);

      const fileDiffContainer = element.closest(".commentable-diff");
      hideDiff(fileDiffContainer, hiddenFileList);

      diffToggleButton.addEventListener("click", () =>
        toggleDiffDisplay(fileDiffContainer, diffToggleButton)
      );
    }
  });
};

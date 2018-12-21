import { observe } from "selector-observer";

export default () => {
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

  observe(".diff-action, .secondary", {
    add(element) {
      const diffToggleButton = document.createElement("button");
      const diffToggleText = document.createTextNode("Toggle Diff");
      diffToggleButton.appendChild(diffToggleText);
      diffToggleButton.className =
        "btn-diff-toggle execute click aui-button aui-button-light sbs";
      element.prepend(diffToggleButton);
      const fileDiffContainer = element.closest(".diff-container");
      element.addEventListener("click", () =>
        toggleDiffDisplay(fileDiffContainer, diffToggleButton)
      );
    }
  });
};

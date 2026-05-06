export function showPopup(content, title) {
  const overlay = document.createElement("div");
  overlay.setAttribute("class", "popup-overlay");

  const popupContainer = document.createElement("div");
  popupContainer.setAttribute("id", "popup-container");
  popupContainer.setAttribute("class", "popup-container");

  const popupHeaderCont = document.createElement("div");
  popupHeaderCont.setAttribute("id", "popup-header-cont");
  popupHeaderCont.setAttribute("class", "popup-header-cont");

  const popupTitle = document.createElement("h2");
  popupTitle.setAttribute("id", "popup-title");
  popupTitle.setAttribute("class", "popup-title");
  popupTitle.textContent = title;
  popupHeaderCont.appendChild(popupTitle);

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "close-popup-btn");
  closeBtn.setAttribute("class", "close-popup-btn");
  closeBtn.textContent = "Close";
  popupHeaderCont.appendChild(closeBtn);

  popupContainer.appendChild(popupHeaderCont);

  const popupContentCont = document.createElement("div");
  popupContentCont.setAttribute("id", "popup-content-cont");
  popupContentCont.setAttribute("class", "popup-content-cont");

  const contentText = document.createElement("p");
  contentText.setAttribute("id", "popup-content-text");
  contentText.setAttribute("class", "popup-content-text");
  contentText.textContent = content;
  popupContentCont.appendChild(contentText);

  popupContainer.appendChild(popupContentCont);

  const popupFooterCont = document.createElement("div");
  popupFooterCont.setAttribute("id", "popup-footer-cont");
  popupFooterCont.setAttribute("class", "popup-footer-cont");

  const confirmBtn = document.createElement("button");
  confirmBtn.setAttribute("id", "confirm-btn");
  confirmBtn.setAttribute("class", "confirm-btn");
  confirmBtn.textContent = "Confirm";
  popupFooterCont.appendChild(confirmBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel-btn");
  cancelBtn.setAttribute("class", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  popupFooterCont.appendChild(cancelBtn);

  popupContainer.appendChild(popupFooterCont);
  overlay.appendChild(popupContainer);

  // Generic close logic (can be overridden in wrappers)
  closeBtn.addEventListener("click", () => {
    overlay.remove();
  });

  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  return overlay;
}

export function showAlert(content, title = "Information") {
  return new Promise((resolve) => {
    const popup = showPopup(content, title);
    const mountPoint = document.getElementById("popup") || document.body;
    mountPoint.appendChild(popup);

    const confirmBtn = popup.querySelector("#confirm-btn");
    const cancelBtn = popup.querySelector("#cancel-btn");
    const closeBtn = popup.querySelector("#close-popup-btn");

    // Alert only needs one button
    if (cancelBtn) cancelBtn.style.display = "none";
    if (confirmBtn) confirmBtn.textContent = "OK";

    const handleClose = () => {
      popup.remove();
      resolve();
    };

    if (confirmBtn) confirmBtn.addEventListener("click", handleClose);
    if (closeBtn) closeBtn.addEventListener("click", handleClose);
  });
}

export function showConfirm(content, title = "Confirmation") {
  return new Promise((resolve) => {
    const popup = showPopup(content, title);
    const mountPoint = document.getElementById("popup") || document.body;
    mountPoint.appendChild(popup);

    const confirmBtn = popup.querySelector("#confirm-btn");
    const cancelBtn = popup.querySelector("#cancel-btn");
    const closeBtn = popup.querySelector("#close-popup-btn");

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        popup.remove();
        resolve(true);
      });
    }

    const handleCancel = () => {
      popup.remove();
      resolve(false);
    };

    if (cancelBtn) cancelBtn.addEventListener("click", handleCancel);
    if (closeBtn) closeBtn.addEventListener("click", handleCancel);
  });
}

// --- Detail popup for saved items (plants & ideas) ---
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

export function showDetailPopup(domNode, title) {
  const overlay = document.createElement("div");
  overlay.setAttribute("class", "popup-overlay");

  const container = document.createElement("div");
  container.setAttribute("class", "detail-popup-container");

  const header = document.createElement("div");
  header.setAttribute("class", "detail-popup-header");

  const titleEl = document.createElement("h2");
  titleEl.setAttribute("class", "detail-popup-title");
  titleEl.textContent = title;

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-popup-btn");
  closeBtn.textContent = "Close";

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.setAttribute("class", "detail-popup-body");
  body.appendChild(domNode);

  container.appendChild(header);
  container.appendChild(body);
  overlay.appendChild(container);

  const mountPoint = document.getElementById("popup") || document.body;
  mountPoint.appendChild(overlay);

  // Close on button click
  closeBtn.addEventListener("click", () => overlay.remove());

  // Close on backdrop click (outside the container)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

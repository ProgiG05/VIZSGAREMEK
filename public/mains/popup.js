// --- Base popup creation ---

export function showPopup(content, title) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.setAttribute("class", "popup-overlay");

  // Create container
  const popupContainer = document.createElement("div");
  popupContainer.setAttribute("id", "popup-container");
  popupContainer.setAttribute("class", "popup-container");

  // Create header
  const popupHeaderCont = document.createElement("div");
  popupHeaderCont.setAttribute("id", "popup-header-cont");
  popupHeaderCont.setAttribute("class", "popup-header-cont");

  // Title
  const popupTitle = document.createElement("h2");
  popupTitle.setAttribute("id", "popup-title");
  popupTitle.setAttribute("class", "popup-title");
  popupTitle.textContent = title;
  popupHeaderCont.appendChild(popupTitle);

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "close-popup-btn");
  closeBtn.setAttribute("class", "close-popup-btn");
  closeBtn.textContent = "Close";
  popupHeaderCont.appendChild(closeBtn);

  popupContainer.appendChild(popupHeaderCont);

  // Content container
  const popupContentCont = document.createElement("div");
  popupContentCont.setAttribute("id", "popup-content-cont");
  popupContentCont.setAttribute("class", "popup-content-cont");

  // Content text
  const contentText = document.createElement("p");
  contentText.setAttribute("id", "popup-content-text");
  contentText.setAttribute("class", "popup-content-text");
  contentText.textContent = content;
  popupContentCont.appendChild(contentText);

  popupContainer.appendChild(popupContentCont);

  // Footer container
  const popupFooterCont = document.createElement("div");
  popupFooterCont.setAttribute("id", "popup-footer-cont");
  popupFooterCont.setAttribute("class", "popup-footer-cont");

  // Confirm button
  const confirmBtn = document.createElement("button");
  confirmBtn.setAttribute("id", "confirm-btn");
  confirmBtn.setAttribute("class", "confirm-btn");
  confirmBtn.textContent = "Confirm";
  popupFooterCont.appendChild(confirmBtn);

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel-btn");
  cancelBtn.setAttribute("class", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  popupFooterCont.appendChild(cancelBtn);

  // Append elements
  popupContainer.appendChild(popupFooterCont);
  overlay.appendChild(popupContainer);

  // Generic close logic
  closeBtn.addEventListener("click", () => {
    overlay.remove();
  });

  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  return overlay;
}

// --- Alert wrapper ---

export function showAlert(content, title = "Information") {
  return new Promise((resolve) => {
    // Show popup
    const popup = showPopup(content, title);
    const mountPoint = document.getElementById("popup") || document.body;
    mountPoint.appendChild(popup);

    // Get buttons
    const confirmBtn = popup.querySelector("#confirm-btn");
    const cancelBtn = popup.querySelector("#cancel-btn");
    const closeBtn = popup.querySelector("#close-popup-btn");

    // Hide cancel and rename confirm
    if (cancelBtn) cancelBtn.style.display = "none";
    if (confirmBtn) confirmBtn.textContent = "OK";

    // Close handler
    const handleClose = () => {
      popup.remove();
      resolve();
    };

    if (confirmBtn) confirmBtn.addEventListener("click", handleClose);
    if (closeBtn) closeBtn.addEventListener("click", handleClose);
  });
}

// --- Confirm wrapper ---

export function showConfirm(content, title = "Confirmation") {
  return new Promise((resolve) => {
    // Show popup
    const popup = showPopup(content, title);
    const mountPoint = document.getElementById("popup") || document.body;
    mountPoint.appendChild(popup);

    // Get buttons
    const confirmBtn = popup.querySelector("#confirm-btn");
    const cancelBtn = popup.querySelector("#cancel-btn");
    const closeBtn = popup.querySelector("#close-popup-btn");

    // Confirm handler
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        popup.remove();
        resolve(true);
      });
    }

    // Cancel handler
    const handleCancel = () => {
      popup.remove();
      resolve(false);
    };

    if (cancelBtn) cancelBtn.addEventListener("click", handleCancel);
    if (closeBtn) closeBtn.addEventListener("click", handleCancel);
  });
}

// --- Detail popup for saved items ---

export function showDetailPopup(domNode, title) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.setAttribute("class", "popup-overlay");

  // Create container
  const container = document.createElement("div");
  container.setAttribute("class", "detail-popup-container");

  // Create header
  const header = document.createElement("div");
  header.setAttribute("class", "detail-popup-header");

  // Title
  const titleEl = document.createElement("h2");
  titleEl.setAttribute("class", "detail-popup-title");
  titleEl.textContent = title;

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-popup-btn");
  closeBtn.textContent = "Close";

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  // Body content
  const body = document.createElement("div");
  body.setAttribute("class", "detail-popup-body");
  body.appendChild(domNode);

  // Append elements
  container.appendChild(header);
  container.appendChild(body);
  overlay.appendChild(container);

  // Mount popup
  const mountPoint = document.getElementById("popup") || document.body;
  mountPoint.appendChild(overlay);

  // Close events
  closeBtn.addEventListener("click", () => overlay.remove());

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

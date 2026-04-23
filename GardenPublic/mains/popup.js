export function showPopup(content, title, confirmAction, cancelAction) {
    const popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'popup-container');
    popupContainer.setAttribute('class', 'popup-container');
    
    const popupHeaderCont = document.createElement('div');
    popupHeaderCont.setAttribute('id', 'popup-header-cont');
    popupHeaderCont.setAttribute('class', 'popup-header-cont');

    const popupTitle = document.createElement('h2');
    popupTitle.setAttribute('id', 'popup-title');
    popupTitle.setAttribute('class', 'popup-title');
    popupTitle.textContent = 'Garden Preview';
    popupHeaderCont.appendChild(popupTitle);

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'close-popup-btn');
    closeBtn.setAttribute('class', 'close-popup-btn');
    closeBtn.textContent = 'Close';
    popupHeaderCont.appendChild(closeBtn);

    popupContainer.appendChild(popupHeaderCont);

    const popupContentCont = document.createElement('div');
    popupContentCont.setAttribute('id', 'popup-content-cont');
    popupContentCont.setAttribute('class', 'popup-content-cont');

    const contentText = document.createElement('p');
    contentText.setAttribute('id', 'popup-content-text');
    contentText.setAttribute('class', 'popup-content-text');
    contentText.textContent = content;
    popupContentCont.appendChild(contentText);

    popupContainer.appendChild(popupContentCont);

    const popupFooterCont = document.createElement('div');
    popupFooterCont.setAttribute('id', 'popup-footer-cont');
    popupFooterCont.setAttribute('class', 'popup-footer-cont');

    const confirmBtn = document.createElement('button');
    confirmBtn.setAttribute('id', 'confirm-btn');
    confirmBtn.setAttribute('class', 'confirm-btn');
    confirmBtn.textContent = 'Confirm';
    popupFooterCont.appendChild(confirmBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancel-btn');
    cancelBtn.setAttribute('class', 'cancel-btn');
    cancelBtn.textContent = 'Cancel';
    popupFooterCont.appendChild(cancelBtn);

    popupContainer.appendChild(popupFooterCont);

    closeBtn.addEventListener('click', () => {
        popupContainer.remove();
    });

    cancelBtn.addEventListener('click', () => {
        popupContainer.remove();
    });

    return popupContainer;
}
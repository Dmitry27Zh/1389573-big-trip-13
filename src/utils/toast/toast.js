import './toast.css';

const SHOW_TIME = 5000;

const toastContainer = document.createElement(`div`);
toastContainer.classList.add(`toast-container`);
document.body.append(toastContainer);

export const toast = (message) => {
  const toastElement = document.createElement(`div`);
  toastElement.classList.add(`toast-item`);
  toastElement.textContent = message;
  toastContainer.append(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, SHOW_TIME);
};

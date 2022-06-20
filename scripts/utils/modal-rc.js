const modalRcBtn = document.querySelector('.modal-rc-close-btn');
const modalRc = document.querySelector('.modal-rc');

setTimeout(() => {modalRc.classList.remove('hidden')}, 5000);

modalRcBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalRc.remove();
} )
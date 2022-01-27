const details = document.querySelector("#toc-details");

function clickToc() {
    switch (details.style.display) {
        case 'none':
            details.style.display = 'block';
            setTimeout(() =>
                document.body.addEventListener('click', closeToc), 1);
            break;
        case 'block':
            details.style.display = 'none';
            break;
    }
}

function openToc() {
    details.style.display = 'block';
}

function closeToc() {
    details.style.display = 'none';
    document.body.removeEventListener('click', closeToc);
}

function getToc() {
    const hs = document.querySelector('.markdown-body').querySelectorAll('h1, h2, h3, h4, h5, h6');
    const toc_list = document.querySelector("#toc-list");
    for (const h of hs) {
        const size = Number(h.tagName.toLowerCase().replace('h', ''));
        const a = document.createElement('a');
        a.classList.add("filter-item", "SelectMenu-item", "ws-normal", "wb-break-word", "line-clamp-2", "py-1", "toc-item");
        a.href = `#${h.id}`;
        a.innerText = h.innerHTML;
        a.style.paddingLeft = `${size * 12}px`;
        toc_list.appendChild(a);
    }
}


// TODO: highlight on scroll
(() => {
    getToc();
})();

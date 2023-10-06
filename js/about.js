fetch('../json/profile.json').then(response => response.json()).then(data => {
    const element = document.querySelector('.container');

    function openModal() {
        modalContent.style.display = 'block';
        modalContent.style.top = '50%';
        modalContent.style.left = '50%';
        element.style.filter = 'blur(20px)';
    }
    
    function closeModal() {
        modalContent.style.display = 'none';
        modalContent.style.top = '200%';
        modalContent.style.left = '200%';
        element.style.filter = 'none';
    }
    
    const memberListContainer = document.getElementById('memberList');
    const modalContent = document.getElementById('modalContent');
    const container = document.getElementById('blur');
    const content = document.getElementById('memberList');

    for (let i in data) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
            <div class="item-image">
                <img src="${data[i].pic}" alt="${data[i].pic}">
            </div>
            <div class="item-name">${data[i].name}</div>
            <div class="item-name2">${data[i].role}</div>
        `;

        listItem.addEventListener('click', () => {
            modalContent.innerHTML = '';
            const modalInfo = document.createElement('div');
            modalInfo.classList.add('modal-info');
            modalInfo.innerHTML = `
                <div class="image">
                    <img src="${data[i].pic}" alt="${data[i].pic}">
                </div>
                <div class="item-name">
                    <h2>${data[i].name}</h2>
                    <div class="item-name2">${data[i].role}</div>
                </div>
                <div class="item-detail">
                    <pre>Birthdate    : ${data[i].birthDate}</pre>
                    <pre>University   : ${data[i].univ}</pre>
                    <pre>Department   : ${data[i].department}</pre>
                    <pre>Fact         : ${data[i].fact}</pre>
                    <a href="${data[i].linkedin}">LinkedIn</a>
                </div>
            `;

            modalContent.appendChild(modalInfo);
            openModal();
        });

        memberListContainer.appendChild(listItem);
    }

    container.addEventListener('click', (event) => {
        if (event.target === container) {
            closeModal();
        }
    });

    content.addEventListener('click', (event) => {
        if (event.target === content) {
            closeModal();
        }
    });
});
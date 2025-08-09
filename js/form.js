const form = document.getElementById('userForm');
const showDataButton = document.getElementById('showData');
const userDataDiv = document.getElementById('userData');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!name || !email || !age) {
        alert('Por favor completa todos los campos');
        return;
    }

    if (isNaN(age) || age < 18) {
        alert('El usuario debe tener al menos 18 años');
        return;
    }

    const user = { name, email, age };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario guardado correctamente');
    form.reset();
});

showDataButton.addEventListener('click', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        userDataDiv.innerHTML = '<p class="no-users">No hay usuarios guardados</p>';
        return;
    }

    userDataDiv.innerHTML = users.map((u, i) =>
        `<div class="user-card">
            <h3> ${u.name}</h3>
            <p> ${u.email}</p>
            <p> ${u.age} años</p>
        </div>`
    ).join('');
});
const form = document.getElementById('userForm')
const showDataButton = document.getElementById('showData')
const userDataDiv = document.getElementById('userData')

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const age = document.getElementById('age');

    if (!form.checkValidity()) {
        alert("Por favor completa los campos correctamente");
        return;
    }

    if (parseInt(age.value) <= 18) {
    age.setCustomValidity("La edad debe ser mayor a 18 años.");
    age.reportValidity();
    return;
  } else {
    age.setCustomValidity("");
  }

  const userData = {
    name: name.value,
    email: email.value,
    age: age.value
  };

  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Datos guardados en localStorage');
  form.reset();
});

showDataBtn.addEventListener('click', () => {
  const data = JSON.parse(localStorage.getItem('userData'));
  if (data) {
    userDataDiv.innerText = `Nombre: ${data.name}\nCorreo: ${data.email}\nEdad: ${data.age}`;
  } else {
    userDataDiv.innerText = 'No hay datos almacenados.';
  }
});
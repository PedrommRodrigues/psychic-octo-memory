/* ------------- Notification handler for check in and call btn ------------- */
const notification = document.querySelector("#success-message");
const checkInBtn = document.querySelectorAll(".call-blue");
const texto = document.querySelector(".texto-topo");
const mostraNome = document.querySelector(".texto-nome");

checkInBtn.forEach((btn) => {
  const nome = btn.getAttribute("nomePessoa");
  btn.addEventListener("click", () => {
    texto.textContent = "Check In efectuado com sucesso";
    mostraNome.textContent = nome;
    notification.style.opacity = "100 ";

    hideSuccessMessage();
  });
});

const callBtn = document.querySelectorAll(".call-green");

callBtn.forEach((btn) => {
  const nome = btn.getAttribute("nomePessoa");

  btn.addEventListener("click", () => {
    texto.textContent = "Paciente chamado para consulta";
    mostraNome.textContent = nome;
    notification.style.opacity = "100 ";

    hideSuccessMessage();
  });
});

/* ------------------- Func to validate call and check in ------------------- */

const check = document.querySelectorAll(".check");
const double = document.querySelectorAll(".double");
const doubleBtn = document.querySelectorAll(".double-btn");
const checkBtn = document.querySelectorAll(".check-btn");
const consulta = document.querySelectorAll(".consulta");

const checkIn = (clickedElement) => {
  clickedElement.classList.add("hide");
  const siblingImage = clickedElement
    .closest(".actions")
    .querySelector(".check");

  if (siblingImage) {
    siblingImage.classList.remove("hide");
  }

  // Enable the "Chamar" button after "Check In" is hidden
  const chamarButton = clickedElement
    .closest(".actions")
    .querySelector(".double-btn");
  if (chamarButton) {
    chamarButton.disabled = false; // Ensure the chamar button is enabled
  }
};

const chamar = (clickedElement) => {
  const checkInButton = clickedElement
    .closest(".actions")
    .querySelector(".check-btn");

  // Check if "Check In" button is hidden
  if (!checkInButton.classList.contains("hide")) {
    alert("Please check in first");
    return;
  }

  clickedElement.classList.add("hide");

  // Find the parent container of the button
  const parentContainer = clickedElement.closest(".actions");

  if (parentContainer) {
    // Find the check and double images within the parent container
    const siblingCheckImage = parentContainer.querySelector(".check");
    const siblingChamarImage = parentContainer.querySelector(".double");

    if (siblingCheckImage) {
      siblingCheckImage.classList.add("hide");
    }
    if (siblingChamarImage) {
      siblingChamarImage.classList.remove("hide");
    }

    // Remove class "hide" from <a> element when "chamar" button has class "hide"
    const consultaLink = parentContainer.querySelector(".consulta");
    if (consultaLink) {
      consultaLink.classList.remove("hide");
    }
  }
};

// Initially disable the "Chamar" button if "Check In" button is not hidden
document.querySelectorAll(".actions").forEach((action) => {
  const checkInButton = action.querySelector(".check-btn");
  const chamarButton = action.querySelector(".double-btn");
  if (checkInButton && !checkInButton.classList.contains("hide")) {
    chamarButton.disabled = true;
  }
});

/* ----------------- Func to open details on clicked person ----------------- */

const expand = document.querySelectorAll(".expand");

expand.forEach((button) => {
  button.addEventListener("click", function () {
    const currentRotation = this.style.transform === "rotate(180deg)" ? 0 : 180;
    this.style.transform = `rotate(${currentRotation}deg)`;

    const hiddenRow = this.closest("tr").nextElementSibling;
    hiddenRow.classList.toggle("show-row");
    hiddenRow.classList.toggle("hide-row");
  });
});

/* -------------------------- Func to convert date -------------------------- */

const dateDisplayed = document.querySelectorAll(".php_date");

dateDisplayed.forEach((date) => {
  let dateToFormat = date.textContent;
  let year = dateToFormat.slice(0, 4);
  let month = dateToFormat.slice(5, 7);
  let day = dateToFormat.slice(8);
  let shortMonth;

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ];

  shortMonth = months[parseInt(month, 10) - 1];

  formatedDate = day + " " + shortMonth;

  date.textContent = formatedDate;
});

/* --------------------------- Delete appointment --------------------------- */

const deleteAppt = document.querySelectorAll(".delete_appt");
const dialog3 = document.getElementById("dialog3");
const closeDialog = document.querySelector(".btn-cancel");
const removeLink = document.getElementById("remove-link");

deleteAppt.forEach((button) => {
  const id_consulta = button.getAttribute("id_consulta");

  button.addEventListener("click", () => {
    removeLink.href = `func-remove-appointment.php?id_consulta=${id_consulta}`;
    dialog3.showModal();
  });
});

closeDialog.addEventListener("click", () => {
  dialog3.close();
});

/* -------------------------- Notification handler -------------------------- */

let globalTimeoutId; // A global variable to store the timeout reference

function hideSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  const closeNotification = document.getElementById("close-notification");

  if (!successMessage || !closeNotification) {
    return;
  }

  // Clear any existing timeout before setting a new one
  if (globalTimeoutId) {
    clearTimeout(globalTimeoutId);
  }

  // Create a new timeout
  globalTimeoutId = setTimeout(() => {
    successMessage.style.opacity = "0";
  }, 3500);

  closeNotification.addEventListener("click", () => {
    successMessage.style.opacity = "0";
    clearTimeout(globalTimeoutId); // Cancel the timeout when closeNotification is clicked
    globalTimeoutId = null; // Reset the timeout reference
  });
}

// Chama a função quando a página é carregada
window.onload = hideSuccessMessage;

/* ---------------------------- Edit appointment ---------------------------- */

const edit = document.querySelectorAll(".edit");
const dialog2 = document.getElementById("dialog2");
const nome = document.getElementById("php_nome");
const birthday = document.getElementById("php_nascimento");
const contacto = document.getElementById("php_contacto");
const email = document.getElementById("php_email");
const morada = document.getElementById("php_morada");
const id = document.getElementById("php_id");
const medico = document.getElementById("medic");
const date = document.getElementById("appt_date");
const horario = document.getElementById("appt_time");
const motivo = document.getElementById("motive");
const tipo = document.getElementById("type_appt");

edit.forEach((btn) => {
  btn.addEventListener("click", () => {
    let pessoaId = btn.getAttribute("pessoa_id"); // Vamos buscar o atributo "pessoa_id", que estamos a passar no botão

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "func-processa_consulta.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);

        nome.textContent = data.nome_pessoa;
        birthday.textContent = data.data_nascimento;
        contacto.textContent = data.telefone;
        email.textContent = data.email;
        morada.textContent = data.morada;
        id.value = data.id_pessoa;
        medico.value = data.id_medico;
        date.value = data.data;
        horario.value = data.horario;
        motivo.value = data.assunto;
        tipo.value = data.tipo_consulta;

        dialog2.showModal();
      } else {
        alert("Erro ao processar solicitação.");
      }
    };
    xhr.send("id=" + pessoaId);
  });
});

const closeModal = document.querySelector(".close-modal");

closeModal.addEventListener("click", () => {
  dialog2.close();
});

/* ---------------------------- Func to search by name ---------------------------- */

const searchInput = document.getElementById("pesquisa");
const rows = document.querySelectorAll(".click-event"); // fetch in each line created by the search

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim().toLowerCase();

  rows.forEach((row) => {
    const nome = row.querySelector(".nome").textContent.toLowerCase(); // fetch in each line the name

    if (nome.includes(searchTerm)) {
      //se incluir mostra, senão não mostra
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});

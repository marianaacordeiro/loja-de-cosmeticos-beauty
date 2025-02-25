document.addEventListener("DOMContentLoaded", () => {
  // Inicializa componentes Materialize
  const datepickerElems = document.querySelectorAll(".datepicker");
  const modalElems = document.querySelectorAll(".modal");
  if (datepickerElems.length) {
    M.Datepicker.init(datepickerElems, {
      format: "dd/mm/yyyy",
      i18n: {
        months: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      },
      yearRange: [1920, new Date().getFullYear()],
      maxDate: new Date(),
      autoClose: true,
    });
  }
  if (modalElems.length) {
    M.Modal.init(modalElems);
  }

  // Máscara para Telefone //
  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", () => {
      telefoneInput.value = telefoneInput.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    });
  }
  // Máscara para CPF //
  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número //

      // Aplica a máscara automaticamente enquanto o usuário digita //
      if (value.length > 3)
        value = value.substring(0, 3) + "." + value.substring(3);
      if (value.length > 7)
        value = value.substring(0, 7) + "." + value.substring(7);
      if (value.length > 11)
        value = value.substring(0, 11) + "-" + value.substring(11, 13);

      e.target.value = value.substring(0, 14);
    });
  }

  // Tabs para Navegação //
  document.querySelectorAll(".custom-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".custom-tab, .tabs-content")
        .forEach((el) => el.classList.remove("active"));
      tab.classList.add("active");
      const target = document.querySelector(tab.dataset.target);
      if (target) target.classList.add("active");
    });
  });

  // Gerenciamento de Cadastro com localStorage //
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      if (localStorage.getItem(email)) {
        alert("Este e-mail já está cadastrado.");
        return;
      }

      const usuario = {
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        telefone: telefoneInput ? telefoneInput.value : "",
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("data_nascimento").value,
      };

      localStorage.setItem(email, JSON.stringify(usuario));
      window.location.href = "index.html";
    });
  }

  // Sistema de Login com localStorage //
  const formLogin = document.getElementById("formulario");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login_email").value;
      const senha = document.getElementById("login_senha").value;
      const usuario = JSON.parse(localStorage.getItem(email));
      if (usuario && usuario.senha === senha) {
        window.location.href = "index.html";
      } else {
        const modalInstance = M.Modal.getInstance(
          document.getElementById("modal-usuario-nao-cadastrado")
        );
        if (modalInstance) modalInstance.open();
      }
    });
  }

  // Validação personalizada para o campo de senha //
  const senhaInput = document.getElementById("senha");
  if (senhaInput) {
    senhaInput.addEventListener("invalid", (event) => {
      event.target.setCustomValidity(
        "Digite uma senha com no mínimo 6 caracteres, incluindo números e letras."
      );
    });

    senhaInput.addEventListener("input", () => {
      senhaInput.setCustomValidity(""); // Remove a mensagem de erro ao digitar corretamente
    });
  }
});

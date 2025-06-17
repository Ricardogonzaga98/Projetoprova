const form = document.getElementById('cadastroForm');
const msg = document.getElementById('msg');

const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const numeroInput = document.getElementById('numero');

function limparEndereco() {
  logradouroInput.value = '';
  bairroInput.value = '';
  cidadeInput.value = '';
  estadoInput.value = '';
}

async function consultarCep(cep) {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      limparEndereco();
      msg.textContent = 'CEP não encontrado.';
      msg.className = 'error';
      return false;
    }

    logradouroInput.value = data.logradouro || '';
    bairroInput.value = data.bairro || '';
    cidadeInput.value = data.localidade || '';
    estadoInput.value = data.uf || '';
    msg.textContent = '';
    msg.className = '';
    return true;
  } catch (error) {
    limparEndereco();
    msg.textContent = 'Erro ao consultar o CEP.';
    msg.className = 'error';
    return false;
  }
}

cepInput.addEventListener('blur', () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length === 8) {
    consultarCep(cep);
  } else {
    limparEndereco();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  msg.textContent = '';
  msg.className = '';

  if (!form.checkValidity()) {
    msg.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    msg.className = 'error';
    return;
  }

  const cepValido = cepInput.value.replace(/\D/g, '').length === 8;

  if (!cepValido) {
    msg.textContent = 'Informe um CEP válido.';
    msg.className = 'error';
    return;
  }

  if (!logradouroInput.value || !bairroInput.value || !cidadeInput.value || !estadoInput.value) {
    msg.textContent = 'Por favor, informe um CEP válido para completar o endereço.';
    msg.className = 'error';
    return;
  }
  if (!numeroInput.value) {
    msg.textContent = 'Por favor, informe o número da casa.';
    msg.className = 'error';
    return;
  }

  msg.textContent = 'Cadastro enviado com sucesso! Obrigado por se voluntariar.';
  msg.className = 'success';

  form.reset();
  limparEndereco();
});

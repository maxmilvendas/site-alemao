// Seleciona o input e o formulário
const documentoInput = document.getElementById('documento');
const consultaForm = document.getElementById('consultaForm');

// Função para aplicar máscara de CPF
function formatCPF(value) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');
    // Aplica a máscara
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
}

// Aplica a máscara enquanto o usuário digita
documentoInput.addEventListener('input', (e) => {
    e.target.value = formatCPF(e.target.value);
});

// Redireciona para o WhatsApp ao enviar o formulário
consultaForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o envio padrão do formulário

    const cpf = documentoInput.value;

    if(cpf.length < 14) { // 14 caracteres no formato 000.000.000-00
        alert('Por favor, digite um CPF válido.');
        return;
    }

    // Número do WhatsApp
    const numeroWhatsApp = '552992984215343'; // código do país + número

    // Mensagem de saudação e CPF
    const mensagem = `Olá! Gostaria de consultar meu CPF: ${cpf}`;

    // Redireciona para o WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.location.href = url;
});

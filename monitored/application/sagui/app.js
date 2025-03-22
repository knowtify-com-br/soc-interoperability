const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 80;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint de login
app.get('/login', (req, res) => {
  const { email, senha } = req.query;
  
  if (email === 'sagui.master' && senha === 'B@n@n@123') {
    return res.status(200).json({ message: 'Login realizado com sucesso' });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Endpoint de submissão do formulário
app.get('/formulario', (req, res) => {
  const { nome, filiacao, cpf, dataNascimento, email, rendaFamiliar } = req.query;
  
  // Verificar se todos os campos foram fornecidos
  if (!nome || !filiacao || !cpf || !dataNascimento || !email || !rendaFamiliar) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  
  // Verificar CPF específico
  if (cpf === '000.000.000-99') {
    return res.status(409).json({ message: 'CPF já cadastrado' });
  }
  
  // Para qualquer outro CPF, retornar sucesso
  return res.status(201).json({ 
    message: 'Formulário submetido com sucesso',
    dados: {
      nome,
      filiacao,
      cpf,
      dataNascimento,
      email,
      rendaFamiliar
    }
  });
});

// Endpoint de submissão do formulário
app.get('/health', (req, res) => {
  return res.status(200).json({ status: '1'});
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

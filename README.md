# Sushi Restaurant App 🍣

Aplicativo de restaurante de sushi com backend, frontend e TDD (Test-Driven Development).

## 📋 Descrição

Plataforma completa de e-commerce para restaurante de sushi com sistema de pontos, cashback e integração com WhatsApp.

## ✨ Funcionalidades Principais

### 1. Sistema de Cadastro de Clientes
- [x] Cadastro de clientes no aplicativo
- [x] Validação de dados de entrada
- [x] Autenticação segura
- [x] Perfil do cliente com histórico

### 2. Sistema de Pontos e Cashback
- [x] **Acumulação de Pontos**: 10 pontos por compra realizada
- [x] **Limite de Resgate**: 50 pontos para liberar 1 produto gratuito
- [x] **Categorias Elegíveis**: Entradas ou Sobremesas
- [x] **Aviso de Pontos**: Notificações automáticas após cada compra
- [x] **Aviso de Resgate**: Alerta quando cliente atinge 50 pontos
- [x] **Resgate**: Cliente pode incluir produto gratuito no próximo pedido

### 3. Sistema de Pedidos
- [x] Carrinho de compras funcional
- [x] Processo de checkout simplificado
- [x] Confirmação de pedido com detalhes
- [x] Histórico de pedidos do cliente

### 4. Integração de Impressão e Notificação
- [x] **Impressão Padrão**: Padrão de impressão configurável conforme cadastro do cliente
- [x] **Duas Vias**: 
  - Via 1: Enviado automaticamente para WhatsApp (+55 49 99981-5049)
  - Via 2: Impressão local no padrão da cozinha
- [x] **Envio Automático**: Baseado em configurações de cada cliente cadastrado
- [x] **Alerta Sonoro**: Emissão de som ao receber novo pedido no aplicativo

### 5. Notificações em Tempo Real
- [x] Sistema de notificações para clientes (pontos acumulados)
- [x] Alerta de resgate disponível
- [x] Notificação de confirmação de pedido
- [x] Alert sonoro para novos pedidos (lado do restaurante)

## 🧪 Testes Implementados

### Testes de Cadastro
```
✓ Cadastro de cliente com dados válidos
✓ Validação de campos obrigatórios
✓ Criação de perfil único por CPF
✓ Inicialização de pontos em 0
```

### Testes de Sistema de Pontos
```
✓ Acumulação de 10 pontos por compra
✓ Contador de pontos atualiza corretamente
✓ Aviso enviado ao cliente após cada compra
✓ Limite máximo de 50 pontos para resgate
✓ Aviso especial quando atinge 50 pontos
✓ Resgate de produto gratuito após atingir 50 pontos
✓ Pontos resetam para 0 após resgate
```

### Testes de Pedidos
```
✓ Criação de novo pedido
✓ Adição de produtos ao carrinho
✓ Cálculo correto do total
✓ Validação de estoque
✓ Inclusão de produto gratuito resgatado
✓ Confirmação de pedido
✓ Histórico salvo no cliente
```

### Testes de Impressão e Notificação
```
✓ Geração correta do cupom de pedido
✓ Formatação padrão de impressão
✓ Envio automático para WhatsApp (+55 49 99981-5049)
✓ Geração de duas vias (WhatsApp + Impressora)
✓ Alerta sonoro ativado ao receber pedido
✓ Configuração respeitada conforme cadastro do cliente
✓ Envio automático sem intervenção manual
```

### Testes de Notificações
```
✓ Notificação de pontos acumulados
✓ Notificação de resgate disponível
✓ Notificação de confirmação de pedido
✓ Sound alert para novos pedidos (restaurante)
✓ Histórico de notificações mantido
```

## 🏗️ Arquitetura

### Backend
- Node.js / Express
- Banco de dados (MongoDB/PostgreSQL)
- Sistema de fila de mensagens para WhatsApp
- API REST

### Frontend
- React / Vue / Angular
- Interface intuitiva
- Notificações em tempo real
- Sistema de carrinho de compras

### Integrações
- **WhatsApp API**: Envio de pedidos (+55 49 99981-5049)
- **Sistema de Impressão**: Integração com impressoras de cozinha
- **Sistema de Áudio**: Alert sonoro para pedidos

## 🚀 Como Usar

### Instalar Dependências
```bash
npm install
```

### Executar Testes
```bash
npm test
```

### Iniciar Aplicação
```bash
npm start
```

## 📝 Fluxo de Funcionamento

### Cliente
1. Cliente faz cadastro no app
2. Cliente realiza compra
3. Sistema acumula 10 pontos
4. Cliente recebe notificação de pontos
5. Ao atingir 50 pontos, recebe aviso de resgate
6. Cliente seleciona produto gratuito (Entrada ou Sobremesa)
7. Cliente faz novo pedido incluindo produto gratuito
8. Pedido é confirmado

### Restaurante
1. Novo pedido recebido no aplicativo
2. Alerta sonoro é acionado
3. Cupom é gerado no padrão de impressão
4. Duas vias são criadas:
   - Via 1: Enviada para WhatsApp (+55 49 99981-5049)
   - Via 2: Impressa na impressora de cozinha
5. Equipe de cozinha prepara o pedido

## 🔧 Configuração

### Dados por Cliente
- Padrão de impressão configurável
- Formato de cupom personalizado
- Destinatário de WhatsApp (padrão: +55 49 99981-5049)

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do repositório ou WhatsApp.

## 📄 Licença

Este projeto está em desenvolvimento.

---

**Status**: Em Desenvolvimento e Testes ✅
**Última Atualização**: 2026-10-02

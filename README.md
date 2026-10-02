const state = {
  customers: [],
  orders: [],
  notifications: [],
  menu: []
};

const customerForm = document.getElementById('customerForm');
const orderForm = document.getElementById('orderForm');
const customerSelect = document.getElementById('customerSelect');
const rewardSelection = document.getElementById('rewardSelection');
const menuItemsContainer = document.getElementById('menuItems');
const customerList = document.getElementById('customerList');
const notificationsEl = document.getElementById('notifications');
const ordersList = document.getElementById('ordersList');
const soundButton = document.getElementById('soundButton');

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro ao processar requisição.');
  }
  return data;
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.right = '20px';
  toast.style.top = '20px';
  toast.style.background = type === 'warning' ? '#f59e0b' : '#10b981';
  toast.style.color = '#fff';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 20px rgba(0,0,0,0.12)';
  toast.style.zIndex = '50';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function playAlertSound() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;
  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = 880;
  gain.gain.value = 0.08;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.22);
}

async function loadCustomers() {
  const customers = await fetchJson('/api/customers');
  state.customers = customers;
  renderCustomerSelect();
  renderCustomers();
}

async function loadNotifications() {
  const notifications = await fetchJson('/api/notifications');
  state.notifications = notifications;
  renderNotifications();
}

async function loadOrders() {
  const orders = await fetchJson('/api/orders');
  state.orders = orders;
  renderOrders();
}

function renderCustomerSelect() {
  customerSelect.innerHTML = '<option value="">Selecione</option>';
  state.customers.forEach((customer) => {
    const option = document.createElement('option');
    option.value = customer.id;
    option.textContent = `${customer.name} (${customer.points} pts)`;
    customerSelect.appendChild(option);
  });

  updateRewardOptions();
}

function updateRewardOptions() {
  const customerId = customerSelect.value;
  const customer = state.customers.find((entry) => entry.id === customerId);
  const options = ['<option value="">Nenhum</option>'];

  if (customer && customer.rewardAvailable) {
    const eligibleItems = [
      { id: 'salada', name: 'Salada Japonesa' },
      { id: 'dorayaki', name: 'Dorayaki' },
      { id: 'mochi', name: 'Mochi' },
      { id: 'temaki', name: 'Temaki de Salmão' },
      { id: 'sorvete', name: 'Sorvete de Matcha' }
    ];

    eligibleItems.forEach((item) => {
      options.push(`<option value="${item.id}">${item.name}</option>`);
    });
  }

  rewardSelection.innerHTML = options.join('');
}

function renderCustomers() {
  customerList.innerHTML = '';
  state.customers.forEach((customer) => {
    const card = document.createElement('div');
    card.className = 'customer-card';
    const rewardBadge = customer.rewardAvailable
      ? '<span class="badge success">Resgate disponível</span>'
      : customer.points >= 50
        ? '<span class="badge warning">50 pontos</span>'
        : '<span class="badge">Pontos em andamento</span>';

    card.innerHTML = `
      <strong>${customer.name}</strong><br />
      ${customer.phone}<br />
      CPF: ${customer.cpf}<br />
      Pontos: <strong>${customer.points}</strong><br />
      ${rewardBadge}
    `;
    customerList.appendChild(card);
  });
}

function renderNotifications() {
  notificationsEl.innerHTML = '';
  state.notifications.forEach((notice) => {
    const item = document.createElement('div');
    item.className = `notification-card ${notice.type || 'info'}`;
    item.innerHTML = `<strong>${new Date(notice.createdAt).toLocaleString('pt-BR')}</strong><br />${notice.message}`;
    notificationsEl.appendChild(item);
  });
}

function renderOrders() {
  ordersList.innerHTML = '';
  state.orders.forEach((order) => {
    const card = document.createElement('div');
    card.className = 'order-card';

    const itemSummary = order.items
      .map((item) => `${item.name} x${item.quantity} = R$ ${item.total.toFixed(2)}`)
      .join('<br />');

    card.innerHTML = `
      <strong>${order.customerName}</strong> | ${new Date(order.createdAt).toLocaleString('pt-BR')}<br />
      Pontos ganhos: ${order.pointsEarned}<br />
      ${itemSummary}<br />
      <strong>Total:</strong> R$ ${order.total.toFixed(2)}<br />
      ${order.reward ? `<strong>Produto grátis:</strong> ${order.reward.item.name}` : ''}
      <pre>${order.printReceipt || ''}</pre>
    `;

    ordersList.appendChild(card);
  });
}

customerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(customerForm);
  const payload = {
    name: form.get('name'),
    phone: form.get('phone'),
    cpf: form.get('cpf')
  };

  try {
    const response = await fetchJson('/api/customers', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    customerForm.reset();
    await loadCustomers();
    await loadNotifications();
    showToast(response.message || 'Cliente cadastrado.');
  } catch (error) {
    showToast(error.message, 'warning');
  }
});

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const customerId = customerSelect.value;
  const selectedItems = Array.from(document.querySelectorAll('.menu-item')).map((item) => {
    const input = item.querySelector('input');
    const id = item.dataset.id;
    const quantity = Number(input.value || 0);
    if (quantity > 0) return { id, quantity };
    return null;
  }).filter(Boolean);

  if (!customerId || selectedItems.length === 0) {
    showToast('Selecione um cliente e pelo menos 1 item.', 'warning');
    return;
  }

  try {
    const payload = {
      customerId,
      items: selectedItems,
      rewardSelection: rewardSelection.value || null
    };

    const response = await fetchJson('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    playAlertSound();
    showToast('Pedido confirmado e enviado para WhatsApp e impressão.', 'success');

    await loadCustomers();
    await loadNotifications();
    await loadOrders();

    console.log('WhatsApp:', response.whatsapp);
    console.log('Impressão:', response.print);
  } catch (error) {
    showToast(error.message, 'warning');
  }
});

customerSelect.addEventListener('change', updateRewardOptions);
soundButton.addEventListener('click', playAlertSound);

function buildMenu() {
  const items = [
    { id: 'sashimi', name: 'Sashimi Especial', category: 'Entrada', price: 35 },
    { id: 'niguiri', name: 'Niguiris Clássicos', category: 'Entrada', price: 28 },
    { id: 'salada', name: 'Salada Japonesa', category: 'Entrada', price: 25 },
    { id: 'temaki', name: 'Temaki de Salmão', category: 'Entrada', price: 32 },
    { id: 'dorayaki', name: 'Dorayaki', category: 'Sobremesa', price: 18 },
    { id: 'mochi', name: 'Mochi', category: 'Sobremesa', price: 16 },
    { id: 'sorvete', name: 'Sorvete de Matcha', category: 'Sobremesa', price: 20 },
    { id: 'cheesecake', name: 'Cheesecake Japonesa', category: 'Sobremesa', price: 22 },
    { id: 'sushiCombo', name: 'Combo Sushi Premium', category: 'Principal', price: 70 },
    { id: 'hotRoll', name: 'Hot Roll', category: 'Principal', price: 42 }
  ];

  state.menu = items;
  menuItemsContainer.innerHTML = '';

  items.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'menu-item';
    wrapper.dataset.id = item.id;
    wrapper.innerHTML = `
      <div class="meta">
        <strong>${item.name}</strong>
        <small>${item.category}</small>
      </div>
      <div class="price">R$ ${item.price.toFixed(2)}</div>
      <input type="number" min="0" value="0" aria-label="Quantidade de ${item.name}" />
    `;
    menuItemsContainer.appendChild(wrapper);
  });
}

async function init() {
  buildMenu();
  await loadCustomers();
  await loadNotifications();
  await loadOrders();
}

init();

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f7f3f0;
  color: #1f2937;
}

.container {
  width: min(1200px, 95%);
  margin: 0 auto;
  padding: 30px 0 50px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.eyebrow {
  color: #d97706;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
  font-size: 12px;
}

h1, h2 {
  margin: 0 0 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 22px;
}

.dashboard {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 22px;
  margin-top: 22px;
}

.card {
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

input, select, button {
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 12px 14px;
  font-size: 14px;
}

button {
  background: #ef4444;
  color: #fff;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  opacity: 0.92;
}

.secondary-btn {
  background: #111827;
}

.item-list {
  display: grid;
  gap: 10px;
  max-height: 260px;
  overflow: auto;
  padding-right: 4px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
}

.menu-item .meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item .price {
  font-weight: 700;
  color: #b45309;
}

.menu-item input {
  width: 56px;
  text-align: center;
}

.customer-list, .notification-list, .orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.customer-card, .order-card, .notification-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fffaf5;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  margin-top: 8px;
}

.badge.success {
  background: #dcfce7;
  color: #166534;
}

.badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.notification-card.info {
  background: #eff6ff;
}

.notification-card.success {
  background: #ecfdf5;
}

.notification-card.warning {
  background: #fff7ed;
}

.order-card pre {
  background: #111827;
  color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 12px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

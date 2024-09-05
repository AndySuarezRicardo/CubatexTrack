let orders = {};

//API personalizada de Google Apps Script
const sheetUrl = 'https://script.google.com/macros/s/AKfycbw986WJGISUY0_JJXJUHDMRoc0NMG4Fbdqjb0B79FdVQYHnlRrUcnObSZoMorunT9hq/exec';

function loadOrders() {
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(entry => {
                const trackingNumber = entry['Número de Seguimiento'];
                const status = entry['Estado del Pedido'];
                orders[trackingNumber] = status;
            });
        })
        .catch(error => console.error('Error:', error));
}

function trackOrder() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const orderStatus = document.getElementById('orderStatus');

    if (orders[trackingNumber]) {
        orderStatus.textContent = `Estado del pedido: ${orders[trackingNumber]}`;
    } else {
        orderStatus.textContent = 'Número de seguimiento no encontrado';
    }
}

document.addEventListener('DOMContentLoaded', loadOrders);


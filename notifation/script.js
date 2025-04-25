document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.querySelector('.notification-list');
    const emptyState = document.querySelector('.empty-notifications');

    // Register update callback
    notificationManager.onNotificationsUpdate = (notifications) => {
        renderNotifications(notifications);
    };

    function renderNotifications(notifications) {
        notificationList.innerHTML = '';
        
        if (notifications.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            notifications.forEach(notif => {
                const item = document.createElement('li');
                item.className = `notification-item ${notif.read ? '' : 'unread'}`;
                item.dataset.id = notif.id;
                item.innerHTML = `
                    <div class="notification-icon">${notif.icon}</div>
                    <div class="notification-content">
                        <h3 class="notification-title">${notif.title}</h3>
                        <p class="notification-message">${notif.message}</p>
                        <p class="notification-time">${notif.time}</p>
                    </div>
                    <div class="notification-actions">
                        <button class="mark-as-read">✓ Read</button>
                        <button class="delete-notification">✕ Delete</button>
                    </div>
                `;
                notificationList.appendChild(item);
            });
        }
    }

    // Event delegation for actions
    notificationList.addEventListener('click', (e) => {
        const item = e.target.closest('.notification-item');
        if (!item) return;

        const id = parseInt(item.dataset.id);
        
        if (e.target.classList.contains('delete-notification')) {
            if (confirm("Delete this notification?")) {
                notificationManager.deleteNotification(id);
            }
        } else if (e.target.classList.contains('mark-as-read')) {
            notificationManager.markAsRead(id);
        }
    });

    // Initial render
    renderNotifications(notificationManager.notifications);
});
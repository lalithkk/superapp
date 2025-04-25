class NotificationManager {
    constructor() {
        this.notifications = this.loadNotifications();
        if (this.notifications.length === 0) {
            this.resetToDefaultNotifications();
        }
        this.setupEventListeners();
    }

    loadNotifications() {
        try {
            const stored = localStorage.getItem('notifications');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load notifications", e);
            return [];
        }
    }

    resetToDefaultNotifications() {
        this.notifications = [
            {
                id: 1,
                title: "Welcome!",
                message: "Thank you for using our service",
                time: new Date().toLocaleTimeString(),
                icon: "👋",
                read: false
            },
            {
                id: 2,
                title: "Getting Started",
                message: "Explore our features",
                time: new Date().toLocaleTimeString(),
                icon: "🚀",
                read: false
            }
        ];
        this.saveNotifications();
    }

    setupEventListeners() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'notifications') {
                this.notifications = this.loadNotifications();
                this.updateAllUI();
            }
        });
    }

    addNotification(title, message, icon = "🔔") {
        const newId = Date.now();
        const newNotif = {
            id: newId,
            title,
            message,
            time: new Date().toLocaleTimeString(),
            icon,
            read: false
        };
        this.notifications = [newNotif, ...this.notifications];
        this.saveNotifications();
        return newNotif;
    }

    deleteNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
    }

    markAsRead(id) {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveNotifications();
        }
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        window.dispatchEvent(new CustomEvent('notifications-updated'));
        this.updateAllUI();
    }

    updateAllUI() {
        this.updateBadges();
        if (typeof this.onNotificationsUpdate === 'function') {
            this.onNotificationsUpdate(this.notifications);
        }
    }

    updateBadges() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const totalCount = this.notifications.length;
        
        // Update all badges
        document.querySelectorAll('.notification-badge').forEach(badge => {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        });
        
        // Update notification count in notification page
        const countElement = document.querySelector('.notification-count');
        if (countElement) {
            countElement.textContent = totalCount;
        }
    }
}

// Initialize globally
window.notificationManager = new NotificationManager();

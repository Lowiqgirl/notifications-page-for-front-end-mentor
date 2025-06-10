const list = document.querySelector('.list');
const markReadBtn = document.getElementById('button-mark-all');
const unreadCountElem = document.querySelector('.notifications-counter');

const notifications = [
  {
    type: "follow",
    user: "Angela Gray",
    avatar: "./assets/images/avatar-angela-gray.webp",
    object: "",
    time: "5m ago",
    href: "/",
    unread: true,
  },
  {
    type: "join",
    user: "Jacob Thompson",
    avatar: "./assets/images/avatar-jacob-thompson.webp",
    object: "Chess Club",
    time: "1 day ago",
    href: "/",
    unread: true,
  },
  {
    type: "message",
    user: "Rizky Hasanuddin",
    avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
    message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    time: "5 days ago",
    href: "/",
    unread: false,
  },
  {
    type: "comment-image",
    user: "Kimberly Smith",
    avatar: "./assets/images/avatar-kimberly-smith.webp",
    time: "1 week ago",
    href: "/",
    unread: false,
    imageSrc: "./assets/images/image-chess.webp"
  },
  {
    type: "reaction",
    user: "Nathan Peterson",
    avatar: "./assets/images/avatar-nathan-peterson.webp",
    object: "5 end-game strategies to increase your win rate",
    time: "2 weeks ago",
    href: "/",
    unread: false,
  },
  {
    type: "leave",
    user: "Anna Kim",
    avatar: "./assets/images/avatar-anna-kim.webp",
    object: "Chess Club",
    time: "2 weeks ago",
    href: "/",
    unread: false,
  }
];

function getActionText(n) {
  switch(n.type) {
    case 'reaction':
      return `reacted to your recent post`;
    case 'follow':
      return `followed you`;
    case 'join':
      return `has joined your group`;
    case 'message':
      return `sent you a private message`;
    case 'comment-image':
      return `commented on your picture`;
    case 'leave':
      return `left the group`;
    default:
      return '';
  }
}

function renderNotifications() {
  list.innerHTML = ''; 
  notifications.forEach(n => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    if (n.unread) li.classList.add('unread');
    if (n.type === 'message') {
      // private msg
      li.innerHTML = `
        <div class="notification-avatar">
          <img src="${n.avatar}" alt="avatar" />
        </div>
        <div class="notification-card">
          <div class="notification-content">
            <a class="notification-nickname" href="#">${n.user}</a>
            <span class="notification-action">${getActionText(n)}</span>
            <div class="private-message-block">
              <span class="notification-time">${n.time}</span>
              <a class="notification-object private-message" href="${n.href}">${n.message}</a>
            </div>
          </div>
        </div>
      `;
    } else if (n.type === 'comment-image') {
      // notif with image
      li.innerHTML = `
        <div class="notification-avatar">
          <img src="${n.avatar}" alt="avatar" />
        </div>
        <div class="notification-card">
          <div class="notification-content">
            <a class="notification-nickname" href="#">${n.user}</a>
            <span class="notification-action">${getActionText(n)}</span>
          </div>
          <span class="notification-time">${n.time}</span>
        </div>
        <a class="notification-object" href="${n.href}">
          <img class="notification-image" src="${n.imageSrc}" alt="reaction image" />
        </a>
      `;
    } else {
      // other notifs
      li.innerHTML = `
        <div class="notification-avatar">
          <img src="${n.avatar}" alt="avatar" />
        </div>
        <div class="notification-card">
          <div class="notification-content">
            <a class="notification-nickname" href="#">${n.user}</a>
            <span class="notification-action">${getActionText(n)}</span>
            <a class="notification-object" href="${n.href}">${n.object || ''}</a>
          </div>
          <span class="notification-time">${n.time}</span>
        </div>
      `;
    }
    list.appendChild(li);
  });
}

function updateUnreadCount() {
  const unreadCount = notifications.filter(n => n.unread).length;
  unreadCountElem.textContent = unreadCount;
}

// mark all as read / notifications counter logic

markReadBtn.addEventListener('click', () => {
  // remove 'unread'
  document.querySelectorAll('.list-item.unread').forEach(li => {
    li.classList.remove('unread');
  });

  notifications.forEach(n => n.unread = false);
  unreadCountElem.textContent = '0';
});

// push example 

notifications.unshift({ //unshift instead of push cuz it pushes the file in the start of the list
  type: "reaction",
  user: "Mark Webber",
  avatar: "./assets/images/avatar-mark-webber.webp",
  object: "My first tournament today!",
  time: "5m ago",
  href: "/",
  unread: true,
});

renderNotifications();
updateUnreadCount();
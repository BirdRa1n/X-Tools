function hideUserElements(hide) {
    const avatarButton = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]');
    if (avatarButton) {
        avatarButton.style.display = hide ? 'none' : '';
    }
}

// Função para carregar estado inicial e reaplicar ao mudar DOM
function applyHideSetting() {
    chrome.storage.sync.get('hideUser', ({ hideUser }) => {
        hideUserElements(hideUser || false);
    });
}

// Aplicar logo ao carregar o script
applyHideSetting();

// Reaplicar sempre que o popup mudar o estado
document.addEventListener('toggleHideUser', (e) => {
    hideUserElements(e.detail);
});

// Reaplicar em caso de resize (opcional)
window.addEventListener('resize', applyHideSetting);

// Observar mudanças no DOM para reaplicar quando o botão aparecer
const observer = new MutationObserver(() => {
    applyHideSetting();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

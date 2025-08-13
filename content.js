function hideUserElements(hide) {
    const avatarButton = document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]');
    if (avatarButton) {
        avatarButton.style.display = hide ? 'none' : '';
    }
}

function hideAdsElements(hide) {
    const promotedSvgs = document.querySelectorAll('svg[viewBox="0 0 24 24"] path[d="M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.996V8h7v7z"]');

    promotedSvgs.forEach(svg => {
        const promotedElement = svg.closest('article') || svg.closest('div');
        if (promotedElement) {
            promotedElement.style.display = hide ? 'none' : '';
        }
    });
}

function applyHideSettings() {
    chrome.storage.sync.get(['hideUser', 'hideAds'], ({ hideUser, hideAds }) => {
        hideUserElements(hideUser || false);
        hideAdsElements(hideAds || false);
    });
}

applyHideSettings();

document.addEventListener('toggleHideUser', (e) => {
    hideUserElements(e.detail);
});

document.addEventListener('toggleHideAds', (e) => {
    hideAdsElements(e.detail);
});

window.addEventListener('resize', applyHideSettings);

const observer = new MutationObserver(() => {
    applyHideSettings();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
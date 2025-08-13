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

function setBackgroundColor(newColor) {
    // Cores padrão do Twitter
    const defaultDarkBg = 'rgb(0, 0, 0)';
    const defaultLightBg = 'rgb(255, 255, 255)';
    // Cor semi-transparente do Twitter
    const semiTransparentDarkBg = 'rgba(15, 20, 25, 0.75)';

    // Função para verificar se um elemento usa a cor padrão
    function usesDefaultColor(el) {
        const bgColor = getComputedStyle(el).backgroundColor;
        return bgColor === defaultDarkBg || bgColor === defaultLightBg || bgColor === semiTransparentDarkBg;
    }

    // Elementos raiz
    if (usesDefaultColor(document.documentElement)) {
        document.documentElement.style.backgroundColor = newColor;
    }
    if (usesDefaultColor(document.body)) {
        document.body.style.backgroundColor = newColor;
    }

    // Seletores de elementos principais
    const mainSelectors = [
        'main',
        '[data-testid="primaryColumn"]',
        '[data-testid="sidebarColumn"]',
        '[role="progressbar"]',
        '[aria-label="Linha do tempo"]',
        '[aria-label="Barra de navega o"]',
        '[role="tablist"]',
        '[role="tabpanel"]',
        '[role="dialog"]',
        '[role="menu"]',
        '[role="tooltip"]',
        '[data-testid="tweet"]',
        '[data-testid="tweetButton"]',
        '[data-testid="tweetTextarea_0"]',
        '.DraftEditor-root',
        '.public-DraftEditor-content',
        '.css-175oi2r',
        '.r-1oszu61',
        '[aria-live="polite"]'
    ];

    // Remover estilo r-5zmot
    document.querySelectorAll('.r-5zmot').forEach(el => {
        el.style = 'background-color: transparent !important;';
    });

    // Aplicar apenas a elementos com cores padr o
    mainSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (usesDefaultColor(el)) {
                el.style.backgroundColor = newColor;

                // Manter contraste para texto
                if (getComputedStyle(el).color === 'rgb(231, 233, 234)') {
                    el.style.color = newColor === defaultDarkBg ? 'rgb(231, 233, 234)' : 'rgb(15, 20, 25)';
                }
            }
        });
    });

    // Tratamento especial para a barra de rolagem
    if (getComputedStyle(document.documentElement).scrollbarColor.includes('rgb(22, 24, 28)') ||
        getComputedStyle(document.documentElement).scrollbarColor.includes('rgb(239, 243, 244)')) {
        document.documentElement.style.scrollbarColor =
            newColor === defaultDarkBg ? 'rgb(62, 65, 68) rgb(22, 24, 28)' : 'rgb(207, 217, 222) rgb(239, 243, 244)';
    }
}

// Function to apply all settings (hiding and colors) on page load
function applyAllSettings() {
    chrome.storage.sync.get(['hideUser', 'hideAds', 'backgroundColor'], ({
        hideUser,
        hideAds,
        backgroundColor
    }) => {
        hideUserElements(hideUser || false);
        hideAdsElements(hideAds || false);
        if (backgroundColor) {
            setBackgroundColor(backgroundColor);
        }
    });
}

// Apply settings on initial page load
applyAllSettings();

// Listen for DOM changes to re-apply settings (this is crucial for SPAs)
const observer = new MutationObserver(() => {
    applyAllSettings();
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Event listeners from popup.js
document.addEventListener('toggleHideUser', (e) => {
    hideUserElements(e.detail);
});

document.addEventListener('toggleHideAds', (e) => {
    hideAdsElements(e.detail);
});


document.addEventListener('updateBackgroundColor', (e) => {
    console.log('Updating background color to:', e.detail); // Depuração
    setBackgroundColor(e.detail);
});
const toggleHideUser = document.getElementById('toggleHideUser');
const toggleHideAds = document.getElementById('toggleHideAds');
const colorBg = document.getElementById('colorBg');
const toggleTheme = document.getElementById('toggleTheme');

function updateSetting(key, value, eventName) {
    chrome.storage.sync.set({
        [key]: value
    }, () => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabs[0].id
                    },
                    func: (state, event) => {
                        document.dispatchEvent(new CustomEvent(event, {
                            detail: state
                        }));
                    },
                    args: [value, eventName]
                });
            }
        });
    });
}

// Initial state from storage
chrome.storage.sync.get(['backgroundColor', 'isDarkTheme', 'hideUser', 'hideAds'], ({
    backgroundColor,
    isDarkTheme,
    hideUser,
    hideAds
}) => {
    if (backgroundColor) {
        colorBg.value = backgroundColor;
    }
    toggleTheme.checked = isDarkTheme || false;
    toggleHideUser.checked = hideUser || false;
    toggleHideAds.checked = hideAds || false;
});

// Event listener for color picker
colorBg.addEventListener('input', () => {
    const color = colorBg.value;
    chrome.storage.sync.set({
        backgroundColor: color
    }, () => {
        // Usa a mesma lógica de evento personalizado para o background
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabs[0].id
                    },
                    func: (color) => {
                        document.dispatchEvent(new CustomEvent('updateBackgroundColor', {
                            detail: color
                        }));
                    },
                    args: [color]
                });
            }
        });
    });
});

// Event listener for theme toggle
toggleTheme.addEventListener('change', () => {
    const isDark = toggleTheme.checked;
    const color = isDark ? '#000000' : '#ffffff';

    chrome.storage.sync.set({
        isDarkTheme: isDark,
        backgroundColor: color
    }, () => {
        colorBg.value = color;
        // Usa a mesma lógica de evento personalizado para o background
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabs[0].id
                    },
                    func: (color) => {
                        document.dispatchEvent(new CustomEvent('updateBackgroundColor', {
                            detail: color
                        }));
                    },
                    args: [color]
                });
            }
        });
    });
});

toggleHideUser.addEventListener('change', () => {
    updateSetting('hideUser', toggleHideUser.checked, 'toggleHideUser');
});

toggleHideAds.addEventListener('change', () => {
    updateSetting('hideAds', toggleHideAds.checked, 'toggleHideAds');
});
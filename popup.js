const toggleHideUser = document.getElementById('toggleHideUser');
const toggleHideAds = document.getElementById('toggleHideAds');

chrome.storage.sync.get(['hideUser', 'hideAds'], ({ hideUser, hideAds }) => {
    toggleHideUser.checked = hideUser || false;
    toggleHideAds.checked = hideAds || false;
});

toggleHideUser.addEventListener('change', () => {
    updateSetting('hideUser', toggleHideUser.checked, 'toggleHideUser');
});

toggleHideAds.addEventListener('change', () => {
    updateSetting('hideAds', toggleHideAds.checked, 'toggleHideAds');
});

function updateSetting(key, value, eventName) {
    chrome.storage.sync.set({ [key]: value }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: (state, event) => {
                        document.dispatchEvent(new CustomEvent(event, { detail: state }));
                    },
                    args: [value, eventName]
                });
            }
        });
    });
}
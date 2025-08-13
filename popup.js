const toggle = document.getElementById('toggleHide');

chrome.storage.sync.get('hideUser', ({ hideUser }) => {
    toggle.checked = hideUser || false;
});

toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ hideUser: toggle.checked }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (state) => {
                    document.dispatchEvent(new CustomEvent('toggleHideUser', { detail: state }));
                },
                args: [toggle.checked]
            });
        });
    });
});

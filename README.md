# X Tools

### A customizable browser extension for Twitter/X

**X Tools** is a browser extension in development that gives you more control over your experience on Twitter (now X). With simple controls, you can personalize the platform's appearance and hide elements you don't want to see.

---

## 🚀 Features

* **Customizable Background Color**: Choose any background color you like for your Twitter feed. [cite_start]The extension intelligently applies your color choice to the main page elements while maintaining text readability[cite: 8].
* [cite_start]**Dark/Light Theme Toggle**: Quickly switch between a dark (`#000000`) and light (`#ffffff`) theme with a single click[cite: 30].
* [cite_start]**Hide Ads**: Easily hide promoted content to enjoy a cleaner, ad-free timeline[cite: 1].
* [cite_start]**Hide User Avatar**: Optionally hide your user avatar button from the sidebar[cite: 1].

---

## 🛠️ How it Works

The extension uses JavaScript to manipulate the DOM (Document Object Model) of the Twitter/X website.

* [cite_start]`content.js`: This script runs on Twitter/X pages and contains the core logic for changing colors, hiding elements, and handling page updates[cite: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]. [cite_start]It listens for events from the popup and reapplies settings whenever the page's content changes, which is crucial for single-page applications like Twitter/X[cite: 13, 14, 15].
* `popup.js`: This script controls the extension's popup window. [cite_start]It saves your settings (like color choices and toggle states) to the browser's storage and sends commands to `content.js` to update the page in real-time[cite: 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38].
* `popup.html`: The HTML file for the user interface of the extension's popup, built with Tailwind CSS.
* `manifest.json`: The manifest file that defines the extension's properties, permissions (`storage`, `scripting`), and scripts.

---

## 🚧 Current Status

This project is currently in development. More features are planned, including:

* Hiding trends.
* Auto-liking posts.
* Auto-scrolling the timeline.
* The popup interface has placeholders for these features and more.

---

## 🤝 Contribution

Contributions are welcome! If you have suggestions or want to contribute, please open an issue or submit a pull request.

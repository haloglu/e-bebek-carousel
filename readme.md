# 🧸 e-Bebek Homepage Carousel

This project is a custom-built JavaScript carousel designed for the homepage of **e-bebek.com**. It replicates the existing carousel's appearance and behavior with clean, modern code written entirely in vanilla JavaScript.

## 📌 Key Features

- 📍 **Homepage Targeting**: Executes only on the homepage (`e-bebek.com`). If run elsewhere, it safely exits.
- 🛒 **Product Carousel**: Displays a list of products fetched from an external JSON file.
- 💾 **Smart Caching**: Product data is stored in `localStorage` to prevent unnecessary API requests.
- ❤️ **Favorites**: Users can click a heart icon to add or remove products from their favorites, which are stored locally.
- 🏷️ **Discount Display**: If a product has a discounted price, the original price and discount percentage are shown.
- 🖱️ **Drag-to-Scroll**: Users can scroll the carousel by dragging with the mouse.
- ⏩ **Navigation Buttons**: Includes "Next" and "Previous" buttons for convenient navigation.
- 🔗 **External Links**: Clicking on a product card opens the product page in a new tab.

## 🔄 Data Source

Product data is dynamically fetched from the following endpoint:

https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json

---

Thanks for checking out the project! ✨

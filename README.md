# HashSpiraleFibonacci 🌀🔑

A captivating project that intertwines hashing algorithms, golden spirals, and the Fibonacci sequence to create a unique and visually engaging experience. This project features a backend API built with Flask that calculates the hash of user-provided text using a custom hashing algorithm. The frontend, composed of HTML, CSS, and JavaScript, provides an interactive interface for users to input text, trigger the hashing process, and visualize the results. The golden spiral is rendered using SVG, adding an aesthetic touch.

**Core Features:**

*   **Custom Hashing Algorithm:** Implements a unique hashing algorithm using the golden ratio for enhanced security and uniqueness.
*   **Interactive Frontend:** Provides a user-friendly interface for interacting with the hashing functionality.
*   **Dynamic Text Animation:** Features a decoder-style animation for the word "Fibonacci" using GSAP.
*   **Local Storage:** Saves the last entered plaintext in local storage for user convenience.
*   **Dynamic Menu Injection:** Uses JavaScript to dynamically inject the menu HTML, CSS styles, and theme toggle script into the main HTML page.
*   **Golden Spiral Visualization:** Renders a visually appealing golden spiral using SVG.

## 🚀 Key Features

*   **API Endpoint for Hashing:** `/api/hash` endpoint receives plaintext and returns its hash value.
*   **Frontend Pages:** Serves `index.html` and `hash.html` for the user interface.
*   **Custom Hash Class:** Implements a custom hashing algorithm using the golden ratio.
*   **Fibonacci Text Animation:** Animates the word "Fibonacci" with a decoder effect.
*   **Local Storage Persistence:** Remembers the last entered plaintext using local storage.
*   **Dynamic Menu:** Injects the menu dynamically using JavaScript.

## 🛠️ Tech Stack

*   **Backend:**
    *   `Python`: Programming language.
    *   `Flask`: Web framework for creating the API.
    *   `pathlib`: For handling file paths.
    *   `decimal`: For precise calculations with the golden ratio.
*   **Frontend:**
    *   `HTML`: Structure of the web pages.
    *   `CSS`: Styling of the web pages.
    *   `JavaScript`: Interactivity and dynamic content.
    *   `GSAP (GreenSock Animation Platform)`: JavaScript library for creating animations.
*   **Other:**
    *   `UTF-8`: Encoding for strings.
    *   `JSON`: Data format for API requests and responses.
    *   `localStorage`: Browser API for local storage.
    *   `fetch API`: Browser API for making HTTP requests.
    *   `SVG`: For rendering the golden spiral.
    *   `Google Fonts`: For styling the menu.

## 📦 Getting Started / Setup Instructions

### Prerequisites

*   Python 3.6+
*   `pip` package installer
*   Node.js and npm (if you want to modify the frontend)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [<repository_url>](https://github.com/RomanImperator/HashSpiraleFibonacci.git)
    cd HashSpiraleFibonacci
    ```

2.  **Create a virtual environment (recommended):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate.bat  # On Windows
    ```

3.  **Install backend dependencies:**

    ```bash
    cd backend
    pip install -r requirements.txt
    cd ..
    ```

4.  **Install frontend dependencies (optional, if you plan to modify the frontend):**

    ```bash
    cd frontend
    npm install # or yarn install
    cd ..
    ```

### Running Locally

1.  **Start the backend:**

    ```bash
    cd backend
    python src/app.py
    ```

    The backend will run on `http://127.0.0.1:5000`.

2.  **Open the frontend:**

    Open `frontend/index.html` in your browser. The frontend will automatically connect to the backend API.

## 📂 Project Structure

```
HashSpiraleFibonacci/
├── backend/
│   ├── src/
│   │   ├── app.py          # Flask application
│   │   ├── hash.py         # Hashing algorithm implementation
│   │   └── __init__.py
│   ├── requirements.txt  # Backend dependencies
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── FibonacciAnimation.js # Fibonacci text animation
│   │   ├── hash.js             # Frontend logic for hashing
│   │   ├── inject-menu.js      # Menu injection script
│   │   └── ...
│   ├── assets/
│   │   ├── index.css       # Styles for the main page
│   │   └── ...
│   ├── index.html        # Main HTML file
│   └── ...
├── docs/
│   ├── architettura.md   # Architecture documentation (empty)
│   ├── api.md            # API documentation (empty)
│   └── ...
├── README.md         # This file
└── ...
```

## 📸 Screenshots

(Add screenshots of the application in action here)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [your_email@example.com](mailto:your_email@example.com).

## 💖 Thanks Message

Thank you for checking out the HashSpiraleFibonacci project! I hope you find it interesting and useful. Your feedback and contributions are highly appreciated.

This is written by [readme.ai](https://readme-generator-phi.vercel.app/).

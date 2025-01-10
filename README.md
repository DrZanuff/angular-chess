# Angular Chess Project

This project is a web-based chess application built using Angular. The application supports playing chess on an interactive board and features functionalities such as FEN-based state saving and game state persistence using LocalStorage.

## Features

- **Interactive Chess Board**: A visually appealing and functional chessboard interface.
- **Two-Player Mode**: Allows two players to compete in real-time using iframes for separate views.
- **Game State Persistence**: Saves the game state in LocalStorage, enabling users to resume their game if they close the browser.
- **Game End Detection**: Detects and announces events like checkmate.
- **Responsive Design**: Optimized for different screen sizes.

## Technologies Used

### Framework

- **Angular**: The core framework for building the application.

### Libraries

- [**ngx-chess-board**](https://github.com/grzegorz103/ngx-chess-board): Used for rendering the chessboard and handling chess piece movement.
- [**chess.js**](https://github.com/jhlywa/chess.js): A powerful library for chess logic and game rules implementation.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- Angular CLI (v15 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   ng serve
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Special thanks to the maintainers of:

- [ngx-chess-board](https://github.com/grzegorz103/ngx-chess-board) for the chessboard component.
- [chess.js](https://github.com/jhlywa/chess.js) for chess logic handling.

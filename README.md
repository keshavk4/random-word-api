# Random Word API

Get random word along with its definition and pronunciation using this API.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/keshavk4/random-word-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Make a GET request to `/` endpoint to fetch the word of the day:

    ```bash
    curl http://localhost:3000/word
    ```

    Example response:

    ```json
    {
        "word": "lignite",
        "definition": "woody coal",
        "pronunciation": "liknite"
    }
    ```

## :warning: Disclaimer

We don't own any data or word. All belongs to the owner of Website. Use it for educational purpose only.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find any bugs or want to add new features.

## License
This project is released under the [MIT License](https://opensource.org/license/mit). See [LICENSE](LICENSE) for more details.
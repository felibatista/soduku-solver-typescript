# Sudoku Solver
This repository contains a TypeScript implementation of a Sudoku solver that uses the backtracking algorithm. The solution is capable of solving Sudokus up to 16x16, providing a versatile and efficient tool for tackling different difficulty levels and grid sizes.

## Features
- Efficient Backtracking: The backtracking algorithm has been optimized to ensure fast performance even on large Sudokus.

- Size Adaptability: The solution is capable of handling standard 9x9 Sudokus as well as larger 16x16 Sudokus, making it a flexible tool for different variants of the game.

- Easy Integration: The code has been organized in a modular fashion for easy integration into existing projects. You can use the implementation as a stand-alone module or incorporate it into your own application.

## How to use
Step 1️⃣
```bash
git clone https://github.com/felibatista/sudoku-solver
```
Step 2️⃣
```bash
## Define the Sudoku board (0 for empty cells)
sudoku_board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    # ... (rest of the board)
]

## Call solve sudoku function
solve_sudoku(sudoku_board)

# Print the result
print(sudoku_board)
```


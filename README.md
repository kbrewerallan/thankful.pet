# Sample Project

## How to Run the Tests

To run the tests in this project, follow these steps:

1. **Install Dependencies**  
    Ensure you have Node.js installed on your system. Then, install the required dependencies by running:
    ```bash
    npm install
    ```

2. **Run Tests**  
    Use the following command to execute the tests:
    ```bash
    npx playwright test
    ```

3. **View Test Results**  
    After running the tests, you can view the results in the terminal. To open the Playwright Test Report, run:
    ```bash
    npx playwright show-report
    ```

4. **Run a Specific Test**  
    To run a specific test file, use:
    ```bash
    npx playwright test tests/<test-file-name>.spec.ts
    ```

5. **Run Tests with a UI**  
    To run the tests with the playwright UI visualiser:
    ```bash
    npx playwright test --ui
    ```

## Test Command Summary

| Command                                              | Description                       |
| ---------------------------------------------------- | --------------------------------- |
| `npm install`                                        | Install all project dependencies. |
| `npx playwright test`                                | Run all tests in the project.     |
| `npx playwright show-report`                         | Open the Playwright Test Report.  |
| `npx playwright test tests/<test-file-name>.spec.ts` | Run a specific test file.         |

## Improvements

| Area                    | Current State                                                      | Improvement Suggestion                                                                   |
| ----------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Testing Weather Map     | Test browsers do not load the map, making interactions impossible. | Understand how the map works and implement an appropriate test framework / logic for it. |
| Dependency Installation | Install all project dependencies.                                  | Add a pre-check for Node.js version.                                                     |
| Test Execution          | Run all tests in the project.                                      | Provide an option to run tests in parallel.                                              |
| Test Organization       | Tests are grouped but lack modularity.                             | Refactor tests into smaller, reusable functions and group logically using test.describe. |
| Error Handling          | Some tests lack robust error handling.                             | Add proper null/undefined checks and improve TypeScript type safety.                     |

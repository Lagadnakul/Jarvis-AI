# Contributing to Jarvis AI

Thank you for considering contributing to Jarvis AI! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs

- **Check if the bug has already been reported** by searching GitHub Issues.
- If you're unable to find an open issue addressing the problem, open a new one.
- Include a **clear title and description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- Open a new issue.
- Provide a **clear title and description** of the enhancement.
- Explain why this enhancement would be useful to most Jarvis AI users.
- List any similar existing features or implementations you know of.

### Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **Install development dependencies** to ensure a consistent environment.
3. **Make your changes** and add tests if applicable.
4. **Ensure the test suite passes** if applicable.
5. **Update documentation** if necessary.
6. **Submit your pull request** with a clear description of the changes.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file with necessary environment variables (see README for details)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* Use ES modules (`import`/`export`) over CommonJS (`require`/`module.exports`)
* Use async/await for asynchronous code when possible
* Follow the ESLint configuration included in the project

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation.
* Document all API endpoints, input parameters, and response formats.

## Additional Notes

### Issue and Pull Request Labels

Issue labels are used to track and manage issues and pull requests.

* `bug` - Something isn't working
* `documentation` - Improvements or additions to documentation
* `enhancement` - New feature or request
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

Thank you for contributing to Jarvis AI!

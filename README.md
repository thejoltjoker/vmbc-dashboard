<div align="center">
  <img src="https://cdn-old.brawlify.com/club/8000017.png" width="100" height="112">
  <h1>Vacay Mania Brawl Club</h1>
  <a href="https://brawl.vacaymania.se">Dashboard</a>
  <p>Brief description of your project. What does it do? Why should people use it?</p>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
  - [Preview](#preview)
  - [Preview on Azure Static Web Apps](#preview-on-azure-static-web-apps)
  - [Type Checking](#type-checking)
  - [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
  - [Bug Reports](#bug-reports)
  - [Feature Requests](#feature-requests)
  - [Pull Requests](#pull-requests)
- [License](#license)



## Features

- Win rate for each club member


## Usage

### Prerequisites

Before you start, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.js.org/) (we recommend using pnpm for faster installs)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thejoltjoker/vmbc-dashboard.git
   ```

2. Change into the project directory:

   ```bash
   cd vmbc-dashboard
   ```

3. Install dependencies using pnpm (or npm):

   ```bash
   pnpm install
   # or
   # npm install
   ```

### Development

To run the project in development mode, use the following command:

```bash
pnpm dev
# or
# npm run dev
```

This will start the development server using Vite.

### Build

To build the project for production, run:

```bash
pnpm build
# or
# npm run build
```

### Preview

To preview the production build locally, use:

```bash
pnpm preview
# or
# npm run preview
```

### Preview on Azure Static Web Apps

For previewing on Azure Static Web Apps, build and start the local server:

```bash
pnpm run preview:azure
# or
# npm run preview:azure
```

This script builds the project and starts the local server, mimicking the production environment with Azure Functions.

### Type Checking

To perform TypeScript type checking, run:

```bash
pnpm type-check
# or
# npm run type-check
```

### Linting and Formatting

Lint your code using ESLint and format it with Prettier:

```bash
pnpm lint
# or
# npm run lint
```

```bash
pnpm format
# or
# npm run format
```

Adjust the commands according to your preferred package manager (pnpm or npm).



## Contributing

Thank you for considering contributing to the project! Whether it's reporting a bug, submitting a feature request, or contributing code, your help is appreciated.

### Bug Reports

If you find a bug in the project, please open an issue on the [issue tracker](https://github.com/thejoltjoker/vmbc-dashboard/issues) with a title and clear description of the problem. Provide any relevant details, such as error messages or screenshots, to help us understand and resolve the issue.

### Feature Requests

If you have a feature idea or enhancement you'd like to see, feel free to open an issue on the [issue tracker](https://github.com/thejoltjoker/vmbc-dashboard/issues) with the "Feature Request" label. Describe the new feature and explain why it would be beneficial.

### Pull Requests

If you'd like to contribute code to the project, you can do so by following these steps:

1. Fork the project repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Description of changes'`.
4. Push your changes to your fork: `git push origin feature-name`.
5. Open a pull request on the [pull request page](https://github.com/thejoltjoker/vmbc-dashboard/pulls) of the original repository.

Please make sure to follow the existing coding style and include relevant tests if applicable. Your contribution will be reviewed, and feedback will be provided before merging.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



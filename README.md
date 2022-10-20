# NEAR Onfido KYC [![NEAR](https://img.shields.io/badge/NEAR-%E2%8B%88-111111.svg)](https://near.org/) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

> A KYC flow integrating Onfido's API used by NEAR Foundation for legal purpose

## Technology stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Onfido](https://documentation.onfido.com/)
- [Yarn](https://yarnpkg.com/)
- [Playwright](https://playwright.dev/)

## Guides

### Configuration

```bash
cp .env.development.local.example .env
# edit variables on .env
```

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Deployment

```bash
yarn install
yarn build
yarn start
```

### Tests

If `BUILD_AND_SERVE_WEBSITE_BEFORE_RUNNING_TEST=true` is set in `.env` the website will be built and served every time you run the test command. It is recommended with CI/CD tools.

If you want instead to run the test locally many times for development purpose you may want to set `BUILD_AND_SERVE_WEBSITE_BEFORE_RUNNING_TEST=false` and run `yarn dev` or `yarn build && yarn start` in a separate terminal before running any test. It will run the tests a lot faster by skipping the build step.

```bash
# install testing dependencies (once only)
npx playwright install --with-deps

# headless test
yarn test

# headed test
yarn test:headed

# test with debug mode
yarn test:debug

# serve test reports
yarn test:report
```

## Authors

- [Ryan](https://github.com/ryancwalsh)
- [Sandoche](https://github.com/sandoche)

## License

[GPLv3](LICENSE)

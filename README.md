![coverage-lines-badge](https://img.shields.io/badge/Lines-89.55%25%20%28557%2F622%29-brightgreen.svg)
![coverage-statements-badge](https://img.shields.io/badge/Statements-90.58%25%20%28644%2F711%29-brightgreen.svg)
![coverage-functions-badge](https://img.shields.io/badge/Functions-96.67%25%20%28145%2F150%29-brightgreen.svg)
![coverage-branches-badge](https://img.shields.io/badge/Branches-77.05%25%20%2847%2F61%29-yellow.svg)
![Local Coverage-shield-badge-1](https://img.shields.io/badge/Local%20Coverage-100%25-brightgreen.svg)

# WolkAbout client library

Node.js/Web client library for using [WolkAbout REST APIs](https://restapi.wolkabout.com/).

## Getting Started

### Installation

This library is distributed on `npm`. In order to add it as a dependency, run the following command:

`$ npm install wolk-rest`

### First example

Create a new instance of the WolkREST with your baseURL and [SessionStorage](src/model/SessionStorage.ts) [optional].

```typescript
const wolkREST = new WolkREST('https://api-verification3.wolksense.com');

// continue by signing in
async () => {
  const user = await wolkRest.auth().emailSignIn({
    username: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD'
  });
};
```

### Samples
There are several [samples](/samples). If you're trying to figure out how to use an API ... look there first!
If there's a sample you need missing, feel free to file an [issue](https://github.com/Wolkabout/wolk-rest/issues/new).

### Reference API
This library provides generated [Reference API documentation](https://wolkabout.github.io/wolk-rest).

## Contributing

Contributions are always welcome! Please read the contribution guidelines first.
- [Contributing guide](.github/CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)

## License

This library is licensed under [Apache 2.0](LICENSE.md).

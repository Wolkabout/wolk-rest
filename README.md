![coverage-lines-badge](https://img.shields.io/badge/Lines-81.18%25%20%28345%2F425%29-yellow.svg)
![coverage-statements-badge](https://img.shields.io/badge/Statements-81.17%25%20%28401%2F494%29-yellow.svg)
![coverage-functions-badge](https://img.shields.io/badge/Functions-86.92%25%20%2893%2F107%29-brightgreen.svg)
![coverage-branches-badge](https://img.shields.io/badge/Branches-75%25%20%2821%2F28%29-yellow.svg)
![Local Coverage-shield-badge-1](https://img.shields.io/badge/Local%20Coverage-100%25-brightgreen.svg)

# WolkAbout SDK

TypeScript and JavaScript SDK for the [WolkAbout REST API](https://restapi.wolkabout.com/).

## Getting Started

The WolkAbout SDK is asynchronous and all functions return promises.

### Creating a client

Create a new instance of the WolkREST with your baseURL.

```typescript
const wolkREST = new WolkREST({
  baseURL: 'https://api-verification3.wolksense.com'
});
```

### Reference API

This library provides generated [Reference API documentation](https://wolkabout.github.io/wolk-rest).

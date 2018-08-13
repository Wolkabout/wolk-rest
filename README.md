![coverage-lines-badge](https://img.shields.io/badge/Lines-77.69%25%20%28310%2F399%29-yellow.svg)
![coverage-statements-badge](https://img.shields.io/badge/Statements-77.68%25%20%28362%2F466%29-yellow.svg)
![coverage-functions-badge](https://img.shields.io/badge/Functions-82%25%20%2882%2F100%29-yellow.svg)
![coverage-branches-badge](https://img.shields.io/badge/Branches-70.83%25%20%2817%2F24%29-yellow.svg)
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

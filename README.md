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

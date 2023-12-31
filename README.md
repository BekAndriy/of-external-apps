# External APPs placeholders

Each route is responsible for part of functionality and can be separated by projects. Apps are **OpenFin** oriented.

Pages should not have cross routes dependencies.

## Installations

Install all dependencies required for the project

```
npm install
```

## Development

Launch dev server with hot-reloader

```
npm run start:dev
```

Validate and format code

```
npm run prettier
```

## Build

For production

```
npm run build

# OR

npm run build:prod
```

For development including Source-map.

```
npm run build:dev
```

## Deployment

Deploy build to the Azure Account Storage

```
npm run deploy
```

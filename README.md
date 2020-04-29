# Quickly build a web app with typescript and react

This originally was an idea for a bundler (you can see the readme at this commit bece93ceb6fb2c4ad042dbf6046da87942df99f3), but since there's already some pretty awesome bundlers out there, I decided to just make this some boiler plate for starting new projects.

TODO:

- Finish with todos in source code
- Add a mock app with memory backed collections, client code, and server code all in the same process (should be importable both in the browser & node)
- Add testing
- Create the minimal front end react app
- Create a server side router and routes
- More advanced stuff like server side rendering & progressive web apps, etc.

---

# Documentation for features that may not exist yet

## Getting started

`yarn && yarn start`

## Adding features

To add a new client route `yarn run add view NewFeature '' '/some-url'`
To add a new client view component `yarn run add view NewFeature '' `
To add a new server endpoint `yarn run add endpoint NewFeature '' '/api/some-url'`
To add a new shared component `yarn run add function NewFeature` or `yarn run add NewFeature class`
To add a new database collection `yarn run add data NewFeature '' 'collection-name'`

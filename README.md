# My Stack
This will be a full stack I put together for my own javascript web apps.

Eventually it will have a tool that you can install, and will handle packages, etc.

For now I have... a readme.

#Ideas for the perfect stack

I like the idea of building a full stack that:

- You use a tool in development to compile the app
- Compiles templates to either html or javascript
- Makes it super clear what your static assets look like
- Pre-compiles where ever possible
- Is very transparent
- Is built from different open-source modules, but
- Works together really well as a whole
- Is easily modified to build cli tools and desktop apps (electron)
- Provides a single paradigm/pattern and easy to use tooling around packages/modules/imports
- Updated and extended by pulling code from repositories (maybe using a git-based custom merge tool)

#Ideas for Components/paradigms to use

- feathers.js
- mithril.js
- webpack
- es6 modules?
- rethinkdb
- postgresql (if using graphql the schema is static for a given build, so any kind of package that can generate and migrate the db from a given schema would work)
- graphql? if so, apollo
- websockets
- redux?
- flow
- gulp
- glamor
- babel
- auth0
- squirrel keys
- Docker
- contracts https://gist.github.com/cwohlman/068de55489ebc23f74fe
- graphql to sql https://github.com/stems/join-monster
- event sourcing?
   I think the default data model should use event sourcing, and/or a state model similar to redux,
   but actually persisting the events can be optional if there's a performance penalty to worry about.

#Inspiration

- Meteor, the best full stack javascript development solution yet
- Horizon js, a really cool platform for building web apps on rethinkdb
- graphcool
- [nextjs](https://zeit.co/blog/next)
- [init.js](https://github.com/picanteverde/init)
- https://zeit.co/now
- https://github.com/cwohlman/meteor-tool-idea
- https://github.com/cwohlman/event-sourced-example

#Goals

- Full stack:
  - tool
  - database
  - model layer/orm/event-sourcing
  - client & server side routing
  - server-side middleware
  - websockets/livedata/ddp
  - client-side view layer
- Fully reactive (like meteor)
- User authentication & authorization
- Fully customizable, none of the code should be hidden or impossible to modify
- Light weight
- Composable stack
- Testable, testing built in

# Current Plan:

1. Run nginx and mongo in docker, share the nginx container (update the config) across multiple development projects, using a dynamically allocated port number and local dns. (For now remind the user to manually update their hosts file)
2. Run the tool using nodemon, build the app using one (or more) gulp tasks (I hope that gulp supports multiple, parallel watch tasks).
3. Use webpack to bundle client side
4. Use babel to transform (at a minimum) import-export syntax into the right syntax.
5. Use glamor to provide css, react to provide html, yarn for javascript package management
6. Folder Structure:

- tool - tool which runs the development server (javascript, but not configuration files, for now will include gulpfile.js, later gulpfile.js will be auto-generated?)
- src/server.js - entrypoint for the server
- src/client.js - entrypoint for the client
- server - node js app which is the server (generated)
- client - files which will be served to the client (generated), not all files will be served to the client, only those specified in client/program.json
- static - (maybe client/static?) pre-generated files for the client, e.g. a pregenerated index.html
- config - files which control the execution of the tool (but are not source files for the tool)

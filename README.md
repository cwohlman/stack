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

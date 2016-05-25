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

#Ideas for Components/paradigms to use

- mithril.js
- webpack
- es6 modules?
- rethinkdb
- graphql? if so, apollo
- websockets
- redux?
- contracts https://gist.github.com/cwohlman/068de55489ebc23f74fe
- event sourcing?
   I think the default data model should use event sourcing, and/or a state model similar to redux, 
   but actually persisting the events can be optional if there's a performance penalty to worry about.

#Inspiration

- Meteor, the best full stack javascript development solution yet
- Horizon js, a really cool platform for building web apps on rethinkdb
- [init.js](https://github.com/picanteverde/init)
- https://github.com/cwohlman/meteor-tool-idea
- https://github.com/cwohlman/event-sourced-example
- 

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

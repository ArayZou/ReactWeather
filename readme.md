### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ gulp build --release          # Builds the project in release mode
$ gulp deploy                   # or, `gulp deploy --production`
```

For more information see `deploy` task in `gulpfile.js`.

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch react-starter-kit
$ git merge react-starter-kit/master
$ npm install
```

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

Test any javascript module by creating a `__tests__/` directory where
the file is. Name the test by appending `-test.js` to the js file.
[Jest](https://facebook.github.io/jest/) will do the rest.

### Customizations

 * [Azure deployment](https://github.com/kriasoft/react-starter-kit/pull/106)

### Related Projects

 * [React Component Starter Kit](https://github.com/kriasoft/react-component-starter)
 * [React Decorators](https://github.com/kriasoft/react-decorators) (higher-order components)

### Learn More

 * [Getting Started with React.js](http://facebook.github.io/react/)
 * [React.js Wiki on GitHub](https://github.com/facebook/react/wiki)
 * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
 * [React.js Discussion Board](https://groups.google.com/forum/#!forum/reactjs)
 * [Flux Architecture for Building User Interfaces](http://facebook.github.io/flux/)
 * [Jest - Painless Unit Testing](http://facebook.github.io/jest/)
 * [Flow - A static type checker for JavaScript](http://flowtype.org/)
 * [The Future of React](https://github.com/reactjs/react-future)
 * [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)

### Support

Have feedback, feature request or need help? Contact me on [codementor.io/koistya](https://www.codementor.io/koistya).

### Copyright

Source code is licensed under the MIT License (MIT). See [LICENSE.txt](./LICENSE.txt)
file in the project root. Documentation to the project is licensed under the
[CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) license. React logo
image is a trademark of Facebook, Inc.

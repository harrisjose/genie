<a target='_blank' rel='nofollow noopener' href='https://app.codesponsor.io/link/T5F1SFV1gZFb51jKqxPnDwsg/harrisjose/genie'><img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/T5F1SFV1gZFb51jKqxPnDwsg/harrisjose/genie.svg' /></a>

# Genie

Custom built static site generator currently in use at [harrisjose.github.io](https://harrisjose.github.io)

- Written for Node v8.7+
- Uses handlebars for templating and markdown for content
- Latest ES version support and minification with [Babel](https://github.com/babel/babel)
- Autoprefixer and other css transforms using [PostCSS](http://postcss.org/)

## Usage

#### Folder Structure

```
- Root/
  - templates/
  - partials/
  - content/
    - blog/
      - post.md
    - about.md
    - index.html
  - assets/
    - css/
      - site.css
    - js/
      - index.js
    - images/
```
#### Configuration

Configuration from a `genie.js` file in your projects root folder is used if it exists. Genie should also work with defaults if no configuration file is found.

```javascript
/* genie.js */
{
  paths: {
    content: 'path/to/content',
    output: 'path/to/site',
    templates: 'path/to/templates',
    partials: 'path/to/partials',
    helpers: 'path/to/helpers'
  },
  data: {
    prop: 'Gobal data props',
  },
  postcss: {
    'postcss-plugin': { plugin-options }
  },
  babel: { config }
}
```

## About

#### Why?
Because, [this.](https://github.com/jlord/balrog)

#### TODO
Support for inlining source files   
Allow using a different config file for production builds.


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

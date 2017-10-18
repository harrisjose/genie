# Genie

Custom built static site generator currently in use at [harrisjose.github.io](https://harrisjose.github.io)

- Written for Node v8.7+
- Uses handlebars for templating and markdown for content
- Latest ES version support & minification with [Babel](https://github.com/babel/babel)
- Autoprefixer and other css transforms using [PostCSS]()

<a target='_blank' rel='nofollow noopener' href='https://app.codesponsor.io/link/T5F1SFV1gZFb51jKqxPnDwsg/harrisjose/genie'><img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/T5F1SFV1gZFb51jKqxPnDwsg/harrisjose/genie.svg' /></a>

### Why?
Because, [this.](https://github.com/jlord/balrog)

### TODO
- Support for inlining source files   
- Integrate Babel into build ( with support for  .babelrc)   
- Integrate PostCSS into build ( not sure about how to pass config though )   
- Allow using a different config file ( for production builds maybe ? )   

### Folder Structure

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
### Configuration

The Configuration is basic and limited by design - Genie should work out of the box with defaults. Configuration from a `genie.js` file in your projects root folder is used if it exists.

```javascript
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
  js: {
    inline: true,
    transpile: true
  },
  css: {
    inline: true,
    transform: true
  }
}
```

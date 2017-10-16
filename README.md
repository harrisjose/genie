# Genie

Custom built static site generator currently in use at [harrisjose.github.io](harrisjose.github.io)

- Written for Node v8.7+
- Uses handlebars for templating and markdown for content
- Latest ES Version support through babel and minification with babli
- Autoprefixer and other css transforms using PostCSS

### Why?
Because, [this.](https://github.com/jlord/balrog)

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
    author: 'Sirrah Esoj',
  },
  js: {},
  css: {}
}
```

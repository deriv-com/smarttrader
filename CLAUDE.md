# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deriv SmartTrader is a hybrid single-page trading application that combines server-side React template compilation with client-side interactivity. The application pre-compiles React JSX templates into static HTML at build time, then uses a custom PJAX (push-state AJAX) implementation for seamless client-side navigation.

**Tech Stack**: React 16.14 (JSX templates), Grunt + Webpack 5, Babel 7, SASS 3, WebSocket-based real-time data, jQuery, Node 18.x

## Development Commands

### Initial Setup

```bash
npm ci                          # Install dependencies (use ci, not install)
```

### Development Workflow

```bash
npm run start                   # Start dev server with live reload and watch (https://localhost)
npm run serve                   # Start server with watch for JS/CSS changes only
npm run livereload              # Live reload without server

# After starting, configure test environment:
# 1. Visit https://localhost/en/endpoint.html
# 2. Set App ID and Server for testing
# 3. Login with test account
```

### Building & Compiling

```bash
# Template compilation
grunt shell:compile_dev                        # Compile all templates (development)
grunt shell:compile_dev --path=about-us        # Compile specific template path only
grunt shell:compile_production                 # Compile for production with minification

# Building
grunt                                          # Run default: test + css + js
grunt dev                                      # Build and deploy to gh-pages
grunt deploy                                   # Deploy only js/css changes

# Branch-specific deploys (creates sub-folder on gh-pages)
grunt dev --branch=branchname                  # Deploy to br_branchname/
grunt dev --cleanup                            # Remove all br_* folders
grunt shell:remove_folder --folder=br_name     # Remove specific branch folder
```

### Testing & Linting

```bash
npm test                        # Run all tests (eslint + stylelint + mocha)
npm run eslint                  # Fix ESLint errors automatically
grunt eslint                    # Run ESLint only
grunt stylelint                 # Run Stylelint for SASS
grunt mochaTest                 # Run Mocha tests
```

## Architecture Overview

### Hybrid Rendering Model

SmartTrader uses a unique hybrid approach:

1. **Build Time**: JSX templates in `/src/templates/` are compiled to static HTML files using `ReactDOMServer.renderToStaticMarkup()` via the `/scripts/render.js` script
2. **Runtime**: Static HTML is served, then JavaScript takes over for interactivity
3. **Navigation**: Custom PJAX (`binary_pjax.js`) handles in-page navigation without full reloads
4. **Localization**: Pre-compiled for 13+ languages (EN, DE, ES, FR, ID, IT, PL, PT, RU, TH, VI, ZH_CN, ZH_TW, ACH)

### Application Initialization Flow

```
index.js (entry point)
  ├── Load jQuery, polyfills, Binary style framework
  └── BinaryLoader.init() (/app/base/binary_loader.js)
      ├── Initialize core services (SSOLoader, Client, NetworkMonitor)
      ├── Set up PJAX routing
      └── Route to page handlers based on data-page attribute
```

**Page Configuration**: `binary_pages.js` maps URLs to page modules with metadata:

- `module`: Page handler (TradePage, etc.)
- `is_authenticated`: Requires login
- `only_virtual/only_real`: Account type restrictions
- `needs_currency`: Currency requirement
- `no_mf/no_blocked_country`: Access restrictions

### Core Systems

**BinarySocket** (`/src/javascript/_common/base/socket_base.js`): Centralized WebSocket manager

- Promise-based API: `BinarySocket.wait('authorize')`
- Subscription manager for real-time data streams
- Socket cache maintains state across reconnections

**Client** (`/src/javascript/_common/base/client_base.js`): User session management

- `Client.get('is_virtual')`, `Client.get('loginid')`
- `Client.isLoggedIn()`, `Client.isOptionsBlocked()`
- Centralized state for user account info

**BinaryPjax** (`/src/javascript/app/base/binary_pjax.js`): Client-side routing

- Push-state navigation without full page reloads
- Events: `binarypjax:before`, `binarypjax:after`
- Loads both full HTML and PJAX partials

### Template System

**Master Layout**: `/src/templates/_common/_layout/layout.jsx` wraps all pages

**Template Context** (available via `it` object in JSX):

- `it.L(text)`: Translation function
- `it.url_for(path, lang)`: URL builder
- `it.website_name`: Use instead of hardcoding "Deriv"
- `it.js_files`, `it.css_files`: Asset lists with cache-busting
- `it.language`, `it.languages`: Current/available languages
- `it.is_pjax_request`: Boolean for partial vs full render

**Compilation**: `render.js` uses React + Babel to transform JSX → static HTML at build time, not runtime

## Code Conventions

### AI Code Wrapping (CRITICAL)

**ALL AI-generated code MUST be wrapped with `[AI]` markers** per `.cursorrules`:

```javascript
function newFunction() {
  return "AI generated code";
}
```

**Rules**:

- Use appropriate comment syntax: `//` (JS), `#` (Python), `/* */` (CSS), `<!-- -->` (HTML)
- DO NOT nest markers
- DO NOT add comments on same line as markers
- DO NOT add markers to deleted/commented code
- Each code block needs separate markers

### Naming Conventions

| Type              | Convention      | Example                              |
| ----------------- | --------------- | ------------------------------------ |
| Variables         | snake_case      | `user_id`, `is_active`               |
| Functions         | camelCase       | `getUserData()`, `validateForm()`    |
| Modules/Classes   | PascalCase      | `BinaryLoader`, `TradePage`          |
| Boolean variables | is*/has* prefix | `is_valid`, `has_error`              |
| jQuery objects    | $ prefix        | `$form`, `$container`                |
| DOM elements      | el\_ prefix     | `el_content`, `el_button`            |
| Form elements     | Type prefix     | `txt_name`, `chk_tnc`, `ddl_agents`  |
| SASS variables    | UPPER_CASE      | `$COLOR_RED`, `$COLOR_LIGHT_BLACK_1` |
| CSS classes       | BEM (two-dash)  | `.block-name__elem-name--mod-name`   |

### JavaScript Patterns

**Module Pattern** (used throughout codebase):

```javascript
const MyModule = (() => {
  // Private state
  let private_var = {};

  // Private methods
  const privateMethod = () => {};

  // Public API
  const publicMethod = () => {};

  return {
    publicMethod,
  };
})();
```

**Page Lifecycle Contract**:

```javascript
module.exports = (() => {
  const onLoad = () => {
    // Initialize: socket subscriptions, DOM setup
  };

  const onUnload = () => {
    // Cleanup: unsubscribe, remove listeners
  };

  const onDisconnect = () => {
    // Handle socket disconnection
  };

  const onReconnect = () => {
    // Restore state after reconnection
  };

  return { onLoad, onUnload, onDisconnect, onReconnect };
})();
```

**Import Style**:

```javascript
// Use require (not import) for consistency
const moment = require("moment");
const CookieStorage = require("./storage").CookieStorage;
const applyToAllElements = require("./utility").applyToAllElements;
require("../../_common/lib/polyfills/array.includes");

// Align by = for readability
// Order: npm packages first, then relative paths (alphabetically)
// Unassigned requires at the end
```

### React/JSX Templates

**Functional Stateless Components**:

```jsx
import React from "react";

const MyComponent = ({ title, items }) => (
  <div className="component">
    <h1>{it.L(title)}</h1>
    {items && items.map((item) => <Item key={item.id} {...item} />)}
  </div>
);

export default MyComponent;
```

**Template Guidelines**:

- Use `{condition && <el/>}` for conditional rendering
- Use `<el attr={value || undefined}` for conditional attributes (React omits null/undefined)
- Use `it.L('...')` for translations (NOT hardcoded strings)
- Use `it.url_for('...')` for URLs
- Use `it.website_name` instead of "Deriv"
- Single space after opening `{`: `{ array.map(() => ())}`
- Boolean props: `<Element attributeName />` not `<Element attributeName={true} />`
- 4+ props: break to separate lines; <4 props: single line
- Always name components before default export

### SASS Guidelines

- Follow BEM naming: `.block-name__elem-name--mod-name`
- Variables in UPPERCASE with meaningful prefix: `$COLOR_RED`, `$COLOR_DARK_BLUE_1`
- Store common variables in `/src/sass/_common/base/constants.scss`
- Use `em` for padding/margin (maintains vertical rhythm)
- Use `px` for fixed values (border, box-shadow, border-radius)
- Base font-size: 10px = 1rem (divide px by 10 for em conversion)
- Use mixins to standardize colors across themes

### Comments

- Use `TODO: ...` for future considerations
- Use `API_V3: [description]` for hardcoded logic that should move to API V3
- Use `API_V4: [description]` for hardcoded logic that should move to API V4
- Add explanatory comments for confusing code

## Key Directories

```
/src
├── /javascript
│   ├── /app
│   │   ├── /base          # Core infrastructure (BinaryLoader, PJAX, Socket)
│   │   ├── /common        # Shared functionality (forms, charts)
│   │   ├── /pages         # Page-specific modules
│   │   └── /components    # React components
│   ├── /_common
│   │   ├── /base          # Core services (Socket, Client, GTM, Login)
│   │   └── /lib           # jQuery plugins, polyfills
│   ├── index.js           # Entry point
│   └── config.js          # App IDs, socket URLs, domain config
├── /templates             # React JSX (compiled to HTML at build)
│   ├── /app               # Trading platform templates
│   ├── /_common           # Layout, header, footer
│   └── /_autogenerated    # Auto-generated translation files
├── /sass                  # SASS source files (BEM patterns)
├── /translations          # Gettext .po/.pot files
└── /root_files            # Files for root (manifest.json, etc.)

/scripts
├── render.js              # Template compilation engine
├── common.js              # Build utilities
└── /config                # Build configuration (pages, sitemap)

/build
├── /webpack               # Webpack config (loaders, plugins)
└── /config                # Grunt configuration
```

## Translations

- Format: Gettext (.po/.pot files) in `/src/translations/`
- Template-level: `it.L()` calls replaced at build time
- JavaScript-level: Runtime translation via `localize()` function
- See `/scripts/README.md#Updating-the-translations` for manual translation updates

## Release Management

```bash
# Tag format: {RELEASE_TARGET}_vYYYYMMDD_{INTEGER}
# RELEASE_TARGET: staging or production

git tag production_v20191010_0 -m 'release fixes to production'
git push origin production_v20191010_0
```

Each release is backed up and deployed to Vercel:

- Production DR: https://smarttrader-dr.binary.sx
- Staging DR: https://staging-smarttrader-dr.binary.sx

## Testing Deployments

**Via Vercel (Recommended)**:

1. Push changes and create PR
2. GitHub Actions auto-deploys and generates test link
3. Register app at https://api.deriv.com/dashboard/
   - Redirect URL: `<TEST_LINK>/en/logged_inws.html`
   - Verification URL: `<TEST_LINK>/en/redirect.html`
4. Use App ID at `<TEST_LINK>/en/endpoint.html`

**Via gh-pages**:

1. Register at https://api.deriv.com/dashboard/
   - Redirect URL: `https://YOUR_GITHUB_NAME.github.io/smarttrader/en/logged_inws.html`
   - Verification URL: `https://YOUR_GITHUB_NAME.github.io/smarttrader/en/redirect.html`
2. Update `src/javascript/config.js` with App ID
   - Use `git update-index --assume-unchanged src/javascript/config.js` to avoid committing
3. Run `grunt dev`

## Important Notes

- **Node Version**: Use Node 18.x (check with `node -v`, switch with `nvm use 18`)
- **SSL Required**: Development server runs on HTTPS (https://localhost)
- **Template Changes**: Require re-compilation with `grunt shell:compile_dev`
- **Module System**: Uses CommonJS (`require`/`module.exports`), not ES6 imports
- **Code Splitting**: Webpack creates vendor chunk for node_modules
- **WebSocket-First**: Real-time trading data flows through BinarySocket, not REST
- **Multi-Tenant**: Single codebase supports multiple deployment targets with different configs

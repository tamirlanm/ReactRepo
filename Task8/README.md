# ProductExplorer — Task 8

[Live application](https://tamirlanm.github.io/ReactRepo/Task8/)

React product catalog using DummyJSON, Redux Toolkit, Firebase Authentication and a service worker.

## Redux Toolkit

- `catalog` contains the product records, the list IDs, and the list request state.
- `details` tracks detail requests by product ID. The detail page reads the product from the same shared records as the catalog.
- `stock` tracks the stock update by product ID.
- `fetchProducts` and `fetchProduct` load the list and details. `saveStock` sends a PATCH, then reloads the list and the affected product. DummyJSON simulates the update without saving it.
- `selectProducts`, `selectCategories`, and `selectCatalogPage` use `createSelector` to derive the list, category options, and filtered, sorted page. `selectProduct` looks up a single record by ID.
- GET requests share a two-minute freshness window. In-flight duplicates are skipped. Request IDs prevent replaced responses from overwriting newer ones.
- Catalog filters and pagination come from URL search parameters. Search is debounced by 300 ms. Firebase authentication remains in AuthContext.

## Run and deploy

1. Run `npm ci` inside `Task8`.
2. Copy `.env.example` to `.env.local` and set the Firebase web app configuration. Enable Email/Password and Google sign-in and authorize the local and hosted domains.
3. Run `npm run dev` for development, or `npm run build` and `npm run preview` to check the production service worker.
4. Run `npm run deploy` to publish the build under `Task8` on the `gh-pages` branch.

To test offline, open the production build while online, visit the catalog and a product, wait for the service worker to control the page, then switch the browser to offline and reload.
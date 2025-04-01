Directory Naming Conventions
----------------------------

Lowercase with hyphens: Use lowercase letters and hyphens (`-`) to separate words in directory names.

1.  Example: components, `shared`, `cart-panels`, `product-details`.

### Why Lowercase with Kebab-Case?

1.  **Cross-platform compatibility**: Some operating systems (e.g., Windows) are case-insensitive, while others (e.g., Linux) are case-sensitive. Using lowercase avoids potential issues when working across platforms.

2.  **Readability**: Kebab-case is easy to read and visually separates words clearly (e.g., `user-profile` vs. `userprofile`).

3.  **Consistency**: It aligns with conventions in many ecosystems, such as URLs, npm package names, and file paths.

4.  **Avoids conflicts**: Mixed-case naming (e.g., camelCase or PascalCase) can lead to confusion when importing files or directories, especially in case-sensitive environments.

* * * * *

Component Directories: Shared vs Feature-based
----------------------------------------------

-   If a component is **tightly coupled** to a feature, it belongs in the feature-based directory.

-   If a component is **decoupled** and can be reused across features, it belongs in the `shared` directory.

1.  **Place components in a **`shared`** directory if:**

    -   The component is **reusable across multiple features**.

        -   Example: A `Button` component used in multiple pages or features.

    -   The component is **generic** and does not rely on feature-specific logic or data.

        -   Example: A `Pagination` component or a `Modal` component.

    -   The component is **presentational only** and does not depend on feature-specific context.

        -   Example: A Card or `Spinner` component.

2.  **Place components in a feature-based directory if:**

    -   The component is **specific to a single feature** or domain.

        -   Example: A `CategoryCard` component that is tied to the category feature.

    -   The component relies on **feature-specific logic, props, or data**.

        -   Example: A `CartSummary` component that depends on cart-related data.

    -   The component is **unlikely to be reused** outside of its feature.

        -   Example: A `ProductDetail` component used only in the product feature.

* * * * *

File Naming Conventions
-----------------------

1.  **PascalCase for components**: Use PascalCase for React component files.

    -   Example: `MainMenu.tsx`, `CategoryCard.tsx`.

2.  **camelCase for utilities**: Use camelCase for utility functions and helper files.

    -   Example: `useShippingMethods.ts`, `formatDate.ts`

3.  **index files**: Use `index.ts` or `index.tsx` for entry points in directories.

4.  **Feature-specific naming**: Prefix files with the feature name if they are specific to a feature.

    -   Example: `CartShippingPanel.tsx`, `ProductDetail.tsx`.

5.  **Constants and configuration:** Store global constants in the `src/constants` directory. Each constant should be in its own file, and imported to the `index.ts` to consolidate all constants.

    -   Example: `src/constants/apiEndpoints.ts`, `src/constants/index.ts`.

* * * * *

Shared Directory Criteria
-------------------------

1.  **Reusable components**: Place components that are used across multiple features in `shared`\
    ([See component rules above](https://sitecore.atlassian.net/wiki/spaces/OT/pages/edit-v2/5862260926#Shared-vs-Feature-based-directories%3A-Group-files-by-feature-or-domain-when-possible. "https://sitecore.atlassian.net/wiki/spaces/OT/pages/edit-v2/5862260926#Shared-vs-Feature-based-directories%3A-Group-files-by-feature-or-domain-when-possible."))

2.  **Utility functions**: Place reusable utility functions in `utils`.

    -   Example: `formatPrice.ts`, `useDebounce.ts`.

3.  **Avoid feature-specific logic**: Shared directories should not contain logic tied to a specific feature or domain.

* * * * *

Allowed `src` Directory Level Files
-----------------------------------

1.  **Entry points**: Files that initialize the application or provide global configuration.

    -   Example: `main.tsx`, `AppProvider.tsx`.

2.  **Global constants**: Files containing application-wide constants.

    -   Example: `constants.ts`.

3.  **Routing configuration: **Define application routes in the `src/routes` directory.\
    Use an `index.ts` file to export all routes in a *provider-usable* fashion.

    -   Example: `src/routes/index.ts`.

4.  **Error pages**: Files for global error handling or fallback pages.

    -   Example: `404.tsx`.

* * * * *

Theme directory: Use theme for styling-related files, mirroring Chakra-UI conventions.
--------------------------------------------------------------------------------------

Reference: [Chakra UI Theme](https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme)

Reference: [Blok Design System](https://blok.sitecore.com/)

* * * * *

Additional Guiding Principles
-----------------------------

1.  **Separation of Concerns**:

    -   Each directory or file should have a single, clear responsibility.

    -   Avoid mixing unrelated concerns (e.g., don't place utility functions in a component directory).

2.  **Scalability**:

    -   Design the structure to scale as the application grows.

    -   Group files in a way that avoids cluttering directories with too many files.

3.  **Avoid Over-Abstracting Early**:

    -   Don't prematurely move components to `shared` or utilities unless they are proven to be reusable.

    -   Keep components in feature directories until reusability is clear.

4.  **Consistency**:

    -   Follow consistent naming conventions and directory structures across the project.

    -   Example: If one feature uses `cart/CartSummary.tsx`, ensure other features follow the same pattern (e.g., `category/CategorySummary.tsx`).

5.  **Encapsulation**:

    -   Keep feature-specific logic, components, and styles encapsulated within the feature directory.

    -   Example: Place `CartSummary.tsx` and its related styles or hooks in the `cart` directory.

6.  **Domain-Driven Design**:

    -   Organize directories around business domains or features rather than technical concerns.

    -   Example: Use `cart/` and `category/` instead of `components/` and `services/`.

7.  **Avoid Circular Dependencies**:

    -   Ensure that directories and files are structured to avoid circular imports.

    -   Example: A `shared` component should not depend on feature-specific components.
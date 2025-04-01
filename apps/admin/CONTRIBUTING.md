# Contributing to OrderCloud Accelerator

Whether it's a bug fix, new feature, or just an improvement to the documentation, all contributions are welcome. Before you start, please take a moment to review the following guidelines.

## Table of Contents

- [File and Folder Naming Conventions](#file-and-folder-naming-conventions)
- [Forking and Branching](#forking-and-branching)
- [Committing with Commitizen](#committing-with-commitizen)
- [GitHub Actions CI Process](#github-actions-ci-process)
- [Submitting a Pull Request](#submitting-a-pull-request)

## File and Folder Naming Conventions
To ensure consistency and maintainability in the project, please follow the naming and casing conventions below when creating or modifying files and folders.

### Naming Guidelines

1. **File Naming**: 
* Use PascalCase for React component filenames
    * Correct: MyModule.js, UserProfile.js,
    * Incorrect: my-module.js, user-profile.js

* Use camelCase for React hooks and functions
    * Correct: useMyCustomHook.js
    * Incorrect: MyCustomHook.js, use-my-custom-hook.js

* Configuration files should be in lowercase with the appropriate extension:
    * Correct: .env, tsconfig.json, package.json
    * Incorrect: TsConfig.json, Package.JSON

2. **Folder Naming**: 
* Use lowercase with kebab-case for folder names.
    * Correct: components, utils, assets/images
    * Incorrect: Components, UserProfiles, utils_folder

3. **Case Sensitivity**:
* File and folder names should be case-sensitive, especially when working in environments like Linux, where file systems are case-sensitive. For example, UserProfile.js and userProfile.js are two different files.

4. **Avoid Spaces**:
* Avoid using spaces in filenames and folder names.
    * Correct: user-profile.js
    * Incorrect: user profile.js

5. **Avoid Abbreviations**:
* Avoid excessive abbreviations unless they are widely accepted (e.g., img for images, API for Application Programming Interface). Use full descriptive names whenever possible.

### Organizing Shared Components
In any large project, there will be components, utilities, or assets that are used in multiple places across the application. These commonly shared elements should be grouped together in a dedicated shared folder. The goal is to make it easy to find and manage code that is reusable and not specific to a single feature or page.

#### When to Place Components in the shared Folder
Here are some guidelines on when and why to place a component, hook, or utility in the shared folder:

1. **Reusability Across Multiple Parts of the Application**
If a component, hook, or utility function is used in more than one place within the application, it likely belongs in the shared folder. The shared folder should contain common elements that are used throughout the entire app to avoid code duplication and encourage reusability.

    **Examples of shared components**:

    * Buttons (e.g., Button.js): A common button component that can be reused in multiple parts of the app.
    * Modals (e.g., Modal.js): A reusable modal component that can be used for different purposes across the app.
    * Form inputs (e.g., InputField.js, Checkbox.js): Common form elements used across various forms in the app.

2. **UI Elements or Components Not Tied to a Specific Feature**
If a component is generic and doesn’t depend on the logic of a specific feature, it can likely be considered for the shared folder. These are often UI elements or small building blocks that can be used in multiple parts of the application.

    **Examples of shared UI components**:

    * Header, Footer, Sidebar
    * Layouts (e.g., PageLayout.js): Wrappers for consistent page structures.
    * Typography (e.g., Heading.js, Text.js): Reusable text elements that maintain consistent styles across the app.

#### Example Structure

``` bash
/project-root
├── /src
│   ├── /components
│   │   ├── /shared
│   │   │   └── DebouncedInput.js
│   │   ├── /dashboard
│   │   │   └── Dashboard.js
│   ├── /hooks
│   │   └── useDebounce.js
│   ├── /utils
│   │   └── formatDate.ts
│   └── /theme
│       └── theme.ts
```

## Forking and Branching

You'll first need to fork the repository and create a branch for your changes. Follow these steps:

1. **Fork the repository**  
   Go to the Github page for the [OrderCloud Accelerator](https://github.com/ordercloud-api/oc-accelerator) and click the "Fork" button to create your own copy of the repository.

2. **Clone your fork locally**  
   Clone your fork to your local machine using the following command:

   ```bash
   git clone https://github.com/your-username/repo-name.git
   ```
   
3. **Create a new branch**
   Always create a new branch for your changes. Use a descriptive name for your branch that reflects the changes you are making.

    ```bash
    git checkout -b your-branch-name
    ```
    Note: Please follow the naming convention for branch names (e.g., feature/add-new-endpoint, bugfix/fix-typo).

4. **Stage your changes**
   After making your changes, stage them using:

    ```bash
    git add .
    ```
5. **Commit with Commitizen**
   Follow the instructions in the next section to install commitizen and make your first commit.

## Committing With Commitizen

We use Commitizen in this project to enforce a consistent format for commit messages, following the Conventional Commits specification.  This makes it easier to automate changelog generation and understand the nature of changes at a glance.

### Setup Commitizen
To ensure your commit messages follow the Conventional Commits format, make sure you have commitizen installed. Please visit the [commitizen docs](https://commitizen-tools.github.io/commitizen/#installation) for instructions on how to install on your local machine.

### Commit Message Format
Commitizen is a tool that prompts you to fill in commit message fields according to the Conventional Commits specification. When you run commitizen, it will walk you through the process of creating a well-structured commit message. Commit messages will follow this structure:

```typescript
<type>(<scope>): <message>
```

* type: Describes the nature of the change. Common types include:
    * feat: A new feature.
    * fix: A bug fix.
    * chore: Routine tasks like refactoring or dependency updates.
    * docs: Changes to documentation.
    * style: Code style changes (e.g., formatting).
    * test: Adding or updating tests.
* scope (optional): A part of the code affected, like api, ui, auth, etc.
* message: A short description of what the commit does. Keep it under 72 characters.

Examples:

```typescript
fix(ui): resolve button hover issue
docs(readme): update setup instructions
feat(api/user): add new user profile endpoint
```

### How to Commit

1. Open a powershell terminal and navigate to your project path 

```powershell 
cd /path/to/this/project
```
2. Run the following command in the terminal, then follow the prompts to generate your commit message according to the Conventional Commits guidelines

```powershell 
cz commit
```

## GitHub Actions Workflows

1. CI Workflow (ci.yml)

The Continuous Integration (CI) workflow ensures that every pull request is automatically built and tested on a clean environment before merging. This workflow runs on every pull request and performs the following steps:

* Trigger: On every pull request to any branch.
* Jobs:
    * Checkout Code: Checks out the code from the repository.
    * Set up Node.js: Sets up Node.js version 20.
    * Install Dependencies: Installs project dependencies using npm.
    * Build: Runs the npm run build command to build the project.

2. Version Bump, Publish, and Release Workflow (release_and_publish.yml)

This workflow is triggered when a commit is pushed to the main branch. It automatically bumps the version (using Commitizen) based on the commit messages and creates a release with the new version number. It also publishes the updated package to npm if the version has changed.

* Trigger: On every push to the `main` branch.
* Jobs:
    * Checkout Code: Checks out the code from the repository.
    * Get Current Version: Retrieves the current version from the package.json.
    * Create Bump and Changelog: Uses Commitizen to bump the version and generate a changelog. This also creates a new git tag.
    * Create GitHub Release: If the version has changed, it creates a GitHub release.
    * Publish to npm: If the version has changed, it publishes the package to npm.

### Checking the CI Status
You can view the status of the CI build for each pull request in the "Checks" tab on the pull request page. If there is any failure in the CI pipeline, the details of the error will be shown there.

## Submitting a Pull Request

Please refer to our `pull_request_template.md` file for creating a PR.
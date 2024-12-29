# Sortable Cards

## Overview

This project is a simple web application that leverages various technologies and libraries to create a functional user interface. The primary focus was on maintaining a straightforward implementation while incorporating essential features as outlined in the provided guidelines.

### Objectives

_**Note**: The focus of this project has primarily been on front-end functionality. The backend implementation was created solely for convenience and can be disregarded._

The main goals of this application are to:

1. #### Display a Structured Grid of Cards:

    - Fetch static JSON data from an API endpoint and persist it in browser storage.
    - Show a loading spinner while images are being fetched.
    - Enable drag-and-drop functionality for sorting the cards.
    - Overlay and center the image on the screen when a card is clicked, with the ability to dismiss the overlay by pressing the ESC key.

2. #### Auto-Save Functionality:
    - Check for changes in the sort order every 5 seconds.
    - Save and persist new positions if changes are detected; do nothing if no changes are found.
    - Display a timer indicating the time elapsed since the last save.
    - Show a spinner during the save process.

This solution aims to achieve the above objectives effectively within the available timeframe.

## Running the project

_**Note**: Please ensure that ports `5173` and `3000` are not in use before running the commands below._

The easiest way to run the project is using Docker Compose. Extract the project files to a directory of your choice and execute the following commands:

```bash
cd <installation_directory>
docker compose up
```

Once the command completes, the application should be accessible at http://localhost:5173.

---

The app can also be tested in isolation. To install it locally, extract the project files to a directory of your choice and run the following commands to install all dependencies and start the app.

_**Note**: This project uses PNPM as the package manager. Please ensure it is installed, either by enabling it in Corepack or by installing it separately._

```bash
cd <installation_directory>/client
pnpm install
pnpm dev
```

## Development

### Dependencies

The application utilizes the following key dependencies:

-   **React**: For building the user interface.
-   **Jotai**: For state management.
-   **DnD Kit**: For drag-and-drop functionality.

### Thought process

-   The emphasis was on simplicity, resulting in a minimal number of necessary dependencies.
-   CSS was used wherever possible to achieve functionality, such as loading spinners and overlays, primarily utilizing CSS transforms.
-   The design aspect was straightforward, given the explicit requirements for the card structure, and no additional responsiveness features were added.
-   Custom hooks were created to separate behavior from the visual components of the app.
-   Most application state is managed using Jotai Atoms.

### Assumptions

Several assumptions were made during development:

-   The instructions specified using a static JSON file, browser storage, and mocking a REST API with Mock Service Worker (MSW). The inclusion of Parts 4 and 5 (Deployment and General Questions) created some confusion regarding expectations. It would have been clearer if the instructions for full-stack and backend tasks were separated.
-   The integration of browser storage for data permanence was challenging to reason about. The client currently uses `localStorage` as a caching layer.
-   The example image grid in the provided instructions was missing but appeared straightforward, so it was not a major concern.
-   A 2-second delay was added to the card position auto-save to prevent the spinner from disappearing too quickly.

### Further development

1. A complete end-to-end testing setup with proper tooling.
2. A design system to organise assets and styling guides.
3. Proper User case study with user flows, user personas, wireframes, mockups and prototypes.
4. Better responsiveness.
5. Better code optimization.
6. Further optimize the usage of external dependencies in the app.

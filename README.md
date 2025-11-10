# Cloudflare Fingerprint

Cloudflare vibeSDK fingerprints your browser

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://v1-digital-echo-qdyv16sftvocsrl_qi62w.build-preview.cloudflare.dev/)
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vdutts7/cf-fp)

## About The Project

Digital Echo is a sleek, single-page web application designed to perform comprehensive browser and device fingerprinting. It analyzes a wide array of data points—including user agent, screen resolution, color depth, installed fonts, WebGL rendering, audio context, and canvas hashing—to generate a unique and stable visitor hash.

The application presents a minimalist, dark-themed user interface inspired by modern cybersecurity dashboards. It features an initial 'scanning' animation that provides a visually engaging loading experience, followed by a clean, card-based layout that neatly organizes and displays the collected data. This project is for educational and demonstrative purposes to show how browser fingerprinting works.

### Key Features

-   **Comprehensive Fingerprinting**: Utilizes FingerprintJS to gather a wide range of browser and device attributes.
-   **Unique Visitor Hash**: Generates a stable and unique hash based on the collected data points.
-   **Engaging UI/UX**: Features a "scanning" animation with a progress bar and a matrix-style background, transitioning smoothly to a results dashboard.
-   **Minimalist Dark Theme**: A clean, modern, and visually appealing interface designed for clarity.
-   **Responsive Design**: Flawless layout and functionality across all device sizes, from mobile to desktop.
-   **Client-Side Processing**: All fingerprinting and data processing happen in the browser, ensuring user data is not stored or transmitted to a server.
-   **Copy to Clipboard**: Easily copy the unique fingerprint hash with a single click.

## 📸 Screenshot

![App Screenshot](./public/og-image.png)

## 🔗 Links

- **Live Demo**: [https://v1-digital-echo-qdyv16sftvocsrl_qi62w.build-preview.cloudflare.dev/](https://v1-digital-echo-qdyv16sftvocsrl_qi62w.build-preview.cloudflare.dev/)
- **GitHub**: [GitHub](https://github.com/vdutts7)
- **Twitter**: [X](https://x.com/vdutts7)

## Technology Stack

This project is built with a modern, high-performance tech stack:

-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Fingerprinting**: [@fingerprintjs/fingerprintjs](https://fingerprint.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/digital-echo.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd digital-echo
    ```
3.  Install dependencies:
    ```sh
    bun install
    ```

## Development

To run the application in development mode, use the following command. This will start a local server, typically on `http://localhost:3000`.

```sh
bun dev
```

The server will automatically reload when you make changes to the source files.

## Building for Production

To create a production-ready build of the application, run:

```sh
bun build
```

This command bundles the application and outputs the static files to the `dist` directory.

## Deployment

This project is configured for seamless deployment to Cloudflare Pages.

### Deploy with Wrangler CLI

1.  Log in to your Cloudflare account:
    ```sh
    npx wrangler login
    ```
2.  Run the deployment command from the project's root directory:
    ```sh
    bun deploy
    ```

Wrangler will build and deploy your application. After deployment, you will receive a URL to your live site.

### Deploy with a Click

You can also deploy this project to Cloudflare with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vdutts7/cf-fp)

## Disclaimer

This project is created for educational and demonstrative purposes to illustrate the mechanics of browser fingerprinting.

-   Fingerprinting may be blocked or spoofed by privacy-focused browsers or extensions, which can lead to inaccurate results.
-   The generated hash is not guaranteed to be 100% unique or stable over time, as it can change with browser updates or configuration modifications.
-   Using this technology for invasive tracking has significant privacy implications and is not the intended purpose of this project.
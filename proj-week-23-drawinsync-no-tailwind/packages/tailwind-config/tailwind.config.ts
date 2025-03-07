import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
    content: [
        "../../apps/*/app/**/*.{js,jsx,ts,tsx}",
        "../../packages/*/components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
export default config;
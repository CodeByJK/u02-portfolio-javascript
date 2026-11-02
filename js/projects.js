// Import helper functions for fetching data and creating HTML elements
import { fetchJson } from "./http.js";
import { el } from "./dom.js";


// GitHub API endpoint for fetching public repositories
const GITHUB_URL = "https://api.github.com/users/CodeByJK/repos?sort=updated&per_page=100";


// Create a project card using repository data from GitHub
const createProjectCard = (repo) => {
    const githubLink = el("a", {
        className: "project-link",
        href: repo.html_url,
        target: "_blank",
        rel: "noopener noreferrer",
        text: "View on GitHub",
    });

    return el(
        "article",
        { className: "project-card" },
        el("h3", { text: repo.name }),
        el("p", {
            text: repo.description || "No description available.",
        }),
        el("div", { className: "project-links" }, githubLink)
    );
};


// Filter out forked repositories and render the remaining projects
const renderProjects = (container, repositories) => {
    const originalRepositories = repositories.filter(
        (repo) => !repo.fork
    );

    const projectCards = originalRepositories.map(createProjectCard);
    container.replaceChildren(...projectCards);

    return originalRepositories.length;
};


// Fetch repositories from GitHub and initialize the projects section
export const initProjects = async () => {
    const projectsContainer = document.querySelector("#projects-list");
    const statusMessage = document.querySelector("#projects-status");

    if (!projectsContainer || !statusMessage) return;

    // Show loading message while fetching repositories
    statusMessage.textContent = "Loading projects...";

    try {
        // Fetch repository data from GitHub
        const repositories = await fetchJson(GITHUB_URL);

        // Render projects and get the number of displayed repositories
        const projectCount = renderProjects(projectsContainer, repositories);

        // Handle empty results
        if (projectCount === 0) {
            statusMessage.textContent = "No projects available at the moment.";
            return;
        }

        // Clear loading message when projects have loaded successfully
        statusMessage.textContent = "";

    } catch (error) {
        console.error("Could not load GitHub projects:", error);

        // Show an error message if the request fails
        statusMessage.textContent =
            "Sorry, projects could not be loaded. Please try again later.";
    }
};


// Import helper functions for fetching data and creating HTML elements
import { fetchJson } from "./http.js";
import { el } from "./dom.js";

// GitHub API endpoint for fetching public repositories
const GITHUB_URL =
  "https://api.github.com/users/CodeByJK/repos?sort=updated&per_page=100";


// Create a project card using customized project information
const createProjectCard = (project) => {
  // Create a screenshot of the project
  const projectImage = el("img", {
    className: "project-image",
    src: project.image,
    alt: `Screenshot of ${project.title}`,
  });


  // Create technology badges for the project
  const technologyBadges = project.technologies.map((technology) =>
    el("span", {
      className: "technology-badge",
      text: technology,
    }),
  );


  // Create a link to the published application, if available
  const liveLink = project.liveUrl
    ? el("a", {
        className: "project-link",
        href: project.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        text: "Live Demo",
      })
    : null;


  // Create a link to the GitHub repository
  const githubLink = el("a", {
    className: "project-link",
    href: project.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    text: "View Code",
  });


  // Collect available project links
  const projectLinks = [...(liveLink ? [liveLink] : []), githubLink];

  
  // Build and return the complete project card
  return el(
    "article",
    { className: "project-card" },
    projectImage,
    el("h3", { text: project.title }),
    el("p", { text: project.description }),
    el(
      "div",
      { className: "project-technology-section" },
      el("h4", { text: "Technologies" }),
      el("div", { className: "project-technologies" }, ...technologyBadges),
    ),
    el("div", { className: "project-links" }, ...projectLinks),
  );
};


// Match selected projects with GitHub repositories and render project cards
const renderProjects = (container, repositories, projectDetails) => {

    const selectedProjects = projectDetails
        .map((project) => {
            const repository = repositories.find(
                (repo) => repo.name === project.repo
            );

            // Skip forks from the user's own repositories
            if (repository?.fork) return null;

            // Use GitHub API data when available, otherwise use manual links
            const githubUrl = repository?.html_url || project.githubUrl;
            const liveUrl = repository?.homepage || project.liveUrl || "";

            // Skip projects without a GitHub link
            if (!githubUrl) return null;

            return {
                ...project,
                githubUrl,
                liveUrl,
            };
        })
        .filter(Boolean);

    // Create and display project cards
    const projectCards = selectedProjects.map(createProjectCard);
    container.replaceChildren(...projectCards);

    return selectedProjects.length;
};


// Fetch project data from GitHub and the local JSON file
export const initProjects = async () => {
  const projectsContainer = document.querySelector("#projects-list");
  const statusMessage = document.querySelector("#projects-status");

  if (!projectsContainer || !statusMessage) return;

  // Show loading message while fetching project data
  statusMessage.textContent = "Loading projects...";

  try {
    // Fetch data from both sources at the same time
    const [repositories, projectDetails] = await Promise.all([
      fetchJson(GITHUB_URL),
      fetchJson("data/projects.json"),
    ]);

    // Combine the data and render the project cards
    const projectCount = renderProjects(
      projectsContainer,
      repositories,
      projectDetails,
    );

    // Handle empty results
    if (projectCount === 0) {
      statusMessage.textContent = "No projects available at the moment.";
      return;
    }

    // Clear loading message after successful rendering
    statusMessage.textContent = "";
  } catch (error) {
    console.error("Could not load projects:", error);

    // Show an error message if either request fails
    statusMessage.textContent =
      "Sorry, projects could not be loaded. Please try again later.";
  }
};

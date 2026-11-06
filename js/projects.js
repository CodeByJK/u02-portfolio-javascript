// Import helper functions for fetching data and creating HTML elements
import { fetchJson } from "./http.js";
import { el } from "./dom.js";

const svgEl = (tag, attributes = {}, ...children) => {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag,
  );

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  element.append(...children);
  return element;
};

// Decorative icons for project links
const createLinkIcon = () =>
  svgEl(
    "svg",
    {
      class: "project-link-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
    },
    svgEl(
      "g",
      {
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
      },
      svgEl("path", {
        d: "M13.544 10.456a4.37 4.37 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177",
      }),
      svgEl("path", {
        d: "M10.456 13.544a4.37 4.37 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823",
      }),
    ),
  );

const createGithubIcon = () =>
  svgEl(
    "svg",
    {
      class: "project-link-icon",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
    },
    svgEl("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12",
    }),
  );


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
    width: project.width,
    height: project.height,
    loading: "lazy",
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
  ? el(
      "a",
      {
        className: "project-link",
        href: project.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      createLinkIcon(),
      "Live Demo",
    )
  : null;

  // Create a link to the GitHub repository
const githubLink = el(
  "a",
  {
    className: "project-link",
    href: project.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  createGithubIcon(),
  "View Code",
);


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
        (repo) => repo.name === project.repo,
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

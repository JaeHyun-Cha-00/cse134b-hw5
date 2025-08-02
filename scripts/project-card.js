// Project Card Web Component
class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "Untitled Project";
    const description = this.getAttribute("description") || "No description available.";
    const imgSrc = this.getAttribute("img") || "assets/img/profile.png";
    const link = this.getAttribute("link") || "#";
    const alt = this.getAttribute("alt") || "Project image";
    const date = this.getAttribute("date") || "2025-01-01";
    const author = this.getAttribute("author") || "Anonymous";
    const tags = (this.getAttribute("tags") || "").split(",");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 420px;
          background: var(--card-bg, #fff);
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          font-family: Arial, sans-serif;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          margin: 1rem;
        }
        :host(:hover) {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }

        article {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1rem;
          color : black !important;
        }

        picture {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }
        picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h2 {
          margin: 0.5rem 0;
          font-size: 1.25rem;
          font-weight: bold;
        }

        p {
          flex-grow: 1;
          margin: 0.5rem 0;
          line-height: 1.4;
        }

        a {
          color: var(--link-color, #0077cc);
          font-weight: bold;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }

        .meta {
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }

        .tags {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .tag {
          display: inline-block;
          background: var(--tag-bg, #f0f0f0);
          border-radius: 6px;
          padding: 0.2rem 0.6rem;
          margin: 0.2rem 0.4rem 0 0;
          font-size: 0.75rem;
        }
      </style>
      <article>
        <picture>
          <img src="${imgSrc}" alt="${alt}" loading="lazy">
        </picture>
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${link}" target="_blank" rel="noopener">Read more</a>
        <div class="meta">📅 ${date} | ${author}</div>
        <div class="tags">
          ${tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join("")}
        </div>
      </article>
    `;
  }
}

customElements.define("project-card", ProjectCard);

// Default Projects
const defaultProjects = [
  {
    title: "Recipe Recommendation System",
    description: "A machine learning model suggesting recipes based on ingredients.",
    img: "assets/img/recipe_generator.png",
    link: "https://github.com/JaeHyun-Cha-00/Recipe_Generator",
    alt: "Recipe project screenshot",
    date: "2025-01-15",
    author: "Jae Hyun Cha",
    tags: "ML,Food"
  },
  {
    title: "Mixture-of-Judges",
    description: "Research project on large language model evaluation and alignment.",
    img: "assets/img/moj.png",
    link: "https://github.com/JaeHyun-Cha-00/MOJ",
    alt: "MOJ dataset logo",
    date: "2025-04-20",
    author: "Jae Hyun Cha",
    tags: "LLM,Research"
  }
];

// Load Functions

// Render cards
function renderProjects(projects, container) {
  container.innerHTML = "";
  projects.forEach(proj => {
    const card = document.createElement("project-card");
    Object.entries(proj).forEach(([key, value]) => card.setAttribute(key, value));
    container.appendChild(card);
  });
}

// Load from LocalStorage
function loadLocalProjects() {
  const container = document.querySelector("#projects");
  const localData = localStorage.getItem("projects");
  if (localData) {
    renderProjects(JSON.parse(localData), container);
  } else {
    localStorage.setItem("projects", JSON.stringify(defaultProjects));
    renderProjects(defaultProjects, container);
  }
}

// Load from JSONBin
async function loadRemoteProjects() {
  const container = document.querySelector("#projects");
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/688e6e26ae596e708fc03628/latest");
    if (!response.ok) throw new Error("Failed to fetch remote data");
    const data = await response.json();
    renderProjects(data.record, container);
  } catch (err) {
    console.error(err);
    renderProjects(defaultProjects, container);
  }
}

document.getElementById("load_local").addEventListener("click", loadLocalProjects);
document.getElementById("load_remote").addEventListener("click", loadRemoteProjects);

loadLocalProjects();
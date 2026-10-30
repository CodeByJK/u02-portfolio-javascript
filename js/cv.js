import { fetchJson } from "./http.js";
import { el } from "./dom.js";

const CV_URL = "data/cv.json";

const formatDate = (value) => {
  const [year, month] = value.split("-");
  if (!month) return year;

  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const createDetail = (className, iconSrc, text) =>
  el(
    "div",
    { className },
    el("img", { src: iconSrc, alt: "", className: "exp-icon" }),
    el("span", { text })
  );

const createDates = (start, end) =>
  el(
    "p",
    { className: "experience-dates" },
    el("time", { datetime: start, text: formatDate(start) }),
    " – ",
    end
      ? el("time", { datetime: end, text: formatDate(end) })
      : "Present"
  );

const createEntry = ({ title, organization, location, note, start, end }) => {
  const details = [
    createDetail("experience-company", "assets/logos/bi--building-fill.svg", organization),
    ...(location
      ? [createDetail("experience-location", "assets/logos/et--map-pin.svg", location)]
      : []),
  ];

  const meta = [
    ...(note ? [el("span", { className: "employment-type", text: note })] : []),
    createDates(start, end),
  ];

  return el(
    "li",
    {},
    el(
      "article",
      { className: "experience-item" },
      el("div", { className: "experience-info" }, el("h3", { text: title }), ...details),
      el("div", { className: "experience-meta" }, ...meta)
    )
  );
};

const renderList = (container, entries) => {
  container.replaceChildren(...entries.map(createEntry));
};

export const initCv = async () => {
  const workList = document.querySelector("#work-list");
  const educationList = document.querySelector("#education-list");
  if (!workList || !educationList) return;

  try {
    const { work, education } = await fetchJson(CV_URL);
    renderList(workList, work);
    renderList(educationList, education);
  } catch (error) {
    console.error(error);
    const message = el("li", {
      role: "alert",
      text: "Could not load the CV. Please try reloading the page.",
    });
    workList.replaceChildren(message);
    educationList.replaceChildren();
  }
};
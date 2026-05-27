const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.querySelector("#site-search");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

searchToggle?.addEventListener("click", () => {
  const isOpen = searchPanel.classList.toggle("is-open");
  searchToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    searchInput?.focus();
  }
});

searchPanel?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = new FormData(searchPanel).get("q")?.toString().trim();
  if (!query) {
    searchInput?.focus();
    return;
  }

  const sections = [...document.querySelectorAll("main section")];
  const match = sections.find((section) => section.textContent?.includes(query));
  if (match) {
    match.scrollIntoView({ behavior: "smooth", block: "start" });
    searchPanel.classList.remove("is-open");
    searchToggle?.setAttribute("aria-expanded", "false");
  } else {
    searchInput.value = "";
    searchInput.placeholder = `"${query}" 검색 결과가 없습니다`;
  }
});

document.querySelectorAll("[data-tabs]").forEach((tabSet) => {
  const tabs = [...tabSet.querySelectorAll('[role="tab"]')];
  const panels = [...tabSet.querySelectorAll('[role="tabpanel"]')];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
    });
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formStatus.textContent = "문의가 접수된 예시 상태입니다. 실제 서비스에서는 서버 연동이 필요합니다.";
  contactForm.reset();
});

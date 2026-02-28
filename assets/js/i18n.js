import { FluentBundle, FluentResource } from "@fluent/bundle";
import { DOMLocalization } from "@fluent/dom";

const SUPPORTED_LOCALES = ["en-US", "en-GB", "en-AU", "vi-VN"];
const DEFAULT_LOCALE = "en-US";

async function fetchResource(locale, resourceId) {
  const response = await fetch(`/locale/${locale}/${resourceId}.ftl`);
  return response.text();
}

async function initLocalization(locale = DEFAULT_LOCALE) {
  const bundle = new FluentBundle(locale);
  const source = await fetchResource(locale, "main");
  const resource = new FluentResource(source);
  bundle.addResource(resource);

  const l10n = new DOMLocalization(
    [`/locale/${locale}/main.ftl`],
    (resourceIds) => {
      return resourceIds.map(() => bundle);
    },
  );

  l10n.connectRoot(document.documentElement);
  l10n.translateRoots();

  return { bundle, l10n };
}

async function changeLanguage(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  localStorage.setItem("preferredLanguage", locale);
  await initLocalization(locale);
  updateActiveLocale(locale);
}

function updateActiveLocale(locale) {
  const items = document.querySelectorAll(".lang-switcher .dropdown-item");
  items.forEach((item) => {
    if (item.getAttribute("data-locale") === locale) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function initLangSwitcher() {
  const savedLocale =
    localStorage.getItem("preferredLanguage") || DEFAULT_LOCALE;

  updateActiveLocale(savedLocale);

  const items = document.querySelectorAll(".lang-switcher .dropdown-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const locale = item.getAttribute("data-locale");
      if (locale) {
        changeLanguage(locale);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLocale =
    localStorage.getItem("preferredLanguage") || DEFAULT_LOCALE;
  initLocalization(savedLocale);
  initLangSwitcher();
});

export { initLocalization, changeLanguage };

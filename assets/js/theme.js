/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * Modified for Portfolio
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherIcon = themeSwitcher.querySelector("i");

    // Icons: fa-sun (light), fa-moon (dark), fa-circle-half-stroke (auto)
    themeSwitcherIcon.classList.remove(
      "fa-sun",
      "fa-moon",
      "fa-circle-half-stroke",
    );

    if (theme === "light") {
      themeSwitcherIcon.classList.add("fa-sun");
    } else if (theme === "dark") {
      themeSwitcherIcon.classList.add("fa-moon");
    } else {
      themeSwitcherIcon.classList.add("fa-circle-half-stroke");
    }

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    const currentTheme = getStoredTheme() || "auto";
    showActiveTheme(currentTheme);

    const themeSwitcher = document.querySelector("#bd-theme");
    if (themeSwitcher) {
      document.querySelectorAll("[data-bs-theme-value]").forEach((button) => {
        button.addEventListener("click", () => {
          const theme = button.getAttribute("data-bs-theme-value");
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      });
    }
  });
})();

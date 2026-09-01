/* Sitewide light/dark mode switcher */
(function () {
    const savedTheme = localStorage.getItem("site-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

    function addThemeButton() {
        if (document.querySelector(".theme-toggle")) return;

        const button = document.createElement("button");
        button.className = "theme-toggle";
        button.type = "button";
        button.setAttribute("aria-label", "Switch color theme");

        function updateButton() {
            const isDark = document.documentElement.dataset.theme === "dark";
            button.textContent = isDark ? "☀ Light Mode" : "☾ Dark Mode";
            button.setAttribute("aria-pressed", String(isDark));
            button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
        }

        button.addEventListener("click", function () {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem("site-theme", nextTheme);
            updateButton();
        });

        document.body.appendChild(button);
        updateButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addThemeButton);
    } else {
        addThemeButton();
    }
})();

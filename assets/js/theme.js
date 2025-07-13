const themeSwitcher = document.querySelector(".theme-switcher input");
const switcherIcon = themeSwitcher.parentElement.querySelector("img");

//check local storage
const savedTheme = localStorage.getItem("theme");
const prefersDark =
  savedTheme == "dark" ||
  (savedTheme == null &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);
//apply it the first time
document.body.classList.toggle("dark-theme", prefersDark); //prefersDark is false, delete it, if true add it
themeSwitcher.checked = prefersDark;
updateUI(prefersDark);

themeSwitcher.addEventListener("change", () => {
  const isDark = themeSwitcher.checked;
  document.body.classList.toggle("dark-theme", isDark);
  updateUI(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function updateUI(isDark) {
  switcherIcon.src = isDark
    ? "assets/images/icon-sun.svg"
    : "assets/images/icon-moon.svg";
  switcherIcon.alt = isDark ? "sun icon" : "moon icon";
  themeSwitcher.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeSwitcher.setAttribute("aria-checked", isDark.toString());
}

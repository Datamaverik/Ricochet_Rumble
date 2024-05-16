//toggle the theme from dark to light and vice-versa
export function changeTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  const currentTheme = root.className === "dark" ? "dark" : "light";
  root.className = newTheme;
  const themeButton = document.getElementById("theme-button");
  themeButton.textContent = currentTheme;
}

export const Icons = {
  titan: `<a href="https://iconscout.com/icons/castle" class="text-underline font-size-sm" target="_blank">castle</a>`,
  tank: `<a href="https://iconscout.com/icons/jeep" class="text-underline font-size-sm" target="_blank">Jeep</a>`,
  ricochet: `<a href="https://iconscout.com/icons/jeep" class="text-underline font-size-sm" target="_blank">Jeep</a>`,
  semiRicochet: `<a href="https://iconscout.com/icons/ship" class="text-underline font-size-sm" target="_blank">Ship</a>`,
};


//toggle the theme from dark to light and vice-versa
export function changeTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  const currentTheme = root.className === "dark" ? "dark" : "light";
  root.className = newTheme;
  const themeButton = document.getElementById("theme-button");
  themeButton.textContent = currentTheme;
}


export const Icons={
  titan:'titan-P1',
}
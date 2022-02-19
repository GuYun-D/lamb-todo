let defaultTheme = true

export const changeTheme = () => {
  document.body.className = !defaultTheme ? "dark" : "light"
  defaultTheme = !defaultTheme
}
import "./styles/style.scss";

const form = document.getElementById("form");
const formText = document.getElementById("name").value;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit(formText);
});

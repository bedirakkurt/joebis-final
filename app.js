// Select tabs and panels
const tabs = document.querySelectorAll("nav a");
const panels = document.querySelectorAll("main section");

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();

    // Hide all panels
    panels.forEach((panel) => panel.classList.add("hidden"));

    // Remove active state from all tabs
    tabs.forEach((tab) => tab.classList.remove("text-blue-500"));

    // Show the selected panel
    let selectedPanelId = tab.getAttribute("href").substring(1);
    document.getElementById(selectedPanelId).classList.remove("hidden");

    // Set active state for current tab
    tab.classList.add("text-blue-500");
  });
});


function openTab(tab) {
  const panel = document.getElementById("panel");

  if (tab === "text") {
    panel.innerHTML = `<input placeholder="टेक्स्ट लिखें">`;
  }
  if (tab === "effects") {
    panel.innerHTML = `
      Brightness <input type="range"><br>
      Contrast <input type="range">
    `;
  }
  if (tab === "ai") {
    panel.innerHTML = `
      🔒 Background Remove (PRO)<br>
      🔒 Auto Enhance (PRO)
    `;
  }
}

const wallpapers = [
  {
    id: "wall1",
    name: "the book",
    filename: "the_book_and_old_converses.png",
    url: "https://raw.githubusercontent.com/5pr05/spros-plove-dotfiles/refs/heads/main/.config/wallpapers/the_book_and_old_converses.png",
  },
  {
    id: "wall2",
    name: "quiet..",
    filename: "quiet_babushkas_rug.png",
    url: "https://raw.githubusercontent.com/5pr05/spros-plove-dotfiles/refs/heads/main/.config/wallpapers/quiet_babushkas_rug.png",
  },
  {
    id: "wall3",
    name: "accc",
    filename: "accc_sssnake.jpg",
    url: "https://raw.githubusercontent.com/5pr05/spros-plove-dotfiles/refs/heads/main/.config/wallpapers/accc_sssnake.png",
  },
];

let selW1 = wallpapers[0];
let selW2 = wallpapers[1];

function buildCarousel(containerId, selectN, defaultIdx) {
  const container = document.getElementById(containerId);
  wallpapers.forEach((w, idx) => {
    const card = document.createElement("div");
    card.className = "wall-card" + (idx === defaultIdx ? " active" : "");
    card.style.backgroundImage = `url(${w.url})`;
    card.innerHTML = `
            <div class="check">✓</div>
            <div class="wall-card-name">${w.name}</div>
        `;
    card.onclick = () => {
      document
        .querySelectorAll(`#${containerId} .wall-card`)
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      if (selectN === 1) selW1 = w;
      else selW2 = w;
    };
    container.appendChild(card);
  });
}

function toggleCustomRes(side) {
  const select = document.getElementById(`res_${side}_select`);
  const customInput = document.getElementById(`res_${side}_custom`);
  if (select.value === "custom") {
    customInput.style.display = "block";
  } else {
    customInput.style.display = "none";
  }
}

function getResolution(side) {
  const selectVal = document.getElementById(`res_${side}_select`).value;
  if (selectVal === "custom") {
    return (
      document.getElementById(`res_${side}_custom`).value.trim() || "1920x1080"
    );
  }
  return selectVal;
}

function updateUI() {
  const mod = document.querySelector('input[name="mod"]:checked').value;
  document
    .getElementById("label-mod4")
    .classList.toggle("active", mod === "Mod4");
  document
    .getElementById("label-mod1")
    .classList.toggle("active", mod === "Mod1");

  const dual = document.getElementById("use_dual").checked;
  document.getElementById("mon_right_div").classList.toggle("visible", dual);
  document.getElementById("wall2_ui").style.display = dual ? "" : "none";

  const m1 = document.getElementById("mon_left").value.trim() || "eDP-1";
  const r1 = getResolution("left");

  const m2 = document.getElementById("mon_right").value.trim() || "HDMI-A-2";
  const r2 = getResolution("right");

  document.getElementById("mon-code").textContent = dual
    ? `${m1} (${r1})  ·  ${m2} (${r2})`
    : `${m1} (${r1})`;
}

function copyCmd(btn) {
  navigator.clipboard
    .writeText("swaymsg -t get_outputs | grep name")
    .then(() => {
      const orig = btn.textContent;
      btn.textContent = "copied!";
      btn.style.color = "var(--accent)";
      btn.style.borderColor = "var(--accent)";
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = "";
        btn.style.borderColor = "";
      }, 1800);
    });
}

function syncColor(id) {
  const val = document.getElementById(id).value;
  document.getElementById("bg-" + id).style.background = val;
  document.getElementById("hex-" + id).textContent = val;
  const keyMap = {
    c_primary: "primary",
    c_secondary: "secondary",
    c_tertiary: "tertiary",
    c_accent: "accent",
  };
  const previewEl = document.getElementById("preview-" + keyMap[id]);
  if (previewEl) previewEl.style.background = val;
}

function showToast() {
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

async function buildZip() {
  const btn = document.getElementById("genBtn");
  const inner = btn.querySelector(".btn-inner");
  btn.disabled = true;
  inner.innerHTML = `<span class="btn-icon" style="animation:spin 0.8s linear infinite;display:inline-block">↻</span><div><div>Building archive...</div><div class="btn-sub">generating config files</div></div>`;

  const zip = new JSZip();
  const isDual = document.getElementById("use_dual").checked;

  const m1 = document.getElementById("mon_left").value.trim() || "eDP-1";
  const r1 = getResolution("left");
  const m2 = document.getElementById("mon_right").value.trim() || "HDMI-A-2";
  const r2 = getResolution("right");

  const userConf = `set $mod ${document.querySelector('input[name="mod"]:checked').value}

set $monitor-left   ${m1}
set $resolution-left ${r1}
set $monitor-right  ${isDual ? m2 : "NONE"}
set $resolution-right ${isDual ? r2 : "NONE"}
set $wallpaper1 ~/.config/sway/wallpaper/${selW1.filename}
set $wallpaper2 ${isDual ? `~/.config/sway/wallpaper/${selW2.filename}` : `~/.config/sway/wallpaper/${selW1.filename}`}

set $browser ${document.getElementById("browser").value}

set $kbd_layout  ${document.getElementById("kbd_layout").value}
set $kbd_variant ${document.getElementById("kbd_variant").value}
set $kbd_options ${document.getElementById("kbd_options").value}`;

  const colorsCss = `@define-color primary       ${document.getElementById("c_primary").value};
@define-color secondary     ${document.getElementById("c_secondary").value};
@define-color tertiary      ${document.getElementById("c_tertiary").value};
@define-color accent        ${document.getElementById("c_accent").value};`;

  zip.file("user.conf", userConf);
  zip.file("colors.css", colorsCss);

  const content = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = "spros_my_config.zip";
  a.click();

  btn.disabled = false;
  inner.innerHTML = `<span class="btn-icon">⬇</span><div><div>Download spros_my_config.zip</div><div class="btn-sub">user.conf · colors.css</div></div>`;
  showToast();
}

buildCarousel("carousel1", 1, 0);
buildCarousel("carousel2", 2, 1);
updateUI();

const style = document.createElement("style");
style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
document.head.appendChild(style);
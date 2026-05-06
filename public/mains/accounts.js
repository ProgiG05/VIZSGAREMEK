import { getUser, apiFetch } from "./api.js";
import { showConfirm, showDetailPopup } from "./popup.js";
import { setupLoginState, setupSidePanel, setupNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupSidePanel();
  setupLoginState();

  const user = getUser();
  if (!user) {
    window.location.href = "/sites/login.html";
    return;
  }

  const accountheader = document.getElementById("account-header");
  if (accountheader) {
    const accountHeaderTitle = document.createElement("h1");
    accountHeaderTitle.textContent = `${user.username}`;
    accountheader.appendChild(accountHeaderTitle);
  }

  // Tab switching
  const sidebarItems = document.querySelectorAll(
    ".account-sidebar-item[data-tab]",
  );
  const tabs = document.querySelectorAll("[id^='tab-']");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-tab");

      sidebarItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      tabs.forEach((tab) => {
        tab.classList.toggle("hidden", tab.id !== `tab-${target}`);
      });

      if (target === "saved") {
        loadSavedItems();
      }
    });
  });

  // --- Logout function ---
  const logoutBtn = document.getElementById("logout_btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await apiFetch("/api/logout", { method: "POST" });
      } catch (error) {
        console.error("Logout request failed:", error.message);
      }
      document.cookie = "user=; Max-Age=0; path=/; SameSite=Strict";
      window.location.href = "/index.html";
    });
  }

  // --- Update Username ---
  const saveUsernameBtn = document.getElementById("save-username-btn");
  if (saveUsernameBtn) {
    saveUsernameBtn.addEventListener("click", async () => {
      const input = document.getElementById("new-username-input");
      const feedback = document.getElementById("username-feedback");
      const newUsername = input.value.trim();

      feedback.textContent = "";
      feedback.style.color = "";

      if (!newUsername) {
        showFeedback(feedback, "Please enter a new username.", false);
        return;
      }

      saveUsernameBtn.disabled = true;
      saveUsernameBtn.textContent = "Saving...";

      try {
        const res = await apiFetch("/api/profile/username", {
          method: "PUT",
          body: JSON.stringify({ newUsername }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showFeedback(feedback, data.message, true);
          input.value = "";
          const headerTitle = accountheader.querySelector("h1:last-child");
          if (headerTitle) headerTitle.textContent = data.newUsername;
        } else {
          showFeedback(
            feedback,
            data.message || "Failed to update username.",
            false,
          );
        }
      } catch {
        showFeedback(feedback, "Network error. Please try again.", false);
      }

      saveUsernameBtn.disabled = false;
      saveUsernameBtn.textContent = "Update Username";
    });
  }

  // --- Update Password ---
  const savePasswordBtn = document.getElementById("save-password-btn");
  if (savePasswordBtn) {
    savePasswordBtn.addEventListener("click", async () => {
      const curInput = document.getElementById("current-password-input");
      const newInput = document.getElementById("new-password-input");
      const feedback = document.getElementById("password-feedback");

      feedback.textContent = "";
      feedback.style.color = "";

      if (!curInput.value || !newInput.value) {
        showFeedback(feedback, "Please fill in both fields.", false);
        return;
      }

      savePasswordBtn.disabled = true;
      savePasswordBtn.textContent = "Saving...";

      try {
        const res = await apiFetch("/api/profile/password", {
          method: "PUT",
          body: JSON.stringify({
            currentPassword: curInput.value,
            newPassword: newInput.value,
          }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showFeedback(feedback, data.message, true);
          curInput.value = "";
          newInput.value = "";
        } else {
          showFeedback(
            feedback,
            data.message || "Failed to update password.",
            false,
          );
        }
      } catch {
        showFeedback(feedback, "Network error. Please try again.", false);
      }

      savePasswordBtn.disabled = false;
      savePasswordBtn.textContent = "Update Password";
    });
  }
});

function showFeedback(el, message, success) {
  el.textContent = message;
  el.style.color = success ? "#4caf50" : "#e74c3c";
}

// --- Saved Items --- //

let savedLoaded = false;

function loadSavedItems() {
  if (savedLoaded) return;
  savedLoaded = true;
  loadSavedPlants();
  loadSavedIdeas();
  loadSavedGardens();
}

async function loadSavedPlants() {
  const list = document.getElementById("saved-plants-list");
  if (!list) return;

  const showEmptyMessage = (msg) => {
    list.textContent = "";
    const p = document.createElement("p");
    p.style.opacity = "0.5";
    p.textContent = msg;
    list.appendChild(p);
  };

  try {
    const res = await apiFetch("/api/savedplants");
    const plants = await res.json();

    if (!Array.isArray(plants) || plants.length === 0) {
      showEmptyMessage("No saved plants yet.");
      return;
    }

    list.textContent = "";
    plants.forEach((p) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.title = "Click to view details";

      const cardBody = document.createElement("div");
      cardBody.className = "saved-card-body";

      const delBtn = document.createElement("div");
      delBtn.className = "delete-saved-btn";
      delBtn.title = "Remove saved plant";
      delBtn.textContent = "×";

      const title = document.createElement("strong");
      title.className = "saved-card-title";
      title.textContent = p.common_name || "Unknown Plant";

      const sub = document.createElement("div");
      sub.className = "saved-card-sub";
      sub.textContent = p.botanical_name || p.type || "";

      cardBody.appendChild(delBtn);
      cardBody.appendChild(title);
      cardBody.appendChild(sub);
      card.appendChild(cardBody);

      // --- Delete button ---
      delBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        setTimeout(() => {
          const closeBtn = document.querySelector("#close-popup-btn");
          if (closeBtn) closeBtn.style.display = "none";
        }, 0);
        if (
          await showConfirm(
            "Remove this idea from your saved items?",
            "Confirm deletion",
          )
        ) {
          try {
            const res = await apiFetch("/api/saveplants", {
              method: "POST",
              body: JSON.stringify({ id: p.plant_id || p.id }),
            });
            if (res.ok) {
              card.remove();
              if (list.children.length === 0) {
                showEmptyMessage("No saved plants yet.");
              }
            }
          } catch (err) {
            console.error("Failed to remove saved plant:", err);
          }
        }
      });

      // --- Detail popup on card click ---
      card.addEventListener("click", () => {
        showDetailPopup(buildPlantDetail(p), p.common_name || "Plant Details");
      });

      list.appendChild(card);
    });
  } catch {
    showEmptyMessage("Could not load plants.");
  }
}

async function loadSavedIdeas() {
  const list = document.getElementById("saved-ideas-list");
  if (!list) return;

  const showEmptyMessage = (msg) => {
    list.textContent = "";
    const p = document.createElement("p");
    p.style.opacity = "0.5";
    p.textContent = msg;
    list.appendChild(p);
  };

  try {
    const res = await apiFetch("/api/savedideas");
    const ideas = await res.json();

    if (!Array.isArray(ideas) || ideas.length === 0) {
      showEmptyMessage("No saved ideas yet.");
      return;
    }

    list.textContent = "";
    ideas.forEach((i) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.title = "Click to view details";

      const ideaTitle = i.title || i.idea_name || "Idea";
      const desc = i.description || i.idea_content || "";
      const snippet = desc.length > 80 ? desc.substring(0, 80) + "..." : desc;

      const cardBody = document.createElement("div");
      cardBody.className = "saved-card-body";

      const delBtn = document.createElement("div");
      delBtn.className = "delete-saved-btn";
      delBtn.title = "Remove saved idea";
      delBtn.textContent = "×";

      const strong = document.createElement("strong");
      strong.className = "saved-card-title";
      strong.textContent = ideaTitle;

      const sub = document.createElement("div");
      sub.className = "saved-card-sub";
      sub.textContent = snippet;

      cardBody.appendChild(delBtn);
      cardBody.appendChild(strong);
      cardBody.appendChild(sub);
      card.appendChild(cardBody);

      // --- Plant tags footer ---
      if (i.plants) {
        const cardFooter = document.createElement("div");
        cardFooter.className = "saved-card-footer";

        i.plants.split(",").forEach((plantName) => {
          const tag = document.createElement("span");
          tag.className = "saved-card-plant-tag";
          tag.textContent = plantName.trim();
          cardFooter.appendChild(tag);
        });

        card.appendChild(cardFooter);
      }

      // --- Delete button ---
      delBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        setTimeout(() => {
          const closeBtn = document.querySelector("#close-popup-btn");
          if (closeBtn) closeBtn.style.display = "none";
        }, 0);
        if (
          await showConfirm(
            "Remove this idea from your saved items?",
            "Confirm deletion",
          )
        ) {
          try {
            const res = await apiFetch("/api/saveideas", {
              method: "POST",
              body: JSON.stringify({ id: i.idea_id || i.id }),
            });
            if (res.ok) {
              card.remove();
              if (list.children.length === 0) {
                showEmptyMessage("No saved ideas yet.");
              }
            }
          } catch (err) {
            console.error("Failed to remove saved idea:", err);
          }
        }
      });

      // --- Detail popup on card click ---
      card.addEventListener("click", () => {
        showDetailPopup(buildIdeaDetail(i), i.title || "Idea Details");
      });

      list.appendChild(card);
    });
  } catch {
    showEmptyMessage("Could not load ideas.");
  }
}

async function loadSavedGardens() {
  const list = document.getElementById("saved-gardens-list");
  if (!list) return;

  const showEmptyMessage = (msg) => {
    list.textContent = "";
    const p = document.createElement("p");
    p.style.opacity = "0.5";
    p.textContent = msg;
    list.appendChild(p);
  };

  try {
    const res = await apiFetch("/api/gardens");
    const gardens = await res.json();

    if (!Array.isArray(gardens) || gardens.length === 0) {
      showEmptyMessage("No gardens yet.");
      return;
    }

    list.textContent = "";
    gardens.forEach((g) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.style.cursor = "pointer";
      card.title = "Click to edit garden";

      card.addEventListener("click", () => {
        window.location.href = `/sites/editgarden.html?id=${g.id}`;
      });

      const titleDiv = document.createElement("div");
      titleDiv.style.fontSize = "1.1rem";
      titleDiv.style.fontWeight = "bold";
      titleDiv.style.textAlign = "center";
      titleDiv.textContent = g.garden_name || "Unnamed Garden";
      card.appendChild(titleDiv);

      if (g.garden_content) {
        const gridWrapper = document.createElement("div");
        gridWrapper.style.display = "inline-block";
        gridWrapper.style.background = "rgba(0,0,0,0.3)";
        gridWrapper.style.padding = "8px";
        gridWrapper.style.borderRadius = "6px";
        gridWrapper.style.marginTop = "0.8rem";

        const rows = g.garden_content.split(";").filter((r) => r.trim() !== "");
        rows.forEach((row) => {
          const rowDiv = document.createElement("div");
          rowDiv.style.display = "flex";
          rowDiv.style.justifyContent = "center";

          row.split(",").forEach((col) => {
            let bgColor;
            if (col === "+") bgColor = "rgba(255, 255, 255, 0.2)";
            else if (col === "") bgColor = "#a48231";
            else bgColor = "#cceeb9";

            const cellDiv = document.createElement("div");
            cellDiv.style.width = "14px";
            cellDiv.style.height = "14px";
            cellDiv.style.margin = "2px";
            cellDiv.style.background = bgColor;
            cellDiv.style.borderRadius = "3px";
            rowDiv.appendChild(cellDiv);
          });

          gridWrapper.appendChild(rowDiv);
        });

        card.appendChild(gridWrapper);
      }

      list.appendChild(card);
    });
  } catch {
    showEmptyMessage("Could not load gardens.");
  }
}

// --- Detail content builders for the popup ---

function buildPlantDetail(plant) {
  const wrapper = document.createElement("div");

  const addRow = (label, value) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.setAttribute("class", "detail-label");
    labelCell.textContent = label;

    const valueCell = document.createElement("td");
    valueCell.setAttribute("class", "detail-value");
    valueCell.textContent = value || "-";

    row.appendChild(labelCell);
    row.appendChild(valueCell);
    return row;
  };

  const capitalize = (str) =>
    str ? String(str).charAt(0).toUpperCase() + String(str).slice(1) : "-";

  const table = document.createElement("table");
  table.setAttribute("class", "plant-details-table");

  table.appendChild(addRow("Common name:", capitalize(plant.common_name)));
  table.appendChild(
    addRow("Botanical name:", capitalize(plant.botanical_name)),
  );
  table.appendChild(addRow("Place of origin:", capitalize(plant.origin)));
  table.appendChild(addRow("Plant type:", capitalize(plant.type)));
  table.appendChild(addRow("Planting season:", capitalize(plant.planting)));
  table.appendChild(
    addRow(
      "Pruning season:",
      plant.pruning?.toLowerCase() === "none"
        ? "No need for pruning"
        : capitalize(plant.pruning),
    ),
  );
  table.appendChild(addRow("Harvesting season:", capitalize(plant.harvesting)));
  table.appendChild(addRow("Soil type:", capitalize(plant.soil)));
  table.appendChild(addRow("Water quantity:", capitalize(plant.water)));
  table.appendChild(addRow("Sunlight intensity:", capitalize(plant.sunlight)));
  table.appendChild(
    addRow(
      "Is it indoor:",
      plant.indoor ? "Yes, can stay inside also" : "No, can't be kept inside",
    ),
  );
  table.appendChild(
    addRow(
      "Has seeds:",
      plant.seeds
        ? "Yes, can be propagated by seed"
        : "No, can't be propagated by seed",
    ),
  );

  wrapper.appendChild(table);
  return wrapper;
}

function buildIdeaDetail(idea) {
  const wrapper = document.createElement("div");

  // Image
  if (idea.picture) {
    const img = document.createElement("img");
    img.setAttribute("class", "dp-idea-image");
    img.setAttribute("src", `../pics/gardenideas/${idea.picture}.png`);
    img.setAttribute("alt", idea.title || "");
    wrapper.appendChild(img);
  }

  // Title
  const title = document.createElement("h3");
  title.setAttribute("class", "dp-idea-title");
  title.textContent = idea.title || "";
  wrapper.appendChild(title);

  // Full description
  const desc = document.createElement("p");
  desc.setAttribute("class", "dp-idea-description");
  desc.textContent = idea.description || "";
  wrapper.appendChild(desc);

  wrapper.appendChild(document.createElement("hr"));

  // Plant tags (comma-separated plants field from DB)
  if (idea.plants) {
    const plantListWrapper = document.createElement("div");
    plantListWrapper.setAttribute("class", "dp-plant-list");

    idea.plants.split(",").forEach((plantName) => {
      const tag = document.createElement("span");
      tag.setAttribute("class", "dp-plant-tag");
      tag.textContent = plantName.trim();
      plantListWrapper.appendChild(tag);
    });

    wrapper.appendChild(plantListWrapper);
    wrapper.appendChild(document.createElement("hr"));
  }

  // Stats
  const stats = document.createElement("div");
  stats.setAttribute("class", "dp-stats");

  const createStat = (label, value) => {
    const box = document.createElement("div");
    box.setAttribute("class", "dp-stat-box");

    const badge = document.createElement("div");
    badge.setAttribute("class", "dp-stat-badge");
    badge.textContent = value || "-";

    const lbl = document.createElement("div");
    lbl.setAttribute("class", "dp-stat-label");
    lbl.textContent = label;

    box.appendChild(badge);
    box.appendChild(lbl);
    return box;
  };

  stats.appendChild(createStat("Sunlight", idea.sunlight));
  stats.appendChild(createStat("Water", idea.water));
  stats.appendChild(createStat("Hardiness", idea.maintenance));
  wrapper.appendChild(stats);

  return wrapper;
}

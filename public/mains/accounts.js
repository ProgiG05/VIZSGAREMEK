import { setupNavbar } from "./navbar.js";
import { setupSidePanel } from "./navbar.js";
import { setupLoginState } from "./navbar.js";
import { getUser, apiFetch } from "./api.js";

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
  const sidebarItems = document.querySelectorAll(".account-sidebar-item[data-tab]");
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

  // Logout
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

  // Update Username
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
          showFeedback(feedback, data.message || "Failed to update username.", false);
        }
      } catch {
        showFeedback(feedback, "Network error. Please try again.", false);
      }

      saveUsernameBtn.disabled = false;
      saveUsernameBtn.textContent = "Update Username";
    });
  }

  // Update Password
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
          body: JSON.stringify({ currentPassword: curInput.value, newPassword: newInput.value }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showFeedback(feedback, data.message, true);
          curInput.value = "";
          newInput.value = "";
        } else {
          showFeedback(feedback, data.message || "Failed to update password.", false);
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


// Saved Items

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

  try {
    const res = await apiFetch("/api/savedplants");
    const plants = await res.json();

    if (!Array.isArray(plants) || plants.length === 0) {
      list.innerHTML = "<p style='opacity:0.5;'>No saved plants yet.</p>";
      return;
    }

    list.innerHTML = "";
    plants.forEach((p) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.innerHTML = `<strong>${esc(p.common_name || "Unknown Plant")}</strong>
        <div style="font-size:0.85rem; opacity:0.7; margin-top:0.3rem;">${esc(p.botanical_name || p.type || "")}</div>`;
      list.appendChild(card);
    });
  } catch {
    list.innerHTML = "<p style='opacity:0.5;'>Could not load plants.</p>";
  }
}

async function loadSavedIdeas() {
  const list = document.getElementById("saved-ideas-list");
  if (!list) return;

  try {
    const res = await apiFetch("/api/savedideas");
    const ideas = await res.json();

    if (!Array.isArray(ideas) || ideas.length === 0) {
      list.innerHTML = "<p style='opacity:0.5;'>No saved ideas yet.</p>";
      return;
    }

    list.innerHTML = "";
    ideas.forEach((i) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      const title = i.title || i.idea_name || "Idea";
      const desc = i.description || i.idea_content || "";
      const snippet = desc.length > 80 ? desc.substring(0, 80) + "..." : desc;
      card.innerHTML = `<strong>${esc(title)}</strong>
        <div style="font-size:0.85rem; opacity:0.7; margin-top:0.3rem;">${esc(snippet)}</div>`;
      list.appendChild(card);
    });
  } catch {
    list.innerHTML = "<p style='opacity:0.5;'>Could not load ideas.</p>";
  }
}

async function loadSavedGardens() {
  const list = document.getElementById("saved-gardens-list");
  if (!list) return;

  try {
    const res = await apiFetch("/api/gardens");
    const gardens = await res.json();

    if (!Array.isArray(gardens) || gardens.length === 0) {
      list.innerHTML = "<p style='opacity:0.5;'>No gardens yet.</p>";
      return;
    }

    list.innerHTML = "";
    gardens.forEach((g) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.style.cursor = "pointer";
      card.title = "Click to edit garden";
      
      card.addEventListener("click", () => {
        window.location.href = `/sites/editgarden.html?id=${g.id}`;
      });

      // Construct mini grid preview
      let gridHTML = "";
      if (g.garden_content) {
        gridHTML = `<div style="display:inline-block; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:0.8rem;">`;
        const rows = g.garden_content.split(";").filter(r => r.trim() !== "");
        rows.forEach(row => {
          gridHTML += `<div style="display:flex; justify-content:center;">`;
          const cols = row.split(",");
          cols.forEach(col => {
            let bgColor = "#a48231"; 
            if (col === "") bgColor = "#a48231";
            else if (col === "+") bgColor = "rgba(255, 255, 255, 0.2)";
            else bgColor = "#cceeb9";

            gridHTML += `<div style="width:14px; height:14px; margin:2px; background:${bgColor}; border-radius:3px;"></div>`;
          });
          gridHTML += `</div>`;
        });
        gridHTML += `</div>`;
      }
      
      card.innerHTML = `<div style="font-size:1.1rem; font-weight:bold; text-align:center;">${esc(g.garden_name || "Unnamed Garden")}</div>
        ${gridHTML}`;
      
      list.appendChild(card);
    });
  } catch {
    list.innerHTML = "<p style='opacity:0.5;'>Could not load gardens.</p>";
  }
}

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

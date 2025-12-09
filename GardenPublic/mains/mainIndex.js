const rollDown =  document.getElementById("headerContentRollDown");
rollDown.style.display = "none";
document.getElementById("openSideBar").addEventListener("click", function() {
    rollDown.style.display = "flex";
    rollDown.style.flexDirection = "column";
    rollDown.style.height = "360px";
    rollDown.style.transition = "0.5s";
});
document.getElementById("closeSideBar").addEventListener("click", function() {
    rollDown.style.display = "none";
    rollDown.style.height = "0px";
});
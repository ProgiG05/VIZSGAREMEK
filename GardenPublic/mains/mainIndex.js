const rollDown =  document.getElementById("headerContentRollDown");
rollDown.style.display = "none";
document.getElementById("openSideBar").addEventListener("click", function() {
    rollDown.style.display = "flex";
    rollDown.style.flexDirection = "column";
    // rollDown.style.height = "360px";
    rollDown.style.animationName = "RollingDown"
    rollDown.style.animationDuration = "1s"
});
document.getElementById("closeSideBar").addEventListener("click", function() {
    // rollDown.style.height = "0px";
    rollDown.style.animationName = "RollingUp"
    rollDown.style.animationDuration = "1s"
});
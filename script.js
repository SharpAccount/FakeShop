function startAnim() {
    const fullSidebar = document.getElementById('sidebarTerritory');
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('sidebarIcon');
    const pathToMove = -1 * sidebar.clientWidth - 10;
    console.log(pathToMove);
    if(button.style.rotate == "270deg") {
        button.style.rotate = "90deg"
    } else {
        button.style.rotate = "270deg"
    }
    if (fullSidebar.style.left == pathToMove + "px") {
        fullSidebar.style.left = "0"
        console.log('did');
    } else if(fullSidebar.style.left = "0") {
        fullSidebar.style.left = pathToMove + "px";
        console.log('ddd');
    }
}
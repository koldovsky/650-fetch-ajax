// DOM - Document Object Model
(function() {
    // const clock = document.getElementsByClassName('clock')[0];
    const clock = document.querySelector('.clock');
    function updateClock() {
        clock.innerText = new Date().toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
})();



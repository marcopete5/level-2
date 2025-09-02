document.addEventListener('DOMContentLoaded', function () {
    const goombaInput = document.getElementById('goomba-count');
    const bobombInput = document.getElementById('bobomb-count');
    const cheepcheepInput = document.getElementById('cheepcheep-count');
    const totalCoinsSpan = document.getElementById('total-coins');

    function updateTotal() {
        const goombas = Number(goombaInput.value) || 0;
        const bobombs = Number(bobombInput.value) || 0;
        const cheepcheeps = Number(cheepcheepInput.value) || 0;
        const total = goombas * 5 + bobombs * 7 + cheepcheeps * 11;
        totalCoinsSpan.textContent = total;
    }

    goombaInput.addEventListener('input', updateTotal);
    bobombInput.addEventListener('input', updateTotal);
    cheepcheepInput.addEventListener('input', updateTotal);
});

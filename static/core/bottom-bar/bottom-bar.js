const analyzeButton = document.getElementById('analyze-button');
const result = document.getElementById('result');
const Main = require('.././static/core/bottom-bar/dist/Main').default;
const main = new Main();

analyzeButton.addEventListener('click', (f, fg, dfg) => {
    result.innerHTML = main.run().replace('undefined', '');
});

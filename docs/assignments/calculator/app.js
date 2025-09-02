document.getElementById('add-btn').addEventListener('click', function () {
    var num1 = parseFloat(document.getElementById('add-num1').value);
    var num2 = parseFloat(document.getElementById('add-num2').value);
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('add-result').textContent =
            'Please enter valid numbers';
    } else {
        var result = num1 + num2;
        document.getElementById('add-result').textContent = 'Result: ' + result;
    }
});

document.getElementById('sub-btn').addEventListener('click', function () {
    var num1 = parseFloat(document.getElementById('sub-num1').value);
    var num2 = parseFloat(document.getElementById('sub-num2').value);
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('sub-result').textContent =
            'Please enter valid numbers';
    } else {
        var result = num1 - num2;
        document.getElementById('sub-result').textContent = 'Result: ' + result;
    }
});

document.getElementById('mul-btn').addEventListener('click', function () {
    var num1 = parseFloat(document.getElementById('mul-num1').value);
    var num2 = parseFloat(document.getElementById('mul-num2').value);
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('mul-result').textContent =
            'Please enter valid numbers';
    } else {
        var result = num1 * num2;
        document.getElementById('mul-result').textContent = 'Result: ' + result;
    }
});

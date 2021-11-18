(function init() {
    var el = function (param) {
        if (param.charAt(0) === "#") {
            return document.querySelector(param);
        }

        return document.querySelectorAll(param);
    }

    var viewer = el("#viewer"),
        equals = el("#equals"),
        deleteEl = el("#delete"),
        clear = el("#clear"),
        nums = el("[data-value]"),
        ops = el("[data-operand]");

    var result = 0,
        numberPrevious = "",
        numberCurrent = "",
        operand = "";

    var setNumber = function () {
        numberCurrent += this.getAttribute('data-value');
        viewer.setAttribute('value', numberCurrent)
    }

    for (var i = 0; i < nums.length; i++) {
        nums[i].onclick = setNumber
    }

    var moveNumber = function () {
        numberPrevious = numberCurrent;
        numberCurrent = "";
        operand = this.getAttribute("data-operand");
        viewer.setAttribute('value', operand)
    }

    for (i = 0; i < ops.length; i++) {
        ops[i].onclick = moveNumber
    }

    var display = function () {
        numberPrevious = parseFloat(numberPrevious);
        numberCurrent = parseFloat(numberCurrent);

        switch (operand) {
            case "+":
                result = numberCurrent + numberPrevious;
                break;
            case "-":
                result = numberCurrent - numberPrevious;
                break;
            case "x":
                result = numberCurrent * numberPrevious;
                break;
            case "/":
                result = numberCurrent / numberPrevious;
                break;
            default:
                result = numberPrevious;
                break;
        }

        viewer.setAttribute('value', result)
    }

    equals.onclick = display;

    deleteEl.onclick = function () {
        numberCurrent = numberCurrent.slice(0, -1);
        viewer.setAttribute('value', numberCurrent || 0);
    }

    clear.onclick = function () {
        result = 0;
        numberPrevious = "";
        numberCurrent = "";
        viewer.setAttribute('value', result)
    }

})()

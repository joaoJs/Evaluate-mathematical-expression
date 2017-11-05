var calc = function (exp) {
  // detect for parentheses
  //getOriginal(exp);
  detectParentheses(exp);
};

var getOriginal = function(exp) {
  var obj = {};

}

var detectParentheses = function(exp) {
  var content = [];
  var start = [];
  var end = [];
  var countPar = 0;
  var sections = 0;
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(") {
      if (countPar === 0) {
        start.push(i);
      }
      countPar++;
    }
    if (exp[i] === ")") {
        countPar--;
        if (countPar === 0) {
          end.push(i);
        }
      }
  }
  sections = start.length;
  for (i = 0; i < sections; i++) {
    content.push([exp.slice(start[i] + 1, end[i])],[start[i], end[i]]);
  }
  console.log(start, end);
  console.log("Content --> ", content);
  content.forEach((c,i) => {
    if (i % 2 === 0) {
      if (c[0].includes("(")) {
        detectParentheses(c[0]);
      } else {
        // replace original using regex
        calcSections(c[0]);
      }
    }
  });
}

var calcSections = function(section, indexes ) {
  console.log("Section --> ", section);
  var numbers = [];
  var operations = [];
  var splitted = section.split(" ");
  console.log("Splitted", splitted);
  splitted.forEach(e => {
    if ("+-/*".includes(e)) {
      operations.push(e);
    } else {
      numbers.push(Number(e));
    }
  });

  var res = numbers.reduce((a,b) => {
    var i = 0;
    if (operations[i] === "+") {
      i++;
      return a + b;
    } else if (operations[i] === "-") {
      i++;
      return a - b;
    } else if (operations[i] === "*") {
      i++;
      return a * b;
    } else if (operations[i] === "/") {
      i++;
      return a / b;
    }
  }, 0);
  console.log(res);
}


const expression = "(2 / (2 + 3.33) * 4) - -6 -(7 + 6)";

calc(expression);

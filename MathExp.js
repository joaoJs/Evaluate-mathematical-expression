var calc = function (exp) {
  const expCopy = exp;
  var test = detectParentheses(exp);
  console.log(test);
  test = detectParentheses(test);
  console.log(test);
  test = detectParentheses(test);
  console.log(test);
  test = calcSections(test);
  console.log(test);
}







// function to find parentheses and calculate what's inside
var detectParentheses = function(exp) {
  console.log("\n")
  //console.log("Expression in detectParentheses", exp);
  var content = [];
  var start = [];
  var end = [];
  var countPar = 0;
  var sections = 0;
  var countOpen = 0;
  var countClose = 0;


  // get the  values from the innermost parentheses
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(") {
      if (countPar === 0) {
        start.push(i);
      } else if (countPar > 0) {
        start[start.length-1] = i;
        console.log("UPDATED?");
      } if (countClose > 0) {
        countClose--;
      }
      countPar++;
    } else if (exp[i] === ")") {
        if (countClose === 0) {
          end.push(i);
          countClose++;
        }
        countPar = 0;
      }
  }

  console.log(start, end);


  // store inner array contents
  sections = start.length;
  for (i = 0; i < sections; i++) {
    content.push(exp.slice(start[i] + 1, end[i]));
  }
  console.log("Content --> ", content);

  var res;

  // calculate each innermost Array and replace original array
  content.forEach(c => {
    if (c.includes("*") && c.includes("/")) {
      if (c.indexOf("*") < c.indexOf("/")) {
        res = calcMult(c.split(" "));
        res = calcDiv(res);
      } else {
        res = calcDiv(c.split(" "));
        console.log("RIGHT FTER --> ", res);
        res = calcMult(res);
      }
      res = calcSections(res);
      exp = exp.replace("(" + c + ")", res);
      console.log(res);
    } else if (c.includes("*")) {
      res = calcMult(c.split(" "));
      res = calcSections(res);
      exp = exp.replace("(" + c + ")", res);
      console.log(res);
    } else if (c.includes("/")) {
      res = calcDiv(c.split(" "));
      res = calcSections(res);
      exp = exp.replace("(" + c + ")", res);
      console.log(res);
    } else {
      res = calcSections(c);
      exp = exp.replace("(" + c + ")", res);
      console.log(res);
    }
  });
  return exp;
}






// function to calculate sections (+ and -)
var calcSections = function(section) {
  var splitted;
  var numbers = [];
  var operations = [];
  if (!Array.isArray(section)) {
    splitted = section.split(" ");
  } else {
    splitted = section;
  }

  if (splitted !== undefined) {
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
      }
    });
    return res;
  }
}





// function to find multiplications and calculate them
var calcMult = function(splitted) {
  let indMult = [];
  let multRes = 1;
  let nextOp;
  let nextOpInd;

  for (let i = 0; i < splitted.length; i++)  {
    var n = splitted[i];
      if (n === "*") {
        indMult.push(i - 1);
        multRes = splitted[i-1];
        multRes *= splitted[i+1];
        if (splitted[i+2] && splitted[i+2] === "*") {
          while(splitted[i+2] === "*") {
            i += 2;
            multRes *= splitted[i+1];
            console.log(multRes);
          }
        }
        if (splitted[i+2] && splitted[i+2] !== "*") {
          nextOp = splitted[i+2];
          nextOpInd = i+2;
          splitted[indMult[0]] = multRes;
          splitted = splitted.slice(0, indMult[0]+1).concat(splitted.slice(nextOpInd, splitted.length));
          break;
        } else if (!splitted[i+2]) {
          splitted[indMult[0]] = multRes;
          splitted = splitted.slice(0, indMult[0] + 1);
        }
      }
    };

    while (splitted.includes("*")) {
      splitted = calcMult(splitted);
    }

    return splitted;


}







// function to fin divisions and calculate them
var calcDiv = function(splitted) {
  console.log("INSIDE DIV:");
  console.log(splitted);
  let indDiv = [];
  let divRes = 1;
  let nextOp;
  let nextOpInd;

  for (let i = 0; i < splitted.length; i++)  {
    var n = splitted[i];
      if (n === "/") {
        indDiv.push(i - 1);
        divRes = splitted[i-1];
        divRes = divRes / splitted[i+1];
        if (splitted[i+2] && splitted[i+2] === "/") {
          while(splitted[i+2] === "/") {
            i += 2;
            divRes = divRes / splitted[i+1];
            console.log(divRes);
          }
        }
        if (splitted[i+2] && splitted[i+2] !== "/") {
          nextOp = splitted[i+2];
          nextOpInd = i+2;
          splitted[indDiv[0]] = divRes;
          splitted = splitted.slice(0, indDiv[0]+1).concat(splitted.slice(nextOpInd, splitted.length));
          break;
        } else if (!splitted[i+2]) {
          splitted[indDiv[0]] = divRes;
          splitted = splitted.slice(0, indDiv[0] + 1);
        }
      }
    };

    while (splitted.includes("/")) {
      splitted = calcDiv(splitted);
    }

    return splitted;
}



// var afterMD = function(splitted) {
//   console.log("Inside MD: ")
//   console.log(splitted);
// }

const expression = "(2 / (2 + -(56 - 55) * 3.33 * (1 * 2 + 2) + 3 * 2) * 4) - -6 -(7 + 6)";

calc(expression);

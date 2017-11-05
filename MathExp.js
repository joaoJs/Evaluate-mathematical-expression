var calc = function (exp) {
  // exp = detectParentheses(exp);
  // console.log("In the main function --> ", exp);
  // // exp2 = detectParentheses(exp);
  // // console.log("2nd --> ", exp2);
  // // exp3 = detectParentheses(exp2);
  // // console.log(exp3);
  // // exp4 = detectParentheses(exp3);
  // // console.log(exp4);

  //make a copy

  const expCopy = exp;
  let currentExp = exp;
  while (exp.includes("(")) {
    console.log("\n");
    console.log("EXP --> ", exp);
    currentExp = exp;
    exp = detectParentheses(exp);
  }
  console.log("");
  console.log("Res");
  console.log(exp + " ----- " + currentExp);
  console.log(calcSections(exp));

}







// function to find parentheses and calculate what's inside
var detectParentheses = function(exp) {
  console.log("\n")
  console.log("Expression in detectParentheses", exp);
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
    content.push(exp.slice(start[i] + 1, end[i]));
  }
  //console.log("Content --> ", content);
  for (let i = 0; i < content.length; i++) {
      const c = content[i];
      // if (c.includes("(")) {
      //   detectParentheses(c);
      // } else {
      //   // replace original
      //   exp2 = exp.replace("(" + c + ")", calcSections(c));
      //   console.log("exp2 --> ", exp2);
      //   if (exp2.includes("(")) {
      //     console.log("HERE! --> ", exp2);
      //     var test = detectParentheses(exp2);
      //   } else {
      //     console.log("REs -->", calcSections(exp2));
      //     return calcSections(exp2);
      //   }
      // }
      //console.log("Cs -->  " , c);
      if (!c.includes("(")) {
        // replace original
        exp = exp.replace("(" + c + ")", calcSections(c));
        //console.log("exp --> ", exp);
        return exp;
      }
  }
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c.includes("(")) {
      //console.log(c);
      return c;
      // exp = exp.replace("(" + c + ")", detectParentheses(c));
      // return exp;
    }
  }
}





// function to calculate sections
var calcSections = function(section, indexes ) {
  //console.log("Section --> ", section);
  let hasMult = false;
  let hasDiv = false;
  if (section.includes("*")) {
    hasMult = true;
  } else if (section.includes("/")) {
    hasDiv = true;
  }
  var numbers = [];
  var operations = [];
  var splitted = section.split(" ");
  console.log("Splitted", splitted);


  // make function for if has mult

  let indMult = [];
  let indDiv = [];
  let multRes = 1;
  let divRes = [];
  let nextOp;
  let nextOpInd;

  if (hasMult) {
    splitted = calcMult(splitted);
  }

  if (hasDiv) {
    splitted = calcMult(splitted);
  }


  splitted.forEach(e => {
    if ("+-/*".includes(e)) {
      operations.push(e);
    } else {
      numbers.push(Number(e));
    }
  });

  console.log("");
  console.log("---->>> Splitted after mult");
  console.log(splitted);

  var res = numbers.reduce((a,b) => {
    var i = 0;
    if (operations[i] === "+") {
      i++;
      return a + b;
    } else if (operations[i] === "-") {
      i++;
      return a - b;
    }
    // else if (operations[i] === "*") {
    //   i++;
    //   return a * b;
    // } else if (operations[i] === "/") {
    //   i++;
    //   return a / b;
    // }
  });
  return res;
}





// function to find multiplications and calculate them
var calcMult = function(splitted) {
  let indMult = [];
  let multRes = 1;
  let nextOp;
  let nextOpInd;

  splitted.forEach((n,i) => {
      if (n === "*") {
        indMult.push(i - 1);
        multRes = splitted[i-1];
        multRes *= splitted[i+1];
        if (splitted[i+2] && splitted[i+2] === "*") {
          while(splitted[i+2] === "*") {
            i += 2;
            multRes *= i+1;
          }
        }
        if (splitted[i+2] && splitted[i+2] !== "*") {
          nextOp = splitted[i+2];
          nextOpInd = splitted[i+2];
          splitted[indMult] = multRes;
        } else if (!splitted[i+2]) {
          splitted[indMult] = multRes;
          console.log(splitted.slice(0, indMult[0] + 1));
          splitted = splitted.slice(0, indMult[0] + 1);
        }
      }
    });

    return splitted;

}







// function to fin divisions and calculate them
var calcDiv = function(section) {
  let indDiv = [];
  let divRes = [];
  let nextOp;
  let nextOpInd;

  splitted.forEach((n,i) => {
      if (n === "/") {
        indDiv.push(i - 1);
        divRes = splitted[i-1];
        divRes /= splitted[i+1];
        if (splitted[i+2] && splitted[i+2] === "/") {
          while(splitted[i+2] === "/") {
            i += 2;
            divRes /= i+1;
          }
        }
        if (splitted[i+2] && splitted[i+2] !== "/") {
          nextOp = splitted[i+2];
          nextOpInd = splitted[i+2];
          splitted[indDiv] = divRes;
        } else if (!splitted[i+2]) {
          splitted[indDiv] = divRes;
          console.log(splitted.slice(0, indDiv[0] + 1));
          splitted = splitted.slice(0, indDiv[0] + 1);
        }
      }
    });

    return splitted;
}

const expression = "(2 / (2 + -(56 - 55) * 3.33) * 4) - -6 -(7 + 6)";

calc(expression);

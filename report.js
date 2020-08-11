"use strict";
window.addEventListener("load", () => {
  var rui = new Report_ui(
    document.querySelector("#start"),
    document.querySelector("#clear")
  );
  rui.setNumber_ui(document.querySelectorAll("#panel2 > button"));
  rui.setHouhou_ui(document.querySelectorAll("#panel3 > button"));
});

class Report_ui {
  constructor(start,clear) {
    this.start = start;
    this.clear = clear;
    this.keisan = new Keisan();

    this.clear.addEventListener("click", () => {
      let target = document.getElementById("area2");
      target.innerHTML = "計算結果出力";
    });
    this.start.addEventListener("click", () => {
      this.keisan.next();
    });
  }
  setNumber_ui(btnArray) {
    for (let btn of btnArray) {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("number"))
          this.keisan.setAler(btn.getAttribute("number"));
      });
    }
  }
  setHouhou_ui(btnArray) {
    for (let btn of btnArray) {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("number"))
          this.keisan.setHouhou(btn.getAttribute("number"));
          let number = this.keisan.setHouhou(btn.getAttribute("number"));
          let target = document.getElementById("area2");
          target.insertAdjacentHTML = number;
      });
    }
  }
}
class Keisan {
  constructor() {
    this.aler = 0.0001;
    this.houhou = 1;
  }
  next() {
    let target = document.getElementById("area2");
    if(this.houhou=1){
      let a = 0.0;
      let b = 1.0;
      let c;

      target.insertAdjacentHTML('beforeend', "<br>x^3 + x - 1 の2分法による数値計算<br>");
      target.insertAdjacentHTML('beforeend', "初期値 a=" + a + "<br>");
      target.insertAdjacentHTML('beforeend', "初期値 b=" + b + "<br>");

      do {
        c = (a + b) / 2.0;
        target.insertAdjacentHTML('beforeend', c + "<br>");
        if (func_y(c) * func_y(a) < 0) b = c;
        else a = c;
      } while (Math.abs(a - b) > this.aler);
      target.insertAdjacentHTML('beforeend', "近似解 x = " + c);
    }else if(this.houhou=2){
      let a = 1.0;
      let b;

      target.insertAdjacentHTML('beforeend', "<br>x^3 + x - 1 のニュートン法による数値計算<br>");
      target.insertAdjacentHTML('beforeend', "初期値 a=" + a + "<br>");

      while (1) {
        b = a - func_y(a) / func_z(a);
        target.insertAdjacentHTML('beforeend', b + "<br>");
        if (Math.abs(a - b) < aler) break;
        else a = b;
      }
      target.insertAdjacentHTML('beforeend', "近似解 x = " + b);
    }
  }
  setAler(f){
    this.aler = f;
  }
  setHouhou(g){
    this.houhou = g;
  }
}

function func_y(x) {
  return Math.pow(x, 3.0) + x - 1.0;
}

function func_z(x) {
  return 3.0 * Math.pow(x, 2.0) + 1.0;
}

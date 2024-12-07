/*
 *   Author: Reetabrata Bhandari
 *   Version: 1.0
 *   Poetica (c) Reetabrata Bhandari | All rights reserved (GitHub - @jimfleax)
 */

const utils = require("./utils.js");
document.body.onload = () => {
  if (
    Math.round(
      (parseFloat(
        ((_, __, ___) => {
          json = [];
          for ($ in localStorage) {
            !localStorage.hasOwnProperty($) ||
              ((__ = (localStorage[$].length + $.length) * 2),
              (_ += __),
              json.push(`"${$.substr(0, 50)}":"${(__ / 1024).toFixed(2)} KB"`));
          }
          json.push(`"Total": "${(_ / 1024).toFixed(2)} KB"`);
          return JSON.parse(`{${json.join()}}`);
        })(0).Total
      ) /
        10000) *
        100
    ) >= 90
  ) {
    document.body.innerHTML = `<span style=" font-family: 'Poppins'; background: #fff; color: #888888; display: block; padding: 40px 30px; position: fixed; border-radius: 15px; top: 0; bottom: 0; left: 0; right: 0; width: 42%; height: fit-content; margin: auto; box-shadow: 1px 2px 7px -2px #0000002b; "><b class="gradient" style=" font-size: 22px; ">Poetica has been reseted to recover space.</b><br><br>All websites are assigned around 10MB of storage by browsers. Poetica is dependent on this storage space for storing all the poems. When too many poems are stored in Poetica, it gradually runs low on storage capacity. Now it has crossed the quota of 10MB, so Poetica has been reseted to recover space. I am sorry for this inconvenience.<div><div><br>Please reload to access Poetica again.</div></div></span>`;
    localStorage["poemDB"] = `[{"poems":[]},{"quizzes":[]}]`;
    localStorage["quizScorecard"] = "[]";
    localStorage["practiceScorecard"] = "[]";
    return;
  }
  var pg;
  ((ls, make, msg, modal) => {
    ((pages, getBuffer, poemsObj, dbDownload) => {
      make(
        "#app",
        "div",
        `<div class="flex" style=" padding: 5px 20px; background: #ffffffa8; border-radius: 15px; "> <div id="icon"><span>Poetica</span></div> <div id="navPages"> <div id="navOption"><span>Home</span></div> <div id="navOption"><span>Poems</span></div> <div id="navOption"><span>Practice</span></div> <div id="navOption"><span>Quizzes</span></div> <div id="navOption"><span>Settings</span></div> </div> </div> </div>`,
        "",
        null,
        false,
        "id|nav"
      );
      make("#app", "div", "", "", null, false, "id|main");
      pg = pages(
        document.querySelector("#main"),
        poemsObj,
        (elN) => {
          ls = localStorage;
          ls.setItem("activeDrag", !elN || elN.className);
          return ls.activeDrag;
        },
        (poemN) => {
          var poemLn = [];
          poemN.forEach((b) => {
            k = [];
            b.split(" ").forEach((c) => {
              c = c.split(String.fromCharCode(160)).join("");
              c === "" || c.includes(" ") || k.push(c);
            });
            k.join(" ") === "" ||
              poemLn.includes(k.join(" ")) ||
              poemLn.push(k.join(" "));
          });
          delete k;
          return poemLn;
        },
        (active) => {
          var loc =
            ((getBuffer(active).top +
              document.querySelector("#poemDrag").scrollTop) *
              2 +
              active.offsetHeight) /
            2;
          var diff = [];
          document
            .querySelectorAll("#poemLine[dragging='false']")
            .forEach((a) => {
              diff.push([
                Math.abs((getBuffer(a).top * 2 + a.offsetHeight) / 2 - loc),
                a,
              ]);
            });
          diff.sort((a, b) => {
            return a[0] - b[0];
          });
          return diff[0][1];
        },
        getBuffer,
        (existingLoc, title, author, content) => {
          var po = poemsObj;
          [title, author, content].includes(null) ||
          [title, author, content].includes("")
            ? msg("Please fill in all the details")
            : (!po[existingLoc]
                ? po.push({
                    title: title,
                    content: ((a) => {
                      b = [];
                      a.split("\n").forEach((a) => {
                        b.push(a === " " ? "\n" : a);
                      });
                      return b.join("\n");
                    })(content),
                    author: author,
                  })
                : typeof existingLoc === "object"
                ? po.splice(existingLoc[0], 1)
                : (po[existingLoc] = {
                    title: title,
                    content: ((a) => {
                      b = [];
                      a.split("\n").forEach((a) => {
                        b.push(a === " " ? "\n" : a);
                      });
                      return b.join("\n");
                    })(content),
                    author: author,
                  }),
              (lsCop = JSON.parse(ls.poemDB)),
              (lsCop.poems = po),
              ls.setItem("poemDB", JSON.stringify(lsCop)),
              dbDownload());
        },
        (() => {
          try {
            return (
              JSON.parse(
                localStorage["poemDB"] ||
                  ((localStorage[
                    "poemDB"
                  ] = `[{"poems": []}, {"quizzes": []}]`),
                  localStorage["poemDB"])
              ).quizzes || []
            );
          } catch (er) {
            console.log(er);
            msg("Database corrupt. Reseting...");
            localStorage["poemDB"] = `[{"poems": []}, {"quizzes": []}]`;
          }
        })(),
        null,
        null,
        (length = 300) => {
          var token = [];
          while (
            token.length !== length ||
            (
              JSON.parse(localStorage["poemDB"] || "[]").quizzes || []
            ).findIndex((a) => {
              return a._id === token.join("");
            }) !== -1
          ) {
            token = [];
            for (i = 0; i < length; i++) {
              token.push(
                `1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`.charAt(
                  Math.round(Math.random() * 61)
                )
              );
            }
          }
          return token.join("");
        },
        dbDownload
      );
      pg.home();
    })(
      (
        main,
        poemsObj,
        storeDrag,
        poemTxt,
        closest,
        getBuffer,
        updatePoemDB,
        quizObj,
        timer,
        isMoz,
        token,
        dbDownload
      ) => {
        var addPracticeScore = (poem, score) => {
          date = new Date().toLocaleDateString("in");
          score = score === "Correct" ? 1 : score === "Wrong" ? 0 : score / 100;
          lsObj = JSON.parse(ls.getItem("practiceScorecard") || "[]");
          var p =
            lsObj.findIndex((a) => {
              return a.title === poem.title;
            }) >= 0
              ? lsObj.findIndex((a) => {
                  return a.title === poem.title;
                })
              : (lsObj.push({
                  title: poem.title,
                  totalQuestions: [],
                  dates: [],
                  accuracy: [],
                }),
                lsObj.length - 1);
          !lsObj[p].dates.includes(date)
            ? (lsObj[p].totalQuestions.push(1),
              lsObj[p].dates.push(date),
              lsObj[p].accuracy.push(score))
            : ((lsObj[p].totalQuestions[lsObj[p].totalQuestions.length - 1] =
                ++lsObj[p].totalQuestions[lsObj[p].totalQuestions.length - 1]),
              (lsObj[p].accuracy[lsObj[p].accuracy.length - 1] = lsObj[
                p
              ].accuracy[lsObj[p].accuracy.length - 1] +=
                score));
          ls.setItem("practiceScorecard", JSON.stringify(lsObj));
        };
        var arng = (
          isMixed = false,
          para,
          a,
          isQuiz = false,
          module,
          questNo
        ) => {
          main.innerHTML = `<div id="arrangeInOrder">${
            isQuiz
              ? `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">${module.title}</span></div>`
              : `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">${
                  isMixed ? "Mixed" : `${a.title} by ${a.author}`
                }</span></div>`
          }<div id="poemDrag"></div><div style=" display: flex; width: fit-content; margin: auto; "><button id="resetBtn"><svg viewBox="0 0 24 24" style="display: block;width: 25px;height: 25px;fill: #fff;margin: auto;"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></svg></button><button id="checkBtn">Check</button></div></div>`;
          isQuiz
            ? (document.querySelector("#back").onclick = () => {
                modal(
                  1,
                  "Do you really want to quit?",
                  `<span>Quitting the quiz will mark the remaining questions unattempted. Are you sure you want to quit?</span><div class="flex" style=" margin: 22px auto; width: calc(100% - 20em); "><button id="checkBtn" style=" margin-inline: auto; ">Yes, I want to quit</button><button id="checkBtn" style=" margin-inline: auto; ">Cancel</button></div>`
                );
                document.querySelector(
                  ".p_info > .flex > #checkBtn:nth-child(1)"
                ).onclick = () => {
                  document.querySelector("#backdrop").click();
                  pg.quiz();
                  ls.removeItem("quizScore");
                  clearInterval(timer);
                  timer = null;
                  document.querySelector("#quizNav").remove();
                  document.querySelector("#navPages").style.display = "flex";
                };
                document.querySelector(
                  ".p_info > .flex > #checkBtn:nth-child(2)"
                ).onclick = () => {
                  modal(0);
                };
              })
            : (document.querySelector("#back").onclick = () => {
                pg.practice();
                document.querySelector("#practiceOption:nth-child(2)").click();
              });
          var fl;
          !isMixed ||
            (fl = ((p) => {
              if (poemsObj[p].content.split("\n").length < 4) {
                console.log("Less than 4 lines. Included the whole poem.");
                return poemsObj[p].content;
              }
              var cutL = Math.max(
                Math.min(
                  Math.round(
                    Math.random() * (poemsObj[p].content.split("\n").length - 1)
                  ),
                  6
                ),
                4
              );
              var lines = [];
              var start = Math.round(
                Math.random() *
                  (poemsObj[p].content.split("\n").length - 1 - cutL)
              );
              for (i = 0; i <= cutL; i++) {
                lines.push(poemsObj[p].content.split("\n")[start++]);
              }
              return lines.join("\n");
            })(a));
          para = fl;
          var poem;
          isMixed || para < a.content.split("\n\n").length || (para = 0);
          isMixed || (poem = a.content.split("\n\n")[para].split("\n"));
          poem = isMixed ? poemTxt(fl.split("\n")) : poemTxt(poem);
          var shuffled = [];
          var _num = [];
          var random = function () {
            var numb = Math.round(Math.random() * (poem.length - 1));
            if (_num.includes(numb) === true) {
              return random();
            } else {
              return numb;
            }
          };
          while (shuffled.length !== poem.length) {
            var num = random();
            _num.push(num);
            shuffled.push(
              (() => {
                return poem[num];
              })()
            );
            if (shuffled.length === poem.length) {
              shuffled.forEach((f, g) => {
                _v = document.createElement("span");
                _v.id = "poemLine";
                _v.className = "_" + g;
                _v.innerHTML = f;
                document.querySelector("#poemDrag").append(_v);
                _v.setAttribute("dragging", false);
                var boo;
                var closestEl = null;
                _v.onmousedown = (event) => {
                  activeDrag = document.querySelector(
                    "." + storeDrag(event.target)
                  );
                  activeDrag.setAttribute("dragging", true);
                  var handleMove = (e) => {
                    activeDrag.setAttribute("dragging", true);
                    closestEl = closest(activeDrag);
                    activeDrag.style.cssText = `position:absolute;top:${
                      e.y - activeDrag.offsetHeight / 2
                    }px;`;
                    document.querySelectorAll("#poemLine").forEach((a) => {
                      while (parseFloat(a.style.marginBottom) > 6) {
                        a.style.marginBottom =
                          parseFloat(a.style.marginBottom) - 1 + "px";
                      }
                      while (parseFloat(a.style.marginTop) > 6) {
                        a.style.marginTop =
                          parseFloat(a.style.marginTop) - 1 + "px";
                      }
                    });
                    !closestEl ||
                      !e.target.closest("#poemLine") ||
                      ((boo =
                        (getBuffer(closestEl).top * 2 +
                          closestEl.offsetHeight) /
                          2 >=
                        e.y + document.querySelector("#poemDrag").scrollTop),
                      boo
                        ? (closestEl.style.marginTop = "52px")
                        : (closestEl.style.marginBottom = "52px"));
                    e.y < getBuffer(document.querySelector("#poemDrag")).top
                      ? document.querySelector("#poemDrag").scrollBy(0, -10)
                      : !(
                          e.y >
                          getBuffer(document.querySelector("#poemDrag")).top +
                            document.querySelector("#poemDrag").offsetHeight
                        ) ||
                        document.querySelector("#poemDrag").scrollBy(0, 10);
                    if (e.stopPropagation) e.stopPropagation();
                    else e.cancelBubble = !0;
                  };
                  var handleUp = (ev) => {
                    document.querySelectorAll("#poemLine").forEach((a) => {
                      while (parseFloat(a.style.marginBottom) > 6) {
                        a.style.marginBottom =
                          parseFloat(a.style.marginBottom) - 1 + "px";
                      }
                      while (parseFloat(a.style.marginTop) > 6) {
                        a.style.marginTop =
                          parseFloat(a.style.marginTop) - 1 + "px";
                      }
                    });
                    event.target.style.cssText = ``;
                    document.removeEventListener("mousemove", handleMove, true);
                    document.removeEventListener("mouseup", handleUp, true);
                    cl = event.target.cloneNode(true);
                    cl.className = "clone";
                    !closestEl ||
                      (boo
                        ? closestEl.insertAdjacentElement("beforeBegin", cl)
                        : closestEl.insertAdjacentElement("afterEnd", cl),
                      document
                        .querySelector(".clone")
                        .replaceWith(event.target));
                    activeDrag.setAttribute("dragging", false);
                    storeDrag(null);
                    activeDrag = null;
                    closestEl = null;
                    if (ev.stopPropagation) ev.stopPropagation();
                    else e.cancelBubble = !0;
                  };
                  document.addEventListener("mousemove", handleMove, true);
                  document.addEventListener("mouseup", handleUp, true);
                  if (event.stopPropagation) event.stopPropagation();
                  else event.cancelBubble = !0;
                  if (event.preventDefault) event.preventDefault();
                };
                delete _v;
              });
              document.querySelector("#checkBtn").onclick = () => {
                var resPoem = [];
                document.querySelector("#poemDrag").childNodes.forEach((a) => {
                  resPoem.push(a.innerHTML);
                });
                if (isQuiz) {
                  addQuizScore(
                    module,
                    resPoem.join("\n") === poem.join("\n") ? "Correct" : "Wrong"
                  );
                  quizStart(module, ++questNo);
                  return;
                }
                addPracticeScore(
                  a,
                  resPoem.join("\n") === poem.join("\n") ? "Correct" : "Wrong"
                );
                document.querySelector(
                  "#arrangeInOrder > div:nth-child(3)"
                ).outerHTML = (() => {
                  return resPoem.join("\n") === poem.join("\n")
                    ? `<div id="footRes" class="flex"><svg aria-hidden="true" viewBox="0 0 14 12" style="width: 20px;height: 20px;margin: auto 50px auto 18px;fill: #4caf50;padding: 10px;border: solid 4px #4caf5091;border-radius: 50%;"><path d="M12.4359 0.331777C12.2464 0.142193 11.9146 0 11.6302 0C11.3458 0 11.0141 0.142193 10.8245 0.331777L4.68692 6.46933L2.89506 4.67747C2.72223 4.50463 2.41975 4.375 2.16049 4.375C1.90123 4.375 1.59876 4.50463 1.42592 4.67747L0.302474 5.80092C0.086425 6.01697 0 6.27623 0 6.53549C0 6.79475 0.129635 7.09723 0.302474 7.27006L4.10494 11.0725C4.32098 11.2886 4.58025 11.375 4.83951 11.375C4.86446 11.375 4.8898 11.3738 4.9154 11.3715C4.94216 11.3738 4.96868 11.375 4.99479 11.375C5.27917 11.375 5.56355 11.2802 5.80053 11.0432L13.6682 3.17553C13.8578 2.98594 14 2.65417 14 2.36979C14 2.08542 13.9052 1.80104 13.6682 1.56406L12.4359 0.331777Z"></path></svg><button id="submitBtn" style="margin-block: 0px;font-size: 17px;box-shadow: none !important;"><span>Next</span><svg viewBox="0 0 24 24" style=" width: 40px; height: 40px; "><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`
                    : `<div id="footRes" class="flex"><svg viewBox="0 0 13 13" style="width: 20px;height: 20px;fill: #f44336e3;margin: auto 50px auto 18px;padding: 10px;border: solid 4px #f44336ba;border-radius: 50%;"><path d="M11.2125 0.379173C10.9958 0.162507 10.6167 0 10.2917 0C9.96667 0 9.58749 0.162507 9.37083 0.379173L6.5 3.25L3.62917 0.379173C3.41251 0.162507 3.03333 0 2.70833 0C2.38333 0 2.00416 0.162507 1.78749 0.379173L0.379173 1.78749C0.10834 2.05833 0 2.38333 0 2.70833C0 3.03333 0.162507 3.41251 0.379173 3.62917L3.25 6.5L0.379173 9.37083C0.162507 9.58749 0 9.96667 0 10.2917C0 10.6167 0.10834 10.9417 0.379173 11.2125L1.78749 12.6208C2.00416 12.8375 2.38333 13 2.70833 13C3.03333 13 3.35834 12.8917 3.62917 12.6208L6.5 9.75L9.37083 12.6208C9.64166 12.8917 9.96667 13 10.2917 13C10.6167 13 10.9958 12.8375 11.2125 12.6208L12.6208 11.2125C12.8917 10.9417 13 10.6167 13 10.2917C13 9.96667 12.8375 9.58749 12.6208 9.37083L9.75 6.5L12.6208 3.62917C12.8375 3.41251 13 3.03333 13 2.70833C13 2.38333 12.8917 2.05833 12.6208 1.78749L11.2125 0.379173Z"></path></svg><button id="submitBtn" style="margin-block: 0px;font-size: 17px;box-shadow: none !important;"><span>Next</span><svg viewBox="0 0 24 24" style=" width: 40px; height: 40px; "><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`;
                })();
                document.querySelector("#poemDrag").innerHTML = ``;
                poem.forEach((b) => {
                  _v = document.createElement("span");
                  _v.id = "poemLine";
                  _v.innerHTML = b;
                  document.querySelector("#poemDrag").append(_v);
                });
                document.querySelector("#submitBtn").onclick = () => {
                  arng(
                    isMixed,
                    ++para,
                    isMixed
                      ? Math.round(Math.random() * (poemsObj.length - 1))
                      : a
                  );
                };
              };
              document.querySelector("#resetBtn").onclick = () => {
                document.querySelector("#poemDrag").innerHTML = "";
                shuffled.forEach((f, g) => {
                  _v = document.createElement("span");
                  _v.id = "poemLine";
                  _v.draggable = !0;
                  _v.className = g;
                  _v.innerHTML = f;
                  document.querySelector("#poemDrag").append(_v);
                  _v.ondragstart = (event) => {
                    event.dataTransfer.setData(
                      "text",
                      "#poemDrag > span.\\3" + g + " "
                    );
                  };
                  delete _v;
                });
              };
            }
          }
        };
        var fillIn = (
          poem,
          isMixed = false,
          para = 0,
          isQuiz = false,
          module,
          questNo
        ) => {
          var freq = 0;
          var fl;
          !isMixed ||
            (fl = ((p) => {
              if (poemsObj[p].content.split("\n").length < 4) {
                console.log("Less than 4 lines. Included the whole poem.");
                return poemsObj[p].content;
              }
              var cutL = Math.max(
                Math.min(
                  Math.round(
                    Math.random() * (poemsObj[p].content.split("\n").length - 1)
                  ),
                  6
                ),
                4
              );
              var lines = [];
              var start = Math.round(
                Math.random() *
                  (poemsObj[p].content.split("\n").length - 1 - cutL)
              );
              for (i = 0; i <= cutL; i++) {
                lines.push(poemsObj[p].content.split("\n")[start++]);
              }
              return lines.join("\n");
            })(poem));
          para < poemsObj[poem].content.split("\n\n").length || (para = 0);
          currPara = poemsObj[poem].content.split("\n\n")[para];
          while (freq <= 1) {
            freq = Math.max(
              Math.min(
                Math.round((fl || currPara).split(" ").length / 2),
                Math.round(
                  (Math.random() * (fl || currPara).split(" ").length) / 4
                )
              ),
              2
            );
          }
          var blanks = [];
          var blNum = [];
          var poemText = [];
          for (i = 0; i < freq; i++) {
            isMixed
              ? ((gn = Math.round(Math.random() * (fl.split(" ").length - 1))),
                blNum.includes(gn) ? i-- : blNum.push(gn))
              : ((gn = Math.round(
                  Math.random() * (currPara.split(" ").length - 1)
                )),
                blNum.includes(gn) ? i-- : blNum.push(gn));
          }
          isMixed
            ? fl.split(" ").forEach((a, b) => {
                var formated = [];
                var word = [];
                a.split("").forEach((c, h) => {
                  c.charCodeAt(0) >= 2437 && c.charCodeAt(0) <= 2563
                    ? (word.push(c), formated.push(c))
                    : word.push(c);
                });
                a = word.join("");
                blNum.includes(b) && a.length >= 3 && a.match(formated.join(""))
                  ? (poemText.push(
                      a.replace(
                        formated.join(""),
                        `<input title="Fill in the blank" id="fillInBlank" autocorrect="off" autocomplete="off">`
                      )
                    ),
                    blanks.push(formated.join("")))
                  : poemText.push(word.join(""));
              })
            : currPara.split(" ").forEach((a, b) => {
                var formated = [];
                var word = [];
                a.split("").forEach((c, h) => {
                  c.charCodeAt(0) >= 2437 && c.charCodeAt(0) <= 2563
                    ? (word.push(c), formated.push(c))
                    : word.push(c);
                });
                a = word.join("");
                blNum.includes(b) && a.length >= 3 && a.match(formated.join(""))
                  ? (poemText.push(
                      a.replace(
                        formated.join(""),
                        `<input title="Fill in the blank" id="fillInBlank" autocorrect="off" autocomplete="off">`
                      )
                    ),
                    blanks.push(formated.join("")))
                  : poemText.push(word.join(""));
              });
          poemText = poemText.join(" ");
          if (blanks.length <= 1) {
            console.log("Too few blanks. Regenerating...");
            fillIn(poem, isMixed, para, isQuiz, module, questNo);
            return;
          }
          main.innerHTML = `<div id="fillIn">${
            isQuiz
              ? `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">${module.title}</span></div>`
              : `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">${
                  isMixed
                    ? "Mixed"
                    : `${poemsObj[poem].title} by ${poemsObj[poem].author}`
                }</span></div>`
          }<span id="fillInQ">${poemText}</span><button id="checkBtn" style=" margin: 40px auto; ">Submit</button></div>`;
          isQuiz
            ? (document.querySelector("#back").onclick = () => {
                modal(
                  1,
                  "Do you really want to quit?",
                  `<span>Quitting the quiz will mark the remaining questions unattempted. Are you sure you want to quit?</span><div class="flex" style=" margin: 22px auto; width: calc(100% - 20em); "><button id="checkBtn" style=" margin-inline: auto; ">Yes, I want to quit</button><button id="checkBtn" style=" margin-inline: auto; ">Cancel</button></div>`
                );
                document.querySelector(
                  ".p_info > .flex > #checkBtn:nth-child(1)"
                ).onclick = () => {
                  document.querySelector("#backdrop").click();
                  pg.quiz();
                  ls.removeItem("quizScore");
                  clearInterval(timer);
                  timer = null;
                  document.querySelector("#quizNav").remove();
                  document.querySelector("#navPages").style.display = "flex";
                };
                document.querySelector(
                  ".p_info > .flex > #checkBtn:nth-child(2)"
                ).onclick = () => {
                  modal(0);
                };
              })
            : (document.querySelector("#back").onclick = () => {
                pg.practice();
                document.querySelector("#practiceOption:nth-child(3)").click();
              });
          document.querySelector("#checkBtn").onclick = () => {
            correct = 0;
            wrong = 0;
            document.querySelectorAll("#fillInBlank").forEach((a, b) => {
              a.setAttribute("disabled", true);
              blanks[b] ||
                modal(
                  1,
                  `Error Occurred`,
                  `<code>${JSON.stringify({
                    blanks: blanks,
                    blanksOfB: blanks[b] || "Not there",
                    b: b,
                    correct: correct,
                    wrong: wrong,
                    blNum: blNum,
                    poemText: poemText,
                  })}</code>`
                );
              a.value === blanks[b]
                ? ((a.outerHTML = `<span id="correct">${blanks[b]}</span>`),
                  correct++)
                : ((a.outerHTML = `<strike>${
                    a.value ||
                    `<b style="font-family: 'Poppins'; font-size: 24px; margin-block: auto; display: -webkit-inline-box;">Unattempted</b>`
                  }</strike> <span id="correct">${blanks[b]}</span>`),
                  wrong++);
            });
            if (isQuiz) {
              addQuizScore(module, Math.round((correct / blanks.length) * 100));
              quizStart(module, ++questNo);
              return;
            }
            addPracticeScore(
              poemsObj[poem],
              Math.round((correct / blanks.length) * 100)
            );
            document.querySelector("#checkBtn").outerHTML = (() => {
              return Math.round((correct / blanks.length) * 100) === 100
                ? `<div id="footRes" class="flex"><svg aria-hidden="true" viewBox="0 0 14 12" style="width: 30px;height: 30px;margin: auto 50px auto 18px;fill: #4caf50;padding: 10px;border: solid 4px #4caf5091;border-radius: 50%;"><path d="M12.4359 0.331777C12.2464 0.142193 11.9146 0 11.6302 0C11.3458 0 11.0141 0.142193 10.8245 0.331777L4.68692 6.46933L2.89506 4.67747C2.72223 4.50463 2.41975 4.375 2.16049 4.375C1.90123 4.375 1.59876 4.50463 1.42592 4.67747L0.302474 5.80092C0.086425 6.01697 0 6.27623 0 6.53549C0 6.79475 0.129635 7.09723 0.302474 7.27006L4.10494 11.0725C4.32098 11.2886 4.58025 11.375 4.83951 11.375C4.86446 11.375 4.8898 11.3738 4.9154 11.3715C4.94216 11.3738 4.96868 11.375 4.99479 11.375C5.27917 11.375 5.56355 11.2802 5.80053 11.0432L13.6682 3.17553C13.8578 2.98594 14 2.65417 14 2.36979C14 2.08542 13.9052 1.80104 13.6682 1.56406L12.4359 0.331777Z"></path></svg><span>Accuracy: 100%</span><button id="submitBtn" style="margin-block: 0px;font-size: 17px;box-shadow: none !important;"><span>Next</span><svg viewBox="0 0 24 24" style=" width: 40px; height: 40px; "><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`
                : `<div id="footRes" class="flex"><svg viewBox="0 0 13 13" style="width: 30px;height: 30px;fill: #f44336e3;margin: auto 50px auto 18px;padding: 10px;border: solid 4px #f44336ba;border-radius: 50%;"><path d="M11.2125 0.379173C10.9958 0.162507 10.6167 0 10.2917 0C9.96667 0 9.58749 0.162507 9.37083 0.379173L6.5 3.25L3.62917 0.379173C3.41251 0.162507 3.03333 0 2.70833 0C2.38333 0 2.00416 0.162507 1.78749 0.379173L0.379173 1.78749C0.10834 2.05833 0 2.38333 0 2.70833C0 3.03333 0.162507 3.41251 0.379173 3.62917L3.25 6.5L0.379173 9.37083C0.162507 9.58749 0 9.96667 0 10.2917C0 10.6167 0.10834 10.9417 0.379173 11.2125L1.78749 12.6208C2.00416 12.8375 2.38333 13 2.70833 13C3.03333 13 3.35834 12.8917 3.62917 12.6208L6.5 9.75L9.37083 12.6208C9.64166 12.8917 9.96667 13 10.2917 13C10.6167 13 10.9958 12.8375 11.2125 12.6208L12.6208 11.2125C12.8917 10.9417 13 10.6167 13 10.2917C13 9.96667 12.8375 9.58749 12.6208 9.37083L9.75 6.5L12.6208 3.62917C12.8375 3.41251 13 3.03333 13 2.70833C13 2.38333 12.8917 2.05833 12.6208 1.78749L11.2125 0.379173Z"></path></svg><span>Accuracy: ${Math.round(
                    (correct / blanks.length) * 100
                  )}%</span><button id="submitBtn" style="margin-block: 0px;font-size: 17px;box-shadow: none !important;"><span>Next</span><svg viewBox="0 0 24 24" style=" width: 40px; height: 40px; "><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`;
            })();
            document.querySelector("#submitBtn").onclick = () => {
              isMixed
                ? fillIn(
                    Math.round(Math.random() * (poemsObj.length - 1)),
                    true
                  )
                : fillIn(poem, false, ++para);
            };
          };
        };
        var nxtLn = (poem = null, isQuiz = false, module, questNo) => {
          var poemNum;
          poemLn = poemTxt(
            poemsObj[
              poem ||
                ((poemNum = Math.round(Math.random() * (poemsObj.length - 1))),
                poemNum)
            ].content.split("\n")
          );
          ((qal) => {
            qal[0].split(" ").length > 2 ||
              !qal[1] ||
              (console.log(`Question: ${qal[0]}\nAnswer: ${qal[1]}`),
              console.log("The poem line is too short! Regenerating..."),
              nxtLn(poem, isQuiz, module, questNo));
            main.innerHTML = `<div id="tellNext">${
              isQuiz
                ? `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">${module.title}</span></div>`
                : `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Tell the next line</span></div>`
            }<span id="poemPart" style="margin-top:60px;">${
              qal[0]
            }</span><div id="nextSelect"><input id="nextInput" placeholder="Choose the next line" autocorrect="off" autocomplete="off"></div><button id="checkBtn" style=" margin: 40px auto; ">Submit</button></div>`;
            isQuiz
              ? (document.querySelector("#back").onclick = () => {
                  modal(
                    1,
                    "Do you really want to quit?",
                    `<span>Quitting the quiz will mark the remaining questions unattempted. Are you sure you want to quit?</span><div class="flex" style=" margin: 22px auto; width: calc(100% - 20em); "><button id="checkBtn" style=" margin-inline: auto; ">Yes, I want to quit</button><button id="checkBtn" style=" margin-inline: auto; ">Cancel</button></div>`
                  );
                  document.querySelector(
                    ".p_info > .flex > #checkBtn:nth-child(1)"
                  ).onclick = () => {
                    document.querySelector("#backdrop").click();
                    pg.quiz();
                    ls.removeItem("quizScore");
                    clearInterval(timer);
                    timer = null;
                    document.querySelector("#quizNav").remove();
                    document.querySelector("#navPages").style.display = "flex";
                  };
                  document.querySelector(
                    ".p_info > .flex > #checkBtn:nth-child(2)"
                  ).onclick = () => {
                    modal(0);
                  };
                })
              : (document.querySelector("#back").onclick = pg.practice);
            document.querySelector("#nextInput").onfocus = () => {
              make(
                "body",
                "div",
                "",
                `top:${
                  getBuffer(document.querySelector("#nextSelect")).top +
                  document.querySelector("#nextSelect").offsetHeight +
                  10
                }px; left:${
                  getBuffer(document.querySelector("#nextSelect")).left
                }px;width:${
                  document.querySelector("#nextSelect").offsetWidth - 32
                }px;`,
                null,
                false,
                "id|expandedSelect"
              );
              make(
                "body",
                "div",
                "",
                "",
                () => {
                  !(
                    document.querySelector("#expandedSelect") ||
                    document.querySelector("#backfield")
                  ) ||
                    (document.querySelector("#expandedSelect").remove(),
                    document.querySelector("#backfield").remove());
                },
                false,
                "id|backfield"
              );
              window.onblur = () => {
                !document.querySelector("#backfield") ||
                  document.querySelector("#backfield").click();
              };
              shuffled = (() => {
                var p = [];
                poemsObj.forEach((_a) => {
                  _a.content.split("\n").forEach((__a) => {
                    p.push(__a);
                  });
                });
                return poemTxt(p);
              })().sort((a, b) => {
                return a.charCodeAt(0) - b.charCodeAt(0);
              });
              shuffled.forEach((a, h) => {
                make(
                  "#expandedSelect",
                  "div",
                  `<span>${a}</span>`,
                  "",
                  () => {
                    document.querySelector("#nextInput").value = a;
                    !(
                      document.querySelector("#expandedSelect") ||
                      document.querySelector("#backfield")
                    ) ||
                      (document.querySelector("#expandedSelect").remove(),
                      document.querySelector("#backfield").remove());
                  },
                  false,
                  "id|lineOption",
                  "index|" + h
                );
                !document.querySelector(
                  "[index='" +
                    shuffled.indexOf(
                      document.querySelector("#nextInput").value
                    ) +
                    "']"
                ) ||
                  (document.querySelector(
                    "[index='" +
                      shuffled.indexOf(
                        document.querySelector("#nextInput").value
                      ) +
                      "']"
                  ).className = "selected");
              });
              document.querySelector("#nextInput").oninput = () => {
                document.querySelector(
                  "#expandedSelect"
                ).innerHTML = `<span class="loading" style="display:block;width:fit-content;height:fit-content;margin:auto;">Searching...</span>`;
                searchedStr = shuffled.filter((a) => {
                  return a.includes(document.querySelector("#nextInput").value);
                });
                searchedStr.length ||
                  (document.querySelector(
                    `.loading`
                  ).innerHTML = `No matches found.`);
                searchedStr.forEach((a, h) => {
                  !document.querySelector(`.loading`) ||
                    document.querySelector(`.loading`).remove();
                  make(
                    "#expandedSelect",
                    "div",
                    `<span>${a}</span>`,
                    "",
                    () => {
                      document.querySelector("#nextInput").value = a;
                      !(
                        document.querySelector("#expandedSelect") ||
                        document.querySelector("#backfield")
                      ) ||
                        (document.querySelector("#expandedSelect").remove(),
                        document.querySelector("#backfield").remove());
                    },
                    false,
                    "id|lineOption",
                    "index|" + h
                  );
                });
              };
            };
            document.querySelector("#checkBtn").onclick = () => {
              if (isQuiz) {
                addQuizScore(
                  module,
                  document.querySelector("#nextInput").value === qal[1]
                    ? "Correct"
                    : "Wrong"
                );
                quizStart(module, ++questNo);
                return;
              }
              addPracticeScore(
                poemsObj[poemNum],
                document.querySelector("#nextInput").value === qal[1]
                  ? "Correct"
                  : "Wrong"
              );
              document.querySelector(
                "#tellNext"
              ).innerHTML = `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Tell the next line</span></div><span id="poemPart">${
                qal[0]
              }</span><span id="poemPart" style=" background: linear-gradient(45deg, #f3e5f5, #ffebee); padding-inline: 14px; padding-top: 10px; border-radius: 8px; ">${
                qal[1]
              }</span><div id="footRes" class="flex">${(() => {
                return document.querySelector("#nextInput").value === qal[1]
                  ? `<svg aria-hidden="true" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" style="width: 30px;height: 30px;fill: #4caf50;margin: auto 50px 40px 0px;padding: 10px;border: solid 4px #4caf5091;border-radius: 50%;"><path d="M12.4359 0.331777C12.2464 0.142193 11.9146 0 11.6302 0C11.3458 0 11.0141 0.142193 10.8245 0.331777L4.68692 6.46933L2.89506 4.67747C2.72223 4.50463 2.41975 4.375 2.16049 4.375C1.90123 4.375 1.59876 4.50463 1.42592 4.67747L0.302474 5.80092C0.086425 6.01697 0 6.27623 0 6.53549C0 6.79475 0.129635 7.09723 0.302474 7.27006L4.10494 11.0725C4.32098 11.2886 4.58025 11.375 4.83951 11.375C4.86446 11.375 4.8898 11.3738 4.9154 11.3715C4.94216 11.3738 4.96868 11.375 4.99479 11.375C5.27917 11.375 5.56355 11.2802 5.80053 11.0432L13.6682 3.17553C13.8578 2.98594 14 2.65417 14 2.36979C14 2.08542 13.9052 1.80104 13.6682 1.56406L12.4359 0.331777Z"></path></svg>`
                  : `<svg viewBox="0 0 13 13" style="width: 30px;height: 30px;fill: #f44336e3;margin: auto 50px 40px 0px;padding: 10px;border: solid 4px #f44336ba;border-radius: 50%;"><path d="M11.2125 0.379173C10.9958 0.162507 10.6167 0 10.2917 0C9.96667 0 9.58749 0.162507 9.37083 0.379173L6.5 3.25L3.62917 0.379173C3.41251 0.162507 3.03333 0 2.70833 0C2.38333 0 2.00416 0.162507 1.78749 0.379173L0.379173 1.78749C0.10834 2.05833 0 2.38333 0 2.70833C0 3.03333 0.162507 3.41251 0.379173 3.62917L3.25 6.5L0.379173 9.37083C0.162507 9.58749 0 9.96667 0 10.2917C0 10.6167 0.10834 10.9417 0.379173 11.2125L1.78749 12.6208C2.00416 12.8375 2.38333 13 2.70833 13C3.03333 13 3.35834 12.8917 3.62917 12.6208L6.5 9.75L9.37083 12.6208C9.64166 12.8917 9.96667 13 10.2917 13C10.6167 13 10.9958 12.8375 11.2125 12.6208L12.6208 11.2125C12.8917 10.9417 13 10.6167 13 10.2917C13 9.96667 12.8375 9.58749 12.6208 9.37083L9.75 6.5L12.6208 3.62917C12.8375 3.41251 13 3.03333 13 2.70833C13 2.38333 12.8917 2.05833 12.6208 1.78749L11.2125 0.379173Z"></path></svg>`;
              })()}<button id="submitBtn" style=""><span>Next</span><svg viewBox="0 0 24 24"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`;
              document.querySelector("#back").onclick = pg.practice;
              document.querySelector("#submitBtn").onclick = () => {
                nxtLn();
              };
              delete qal;
            };
          })(
            (() => {
              var tN = Math.round(Math.random() * (poemLn.length - 2));
              return [
                poemLn[tN],
                poemLn[tN + 1] ||
                  modal(
                    1,
                    "Error Report",
                    `An error has occurred. Please convey these details to Reetabrata Bhandari.<br><br><b>Question</b>: ${qal[0]}<br><b>Answer: </b>${qal[1]}<br><br>You may take a screenshot or use any other means to communicate this message to him. THIS IS IMPORTANT, <b>PLEASE DO NOT IGNORE!!!</b>`
                  ),
              ];
            })()
          );
        };
        function min2prop(mins) {
          var prop =
            mins >= 60
              ? [
                  Math.floor(mins / 60),
                  min2prop(mins - Math.floor(mins / 60) * 60)[0][1],
                  min2prop(mins - Math.floor(mins / 60) * 60)[0][2],
                ]
              : Number.isInteger(mins)
              ? [0, mins, 0]
              : [
                  0,
                  Math.floor(mins),
                  Math.round((mins - Math.floor(mins)) * 60),
                ];
          return [
            prop,
            `${!prop[0] ? "" : prop[0].toString().concat(" hrs ")}${
              !prop[1] ? "" : prop[1].toString().concat(" mins ")
            }${!prop[2] ? "" : prop[2].toString().concat(" secs")}`,
          ];
        }
        var prop2mins = (str) => {
          var hrs = (mins = secs = 0);
          str.split(" ").indexOf("hrs") === -1 ||
            (hrs = parseFloat(
              str.split(" ")[str.split(" ").indexOf("hrs") - 1]
            ));
          str.split(" ").indexOf("mins") === -1 ||
            (mins = parseFloat(
              str.split(" ")[str.split(" ").indexOf("mins") - 1]
            ));
          str.split(" ").indexOf("secs") === -1 ||
            (secs = parseFloat(
              str.split(" ")[str.split(" ").indexOf("secs") - 1]
            ));
          return min2prop(hrs * 60 + mins + secs / 60);
        };
        var addQuizScore = (module, score, init = false) => {
          date = new Date().toJSON();
          ls.getItem("quizScore")
            ? ls.setItem(
                "quizScore",
                parseFloat(ls.quizScore) +
                  (score === "Correct"
                    ? 1
                    : score === "Wrong"
                    ? 0
                    : score / 100)
              )
            : ls.setItem(
                "quizScore",
                score === "Correct" ? 1 : score === "Wrong" ? 0 : score / 100
              );
          lsObj = JSON.parse(ls.getItem("quizScorecard") || "[]");
          init
            ? lsObj.push({
                _id: module._id,
                name: module.title,
                accuracy: 0,
                attempted: [1, module.questions.length],
                timeTaken: [0, 0],
                createdAt: date,
              })
            : ((lsObj[lsObj.length - 1].accuracy = Math.round(
                (JSON.parse(ls.getItem("quizScore")) /
                  module.questions.length) *
                  100
              )),
              (lsObj[lsObj.length - 1].attempted = [
                parseInt(
                  document
                    .querySelector("#quizNavItem:nth-child(1) > span")
                    .innerHTML.split("/")[0]
                    .split(" ")[1]
                ),
                module.questions.length,
              ]),
              (lsObj[lsObj.length - 1].timeTaken = min2prop(
                (min2prop(module.duration)[0][0] * 3600000 +
                  min2prop(module.duration)[0][1] * 60000 +
                  min2prop(module.duration)[0][2] * 1000 -
                  (prop2mins(
                    document.querySelector("#quizNavItem:nth-child(2) > span")
                      .innerHTML
                  )[0][0] *
                    3600000 +
                    prop2mins(
                      document.querySelector("#quizNavItem:nth-child(2) > span")
                        .innerHTML
                    )[0][1] *
                      60000 +
                    prop2mins(
                      document.querySelector("#quizNavItem:nth-child(2) > span")
                        .innerHTML
                    )[0][2] *
                      1000)) /
                  60000
              )));
          ls.setItem("quizScorecard", JSON.stringify(lsObj));
        };
        var quizStart = (module, questNo = 0) => {
          if (questNo === module.questions.length) {
            pg.quiz();
            msg("You have completed the quiz");
            ls.removeItem("quizScore");
            clearInterval(timer);
            timer = null;
            document.querySelector("#quizNav").remove();
            document.querySelector("#navPages").style.display = "flex";
            return;
          }
          document.querySelector("#navPages").style.display = "none";
          document.querySelector("#quizNav") ||
            make(
              "#nav > div",
              "div",
              `<div id="quizNavItem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path d="M5 7 3 7a2 2 0 0 1-2-2l0-2a2 2 0 0 1 2-2l2 0a2 2 0 0 1 2 2l0 2a2 2 0 0 1-2 2z"></path> <path d="m13 7-2 0a2 2 0 0 1-2-2l0-2a2 2 0 0 1 2-2l2 0a2 2 0 0 1 2 2l0 2a2 2 0 0 1-2 2z"></path> <path d="m5 15-2 0a2 2 0 0 1-2-2l0-2a2 2 0 0 1 2-2l2 0a2 2 0 0 1 2 2l0 2a2 2 0 0 1-2 2z"></path> <path d="m13 15-2 0a2 2 0 0 1-2-2l0-2a2 2 0 0 1 2-2l2 0a2 2 0 0 1 2 2l0 2a2 2 0 0 1-2 2z"></path> </svg><span>Question: __</span></div><div id="quizNavItem"><svg title="Clock" onclick="whichClockSelected(1);showClock(1)" focusable="false" viewBox="0 0 24 24" aria-hidden="true" class="sel"> <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path> </svg><span>Time</span></div>`,
              "",
              null,
              false,
              "id|quizNav"
            );
          document.querySelector(
            "#quizNavItem:nth-child(1) > span"
          ).innerHTML = `Question ${questNo + 1}/${module.questions.length}`;
          var questions = [];
          var duration = (time =
            min2prop(module.duration)[0][0] * 3600000 +
            min2prop(module.duration)[0][1] * 60000 +
            min2prop(module.duration)[0][2] * 1000);
          module.questions.forEach((a) => {
            questions.push([
              a.split("|")[0].slice(undefined, -1),
              a.split("|")[1].slice(1),
            ]);
          });
          timer ||
            (timer = setInterval(() => {
              document.querySelector(
                "#quizNavItem:nth-child(2) > span"
              ).innerHTML = min2prop((duration -= 60) / 60000)[1];
              duration > 0 ||
                (pg.quiz(),
                msg("Time is up!"),
                ls.removeItem("quizScore"),
                clearInterval(timer),
                addQuizScore(module, 0, false),
                (timer = null),
                document.querySelector("#quizNav").remove(),
                (document.querySelector("#navPages").style.display = "flex"));
            }, 60));
          var a = questions[questNo] || msg("An error occurred");
          if (
            [
              "Arrange in order",
              "Fill in the blanks",
              "Tell the next line",
            ].indexOf(a[1]) === 0
          ) {
            arng(
              false,
              Math.round(
                Math.random() *
                  (poemsObj
                    .filter((p) => {
                      return p.title === a[0];
                    })[0]
                    .content.split("\n\n").length -
                    1)
              ),
              poemsObj.filter((p) => {
                return p.title === a[0];
              })[0],
              true,
              module,
              questNo
            );
          } else if (
            [
              "Arrange in order",
              "Fill in the blanks",
              "Tell the next line",
            ].indexOf(a[1]) === 1
          ) {
            fillIn(
              poemsObj.indexOf(
                poemsObj.filter((p) => {
                  return p.title === a[0];
                })[0]
              ),
              false,
              Math.round(
                Math.random() *
                  (poemsObj
                    .filter((p) => {
                      return p.title === a[0];
                    })[0]
                    .content.split("\n\n").length -
                    1)
              ),
              true,
              module,
              questNo
            );
          } else if (
            [
              "Arrange in order",
              "Fill in the blanks",
              "Tell the next line",
            ].indexOf(a[1]) === 2
          ) {
            nxtLn(
              poemsObj.indexOf(
                poemsObj.filter((p) => {
                  return p.title === a[0];
                })[0]
              ),
              true,
              module,
              questNo
            );
          }
        };
        try {
          chrome;
        } catch (e) {
          msg(
            "Mozilla currently is incompatible with Poetica. Might be unstable!"
          );
          isMoz = true;
        }
        return {
          home: () => {
            main.style.height = `${
              (isMoz
                ? (console.warn("Used innerHeight. Browser is Mozilla."),
                  innerHeight)
                : document.body.offsetHeight) -
              document.querySelector("#nav").offsetHeight -
              10
            }px`;
            document.querySelector("#icon").innerHTML = `<span>Poetica</span>`;
            main.innerHTML = `<div id="homepage"> <div class="flex" style=" padding-top: 60px; "> <div id="rightContent"> <span><b>Immerse\n</b> yourself in the world \n         of <b>poetry </b>with\n                  <b style=\"\n    font-size: 76px;\n\">Poetica.</b></span> </div> <div id="leftContent"> <div id="navBox"> <div id="optionBtn" class="btn"> <span>Read poems</span> </div> <div id="optionBtn" class="btn"> <span>Practice</span> </div> <div id="optionBtn" class="btn"> <span>Take a quiz</span> </div> </div> </div> </div> </div>`;
            document.querySelector("#navOption:nth-child(1) > span").onclick =
              pg.home;
            document.querySelector("#navOption:nth-child(2) > span").onclick =
              document.querySelector("#optionBtn:nth-child(1)").onclick =
                pg.readPoems;
            document.querySelector("#navOption:nth-child(3) > span").onclick =
              document.querySelector("#optionBtn:nth-child(2)").onclick =
                pg.practice;
            document.querySelector("#navOption:nth-child(4) > span").onclick =
              document.querySelector("#optionBtn:nth-child(3)").onclick =
                pg.quiz;
            document.querySelector("#navOption:nth-child(5) > span").onclick =
              pg.settings;
          },
          readPoems: () => {
            document.querySelector(
              "#icon"
            ).innerHTML = `<span>Poetica</span><span>Read poems</span>`;
            main.innerHTML = `<div id="readPoems"><div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="poemWrapper"><div id="poemsContainer"></div></div> </div>`;
            document.querySelector("#back").onclick = pg.home;
            poemsObj.forEach((a) => {
              make(
                "#poemsContainer",
                "div",
                `<div id="poemTitle"><span>${a.title}</span><span>by ${a.author}</span></div>`,
                "",
                () => {
                  make(
                    "#readPoems",
                    "div",
                    `<div id="back"></div><span id="poemName" class="gradient">${a.title} by ${a.author}</span><span id="poemContent">${a.content}</span>`,
                    "",
                    null,
                    true,
                    "id|poemDisplay"
                  );
                  make(
                    "#back",
                    "div",
                    `<svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span>`,
                    "",
                    pg.readPoems,
                    true,
                    "id|back"
                  );
                },
                false,
                "id|poemItem"
              );
            });
          },
          practice: () => {
            document.querySelector(
              "#icon"
            ).innerHTML = `<span>Poetica</span><span>Practice</span>`;
            main.innerHTML = `<div id="practice"><div class="flex"><div id="back" style=""><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><span id="quizAddBtn"><span class="gradient">View scores</span></span> </div><div id="practiceOption"><span class="gradient">Arrange in order</span><svg viewBox="0 0 24 24" style="width: 80px;height: 80px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></div><div id="practiceOption"><span class="gradient">Fill in the blanks</span><svg viewBox="0 0 24 24" style="width: 80px;height: 80px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></div><div id="practiceOption"><span class="gradient">Tell the next line</span><svg viewBox="0 0 24 24" style="width: 80px;height: 80px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></div></div>`;
            document.querySelector("#back").onclick = pg.home;
            document.querySelector("#quizAddBtn").onclick = () => {
              modal(
                1,
                `<style> #sum_info { width: calc(100% - 16em); height: -webkit-fill-available; } .h_info { } .p_info {max-height: -webkit-fill-available; height: -webkit-fill-available; } </style>`,
                `<div id="scorecard">${
                  !ls.getItem("practiceScorecard") ||
                  !JSON.parse(ls.getItem("practiceScorecard")).length
                    ? `<span class="gradient">Scorecard</span>`
                    : `<div class="flex"><span class="gradient">Scorecard</span><span id="quizAddBtn" style=" margin-inline: auto 46px; padding: 2px 12px; "><span>Clear scorecard</span></span></div>`
                }<div class="flex" style=" flex-direction: column; "> <div id="scoreContainer"> <div id="scoreItem"> <div class="flex"> <span>Poem</span><span>Questions</span><span>Accuracy</span></div> </div> </div> </div> </div>`
              );
              scores = JSON.parse(ls.getItem("practiceScorecard") || "[]");
              !document.querySelector("#scorecard > div.flex > #quizAddBtn") ||
                (document.querySelector(
                  "#scorecard > div.flex > #quizAddBtn"
                ).onclick = () => {
                  ls.setItem("practiceScorecard", "[]");
                  msg("Cleared scorecard successfully");
                });
              var mFn = () => {
                scores.forEach((o, p) => {
                  make(
                    "#scoreContainer",
                    "div",
                    `<div class="flex"><span style="text-decoration: underline;font-weight: 600;">${
                      o.title
                    }</span><span style="text-decoration: underline;font-weight: 600;">${
                      ((totQ = o.totalQuestions.reduce((a, b) => {
                        return a + b;
                      })),
                      totQ)
                    }</span><span style="text-decoration: underline;font-weight: 600;">${parseInt(
                      (o.accuracy
                        .map((m, n) => {
                          return m;
                        })
                        .reduce((a, b) => {
                          return a + b;
                        }) /
                        totQ) *
                        100
                    )}%</span></div>`,
                    `cursor: pointer; padding: 6px 6px; background: #f3e5f573;`,
                    () => {
                      document.querySelector(
                        "#scorecard > div:nth-child(1)"
                      ).innerHTML = `<svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin: auto 14px;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg> <span class="gradient">Scorecard &gt; ${o.title}</span><span id="quizAddBtn" style=" margin-inline: auto 46px; padding: 2px 12px; "><span>Clear scorecard</span></span>`;
                      document.querySelector(
                        "#scorecard > div:nth-child(1) > svg"
                      ).onclick = () => {
                        document.querySelector(
                          "#scorecard > div:nth-child(1)"
                        ).innerHTML = `<span class="gradient">Scorecard</span><span id="quizAddBtn" style=" margin-inline: auto 46px; padding: 2px 12px; "><span>Clear scorecard</span></span>`;
                        document.querySelectorAll("#scoreItem").forEach((k) => {
                          k.remove();
                        });
                        document.querySelector(
                          "#scoreContainer"
                        ).innerHTML = `<div id="scoreItem"> <div class="flex"> <span>Poem</span><span>Questions</span><span>Accuracy</span></div> </div>`;
                        mFn();
                      };
                      document.querySelectorAll("#scoreItem").forEach((k) => {
                        k.remove();
                      });
                      document.querySelector(
                        "#scoreContainer"
                      ).innerHTML = `<div id="scoreItem"> <div class="flex"> <span>Date</span><span>Questions</span><span>Accuracy</span></div> </div>`;
                      for (i = 0; i < o.dates.length; i++) {
                        make(
                          "#scoreContainer",
                          "div",
                          `<div class="flex"><span>${o.dates[i]}</span><span>${
                            o.totalQuestions[i]
                          }</span><span>${parseInt(
                            (o.accuracy[i] / o.totalQuestions[i]) * 100
                          )}%</span></div>`,
                          "",
                          null,
                          false,
                          "id|scoreItem"
                        );
                      }
                    },
                    false,
                    "id|scoreItem",
                    "class|poemRootScoreItem"
                  );
                });
              };
              mFn();
              scores.length ||
                make(
                  "#scoreContainer",
                  "span",
                  `No scores to show`,
                  "",
                  null,
                  false,
                  "id|empty"
                );
            };
            document.querySelector("#practiceOption:nth-child(2)").onclick =
              () => {
                document.querySelector(
                  "#icon"
                ).innerHTML = `<span>Poetica</span><span>Practice &gt; Arrange in order</span>`;
                main.innerHTML = `<div id="readPoems"><div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="poemWrapper"><div id="poemsContainer"></div></div> </div>`;
                document.querySelector("#back").onclick = pg.practice;
                poemsObj.forEach((a, b) => {
                  make(
                    "#poemsContainer",
                    "div",
                    `<div id="poemTitle"><span>${a.title}</span><span>by ${a.author}</span></div>`,
                    "",
                    () => {
                      arng(false, 0, a);
                    },
                    false,
                    "id|poemItem"
                  );
                  poemsObj[b + 1] ||
                    make(
                      "#poemsContainer",
                      "div",
                      `<div id="poemTitle"><span>Mixed</span><span>by Various</span></div>`,
                      "",
                      () => {
                        arng(
                          true,
                          0,
                          Math.round(Math.random() * (poemsObj.length - 1))
                        );
                      },
                      false,
                      "id|poemItem"
                    );
                });
              };
            document.querySelector("#practiceOption:nth-child(3)").onclick =
              () => {
                document.querySelector(
                  "#icon"
                ).innerHTML = `<span>Poetica</span><span>Practice &gt; Fill in the blanks</span>`;
                main.innerHTML = `<div id="readPoems"><div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="poemWrapper"><div id="poemsContainer"></div></div> </div>`;
                document.querySelector("#back").onclick = pg.practice;
                poemsObj.forEach((a, b) => {
                  make(
                    "#poemsContainer",
                    "div",
                    `<div id="poemTitle"><span>${a.title}</span><span>by ${a.author}</span></div>`,
                    "",
                    () => {
                      fillIn(b, false, 0);
                    },
                    false,
                    "id|poemItem"
                  );
                  poemsObj[b + 1] ||
                    make(
                      "#poemsContainer",
                      "div",
                      `<div id="poemTitle"><span>Mixed</span><span>by Various</span></div>`,
                      "",
                      () => {
                        fillIn(
                          Math.round(Math.random() * (poemsObj.length - 1)),
                          true,
                          0
                        );
                      },
                      false,
                      "id|poemItem"
                    );
                });
              };
            document.querySelector("#practiceOption:nth-child(4)").onclick =
              () => {
                document.querySelector(
                  "#icon"
                ).innerHTML = `<span>Poetica</span><span>Practice &gt; Tell the next line</span>`;
                nxtLn();
              };
          },
          quiz: () => {
            var addQuiz = (
              module = {
                title: null,
                duration: null,
                difficulty: null,
                questions: [],
              }
            ) => {
              calcTime = () => {
                if (
                  document.querySelector("#nextSelect").innerHTML !== "Custom"
                ) {
                  var duration = 0;
                  document
                    .querySelectorAll("#addQuestion > #lineOption")
                    .forEach((d) => {
                      duration += parseFloat(
                        [
                          [2.5, 2, 1],
                          [1.7, 1.2, 0.6],
                          [1.2, 0.8, 0.4],
                        ][
                          ["Low", "Medium", "High"].indexOf(
                            document.querySelector("#nextSelect").innerHTML
                          )
                        ][
                          [
                            " Arrange in order",
                            " Fill in the blanks",
                            " Tell the next line",
                          ].indexOf(d.children[0].innerHTML.split("|")[1])
                        ]
                      );
                    });
                  document.querySelector(
                    "#setTime > span:nth-child(2) > input"
                  ).value = duration.toFixed(1);
                }
              };
              modal(
                1,
                `<style> #sum_info { width: calc(100% - 16em); height: -webkit-fill-available; } .h_info { } .p_info {max-height: -webkit-fill-available; height: -webkit-fill-available; } </style>`,
                `<div id="addQuiz">${
                  quizObj.includes(module)
                    ? `<div class="flex"><span class="gradient" style=" ">Edit quiz</span><span id="quizAddBtn" style=" margin-inline: auto 46px; padding: 2px 12px; "><span>Delete</span><svg class="deletePoem" viewBox="0 0 24 24" style=""><path style="d:path('M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z');"></path></svg></span></div>`
                    : `<span class="gradient" style=" ">Add quiz</span>`
                } <div class="flex" style=" flex-direction: column; "> <div id="addQuizFields"> <span id="addQuizTitle"><span>Enter quiz title: </span><input placeholder="Quiz title" value="${
                  module.title || "Untitled quiz"
                }"></span> <span id="setDifficulty"><span>Set difficulty: </span><div id="nextSelect">${
                  module.difficulty || "Medium"
                }</div></span> <span id="setTime"><span>Set quiz duration: </span><span><input placeholder="Quiz duration" value="${
                  module.duration || "0"
                }"> mins</span></span> </div> <div id="overview"> <div id="addQuestion"> <div id="addQuizQuestion"><span>Questions</span><span>${
                  module.questions.length || "0"
                }</span><svg viewBox="0 0 20 20"> <path d="M9.5 16.5a.5.5 0 001 0v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6z" fill-rule="nonzero"></path> </svg></div></div> </div> <button id="checkBtn" style=" margin-inline: auto; ">${
                  module ? "Edit" : "Add"
                } quiz</button> </div> </div>`
              );
              !document.querySelector(
                "#addQuiz > div.flex > #quizAddBtn:nth-child(2)"
              ) ||
                (document.querySelector(
                  "#addQuiz > div.flex > #quizAddBtn:nth-child(2)"
                ).onclick = () => {
                  try {
                    var po = JSON.parse(ls.poemDB);
                    po.quizzes.splice(
                      po.quizzes.findIndex((g) => {
                        return g._id === module._id;
                      }),
                      1
                    );
                    ls.setItem("poemDB", JSON.stringify(po));
                    dbDownload();
                    pg.quiz();
                  } catch (e) {
                    console.log(e);
                    msg("An error occurred");
                  }
                });
              document.querySelector("#nextSelect").innerHTML === "Custom"
                ? ((document.querySelector(
                    "#setTime > span:nth-child(2) > input"
                  ).disabled = false),
                  (document.querySelector(
                    "#setTime > span:nth-child(2) > input"
                  ).style.width = ""))
                : (calcTime(),
                  (document.querySelector(
                    "#setTime > span:nth-child(2) > input"
                  ).disabled = true),
                  (document.querySelector(
                    "#setTime > span:nth-child(2) > input"
                  ).style.width = `${
                    document.querySelector(
                      "#setTime > span:nth-child(2) > input"
                    ).value.length *
                      10 +
                    20
                  }px`));
              document.querySelector("#nextSelect").onclick = () => {
                make(
                  "body",
                  "div",
                  "",
                  `top:${
                    getBuffer(document.querySelector("#nextSelect")).top +
                    document.querySelector("#nextSelect").offsetHeight +
                    60
                  }px; left:${
                    getBuffer(document.querySelector("#nextSelect")).left +
                    getBuffer(document.querySelector("#sum_info")).left
                  }px;width:${
                    document.querySelector("#nextSelect").offsetWidth - 32
                  }px;`,
                  null,
                  false,
                  "id|expandedSelect"
                );
                make(
                  "body",
                  "div",
                  "",
                  "",
                  () => {
                    !(
                      document.querySelector("#expandedSelect") ||
                      document.querySelector("#backfield")
                    ) ||
                      (document.querySelector("#expandedSelect").remove(),
                      document.querySelector("#backfield").remove());
                  },
                  false,
                  "id|backfield"
                );
                window.onblur = () => {
                  !document.querySelector("#backfield") ||
                    document.querySelector("#backfield").click();
                };
                var shuffled = ["Low", "Medium", "High", "Custom"];
                shuffled.forEach((a, h) => {
                  make(
                    "#expandedSelect",
                    "div",
                    `<span>${a}</span>`,
                    "",
                    (e) => {
                      document.querySelector("#nextSelect").innerHTML = a;
                      a === "Custom"
                        ? ((document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).disabled = false),
                          (document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).style.width = ""))
                        : (calcTime(),
                          (document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).disabled = true),
                          (document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).style.width = `${
                            document.querySelector(
                              "#setTime > span:nth-child(2) > input"
                            ).value.length *
                              10 +
                            20
                          }px`)),
                        !(
                          document.querySelector("#expandedSelect") ||
                          document.querySelector("#backfield")
                        ) ||
                          (document.querySelector("#expandedSelect").remove(),
                          document.querySelector("#backfield").remove());
                    },
                    false,
                    "id|lineOption",
                    "index|" + h
                  );
                });
              };
              document.querySelector("#addQuizQuestion > svg").onclick = () => {
                make(
                  "body",
                  "div",
                  "",
                  `top:${
                    getBuffer(document.querySelector("#addQuizQuestion")).top -
                    238
                  }px; left:${
                    getBuffer(document.querySelector("#addQuizQuestion")).left +
                    getBuffer(document.querySelector("#sum_info")).left
                  }px;width:${
                    document.querySelector("#addQuizQuestion").offsetWidth - 32
                  }px;`,
                  null,
                  false,
                  "id|expandedSelect"
                );
                make(
                  "body",
                  "div",
                  "",
                  "",
                  () => {
                    !(
                      document.querySelector("#expandedSelect") ||
                      document.querySelector("#backfield")
                    ) ||
                      (document.querySelector("#expandedSelect").remove(),
                      document.querySelector("#backfield").remove());
                  },
                  false,
                  "id|backfield"
                );
                window.onblur = () => {
                  !document.querySelector("#backfield") ||
                    document.querySelector("#backfield").click();
                };
                shuffled = poemsObj.sort((a, b) => {
                  return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });
                shuffled.forEach((a, h) => {
                  a = a.title;
                  make(
                    "#expandedSelect",
                    "div",
                    `<span style=" flex: 1; ">${a}</span><span id="questType">Arrange in order</span><span id="questType">Fill in the blanks</span><span id="questType">Tell the next line</span>`,
                    "",
                    (e) => {
                      var s;
                      e.target.id !== "questType" ||
                        ((s = make(
                          "#addQuestion",
                          "div",
                          `<span>${a} | ${e.target.innerHTML}</span>`,
                          "",
                          null,
                          false,
                          "id|lineOption"
                        )),
                        make(
                          s,
                          "svg",
                          `<path style="d:path('M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z');"></path>`,
                          "",
                          () => {
                            s.remove();
                            document.querySelector(
                              "#addQuizQuestion > span:nth-child(2)"
                            ).innerHTML =
                              document.querySelector("#addQuestion")
                                .childElementCount - 1;
                            calcTime();
                          },
                          false,
                          "class|deletePoem",
                          "viewBox|0 0 24 24"
                        ),
                        (document.querySelector(
                          "#addQuizQuestion > span:nth-child(2)"
                        ).innerHTML =
                          document.querySelector("#addQuestion")
                            .childElementCount - 1),
                        calcTime(),
                        !(
                          document.querySelector("#expandedSelect") ||
                          document.querySelector("#backfield")
                        ) ||
                          (document.querySelector("#expandedSelect").remove(),
                          document.querySelector("#backfield").remove()));
                    },
                    false,
                    "id|lineOption",
                    "index|" + h
                  );
                });
              };
              module.questions.forEach((g) => {
                var s = make(
                  "#addQuestion",
                  "div",
                  `<span>${g}</span>`,
                  "",
                  null,
                  false,
                  "id|lineOption"
                );
                make(
                  s,
                  "svg",
                  `<path style="d:path('M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z');"></path>`,
                  "",
                  () => {
                    s.remove();
                    document.querySelector(
                      "#addQuizQuestion > span:nth-child(2)"
                    ).innerHTML =
                      document.querySelector("#addQuestion").childElementCount -
                      1;
                    calcTime();
                  },
                  false,
                  "class|deletePoem",
                  "viewBox|0 0 24 24"
                );
                calcTime();
              });
              document.querySelector("#checkBtn").onclick = () => {
                if (
                  !parseInt(
                    document.querySelector(
                      "#addQuizQuestion > span:nth-child(2)"
                    ).innerHTML
                  )
                ) {
                  msg("Cannot add a quiz without any questions");
                  return;
                } else if (
                  !parseFloat(
                    document.querySelector(
                      "#setTime > span:nth-child(2) > input"
                    ).value
                  )
                ) {
                  msg("The time-limit is too short");
                  return;
                }
                var po = quizObj;
                [
                  document.querySelector("#addQuizTitle > input").value,
                  document.querySelector("#nextSelect").innerHTML,
                  document.querySelector("#setTime > span:nth-child(2) > input")
                    .value,
                ].includes(null) ||
                [
                  document.querySelector("#addQuizTitle > input").value,
                  document.querySelector("#nextSelect").innerHTML,
                  document.querySelector("#setTime > span:nth-child(2) > input")
                    .value,
                ].includes("")
                  ? msg("Please fill in all the details")
                  : (po.includes(module)
                      ? ((po[po.indexOf(module)].title = document.querySelector(
                          "#addQuizTitle > input"
                        ).value),
                        po[po.indexOf(module)]._id ||
                          ((po[po.indexOf(module)]._id = token()),
                          console.warn("Added token to existing quiz.")),
                        (po[po.indexOf(module)].difficulty =
                          document.querySelector("#nextSelect").innerHTML),
                        (po[po.indexOf(module)].duration = parseFloat(
                          document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).value
                        )),
                        (po[po.indexOf(module)].questions = (() => {
                          e = [];
                          document
                            .querySelectorAll("#addQuestion > #lineOption")
                            .forEach((l) => {
                              e.push(l.children[0].innerHTML);
                            });
                          return e;
                        })()))
                      : po.push({
                          _id: token(),
                          title: document.querySelector("#addQuizTitle > input")
                            .value,
                          difficulty:
                            document.querySelector("#nextSelect").innerHTML,
                          duration: document.querySelector(
                            "#setTime > span:nth-child(2) > input"
                          ).value,
                          questions: (() => {
                            e = [];
                            document
                              .querySelectorAll("#addQuestion > #lineOption")
                              .forEach((l) => {
                                e.push(l.children[0].innerHTML);
                              });
                            return e;
                          })(),
                        }),
                    (lsCop = JSON.parse(ls.poemDB)),
                    (lsCop.quizzes = po),
                    ls.setItem("poemDB", JSON.stringify(lsCop)),
                    dbDownload(),
                    document.querySelector("#backdrop").click(),
                    msg("Downloading updated database..."),
                    pg.quiz());
              };
              document.querySelector("#back").onclick = pg.home;
            };
            document.querySelector(
              "#icon"
            ).innerHTML = `<span>Poetica</span><span>Quizzes</span>`;
            main.innerHTML = `<div id="quizzes"><div class="flex"> <div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Quizzes</span></div><div id="quizOptions"> <span id="quizAddBtn"><span>Add</span><svg viewBox="0 0 20 20" style="width: 26px;height: 26px;fill: #ffffff52;stroke: #6a1b9abf;stroke-width: 1.2px;"> <path d="M9.5 16.5a.5.5 0 001 0v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6z" fill-rule="nonzero"></path> </svg></span></div></div><div id="quizContainer"></div> </div>`;
            document.querySelector("#back").onclick = pg.home;
            quizObj.length ||
              make(
                "#quizContainer",
                "span",
                "No quizzes have been added",
                "",
                null,
                false,
                "id|empty"
              );
            quizObj.forEach((a, b) => {
              make(
                "#quizContainer",
                "div",
                `<div class="flex"> <div id="leftQuiz"> <span id="quizTitle">${
                  a.title
                }</span> <div class="flex"> <span id="quizDetail">${
                  a.questions.length
                } questions</span> <span id="quizDetail">${
                  min2prop(a.duration)[1] || "0 secs"
                }</span> <span id="quizDetail">${
                  a.difficulty
                }</span> </div> </div> <div id="rightQuiz"> <div id="quizBtn">Edit</div> <div id="quizBtn">View scores</div> </div> </div>`,
                "",
                (e) => {
                  if (e.target.id === "quizBtn") {
                    return;
                  }
                  main.innerHTML = `<div id="quizWindow"><div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="startQuiz"> <span class="gradient">${
                    a.title
                  }</span> <div class="flex"> <span>${
                    a.questions.length
                  } questions</span>|<span>${
                    min2prop(a.duration)[1] || "0 secs"
                  }</span> </div> </div> <button id="submitBtn" style="font-size: 20px !important;margin-inline: auto;box-shadow: none !important;"><span>Start</span><svg viewBox="0 0 24 24" style=" width: 40px; height: 40px; "><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg></button></div>`;
                  document.querySelector("#back").onclick = pg.quiz;
                  document.querySelector("#submitBtn").onclick = () => {
                    quizStart(a, 0);
                    addQuizScore(a, 0, true);
                  };
                },
                false,
                "id|quizItem"
              );
              document.querySelector(
                "#quizItem:nth-child(" +
                  (b + 1) +
                  ") > div.flex > #rightQuiz > #quizBtn:nth-child(2)"
              ).onclick = () => {
                modal(
                  1,
                  `<style> #sum_info { width: calc(100% - 16em); height: -webkit-fill-available; } .h_info { } .p_info {max-height: -webkit-fill-available; height: -webkit-fill-available; } </style>`,
                  `<div id="scorecard">${
                    !JSON.parse(ls.getItem("quizScorecard") || "[]").find(
                      (j) => {
                        return j._id === a._id;
                      }
                    )
                      ? `<span class="gradient">Scorecard</span>`
                      : `<div class="flex"><span class="gradient">Scorecard</span><span id="quizAddBtn" style=" margin-inline: auto 46px; padding: 2px 12px; "><span>Clear scorecard</span></span></div>`
                  }<div class="flex" style=" flex-direction: column; "> <div id="scoreContainer"> <div id="scoreItem"> <div class="flex"> <span>Date</span><span>Time</span><span>Questions attempted</span><span>Accuracy</span><span>Time taken</span> </div> </div> </div> </div> </div>`
                );
                !document.querySelector("#quizAddBtn:nth-child(2)") ||
                  (document.querySelector("#quizAddBtn:nth-child(2)").onclick =
                    () => {
                      var sc = JSON.parse(ls.getItem("quizScorecard") || "[]");
                      var inof = sc.findIndex((t) => {
                        return t._id === a._id;
                      });
                      while (inof >= 0) {
                        sc.splice(inof, 1);
                        ls.setItem("quizScorecard", JSON.stringify(sc));
                        sc = JSON.parse(ls.getItem("quizScorecard") || "[]");
                        var inof = sc.findIndex((t) => {
                          return t._id === a._id;
                        });
                      }
                      msg("Cleared scorecard successfully");
                      document.querySelector("#backdrop").click();
                    });
                scores = JSON.parse(ls.getItem("quizScorecard") || "[]").filter(
                  (s) => {
                    return s._id === a._id;
                  }
                );
                scores.forEach((o, p) => {
                  make(
                    "#scoreContainer",
                    "div",
                    `<div class="flex"> <span>${
                      ((date = new Date(o.createdAt)),
                      date.getDate() +
                        "-" +
                        [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ][date.getMonth()] +
                        "-" +
                        date.getFullYear())
                    }</span><span>${date.toLocaleTimeString()}</span><span>${
                      o.attempted[0]
                    }/${o.attempted[1]}</span><span>${
                      o.accuracy
                    }%</span><span>${o.timeTaken[1]}</span> </div>`,
                    "",
                    null,
                    false,
                    "id|scoreItem"
                  );
                });
                scores.length ||
                  make(
                    "#scoreContainer",
                    "span",
                    `This quiz hasn't been attempted yet`,
                    "",
                    null,
                    false,
                    "id|empty"
                  );
              };
              document.querySelector(
                "#quizItem:nth-child(" +
                  (b + 1) +
                  ") > div.flex > #rightQuiz > #quizBtn:nth-child(1)"
              ).onclick = () => {
                addQuiz(a);
              };
            });
            document.querySelector("#quizAddBtn").onclick = () => {
              addQuiz();
            };
          },
          settings: () => {
            document.querySelector(
              "#icon"
            ).innerHTML = `<span>Poetica</span><span>Settings</span>`;
            main.innerHTML = `<div id="settings"><div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Settings</span></div><div class="flex"> <div id="settingsLeft"> <div id="settingsOptionsPlane"> <div id="settingsOption"> <span id="settingsOptionTitle" class="">Manage poems</span><svg viewBox="0 0 24 24" style="width: 50px;height: 50px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg> </div> <div id="settingsOption"> <span id="settingsOptionTitle">Backup &amp; Restore</span><svg viewBox="0 0 24 24" style="width: 50px;height: 50px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg> </div> <div id="settingsOption"> <span id="settingsOptionTitle">Reset</span><svg viewBox="0 0 24 24" style="width: 50px;height: 50px;margin: auto;fill: #9f1ee9;margin-right: 2px;"><path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg> </div> </div> </div> <div id="settingsRight"> <div class="flex" style=" flex-direction: column; width: fit-content; margin: auto; "> <div id="stats" class=""><span class="gradient">Poems</span><span class="gradient">${
              poemsObj ? poemsObj.length : "0"
            }</span></div> <div id="stats"><span class="gradient">Quizzes</span><span class="gradient">${
              quizObj ? quizObj.length : "0"
            }</span></div><div id="stats" class=""><span class="gradient">Storage</span><span class="gradient">${
              (Math.round(
                (parseFloat(
                  ((_, __, ___) => {
                    json = [];
                    for ($ in localStorage) {
                      !localStorage.hasOwnProperty($) ||
                        ((__ = (localStorage[$].length + $.length) * 2),
                        (_ += __),
                        json.push(
                          `"${$.substr(0, 50)}":"${(__ / 1024).toFixed(2)} KB"`
                        ));
                    }
                    json.push(`"Total": "${(_ / 1024).toFixed(2)} KB"`);
                    return JSON.parse(`{${json.join()}}`);
                  })(0).Total
                ) /
                  10000) *
                  100
              ) || "0") + "%"
            }</span></div> </div> </div> </div></div>`;
            document.querySelector("#back").onclick = pg.home;
            document.querySelector("#settingsOption:nth-child(1)").onclick =
              () => {
                document.querySelector(
                  "#icon"
                ).innerHTML = `<span>Poetica</span><span>Settings &gt; Manage poems</span>`;
                main.innerHTML = `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="poemsContainer"></div>  </div><div></div>`;
                document.querySelector("#back").onclick = pg.settings;
                poemsObj.forEach((a, b) => {
                  make(
                    "#poemsContainer",
                    "div",
                    `<div id="poemTitle"><span>${a.title}</span><span>by ${a.author}</span></div>`,
                    "",
                    () => {
                      main.innerHTML = `<div id="readPoems"></div>`;
                      make(
                        "#readPoems",
                        "div",
                        `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><span id="poemName"><span class="gradient"><b>${a.title}</b> by <b>${a.author}</b></span><svg class="editPoemSvg" viewBox="0 0 24 24"><path d="m15 16-4 4h8c1.1 0 2-.9 2-2s-.9-2-2-2h-4zm-2.94-8.81-8.77 8.77c-.18.18-.29.44-.29.7V19c0 .55.45 1 1 1h2.34c.27 0 .52-.11.71-.29l8.77-8.77-3.76-3.75zm6.65.85c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg><svg class="deletePoem" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg></span><span id="poemContent">${a.content}</span>`,
                        "",
                        null,
                        false,
                        "id|poemDisplay"
                      );
                      document.querySelector("#back").onclick = () => {
                        pg.settings();
                        document
                          .querySelector("#settingsOption:nth-child(1)")
                          .click();
                      };
                      document.querySelector("#poemName > svg").onclick =
                        () => {
                          document.querySelector("#poemName > svg").classList
                            .value === "editPoemSvg"
                            ? (document
                                .querySelector("#poemName > svg")
                                .classList.replace(
                                  "editPoemSvg",
                                  "savePoemSvg"
                                ),
                              (document.querySelector(
                                "#poemName > span:nth-child(1) > b:nth-child(1)"
                              ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`),
                              (document.querySelector(
                                "#poemName > span:nth-child(1) > b:nth-child(2)"
                              ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`),
                              (document.querySelector(
                                "#poemContent"
                              ).style.webkitUserModify = "read-write"))
                            : (document
                                .querySelector("#poemName > .savePoemSvg")
                                .classList.replace(
                                  "savePoemSvg",
                                  "editPoemSvg"
                                ),
                              (document.querySelector(
                                "#poemName > span:nth-child(1) > b:nth-child(1)"
                              ).style.cssText = ``),
                              (document.querySelector(
                                "#poemName > span:nth-child(1) > b:nth-child(2)"
                              ).style.cssText = ``),
                              (document.querySelector(
                                "#poemContent"
                              ).style.webkitUserModify = "read-only"),
                              updatePoemDB(
                                b,
                                document.querySelector(
                                  "#poemName > span > b:nth-child(1)"
                                ).innerText,
                                document.querySelector(
                                  "#poemName > span > b:nth-child(2)"
                                ).innerText,
                                document.querySelector("#poemContent").innerText
                              ));
                        };
                      document.querySelector(".deletePoem").onclick = () => {
                        var po = poemsObj;
                        modal(
                          1,
                          `<style>div#sum_info { width: fit-content; height: fit-content; } span.p_info { width: fit-content; height: fit-content !important; } span.h_info { font-size: 24px; } button#checkBtn { font-size: 13px; height: 24px; }</style>`,
                          `<span style=" display: block; width: fit-content; margin: auto; ">Are you sure you want to delete this poem permanently?</span><div class="flex" style="margin: 22px auto;width: -webkit-fill-available;"><button id="checkBtn" style=" margin-inline: auto; ">Delete</button><button id="checkBtn" style=" margin-inline: auto; ">Cancel</button></div>`
                        );
                        document.querySelector(
                          ".p_info > .flex > #checkBtn:nth-child(1)"
                        ).onclick = () => {
                          document.querySelector("#backdrop").click();
                          document.querySelector("#back").click();
                          updatePoemDB([b]);
                          msg("Deleted poem successfully");
                        };
                        document.querySelector(
                          ".p_info > .flex > #checkBtn:nth-child(2)"
                        ).onclick = () => {
                          modal(0);
                        };
                      };
                    },
                    false,
                    "id|poemItem"
                  );
                });
                make(
                  "#poemsContainer",
                  "div",
                  `<div id="poemTitle"><svg viewBox="0 0 20 20" style=" width: 120px; height: 120px; fill: #ffffff52; stroke: #ffffffdb; "> <path d="M9.5 16.5a.5.5 0 001 0v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6z" fill-rule="nonzero"></path> </svg></div>`,
                  "",
                  () => {
                    main.innerHTML = `<div id="readPoems"></div>`;
                    make(
                      "#readPoems",
                      "div",
                      `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><span id="poemName"><span class="gradient"><b>Poem name</b> by <b>Poem author</b></span><svg class="editPoemSvg" viewBox="0 0 24 24"><path d="m15 16-4 4h8c1.1 0 2-.9 2-2s-.9-2-2-2h-4zm-2.94-8.81-8.77 8.77c-.18.18-.29.44-.29.7V19c0 .55.45 1 1 1h2.34c.27 0 .52-.11.71-.29l8.77-8.77-3.76-3.75zm6.65.85c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg><svg class="deletePoem" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg></span><span id="poemContent">Enter the new poem content here...</span>`,
                      "",
                      null,
                      false,
                      "id|poemDisplay"
                    );
                    document.querySelector("#back").onclick = () => {
                      pg.settings();
                      document
                        .querySelector("#settingsOption:nth-child(1)")
                        .click();
                    };
                    document
                      .querySelector("#poemName > svg")
                      .classList.replace("editPoemSvg", "savePoemSvg");
                    document.querySelector(
                      "#poemName > span:nth-child(1) > b:nth-child(1)"
                    ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`;
                    document.querySelector(
                      "#poemName > span:nth-child(1) > b:nth-child(2)"
                    ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`;
                    document.querySelector(
                      "#poemContent"
                    ).style.webkitUserModify = "read-write";
                    document.querySelector("#poemName > svg").onclick = () => {
                      document.querySelector("#poemName > svg").classList
                        .value === "editPoemSvg"
                        ? (document
                            .querySelector("#poemName > svg")
                            .classList.replace("editPoemSvg", "savePoemSvg"),
                          (document.querySelector(
                            "#poemName > span:nth-child(1) > b:nth-child(1)"
                          ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`),
                          (document.querySelector(
                            "#poemName > span:nth-child(1) > b:nth-child(2)"
                          ).style.cssText = `outline: none !important; border: solid 2px #d1c4e96b; border-radius: 10px; padding: 10px 20px; -webkit-user-modify:read-write;`),
                          (document.querySelector(
                            "#poemContent"
                          ).style.webkitUserModify = "read-write"))
                        : (document
                            .querySelector("#poemName > .savePoemSvg")
                            .classList.replace("savePoemSvg", "editPoemSvg"),
                          (document.querySelector(
                            "#poemName > span:nth-child(1) > b:nth-child(1)"
                          ).style.cssText = ``),
                          (document.querySelector(
                            "#poemName > span:nth-child(1) > b:nth-child(2)"
                          ).style.cssText = ``),
                          (document.querySelector(
                            "#poemContent"
                          ).style.webkitUserModify = "read-only"),
                          updatePoemDB(
                            poemsObj.length,
                            document.querySelector(
                              "#poemName > span > b:nth-child(1)"
                            ).innerText,
                            document.querySelector(
                              "#poemName > span > b:nth-child(2)"
                            ).innerText,
                            document.querySelector("#poemContent").innerText
                          ));
                    };
                  },
                  false,
                  "id|poemItem"
                );
              };
            document.querySelector("#settingsOption:nth-child(2)").onclick =
              () => {
                document.querySelector(
                  "#icon"
                ).innerHTML = `<span>Poetica</span><span>Settings &gt; Backup & Restore</span>`;
                main.innerHTML = `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><div id="poemsContainer"></div>  </div><div></div>`;
                document.querySelector("#back").onclick = pg.settings;
                make(
                  "#poemsContainer",
                  "div",
                  `<div id="poemTitle"><svg viewBox="0 0 24 24" style=" width: 100px; height: 100px; fill: #ffffffdb; "> <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path> </svg> <span>Restore</span></div>`,
                  "",
                  () => {
                    document.querySelector("#back").remove();
                    make(
                      "#poemsContainer",
                      "div",
                      `<div id="back"><svg viewBox="0 0 24 24" style="width: 35px;height: 35px;stroke: #8427b0;fill: #8427b0;margin-block: auto;"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.9959.9959 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class="gradient">Back</span></div><span id="poemName"><span class="gradient">Enter backup code</span></span><textarea id="backupTextarea" placeholder="Paste your backup code here..."></textarea><button id="checkBtn" style="margin-inline:auto;">Submit</button>`,
                      "",
                      null,
                      true,
                      "id|restore"
                    );
                    document.querySelector("#back").onclick = () => {
                      pg.settings();
                      document
                        .querySelector("#settingsOption:nth-child(2)")
                        .click();
                    };
                    document.querySelector("#checkBtn").onclick = () => {
                      var backupcode =
                        document.querySelector("#backupTextarea").value;
                      if (
                        backupcode === null ||
                        backupcode === "" ||
                        typeof backupcode === "number" ||
                        typeof backupcode === "object"
                      ) {
                        msg("Invalid Backup code");
                      } else {
                        try {
                          ls.setItem(
                            "poemDB",
                            document.querySelector("#backupTextarea").value
                          );
                          pg.home();
                          msg("Successfully restored poems");
                        } catch (e) {
                          msg("An error has occured");
                          console.log(e);
                        }
                      }
                    };
                  },
                  false,
                  "id|poemItem"
                );
                make(
                  "#poemsContainer",
                  "div",
                  `<div id="poemTitle"><svg viewBox="0 0 20 20" style=" width: 100px; height: 100px; fill: #ffffff52; stroke: #ffffffdb; margin: auto; "> <path d="M15.5 17a.5.5 0 01.09 1H4.5a.5.5 0 01-.09-1H15.5zM10 2a.5.5 0 01.5.41V14.3l3.64-3.65a.5.5 0 01.64-.06l.07.06c.17.17.2.44.06.63l-.06.07-4.5 4.5a.5.5 0 01-.25.14L10 16a.5.5 0 01-.4-.2l-4.46-4.45a.5.5 0 01.64-.76l.07.06 3.65 3.64V2.5c0-.28.22-.5.5-.5z" fill-rule="nonzero"></path> </svg><span>Download backup</span></div>`,
                  "",
                  () => {
                    dbDownload();
                  },
                  false,
                  "id|poemItem"
                );
                make(
                  "#poemsContainer",
                  "div",
                  `<div id="poemTitle"><svg viewBox="0 0 20 20" class="sumHelp" style=" width: 100px; height: 100px; fill: #ffffff52; stroke: #ffffffdb; stroke-width: 1px; "><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm0 10.5a.75.75 0 110 1.5.75.75 0 010-1.5zm0-8a2.5 2.5 0 011.65 4.38l-.15.12-.22.17-.09.07-.16.15c-.33.36-.53.85-.53 1.61a.5.5 0 01-1 0 3.2 3.2 0 011.16-2.62l.25-.19.12-.1A1.5 1.5 0 0010 6.5c-.83 0-1.5.67-1.5 1.5a.5.5 0 01-1 0A2.5 2.5 0 0110 5.5z"></path></svg><span>Help</span></div>`,
                  "",
                  () => {
                    modal(
                      1,
                      `Help`,
                      "<span>You can add more poems but keep one thing in mind that none of those are actually saved in Poetica, instead it is saved temporarily in your browser’s localStorage. This localStorage is a temporary storage, it is cleared when you clear Chrome (or your preferred browser) data or the site data. So, your poems will be at a risk to be lost completely forever. However, to solve this issue I made a backup feature – which is not perfect.<br><br>Basically, after you add a poem a file will get automatically called ‘poem.json’. That file is the backup file; each time you change the poems (add, edit, remove) a new poem.json file will be generated and downloaded. If all the poems are deleted, then you can restore all the poems by going to Settings > Backup & Restore > Restore and then copy & pasting the poems.json code there. To do this, you will have to open poems.json with notepad and copy ALL text inside it, then you can paste it in the Restore page.<br><br>However, if you see Poetica is not opening, or the poems are not showing, then you should clear the site data by going to your browser’s settings. You can also try resetting Poetica if that option shows.</span>"
                    );
                  },
                  false,
                  "id|poemItem"
                );
              };
            document.querySelector("#settingsOption:nth-child(3)").onclick =
              () => {
                modal(
                  1,
                  `<style>div#sum_info { width: fit-content; height: fit-content; } span.p_info { width: fit-content; max-width:40em;height: fit-content !important; } span.h_info { font-size: 24px; } button#checkBtn { font-size: 13px; height: 24px; }</style><span>Reset</span>`,
                  `<span style=" font-size: 20px; white-space: normal; ">Reseting Poetica will delete all the poems you have added, excluding the poems that already existed.</span><button id="checkBtn" style=" margin-inline: auto; ">Reset</button>`
                );
                document.querySelector("#checkBtn").onclick = () => {
                  ls.removeItem("poemDB");
                  ls.removeItem("quizScorecard");
                  ls.removeItem("practiceScorecard");
                  msg(`Successfully reseted Poetica`);
                  document.querySelector("#backdrop").click();
                  pg.home();
                };
              };
          },
        };
      },
      (el) => {
        return {
          top: el.offsetTop,
          bottom: document.body.offsetHeight - (el.offsetHeight + el.offsetTop),
          left: el.offsetLeft,
          right: document.body.offsetWidth - (el.offsetWidth + el.offsetLeft),
        };
      },
      ((db) => {
        db ||
          (ls.setItem(
            "poemDB",
            JSON.stringify({
              poems: [
                {
                  title: "মরৃত্যুর পরে",
                  content:
                    "আজিকে হয়েছে শান্তি,\nজীবনের ভুলভ্রান্তি\n  সব গেছে চুকে।\nরাত্রিদিনধুক্‌ধুক্‌\nতরঙ্গিত দুঃখসুখ\n  থামিয়াছে বুকে।\nযত কিছু ভালোমন্দ\nযত কিছু দ্বিধাদ্বন্দ্ব\n  কিছু আর নাই।\nবলো শান্তি, বলো শান্তি,\nদেহসাথে সব ক্লান্তি\n  হয়ে যাক ছাই।\n\n\nগুঞ্জরি করুক তান\nধীরে ধীরে করো গান\n  বসিয়া শিয়রে।\nযদি কোথা থাকে লেশ\nজীবনস্বপ্নের শেষ\n  তাও যাক মরে।\n\n\nতুলিয়া অঞ্চলখানি\nমুখ-'পরে দাও টানি,\n  ঢেকে দাও দেহ।\nকরুণ মরণ যথা\nঢাকিয়াছে সব ব্যথা\n  সকল সন্দেহ।\n\n\nবিশ্বের আলোক যত\nদিগ্‌বিদিকে অবিরত\n  যাইতেছে বয়ে,\nশুধু ওই আঁখি-'পরে\nনামে তাহা স্নেহভরে\n  অন্ধকার হয়ে।\nজগতের তন্ত্রীরাজি\nদিনে উচ্চে উঠে বাজি,\n  রাত্রে চুপে চুপে\nসে শব্দ তাহার 'পরে\nচুম্বনের মতো পড়ে\n  নীরবতারূপে।\n\n\nমিছে আনিয়াছ আজি\nবসন্তকুসুমরাজি\n  দিতে উপহার।\nনীরবে আকুল চোখে\nফেলিতেছ বৃথা শোকে\n  নয়নাশ্রুধার।\nছিলে যারা রোষভরে\nবৃথা এতদিন পরে\n  করিছ মার্জনা।\n\n\nঅসীম নিস্তব্ধ দেশে\nচিররাত্রি পেয়েছে সে\n  অনন্ত সান্ত্বনা।\n\n\nগিয়েছে কি আছে বসে\nজাগিল কি ঘুমাল সে\n  কে দিবে উত্তর।\nপৃথিবীর শ্রান্তি তারে\nত্যজিল কি একেবারে\n  জীবনের জ্বর!\nএখনি কি দুঃখসুখে\nকর্মপথ-অভিমুখে\n  চলেছে আবার।\nঅস্তিত্বের চক্রতলে\nএকবার বাঁধা প'লে\n  পায় কি নিস্তার।\n\n\nবসিয়া আপন দ্বারে\nভালোমন্দ বলো তারে\n  যাহা ইচ্ছা তাই।\nঅনন্ত জনমমাঝে\nগেছে সে অনন্ত কাজে,\n  সে আর সে নাই।\nআর পরিচিত মুখে\nতোমাদের দুখে সুখে\n  আসিবে না ফিরে।\nতবে তার কথা থাক্‌,\nযে গেছে সে চলে যাক\n  বিস্মৃতির তীরে।\n\n\nজানি না কিসের তরে\nযে যাহার কাজ করে\n  সংসারে আসিয়া,\nভালোমন্দ শেষ করি\nযায় জীর্ণ জন্মতরী\n  কোথায় ভাসিয়া।\nদিয়ে যায় যত যাহা\nরাখো তাহা ফেলো তাহা\n  যা ইচ্ছা তোমার।\nসে তো নহে বেচাকেনা--\nফিরিবে না, ফেরাবে না\n  জন্ম-উপহার।\n\n\nকেন এই আনাগোনা,\nকেন মিছে দেখাশোনা\n  দু-দিনের তরে,\nকেন বুকভরা আশা,\nকেন এত ভালোবাসা\n  অন্তরে অন্তরে,\nআয়ু যার এতটুক,\nএত দুঃখ এত সুখ\n  কেন তার মাঝে,\nঅকস্মাৎ এ সংসারে\nকে বাঁধিয়া দিল তারে\n  শত লক্ষ কাজে--\n\n\nহেথায় যে অসম্পূর্ণ,\nসহস্র আঘাতে চূর্ণ\n  বিদীর্ণ বিকৃত,\n\n\nকোথাও কি একবার\nসম্পূর্ণতা আছে তার\n  জীবিত কি মৃত,\nজীবনে যা প্রতিদিন\nছিল মিথ্যা অর্থহীন\n  ছিন্ন ছড়াছড়ি\nমৃত্যু কি ভরিয়া সাজি\nতারে গাঁথিয়াছে আজি\n  অর্থপূর্ণ করি--\n\n\nহেথা যারে মনে হয়\nশুধু বিফলতাময়\n  অনিত্য চঞ্চল\nসেথায় কি চুপে চুপে\nঅপূর্ব নূতন রূপে\n  হয় সে সফল--\nচিরকাল এই-সব\nরহস্য আছে নীরব\n  রুদ্ধ-ওষ্ঠাধর।\nজন্মান্তের নবপ্রাতে\nসে হয়তো আপনাতে\n  পেয়েছে উত্তর।\n\n\nসে হয়তো দেখিয়াছে\nপড়ে যাহা ছিল পাছে\n  আজি তাহা আগে,\nছোটো যাহা চিরদিন\nছিল অন্ধকারে লীন\n  বড়ো হয়ে জাগে।\n\n\nযেথায় ঘৃণার সাথে\nমানুষ আপন হাতে\n  লেপিয়াছে কালি\nনূতন নিয়মে সেথা\nজ্যোতির্ময় উজ্জ্বলতা\n  কে দিয়াছে জ্বালি।\n\n\nকত শিক্ষা পৃথিবীর\nখসে পড়ে জীর্ণচীর\n  জীবনের সনে,\nসংসারের লজ্জাভয়\nনিমেষেতে দগ্ধ হয়\n  চিতাহুতাশনে।\nসকল অভ্যাস-ছাড়া\nসর্ব-আবরণ-হারা\n  সদ্যশিশুসম\nনগ্নমূর্তি মরণের\nনিষ্কলঙ্ক চরণের\n  সম্মুখে প্রণমো।\n\n\nআপন মনের মতো\nসংকীর্ণ বিচার যত\n  রেখে দাও আজ।\nভুলে যাও কিছুক্ষণ\nপ্রত্যহের আয়োজন,\n  সংসারের কাজ।\nআজি ক্ষণেকের তরে\nবসি বাতায়ন-'পরে\n  বাহিরেতে চাহো।\n\n\nঅসীম আকাশ হতে\nবহিয়া আসুক স্রোতে\n  বৃহৎ প্রবাহ।\n\n\nউঠিছে ঝিল্লির গান,\nতরুর মর্মরতান,\n  নদীকলস্বর--\nপ্রহরের আনাগোনা\nযেন রাত্রে যায় শোনা\n  আকাশের 'পর।\nউঠিতেছে চরাচরে\nঅনাদি অনন্ত স্বরে\n  সংগীত উদার--\nসে নিত্য-গানের সনে\nমিশাইয়া লহো মনে\n  জীবন তাহার।\n\n\nব্যাপিয়া সমস্ত বিশ্বে\nদেখো তারে সর্বদৃশ্যে\n  বৃহৎ করিয়া।\nজীবনের ধূলি ধুয়ে\nদেখো তারে দূরে থুয়ে\n  সম্মুখে ধরিয়া।\nপলে পলে দণ্ডে দণ্ডে\nভাগ করি খণ্ডে খণ্ডে\n  মাপিয়ো না তারে।\nথাক্‌ তব ক্ষুদ্র মাপ\nক্ষুদ্র পুণ্য ক্ষুদ্র পাপ\n  সংসারের পারে।\n\n\nআজ বাদে কাল যারে\nভুলে যাবে একেবারে\n  পরের মতন\nতারে লয়ে আজি কেন\nবিচার-বিরোধ হেন,\n  এত আলাপন।\nযে বিশ্ব কোলের 'পরে\nচিরদিবসের তরে\n  তুলে নিল তারে\nতার মুখে শব্দ নাহি,\nপ্রশান্ত সে আছে চাহি\n  ঢাকি আপনারে।\n\n\nবৃথা তারে প্রশ্ন করি,\nবৃথা তার পায়ে ধরি,\n  বৃথা মরি কেঁদে,\nখুঁজে ফিরি অশ্রুজলে--\nকোন্‌ অঞ্চলের তলে\n  নিয়েছে সে বেঁধে।\nছুটিয়া মৃত্যুর পিছে,\nফিরে নিতে চাহি মিছে,\n  সে কি আমাদের?\nপলেক বিচ্ছেদে হায়\nতখনি তো বুঝা যায়\n  সে যে অনন্তের।\n\n\nচক্ষের আড়ালে তাই\nকত ভয় সংখ্যা নাই,\n  সহস্র ভাবনা।\n\n\nমুহূর্ত মিলন হলে\nটেনে নিই বুকে কোলে,\n  অতৃপ্ত কামনা।\nপার্শ্বে বসে ধরি মুঠি,\nশব্দমাত্রে কেঁপে উঠি,\n  চাহি চারিভিতে,\nঅনন্তের ধনটিরে\nআপনার বুক চিরে\n  চাহি লুকাইতে।\n\n\nহায় রে নির্বোধ নর,\nকোথা তোর আছে ঘর,\n  কোথা তোর স্থান।\nশুধু তোর ওইটুকু\nঅতিশয় ক্ষুদ্র বুক\n  ভয়ে কম্পমান।\nঊর্ধ্বে ওই দেখ্‌ চেয়ে\nসমস্ত আকাশ ছেয়ে\n  অনন্তের দেশ--\nসে যখন এক ধারে\nলুকায়ে রাখিবে তারে\n  পাবি কি উদ্দেশ?\n\n\nওই হেরো সীমাহারা\nগগনেতে গ্রহতারা\n  অসংখ্য জগৎ,\nওরি মাঝে পরিভ্রান্ত\nহয়তো সে একা পান্থ\n  খুঁজিতেছে পথ।\n\n\nওই দূর-দূরান্তরে\nঅজ্ঞাত ভুবন-'পরে\n  কভু কোনোখানে\nআর কি গো দেখা হবে,\nআর কি সে কথা কবে,\n  কেহ নাহি জানে।\n\n\nযা হবার তাই হোক,\nঘুচে যাক সর্ব শোক,\n  সর্ব মরীচিকা।\nনিবে যাক চিরদিন\nপরিশ্রান্ত পরিক্ষীণ\n  মর্তজন্মশিখা।\nসব তর্ক হোক শেষ,\nসব রাগ সব দ্বেষ,\n  সকল বালাই।\nবলো শান্তি, বলো শান্তি,\nদেহ-সাথে সব ক্লান্তি\n  পুড়ে হোক ছাই।\n",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "সোনার তরি",
                  content:
                    "গগনে গরজে মেঘ, ঘন বরষা।\nকূলে একা বসে আছি, নাহি ভরসা।\nরাশি রাশি ভারা ভারা\nধান কাটা হল সারা,\nভরা নদী ক্ষুরধারা\nখরপরশা।\nকাটিতে কাটিতে ধান এল বরষা।\n\n      একখানি ছোটো খেত, আমি একেলা,\nচারি দিকে বাঁকা জল করিছে খেলা।\nপরপারে দেখি আঁকা\nতরুছায়ামসীমাখা\nগ্রামখানি মেঘে ঢাকা\nপ্রভাতবেলা–\nএ পারেতে ছোটো খেত, আমি একেলা।\n\n      গান গেয়ে তরী বেয়ে কে আসে পারে,\nদেখে যেন মনে হয় চিনি উহারে।\nভরা-পালে চলে যায়,\nকোনো দিকে নাহি চায়,\nঢেউগুলি নিরুপায়\nভাঙে দু-ধারে–\nদেখে যেন মনে হয় চিনি উহারে।\n\nওগো, তুমি কোথা যাও কোন্‌ বিদেশে,\nবারেক ভিড়াও তরী কূলেতে এসে।\nযেয়ো যেথা যেতে চাও,\nযারে খুশি তারে দাও,\nশুধু তুমি নিয়ে যাও\nক্ষণিক হেসে\nআমার সোনার ধান কূলেতে এসে।\n\n      যত চাও তত লও তরণী-‘পরে।\nআর আছে?– আর নাই, দিয়েছি ভরে।\nএতকাল নদীকূলে\nযাহা লয়ে ছিনু ভুলে\nসকলি দিলাম তুলে\nথরে বিথরে–\nএখন আমারে লহ করুণা করে।\n\n      ঠাঁই নাই, ঠাঁই নাই– ছোটো সে তরী\nআমারি সোনার ধানে গিয়েছে ভরি।\nশ্রাবণগগন ঘিরে\nঘন মেঘ ঘুরে ফিরে,\nশূন্য নদীর তীরে\nরহিনু পড়ি–\nযাহা ছিল নিয়ে গেল সোনার তরী।",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "দুঃসময়",
                  content:
                    "যদিও সন্ধ্যা আসিছে মন্দ মন্থরে,\n      সব সংগীত গেছে ইঙ্গিতে থামিয়া,\nযদিও সঙ্গী নাহি অনন্ত অম্বরে,\n      যদিও ক্লান্তি আসিছে অঙ্গে নামিয়া,\nমহা আশঙ্কা জপিছে মৌন মন্তরে,\n      দিক্‌-দিগন্ত অবগুণ্ঠনে ঢাকা--\n           তবু বিহঙ্গ, ওরে বিহঙ্গ মোর,\n                এখনি, অন্ধ, বন্ধ কোরো না পাখা। \n\nএ নহে মুখর বনমর্মরগুঞ্জিত,\n      এ যে অজাগরগরজে সাগর ফুলিছে।\nএ নহে কুঞ্জ কুন্দকুসুমরঞ্জিত,\n      ফেনহিল্লোল কলকল্লোলে দুলিছে।\nকোথা রে সে তীর ফুলপল্লবপুঞ্জিত,\n      কোথা রে সে নীড়, কোথা আশ্রয়শাখা!\n           তবু বিহঙ্গ, ওরে বিহঙ্গ মোর,\n                এখনি, অন্ধ, বন্ধ কোরো না পাখা। \n\nএখনো সমুখে রয়েছে সুচির শর্বরী,\n      ঘুমায় অরুণ সুদূর অস্ত-অচলে!\nবিশ্বজগৎ নিশ্বাসবায়ু সম্বরি\n      স্তব্ধ আসনে প্রহর গনিছে বিরলে।\nসবে দেখা দিল অকূল তিমির সন্তরি\n      দূর দিগন্তে ক্ষীণ শশাঙ্ক বাঁকা।\n          ওরে বিহঙ্গ, ওরে বিহঙ্গ মোর,\n                এখনি, অন্ধ, বন্ধ কোরো না পাখা। \n\nঊর্ধ্ব আকাশে তারাগুলি মেলি অঙ্গুলি\n      ইঙ্গিত করি তোমা-পানে আছে চাহিয়া।\nনিম্নে গভীর অধীর মরণ উচ্ছলি\n      শত তরঙ্গ তোমা-পানে উঠে ধাইয়া।\nবহুদূর তীরে কারা ডাকে বাঁধি অঞ্জলি\n      \"এসো এসো' সুরে করুণ মিনতি-মাখা।\n            ওরে বিহঙ্গ, ওরে বিহঙ্গ মোর,\n                 এখনি, অন্ধ, বন্ধ কোরো না পাখা। \n\nওরে ভয় নাই, নাই স্নেহমোহবন্ধন,\n      ওরে আশা নাই, আশা শুধু মিছে ছলনা।\nওরে ভাষা নাই, নাই বৃথা বসে ক্রন্দন,\n     ওরে গৃহ নাই, নাই ফুলশেজরচনা।\nআছে শুধু পাখা, আছে মহানভ-অঙ্গন\n     উষা-দিশা-হারা নিবিড়-তিমির-আঁকা--\n          ওরে বিহঙ্গ, ওরে বিহঙ্গ মোর,\n                এখনি, অন্ধ, বন্ধ কোরো না পাখা।",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "প্রশ্ন",
                  content:
                    "ভগবান, তুমি যুগে যুগে দূত, পাঠায়েছ বারে বারে\n                     দয়াহীন সংসারে,\nতারা বলে গেল “ক্ষমা করো সবে’, বলে গেল “ভালোবাসো—\n                     অন্তর হতে বিদ্বেষবিষ নাশো’।\nবরণীয় তারা, স্মরণীয় তারা, তবুও বাহির-দ্বারে\nআজি দুর্দিনে ফিরানু তাদের ব্যর্থ নমস্কারে।\n\nআমি-যে দেখেছি গোপন হিংসা কপট রাত্রিছায়ে\n               হেনেছে নিঃসহায়ে,\nআমি-যে দেখেছি প্রতিকারহীন শক্তের অপরাধে\n               বিচারের বাণী নীরবে নিভৃতে কাঁদে\nআমি-যে দেখিনু তরুণ বালক উন্মাদ হয়ে ছুটে\nকী যন্ত্রণায় মরেছে পাথরে নিষ্ফল মাথা কুটে।\n\nকণ্ঠ আমার রুদ্ধ আজিকে, বাঁশি সংগীতহারা,\n                 অমাবস্যার কারা\nলুপ্ত করেছে আমার ভুবন দুঃস্বপনের তলে,\n                 তাই তো তোমায় শুধাই অশ্রুজলে—\nযাহারা তোমার বিষাইছে বায়ু, নিভাইছে তব আলো,\nতুমি কি তাদের ক্ষমা করিয়াছ, তুমি কি বেসেছ ভালো।",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "শাজাহান",
                  content:
                    "এ কথা জানিতে তুমি ভারত-ঈশ্বর শা-জাহান,\nকালস্রোতে ভেসে যায় জীবন যৌবন ধনমান।\n      শুধু তব অন্তরবেদনা\nচিরন্তন হয়ে থাক্, সম্রাটের ছিল এ সাধনা\n      রাজশক্তি বজ্রসুকঠিন\nসন্ধ্যারক্তরাগসম তন্দ্রাতলে হয় হোক লীন\n      কেবল একটি দীর্ঘশ্বাস\nনিত্য-উচ্ছ্বসিত হয়ে সকরুণ করুক আকাশ,\n      এই তব মনে ছিল আশ।\n    হীরামুক্তামানিক্যের ঘটা\nযেন শুন্য দিগন্তের ইন্দ্রজাল ইন্দ্রধনুচ্ছটা\n    যায় যদি লুপ্ত হয়ে যাক,\n             শুধু থাক্\n    একবিন্দু নয়নের জল\nকালের কপোলতলে শুভ্র সমুজ্জ্বল\n    এ তাজমহল॥\n\n\n           হায় ওরে মানবহৃদয়,\n            বার বার\n    কারো পানে ফিরে চাহিবার\n         নাই যে সময়,\n          নাই নাই।\n    জীবনের খরস্রোতে ভাসিছ সদাই\n       ভুবনের ঘাটে ঘাটে---\n    এক হাতে লও বোঝা, শুন্য করে দাও অন্য হাটে।\n        দক্ষিণের মন্ত্রগুঞ্জরণে\n            তব কুঞ্জবনে\n    বসন্তের মাধবীমঞ্জরি\n        যেই ক্ষণে দেয় ভরি\n            মালঞ্চের চঞ্চল অঞ্চল---\n    বিদায়গোধুলি আসে ধুলায় ছড়ায়ে ছিন্ন দল।\n             সময় যে নাই,\n        আবার শিশিররাত্রে তাই\n    নিকুঞ্জে ফুটায়ে তোল নব কুন্দরাজি\nসাজাইতে হেমন্তের অশ্রুভরা আনন্দের সাজি।\n         হায় রে হৃদয়,\n     তোমার সঞ্চয়\nদিনান্তে নিশান্তে শুধু পথপ্রান্তে ফেলে যেতে হয়।\n     নাই নাই, নাই যে সময়॥\n\n\n        হে সম্রাট্, তাই তব শঙ্কিত হৃদয়\n          চেয়েছিল করিবারে সময়ের হৃদয়হরণ\n               সৌন্দর্যে ভুলায়ে।\n           কণ্ঠে তার কী মালা দুলায়ে\n               করিলে বরণ\n          রূপহীন মরণেরে মৃত্যুহীন অপরূপ সাজে!\n                     রহে না যে\n                   বিলাপের অবকাশ\n                     বারো মাস,\n                  তাই তব অশান্ত ক্রন্দনে\n        চিরমৌনজাল দিয়ে বেঁধে দিলে কঠিন বন্ধনে।\n              জ্যোত্‍‌স্নারাতে নিভৃত মন্দিরে\n                   প্রেয়সীরে\n            যে নামে ডাকিতে ধীরে ধীরে\n        সেই কানে-কানে ডাকা রেখে গেলে এইখানে\n                অনন্তের কানে।\n             প্রেমের করুণ কোমলতা,\n                   ফুটিল তা\n        সৌন্দর্যের পুষ্পপুঞ্জে প্রশান্ত পাষাণে॥\n\n\n                হে সম্রাট্ কবি,\n             এই তব হৃদয়ের ছবি,\n                এই তব নব মেঘদূত,\n                    অপূর্ব অদ্ভুত\n                ছন্দে গানে\n             উঠিয়াছে অলক্ষ্যের পানে---\n                 যেথা তব বিরহিণী প্রিয়া\n                    রয়েছে মিশিয়া\n                 প্রভাতের অরুণ-আভাসে,\n             ক্লান্তসন্ধ্যা দিগন্তের করুণ নিশ্বাসে,\n         পূর্ণিমায় দেহহীন চামেলীর লাবণ্যবিলাসে,\n                   ভাষার অতীত তীরে\n         কাঙাল নয়ন যেথা দ্বার হতে আসে ফিরে ফিরে।\n                  তোমার সৌন্দর্যদূত যুগ যুগ ধরি\n                        এড়াইয়া কালের প্রহরী\n               চলিয়াছে বাক্যহারা এই বার্তা নিয়া---\n                  `ভুলি নাই, ভুলি নাই, ভুলি নাই প্রিয়া!'\n\n\n               চলে গেছ তুমি আজ,\n                    মহারাজ---\n          রাজ্য তব স্বপ্নসম গেছে ছুটে,\n               সিংহাসন গেছে টুটে,\n                    তব সৈন্যদল\n       যাদের চরণভরে ধরণী করিত টলমল\n            তাহাদের স্মৃতি আজ বায়ুভরে\n          উড়ে যায় দিল্লির পথের ধূলি-'পরে।\n                বন্দীরা গাহে না গান,\n          যমুনাকল্লোল-সাথে নহবত মিলায় না তান।\n              তব পুরসুন্দরীর নূপুরনিক্কণ\n                  ভগ্ন প্রাসাদের কোণে\n                ম'রে গিয়ে ঝিল্লিস্বনে\n                  কাঁদায় রে নিশার গগন।\n              তবুও তোমার দূত অমলিন,\n                  শ্রান্তিক্লান্তিহীন,\n          তুচ্ছ করি রাজ্য-ভাঙাগড়া,\n       তুচ্ছ করি জীবনমৃত্যুর ওঠাপড়া,\n              যুগে যুগান্তরে\n            কহিতেছে একস্বরে\n          চিরবিরহীর বাণী নিয়া---\n      `ভুলি নাই, ভুলি নাই, ভুলি নাই প্রিয়া!'\n\n\n            মিথ্যা কথা! কে বলে যে ভোল নাই?\n              কে বলে রে খোল নাই\n                   স্মৃতির পিঞ্জরদ্বার?\n                 অতীতের চির-অস্ত-অন্ধকার\n            আজিও হৃদয় তব রেখেছে বাঁধিয়া?\n                 বিস্মৃতির মুক্তিপথ দিয়া\n                     আজিও সে হয়নি বাহির?\n            সমাধিমন্দির এক ঠাঁই রহে চিরস্থির,\n                     ধরার ধূলায় থাকি\n       স্মরণের আবরণে মরণেরে যত্নে রাখে ঢাকি।\n             জীবনেরে কে রাখিতে পারে!\n       আকাশের প্রতি তারা ডাকিছে তাহারে।\n             তার নিমন্ত্রণ লোকে লোকে\n       নব নব পূর্বাচলে আলোকে আলোকে।\n             স্মরণের গ্রন্থি টুটে\n           সে যে যায় ছুটে\n               বিশ্বপথে বন্ধনবিহীন।\n       মহারাজ, কোনো মহারাজ্য কোনোদিন\n               পারে নাই তোমারে ধরিতে।\n       সমুদ্রস্তনিত পৃথ্বী, হে বিরাট, তোমারে ভরিতে\n                     নাহি পারে---\n                  তাই এ ধরারে\n            জীবন-উত্‍‌সব-শেষে দুই পায়ে ঠেলে\n                মৃত্‍‌পাত্রের মত যাও ফেলে।\n                    তোমার কীর্তির চেয়ে তুমি যে মহত্‍‌,\n                        তাই তব জীবনের রথ\n                    পশ্চাতে ফেলিয়া যায় কীর্তিরে তোমার\n                               বারম্বার।\n                                 তাই\n             চিহ্ন তব পড়ে আছে, তুমি হেথা নাই।\n                     যে প্রেম সম্মুখপানে\n               চলিতে চালাতে নাহি জানে,\n          যে প্রেম পথের মধ্যে পেতেছিল নিজসিংহাসন,\n                তার বিলাসের সম্ভাষণ\n          পথের ধূলার মতো জড়ায়ে ধরেছে তব পায়ে---\n                দিয়েছ তা ধূলিরে ফিরায়ে।\n                     সেই তব পশ্চাতের পদধূলি-'পরে\n        তব চিত্ত হতে বায়ুভরে\n             কখন সহসা\n      উড়ে পড়েছিল বীজ জীবনের মাল্য হতে খসা।\n              তুমি চলে গেছ দূরে,\n          সেই বীজ অমর অঙ্কুরে\n            উঠেছে অম্বর-পানে,\n               কহিছে গম্ভীর গানে---\n                  `যত দূর চাই\n          নাই নাই সে পথিক নাই।\n    প্রিয়া তারে রাখিল না, রাজ্য তারে ছাড়ি দিল পথ,\n          রুধিল না সমুদ্র পর্বত।\n              আজি তার রথ\n          চলিয়াছে রাত্রির আহ্বানে\n            নক্ষত্রের গানে\n          প্রভাতের সিংহদ্বার-পানে।\n                তাই\n          স্মৃতিভারে আমি পড়ে আছি,\n               ভারমুক্ত সে এখানে নাই।'",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "একটি শিশির বিন্দু",
                  content:
                    "বহু দিন ধরে' বহু ক্রোশ দূরে\n      বহু ব্যয় করি, বহু দেশ ঘুরে\nদেখিতে গিয়েছি পর্বতমালা,\n            দেখিতে গিয়েছি সিন্ধু।\n\n\n      দেখা হয় নাই চক্ষু মেলিয়া\n      ঘর হতে শুধু দুই পা ফেলিয়া\nএকটি ধানের শিষের উপরে\n            একটি শিশিরবিন্দু।",
                  author: "Rabindranath Thakur",
                },
                {
                  title: "কলঘরে চিলের কান্না",
                  content:
                    "এখনও তোমার সেই ডানা ঝাপটানোর শব্দ শুনতে পাই;\nএখনও তোমার সেই দারুন বিলাপ\nকানে বাজে।\nগগণবিহারী চিল,\nখর দীপ্র দুপুরবেলায়\nতুমি এক আকাশের থেকে অন্য আকাশের দিকে\nতেজস্বী ও স্বভাবত-সঙ্গিবিহীন সম্রাটের মত\nসহজ উল্লাসে\nবাতাসে সাঁতার কেটে চলেছিলে।\nযেতে যেতে,\nশূণ্যের মেখলা থেকে যে-রকম উল্কা খসে যায়,\nতুমিও সহসা সেইরকম\nঊর্ধাকাশ থেকে এই গৃহস্থবাড়ির বারান্দায়\nছিটকে পড়েছিলে।\n\nমুহূর্তে কাকের মেলা বসে গেল ছাতের কার্নিসে।\nকা-কা-অট্টহাসির বিদ্রুপে\nভরে উঠল দ্বিপ্রহর।\nতখনও মরোনি তুমি। দুই চক্ষু\nঘোলাটে ও ঘূর্ণমান, বাদামি শরীর\nকেঁপে কেঁপে উঠছে, ফের আকাশে উঠবার\nশক্তি নেই, তবু তুমি\nশরীরের শেষ বিন্দু সামর্থ্য সংগ্রহ করে\nপ্রাণপণে ঝাপটাচ্ছ ডানা, কখনও-বা\nবাঁকিয়ে উদ্ধত গ্রীবা\nঘৃণাভরে দেখে নিচ্ছ\nঅদূরে অপেমাণ শত্র“দের।\nগগণবিহারী চিল! যারা ঊর্ধে উঠতে পারে না, আর\nপারে না বলেই যারা\nপৃথিবীর\nভাগাড়ে ও আস্তাকুড়ে কাপুরুষ মস্তানের মত\nদঙ্গল পাকিয়ে ঘুরে বেড়ায়, তাদের\nহাতে কি কখনও আমি ঊর্ধাচারী মানুষের\nলাঞ্ছনা দেখিনি?\nদেখেছি অসংখ্যবার। বুঝেছি যে, লাঞ্ছনাই স্বাভাবিক।\nএমন কী, লাঞ্ছনা আর নিগ্রহের ফলে\nমানুষের দীপ্তি ও মহিমা আরও বেড়ে যায়।\nঅথচ সমস্ত দেখে, সমস্ত বুঝেও- মূ্র্খ আমি-\nদলবব্ধ কাকের গুন্ডামি থেকে\nতোমাকে বাঁচাতে গিয়েছিলুম। তোমকে\nবারান্দার থেকে তুলে এনে\nস্নানঘরের মধ্যে আটকে রেখে\nস্বস্তির নিশ্বাস ফেলে ভাবতে পেরেছিলুম, তোমার\nমর্যাদা বাঁচানো গেল।\n\nএখন বুঝতে পারি, বস্তুত তোমাকে\nএক বিদ্রুপের থেকে আরও ক্রুর, আরও ভয়ংকর\nবিদ্রুপের ভিতরে নিক্ষেপ করেছিলুম সেদিন।\nগগণবিহারী চিল,\nবৈদুর্যমণির তীব্র দাহনে উজ্জ্বল খর দুপুর বেলায়\nসম্রাটের মতো তুমি সমস্ত আকাশ ঘুরে এসে\nতারপর\nশহরতলির এক গৃহস্থের\nছয় বাই তিন ফুট ওই কলঘরের অন্ধকারে বন্দি হয়েছিলে।\nসারারাত্রি ঝাপটা মেরেছ তুমি\nকাঠের দরজায়,\nনখরে আঁচড়েছ মেঝে, সারারাত\nআপন সাম্রাজ্য থেকে নির্বাসিত, বিচ্যুত হবার\nঅপমানে, গ্লানিতে ও যন্ত্রণায়\nচিৎকার করেছ।\n\nঅমন ধারালো, শুকনো, বুকফাটা আর্তনাদ আমি\nকখনও শুনিনি।\nএনে হয়েছিল, যেন পাখি নয়, বিশ্ব-চরাচর\nআজ রাত্রে ওই\nকলঘরের অন্ধকারে বন্দি হয়ে চিৎকার করছে।\nগগনবিহারী চিল,\nসকালে তোমাকে আমি মুক্তি দিব বলে\nদরজা খুলে যখন দেখলুম,\nমেঝের উপর তুমি স্থির ও নিঃশব্দ হয়ে পড়ে আছ,\nতখন আবার মনে হয়েছিল,\nতুমি পাখি নও, তুমি অফুরন্ত আকাশের প্রাণমূর্তি, যেন\nসমস্ত আকাশ আজ\nনিতান্ত ছাপোষা এক গৃহস্থের\nকলঘরের\nক্লিন্ন অন্ধকারে\nমরে পড়ে আছে।",
                  author: "Nirendranath Chakraborty",
                },
                {
                  title: "জোড়া খুন",
                  content:
                    "লোভ আমাকে অরণ্যের দিকে টেনে আনে।\nতারপর\nঅচেনা সেই অরণ্যের মধ্যে\nভয় আমাকে দিগ্বিদিকে ছুটিয়ে নিয়ে বেড়ায়।\nআমি ঠিক করেছিলুম,\nআমার এই যুগল-শত্রুকে আমি শেষ না করে ছাড়ব না।\nআগে আমি লোভের মরামুখ দেখব।\nতারপর ভয়ের।\n\nকিন্তু দ্যাখো, কী আশ্চর্য,\nলোভের গলায়\nআমার দীর্ঘ ও শাণিত ছুরিখানাকে আমূল বিঁধিয়ে দিয়ে\nযেই আমি চেঁচিয়ে বলে উঠেছি,\n“কিছুই আমি চাই না,”\nভয়ও অমনি, চুপসে-যাওয়া একটা বস্তার মতো, আমার পায়ের তলায়\nলুটিয়ে পড়ল।\n\nকখন আলো ফুটেছে, আমি জানি না।\nআমি শুনতে পাচ্ছি,\nদূর থেকে ভেসে আসছে সূর্যোদয়ের গান।\nউদ্দীপক সুরার মতো\nসেই গানের সুর ছড়িয়ে যাচ্ছে আমার রক্তে।\nশরীরটা খুব হালকা লাগছে।\nমনে হচ্ছে,\nএকটা মস্ত বড় ব্যাধির থেকে আমি মুক্ত হয়ে উঠলুম।\n\nআমার সামনে ছিল লোভ।\nআমার পিছনে ছিল ভয়।\nআমি ভেবেছিলুম,\nএকে-একে আমি তাদের মোকাবিলা করব।\nকিন্তু তার আর দরকার হল না,\nএকজনকে আক্রমণ করবার সঙ্গে-সঙ্গেই দেখতে পেলুম,\nঅন্যজনও ফতুর হয়ে গেছে।\n\nআবিরের থালা হাতে নিয়ে আকাশ আমার মুখ দেখছে।\nপাখিরা আমার বন্দনা গাইছে।\nবৃক্ষ ও লতা বাতাসে নত হয়ে\nনমস্কার করছে আমাকে।\nজোড়া খুনের সমাধা করে, বাঁ পা এর লাথি মেরে\nআমার দুই জন্মশত্রুর মৃতদেহকে একটা নালার মধ্যে ঠেলে দিয়ে\nশিস দিতে দিতে\nঅরণ্য থেকে আমি বেরিয়ে এলুম।\n",
                  author: "Nirendranath Chakraborty",
                },
                {
                  title: "সাধনা",
                  content:
                    "দেবী,     অনেক ভক্ত এসেছে তোমার চরণতলে\n               অনেক অর্ঘ্য আনি,\n         আমি অভাগ্য এনেছি বহিয়া নয়নজলে\n               ব্যর্থ সাধনখানি।\n         তুমি জান মোর মনের বাসনা,\n         যত সাধ ছিল সাধ্য ছিল না,\n         তবু বহিয়াছি কঠিন কামনা\n               দিবসনিশি।\n\n         মনে যাহা ছিল হয়ে গেল আর,\n         গড়িতে ভাঙিয়া গেল বারবার,\n         ভালোয় মন্দে আলোয় আঁধার\n               গিয়েছে মিশি।\n         তবু ওগো, দেবী, নিশিদিন করি পরানপণ,\n               চরণে দিতেছি আনি\n         মোর জীবনের সকল শ্রেষ্ঠ সাধের ধন\n               ব্যর্থ সাধনখানি।\n      ওগো       ব্যর্থ সাধনখানি\n         দেখিয়া হাসিছে সার্থকফল\n               সকল ভক্ত প্রাণী।\n         তুমি যদি, দেবী, পলকে কেবল\n         কর কটাক্ষ স্নেহসুকোমল,\n         একটি বিন্দু ফেল আঁখিজল\n               করুণা মানি,\n         সব হবে তবে সার্থক হবে\n               ব্যর্থ সাধনখানি।\n\n      দেবী,   আজি আসিয়াছে অনেক যন্ত্রী শুনাতে গান\n               অনেক যন্ত্র আনি,\n           আমি আনিয়াছি ছিন্নতন্ত্রী নীরব ম্লান\n               এই দীন বীণাখানি।\n           তুমি জান ওগো করি নাই হেলা,\n           পথে প্রান্তরে করি নাই খেলা,\n           শুধু সাধিয়াছি বসি সারাবেলা\n               শতেক বার।\n           মনে যে গানের আছিল আভাস,\n           যে তান সাধিতে করেছিনু আশ,\n            সহিল না সেই কঠিন প্রয়াস--\n               ছিঁড়িল তার।\n\n           স্তবহীন তাই রয়েছি দাঁড়ায়ে সারাটি ক্ষণ,\n                 আনিয়াছি গীতহীনা\n           আমার প্রাণের একটি যন্ত্র বুকের ধন\n                 ছিন্নতন্ত্রী বীণা।\n         ওগো      ছিন্নতন্ত্রী বীণা\n           দেখিয়া তোমার গুণীজন সবে\n                 হাসিছে করিয়া ঘৃণা।\n           তুমি যদি এরে লহ কোলে তুলি,\n           তোমার শ্রবণে উঠিবে আকুলি\n           সকল অগীত সংগীতগুলি,\n                 হৃদয়াসীনা।\n           ছিল যা আশায় ফুটাবে ভাষায়\n                 ছিন্নতন্ত্রী বীণা।\n \n       দেবী, এ জীবনে আমি গাহিয়াছি বসি অনেক গান,\n                 পেয়েছি অনেক ফল--\n          সে আমি সবারে বিশ্বজনারে করেছি দান,\n                 ভরেছি ধরণীতল।\n          যার ভালো লাগে সেই নিয়ে যাক,\n          যতদিন থাকে ততদিন থাক্‌,\n          যশ-অপযশ কুড়ায়ে বেড়াক\n                 ধুলার মাঝে।\n          বলেছি যে কথা করেছি যে কাজ\n          আমার সে নয় সবার সে আজ\n          ফিরিছে ভ্রমিয়া সংসারমাঝ\n                 বিবিধ সাজে।\n          যা-কিছু আমার আছে অপনার শ্রেষ্ঠ ধন\n                 দিতেছি চরণে আসি--\n          অকৃত কার্য, অকথিত বাণী, অগীত গান,\n                 বিফল বাসনারাশি।\n\n           ওগো      বিফল বাসনারাশি\n             হেরিয়া আজিকে ঘরে পরে সবে\n                       হাসিছে হেলার হাসি।\n             তুমি যদি, দেবী, লহ কর পাতি,\n             আপনার হাতে রাখ মালা গাঁথি,\n             নিত্য নবীন রবে দিনরাতি\n                       সুবাসে ভাসি,\n             সফল করিবে জীবন আমার\n                       বিফল বাসনারাশি।",
                  author: "Rabindranath Thakur",
                },
              ],
              quizzes: [],
            })
          ),
          (db = ls.getItem("poemDB")));
        try {
          JSON.parse(db);
        } catch (er) {
          console.log("Database corrupt. Reseting...");
          ls.removeItem("poemDB");
        }
        return JSON.parse(db).poems;
      })(ls.getItem("poemDB")),
      () => {
        make(
          "body",
          "a",
          "",
          "",
          () => {
            setTimeout(() => {
              document.querySelector("#blob").remove();
            }, 200);
          },
          false,
          "id|blob",
          "download|poems",
          "href|" +
            URL.createObjectURL(
              new Blob([localStorage["poemDB"]], { type: "application/json" })
            )
        ).click();
        msg("Downloading backup code...");
        return true;
      }
    );
  })(
    localStorage,
    (parNode, tag, body, style, onClick, isReplace = false, ...attributes) => {
      var _m =
        tag === "svg"
          ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
          : document.createElement(tag || new Error("No HTML tag specified!!"));
      _m.innerHTML = body || "";
      _m.style.cssText = style || "";
      attributes.forEach((m) => {
        var attr = m.split("|");
        _m.setAttribute(attr[0], attr[1]);
      });
      isReplace
        ? (typeof parNode === "string"
            ? document.querySelector(parNode)
            : parNode
          ).replaceWith(_m)
        : (typeof parNode === "string"
            ? document.querySelector(parNode)
            : parNode
          ).append(_m);
      _m.onclick = onClick;
      return _m;
    },
    (content) => {
      if (document.querySelectorAll("#msg-wrapper").length != 0) {
        document.querySelector(
          "#msg-wrapper"
        ).style.cssText = `opacity: 0!important`;
        document.querySelector("#msg-wrapper").remove();
      }
      d101 = document.createElement("div");
      d101.id = "msg-wrapper";
      d101.innerHTML =
        '<span id="msg" style="visibility: visible;"><span style="">' +
        content +
        "</span></span>";
      document.children[0].append(d101);
      d101.onclick = () => {
        document.querySelector(
          "#msg-wrapper"
        ).style.cssText = `opacity: 0!important`;
        document.querySelector("#msg-wrapper").remove();
      };
      setTimeout(function () {
        try {
          document.querySelector(
            "#msg-wrapper"
          ).style.cssText = `opacity: 0!important`;
          document.querySelector("#msg-wrapper").remove();
        } catch (e) {
          null;
        }
      }, 3000);
      delete d101;
    },
    function (type, title, text) {
      var k100;
      !type
        ? document.querySelector("#backdrop").parentElement.remove()
        : ((k100 = document.createElement("div")),
          (k100.innerHTML =
            '<div id="backdrop"></div><div id="sum_info"> <span class="h_info" style=" ">' +
            title +
            '</span><br> <span class="p_info">' +
            text +
            "</span> <br> </div>"),
          document.querySelector("body").append(k100),
          (document.querySelector("#backdrop").onclick = () => {
            document.querySelector("#backdrop").parentElement.remove();
          }),
          document
            .querySelector("#sum_info")
            .removeEventListener("click", onclick));
    }
  );
};

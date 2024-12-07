const Utils = {
  make: (
    parNode,
    tag,
    body,
    style,
    onClick,
    isReplace = false,
    ...attributes
  ) => {
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
  msg: (content) => {
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
  modal: function (type, title, text) {
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
  },
  getBuffer: (el) => {
    return {
      top: el.offsetTop,
      bottom: document.body.offsetHeight - (el.offsetHeight + el.offsetTop),
      left: el.offsetLeft,
      right: document.body.offsetWidth - (el.offsetWidth + el.offsetLeft),
    };
  },
  poemTxt: (poemN) => {
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
  closest: (active) => {
    var loc =
      ((getBuffer(active).top + document.querySelector("#poemDrag").scrollTop) *
        2 +
        active.offsetHeight) /
      2;
    var diff = [];
    document.querySelectorAll("#poemLine[dragging='false']").forEach((a) => {
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
  updatePoemDB: (existingLoc, title, author, content) => {
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
  token: (length = 300) => {
    var token = [];
    while (
      token.length !== length ||
      (JSON.parse(localStorage["poemDB"] || "[]").quizzes || []).findIndex(
        (a) => {
          return a._id === token.join("");
        }
      ) !== -1
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
};

export default Utils;
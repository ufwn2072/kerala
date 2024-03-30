var remTid
remStyle = document.createElement("style")
function resetRem() {
  setRem()
  // if (remTid) clearTimeout(remTid);
  // remTid = setTimeout(setRem, 1);
}

function setRem() {
  var remSize = {
    designWidth: 1440,
    designHeight: 1080,
    maxWidth: 2106,
    maxHeight: 1620,
    minWidth: 1000,
    minHeight: 750
  }
  var isMobile = window.innerWidth < 962
  if (isMobile) {
    remSize = {
      designWidth: 750,
      designHeight: 1624,
    }
  }
  var doc = document,
    docEl = doc.documentElement



  function refreshRem() {
    // 屏幕宽度
    var width = window.innerWidth;
    var height = window.innerHeight;

    // 最大宽度
    if (remSize.maxWidth && width > remSize.maxWidth) {
      width = remSize.maxWidth;
    }
    if (remSize.maxHeight && height > remSize.maxHeight) {
      height = remSize.maxHeight;
    }
    // 最小宽度
    if (remSize.minWidth && width < remSize.minWidth) {
      width = remSize.minWidth;
    }
    if (remSize.minHeight && height < remSize.minHeight) {
      height = remSize.minHeight;
    }

    var rem
    //方案1 计算屏幕高宽比
    if (!isMobile && width / height > remSize.designWidth / remSize.designHeight) {
      rem = height / remSize.designHeight;
    } else {
      rem = width / remSize.designWidth;
    }
    window.remJs = rem;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();
  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "0.32remnpx eslint --init\n";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "0.32rem";
    }, false);
  }
}
setRem()
window.addEventListener("resize", resetRem, false);
window.addEventListener("pageshow", resetRem, false);
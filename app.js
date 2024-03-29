import create_topBar from './create_topBar.js';

// I N T E R A C T I V E S
const localStorage = window.localStorage;
var monthShown = "July";

// // DATA VALUES
const level2ZIndex = "1000";
const menuTitleSize = 1.25;
const menuTitleMargin = 3;
const _letterSpacing = 0.25;
const menuBgColor = "#000000";
const borderRadius = "5%";
const commonHeight = 8;
const commonWidth = 5;
const heightTopbar = "3.5rem";
const paddingTitle = "0.25rem";
const heightVisuals =
  "calc(100vh - " +
  (parseFloat(heightTopbar) / 2 + parseFloat(paddingTitle)) +
  "rem)";
const containerheightCalendar =
  "calc(50vh - " +
  (parseFloat(heightTopbar) / 2 + parseFloat(paddingTitle)) +
  "rem)";
const rightcommonWidth = "18rem";
const colors = [
  "#0006E1",
  "#31B303",
  "#CA008C",
  "#808080",
  "#FFA500",
  "#CCB726",
  "#790604",
];
const resultCardOpacity = "0.81";
const resultCardAddBtn = "8rem";
const heightCalendar = containerheightCalendar;
const calendarMonthChoiceFontSize = "1.5rem";
const calendarMonthChoiceHeight = "2.5rem";

const date = new Date();
const year = date.getFullYear();
const DATA_Calendar = [];
const months = [];
const weeks = [];
const days = [];

function setDATA_Calendar() {
  for (let i = 1; i <= 12; i++) {
    const month = new Date(year, i, 0);
    const monthDATA = new Array();
    const daysInMonth = month.getDate();
    monthDATA.code = month.toLocaleString("en-EN", { month: "long" });
    monthDATA.daysNum = daysInMonth;

    let strDaysByComma = "";
    let strDayNums = "";
    for (let j = 1; j <= daysInMonth; j++) {
      const day = new Date(year, i - 1, j);
      const dayNum = day.getDate();
      const dayName = day.toLocaleDateString("en-EN", { weekday: "long" });
      strDaysByComma += dayName === "Sunday" ? dayName + "," : dayName + " ";
      strDayNums += dayNum + " ";
    }
    const strWeeks = strDaysByComma.split(",");
    strWeeks.pop();
    let count = 1;
    strWeeks.forEach(function (strWeek) {
      const week = strWeek.split(" ");
      week.code = "Week " + count;
      monthDATA.push(week);
      count++;
    });
    DATA_Calendar.push(monthDATA);
  }
}
function setDATA_monthsWeeksDays() {
  for (let i = 0; i < DATA_Calendar.length; i++) {
    const month = DATA_Calendar[i];
    const name = month.code;
    months.push(name);
    for (let j = 0; j < month.length; j++) {
      const week = month[j];
      week.code = month.code + "-Week-" + (j + 1);
      weeks.push(week);
      for (let y = 0; y < week.length; y++) {
        const day = week[y];
        const dayObj = {};
        dayObj.code = week.code + " Day-" + (y + 1);
        dayObj.name = day;
        days.push(dayObj);
      }
    }
  }
}

setDATA_Calendar();
setDATA_monthsWeeksDays();
function app() {
  console.log("This function is executed once the page is fully loaded");
  const app = document.getElementById("app");

  const chooseHourBlock = ["prevHourBlock", "timeBlockChoice", "nextHourBlock"];
  const timeBlocks = [
    "chooseHourBlock",
    chooseHourBlock,
    "addTimeBlock",
    "storeTimeBlocks",
  ];
  const projectBarComponents = [
    "chooseProjectBarColor",
    "projectTitle",
    "consoleTimeBlocks",
    timeBlocks,
  ];
  const projectBar = ["projectBar", projectBarComponents];
  const projectBarsScroll = [
    "projectBarsScrollMenu",
    ["prevProjectBar", "projectBarsSymbolLines", "nextProjectBar"],
  ];

  const topBar = ["title", "about"];
  const menuProjects = [
    "headerProjects",
    "addProjectBar",
    ["addProjectBarLabel"],
  ];
  const titleBarForProjects = [
    "titleScrollProjects",
    "titleProjectColor",
    "titleProjectName",
    "titleChooseTimeBlockSize",
    "titleAddTimeBlock",
    "titleTimeBlocks",
  ];
  const projects = [
    "projectsMenuArea",
    ["menuProjects", menuProjects, "titleBarForProjects", titleBarForProjects],
    "projectBarsArea",
    ["projectBarsScroll", projectBarsScroll, "projectBars"],
  ];
  const monthChoices = ["prevMonth", "chooseMonth", "nextMonth"];
  const menuCalendar = ["headerCalendar", "monthChoices", monthChoices];
  const calendar = [
    "calendarMenuArea",
    ["menuCalendar", menuCalendar],
    "calendarDataArea",
  ];
  const sideBarMenu = [
    "dataPersistance",
    ["dataPersistanceHeader", "saveToTextBtn", "dropToFillBtn"],
    "$Btn",
    ["$Message", "$btn"],
  ];

  const BASIC_DOM = [
    "root",
    [
      "topBar",
      topBar,
      "main",
      [
        "visuals",
        ["projects", projects, "calendar", calendar],
        "sideBarMenu",
        sideBarMenu,
      ],
      "footer",
    ],
  ];

  assembleDOM(BASIC_DOM, app);
  create_topBar();
  create_main();
  create_visuals();
  create_projects();
  create_sideBarMenu();
  create_calendar();

  dragAndDrop();

  // ABSTRACTIONS
  function assembleDOM(arr, container) {
    arr.forEach(function (el, index) {
      if (typeof el == "object") {
        let name = arr[index - 1] || container;
        let nestedContainers = document.getElementsByClassName(name);
        let nestedContainer =
          nestedContainers.length > 1
            ? nestedContainers[nestedContainers.length - 1]
            : nestedContainers[0];
        let nestedArr = el;
        assembleDOM(nestedArr, nestedContainer);
      } else {
        let div = document.createElement("div");
        div.className = el;
        // comment / uncomment
        // devHelperF_borderify(div);
        // devHelperF_textMark(div, el);
        container.appendChild(div);
      }
    });
    function devHelperF_borderify(el) {
      el.style.border = "1px solid black";
    }
    function devHelperF_greyifyBg(el) {
      el.style.background = "grey";
    }
    function devHelperF_textMark(el, text) {
      let span = document.createElement("span");
      // span.style.position = 'absolute';
      span.style.top = "1rem";
      span.style.left = "1rem";
      span.innerText = text;
      span.style.color = "blue";
      span.style.letterSpacing = "1px";
      span.style.fontSize = "2.5rem";
      el.style.position = "relative";
      el.appendChild(span);
    }
  }
  // access
  var count = 0;
  function hasClass(element, className) {
    return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
  }
  function setup_findElementUp(elem, name) {
    return hasClass(elem.parentElement, name) && count < 12
      ? (function () {
          count = 0;
          return elem.parentElement;
        })()
      : (function () {
          count++;
          return setup_findElementUp(elem.parentElement, name);
        })();
  }
  function getEl_loopF(className, modify) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      modify(elements[i]);
    }
  }
  function getLastEl_runF(className, modify) {
    const elements = document.getElementsByClassName(className);
    const el = document.getElementsByClassName(className)[elements.length - 1];
    modify(el);
  }
  function getOneEl_runF(className, i, modify) {
    const el = document.getElementsByClassName(className)[i];
    modify(el);
  }
  // re-usables
  function style_prevArr(el) {
    el.style.cursor = "pointer";
    el.style.padding = commonWidth * 2;
    el.style.borderTop = commonHeight / 2 + "rem solid #ffffff";
    el.style.borderLeft = commonHeight / 6 + "rem solid transparent";
    el.style.borderRight = commonHeight / 6 + "rem solid transparent";
    el.style.borderBottom = "0";
    el.style.width = "0.25rem";
    el.style.transform = "rotate(90deg)";
    // position
    el.style.position = "absolute";
    el.style.left = -commonWidth / 2 + "rem";
  }
  function style_nextArr(el) {
    el.style.cursor = "pointer";
    el.style.borderTop = commonHeight / 2 + "rem solid #ffffff";
    el.style.borderLeft = commonHeight / 6 + "rem solid transparent";
    el.style.borderRight = commonHeight / 6 + "rem solid transparent";
    el.style.borderBottom = "0";
    el.style.width = "0.25rem";
    el.style.transform = "rotate(-90deg)";
    el.style.marginLeft = commonWidth + "rem";
    // position
    el.style.position = "absolute";
    el.style.right = -commonWidth / 2 + "rem";
  }
  function create_colorMenuBtn() {
    const colorMenuBtn = content_colorMenuBtn();
    const colorMenu = content_colorMenu();
    content_colorChoiceBtns();
    content_colorChoiceBtnBtns();
    content_menuCloser();
    content_btnClose();

    function content_colorMenuBtn() {
      const colorMenuBtn = document.createElement("div");
      colorMenuBtn.className = "colorMenuBtn";
      return colorMenuBtn;
    }
    function content_colorMenu() {
      const colorMenu = document.createElement("div");
      colorMenu.className = "colorMenu";
      colorMenuBtn.appendChild(colorMenu);
      return colorMenu;
    }
    function content_colorChoiceBtns() {
      const colorMenu = colorMenuBtn.getElementsByClassName("colorMenu")[0];
      colors.forEach(function (color) {
        const block = document.createElement("div");
        block.classList = "colorChoiceBtn " + color;
        colorMenu.appendChild(block);
      });
    }
    function content_colorChoiceBtnBtns() {
      const blocks = colorMenu.getElementsByClassName("colorChoiceBtn");
      for (let i = 0; i < blocks.length; i++) {
        const btn = document.createElement("div");
        btn.classList = "btn";
        blocks[i].appendChild(btn);
      }
    }
    function content_menuCloser() {
      const colorMenu = colorMenuBtn.getElementsByClassName("colorMenu")[0];
      const menuCloser = document.createElement("div");
      menuCloser.className = "menuCloser";
      colorMenu.appendChild(menuCloser);
    }
    function content_btnClose() {
      const menuCloser = colorMenu.getElementsByClassName("menuCloser")[0];
      const btnClose = document.createElement("div");
      const closeSymbol = document.createElement("span");
      btnClose.className = "btnClose";
      closeSymbol.innerText = "X";
      closeSymbol.style.userSelect = "none";
      btnClose.appendChild(closeSymbol);
      menuCloser.appendChild(btnClose);
    }

    const menuZIndex = String(level2ZIndex + 1);
    const menuDisplay = "flex";
    const btnDistance = 0.75;
    const btnBorder = 0.5;
    const blockBgColor = "#000000";
    style();
    interactives();
    function style() {
      style_colorMenuBtn();
      style_colorMenu();
      style_colorChoiceBtns();
      style_colorChoiceBtnBtns();
      style_menuCloser();
      style_btnClose();

      function style_colorMenuBtn() {
        colorMenuBtn.style.cursor = "pointer";
        colorMenuBtn.style.borderRadius = borderRadius;
        colorMenuBtn.style.height = commonHeight / 1.25 + "rem";
        colorMenuBtn.style.width = commonHeight / 1.75 + "rem";
        colorMenuBtn.style.backgroundColor = "blue";
      }
      function style_colorMenu() {
        const colorMenu = colorMenuBtn.getElementsByClassName("colorMenu")[0];
        colorMenu.style.height = commonHeight + "rem";
        colorMenu.style.width = commonWidth * colors.length + "rem";
        colorMenu.style.top = "0";
        colorMenu.style.display = menuDisplay;
        colorMenu.style.position = "absolute";
        colorMenu.style.zIndex = menuZIndex;
        colorMenu.style.top = "0";
        colorMenu.style.left = "100%";
        colorMenu.style.display = "flex";
      }
      function style_colorChoiceBtns() {
        const blocks = colorMenu.getElementsByClassName("colorChoiceBtn");
        for (let i = 0; i < colors.length; i++) {
          const colorChoiceBtn = blocks[i];
          colorChoiceBtn.style.backgroundColor = blockBgColor;
          colorChoiceBtn.style.flex = "1";
          colorChoiceBtn.style.display = "flex";
          colorChoiceBtn.style.justifyContent = "center";
          colorChoiceBtn.style.alignItems = "center";
          colorChoiceBtn.style.paddingLeft = btnDistance + "rem";
        }
      }
      function style_colorChoiceBtnBtns() {
        const btns = colorMenu.getElementsByClassName("btn");
        for (let i = 0; i < colors.length; i++) {
          const choiceBtn = btns[i];
          choiceBtn.style.backgroundColor = colors[i];
          choiceBtn.style.height = commonHeight / 1.25 + "rem";
          choiceBtn.style.width = commonHeight / 1.75 + "rem";
          // choiceBtn.style.border = btnBorder + 'rem solid #000000';
          choiceBtn.style.borderRadius = borderRadius;
          // choiceBtn.style.boxSizing = 'content-box';
          choiceBtn.style.cursor = "pointer";
        }
      }
      function style_menuCloser() {
        const btnClose = colorMenu.getElementsByClassName("menuCloser")[0];
        btnClose.style.backgroundColor = blockBgColor;
        btnClose.style.flex = "1";
        btnClose.style.display = "flex";
        btnClose.style.justifyContent = "center";
        btnClose.style.alignItems = "center";
      }
      function style_btnClose() {
        const btnClose = colorMenu.getElementsByClassName("btnClose")[0];
        btnClose.style.cursor = "pointer";
        btnClose.style.display = "flex";
        btnClose.style.justifyContent = "center";
        btnClose.style.alignItems = "center";
        // btnClose.style.height = (commonHeight / 2.25) + btnBorder * 2 + 'rem';
        btnClose.style.height = commonHeight / 1.25 + "rem";
        btnClose.style.width = commonHeight / 1.25 + "rem";
        btnClose.style.marginLeft = btnDistance * 2 + "rem";
        btnClose.style.marginRight = btnDistance * 2 + "rem";
        btnClose.style.border = "1px solid #ffffff";
        btnClose.style.backgroundColor = blockBgColor;
        btnClose.style.borderRadius = borderRadius;
        btnClose.style.color = "#ffffff";
        btnClose.style.textAlign = "center";
        btnClose.style.fontSize = "3.5rem";
      }
    }
    function interactives() {
      setup_hideColorMenu();
      inter_CLICK_colorMenuBtn(colorMenuBtn);
      inter_CLICK_closeBtn();
      inter_CLICK_colorChoiceBtn();

      function setup_hideColorMenu() {
        colorMenu.style.display = "none";
      }
      function inter_CLICK_colorMenuBtn(colorMenuBtn) {
        colorMenuBtn.onclick = function (e) {
          e.stopPropagation();
          colorMenu.style.display = menuDisplay;
        };
      }
      function inter_CLICK_closeBtn() {
        const closeBlock = colorMenu.getElementsByClassName("menuCloser")[0];
        closeBlock.onclick = function (e) {
          e.stopPropagation();
          colorMenu.style.display = "none";
        };
      }
      function inter_CLICK_colorChoiceBtn() {
        // ot to refactor all that
        const colorChoiceBtns =
          colorMenu.getElementsByClassName("colorChoiceBtn");
        for (let i = 0; i < colorChoiceBtns.length; i++) {
          const colorChoiceBtn = colorChoiceBtns[i];
          colorChoiceBtn.onclick = function (e) {
            e.stopPropagation();
            const color = colorChoiceBtn.classList[1];
            handleColorShift(color, colorChoiceBtn);
          };
        }
      }
      function handleColorShift(color, colorChoiceBtn) {
        shiftProjectBarColor(color, colorChoiceBtn);
        updateScrollBars();
      }
      // one thing I can do to refactor that?
      // moving that up?
      function shiftProjectBarColor(color, colorChoiceBtn) {
        const projectBar = setup_findElementUp(colorChoiceBtn, "projectBar");
        const plus = projectBar.getElementsByClassName("plus")[0];
        const plusText = projectBar.getElementsByClassName("plusText")[0];
        const storeTimeBlocks =
          projectBar.getElementsByClassName("storeTimeBlocks")[0];
        const hourBlocks = storeTimeBlocks.getElementsByClassName("hourBlock");
        const projectBarIndex = [
          ...document.getElementsByClassName("projectBar"),
        ].indexOf(projectBar);
        const calendarHourBlocks = document.getElementsByClassName(
          "projectBar-" + projectBarIndex + " " + "hourBlock"
        );
        shiftComponentColors(
          projectBar,
          color,
          plus,
          plusText,
          storeTimeBlocks,
          hourBlocks,
          calendarHourBlocks
        );
      }
      function shiftComponentColors(
        projectBar,
        color,
        plus,
        plusText,
        storeTimeBlocks,
        hourBlocks,
        calendarHourBlocks
      ) {
        className(projectBar, color);
        components(projectBar, color, plus, plusText, storeTimeBlocks);
        inCalendar(calendarHourBlocks);
        inProject(hourBlocks);
        closeMenu();
      }
      function updateScrollBars(color) {
        updateProjectBarsSymbolLines();
        animateBgColorOfNextProjectBarArrow(color);
      }
      function updateProjectBarsSymbolLines() {
        const projectBars = document.getElementsByClassName("projectBar");
        const symbolLines = document.getElementsByClassName(
          "projectBarSymbolLine"
        );

        for (let i = 0; i < projectBars.length; i++) {
          const bar = projectBars[i];
          const symbolLine = symbolLines[i];
          symbolLine.style.transition = "background-color 2s";
          symbolLine.style.backgroundColor = bar.style.backgroundColor;
        }
      }
      function animateBgColorOfNextProjectBarArrow(color) {
        const prevProjectBarArrow =
          document.getElementsByClassName("prevProjectBar")[0];
        const nextProjectBarArrow =
          document.getElementsByClassName("nextProjectBar")[0];
        animate(prevProjectBarArrow, color);
        animate(nextProjectBarArrow, color);
      }
      function animate(el, color) {
        el.style.borderTopColor = color;
        el.style.transition = "border-top-color 1s";
        setTimeout(function resetColor() {
          el.style.borderTopColor = "#ffffff";
        }, 1000);
      }
      function className(projectBar, color) {
        const projectBarClasses = [...projectBar.classList];
        const colorIndex = projectBarClasses.indexOf("color") + 1;
        const currentColor = projectBarClasses[colorIndex];
        projectBar.classList.replace(currentColor, color);
      }
      function components(projectBar, color, plus, plusText, storeTimeBlocks) {
        projectBar.style.backgroundColor = color;
        colorMenuBtn.style.backgroundColor = color;
        plus.style.borderColor = color;
        plusText.style.color = color;
        storeTimeBlocks.style.borderBottomColor = color;
      }

      function inCalendar(calendarHourBlocks) {
        [...calendarHourBlocks].forEach(
          (block) => (block.style.backgroundColor = color)
        );
      }
      function inProject(hourBlocks) {
        [...hourBlocks].forEach((block) => {
          const qMark = block.getElementsByClassName("qMark")[0];
          qMark.style.color = color;
          block.style.backgroundColor = color;
        });
      }
      function closeMenu() {
        colorMenu.style.display = "none";
      }
    }
    return colorMenuBtn;
  }

  // THINGS
  function create_topBar() {
    // C O N T E N T
    getEl_loopF("title", content_title);
    getEl_loopF("about", content_about);
    function content_title(el) {
      let letters = "Project Time Blocks In Calendar".split("");
      for (let i = 0; i < letters.length; i++) {
        let letter = document.createElement("letter");
        letter.className = "colorLetter";
        letter.innerText = letters[i];
        letter.style.userSelect = "none";
        letter.style.color = colors[i % 7];
        letter.style.letterSpacing = "1px";
        el.appendChild(letter);
      }
    }
    function content_about(el) {
      el.innerText = "ABOUT";
      el.style.userSelect = "none";
    }

    // S T Y L E
    let title_height = "3rem";
    let title_bgColor = "#000000";
    let title_color = "#ffffff";
    let title_padding = "0.5rem";
    getEl_loopF("topBar", style_topbar);
    getEl_loopF("title", style_title);
    getEl_loopF("about", style_about);

    function style_topbar(el) {
      el.style.display = "flex";
      // el.style.background = title_bgColor;
      el.style.background = "blue";
      el.style.height = "100%";
      el.style.borderBottom = "1px solid #ffffff";
    }
    function style_title(el) {
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.paddingLeft = "0.25rem";
      el.style.background = title_bgColor;
      el.style.height = title_height;
      el.style.color = "#ffffff";
      el.style.fontSize = "1rem";
      el.style.borderRight = "1px solid #ffffff";
      el.style.letterSpacing = _letterSpacing + "rem";
      const colorLetters = el.getElementsByClassName("colorLetter");
      for (let i = 0; i < colorLetters.length; i++) {
        colorLetters[i].style.paddingLeft = _letterSpacing + "rem";
      }
      colorLetters[colorLetters.length - 1].style.marginRight = "0.5rem";
    }
    function style_about(el) {
      el.style.color = title_color;
      el.style.padding = "0.25rem";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.textAlign = "center";
      el.style.justifyContent = "center";
      el.style.paddingLeft = "0.25rem";
      el.style.background = title_bgColor;
      el.style.height = title_height;
      el.style.color = "#ffffff";
      el.style.fontSize = "1rem";
      el.style.borderRight = "1px solid #ffffff";
      el.style.letterSpacing = _letterSpacing + "rem";
    }
  }
  function create_main() {
    function style_main(el) {
      el.style.display = "flex";
    }
    getEl_loopF("main", style_main);
  }
  function create_visuals() {
    getEl_loopF("visuals", style_visuals);
    function style_visuals(el) {
      el.style.flex = "3";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.height = heightVisuals;
    }
  }

  function create_projects() {
    create_menuProjects();
    create_titleBarForProjects();
    create_projectBarsScroll();
    create_projects.create_projectBarsSymbolLine = function () {
      const projectBars = document.getElementsByClassName("projectBars")[0];
      const projectBarsSymbolLines = document.getElementsByClassName(
        "projectBarsSymbolLines"
      )[0];
      const color = getLastProjectBarColor();
      const line = document.createElement("div");
      projectBarsSymbolLines.appendChild(line);
      style();
      function getLastProjectBarColor() {
        const num =
          Number(projectBars.getElementsByClassName("projectBar").length) - 1;
        const lastProjectBar =
          projectBars.getElementsByClassName("projectBar")[num];
        const color = lastProjectBar.style.backgroundColor;
        return color;
      }
      function style() {
        line.className = "projectBarSymbolLine";
        line.style.height = "6px";
        line.style.width = "100%";
        line.style.borderRadius = "15%";
        line.style.backgroundColor = color;
        line.style.marginLeft = "1px";
      }
    };
    create_projects.handleSymbolLinesScroll = function () {
      const projectBars = document.getElementsByClassName("projectBars")[0];
      const barsList = projectBars.getElementsByClassName("projectBar");
      const linesList = document.getElementsByClassName("projectBarSymbolLine");
      handleHighlight();
      handleWidths();
      function getVisibilityData() {
        return [...barsList].map((bar) =>
          isVisible(bar, projectBars) ? true : false
        );

        function isVisible(el, container) {
          function returnTwoThirdsElHeight() {
            return (el.getBoundingClientRect().height / 3) * 2;
          }
          function isNotTooHighUp() {
            return !(
              el.getBoundingClientRect().bottom - returnTwoThirdsElHeight() <
              container.getBoundingClientRect().top
            );
          }
          function isNotTooLowBelow() {
            return !(
              el.getBoundingClientRect().top + returnTwoThirdsElHeight() >
              container.getBoundingClientRect().bottom
            );
          }
          return isNotTooHighUp() && isNotTooLowBelow();
        }
      }
      function handleHighlight() {
        const visibilityData = getVisibilityData();
        for (let i = 0; i < visibilityData.length; i++) {
          const line = linesList[i];
          modifyHighlight(line, visibilityData[i]);
        }
        function modifyHighlight(line, visibility) {
          function highlightByData(line, visibility) {
            visibility ? styleInScrollArea(line) : styleOutOfScrollArea(line);
          }
          function styleInScrollArea(el) {
            el.style.height = "4px";
            el.style.borderRadius = "50%";
          }
          function styleOutOfScrollArea(el) {
            el.style.height = "1px";
            el.style.borderRadius = "0";
          }
          highlightByData(line, visibility);
        }
      }
      function getWidthsData() {
        const visibilityData = getVisibilityData();
        const widthsData = visibilityData.map((undefined, index) => {
          if (isBeforeFirstVisible(index)) {
            return getDistanceBeforeFirstVisible(index);
          } else if (isAfterLastVisible(index)) {
            return getDistanceAfterLastVisible(index);
          } else {
            return null;
          }
        });
        function getDistanceBeforeFirstVisible(index) {
          return getFirstVisibleIndex() - index;
        }
        function getDistanceAfterLastVisible(index) {
          return index - getLastVisibleIndex();
        }
        function isBeforeFirstVisible(index) {
          return index < getFirstVisibleIndex();
        }
        function isAfterLastVisible(index) {
          return index > getLastVisibleIndex();
        }
        function getFirstVisibleIndex() {
          return visibilityData.indexOf(true);
        }
        function getLastVisibleIndex() {
          return visibilityData.lastIndexOf(true);
        }
        return widthsData;
      }
      function handleWidths() {
        const widthsData = getWidthsData();
        for (let i = 0; i < widthsData.length; i++) {
          const line = linesList[i];
          modifyWidth(line, widthsData[i]);
        }
        function modifyWidth(line, width) {
          if (width) {
            const num = Number(1 / width / 1.2);
            line.style.width = num * 100 + "%";
          } else {
            line.style.width = "100%";
          }
        }
      }
    };
    create_projects.create_projectBar = function () {
      getLastEl_runF("chooseProjectBarColor", content_chooseProjectBarColor);
      getLastEl_runF("projectTitle", content_projectTitle);
      getLastEl_runF("timeBlockChoice", content_timeBlockChoice);
      getLastEl_runF("addTimeBlock", content_addTimeBlock);
      getLastEl_runF("storeTimeBlocks", content_storeTimeBlocks);
      // function
      function content_chooseProjectBarColor(el) {
        const btn = create_colorMenuBtn();
        el.appendChild(btn);
      }
      function content_projectTitle(el) {
        const textarea = document.createElement("textarea");
        textarea.type = "text";
        textarea.placeholder = "Project title";
        textarea.style.userSelect = "none";
        el.appendChild(textarea);
      }
      function content_timeBlockChoice(el) {
        for (let i = 1; i < 25; i++) {
          let timeBlockChosen = document.createElement("div");
          timeBlockChosen.innerText = i;
          timeBlockChosen.style.userSelect = "none";
          timeBlockChosen.classList = "timeBlockChosen " + i + " hours";
          el.appendChild(timeBlockChosen);
        }
      }
      function content_addTimeBlock(el) {
        const plus = document.createElement("div");
        plus.className = "plus";
        const plusText = document.createElement("div");
        plusText.className = "plusText";
        plusText.innerText = "+";
        plusText.style.userSelect = "none";
        plus.appendChild(plusText);
        el.appendChild(plus);
      }
      function content_storeTimeBlocks(el) {
        const monthNum = months.indexOf(monthShown);
        const daysNum = DATA_Calendar[monthNum].daysNum;
        // const hours = document.createElement('div');
        // for (let i = 1; i <= daysNum; i++) {
        //   let hour = document.createElement('div');
        //   let num = document.createElement('span');
        //   num.innerText = i;
        // num.style.userSelect = 'none'
        //   hour.appendChild(num);
        //   hours.appendChild(hour);
        // }
        // const storeTimeBlocks = document.getElementsByClassName('storeTimeBlocks')[0];
        // storeTimeBlocks.appendChild(hours);
      }
      style();
      interactives();
      function style() {
        const height_projectBar = commonHeight / 1.5;
        const width_projectBar = commonWidth;
        getLastEl_runF("projectBar", style_projectBar);
        getLastEl_runF("chooseProjectBarColor", style_chooseProjectBarColor);
        getLastEl_runF("projectTitle", style_projectTitle);
        getLastEl_runF("consoleTimeBlocks", style_consoleTimeBlocks);
        getLastEl_runF("chooseHourBlock", style_chooseHourBlock);
        getLastEl_runF("prevHourBlock", style_prevHourBlock);
        getLastEl_runF("nextHourBlock", style_nextHourBlock);
        getLastEl_runF("timeBlockChoice", timeBlockChoice);
        getLastEl_runF("timeBlockChosen", style_timeBlockChosen);
        getLastEl_runF("addTimeBlock", style_addTimeBlock);
        getLastEl_runF("storeTimeBlocks", style_storeTimeBlocks);

        function style_chooseProjectBarColor(el) {
          el.style.position = "relative";
          el.style.backgroundColor = "#000000";
          el.style.height = height_projectBar + "rem";
          el.style.width = commonWidth + 2.5 + "rem";
          // el.style.paddingRight = '0.5rem';
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          const colorMenuBtn = el.getElementsByClassName("colorMenuBtn")[0];
          colorMenuBtn.style.height = height_projectBar * 0.7 + "rem";
          colorMenuBtn.style.width = width_projectBar * 0.6 + "rem";
        }
        function style_projectBar(el) {
          el.style.display = "flex";
          el.style.height = height_projectBar + "rem";
        }
        function style_projectTitle(el) {
          el.style.height = height_projectBar + "rem";
          el.style.width = commonWidth * 4 + "rem";
          el.style.display = "flex";
          el.style.wordWrap = "break-word";
          el.style.padding = "0.25rem";
          style_textArea();
          function style_textArea() {
            const textarea = el.getElementsByTagName("textarea")[0];
            textarea.style.flex = "1";
            textarea.style.maxWidth = commonWidth * 4 + "rem";
            textarea.style.width = "100%";
            textarea.style.padding = "1rem";
            textarea.style.margin = "0";
            textarea.style.display = "flex";
            textarea.style.flexWrap = "wrap";
            textarea.style.wordWrap = "break-word";
            textarea.style.justifyContent = "center";
            textarea.style.alignItems = "center";
            textarea.style.backgroundColor = "transparent";
            textarea.style.border = "0px solid transparent";
            textarea.style.textAlign = "center";
            textarea.style.verticalAlign = "middle";
            textarea.style.fontSize = "1.25rem";
            textarea.style.fontWeight = "normal";
          }
        }
        function style_consoleTimeBlocks(el) {
          // el.style.height = 'calc(100% - ' + titleHeight +')';
          el.style.flex = "1";
          el.style.display = "flex";
          // el.style.flexDirection = 'column';
          el.style.justifyContent = "flex-end";
        }
        function style_chooseHourBlock(el) {
          el.style.flex = "1";
          el.style.maxWidth = height_projectBar * 1.75 + "rem";
          el.style.display = "flex";
          el.style.flexDirection = "row";
          el.style.justifyContent = "center";
          el.style.position = "relative";
        }
        function style_prevHourBlock(el) {
          style_prevArr(el);
          // el.style.backgroundColor = '#000000';
          el.style.borderTopColor = "#000000";
          el.style.left = "0.8rem";
          el.style.top = "calc(50% - " + height_projectBar / 8 + "rem)";
          el.style.borderTop = height_projectBar / 4 + "rem solid #000000";
          el.style.borderLeft =
            height_projectBar / 12 + "rem solid transparent";
          el.style.borderRight =
            height_projectBar / 12 + "rem solid transparent";
        }
        function style_nextHourBlock(el) {
          style_nextArr(el);
          el.style.borderTopColor = "#000000";
          el.style.right = "0.8rem";
          el.style.top = "calc(50% - " + height_projectBar / 8 + "rem)";
          el.style.borderTop = height_projectBar / 4 + "rem solid #000000";
          el.style.borderLeft =
            height_projectBar / 12 + "rem solid transparent";
          el.style.borderRight =
            height_projectBar / 12 + "rem solid transparent";
        }
        function timeBlockChoice(el) {
          // el.style.flex = '1';
          el.style.minWidth = height_projectBar * 2.5 + "rem";
          el.style.border = "none";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
        }
        function style_timeBlockChosen(el) {
          const container = setup_findElementUp(el, "projectBar");
          const allTimeBlockChosenEls =
            container.getElementsByClassName("timeBlockChosen");
          for (let i = 0; i < allTimeBlockChosenEls.length; i++) {
            const timeBlockChosenEl = allTimeBlockChosenEls[i];
            const hoursNum = Number(timeBlockChosenEl.classList[1]);
            const grow = hoursNum / 100;
            const amplifyGrow = grow * 3;
            const inverseCurveGrow = amplifyGrow - hoursNum / 100;
            timeBlockChosenEl.style.height =
              (0.35 + inverseCurveGrow) * 100 + "%";
            timeBlockChosenEl.style.marginBottom =
              -(inverseCurveGrow / 6) + "px";
            timeBlockChosenEl.style.marginTop = inverseCurveGrow * 10 + "px";
            timeBlockChosenEl.style.fontSize =
              1.5 + (hoursNum / 100) * 2 + "rem";
            timeBlockChosenEl.style.border = "2px solid #000000";
            timeBlockChosenEl.style.paddingLeft = "1rem";
            timeBlockChosenEl.style.paddingRight = "1rem";
            timeBlockChosenEl.style.borderRadius = borderRadius;
            timeBlockChosenEl.style.display = "flex";
            timeBlockChosenEl.style.justifyContent = "center";
            timeBlockChosenEl.style.alignItems = "center";
            timeBlockChosenEl.style.fontWeight = "bold";
            timeBlockChosenEl.style.color = "#000000";
          }
        }
        function style_addTimeBlock(el) {
          const bar = setup_findElementUp(el, "projectBar");
          el.style.userSelect = "none";
          el.style.cursor = "pointer";
          el.style.flex = "1";
          el.style.maxWidth = height_projectBar + "rem";
          el.style.minWidth = height_projectBar + "rem";
          el.style.textAlign = "center";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.position = "relative";
          el.style.backgroundColor = "#000000";
          style_plusSymbol();
          function style_plusSymbol() {
            const plus = el.getElementsByClassName("plus")[0];
            setTimeout(() => {
              const barBgColor = bar.style.backgroundColor;
              plus.style.border = "0.2rem solid " + barBgColor;
            }, 100);
            plus.style.userSelect = "none";
            plus.style.backgroundColor = "#000000";
            plus.style.borderRadius = "100%";
            plus.style.position = "absolute";
            // plus.style.top = 0;
            // plus.style.bottom = 0;
            // plus.style.left = 0;
            // plus.style.right = 0;
            plus.style.inset = "0.8rem";
            plus.style.display = "flex";
            plus.style.textAlign = "center";
            plus.style.justifyContent = "center";
            style_plusText();
            function style_plusText() {
              const plusText = plus.children[0];
              setTimeout(() => {
                plusText.style.color = bar.style.backgroundColor;
              }, 100);
              plusText.style.userSelect = "none";
              plusText.style.fontSize = height_projectBar / 1.25 + "rem";
              plusText.style.fontWeight = "bold";
              plusText.style.borderRadius = borderRadius;
              plusText.style.position = "absolute";
              plusText.style.position = "absolute";
              // plusText.style.top = 0 - (height_projectBar) / 10 + 'rem';
              // plusText.style.bottom = 0;
              // plusText.style.left = 0;
              // plusText.style.right = 0;
              plusText.style.inset = "-0.95rem";
            }
          }
        }
        function style_storeTimeBlocks(el) {
          const bar = setup_findElementUp(el, "projectBar");
          setTimeout(() => {
            const color = bar.style.backgroundColor;
            el.style.borderBottomColor = color;
          }, 250);
          el.style.display = "flex";
          el.style.flex = "5";
          el.style.textAlign = "center";
          el.style.alignItems = "center";
          el.style.position = "relative";
          el.style.backgroundColor = "#000000";
        }
      }
      function interactives() {
        getLastEl_runF("projectTitle", inter_INPUT_projectTitle);
        getLastEl_runF("timeBlockChoice", inter_timeBlockChoice);
        getLastEl_runF("prevHourBlock", inter_CLICK_prevHourBlock);
        getLastEl_runF("nextHourBlock", inter_CLICK_nextHourBlock);
        getLastEl_runF("addTimeBlock", inter_CLICK_addTimeBlock);
        getLastEl_runF("projectBars", inter_SCROLL_highlightLines);

        create_projects.colorAddedProjectBar = function () {
          const projectBarList = document.getElementsByClassName("projectBar");
          const lastProjectBar = projectBarList[projectBarList.length - 1];
          const colorMenuBtn =
            lastProjectBar.getElementsByClassName("colorMenuBtn")[0];
          const randomNum = Math.floor(Math.random() * 6);
          const color = colors[randomNum];
          addColorClass(lastProjectBar, color);

          lastProjectBar.style.backgroundColor = color;
          colorMenuBtn.style.backgroundColor = color;
        };
        function addColorClass(projectBar, color) {
          projectBar.classList.add("color");
          projectBar.classList.add(color);
        }
        create_projects.updateColorClass = function (projectBar, color) {
          const colorIndex = [projectBar.classList].indexOf("color") + 1;
          const currentColor = projectBar.classList[colorIndex];
          projectBar.classList.replace(currentColor, color);
        };

        function inter_SCROLL_highlightLines(el) {
          el.addEventListener("scroll", function () {
            debounceF();
            function debounceF() {
              let open = true;
              if (open) {
                create_projects.handleSymbolLinesScroll();
                open = false;
                setTimeout(function () {
                  open = true;
                }, 250);
              } else {
                return;
              }
            }
          });
        }

        function inter_INPUT_projectTitle(el) {
          const textarea = el.getElementsByTagName("textarea")[0];
          textarea.onchange = function (e) {
            const projectTitle = e.target.value;
            localStorage.setItem("projectTitle", projectTitle);
          };
        }
        function inter_timeBlockChoice(el) {
          el.classList = "timeBlockChoice " + "1";
          const timeBlocks = el.getElementsByClassName("timeBlockChosen ");
          for (let i = 1; i < timeBlocks.length; i++) {
            timeBlocks[i].style.display = "none";
          }
        }
        function inter_CLICK_prevHourBlock(el) {
          el.onclick = function () {
            const timeBlockChoice =
              el.parentElement.getElementsByClassName("timeBlockChoice")[0];
            const num = timeBlockChoice.classList[1];
            if (1 < Number(num)) {
              const newNum = Number(num) - 1;
              timeBlockChoice.classList = "timeBlockChoice " + newNum;
              timeBlockChoice.getElementsByClassName(num)[0].style.display =
                "none";
              timeBlockChoice.getElementsByClassName(newNum)[0].style.display =
                "flex";
            }
          };
        }
        function inter_CLICK_nextHourBlock(el) {
          el.onclick = function () {
            const timeBlockChoice =
              el.parentElement.getElementsByClassName("timeBlockChoice")[0];
            const timeBlocks =
              timeBlockChoice.getElementsByClassName("timeBlockChosen");
            const num = timeBlockChoice.classList[1];
            if (Number(num) < timeBlocks.length) {
              const newNum = Number(num) + 1;
              timeBlockChoice.classList = "timeBlockChoice " + newNum;
              timeBlockChoice.getElementsByClassName(num)[0].style.display =
                "none";
              timeBlockChoice.getElementsByClassName(newNum)[0].style.display =
                "flex";
            }
          };
        }
        function inter_CLICK_addTimeBlock(el) {
          // ot to complete that func?
          // imagine understand
          // plan

          el.onclick = function () {
            const projectBar = setup_findElementUp(el, "projectBar");
            const color = projectBar.style.backgroundColor;
            const choice =
              projectBar.getElementsByClassName("timeBlockChoice")[0];
            const number = choice.classList[1];
            const chosenBlock = choice.getElementsByClassName(number)[0];
            let newHourBlock;
            let qMarkIsInCalendar;
            cloneAndSetup();
            style();
            createQmarkIsInCalendar();
            append();

            function cloneAndSetup() {
              let clone = chosenBlock.cloneNode(true);
              newHourBlock = clone;
              newHourBlock.className = "hourBlock " + number + "-hours";
              dragAndDrop.setDraggable(newHourBlock);
            }
            function style() {
              const storeHourBlocks =
                projectBar.getElementsByClassName("storeTimeBlocks")[0];
              const blocksNum =
                storeHourBlocks.getElementsByClassName("hourBlock").length;
              const bgColor = projectBar.style.backgroundColor;
              newHourBlock.style.position = "absolute";
              newHourBlock.style.left = blocksNum * 1.5 + "rem";
              newHourBlock.style.zIndex = blocksNum;
              newHourBlock.style.backgroundColor = bgColor;
              newHourBlock.style.borderRadius = "15%";
              newHourBlock.style.textAlign = "left";
              newHourBlock.style.paddingLeft = "0.15rem";
            }
            function createQmarkIsInCalendar() {
              let qMark;
              let crateMark;
              qMarkIsInCalendar = document.createElement("div");
              qMarkIsInCalendar.className = "qMarkIsInCalendar";
              qMarkIsInCalendar.style.position = "absolute";
              qMarkIsInCalendar.style.top = "-0.15rem";
              qMarkIsInCalendar.style.left = "0.15rem";

              createQMark();
              createCrateMark();
              append();
              function createQMark() {
                qMark = document.createElement("div");
                qMark.className = "qMark";
                qMark.innerText = "?";
                styleQmark();
                function styleQmark() {
                  qMark.style.position = "absolute";
                  qMark.style.left = "1rem";
                  qMark.style.top = "-1.15rem";
                  qMark.style.fontSize = "1rem";
                  qMark.style.color = color;
                }
              }
              function createCrateMark() {
                crateMark = document.createElement("div");
                crateMark.className = "crateMark";
                crateMark.style.height = "1rem";
                crateMark.style.width = "1rem";
                crateMark.style.border = "1px solid " + color;
                crateMark.style.position = "absolute";
                crateMark.style.left = "0";

                crateLines();
                function crateLines() {
                  const data = 3;
                  for (let i = 0; i < data; i++) {
                    vertical(i);
                  }
                  for (let i = 0; i < data; i++) {
                    horizontal(i);
                  }
                  function vertical(i) {
                    const line = document.createElement("div");
                    line.style.position = "absolute";
                    line.style.left = ((2.5 + i * 2.5) / 10) * 100 + "%";
                    console.log(parseInt(crateMark.style.height));
                    line.style.backgroundColor = color;
                    line.style.height = "100%";
                    line.style.width = "1px";
                    crateMark.appendChild(line);
                  }
                  function horizontal(i) {
                    const line = document.createElement("div");
                    line.style.position = "absolute";
                    line.style.top = ((2 + i * 2.5) / 10) * 100 + "%";
                    line.style.backgroundColor = color;
                    line.style.height = "1px";
                    line.style.width = "100%";
                    crateMark.appendChild(line);
                  }
                }
                styleCrateMark();
                function styleCrateMark() {
                  crateMark.style.height = "1rem";
                  crateMark.style.width = "1rem";
                  crateMark.style.position = "absolute";
                  crateMark.style.top = "-1rem";
                  crateMark.style.left = "0";
                }
              }
              function append() {
                qMarkIsInCalendar.appendChild(crateMark);
                qMarkIsInCalendar.appendChild(qMark);
              }
              // data - 0 = q mark visible
              // data - 1 = q mark not visible
              // content - q mark
              // style - q mark
              // interactivity - q mark
            }
            function updateClassList() {
              // projectBar.classList
            }
            function append() {
              const storeTimeBlocks =
                projectBar.getElementsByClassName("storeTimeBlocks")[0];
              newHourBlock.appendChild(qMarkIsInCalendar);
              storeTimeBlocks.appendChild(newHourBlock);
            }
          };
        }
      }
    };
    function create_menuProjects() {
      getEl_loopF("headerProjects", content_menuProjects);
      getEl_loopF("addProjectBar", content_addProjectBar);
      function content_menuProjects(el) {
        el.innerText = "PROJECTS";
        el.style.userSelect = "none";
      }
      function content_addProjectBar(el) {
        el.innerText = "+";
        el.style.userSelect = "none";
      }
      style();
      function style() {
        getEl_loopF("menuProjects", style_menuProjects);
        getEl_loopF("headerProjects", style_headerProjects);
        getEl_loopF("addProjectBar", style_addProjectBar);
        // getEl_loopF('addProjectBarLabel', style_addProjectBarLabel);
        function style_menuProjects(el) {
          el.style.flex = "1";
          el.style.height = commonHeight / 4.25 + "rem";
          el.style.maxHeight = commonHeight / 4.25 + "rem";
          el.style.backgroundColor = menuBgColor;
          el.style.display = "flex";
          el.style.justifyContent = "flex-start";
          el.style.alignItems = "center";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_headerProjects(el) {
          el.style.innerText = "PROJECTS";
          el.style.color = "#ffffff";
          el.style.width = commonHeight;
          el.style.color = "rgb(255, 255, 255)";
          el.style.fontWeight = "bold";
          el.style.marginLeft = "1.5rem";
          el.style.display = "flex";
          el.style.flexDirection = "column";
          el.style.justifyContent = "center";
          el.style.fontSize = "0.75rem";
          el.style.letterSpacing = "1.75rem";
          el.style.marginLeft = commonWidth * 2 + "rem";
        }
        function style_addProjectBar(el) {
          el.style.textAlign = "center";
          el.style.cursor = "pointer";
          el.style.position = "relative";
          el.style.userSelect = "none";
          el.style.color = "#ffffff";
          el.style.marginLeft = menuTitleMargin + "rem";
          el.style.fontSize = "1.25rem";
          el.style.fontWeight = "bold";
          el.style.width = menuTitleMargin + "rem";
          el.style.userSelect = "none";
          el.style.border = "1px solid #ffffff";
          el.style.borderRadius = "50%";
        }
      }
      interactivity();
      function interactivity() {
        getEl_loopF("addProjectBar", inter_addProjectBar);
        function inter_addProjectBar(el) {
          el.onclick = function () {
            const projectBars =
              document.getElementsByClassName("projectBars")[0];
            assembleDOM(projectBar, projectBars);
            create_projects.create_projectBar();
            create_projects.colorAddedProjectBar();
            create_projects.create_projectBarsSymbolLine();
            create_projects.handleSymbolLinesScroll();
          };
        }
      }
    }
    function create_titleBarForProjects() {
      getEl_loopF("titleScrollProjects", content_titleScrollProjects);
      getEl_loopF("titleProjectColor", content_titleProjectColor);
      getEl_loopF("titleProjectName", content_titleProjectName);
      getEl_loopF("titleChooseTimeBlockSize", content_titleChooseTimeBlockSize);
      getEl_loopF("titleAddTimeBlock", content_titleAddTimeBlock);
      getEl_loopF("titleTimeBlocks", content_titleTimeBlocks);
      function content_titleScrollProjects(el) {
        el.innerText = "Scroll projects";
        el.style.userSelect = "none";
      }
      function content_titleProjectColor(el) {
        el.innerText = "Choose color";
        el.style.userSelect = "none";
      }
      function content_titleProjectName(el) {
        el.innerText = "Project title";
        el.style.userSelect = "none";
      }
      function content_titleChooseTimeBlockSize(el) {
        el.innerText = "Choose time block size";
        el.style.userSelect = "none";
      }
      function content_titleAddTimeBlock(el) {
        el.innerText = "Add";
        el.style.userSelect = "none";
      }
      function content_titleTimeBlocks(el) {
        el.innerText = "Time blocks";
        el.style.userSelect = "none";
        el.style.userSelect = "none";
      }

      style();
      function style() {
        const fontSize = 0.6;
        getEl_loopF("titleBarForProjects", style_titleBarForProjects);
        getEl_loopF("titleScrollProjects", style_titleScrollProjects);
        getEl_loopF("titleProjectColor", style_titleProjectColor);
        getEl_loopF("titleProjectName", style_titleProjectName);
        getEl_loopF("titleChooseTimeBlockSize", style_titleChooseTimeBlockSize);
        getEl_loopF("titleAddTimeBlock", style_titleAddTimeBlock);
        getEl_loopF("titleTimeBlocks", style_titleTimeBlocks);
        function style_titleBarForProjects(el) {
          el.style.flex = "1";
          el.style.borderTop = "1px solid #ffffff";
          // el.style.borderBottom = '1px solid #ffffff';
          // el.style.borderRight = '3rem solid transparent';
          // el.style.borderLeft = '3rem solid transparent';
          el.style.display = "flex";
          // el.style.height = commonHeight / 2 + 'rem';
          // el.style.maxHeight = commonHeight / 2 + 'rem'
          el.style.backgroundColor = menuBgColor;
          el.style.color = "#ffffff";
          el.style.paddingTop = "0.2rem";
          el.style.paddingBottom = "0.2rem";
        }
        function style_titleScrollProjects(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "flex-start";
          el.style.alignItems = "center";
          el.style.textAlign = "left";
          el.style.paddingLeft = "0.3rem";
          el.style.maxWidth = commonWidth + "rem";
          el.style.width = commonWidth + "rem ";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_titleProjectColor(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.textAlign = "center";
          el.style.maxWidth = commonWidth + 2.8 + "rem";
          el.style.width = commonWidth + 2.8 + "rem ";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_titleProjectName(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.display = "flex";
          el.style.textAlign = "center";
          el.style.maxWidth = commonWidth * 4 + "rem";
          el.style.width = commonWidth * 4 + "rem ";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_titleChooseTimeBlockSize(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.display = "flex";
          el.style.textAlign = "center";
          el.style.maxWidth = commonWidth * 2.8 + "rem";
          el.style.width = commonWidth * 2.8 + "rem ";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_titleAddTimeBlock(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.display = "flex";
          el.style.textAlign = "center";
          el.style.maxWidth = commonWidth + 3.075 + "rem";
          el.style.width = commonWidth + 3.075 + "rem ";
          el.style.borderRight = "1px solid #ffffff";
        }
        function style_titleTimeBlocks(el) {
          el.style.fontSize = fontSize + "rem";
          el.style.display = "flex";
          el.style.justifyContent = "center";
          el.style.alignItems = "center";
          el.style.display = "flex";
          el.style.textAlign = "center";
          el.style.borderRight = "1px solid #ffffff";
          // el.style.maxWidth = commonWidth * 4 + 'rem';
          // el.style.width = commonWidth * 4 + 'rem ';
          el.style.flex = "1";
        }
      }
    }
    function create_projectBarsScroll() {
      style();
      interactivity();
      function style() {
        getEl_loopF("projectBarsScroll", style_projectBarsScroll);
        getEl_loopF("projectBarsScrollMenu", style_projectBarsScrollMenu);
        getEl_loopF("prevProjectBar", style_prevProjectBar);
        getEl_loopF("projectBarsSymbolLines", style_projectBarsSymbolLines);
        getEl_loopF("nextProjectBar", style_nextProjectBar);
        function style_projectBarsScroll(el) {
          el.style.width = commonWidth + "rem";
          el.style.backgroundColor = "#000000";
          el.style.display = "flex";
          el.style.flexDirection = "column";
          el.style.justifyContent = "flex-start";
          el.style.alignItems = "center";
          // el.style.paddingTop = commonHeight / 3 + 'rem';
          // el.style.paddingBottom = commonHeight / 3 + 'rem';
          el.style.position = "relative";
        }
        function style_projectBarsScrollMenu(el) {
          el.style.position = "relative";
          el.style.width = "100%";
          el.style.paddingLeft = "0.5rem";
          el.style.paddingRight = "0.5rem";
        }
        function style_prevProjectBar(el) {
          style_prevArr(el);
          el.style.transform = "rotate(180deg)";
          el.style.position = "initial";
          el.style.marginBottom = commonHeight / 3 + "rem";
          el.style.marginTop = commonHeight / 9 + "rem";
        }
        function style_projectBarsSymbolLines(el) {
          // el.style.padding = '1rem';
          el.style.height = commonHeight + "rem";
          el.style.display = "flex";
          el.style.flexDirection = "column";
          el.style.justifyContent = "space-between";
          el.style.alignItems = "center";
        }
        function style_nextProjectBar(el) {
          style_nextArr(el);
          el.style.transform = "rotate(0deg)";
          el.style.right = "auto";
          el.style.marginLeft = "auto";
          // el.style.top = commonHeight + 'rem'
          el.style.position = "initial";
          el.style.marginTop = commonHeight / 3 + "rem";
        }
      }
      function interactivity() {
        getLastEl_runF("projectBarsArea", setup_projectBarsArea);
        getLastEl_runF("projectBars", setup_projectBars);
        getLastEl_runF("prevProjectBar", inter_CLICK_prevProjectBar);
        getLastEl_runF("nextProjectBar", inter_CLICK_nextProjectBar);

        function setup_projectBarsArea(el) {
          el.style.overflow = "hidden";
        }
        function setup_projectBars(el) {
          el.style.flexWrap = "no-wrap";
          el.style.overflow = "hidden";
          el.style.maxHeight = "40vh";
        }
        function inter_CLICK_prevProjectBar(el) {
          el.onclick = function () {
            const pixels = commonHeight * 16;
            const area = setup_findElementUp(el, "projectBarsArea");
            const bars = area.getElementsByClassName("projectBars")[0];
            bars.scrollBy(0, -pixels);
          };
        }
        function inter_CLICK_nextProjectBar(el) {
          el.onclick = function () {
            const pixels = commonHeight * 16;
            const area = setup_findElementUp(el, "projectBarsArea");
            const bars = area.getElementsByClassName("projectBars")[0];
            bars.scrollBy(0, pixels);
          };
        }
      }
    }
    style();
    function style() {
      getEl_loopF("projects", style_projects);
      getEl_loopF("projectBarsArea", style_projectBarsArea);
      getEl_loopF("projectBars", style_projectBars);
      function style_projects(el) {
        el.style.flex = "1";
        el.style.display = "flex";
        el.style.flexDirection = "column";
      }
      function style_projectBarsArea(el) {
        el.style.display = "flex";
        el.style.flex = "1";
      }
      function style_projectBars(el) {
        el.style.flex = "5";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.maxHeight = "45vh";
      }
    }
  }

  function create_calendar() {
    create_menuCalendar();
    create_calendarDOM();
    function create_menuCalendar() {
      // C A L E N D A R  B A R - C O N T E N T
      getEl_loopF("headerCalendar", content_headerCalendar);
      getEl_loopF("monthChoices", content_monthChoices);
      getEl_loopF("chooseMonth", content_monthChoice);

      function content_headerCalendar(el) {
        const title = document.createElement("span");
        title.innerText = "CALENDAR";
        title.style.userSelect = "none";
        title.style.userSelect = "none";
        el.appendChild(title);
      }
      function content_monthChoices(el) {}
      function content_monthChoice(el) {
        const title = document.createElement("div");
        // global
        const index = months.indexOf(monthShown);
        title.innerText = months[index];
        title.style.userSelect = "none";
        title.style.userSelect = "none";
        el.appendChild(title);
      }

      // C A L E N D A R  B A R -  S T Y L E
      const menuTitleSize = 1.5;
      const menuTitleMargin = 3;
      style();
      function style() {
        getEl_loopF("menuCalendar", style_menuCalendar);
        getEl_loopF("headerCalendar", style_headerCalendar);
        getEl_loopF("monthChoices", style_monthChoices);
        getEl_loopF("chooseMonth", style_monthChoice);
        getEl_loopF("prevMonth", style_prevMonth);
        getEl_loopF("nextMonth", style_nextMonth);

        function style_menuCalendar(el) {
          el.style.flex = "1";
          el.style.maxHeight = commonHeight / 4.25 + "rem";
          el.style.height = commonHeight / 4.25 + "rem";
          el.style.backgroundColor = "#000000";
          el.style.display = "flex";
        }
        function style_headerCalendar(el) {
          el.style.color = "#ffffff";
          el.style.fontWeight = "bold";
          el.style.marginLeft = "1.5rem";
          el.style.display = "flex";
          el.style.flexDirection = "column";
          el.style.justifyContent = "center";
          el.style.fontSize = "0.75rem";
          el.style.letterSpacing = "1.75rem";
          el.style.marginLeft = commonWidth * 2 + "rem";
        }
        function style_monthChoices(el) {
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.marginLeft = 5 + "rem";
          el.style.color = "#ffffff";
          // position
          el.style.position = "relative";
        }
        function style_monthChoice(el) {
          // global
          el.style.fontSize = "1.25rem";
          el.style.letterSpacing = "1px";
        }
        function style_prevMonth(el) {
          style_prevArr(el);
          el.style.borderTop = commonHeight / 4 + "rem solid #ffffff";
          el.style.borderLeft = commonHeight / 12 + "rem solid transparent";
          el.style.borderRight = commonHeight / 12 + "rem solid transparent";
          el.style.borderBottom = "0";
        }
        function style_nextMonth(el) {
          style_nextArr(el);
          el.style.borderTop = commonHeight / 4 + "rem solid #ffffff";
          el.style.borderLeft = commonHeight / 12 + "rem solid transparent";
          el.style.borderRight = commonHeight / 12 + "rem solid transparent";
          el.style.borderBottom = "0";
        }
      }

      // C A L E N D A R  B A R - I N T E R A C T I V E S
      interactives();
      function interactives() {
        inter_monthShown();
        getEl_loopF("prevMonth", inter_prevMonth);
        getEl_loopF("nextMonth", inter_nextMonth);
        getEl_loopF("chooseMonth", inter_shiftMonthChoice);

        function inter_monthShown() {
          const date = new Date();
          const monthName = date.toLocaleString("en-EN", { month: "long" });
          const firstLetter = monthName.split("")[0].toUpperCase();
          const remainingLetters = monthName.substring(
            1,
            monthName.split("").length
          );
          monthShown = firstLetter + remainingLetters;
        }
        function inter_prevMonth(el) {
          el.onclick = function () {
            hideCurrentMonth();
            const index = months.indexOf(monthShown);
            if (index > 0) {
              const prevIndex = index - 1;
              monthShown = months[prevIndex];
              getEl_loopF("chooseMonth", inter_shiftMonthChoice);
            }
            showNextMonth();
          };
        }
        function inter_nextMonth(el) {
          el.onclick = function () {
            hideCurrentMonth();
            const index = months.indexOf(monthShown);
            if (index < months.length - 1) {
              const prevIndex = index + 1;
              monthShown = months[prevIndex];
              getEl_loopF("chooseMonth", inter_shiftMonthChoice);
            }
            showNextMonth();
          };
        }
        function inter_shiftMonthChoice(el) {
          el.innerText = monthShown;
          el.style.userSelect = "none";
        }
        function hideCurrentMonth() {
          const currentMonth = document.getElementsByClassName(monthShown)[0];
          currentMonth.style.display = "none";
        }
        function showNextMonth() {
          const currentMonth = document.getElementsByClassName(monthShown)[0];
          currentMonth.style.display = "flex";
        }
      }
    }
    function create_calendarDOM() {
      getEl_loopF("calendarDataArea", content_months);
      getEl_loopF("calendarDataArea", content_weeks);
      getEl_loopF("calendarDataArea", content_days);
      getEl_loopF("day", content_hourMarks);

      function content_months(el) {
        for (let i = 0; i < months.length; i++) {
          const month = document.createElement("div");
          month.classList = "month " + months[i];
          el.appendChild(month);
        }
      }
      function content_weeks() {
        for (let i = 0; i < weeks.length; i++) {
          const week = document.createElement("div");
          week.classList = "week " + weeks[i].code;
          const monthName = weeks[i].code.split("-")[0];
          const monthDOM = document.getElementsByClassName(monthName)[0];

          function content_weekHeader(week) {
            const weekHeader = document.createElement("span");
            weekHeader.classList = "weekHeader";
            const name =
              weeks[i].code.split("-")[1] + " " + weeks[i].code.split("-")[2];
            const title = document.createElement("span");
            title.className = "weekTitle";
            title.innerText = name;
            title.style.userSelect = "none";
            weekHeader.appendChild(title);
            week.appendChild(weekHeader);
          }
          content_weekHeader(week);
          monthDOM.appendChild(week);
        }
      }
      function content_days() {
        for (let i = 0; i < days.length; i++) {
          const day = document.createElement("div");
          const weekName = days[i].code.split(" ")[0];
          const weekDOM = document.getElementsByClassName(weekName)[0];
          const title = document.createElement("span");
          const text = days[i].name;
          day.classList = "day " + days[i].code;
          title.innerText = text;
          title.style.userSelect = "none";
          day.appendChild(title);
          weekDOM.appendChild(day);
        }
      }
      function content_hourMarks(el) {
        const hourMarks = document.createElement("div");
        hourMarks.className = "hourMarks";
        hourMarks.style.flex = "1";
        el.appendChild(hourMarks);
        content_dropzone();
        content_marks();
        function content_dropzone() {
          const dropzone = document.createElement("div");
          dropzone.className = "hourMarksDropzone";
          content_dropzoneCols();
          function content_dropzoneCols() {
            for (let i = 1; i < 25; i++) {
              const col = document.createElement("div");
              col.classList = "hourMarksDropzoneCol " + i;
              dropzone.appendChild(col);
            }
          }
          hourMarks.appendChild(dropzone);
        }
        function content_marks() {
          const marks = document.createElement("div");
          marks.className = "hourMarksContainer";
          for (let i = 0; i < 25; i += 4) {
            const mark = document.createElement("div");
            mark.className = "hourMark";
            mark.innerText = i;
            mark.style.userSelect = "none";
            marks.appendChild(mark);
          }
          hourMarks.appendChild(marks);
        }
      }
    }

    const fontSize = 1;
    const monthDisplay = "flex";
    getEl_loopF("calendar", style_calendar);
    getEl_loopF("calendarDataArea", style_calendarDataArea);
    getEl_loopF("month", style_month);
    getEl_loopF("week", style_week);
    getEl_loopF("weekHeader", style_weekHeader);
    getEl_loopF("weekTitle", style_weekTitle);
    getEl_loopF("day", style_day);
    getEl_loopF("hourMarks", style_hourMarks);

    function style_calendar(el) {
      el.style.flex = "1";
      el.style.display = "flex";
      el.style.flexDirection = "column";
    }
    function style_calendarDataArea(el) {
      el.style.flex = "1";
      el.style.display = "flex";
      el.style.height = "100%";
    }
    function style_month(el) {
      el.style.flex = "1";
      el.style.border = "1px solid #000000";
      el.style.display = monthDisplay;
      el.style.flexDirection = "column";
    }
    function style_week(el) {
      el.style.flex = "1";
      el.style.display = "flex";
    }
    function style_weekHeader(el) {
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.alignItems = "flex-end";
      el.style.justifyContent = "flex-start";
      el.style.paddingRight = "0.5rem";
      el.style.backgroundColor = "#000000";
      el.style.color = "#ffffff";
      el.style.width = commonWidth + "rem";
      el.style.textAlign = "center";
    }
    function style_weekTitle(el) {
      el.style.fontSize = "0.75rem";
      // el.style.padding = '0 ' + (fontSize / 5) + 'rem';
      // el.style.paddingTop = (fontSize / 8) + 'rem';
    }
    function style_day(el) {
      el.style.fontSize = fontSize - 0.25 + "rem";
      el.style.flex = "1";
      el.style.border = "1px solid #000000";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.justifyContent = "space-between";
      style_dayTitle(el);
      function style_dayTitle(el) {
        el.children[0].style.padding = "0 " + fontSize / 5 + "rem";
        el.children[0].style.paddingTop = fontSize / 15 + "rem";
      }
    }
    function style_hourMarks(el) {
      el.style.flex = "1";
      el.style.fontSize = fontSize - 0.33 + "rem";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.alignItems = "flex-end";
      el.style.justifyContent = "flex-end";
      el.style.borderLeft = "1px solid #ffffff";
      style_dropzone();
      style_container();

      function style_dropzone() {
        const dropzone = el.getElementsByClassName("hourMarksDropzone")[0];
        dropzone.style.height = "100%";
        dropzone.style.width = "100%";
        dropzone.style.display = "flex";
        style_cols();
        function style_cols() {
          const cols = dropzone.getElementsByClassName("hourMarksDropzoneCol");
          for (let i = 0; i < cols.length; i++) {
            const col = cols[i];
            col.style.flex = "1";
            col.style.borderLeft = "1px solid rgb(220,220,220, 0.3)";
          }
        }
      }
      function style_container() {
        const container = el.getElementsByClassName("hourMarksContainer")[0];
        container.style.display = "flex";
        container.style.width = "100%";
        style_mark();
        function style_mark() {
          const marks = container.getElementsByClassName("hourMark");
          for (let i = 0; i < marks.length; i++) {
            const mark = marks[i];
            mark.style.flex = "1";
            mark.style.color = "#ffffff";
            mark.style.backgroundColor = "#000000";
            mark.style.textAlign = "center";
          }
        }
      }
    }

    // C A L E N D A R - I N T E R A C T I V E S
    interactives();
    function interactives() {
      const monthNow = new Date();
      const num = monthNow.getMonth();
      getEl_loopF("month", setup_hideMonths);
      getOneEl_runF("month", num, inter_showMonth);
      function setup_hideMonths(el) {
        el.style.display = "none";
      }
      function inter_showMonth(el) {
        el.style.display = monthDisplay;
      }
    }
  }

  function create_sideBarMenu() {
    getLastEl_runF("dataPersistanceHeader", content_dataPersistanceHeader);
    getLastEl_runF("saveToTextBtn", content_saveToTextBtn);
    getLastEl_runF("dropToFillBtn", content_dropToFillBtn);
    // getLastEl_runF('dataPersistanceHeader', content_dataPersistanceHeader);
    // getLastEl_runF('dataPersistanceHeader', content_dataPersistanceHeader);

    function content_dataPersistanceHeader(el) {
      el.innerText = "SAVE & FILL";
    }
    function content_saveToTextBtn(el) {
      const chartIcon = resourceCreateChartIcon();
      el.appendChild(chartIcon);
      const label = document.createElement("div");
      label.className = "saveToTextLabel";
      label.innerText = "SAVE";
      el.appendChild(label);
    }
    function content_dropToFillBtn(el) {
      const fillIcon = resourceCreateFillIcon();
      el.appendChild(fillIcon);
      const label = document.createElement("div");
      label.className = "dropToFillLabel";
      label.innerText = "FILL";
      el.appendChild(label);
    }

    style();
    function style() {
      getLastEl_runF("sideBarMenu", style_sideBarMenu);
      getLastEl_runF("dataPersistance", style_dataPersistance);
      getLastEl_runF("dataPersistanceHeader", style_dataPersistanceHeader);
      getLastEl_runF("sideBarMenu", style_sideBarMenu);
      getLastEl_runF("sideBarMenu", style_sideBarMenu);
      getLastEl_runF("saveToTextBtn", style_saveToTextBtn);
      getLastEl_runF("dropToFillBtn", style_dropToFillBtn);

      function style_sideBarMenu(el) {
        el.style.width = "15vw";
        el.style.minWidth = "12rem";
        el.style.height = "100vh";
        el.style.backgroundColor = "#000000";
      }
      function style_dataPersistance(el) {
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
      }
      function style_dataPersistanceHeader(el) {
        el.style.height = commonHeight / 4.25 + "rem";
        el.style.maxHeight = commonHeight / 4.25 + "rem";
        el.style.color = "#ffffff";
        el.style.textAlign = "center";
        el.style.display = "flex";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
        el.style.letterSpacing = "3px";
        // el.style.borderBottom = '1px solid #ffffff';
        el.style.fontWeight = "bold";
        el.style.display = "flex";
        el.style.fontSize = "0.75rem";
        el.style.letterSpacing = "0.5rem";
      }
      function style_saveToTextBtn(el) {
        el.style.marginTop = "2.25rem";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.flex = "1";
        el.style.height = "10vh";
        el.style.width = "7.5vw";
        el.style.borderBottom = "1px solid #ffffff";
        el.style.borderTop = "1px solid #ffffff";
        el.style.textAlign = "center";
        el.style.color = "#ffffff";
        styleSvg();
        styleLabel();
        function styleSvg() {
          const svg = el.getElementsByTagName("svg")[0];
          svg.style.background = "#ffffff";
          svg.setAttribute("viewBox", "-25 -30 150 150");
          svg.setAttribute("enableBackground", "");
        }
        function styleLabel() {
          const label = el.getElementsByClassName("saveToTextLabel")[0];
          label.style.letterSpacing = "0.25rem";
          label.style.paddingTop = "0.2rem";
          label.style.paddingBottom = "0.2rem";
        }
      }
      function style_dropToFillBtn(el) {
        el.style.marginTop = "2.25rem";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.flex = "1";
        el.style.height = "10vh";
        el.style.width = "7.5vw";
        el.style.borderBottom = "1px solid #ffffff";
        el.style.borderTop = "1px solid #ffffff";
        el.style.textAlign = "center";
        el.style.color = "#ffffff";
        styleSvg();
        styleLabel();
        function styleSvg() {
          const svg = el.getElementsByTagName("svg")[0];
          svg.style.background = "#ffffff";
          svg.setAttribute("viewBox", "-52.5 -45 150 150");
          svg.setAttribute("enableBackground", "");
        }
        function styleLabel() {
          const label = el.getElementsByClassName("dropToFillLabel")[0];
          label.style.letterSpacing = "0.25rem";
          label.style.paddingTop = "0.2rem";
          label.style.paddingBottom = "0.2rem";
        }
      }
    }

    interactivity();
    function interactivity() {
      getLastEl_runF("saveToTextBtn", inter_saveToTextBtn);
      getLastEl_runF("dropToFillBtn", inter_dropToFillBtn);
      function inter_saveToTextBtn(el) {
        el.onclick = function (e) {
          let data = "";

          saveDataToTextFile();
          addBarClassesData();
          function saveDataToTextFile() {}
          function addBarClassesData() {
            localStorage.clear();
            //!!!
            const bars = document.getElementsByClassName("projectBar");
            for (let i = 0; i < bars.length; i++) {
              const bar = bars[i];
              const classes = [...bar.classList];
              // const colorIndex = classes.indexOf('color') + 1;
              data += "(" + "i," + i + "," + classes + ",)" + "][";
              localStorage.setItem("projectBars", data);
            }
          }
        };
      }

      function inter_dropToFillBtn(el) {
        el.onclick = function (e) {
          saveDataToTextFile();
          function saveDataToTextFile() {
            const projectsData = getProjectData();
            for (let i = 0; i < projectsData.length; i++) {
              const instance = projectsData[i];
              fromData_createProjectBar(instance);
            }
          }
          function getProjectData() {
            const data = localStorage.getItem("projectBars");
            const projectsData = data.split("][");
            projectsData.pop();
            return projectsData;
          }
          function fromData_createProjectBar(instance) {
            const projectBars =
              document.getElementsByClassName("projectBars")[0];
            const color = getProjectColor(instance);
            assembleDOM(projectBar, projectBars);
            create_projects.create_projectBar();
            create_projects.create_projectBarsSymbolLine();
            create_projects.handleSymbolLinesScroll();
          }
          function getProjectColor(instance) {
            const projectClasses = instance.split(",");
            const colorIndex = projectClasses.indexOf("color") + 1;
            const color = projectClasses[colorIndex];
            return color;
          }
        };
      }
    }
  }

  function dragAndDrop() {
    (function () {
      dragAndDrop.setDraggable = function (el) {
        el.setAttribute("draggable", true);
        el.addEventListener("dragstart", function (e) {
          setUniqueClass();

          function setUniqueClass() {
            const projectBar = setup_findElementUp(e.target, "projectBar");
            const timeBlock = getTimeBlock();
            const barNum = getProjectBarNum();
            const blockClass = getTimeBlockClass();
            let className = el.className;
            className =
              "projectBar-" +
              barNum +
              " " +
              "sameSizeNthNum-" +
              blockClass +
              " " +
              timeBlock.className;
            el.className = className;

            function getTimeBlock() {
              const timeBlock = hasClass(e.target, "hourBlock")
                ? e.target
                : setup_findElementUp(e.target, "hourBlock");
              return timeBlock;
            }
            function getProjectBarNum() {
              return [...document.getElementsByClassName("projectBar")].indexOf(
                projectBar
              );
            }
            function getTimeBlockClass() {
              const hourBlocksOfSameSize = projectBar.getElementsByClassName(
                timeBlock.className
              );
              return [...hourBlocksOfSameSize].indexOf(timeBlock);
            }
          }
          e.dataTransfer.dropEffect = "copy";
          e.dataTransfer.setData("text/html", el.className);
        });
      };
      dragAndDrop.turnToDropzone = function (el) {
        el.setAttribute("dragenter", "event.preventDefault();");
        el.setAttribute("ondragover", "event.preventDefault();");
        el.style.position = "relative";
        el.ondragstart = dragstart_handler;
        el.ondrop = handleDrop;
      };
      getEl_loopF("hourBlock", dragAndDrop.setDraggable);
      getEl_loopF("hourMarksDropzoneCol", dragAndDrop.turnToDropzone);
    })();
    function dragstart_handler(ev) {
      const draggedFrom = ev.path[1];
    }
    function handleDrop(ev) {
      ev.preventDefault();
      // add time block = add question mark /w calendar symbol

      // drop to calendar = question mark becomes display none
      // delete time block from calendar = question mark becomes display block again

      // project menu contains buttons
      // - add new - delete project - delete time blocks - revert
      // delete changes cursor to delete project or delete time block symbol
      //

      const dropTarget = ev.target;
      const data = ev.dataTransfer.getData("text/html");
      const block = document.getElementsByClassName(data)[0];
      const isFromCalendar = data.split(" ").indexOf("is-in-calendar") > -1;

      if (ev.target.classList[0] !== "hourMarksDropzoneCol") {
        return;
      }
      if (isFromCalendar) {
        ev.dataTransfer.dropEffect = "move";
        fromCalendar();
        function fromCalendar() {
          styleBlock();
          function styleBlock() {
            const colWidth = dropTarget.getBoundingClientRect().width;
            const blockSizeData = block.classList[block.classList.length - 2];
            console.log(blockSizeData);
            const blockSize = Number(blockSizeData.split("-")[0]);
            console.log(blockSize, "blockSize");
            console.log(colWidth);

            const blockWidth = blockSize * colWidth + "px";
            console.log(blockWidth, "blockWidth");
            console.log(blockWidth);
            const dropColNum = Number(dropTarget.classList[1]);
            console.log(dropColNum);
            const spaceToTheRight = 25 - dropColNum;
            const offset = spaceToTheRight - blockSize;
            console.log(offset);
            if (offset <= 0) {
              block.style.marginLeft = offset * colWidth + "px";
            } else {
              block.style.marginLeft = 0;
            }
            block.style.height = "100%";
            block.style.borderRadius = "3%";
            block.style.width = blockWidth;
            block.style.paddingLeft = "1px";
            block.style.paddingRight = "1px";
            block.style.zIndex = 2;
            block.style.left = "0";
          }
          dropTarget.appendChild(block);
        }
      }
      if (!isFromCalendar) {
        fromProject();
        function fromProject() {
          let clone;
          cloneDragged();
          styleClone();
          hideQMark();
          appendClone();
          turnOffDropzone();
          turnCloneDraggable();
          updateBlockUndraggable();

          function cloneDragged() {
            clone = block.cloneNode(true);
          }
          function styleClone() {
            const colWidth = dropTarget.getBoundingClientRect().width;
            const cloneSizeData = clone.classList[clone.classList.length - 1];
            const cloneSize = Number(cloneSizeData.split("-")[0]);
            const cloneWidth = cloneSize * colWidth + "px";
            console.log(cloneSize, "cloneSize");
            console.log(cloneWidth);
            const dropColNum = Number(dropTarget.classList[1]);
            const spaceToTheRight = 25 - dropColNum;
            const offset = spaceToTheRight - cloneSize;

            if (offset <= 0) {
              clone.style.marginLeft = offset * colWidth + "px";
            }
            clone.style.height = "100%";
            clone.style.borderRadius = "3%";
            clone.style.width = cloneWidth;
            clone.style.paddingLeft = "1px";
            clone.style.paddingRight = "1px";
            clone.style.zIndex = 2;
            clone.style.left = "0";
          }
          function hideQMark() {
            const qMark = block.getElementsByClassName("qMark")[0];
            const cloneQMark = clone.getElementsByClassName("qMark")[0];
            qMark.style.display = "none";
            cloneQMark.style.display = "none";
          }
          function appendClone() {
            ev.dataTransfer.dropEffect = "copy";
            updateCloneClassName();
            function updateCloneClassName() {
              let cloneClassName = clone.className;
              cloneClassName += " " + "is-in-calendar";
              clone.className = cloneClassName;
            }
            dropTarget.appendChild(clone);
          }
          function turnOffDropzone() {
            dropTarget.ondrop = false;
          }
          function turnCloneDraggable() {
            clone.setAttribute("draggable", true);
            clone.addEventListener("dragstart", function (e) {
              e.dataTransfer.dropEffect = "copy";
              e.dataTransfer.setData("text/html", clone.className);
            });
          }
          function updateBlockUndraggable() {
            block.setAttribute("draggable", false);
            block.draggable = false;
            block.ondragstart = () => {
              return false;
            };
          }
        }
      }
    }
  }

  // const root = document.getElementsByClassName('root')[0]
  // root.style.minHeight = '100vh';
  // root.style.userSelect = 'none';
  // root.markingHoursEvent = false;
  // root.style.position = 'relative';
  // root.addEventListener('mousedown', function (e) {
  //   root.markingHoursEvent = true;
  //   // console.log('create div');
  //   let markerEl = document.createElement('div');
  //   markerEl.id = 'markerEl';
  //   markerEl.onclick = function (e) {
  //     // console.log(e)
  //   }

  //   markerEl.style.height = '1px';
  //   markerEl.style.width = '1px';
  //   markerEl.style.border = '1px solid #000000';
  //   let rndNum = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(0)) + Math.ceil(0));
  //   let projectColor = colors[rndNum];
  //   markerEl.style.background = projectColor;
  //   markerEl.projectColor = projectColor;
  //   markerEl.style.opacity = '70%';
  //   markerEl.style.position = 'absolute';
  //   let y = e.pageY.toString() + 'px';
  //   let x = e.pageX.toString() + 'px';
  //   markerEl.style.top = y;
  //   markerEl.style.left = x;
  //   markerEl.y = y;
  //   markerEl.x = x;
  //   root.appendChild(markerEl)
  // });
  // root.addEventListener('mousemove', function (e) {
  //   if (root.markingHoursEvent) {
  //     // console.log('re-draw div');
  //     let markerEl = document.getElementById('markerEl');
  //     let prevCursorY = parseInt((markerEl.y).split('px')[0]);
  //     let prevCursorX = parseInt((markerEl.x).split('px')[0]);
  //     let heightUpdateY = Math.abs(e.pageY - prevCursorY) + 'px';
  //     let heightUpdateX = Math.abs(e.pageX - prevCursorX) + 'px';
  //     markerEl.style.height = heightUpdateY;
  //     markerEl.style.width = heightUpdateX;
  //     if (e.pageY - parseInt((markerEl.y).split('px')[0]) < 0) {
  //       markerEl.style.top = e.pageY + 'px';
  //     }
  //     if (e.pageX - parseInt((markerEl.x).split('px')[0]) < 0) {
  //       markerEl.style.left = e.pageX + 'px';
  //     }
  //     // console.log('check if an hourtick is inside coordinates (math, < than)');
  //     // console.log('pre-mark hour ticks inside');
  //     // console.log('erase mark or set mark, depending on confirmation');
  //   }
  //   // Dispatch the event.
  // });
  // root.addEventListener('mouseup', function (e) {
  //   root.markingHoursEvent = false;
  //   let markerEl = document.getElementById('markerEl');
  //   let hourEls = document.getElementsByClassName('hourEl');
  //   if (hourEls && hourEls.length) {
  //     const event = new Event('requestCoords', {
  //       bubbles: false,
  //     });
  //     event.markerEl = markerEl;
  //     for (let i = 0; i < hourEls.length; i++) {
  //       hourEls[i].dispatchEvent(event);
  //     }
  //   }
  //   // Event listeners - ctrl f 'requestCoords'
  //   console.log('mouse drag select');
  //   markerEl.remove();
  // });
}
window.addEventListener("load", function () {
  app();
});

function createMenu() {
  // let width = '30rem';
  // let width = rightcommonWidth;
  let height = "100vh";
  let color = "#000000";
  const menu = document.createElement("div");
  menu.style.background = color;
  menu.style.height = height;
  // menu.style.width = width;
  menu.id = "menuEl";
  let rowsNum = 4;
  for (let i = 0; i < rowsNum; i++) {
    let r_width = "100%";
    let r_height = "9rem";
    let row = document.createElement("div");
    row.className = "row";
    row.style.width = r_width;
    console.log(r_width);
    row.style.height = r_height;
    //// uncomment for cells
    // for (let j = 0; j < 2; j++) {
    // let slot_width = parseInt(width) / 2 + 'rem';
    // let slot_width = parseInt(width) + 'rem';
    let s_height = r_height;
    let s_borderColor = "#ffffff";
    let slot = document.createElement("div");
    slot.style.display = "inline-block";
    slot.style.height = s_height;
    slot.style.width = "100%";
    slot.style.border = "1px solid " + s_borderColor;
    slot.className = "slot";
    row.appendChild(slot);
    // }
    menu.appendChild(row);
  }
  return menu;
}
function createAboutPage() {
  const aboutBtnContainer = (function createAboutPageContainer() {
    const aboutBtnContainer = document.createElement("div");
    aboutBtnContainer.style.border = "none";
    aboutBtnContainer.style.borderLeft = "1px solid grey";
    aboutBtnContainer.style.borderRight = "1px solid grey";
    aboutBtnContainer.style.fontWeight = "bold";
    aboutBtnContainer.style.textAlign = "left";
    aboutBtnContainer.style.color = "#fff";
    // display
    aboutBtnContainer.style.position = "relative";
    aboutBtnContainer.style.width = "12rem";

    return aboutBtnContainer;
  })();
  const aboutBtn = document.createElement("input");
  aboutBtn.style.position = "absolute";
  aboutBtn.style.top = VALUES_MenuSharedCSS["space_TopTo1stElement"];
  aboutBtn.style.width = "75%";
  aboutBtn.style.left = "12.5%";
  aboutBtn.style.padding = "1rem 1rem";
  aboutBtn.style.fontWeight = "bold";
  aboutBtn.style.fontSize = "0.9rem";
  aboutBtn.style.border = "2px solid #fff";
  aboutBtn.style.background = "transparent";
  aboutBtn.style.color = "#fff";
  aboutBtn.setAttribute("type", "button");
  aboutBtn.setAttribute("value", "ABOUT PAGE");

  aboutBtn.onclick = function () {
    const aboutModal = document.getElementById("aboutModal");
    aboutModal.style.visibility = "visible";
  };
  const underLineGraphic = resourceCreateUnderLineGraphic();
  const arrowGraphic = resourceCreateArrowGraphic();
  arrowGraphic.style.height = "3.25rem";
  arrowGraphic.style.width = "6.5rem";
  arrowGraphic.style.position = "absolute";
  arrowGraphic.style.left = "calc(100% - 4.75rem)";
  arrowGraphic.style.bottom = "3rem";
  arrowGraphic.style.transform = "rotate(-30deg)";
  const aboutBtnText = document.createElement("div");
  aboutBtnText.innerText = "WHAT IS THIS THING?";
  aboutBtnText.style.color = "white";
  aboutBtnText.style.width = "100%";
  aboutBtnText.style.position = "absolute";
  aboutBtnText.style.bottom = "0.6rem";
  //text
  aboutBtnText.style.fontSize = "0.6rem";
  aboutBtnText.style.fontWeight = "lighter";
  aboutBtnText.style.letterSpacing = "0.1rem";
  aboutBtnText.style.textAlign = "center";
  const questionIcon = resourceCreateQuestionIcon();
  questionIcon.style.position = "absolute";
  questionIcon.style.bottom = "1.66rem";
  questionIcon.style.width = "1.75rem";
  questionIcon.style.left = "50%";
  questionIcon.style.marginLeft = "calc(-12.5% + 1rem)";
  questionIcon.style.fill = "#fff";
  aboutBtnContainer.appendChild(aboutBtn);
  aboutBtnContainer.appendChild(questionIcon);
  aboutBtnContainer.appendChild(aboutBtnText);
  aboutBtnContainer.appendChild(underLineGraphic);
  document.getElementById("menu").appendChild(aboutBtnContainer);
}
function createAboutModal() {
  const body = document.getElementsByTagName("body")[0];
  const aboutModal = document.createElement("div");
  aboutModal.style.visibility = "hidden";
  aboutModal.style.position = "fixed";
  aboutModal.style.left = "0";
  aboutModal.style.right = "0";
  aboutModal.style.top = "0";
  aboutModal.style.bottom = "0";
  aboutModal.style.background = "black";
  aboutModal.style.width = "100vw";
  aboutModal.style.height = "100vh";
  aboutModal.style.zIndex = "1000000000";
  // D I S P L A Y
  aboutModal.style.display = "flex";
  aboutModal.style.alignItems = "center";
  aboutModal.style.flexDirection = "column";
  aboutModal.style.justifyContent = "center";

  const textContainer = document.createElement("div");
  textContainer.innerText = "ABOUT PAGE";
  textContainer.style.padding = "3rem";
  textContainer.style.fontSize = "6rem";
  textContainer.style.color = "white";
  textContainer.style.position = "relative";
  function createCloseBtn() {
    const closeBtn = document.createElement("div");
    closeBtn.innerText = "CLOSE X";
    closeBtn.style.textAlign = "right";
    closeBtn.style.fontSize = "4.5rem";
    // closeBtn.style.fontWeight = 'bold';
    closeBtn.style.color = "white";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "3rem";
    closeBtn.style.right = "6rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.border = "3px solid white";
    closeBtn.style.padding = "1rem 2.5rem";
    closeBtn.onclick = function () {
      const body = document.getElementsByTagName("body")[0];
      const aboutModal = document.getElementById("aboutModal");
      aboutModal.style.visibility = "hidden";
    };
    textContainer.appendChild(closeBtn);
  }
  createCloseBtn();
  function createParagraph(container, message, marginTop, fontSize, bold) {
    const paragraph = document.createElement("div");
    paragraph.innerText = message;
    paragraph.style.padding = "1rem 0";
    paragraph.style.marginTop = marginTop || 0;
    paragraph.style.color = "white";
    paragraph.style.fontSize = fontSize || "1.5rem";
    paragraph.style.fontWeight = bold || "light";
    container.appendChild(paragraph);
  }
  createParagraph(
    textContainer,
    "- This is a TOOL to LOG HOURS OF DEEP WORK.",
    "1rem"
  );
  createParagraph(textContainer, "- NO DATABASE REQUIREMENT.");
  createParagraph(
    textContainer,
    "- All hour logs data is managed by via simple textfile."
  );
  createParagraph(
    textContainer,
    '- Literally just that. Windows notepad file. Word file. Any file ending with ".txt"'
  );
  // createParagraph(textContainer, '');
  createParagraph(
    textContainer,
    "30 SECONDS TUTORIAL:",
    "1.5rem",
    "2rem",
    "bold"
  );
  createParagraph(
    textContainer,
    "1. Add hours worked by CLICKING +/- BUTTONS in given day's column."
  );
  createParagraph(
    textContainer,
    '2. Click "SAVE TO TEXT FILE" button, in the top menu.'
  );
  createParagraph(
    textContainer,
    '3. Prompt will appear. Choose "Save file." Save it to desktop or wherever you can find it easily. \n (The file is a text file with hours data formatted into text format, and nothing more. It is automatically named "DEEP WORK HOURS LOG.txt", with time and date. You don\'t even need to ever open it.)'
  );
  createParagraph(
    textContainer,
    "4. Close the page. You'll see all the hours data disappeared."
  );
  createParagraph(
    textContainer,
    "5. Re-open the page. Click DROP TEXT FILE. Prompt will appear, allowing you to browse files. Find the text file. Click it. Press enter or click ok. ALL THE LOGGED HOURS DATA RE-APPEARS!"
  );
  createParagraph(
    textContainer,
    "This is a solution where saving and persisting the data is achieved with no database or outside server requirements. It's just using a text file to store and update the logs data. User saves the data into a text file via 1 button click. User updates the data by dropping the text file via 1 button click. This is why the app is simple and doesn't have to require any of the account creation, email, passwords, logging in, etc."
  );

  aboutModal.appendChild(textContainer);
  aboutModal.id = "aboutModal";
  body.appendChild(aboutModal);
  // console.log(aboutModal);
}
function createDisplayOptionsPage() {
  // components
  const btnContainer = (function createAboutPageContainer() {
    const btnContainer = document.createElement("div");
    // aesthethics
    btnContainer.style.border = "none";
    btnContainer.style.borderLeft = "1px solid grey";
    btnContainer.style.borderRight = "1px solid grey";
    btnContainer.style.fontWeight = "bold";
    btnContainer.style.textAlign = "left";
    btnContainer.style.color = "#fff";
    // display
    btnContainer.style.position = "relative";
    btnContainer.style.width = "12rem";

    return btnContainer;
  })();
  const btn = document.createElement("input");
  btn.style.position = "absolute";
  btn.style.top = VALUES_MenuSharedCSS["space_TopTo1stElement"];
  btn.style.width = "75%";
  btn.style.left = "12.5%";
  // btn.style.marginLeft = '-30%'
  btn.style.padding = "1rem 1rem";
  btn.style.fontWeight = "bold";
  btn.style.fontSize = "0.9rem";
  btn.style.border = "2px solid #fff";
  btn.style.background = "transparent";
  btn.style.color = "#fff";
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "MENU");

  btn.onclick = function () {
    function createModal() {
      const body = document.getElementsByTagName("body")[0];
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.left = "0";
      modal.style.right = "0";
      modal.style.top = "0";
      modal.style.bottom = "0";
      modal.style.background = "black";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.zIndex = "1000000000";
      // D I S P L A Y
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.flexDirection = "column";
      modal.style.justifyContent = "center";

      const textContainer = document.createElement("div");
      textContainer.innerText = "ABOUT PAGE";
      textContainer.style.padding = "3rem";
      textContainer.style.fontSize = "6rem";
      textContainer.style.color = "white";
      textContainer.style.position = "relative";
      function createCloseBtn() {
        const closeBtn = document.createElement("div");
        closeBtn.innerText = "CLOSE X";
        closeBtn.style.textAlign = "right";
        closeBtn.style.fontSize = "4.5rem";
        // closeBtn.style.fontWeight = 'bold';
        closeBtn.style.color = "white";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "3rem";
        closeBtn.style.right = "6rem";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.border = "3px solid white";
        closeBtn.style.padding = "1rem 2.5rem";
        closeBtn.onclick = function () {
          const body = document.getElementsByTagName("body")[0];
          const modal = document.getElementById("modal");
          body.removeChild(modal);
        };
        textContainer.appendChild(closeBtn);
      }
      createCloseBtn();
      function createParagraph(container, message, marginTop, fontSize, bold) {
        const paragraph = document.createElement("div");
        paragraph.innerText = message;
        paragraph.style.padding = "1rem 0";
        paragraph.style.marginTop = marginTop || 0;
        paragraph.style.color = "white";
        paragraph.style.fontSize = fontSize || "1.5rem";
        paragraph.style.fontWeight = bold || "light";
        container.appendChild(paragraph);
      }
      modal.appendChild(textContainer);
      modal.id = "modal";
      body.appendChild(modal);
      // console.log(modal);
    }
    createModal();
  };
  const underLineGraphic = resourceCreateUnderLineGraphic();
  const arrowGraphic = resourceCreateArrowGraphic();
  const btnText = document.createElement("div");
  btnText.innerText = "CUSTOMIZE THE VIEW";
  btnText.style.color = "white";
  btnText.style.width = "100%";
  btnText.style.position = "absolute";
  btnText.style.bottom = "0.6rem";
  //text
  btnText.style.fontSize = "0.6rem";
  btnText.style.fontWeight = "lighter";
  btnText.style.letterSpacing = "0.1rem";
  btnText.style.textAlign = "center";
  const questionIcon = resourceCreateQuestionIcon();
  questionIcon.style.position = "absolute";
  questionIcon.style.bottom = "1.66rem";
  questionIcon.style.width = "1.75rem";
  questionIcon.style.left = "50%";
  questionIcon.style.marginLeft = "calc(-12.5% + 1rem)";
  questionIcon.style.fill = "#fff";
  btnContainer.appendChild(btn);
  btnContainer.appendChild(questionIcon);
  btnContainer.appendChild(btnText);
  btnContainer.appendChild(underLineGraphic);
  // btnContainer.appendChild(arrowGraphic);
  document.getElementById("menu").appendChild(btnContainer);
}
function createSaveTextFileBtn() {
  // components
  const SaveTextFileBtnContainer = (function createSaveTextFileBtnContainer() {
    const SaveTextFileBtnContainer = document.createElement("div");
    // aesthethics
    SaveTextFileBtnContainer.style.border = "none";
    SaveTextFileBtnContainer.style.borderLeft = "1px solid grey";
    SaveTextFileBtnContainer.style.borderRight = "1px solid grey";
    SaveTextFileBtnContainer.style.fontWeight = "bold";
    SaveTextFileBtnContainer.style.textAlign = "left";
    SaveTextFileBtnContainer.style.color = "#fff";
    // display
    // SaveTextFileBtnContainer.style.position = 'relative';
    // SaveTextFileBtnContainer.style.width = VALUES_MenuSharedCSS['width_menuSmallerBlock'];

    return SaveTextFileBtnContainer;
  })();
  const SaveTextFileBtn = document.createElement("input");
  // SaveTextFileBtn.style.position = 'absolute';
  // SaveTextFileBtn.style.top = VALUES_MenuSharedCSS['space_TopTo1stElement'];
  // SaveTextFileBtn.style.width = '6rem';
  SaveTextFileBtn.style.left = "50%";
  // SaveTextFileBtn.style.marginLeft = 'calc(-25% - 0.75rem)';
  SaveTextFileBtn.style.padding = "0.3rem 1rem";
  SaveTextFileBtn.style.fontWeight = "bold";
  SaveTextFileBtn.style.fontSize = "0.9rem";
  SaveTextFileBtn.style.border = "2px solid #fff";
  SaveTextFileBtn.setAttribute("type", "button");
  SaveTextFileBtn.setAttribute("value", "SAVE \nTEXT FILE");
  const underLineGraphic = resourceCreateUnderLineGraphic();
  const arrowGraphic = resourceCreateArrowGraphic();
  const saveHoursText = document.createElement("div");
  saveHoursText.innerText = "TO KEEP HOURS DATA";
  saveHoursText.style.width = "100%";
  // saveHoursText.style.position = 'absolute';
  saveHoursText.style.bottom = "0.6rem";
  //text
  saveHoursText.style.fontSize = "0.6rem";
  saveHoursText.style.fontWeight = "lighter";
  saveHoursText.style.letterSpacing = "0.1rem";
  saveHoursText.style.textAlign = "center";
  const saveIcon = resourceCreateSaveIcon();
  // saveIcon.style.position = 'absolute';
  saveIcon.style.bottom = "1.66rem";
  saveIcon.style.left = "50%";
  // saveIcon.style.marginLeft = 'calc(-12.5% + 6px)'
  saveIcon.style.fill = "#fff";
  SaveTextFileBtnContainer.appendChild(SaveTextFileBtn);
  SaveTextFileBtnContainer.appendChild(saveIcon);
  SaveTextFileBtnContainer.appendChild(saveHoursText);
  SaveTextFileBtnContainer.appendChild(underLineGraphic);
  SaveTextFileBtnContainer.appendChild(arrowGraphic);
  document.getElementById("menu").appendChild(SaveTextFileBtnContainer);

  SaveTextFileBtnContainer.onclick = saveHoursAsTextFile;
}
function saveHoursAsTextFile() {
  // the only data it needs = hour ticks numbers
  const hourNumsStr = getHoursPerDayNumsStr();
  console.log("REMEMBER TO ADD DEBOUNCER FUNC LATER");
  createTextFile(
    "Metrics: Deep work hours. Per day, week, month.",
    hourNumsStr
  );
}
function createTextFile(filename, data) {
  var blob = new Blob([data], { type: "text" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename + ".txt";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}
function getHoursPerDayNumsStr() {
  const days = document.getElementsByClassName("day");
  const hourNums = [];
  for (let i = 0; i < days.length; i++) {
    hourNums.push(days[i].getElementsByClassName("hourEl").length);
  }
  const hourNumsStr = hourNums.join(",");
  console.log(hourNumsStr);
  return hourNumsStr;
}
function createFillDataBtn() {
  const fillDataBtnContainer = (function createFillDataContainer() {
    const fillDataBtnContainer = document.createElement("div");
    // aesthethics
    fillDataBtnContainer.style.color = "#fff";
    // fillDataBtnContainer.style.textAlign = 'left';
    fillDataBtnContainer.style.borderRight = "1px solid grey";
    fillDataBtnContainer.style.fontWeight = "bold";
    // display
    fillDataBtnContainer.style.height = "100%";
    fillDataBtnContainer.style.width = "18rem";
    fillDataBtnContainer.style.position = "relative";
    return fillDataBtnContainer;
  })();

  const dropTextFileBtn = document.createElement("input");
  dropTextFileBtn.setAttribute("type", "file");
  dropTextFileBtn.setAttribute("accept", "text/plain");
  dropTextFileBtn.id = "dropTextFileBtn";
  dropTextFileBtn.code = "dropTextFileBtn";

  dropTextFileBtn.onchange = function () {
    let file = this.files[0];
    console.log(this.files);
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const hoursTextFile = reader.result;
      fillHoursData(hoursTextFile);
    };
  };

  dropTextFileBtn.style.width = "0.1px";
  dropTextFileBtn.style.height = "0.1px";
  dropTextFileBtn.style.opacity = "0";
  dropTextFileBtn.style.overflow = "hidden";
  dropTextFileBtn.style.position = "absolute";

  const labelDropTextFileBtn = document.createElement("label");
  labelDropTextFileBtn.setAttribute("for", "dropTextFileBtn");
  labelDropTextFileBtn.innerText = "DROP \nTEXT FILE";
  labelDropTextFileBtn.style.padding = "0.3rem 1rem";
  labelDropTextFileBtn.style.border = "2px solid #fff";
  labelDropTextFileBtn.style.textAlign = "center";
  labelDropTextFileBtn.style.position = "absolute";
  labelDropTextFileBtn.style.left = "1.5rem";
  labelDropTextFileBtn.style.fontWeight = "bold";
  labelDropTextFileBtn.style.fontSize = "0.9rem";
  labelDropTextFileBtn.style.top =
    VALUES_MenuSharedCSS["space_TopTo1stElement"];

  const fillHoursText = document.createElement("div");
  //display
  fillHoursText.innerText = "TO FILL HOURS DATA";
  fillHoursText.style.width = "100%";
  fillHoursText.style.position = "absolute";
  fillHoursText.style.bottom = "0.6rem";
  //text
  fillHoursText.style.fontSize = "0.6rem";
  fillHoursText.style.fontWeight = "lighter";
  fillHoursText.style.letterSpacing = "0.1rem";
  fillHoursText.style.textAlign = "center";
  const arrowGraphic = resourceCreateArrowGraphic();
  arrowGraphic.style.bottom = "1.5rem";
  arrowGraphic.style.left = "9rem";
  const chartIcon = resourceCreateChartIcon();
  chartIcon.style.fill = "#fff";
  chartIcon.style.position = "absolute";
  chartIcon.style.top = "0.75rem";
  chartIcon.style.right = "1.5rem";
  chartIcon.style.height = "6rem";
  chartIcon.style.width = "6rem";
  const fillIcon = resourceCreateFillIcon();
  fillIcon.style.position = "absolute";
  fillIcon.style.top = "4.46rem";
  fillIcon.style.left = "6.1rem";
  fillIcon.style.fill = "#fff";
  fillIcon.style.height = "2.75rem";
  fillIcon.style.width = "2.75rem";
  fillIcon.style.transform = "scale(-1,1) rotate(-12deg)";

  const underLineGraphic = resourceCreateUnderLineGraphic();
  const column1 = document.createElement("div");
  column1.style.position = "relative";
  column1.style.height = "100%";

  column1.appendChild(dropTextFileBtn);
  column1.appendChild(labelDropTextFileBtn);
  column1.appendChild(fillIcon);
  column1.appendChild(fillHoursText);
  column1.appendChild(underLineGraphic);

  fillDataBtnContainer.appendChild(column1);
  fillDataBtnContainer.appendChild(arrowGraphic);
  fillDataBtnContainer.appendChild(chartIcon);
  document.getElementById("menu").appendChild(fillDataBtnContainer);
}
function fillHoursData(textFile) {
  const days = document.getElementsByClassName("day");
  let hoursArr = textFile.split(",");
  console.log(hoursArr);

  for (let i = 0; i < days.length; i++) {
    // clear & append on each day -> saves the need to otherwise loop all days 2nd time
    clearHoursFromTheDay(days[i]);
    appendHoursToDay(hoursArr[i], days[i]);
  }
}
function clearHoursFromTheDay(day) {
  for (let r = day.getElementsByClassName("hourEl").length - 1; r >= 0; r--) {
    let containerHours = day.getElementsByClassName("containerHours")[0];
    containerHours.getElementsByClassName("hourEl")[r].remove();
  }
}
function appendHoursToDay(hoursNum, day) {
  for (let j = 1; j <= hoursNum; j++) {
    appendHour(hoursNum, day);
  }
  let sum = day.getElementsByClassName("sum")[0];
  sum.innerText = day.getElementsByClassName("hourEl").length;
}
function appendHour(hoursNum, day) {
  const hour = resourceCreateHourTick();
  hour.className = "hourEl";
  // appendNumToHour(hoursNum, hour);
  let containerHours = day.getElementsByClassName("containerHours")[0];
  containerHours.appendChild(hour);
}
function createSaveToExcelBtn() {
  var saveToExcelBtn = document.createElement("input");
  saveToExcelBtn.style.marginLeft = "auto";
  saveToExcelBtn.style.backgroundColor = "#000";
  saveToExcelBtn.style.color = "#fff";
  saveToExcelBtn.style.border = "none";
  saveToExcelBtn.style.fontWeight = "bold";
  saveToExcelBtn.style.height = "30px";
  saveToExcelBtn.setAttribute("type", "button");
  saveToExcelBtn.setAttribute("value", "Save to Excel");
  saveToExcelBtn.onclick = saveToExcel;
  return saveToExcelBtn;
}
function saveToExcel() {
  var month = document.getElementsByClassName("month")[0];
  var monthsLIST = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var weeks = month.getElementsByClassName("week");
  const monthData = [];

  for (var i = 0; i < weeks.length; i++) {
    var weekObj = {};
    weekObj[monthsLIST[0]] = "Week" + (i + 1);
    var week = weeks[i];
    var days = week.getElementsByClassName("day");

    for (var j = 0; j < days.length; j++) {
      var day = days[j];
      var hours = day.getElementsByClassName("hourEl");
    }
    monthData.push(weekObj);
  }
  var totalDeepWorkHours = document.getElementsByClassName("hourEl").length;

  JSONToCSVConvertor(
    [
      {
        January: "Week 1",
        Monday: 8,
        Tuesday: 0,
        Wendesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      },
      {
        January: "Week 2",
        Monday: 10,
        Tuesday: 0,
        Wendesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      },
      {
        Total: totalDeepWorkHours,
      },
    ],
    "ReportTitle",
    "ShowLabel"
  );
}
function getCsvDaysInRow() {
  const daysDATA = dataGetDays();
  let days = "";
  daysDATA.forEach(function (day) {
    days += getCsvDay(day);
  });
  return days;
}
function getCsvDay(day) {
  return day + ",";
}
function getCsvRow() {
  return "\r\n";
}

function getWeekLabel(num) {
  return "Week " + num + ",";
}
function getWeekHours(week) {
  var hours = "";
  hours += getWeekLabel(week.classList[1]);

  const days = week.getElementsByClassName("day");
  for (let i = 0; i < days.length; i++) {
    hours += getDayHours(days[i]);
  }
  return hours;
}
function getDayHours(day) {
  return day.getElementsByClassName("hourEl").length + ",";
}
function getMonthHours(month) {
  const weeks = month.getElementsByClassName("week");
  var monthHours = "";
  for (let i = 0; i < weeks.length; i++) {
    var weekHours = getWeekHours(weeks[i]);
    monthHours += weekHours;
    monthHours += getCsvRow();
  }
  return monthHours;
}
function getCSV() {
  var CSV = "sep=," + "\r\n\n";
  const months = document.getElementsByClassName("month");
  const monthNames = getMonthNames();
  for (let i = 0; (i < months.length) & (i < 12); i++) {
    CSV += monthNames[i];
    CSV += getCsvRow();
    CSV += "," + getCsvDaysInRow();
    CSV += getCsvRow();
    CSV += getMonthHours(months[i]);
  }
  return CSV;
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  // var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var CSV = getCSV();

  console.log(CSV);
  //Generate a file name
  var fileName = "MyReport_";
  fileName += ReportTitle.replace(/ /g, "_");
  //Initialize file format: csv or xls
  var uri = "data:text/csv;charset=utf-8," + escape(CSV);
  var link = document.createElement("a");
  link.href = uri;
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function createWeeksContainer(monthNum) {
  var weeksContainer = document.createElement("div");
  weeksContainer.className = "weeksContainer";

  //WEEKS CONTAINER STYLEC
  weeksContainer.style.display = "flex";
  weeksContainer.style.flex = "12";
  weeksContainer.style.overflow = "auto";
  weeksContainer.style.whiteSpace = "nowrap";
  document
    .getElementsByClassName("monthContainer")
    [monthNum].appendChild(weeksContainer);
}
function createSidewaysTitle(sidewaysTitle, monthNum) {
  // 0. CREATE DEEP WORK HOURS COLUMN TO THE LEFT
  var hours = document.createElement("div");
  hours.style.display = "flex";
  hours.style.flex = "1";
  hours.style.position = "relative";
  hours.style.minWidth = "142px";
  hours.style.width = "100%";
  hours.style.color = "#000";
  hours.style.border = "1px solid gray";
  hours.style.display = "inline-block";
  hours.style.height = "100vh";
  hours.style.backgroundColor = "#000";
  hours.style.textAlign = "center";
  hours.style.paddingRight = "6rem";
  //title
  var title = document.createElement("div");
  title.innerText = sidewaysTitle;
  title.style.position = "absolute";
  title.style.marginLeft = "calc(-200% + 60px)";
  title.style.transform = "rotate(-90deg)";
  title.style.color = "white";
  title.style.fontSize = "60px";
  title.style.width = "400%";
  title.style.top = "calc(50% - 40px)";
  title.style.left = "1.25rem";
  hours.appendChild(title);
  document
    .getElementsByClassName("monthContainer")
    [monthNum].appendChild(hours);
}
function getMonthNames() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}
function createWeek(weekNum, monthNum) {
  // 1. CREATE WEEK DIV
  var week = document.createElement("div");
  week.classList.add("week");
  week.classList.add(weekNum);
  week.style.border = "90px solid #000";
  var weekName = document.createElement("div");
  weekName.innerText = "Week " + weekNum || "Week";
  weekName.style.color = "#fff";
  weekName.style.position = "absolute";
  weekName.style.top = "-3rem";
  weekName.style.left = "calc(50% - 5rem)";
  weekName.style.fontSize = "1.5rem";
  weekName.style.letterSpacing = "1rem";
  week.appendChild(weekName);
  week.style.display = "inline-block";
  week.style.position = "relative";
  //CREATE TITLE OF THE MONTH; APPEND TO THE LEFT OF EACH OF THE 4 WEEKS
  var monthChoice = document.createElement("div");
  monthChoice.innerText = "Deep work hours";
  monthChoice.style.color = "#fff";
  monthChoice.style.position = "absolute";
  monthChoice.style.transform = "rotate(-90deg)";
  monthChoice.style.fontSize = "2.75rem";
  monthChoice.style.letterSpacing = "1rem";
  monthChoice.style.top = "calc(50% - 0.75rem)";
  monthChoice.style.right = "calc(100% - 14.75rem)";
  week.appendChild(monthChoice);

  if (weekNum <= 3) {
    //create btn
    var navBtnRight = document.createElement("input");
    navBtnRight.style.position = "absolute";
    navBtnRight.style.top = "calc(100% + 15.5px)";
    navBtnRight.style.left = "calc(50%)";
    navBtnRight.style.backgroundColor = "transparent";
    navBtnRight.style.color = "#fff";
    navBtnRight.style.border = "none";
    navBtnRight.style.fontWeight = "bold";
    navBtnRight.style.fontSize = "2.5rem";
    navBtnRight.style.display = "inline-block";
    navBtnRight.style.maxWidth = "50%";
    navBtnRight.setAttribute("type", "button");
    navBtnRight.setAttribute("value", ">");
    week.appendChild(navBtnRight);
    //append callback
    navBtnRight.onclick = function (e) {
      if (e.target.parentElement.parentElement.className !== "weeksContainer") {
        console.log(
          "error - navBtnRight.onclick e.trgt. parentElement is wrong"
        );
      }
      var weeksContainer = e.target.parentElement.parentElement;
      var scrollToWeekNum = Number(e.target.parentElement.classList[1]) + 1;
      var scrollToWeek =
        weeksContainer.getElementsByClassName(scrollToWeekNum)[0];
      weeksContainer.scrollTo({
        left: scrollToWeek.offsetLeft - scrollToWeek.clientWidth / 4,
        behavior: "smooth",
      });
    };
  }
  if (weekNum > 1) {
    //create btn
    var navBtnLeft = document.createElement("input");
    navBtnLeft.style.position = "absolute";
    navBtnLeft.style.top = "calc(100% + 15.5px)";
    navBtnLeft.style.left = "calc(50% - 4rem)";
    navBtnLeft.style.backgroundColor = "transparent";
    navBtnLeft.style.color = "#fff";
    navBtnLeft.style.border = "none";
    navBtnLeft.style.fontWeight = "bold";
    navBtnLeft.style.fontSize = "2.5rem";
    navBtnLeft.style.display = "inline-block";
    navBtnLeft.style.maxWidth = "50%";
    navBtnLeft.setAttribute("type", "button");
    navBtnLeft.setAttribute("value", "<");
    week.appendChild(navBtnLeft);
    //append callback
    navBtnLeft.onclick = function (e) {
      if (e.target.parentElement.parentElement.className !== "weeksContainer") {
        console.log(
          "error - navBtnRight.onclick e.trgt. parentElement is wrong"
        );
      }
      var weeksContainer = e.target.parentElement.parentElement;
      var scrollToWeekNum = Number(e.target.parentElement.classList[1]) - 1;
      var scrollToWeek =
        weeksContainer.getElementsByClassName(scrollToWeekNum)[0];
      weeksContainer.scrollTo({
        left: scrollToWeek.offsetLeft - scrollToWeek.clientWidth / 4,
        behavior: "smooth",
      });
    };
  }
  document.getElementsByClassName("weeksContainer")[monthNum].appendChild(week);
  createDays(week);
}
function dataGetDays() {
  var daysDATA = [
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return daysDATA;
}
function createDay(dayDATA) {
  //day's column to add deep work hour ticks into
  var day = document.createElement("div");
  day.innerText = dayDATA;
  //style
  day.style.width = "142px";
  day.style.textAlign = "center";
  day.style.border = "1px solid gray";
  day.style.padding = "3px 30px";
  var dayContainer = document.createElement("div");
  dayContainer.classList.add("day");
  dayContainer.classList.add(dayDATA);
  dayContainer.appendChild(day);
  dayContainer.style.display = "inline-block";
  week.appendChild(dayContainer);
  createBtns(dayContainer);
}
function createDays(week) {
  // 2. CREATE DAYS DIVS
  const daysDATA = dataGetDays();
  //create: container divs -> corresponding divs: 1) day's title divs, 2) day's deep work hour ticks
  daysDATA.forEach(function (dayDATA) {
    createDay(dayDATA);
  });
}
function createBtns(dayContainer) {
  const addBtn = createAddBtn();
  //count day's hours - closure var
  var hourNum = 0;

  // (represent hours) - add btn click -> add hour element
  addBtn.onclick = function addHour() {
    hourNum++;
    const hour = createHourTick();
    appendNumToHour(hourNum, hour);
    const parent = addBtn.parentNode;
    parent.appendChild(hour);
  };

  //(represent hours) - substract btn click -> substract hour element
  const substractBtn = createSubstractBtn();
  substractBtn.onclick = function substractHour() {
    if (hourNum > 0) {
      hourNum--;
    }
    const day = substractBtn.parentNode;
    deleteHourEl(day);
  };
  dayContainer.appendChild(addBtn);
  dayContainer.appendChild(substractBtn);
}
function createAddBtn() {
  const addBtn = document.createElement("input");
  addBtn.style.marginLeft = "auto";
  addBtn.style.backgroundColor = "#000";
  addBtn.style.color = "#000071";
  addBtn.style.border = "none";
  addBtn.style.fontWeight = "bold";
  addBtn.style.display = "inline-block";
  addBtn.style.height = "30px";
  addBtn.style.width = "100%";
  addBtn.style.maxWidth = "50%";
  addBtn.setAttribute("type", "button");
  addBtn.setAttribute("value", "+");
  return addBtn;
}
function createSubstractBtn() {
  var substractBtn = document.createElement("input");
  substractBtn.style.marginLeft = "auto";
  substractBtn.style.backgroundColor = "#000";
  substractBtn.style.border = "none";
  substractBtn.style.color = "rgb(225, 116, 0)";
  substractBtn.style.fontWeight = "bold";
  substractBtn.style.display = "inline-block";
  substractBtn.style.height = "30px";
  substractBtn.style.width = "100%";
  substractBtn.style.maxWidth = "50%";
  substractBtn.setAttribute("type", "button");
  substractBtn.setAttribute("value", "-");
  return substractBtn;
}
function createHourTick() {
  var hour = document.createElement("div");
  hour.className = "hour";
  hour.style.backgroundColor = "#000071";
  hour.style.padding = "7px 0";
  hour.style.border = "1px solid darkblue";
  hour.style.position = "relative";
  // deep work hour count - visual representer
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "28");
  svg.setAttribute("width", "28");
  svg.setAttribute("display", "block");
  svg.style.margin = "auto";
  var tick = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tick.setAttributeNS(
    null,
    "d",
    "M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"
  );
  tick.style.scale = "0.14";
  tick.style.x = "50%";
  svg.appendChild(tick);
  hour.appendChild(svg);
  return hour;
}
function resourceCreateHourTick() {
  var hour = document.createElement("div");
  hour.className = "hour";
  // hour.style.backgroundColor = "#000071";
  hour.style.padding = "1px 0";
  hour.style.border = "1px solid darkblue";
  hour.style.position = "relative";
  // deep work hour count - visual representer
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "20");
  svg.setAttribute("width", "20");
  svg.setAttribute("display", "block");
  svg.style.margin = "auto";
  var tick = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tick.setAttributeNS(
    null,
    "d",
    "M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"
  );
  tick.style.scale = "0.10";
  tick.style.x = "50%";
  svg.appendChild(tick);
  hour.appendChild(svg);
  return hour;
}
function appendNumToHour(num, hour) {
  var numEl = document.createElement("div");
  numEl.style.color = "#000";
  numEl.style.fontWeight = "bold";
  numEl.style.fontSize = "1.6rem";
  numEl.style.position = "absolute";
  numEl.style.left = "15px";
  numEl.style.top = "0.1rem";
  numEl.innerText = num;
  hour.appendChild(numEl);
}
function deleteHourEl(day) {
  if (day.getElementsByClassName("hourEl").length) {
    day.removeChild(
      day.getElementsByClassName("hourEl")[
        day.getElementsByClassName("hourEl").length - 1
      ]
    );
  }
}
function resourceCreateSaveIcon() {
  const saveIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  saveIcon.setAttributeNS(null, "height", "24");
  saveIcon.setAttributeNS(null, "width", "24");
  // saveIcon.setAttributeNS(null, 'enableBackground', 'new 0 0 24 24');
  saveIcon.setAttributeNS(null, "viewBox", "0 0 24 24");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "m21.5 20h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.827 0 1.5-.673 1.5-1.5v-11c0-.827-.673-1.5-1.5-1.5h-11.5c-.133 0-.26-.053-.354-.146l-1.853-1.854h-5.293c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h2c.276 0 .5.224.5.5s-.224.5-.5.5h-2c-1.379 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.121-2.5 2.5-2.5h5.5c.133 0 .26.053.354.146l1.853 1.854h11.293c1.379 0 2.5 1.122 2.5 2.5v11c0 1.378-1.121 2.5-2.5 2.5z"
  );
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "m12 18.75c-.276 0-.5-.224-.5-.5v-7.75c0-.276.224-.5.5-.5s.5.224.5.5v7.75c0 .277-.224.5-.5.5z"
  );
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "m12 19c-.128 0-.256-.049-.354-.146l-2.5-2.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.147 2.146 2.146-2.146c.195-.195.512-.195.707 0s.195.512 0 .707l-2.5 2.5c-.097.097-.225.146-.353.146z"
  );
  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute(
    "d",
    "m15.5 22h-7c-.827 0-1.5-.673-1.5-1.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2c0 .276.225.5.5.5h7c.275 0 .5-.224.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2c0 .827-.673 1.5-1.5 1.5z"
  );

  saveIcon.appendChild(path);
  saveIcon.appendChild(path2);
  saveIcon.appendChild(path3);
  saveIcon.appendChild(path4);
  return saveIcon;
}
function resourceCreateQuestionIcon() {
  const questionIcon = document.createElement("span");
  questionIcon.innerText = "?";
  questionIcon.style.color = "white";
  questionIcon.style.fontSize = "1.75rem";
  questionIcon.style.fontWeight = "bold";
  return questionIcon;
}
function resourceCreateChartIcon() {
  const chartIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  chartIcon.setAttributeNS(null, "x", "0px");
  chartIcon.setAttributeNS(null, "y", "0px");
  chartIcon.setAttributeNS(null, "enableBackground", "new 0 0 100 100");
  chartIcon.setAttributeNS(null, "viewBox", "-17 6 100 100");
  // chartIcon.setAttributeNS(null, 'xml:space', 'preserve');

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M48,71h4v20c0,1.1-0.9,2-2,2s-2-0.9-2-2V71z M32.07,90.47c-0.29,1.07,0.34,2.17,1.4,2.46C33.65,92.98,33.83,93,34,93c0.88,0,1.69-0.58,1.93-1.47L41.53,71h-4.15L32.07,90.47z M62.62,71h-4.15l5.6,20.53C64.31,92.42,65.12,93,66,93c0.17,0,0.35-0.02,0.53-0.07c1.06-0.29,1.69-1.39,1.4-2.46L62.62,71z M80,7H20c-1.65,0-3,1.35-3,3c0,1.65,1.35,3,3,3h60c1.65,0,3-1.35,3-3C83,8.35,81.65,7,80,7z M23,17h54v48c0,1.1-0.9,2-2,2H25c-1.1,0-2-0.9-2-2V17z M32.59,47.41l4,4C36.98,51.8,37.49,52,38,52s1.02-0.2,1.41-0.59L48,42.83l4.59,4.58C52.98,47.8,53.49,48,54,48s1.02-0.2,1.41-0.59l7-7L64,38.83V44c0,1.1,0.9,2,2,2s2-0.9,2-2V34c0-0.13-0.01-0.26-0.04-0.39c-0.01-0.06-0.03-0.12-0.05-0.17c-0.02-0.07-0.04-0.14-0.06-0.2c-0.03-0.07-0.07-0.13-0.1-0.2c-0.03-0.05-0.05-0.1-0.09-0.15c-0.07-0.11-0.15-0.21-0.25-0.3c-0.09-0.1-0.19-0.18-0.3-0.25c-0.05-0.04-0.1-0.06-0.15-0.08c-0.06-0.04-0.13-0.08-0.2-0.11c-0.06-0.02-0.13-0.04-0.2-0.06c-0.05-0.02-0.11-0.04-0.17-0.05C66.26,32.01,66.13,32,66,32H56c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h5.17l-1.58,1.59L54,43.17l-4.59-4.58c-0.78-0.79-2.04-0.79-2.82,0L38,47.17l-2.59-2.58c-0.78-0.79-2.04-0.79-2.82,0C31.8,45.37,31.8,46.63,32.59,47.41z"
  );
  chartIcon.appendChild(path);
  return chartIcon;
}
function resourceCreateFillIcon() {
  const fillIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  fillIcon.setAttributeNS(null, "x", "0px");
  fillIcon.setAttributeNS(null, "y", "0px");
  fillIcon.setAttributeNS(null, "enableBackground", "new 0 0 100 100");
  fillIcon.setAttributeNS(null, "viewBox", "-17 6 100 100");
  // fillIcon.setAttributeNS(null, 'xml:space', 'preserve');

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M28.215,32.394 C27.1130386,32.9344423 26.1973331,33.7913059 25.585,34.855 C25.563,34.897 25.542,34.939 25.521,34.981 C25.68,34.994 25.84,35 26,35 C30.963,35 35,29.168 35,22 C35,14.832 30.963,9 26,9 C21.037,9 17,14.832 17,22 C16.9598717,25.0644868 17.7717122,28.0798944 19.345,30.71 C19.394,30.656 19.45,30.605 19.5,30.552 C19.726,30.309 19.96,30.071 20.2,29.835 C20.29,29.748 20.378,29.662 20.47,29.576 C20.58,29.4726667 20.6913333,29.3703333 20.804,29.269 C19.578892,27.0448437 18.9569688,24.5388795 19,22 C19,15.42 22.619,11 26,11 C29.381,11 33,15.42 33,22 C33.0015429,22.6630805 32.9591165,23.3255336 32.873,23.983 L32.873,23.999 C32.6568842,26.1533604 31.9177978,28.2223218 30.72,30.026 C30.558,30.26 30.3883333,30.4836667 30.211,30.697 C30.1825396,30.7322977 30.1518077,30.7657019 30.119,30.797 C29.5851536,31.4391215 28.9402325,31.9800558 28.215,32.394 Z"
  );
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M30.887,23.756 C30.9638666,23.1738497 31.0016179,22.5872009 31,22 C31,16.424 28.088,13 26,13 C23.912,13 21,16.424 21,22 C20.9660325,24.0840079 21.4447371,26.1444293 22.394,28 C24.6887494,26.5286022 27.1912696,25.4098166 29.818,24.681 C30.157,24.571 30.464,24.467 30.779,24.361 C30.812,24.161 30.863,23.965 30.887,23.756 Z  "
  );
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M47,9 L42.853,9 C44.041513,12.2637064 44.7345327,15.6870083 44.909,19.156 C46.2925409,19.6043842 47.1522761,20.9838117 46.9454312,22.4234119 C46.7385863,23.8630122 45.5252505,24.9445763 44.0714359,24.9852831 C42.6176214,25.0259899 41.3456664,24.014014 41.0585911,22.5882435 C40.7715159,21.162473 41.5527167,19.7370993 42.909,19.212 C42.7345809,15.7096113 41.9859448,12.2596691 40.693,9 L42.85,9 C42.67,8.52 42.48,8.05 42.27,7.59 C42.18,7.39 42.09,7.19 42,7 C39.85,2.54 36.78,0 33.5,0 C30.08,0 26.88,2.77 24.73,7.59 C24.5533254,7.97485924 24.6418458,8.42953221 24.95,8.72 C24.9814973,8.75581457 25.0186575,8.78621844 25.06,8.81 C25.1130436,8.8491413 25.1700173,8.88265521 25.23,8.91 C25.3588839,8.96829715 25.4985485,8.99895525 25.64,9 C26.0342739,9.00385978 26.392623,8.77152354 26.55,8.41 C26.77,7.91 27.01,7.44 27.24,7 C28.99,3.8 31.22,2 33.5,2 C35.78,2 38.01,3.8 39.76,7 C39.99,7.44 40.23,7.91 40.45,8.41 C40.5402704,8.60233091 40.6203807,8.79926863 40.69,9 L31.464,9 C34.767,11.591 37,16.442 37,22 C37,27.558 34.767,32.409 31.464,35 L47,35 C51.963,35 56,29.168 56,22 C56,14.832 51.963,9 47,9 Z"
  );
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttributeNS(null, "cx", "44");
  circle.setAttributeNS(null, "cy", "22");
  circle.setAttributeNS(null, "r", "1");
  circle.setAttributeNS(null, "fill", "#fff");
  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute(
    "d",
    "M19,58 C30.2,58 38,54.574 38,51.5 C38,48.974 32.351,45.918 23.169,45.175 C23.172039,45.7486922 23.2466145,46.319766 23.391,46.875 C23.6366056,47.8721039 24.3561241,48.6850663 25.316,49.05 C25.8406705,49.224522 26.124522,49.7913295 25.95,50.316 C25.775478,50.8406705 25.2086705,51.124522 24.684,50.95 C23.0856382,50.3807309 21.8769051,49.0511996 21.462,47.406 C21.0346929,45.2077147 21.1095566,42.9412949 21.681,40.776 L21.767,40.316 C22.0599438,38.6229434 22.5243337,36.9640732 23.153,35.365 C23.359,34.858 23.579,34.377 23.81,33.935 C24.5984115,32.5192982 25.7946126,31.3736212 27.243,30.647 C27.78632,30.3304587 28.2661231,29.9157596 28.658,29.424 C28.6762968,29.4027057 28.6956547,29.3823465 28.716,29.363 L28.727,29.351 L28.739,29.339 C28.908,29.129 29.051,28.884 29.203,28.65 C29.303,28.493 29.422,28.35 29.516,28.186 C29.7214349,27.8107575 29.9031251,27.4229959 30.06,27.025 C30.085,26.964 30.118,26.912 30.141,26.85 C30.164,26.788 30.177,26.725 30.199,26.666 C27.515688,27.3871518 24.9884092,28.597059 22.744,30.235 C21.7545022,31.0478299 20.8526093,31.9617884 20.053,32.962 C18.8599554,34.4416559 17.9924075,36.1563067 17.507,37.994 C17.292,38.817 17.133,39.651 16.965,40.535 C16.7423191,41.8630506 16.4258607,43.1736627 16.018,44.457 L16.018,44.464 C15.7645872,45.2283578 15.4310665,45.9637792 15.023,46.658 C13.9545476,48.6927862 11.8628328,49.9842994 9.565,50.028 C9.34150624,50.028366 9.11816388,50.0163476 8.896,49.992 C8.34713304,49.9332668 7.94966644,49.4409096 8.008,48.892 C8.03307936,48.627092 8.16395331,48.3834992 8.3710001,48.216356 C8.57804689,48.0492127 8.84376056,47.9726512 9.108,48.004 C10.8531462,48.129949 12.5042238,47.1992486 13.3,45.641 C13.366,45.53 13.42,45.407 13.482,45.292 C5.007,46.22 0,49.087 0,51.5 C0,54.574 7.8,58 19,58 Z M5.143,52.485 C5.4267125,52.0128664 6.03880533,51.8590607 6.512,52.141 C6.56,52.169 11.384,54.951 19.89,54.006 C20.438971,53.9452487 20.9332487,54.341029 20.994,54.89 C21.0547513,55.438971 20.658971,55.9332487 20.11,55.994 C18.8691906,56.1333487 17.6216091,56.2037902 16.373,56.205 C9.49,56.205 5.673,53.968 5.485,53.857 C5.01177029,53.5725154 4.8586697,52.9583224 5.143,52.485 Z"
  );
  fillIcon.appendChild(path);
  fillIcon.appendChild(path2);
  fillIcon.appendChild(path3);
  fillIcon.appendChild(circle);
  fillIcon.appendChild(path4);
  return fillIcon;
}
function resourceCreateUnderLineGraphic() {
  const underLineGraphic = document.createElement("span");
  //display
  underLineGraphic.style.width = "90%";
  // underLineGraphic.style.position = 'absolute';
  // underLineGraphic.style.bottom = VALUES_MenuSharedCSS['space_BottomTo1stElement']
  underLineGraphic.style.left = "5%";
  // aesthetic
  underLineGraphic.style.borderTop = "1px solid #fff";
  underLineGraphic.style.borderRadius = "50%";
  return underLineGraphic;
}
function resourceCreateArrowGraphic() {
  const arrowGraphic = document.createElement("span");
  arrowGraphic.style.borderTop = "3px solid #fff";
  arrowGraphic.style.borderRadius = "50%";
  return arrowGraphic;
}
function createCopyrightNote() {
  const copyrightNote = document.createElement("div");
  copyrightNote.classList.add("copyright");
  copyrightNote.style.letterSpacing = "0.25rem";
  copyrightNote.style.padding = "0.15rem";
  copyrightNote.innerText = "Icons made by ";
  const link = document.createElement("a");
  link.href = "https://icon54.com/";
  link.title = "Pixel perfect";
  link.innerText = "Pixel perfect";
  copyrightNote.appendChild(link);
  const betweenLinksText = document.createElement("span");
  betweenLinksText.innerText = " from ";
  copyrightNote.appendChild(betweenLinksText);
  const linkTwo = document.createElement("a");
  linkTwo.href = "https://www.flaticon.com/";
  linkTwo.title = "Flaticon";
  linkTwo.innerText = "www.flaticon.com";
  copyrightNote.appendChild(linkTwo);
  const dot = document.createElement("span");
  dot.innerText = ".";
  dot.style.color = "blue";
  copyrightNote.appendChild(dot);
  copyrightNote.style.backgroundColor = "#000";
  copyrightNote.style.color = "#fff";
  copyrightNote.style.fontSize = "10px";
  copyrightNote.style.textAlign = "center";
  return copyrightNote;
}
function createCopyrightNote2() {
  const copyrightNote2 = document.createElement("div");
  copyrightNote2.classList.add("copyright");
  copyrightNote2.style.letterSpacing = "0.25rem";
  copyrightNote2.style.padding = "0.15rem";
  const link = document.createElement("a");
  link.href = "https://www.iconbros.com/icons/ib-o-f-analysis/";
  link.title = "IconBros";
  link.innerText = "Analysis";
  link.target = "_blank";
  copyrightNote2.appendChild(link);
  const betweenLinksText = document.createElement("span");
  betweenLinksText.innerText = " icon by ";
  copyrightNote2.appendChild(betweenLinksText);
  const linkTwo = document.createElement("a");
  linkTwo.href = "https://iconbros.com";
  linkTwo.title = "IconBros";
  linkTwo.innerText = "IconBros";
  linkTwo.target = "_blank";
  copyrightNote2.appendChild(linkTwo);
  const dot = document.createElement("span");
  dot.innerText = ".";
  dot.style.color = "blue";
  copyrightNote2.appendChild(dot);
  copyrightNote2.style.backgroundColor = "#000";
  copyrightNote2.style.color = "#fff";
  copyrightNote2.style.fontSize = "10px";
  copyrightNote2.style.textAlign = "center";
  return copyrightNote2;
}

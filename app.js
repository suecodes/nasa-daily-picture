var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var warningAlert = document.getElementById("warningAlert");
var closeAlert = document.getElementById("closeAlert");
/**
 * Function to take in a numeric value and return the month representing the numeric value.
 * @param {*} month - numeric value 01 - 12
 */
function convertMonth(month) {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "February";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
  }
}

/**
 * Function to format the date into a readable date (e.g. 08 May 2019) and display on UI
 * @param {*} date
 */
function formatUIDate(date) {
  if (date != "") {
    const splitDate = date.split("-");

    const year = splitDate[0];
    const month = convertMonth(splitDate[1]);
    const day = splitDate[2];

    return day + " " + month + " " + year;
  }
}

/**
 *  Function to change date into format expected by NASA API e.g. 2019-05-07
 */
function formatNASADate() {
  if (dailyPicture.currentDate) {
    // split date parts
    const dd = String(dailyPicture.currentDate.getDate()).padStart(2, "0");
    const mm = String(dailyPicture.currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dailyPicture.currentDate.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }
}

/**
 *  Function to call NASA API to get the daily picture of the day
 */
function getDailyPicture() {
  const date = formatNASADate(dailyPicture.currentDate);
  const REQUEST_URL =
    "https://api.nasa.gov/planetary/apod?api_key=izEVsGms8DXgnNamukdbbCkej2npHRLM5KPhOHhg&date=" +
    date;

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        var obj = JSON.parse(xhttp.response);

        const title = document.getElementById("title");
        const desc = document.getElementById("description");
        const date = document.getElementById("date");
        const urlImage = document.getElementById("imageUrl");
        const copyright = document.getElementById("copyright");
        const videoUrl = document.getElementById("videoUrl");
        const videoFrame = document.getElementById("videoframe");

        title.innerHTML = obj.title;
        desc.innerHTML = obj.explanation;
        date.innerHTML = formatUIDate(obj.date);
        copyright.innerHTML = "Copyright: " + obj.copyright;

        // check if video or image
        if (obj.media_type === "video") {
          videoUrl.setAttribute("src", obj.url);
          videoFrame.style.display = "block";
          urlImage.style.display = "none";
        } else {
          // image
          urlImage.setAttribute("src", obj.url);
          urlImage.style.display = "block";
          videoFrame.style.display = "none";
        }
      }
    }
  };
  xhttp.open("GET", REQUEST_URL, true);
  xhttp.send();
}

/**
 *  Function to add event listeners on page load
 */
function init() {
  // left arrow click
  leftarrow.addEventListener("click", function() {
    dailyPicture.decrementDate();
    getDailyPicture();
  });
  // right arrow click
  rightarrow.addEventListener("click", function() {
    if (!dailyPicture.isToday()) {
      dailyPicture.incrementDate();
      getDailyPicture();
    } else {
      showAlert();
    }
  });
  // alert close button
  closeAlert.addEventListener("click", function() {
    $(".alert")
      .addClass("d-none")
      .removeClass("show");
  });
}

/**
 * Function to display alert when user tries to view tomorrow's image (tomorrow does not exist yet!)
 */
function showAlert() {
  $(".alert")
    .removeClass("d-none")
    .addClass("show");
}

/**
 * Program Start routine
 * - Initialize
 * - Display picture
 */
var dailyPicture = new DailyPicture();

init();
getDailyPicture();

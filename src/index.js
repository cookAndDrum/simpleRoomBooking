//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// All variable pls declare in the top section.

// ID Password Reference Only
const users = [
  {
    username: "sonic",
    password: "sonic",
    role: "Student"
  },
  {
    username: "Yu Hao",
    password: "Yu Hao",
    role: "Staff"
  },
  {
    username: "chinyee",
    password: "chinyee",
    role: "Student"
  },
  {
    username: "nigel",
    password: "nigel",
    role: "Student"
  },
  {
    username: "tony",
    password: "tony",
    role: "Student"
  },
  {
    username: "jeriel",
    password: "jeriel",
    role: "Staff"
  },
  {
    username: "jesper",
    password: "jesper",
    role: "Staff"
  },
  {
    username: "professor",
    password: "professor",
    role: "Superuser"
  },
  //For video demonstration
  {
    username: "Student",
    password: "Student",
    role: "Student"
  },
  {
    username: "Staff",
    password: "Staff",
    role: "Staff"
  },
  {
    username: "Superuser",
    password: "Superuser",
    role: "Superuser"
  }
];

const loginBtn = document.querySelector(".login-button");
const logInUsername = document.querySelector(".login__userName--input");
const logInpassword = document.querySelector(".login__password--input");
const headerHeadingText = document.querySelector(".header__heading--text");
const element = document.querySelector(".modal-background");
const element2 = document.querySelector(".overlay");
const roomCreated = document.querySelectorAll(".room-created");

const roomCreatedScrollContainer = document.querySelector(
  ".viewRooms__roomsContainer"
);
const roomBookedScrollContainer = document.querySelector(
  ".viewBookings__roomsContainer"
);
const roomLaunchedListContainer = document.querySelector(
  ".superUser-workplace__list--roomlist"
);

const createRoomCreateBtn = document.querySelector(
  ".createRoom__createButton--input"
);
const createRoomCreateLaunchBtn = document.querySelector(
  ".createRoom__createLaunchButton--input"
);
const createRoomCancelBtn = document.querySelector(
  ".createRoom__cancelButton--input"
);

const createRoomRoomName = document.getElementById("createRoom_roomName");
const createRoomPax = document.getElementById("createRoom_capacity");
const createRoomDateCreated = document.getElementById("createRoom_date");
const createRoomStartTime = document.getElementById("createRoom_startTime");
const createRoomEndTime = document.getElementById("createRoom_endTime");
const createRoomPrice = document.getElementById("createRoom_price");

const noroomtext = document.querySelector(".viewRooms__notAvailable");
const nobookroomtext = document.querySelector(".viewBookings__notAvailable");

const viewRoomName = document.querySelector(".viewRoom__roomName--variable");
const viewRoomMaxCap = document.querySelector(
  ".viewRoom__maximumCapacity--varible"
);
const viewRoomIntendedPax = document.querySelector(
  ".viewRoom__intendedCapacity--input"
);
const viewRoomDate = document.querySelector(".viewRoom__date--varible");
const viewRoomTimeSpan = document.querySelector(".viewRoom__timeSpan--varible");
const viewRoomTimeStart = document.querySelector(".viewRoom__timeStart--input");
const viewRoomTimeEnd = document.querySelector(".viewRoom__timeEnd--input");
const viewRoomBookedTime = document.querySelector(
  ".viewRoom__bookedTimeSlot--varible"
);
const viewRoomPrice = document.querySelector(".viewRoom__price--varible");
const viewRoomBookBtn = document.querySelector(".viewRoom__bookButton--input");

let currentUser,
  rooms,
  currentRoom,
  lastestLocalData,
  newRoom,
  bookedRoom,
  clickedRoom,
  createRoom,
  newRoomCreated,
  latestRoomData,
  correctRoomName,
  viewRoomIntendedPaxLocal;
let currentElement;
/*
NOT IN USE AT THE MOMENT

function roomTemplate(
  number,
  name,
  pax,
  dateLaunched,
  startTime,
  endTime,
  price,
) 
{
  newRoom = {
    roomNumber: number,
    roomName: name,
    maxPax: pax,
    launchDate: [dateLaunched],
    availableTime: [startTime, endTime],
    bookedTime: [],
    price: price,
    isLaunch: false,
    isApprove: false
  };
}

*/

function storeLocalData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) return;
  lastestLocalData = data;
}

function removeLocalDate(key) {
  localStorage.removeItem(key);
}

function _clearAllLocalData() {
  localStorage.clear();
}

function logInRedirect() {
  for (const user of users) {
    if (
      user.username === logInUsername.value &&
      user.password === logInpassword.value
    ) {
      // Store username in local storage
      localStorage.setItem("currentUser", user.username);

      if (user.role === "Student") {
        window.location = "studentInterface.html";
        return;
      }
      if (user.role === "Staff") {
        window.location = "staffInterface.html";
        return;
      }
      if (user.role === "Superuser")
        return (window.location = "superUserInterface.html");
      return;
    }
  }
}

function newPageCurrentUser() {
  currentUser = localStorage.getItem("currentUser");

  if (headerHeadingText) {
    for (const user of users) {
      if (user.username === currentUser) {
        headerHeadingText.innerHTML = `${user.role} User: ${user.username}`;
      }
    }
  }
}

function closeModal() {
  element.classList.add("hidden");
  element2.classList.add("hidden");
}

// when new page load, load the current user in localstorage
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("Page Loaded");
  newPageCurrentUser();
});

// Listen for login click event
if (loginBtn) {
  loginBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      logInRedirect();
    },
    false
  );
}

function noroom() {
  noroomtext.classList.remove("hidden");
}
function gotroom() {
  noroomtext.classList.add("hidden");
}
function nobookroom() {
  nobookroomtext.classList.remove("hidden");
}
function gotbookroom() {
  nobookroomtext.classList.add("hidden");
}

// Nigel
//close modal
if (element && element2) {
  document.addEventListener(
    "click",
    function (event) {
      if (
        !element.classList.contains(".hidden") &&
        !element2.classList.contains(".hidden")
      ) {
        if (
          event.target.matches(".closeButton") ||
          event.target.matches(".modal-background") ||
          event.target.matches(".createRoom__cancelButton--input") ||
          event.target.matches(".viewRoom__cancelButton--input")
        ) {
          closeModal();
        }
      }
    },
    false
  );

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        !element.classList.contains(".hidden") &&
        !element2.classList.contains(".hidden")
      ) {
        if (event.key === "Escape") {
          closeModal();
        }
      }
    },
    false
  );
}

function openModal() {
  element.classList.remove("hidden");
  element2.classList.remove("hidden");
}

const createNewRoomBtn = document.querySelector("#createNewRoom");

if (createNewRoomBtn) {
  createNewRoomBtn.addEventListener("click", (e) => {
    const createRoomHeading = document.querySelector(".createRoom__heading");
    createRoomHeading.textContent = "Create Room";
    createRoomCreateBtn.setAttribute("value", "Create");
    createRoomCreateLaunchBtn.setAttribute("value", "Create and Launch");
    createRoomCancelBtn.setAttribute("value", "Cancel");
    openModal();

    createRoomRoomName.value = "";
    createRoomPax.value = "";
    createRoomDateCreated.value = "";
    createRoomStartTime.value = "";
    createRoomEndTime.value = "";
    createRoomPrice.value = "";
  });
}

// Room created by staff sample
const roomSample = [
  {
    roomNumber: 0,
    roomName: "fire",
    maxPax: 2,
    launchDate: ["2022-06-01"],
    availableTime: ["08:00", "19:00"],
    bookedTime: [],
    price: 10,
    isLaunch: false,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "water",
    maxPax: 2,
    launchDate: ["2022-06-02"],
    availableTime: ["12:00", "19:00"],
    bookedTime: [],
    price: 8,
    isLaunch: true,
    isApprove: true
  },

  {
    roomNumber: 0,
    roomName: "air",
    maxPax: 2,
    launchDate: ["2022-06-03"],
    availableTime: ["10:00", "19:00"],
    bookedTime: [],
    price: 6.5,
    isLaunch: false,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "wood",
    maxPax: 2,
    launchDate: ["2022-06-04"],
    availableTime: ["08:00", "18:00"],
    bookedTime: [],
    price: 2,
    isLaunch: true,
    isApprove: true
  },

  {
    roomNumber: 0,
    roomName: "metal",
    maxPax: 2,
    launchDate: ["2022-06-05"],
    availableTime: ["09:00", "17:00"],
    bookedTime: [],
    price: 3.5,
    isLaunch: false,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "leaf",
    maxPax: 2,
    launchDate: ["2022-06-06"],
    availableTime: ["08:00", "15:00"],
    bookedTime: [],
    price: 5.5,
    isLaunch: true,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "poly",
    maxPax: 2,
    launchDate: ["2022-06-07"],
    availableTime: ["08:00", "17:00"],
    bookedTime: [],
    price: 5.9,
    isLaunch: true,
    isApprove: true
  },

  {
    roomNumber: 0,
    roomName: "plastic",
    maxPax: 2,
    launchDate: ["2022-06-03"],
    availableTime: ["11:00", "19:30"],
    bookedTime: [],
    price: 4.5,
    isLaunch: true,
    isApprove: true
  },

  {
    roomNumber: 0,
    roomName: "paper",
    maxPax: 2,
    launchDate: ["2022-06-05"],
    availableTime: ["09:30", "18:00"],
    bookedTime: [],
    price: 7.9,
    isLaunch: true,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "glass",
    maxPax: 2,
    launchDate: ["2022-06-02"],
    availableTime: ["08:00", "19:00"],
    bookedTime: [],
    price: 1,
    isLaunch: false,
    isApprove: false
  },

  {
    roomNumber: 0,
    roomName: "Cheese",
    maxPax: 5,
    launchDate: ["2022-6-07"],
    availableTime: ["08:00", "18:00"],
    bookedTime: [
      {
        user: "tony",
        time: ["09:30", "12:30"],
        totalPrice: 30,
        pax: 3
      }
    ],
    price: 10,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Bread",
    maxPax: 4,
    launchDate: ["2022-6-04"],
    availableTime: ["08:30", "12:30"],
    bookedTime: [
      {
        user: "tony",
        time: ["08:30", "10:30"],
        totalPrice: 10,
        pax: 4
      }
    ],
    price: 5,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Pudding",
    maxPax: 10,
    launchDate: ["2022-6-02"],
    availableTime: ["12:00", "18:00"],
    bookedTime: [
      {
        user: "nigel",
        time: ["13:00", "14:00"],
        totalPrice: 8,
        pax: 5
      }
    ],
    price: 8,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Tomato",
    maxPax: 6,
    launchDate: ["2022-6-01"],
    availableTime: ["08:00", "18:00"],
    bookedTime: [
      {
        user: "nigel",
        time: ["12:00", "13:00"],
        totalPrice: 12,
        pax: 5
      }
    ],
    price: 12,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Donut",
    maxPax: 2,
    launchDate: ["2022-6-06"],
    availableTime: ["10:00", "18:00"],
    bookedTime: [
      {
        user: "tony",
        time: ["12:00", "13:00"],
        totalPrice: 10,
        pax: 2
      },
      {
        user: "nigel",
        time: ["14:00", "17:00"],
        totalPrice: 30,
        pax: 2
      }
    ],
    price: 10,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "weiner",
    maxPax: 3,
    launchDate: ["2022-6-07"],
    availableTime: ["10:00", "18:00"],
    bookedTime: [
      {
        user: "chinyee",
        time: ["11:00", "13:00"],
        totalPrice: 18,
        pax: 2
      },
      {
        user: "nigel",
        time: ["14:00", "16:00"],
        totalPrice: 18,
        pax: 3
      }
    ],
    price: 9,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Lettuce",
    maxPax: 8,
    launchDate: ["2022-6-05"],
    availableTime: ["08:00", "12:00"],
    bookedTime: [],
    price: 7.5,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Monkey",
    maxPax: 6,
    launchDate: ["2022-6-02"],
    availableTime: ["09:00", "14:00"],
    bookedTime: [
      {
        user: "tony",
        time: ["10:00", "13:00"],
        totalPrice: 31.5,
        pax: 4
      }
    ],
    price: 10.5,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Hummus",
    maxPax: 12,
    launchDate: ["2022-6-04"],
    availableTime: ["12:00", "18:00"],
    bookedTime: [
      {
        user: "tony",
        time: ["12:00", "14:00"],
        totalPrice: 30,
        pax: 10
      },
      {
        user: "chinyee",
        time: ["15:00", "16:00"],
        totalPrice: 15,
        pax: 8
      }
    ],
    price: 15,
    isLaunch: true,
    isApprove: true
  },
  {
    roomNumber: 0,
    roomName: "Mold",
    maxPax: 4,
    launchDate: ["2022-6-03"],
    availableTime: ["10:00", "18:00"],
    bookedTime: [
      {
        user: "chinyee",
        time: ["12:00", "13:00"],
        totalPrice: 7,
        pax: 4
      }
    ],
    price: 7,
    isLaunch: true,
    isApprove: true
  }
];

function init(key, data) {
  _clearAllLocalData();
  storeLocalData(key, data);
  getLocalData(key);
}

// Full Local
getLocalData("rooms");
rooms = lastestLocalData;

// Promo code logic
let promocodelist = [];
getLocalData("promocodelist", promocodelist);
promocodelist = lastestLocalData;

const resetLocalBtn = document.querySelector("#resetLocalBtn");

if (resetLocalBtn) {
  resetLocalBtn.addEventListener("click", (e) => {
    // Fresh new data
    init("roomSample", roomSample);
    rooms = lastestLocalData;
    storeLocalData("rooms", rooms);

    promocodelist = [];
    storeLocalData("promocodelist", promocodelist);
    promocodelist = lastestLocalData;
  });
}

// loop data of available room and insert to selected scroll bar html class
function insertRoom(data, scrollBarContainer) {
  const html = `
						  <div class="room room-${
                scrollBarContainer === roomCreatedScrollContainer
                  ? "created"
                  : "booked"
              }">
							  <div class="room-created__picture"></div>
							  <h4 class="room-created__name">
							  <span class="room-created__name-text">${data.roomName}</span>
							 
							 
							  </h4>
							  <span class="createRoom__status ${
                  data.isLaunch ? "button--green" : "button--red"
                }">${data.isLaunch ? "Launched" : "Not Launched"}</span>
						  </div>
				  `;
  scrollBarContainer.insertAdjacentHTML("beforeend", html);
}

function insertRoomForSuperuser(data, roomListContainer, className, status) {
  const html1 = `
			  <div class="superUser-workplace__list--room room-launched">
			  <p class="room-launched__roomName"><span class="roomStatus__subcontainer">${data.roomName}</span></p>
			  <p class="room-launched__roomBookingDate"><span class="roomStatus__subcontainer">${data.launchDate}</span></p>
			  <p class="room-launched__roomStatus"><span class="roomStatus__subcontainer status-tag tag--${className}">${status}</span></p>
			  <div class="detailbtnpos room-launched__roomDetailsBtn"><button type="roomStatus__subcontainer" class="details-btn">Details</button></div>
			  </div>
	`;

  roomListContainer.insertAdjacentHTML("beforeend", html1);
}

document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    const target = e.target;

    if (target.closest(".room-created") || target.closest(".room-booked")) {
      const clicked =
        target.closest(".room-created") || target.closest(".room-booked");

      // Store room clicked
      clickedRoom = clicked.children[1].innerText;
      console.log(clickedRoom);
    }

    if (target.closest(".room-launched")) {
      const clicked = target.closest(".room-launched");

      // Store room clicked
      clickedRoom = clicked.children[0].innerText;
      console.log(clickedRoom);
    }

    // Store in local to use in bookingSummary page
    storeLocalData("clickedRoom", clickedRoom);

    // If it is room-created tag room for staff
    staffClickingEvent(target);

    //For student clicking available rooms event
    studentClickingRoomEvent(target);

    //For student clicking booked rooms event
    studentClickingBookedRoomEvent(target);

    //For superuser clicking launched rooms event
    superuserClickingEvent(target);
  },
  false
);

//
//CODES FOR THE STAFF ROLE
//

// Insert totalRooms staff created that isLaunch and isApprove
// And One user only can book that room once

if (roomCreatedScrollContainer) {
  document.addEventListener("DOMContentLoaded", () => {
    for (const user of users) {
      if (currentUser === user.username && user.role === "Staff") {
        for (const room of rooms) {
          insertRoom(room, roomCreatedScrollContainer);
        }
      }

      if (currentUser === user.username && user.role === "Student") {
        for (const room of rooms) {
          let isBooked = false;
          if (room.isApprove && room.isLaunch) {
            for (const booking of room.bookedTime) {
              if (booking.user === currentUser) isBooked = true;
            }
            if (!isBooked) insertRoom(room, roomCreatedScrollContainer);
            isBooked = false; //restore
          }
        }

        // Counting the children count to impleme nt no book room msg
        if (roomCreatedScrollContainer.childElementCount === 1) {
          noroom();
        }
      }
    }
  });
}

// Insert room booked if the room is booked by login user
if (roomBookedScrollContainer) {
  document.addEventListener("DOMContentLoaded", () => {
    for (const room of rooms) {
      if (room.bookedTime.length !== 0) {
        for (const booking of room.bookedTime) {
          if (booking.user === currentUser) {
            insertRoom(room, roomBookedScrollContainer);
          }
        }
      }
    }

    // Counting the children count to implement no book room msg
    if (roomBookedScrollContainer.childElementCount === 1) {
      nobookroom();
    }
    if (roomBookedScrollContainer.childElementCount > 1) {
      gotbookroom();
    }
  });
}
// Create room change start
let roomNameValid = true;
let roomPaxValid = true;
let roomDateCreatedValid = true;
let roomStartTimeValid = true;
let roomEndTimeValid = true;
let roomPriceValid = true;

function restoreCreateRoomCondition() {
  roomNameValid = true;
  roomPaxValid = true;
  roomDateCreatedValid = true;
  roomStartTimeValid = true;
  roomEndTimeValid = true;
  roomPriceValid = true;
}

function checkCreateRoomValid() {
  if (
    createRoomCreateBtn.getAttribute("value") === "Create" &&
    createRoomCreateLaunchBtn.getAttribute("value") === "Create and Launch"
  ) {
    for (const room of rooms) {
      if (createRoomRoomName.value === room.roomName) {
        roomNameValid = false;
      }
    }
  }

  if (createRoomRoomName.value.length === 0) {
    roomNameValid = false;
  }

  if (createRoomPax.value.length === 0 || Number(createRoomPax.value) < 1) {
    roomPaxValid = false;
  }

  let currentDate = new Date();
  let inputDate = new Date(createRoomDateCreated.value);
  let currentDateValue = currentDate.getTime();
  let inputDateValue = inputDate.getTime();

  if (
    createRoomDateCreated.value.length === 0 ||
    currentDateValue > inputDateValue
  ) {
    roomDateCreatedValid = false;
  }

  if (createRoomStartTime.value.length === 0) {
    roomStartTimeValid = false;
  }

  if (createRoomEndTime.value.length === 0) {
    roomEndTimeValid = false;
  }

  if (createRoomPrice.value.length === 0 || Number(createRoomPrice.value) < 1) {
    roomPriceValid = false;
  }
}

function createRoomErrorMsg() {
  alert(`One or more inputs are invalid! 
    ${roomNameValid === false ? "❌INVALID room name" : "✔️Valid room name"}
    ${
      roomPaxValid === false
        ? "❌Room pax should be MORE THAN 1"
        : "✔️Valid room pax"
    }
    ${roomDateCreatedValid === false ? "❌INVALID date" : "✔️Valid date"}
    ${
      roomStartTimeValid === false
        ? "❌Room start time is EMPTY"
        : "✔️Valid room start time"
    }
    ${
      roomEndTimeValid === false
        ? "❌Room end time is EMPTY"
        : "✔️Valid room end time"
    }
    ${
      roomPriceValid === false
        ? "❌ Room price should be MORE THAN $0"
        : "✔️Valid price"
    }`);
}

const createRoomBoxName = document.querySelector(".room-created__name-text");

function createRoomProcess(buttonClicked) {
  restoreCreateRoomCondition();
  checkCreateRoomValid();

  if (
    roomNameValid === false ||
    roomPaxValid === false ||
    roomDateCreatedValid === false ||
    roomStartTimeValid === false ||
    roomEndTimeValid === false ||
    roomPriceValid === false
  ) {
    createRoomErrorMsg();
  } else {
    if (
      createRoomCreateBtn.getAttribute("value") === "Create" &&
      createRoomCreateLaunchBtn.getAttribute("value") === "Create and Launch"
    ) {
      newRoomCreated = [
        0,
        createRoomRoomName.value,
        Number(createRoomPax.value),
        createRoomDateCreated.value,
        createRoomStartTime.value,
        createRoomEndTime.value,
        Number(createRoomPrice.value)
      ];

      console.log(newRoomCreated);

      createRoom = {
        roomNumber: newRoomCreated[0],
        roomName: newRoomCreated[1],
        maxPax: newRoomCreated[2],
        launchDate: [newRoomCreated[3]],
        availableTime: [newRoomCreated[4], newRoomCreated[5]],
        bookedTime: [],
        price: newRoomCreated[6],
        isLaunch: buttonClicked === createRoomCreateLaunchBtn ? true : false,
        isApprove: false
      };

      rooms.push(createRoom);
      storeLocalData("rooms", rooms);

      // Insert new created room in HTML
      insertRoom(createRoom, roomCreatedScrollContainer);

      closeModal();
      console.log("New room is created");
    } else {
      for (const room of rooms) {
        if (clickedRoom === room.roomName) {
          console.log("hello");
          room.roomNumber = 0;
          room.roomName = createRoomRoomName.value;
          room.maxPax = Number(createRoomPax.value);
          room.launchDate = [createRoomDateCreated.value];
          room.availableTime = [
            createRoomStartTime.value,
            createRoomEndTime.value
          ];
          room.bookedTime = [];
          room.price = Number(createRoomPrice.value);
          room.isLaunch =
            buttonClicked === createRoomCreateLaunchBtn ? true : false;
          room.isApprove = false;

          storeLocalData("rooms", rooms);
        }
      }
    }
  }
}

function createOrLaunch(button) {
  if (button.getAttribute("value") === "Confirm") {
    // if is confirm button from edit room, do nothing
    createRoomProcess(button);
    closeModal();
    return;
  }

  if (button.getAttribute("value") === "Confirm and Launch") {
    createRoomProcess(button);
    for (const room of rooms) {
      if (room.roomName === createRoomRoomName.value) {
        room.isLaunch = true;
        storeLocalData("rooms", rooms);

        searchElement("span", clickedRoom)
        let gonnaUpdate = currentElement.closest(".room-created").children[2]
        if (gonnaUpdate.classList.contains("button--red")){
          gonnaUpdate.classList.remove("button--red")
          gonnaUpdate.classList.add("button--green")
          gonnaUpdate.innerHTML = 'Launched'
        }
        break;
      }
    }

    closeModal();
    return;
  }
  createRoomProcess(button);
}

//Staff: Create Button
if (createRoomCreateBtn) {
  createRoomCreateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createOrLaunch(createRoomCreateBtn);
  });
}

//Staff: Create AND Launch Button
if (createRoomCreateLaunchBtn) {
  createRoomCreateLaunchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createOrLaunch(createRoomCreateLaunchBtn);
  });
}

function staffClickingEvent(target) {
  if (target.closest(".room-created")) {
    if (
      createRoomRoomName &&
      createRoomPax &&
      createRoomDateCreated &&
      createRoomStartTime &&
      createRoomEndTime &&
      createRoomPrice
    ) {
      // Replacing inputs
      for (const room of rooms) {
        if (room.roomName === clickedRoom) {
          createRoomRoomName.value = `${room.roomName}`;
          createRoomPax.value = `${room.maxPax}`;
          createRoomDateCreated.value = `${room.launchDate}`;
          createRoomStartTime.value = `${room.availableTime[0]}`;
          createRoomEndTime.value = `${room.availableTime[1]}`;
          createRoomPrice.value = `${room.price}`;
        }
      }

      const createRoomHeading = document.querySelector(".createRoom__heading");
      createRoomHeading.textContent = "Edit Room";
      createRoomCreateBtn.setAttribute("value", "Confirm");
      createRoomCreateLaunchBtn.setAttribute("value", "Confirm and Launch");
      createRoomCancelBtn.setAttribute("value", "Delete");
    }

    openModal();
  }
}

// Nigel Promo Code
//Promocode Modal open
const element12 = document.querySelector(".overlay4");
const element13 = document.querySelector(".modal4");

function showModal5() {
  element12.classList.remove("hidden");
  element13.classList.remove("hidden");
}

if (element12) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".createPromocode__createButton--input")) {
      showModal5();
    }
  });
}

//promocode Modal close
function hideModal5() {
  element12.classList.add("hidden");
  element13.classList.add("hidden");
}

if (element12) {
  document.addEventListener("click", function (event) {
    if (
      event.target.matches(".promocodecancel__canceledButton--input") ||
      event.target.matches(".overlay4")
    ) {
      hideModal5();
    }
  });
}

//promocode message Modal
const element14 = document.querySelector(".overlay6");
const element15 = document.querySelector(".modal6");

function showModal6() {
  element14.classList.remove("hidden");
  element15.classList.remove("hidden");
}
if (element14) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".promocode__createdButton--input")) {
      if (promoInput.value.length === 0) {
        return;
      }
      showModal6();
    }
  });
}

//close everything to show staff interface
function hideModal6() {
  element12.classList.add("hidden");
  element13.classList.add("hidden");
  element14.classList.add("hidden");
  element15.classList.add("hidden");
}
if (element12) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".overlay6") || event.target.matches(".modal6")) {
      hideModal6();
    }
  });
}

const createPromoBtn = document.querySelector(
  ".promocode__createdButton--input"
);
const cancelPromoBtn = document.querySelector(
  ".promocodecancel__canceledButton--input"
);
const promoTable = document.querySelector(".modaltable");
const promoInput = document.querySelector("#createPromocode_promoName");
const promoSelect = document.querySelector(".createPromocode__discount");

let newPromoCode, repeatPromoCode;

// onload insert promotable
if (promoTable) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("promotest");
    for (const code of promocodelist) {
      const row = promoTable.insertRow(-1);
      const leftCell = row.insertCell(0);
      const rightCell = row.insertCell(1);
      leftCell.innerHTML = code.name;
      rightCell.innerHTML = code.discount;
    }
  });
}

if (createPromoBtn) {
  createPromoBtn.addEventListener("click", (e) => {
    e.preventDefault();

    repeatPromoCode = false; //restore
    if (promoInput.value.length === 0) {
      alert("Please enter promocode name");
      showModal5();
      return;
    }
    newPromoCode = {
      name: promoInput.value,
      discount: promoSelect.value
    };
    console.log(newPromoCode);

    // Check repeat name and Store data
    for (const code of promocodelist) {
      if (code.name === promoInput.value) repeatPromoCode = true;
    }
    if (!repeatPromoCode) {
      promocodelist.push(newPromoCode);
      storeLocalData("promocodelist", promocodelist);
      // Insert into HTML
      const row = promoTable.insertRow(-1);
      const leftCell = row.insertCell(0);
      const rightCell = row.insertCell(1);
      leftCell.innerHTML = promoInput.value;
      rightCell.innerHTML = promoSelect.value;
    }

    promoInput.value = "";
    showModal6();
  });
}

//
//CODES FOR THE STUDENT ROLE
//

if (noroomtext) {
  if (rooms.length === 0) {
    noroom();
  } else {
    gotroom();
  }
}

// The error msg handling move to the insert room section make things easier and DRY
if (nobookroomtext) {
  if (rooms.length === 0) {
    nobookroom();
  }
}

// For adding in multiple bookedtime in viewRoom
const viewRoomBookedTimeSlot = document.querySelector(
  ".viewRoom__bookedTimeSlot"
);

const bookedTimeSlotHeading = document.querySelector(".viewRoom__bookedTimeSlot");
function studentClickingRoomEvent(target) {
  if (
    target.closest(".room-created") &&
    headerHeadingText.textContent.includes("Student")
  ) {
    if (
      viewRoomName &&
      viewRoomMaxCap &&
      viewRoomDate &&
      viewRoomTimeSpan &&
      viewRoomBookedTime &&
      viewRoomPrice
    ) {
      bookedTimeSlotHeading.classList.remove("hidden")
      // Replacing values
      for (const room of rooms) {
        if (room.roomName === clickedRoom) {
          viewRoomName.textContent = `${room.roomName}`;
          viewRoomMaxCap.textContent = `${room.maxPax}`;
          viewRoomDate.textContent = `${room.launchDate}`;
          viewRoomTimeSpan.textContent = `${room.availableTime[0]} to ${room.availableTime[1]}`;
          viewRoomBookedTimeSlot.innerHTML = `	<h4 class="viewRoom__bookedTimeSlot--text viewRoom_padding">Booked Time Slot</h4>
					<div class="viewRoom__line2 line2">
					</div>`;
          if (room.bookedTime.length !== 0) {
            for (const booking of room.bookedTime) {
              const html = `
                <p><span class="viewRoom__bookedTimeSlot--varible">${booking.time[0]} to ${booking.time[1]}</span></p>
                `;
              viewRoomBookedTimeSlot.insertAdjacentHTML("beforeend", html);
            }
          }
          if (room.bookedTime.length === 0) {
            bookedTimeSlotHeading.classList.add("hidden")
          }
         
          viewRoomPrice.textContent = `${room.price}`;
          break;
        }
      }
    }

    openModal();
    viewRoomTimeStart.value = "";
    viewRoomTimeEnd.value = "";
    viewRoomIntendedPax.value = "";
  }
}

// Not Updated
const editRoomName = document.querySelector(".editRoom__roomName--variable");
const editRoomMaxCap = document.querySelector(
  ".editRoom__maximumCapacity--varible"
);
const editRoomIntendedCap = document.querySelector(
  ".editRoom__intendedCapacity--input"
);
const editRoomDate = document.querySelector(".editRoom__date--varible");
const editRoomBookedStartTime = document.querySelector(
  ".editRoom__time1start--varible"
);
const editRoomBookedEndTime = document.querySelector(
  ".editRoom__time1end--varible"
);
const editRoomDiscountPrice = document.querySelector(
  ".editRoom__discountPrice--varible"
);

// The verification for which user have done
function studentClickingBookedRoomEvent(target) {
  if (target.closest(".room-booked")) {
    // Need to search for the current user data and replace the value of it
    for (const room of rooms) {
      if (room.roomName === clickedRoom) {
        editRoomName.innerText = `${room.roomName}`;
        editRoomMaxCap.textContent = room.maxPax;
        editRoomDate.textContent = `${room.launchDate}`;

        for (const booking of room.bookedTime) {
          if (booking.user === currentUser) {
            editRoomIntendedCap.value = booking.pax;
            editRoomBookedStartTime.textContent = `${booking.time[0]}`;
            editRoomBookedEndTime.textContent = `${booking.time[1]}`;
            editRoomDiscountPrice.textContent = `${booking.totalPrice}`;
          }
        }
      }
    }
  }
}

// Student book room button and verify && not complete yet
let inTimeRange = (t, { from, to }) =>
  from < to ? t > from && t < to : from < t || to > t;
let findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);
let clickedRoomAvailableTime = [];
let viewRoomBookTimeInput;
let viewRoomCorrectPax = true; //done
let viewRoomNoClashSlot = true;
let viewRoomHasInputTime = true; //done
let viewRoomCorrectFromTo = true; //done
let viewRoomCorrectInputTime = true; //done

function bookRoomErrorMessage() {
  if (!viewRoomHasInputTime) {
    alert(`One or more inputs are invalid!
  ${viewRoomCorrectPax ? "✔️ Valid room pax" : "❌ Invalid Room Pax"}
  ${viewRoomHasInputTime ? "✔️ Valid input time" : "❌ Invalid input time"}`);
  } else {
    alert(`One or more inputs are invalid!
  ${viewRoomCorrectPax ? "✔️ Valid room pax" : "❌ Invalid Room Pax"}
  ${
    viewRoomCorrectFromTo
      ? "✔️ Valid start and end time"
      : "❌ Invalid input time, start time is greater than end time"
  }
  ${
    viewRoomCorrectInputTime
      ? "✔️ Valid time range"
      : "❌ Invalid time range, selected booking time is out of available range"
  }
  ${
    viewRoomNoClashSlot
      ? "✔️ Valid time slot"
      : "❌ Invalid time slot, selected booking time slot is clashing with other time slot"
  }`);
  }
}

function restoreBookingCondition() {
  // restore condition
  viewRoomCorrectPax = true; //done
  viewRoomNoClashSlot = true;
  viewRoomHasInputTime = true; //done
  viewRoomCorrectFromTo = true; //done
  viewRoomCorrectInputTime = true; //done
}

// Check clashtime event
let alltime = [];
let duplicatedTime;
function checkClashTime() {
  // reset time
  alltime = [];
  duplicatedTime = [];

  // create an array to include all the available and booked slot
  for (const room of rooms) {
    if (room.roomName === clickedRoom) {
      alltime.push(...room.availableTime);
      for (const booking of room.bookedTime) {
        alltime.push(...booking.time);
      }
    }
  }
  alltime.push(...viewRoomBookTimeInput);
  alltime.sort();

  // Find Duplicates and then except the index 0 and index -1
  duplicatedTime = [...new Set(findDuplicates(alltime))];
  for (let x = 0; x < duplicatedTime.length; x++) {
    if (duplicatedTime[x] === alltime[0]) {
      duplicatedTime.splice(duplicatedTime[x], 1);
    }
    if (duplicatedTime[x] === alltime[alltime.length - 1]) {
      duplicatedTime.splice(duplicatedTime[x], 1);
    }
  }
  console.log(alltime, duplicatedTime);

  // Clash time bcoz there is same repeated booked time
  if (duplicatedTime.length !== 0) {
    viewRoomNoClashSlot = false;
    console.log(`Repeating Time`, viewRoomNoClashSlot);
  }

  // Another scenario is bookedTimeslot within a large timeslot
  // clear the 1st and last data
  alltime.splice(0, 1);
  alltime.splice(-1, 1);
  // make a for loop to check all the index in array verify every is 1 difference
  if (
    alltime.indexOf(viewRoomBookTimeInput[1]) -
      alltime.indexOf(viewRoomBookTimeInput[0]) !==
    1
  ) {
    viewRoomNoClashSlot = false;
    console.log(`viewRoomNoClashSlot`, viewRoomNoClashSlot);
  }

  for (const room of rooms) {
    if (room.roomName === clickedRoom) {
      for (const booking of room.bookedTime) {
        if (
          alltime.indexOf(booking.time[1]) -
            alltime.indexOf(booking.time[0]) !==
          1
        ) {
          viewRoomNoClashSlot = false;
          console.log(
            `Selected Time Slot is within other booked slot`,
            viewRoomNoClashSlot
          );
        }
      }
    }
  }
}

function bookRoomProcess() {
  restoreBookingCondition();

  for (const room of rooms) {
    if (room.roomName === clickedRoom) {
      clickedRoomAvailableTime = [
        { from: room.availableTime[0], to: room.availableTime[1] }
      ];
    }
  }

  if (
    viewRoomTimeEnd.value.length !== 0 &&
    viewRoomTimeStart.value.length !== 0
  ) {
    // Get User Input Time
    viewRoomBookTimeInput = [viewRoomTimeStart.value, viewRoomTimeEnd.value];
    console.log(viewRoomBookTimeInput);
    // Store for bookingSummary use
    storeLocalData("viewRoomBookTimeInput", viewRoomBookTimeInput);

    // Verify from < to
    if (viewRoomBookTimeInput[0] > viewRoomBookTimeInput[1]) {
      viewRoomCorrectFromTo = false;
      console.log("From < to ", viewRoomCorrectFromTo);
    }

    // if there is a input, verify the either start or end is within timerange
    let inputSameAsStart = false;
    let inputSameAsTo = false;
    let wrongInputTimeCount = 0;
    for (const time of viewRoomBookTimeInput) {
      if (time === clickedRoomAvailableTime[0].from) {
        console.log("same as start");
        inputSameAsStart = true;
      }
      if (time === clickedRoomAvailableTime[0].to) {
        console.log("same as to");
        inputSameAsTo = true;
      }

      const value = clickedRoomAvailableTime.find((r) => inTimeRange(time, r));
      console.log(value);
      if (!value) wrongInputTimeCount++;

      // Return undefined === wrong time
      // if (!value) viewRoomCorrectInputTime = false;
      // console.log('correct time', viewRoomCorrectInputTime);
    }
    if (inputSameAsStart || inputSameAsTo) {
      if (inputSameAsStart && inputSameAsTo) {
        viewRoomCorrectInputTime = true;
        console.log("Someone books from start or end");
      }
      if (wrongInputTimeCount === 1) {
        viewRoomCorrectInputTime = true;
        console.log("Someone books either start or end");
      }
    }
    if (!inputSameAsStart && !inputSameAsTo) {
      if (wrongInputTimeCount !== 0) {
        viewRoomCorrectInputTime = false;
        console.log("Someone books out of time range");
      }
      if (wrongInputTimeCount === 0) {
        viewRoomCorrectInputTime = true;
        console.log("Someone books within time range");
      }
    }
  } else {
    // Return false if no time input and store
    viewRoomHasInputTime = false;
    console.log("has input time", viewRoomHasInputTime);
  }

  if (viewRoomBookTimeInput) {
    checkClashTime();
  }

  // Verify correct pax input
  if (
    viewRoomIntendedPax.value > +viewRoomMaxCap.textContent ||
    viewRoomIntendedPax.value.length === 0
  )
    viewRoomCorrectPax = false;
  else storeLocalData("viewRoomIntendedPax", viewRoomIntendedPax.value); //store for booking summary

  // Error message
  if (
    !viewRoomCorrectPax ||
    !viewRoomNoClashSlot ||
    !viewRoomHasInputTime ||
    !viewRoomCorrectFromTo ||
    !viewRoomCorrectInputTime
  ) {
    bookRoomErrorMessage();
  } else {
    closeModal();

    restoreBookingCondition();

    viewRoomTimeStart.value = "";
    viewRoomTimeEnd.value = "";
    viewRoomIntendedPax.value = "";
    window.location = "bookingSummary.html";
  }
}

// Student: Book Room Btn
if (viewRoomBookBtn) {
  viewRoomBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    bookRoomProcess();
  });
}

// Student : Edit Booked Room Confirm Btn
const editRoomConfirmBtn = document.querySelector(
  ".editRoom__confirmButton--input"
);

if (editRoomConfirmBtn) {
  editRoomConfirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Check if intended value <= max pax
    if (+editRoomIntendedCap.value <= +editRoomMaxCap.textContent) {
      for (const room of rooms) {
        if (room.roomName === clickedRoom) {
          for (const booking of room.bookedTime) {
            if (booking.user === currentUser) {
              booking.pax = editRoomIntendedCap.value;
              console.log(booking);
              storeLocalData("rooms", rooms);
              closeModal2();
            }
          }
        }
      }
    } else {
      alert("❌ Invalid Room Pax");
    }
  });
}

// Student : Cancel Booking Yes Btn, Delete HTML and Update Rooms && Local
// And Insert the room back to available room container
const cancelBookingYesBtn = document.querySelector(
  ".cancelRoom__yesButton--input"
);

if (cancelBookingYesBtn) {
  cancelBookingYesBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchElement("span", clickedRoom);
    const gonnaDelete = currentElement.closest(".room-booked");

    // Delete the currentUser bookedRoom in room.bookedTime and update local
    for (const room of rooms) {
      if (room.roomName === clickedRoom) {
        room.bookedTime = room.bookedTime.filter(
          (booking) => booking.user !== currentUser
        );
        storeLocalData("rooms", rooms);

        // Insert room back
        insertRoom(room, roomCreatedScrollContainer);
      }
    }

    gonnaDelete.outerHTML = "";

    // if delete all booked room
    if (roomBookedScrollContainer.childElementCount === 1) nobookroom();

    if (roomCreatedScrollContainer.childElementCount !== 1) {
      gotroom();
    }
  });
}

// Student : Booking Summary, Replace value
const summaryName = document.querySelector(
  ".bookingSummary__roomName--variable"
);
const summaryMaxPax = document.querySelector(
  ".BookingSummary__maximumCapacity--varible"
);
const summaryIntendPax = document.querySelector(
  ".bookingSummary__intendedCapacity--varible"
);
const summaryDate = document.querySelector(".bookingSummary__date--varible");
const summaryStart = document.querySelector(
  ".bookingSummary__time1start--varible"
);
const summaryEnd = document.querySelector(".bookingSummary__time1end--varible");
const summaryHourlyPrice = document.querySelector(
  ".bookingSummary__price--varible"
);
const summaryTotalPrice = document.querySelector(
  ".bookingSummary__totalPrice--varible"
);
const summaryPromoInput = document.querySelector(
  ".bookingSummary__promoCode--input"
);
const summaryPromoBtn = document.querySelector(
  ".bookingSummary__promoCode_apply--input"
);
const summaryDiscPrice = document.querySelector(
  ".bookingSummary__discountPrice--varible"
);
const summarConfirmBtn = document.querySelector(
  ".bookingSummary__confirmButton--input"
);
const summarCancelBtn = document.querySelector(
  ".bookingSummary__cancelButton--input"
);
const summarBackToHomeBtn = document.querySelector(
  ".bookingSummary__backtohome"
);

function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  const startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  const diff = endDate.getTime() - startDate.getTime();

  const hours = format(diff / 1000 / 60 / 60);
  return hours;
}

const format = (num, decimals) =>
  num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

if (summaryName) {
  document.addEventListener("DOMContentLoaded", (e) => {
    // Retrieve data
    getLocalData("clickedRoom");
    clickedRoom = lastestLocalData;
    getLocalData("viewRoomIntendedPax");
    viewRoomIntendedPaxLocal = lastestLocalData;
    getLocalData("viewRoomBookTimeInput");
    viewRoomBookTimeInput = lastestLocalData;

    for (const room of rooms) {
      if (room.roomName === clickedRoom) {
        summaryName.textContent = room.roomName;
        summaryMaxPax.textContent = room.maxPax;
        summaryIntendPax.textContent = viewRoomIntendedPaxLocal;
        summaryDate.textContent = room.launchDate;
        summaryStart.textContent = viewRoomBookTimeInput[0];
        summaryEnd.textContent = viewRoomBookTimeInput[1];
        summaryHourlyPrice.textContent = room.price;
        summaryTotalPrice.textContent = `${format(
          diff(...viewRoomBookTimeInput) * +room.price
        )}`;

        // no promo yet

        if (!summaryPromoInput.value)
          summaryDiscPrice.textContent = summaryTotalPrice.textContent;
      }
    }
  });
}

// Student Apply promo
if (summaryPromoBtn) {
  summaryPromoBtn.addEventListener("click", (e) => {
    let wrongPromoCode = false;
    for (const code of promocodelist) {
      if (code.name === summaryPromoInput.value) {
        summaryDiscPrice.textContent = `${format(
          +summaryTotalPrice.textContent *
            ((100 - +code.discount.slice(0, 2)) / 100)
        )}`;
        wrongPromoCode = false;
        break;
      } else {
        wrongPromoCode = true;
      }
    }
    if (wrongPromoCode) alert("Invalid Promo Code.");
    wrongPromoCode = false;
  });
}
// Student : Booking Summary book room confirm
// AFter confirm update rooms and store to local
if (summarConfirmBtn) {
  summarConfirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newBookRoom = {
      user: currentUser,
      time: viewRoomBookTimeInput,
      totalPrice: +summaryDiscPrice.textContent,
      pax: +summaryIntendPax.textContent
    };

    // Error handling if user ady book (accidentally refresh)
    let summaryRepeatBooking = false;
    for (const room of rooms) {
      if (room.roomName === clickedRoom) {
        for (const booking of room.bookedTime) {
          if (booking.user === currentUser) {
            summaryRepeatBooking = true;
            alert(`Yo, you repeat booking, logout la`);
          }
        }
        if (!summaryRepeatBooking) {
          room.bookedTime.push(newBookRoom);
          console.log(room, rooms);
          storeLocalData("rooms", rooms);
        }
      }
    }
    // Restore condition
    summaryRepeatBooking = false;
  });
}

// Back to student Interface
if (summarCancelBtn) {
  summarCancelBtn.addEventListener("click", (e) => {
    window.location = "studentInterface.html";
  });
}

if (summarBackToHomeBtn) {
  summarBackToHomeBtn.addEventListener("click", (e) => {
    window.location = "studentInterface.html";
  });
}

// Select element from text function
function searchElement(element, text) {
  const xpath = `//${element}[text()='${text}']`;
  const matchingElement = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  currentElement = matchingElement;
}

// Staff: Delete room from HTML, LocalStorage, temp let rooms if button is delete
if (createRoomCancelBtn) {
  createRoomCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Dont delete and do nothing when button is cancel
    if (createRoomCancelBtn.getAttribute("value") === "Cancel") {
      return;
    }

    // link xpath with clickedroom, and search the element
    searchElement("span", clickedRoom);
    console.log(currentElement.closest(".room-created"));

    // find the closest parent of currentElement to roomcreated
    const gonnaDelete = currentElement.closest(".room-created");

    // Delete the room in rooms
    rooms = rooms.filter((room) => room.roomName !== clickedRoom);
    console.log(rooms);

    // Update in local storage
    storeLocalData("rooms", rooms);

    // Delete the the selected room container
    gonnaDelete.outerHTML = "";
  });
}

//nigel editroom

const element3 = document.querySelector(".modal-background2");
const element4 = document.querySelector(".overlay2");

function closeModal2() {
  element3.classList.add("hidden");
  element4.classList.add("hidden");
}

if (element3 && element4) {
  document.addEventListener(
    "click",
    function (event) {
      if (
        !element3.classList.contains(".hidden") &&
        !element4.classList.contains(".hidden")
      ) {
        if (
          event.target.matches(".closeButton") ||
          event.target.matches(".modal-background2") ||
          // event.target.matches(".createRoom__cancelButton--input") ||
          event.target.matches(".editRoom__cancelButton--input")
        ) {
          console.log("Hello");
          closeModal2();
        }
      }
    },
    false
  );

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        !element3.classList.contains(".hidden") &&
        !element4.classList.contains(".hidden")
      ) {
        if (event.key === "Escape") {
          closeModal2();
        }
      }
    },
    false
  );
}

function openModal2() {
  element3.classList.remove("hidden");
  element4.classList.remove("hidden");
}

if (element3 && element4) {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".room-booked")) {
      openModal2();
    }
  });
}

// double confirm cancel
const element5 = document.querySelector(".cancelRoom__yesNo");
const element6 = document.querySelector(".cancelRoom__yesMessage");
const element9 = document.querySelector(".cancelRoom__inputs");

function showCancelled() {
  element5.classList.add("hidden");
  element6.classList.remove("hidden");
  element9.classList.add("hidden");
}

if (element9) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".cancelRoom__yesButton--input")) {
      showCancelled();
    }
  });
}

//show confirm modal
const element7 = document.querySelector(".overlay3");
const element8 = document.querySelector(".modal3");

function showConfirmCancel() {
  element7.classList.remove("hidden");
  element8.classList.remove("hidden");
}

if (element7) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".editRoom__cancelButton--input")) {
      showConfirmCancel();
    }
  });
}

// Cancel the booing -- no
function hideModal3() {
  element7.classList.add("hidden");
  element8.classList.add("hidden");
}

if (element8) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".cancelRoom__noButton--input")) {
      hideModal3();
    }
  });
}

//hide overlay for booking has been cancelled
function hideModal4() {
  element7.classList.add("hidden");
  element8.classList.add("hidden");
  element5.classList.remove("hidden");
  element6.classList.remove("hidden");
  element9.classList.remove("hidden");
}

function showModal4() {
  element6.classList.add("hidden");
}
if (element8) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".overlay3") || event.target.matches(".modal3")) {
      hideModal4();
      showModal4();
    }
  });
}
//booking summary confirm
const elementBookingsum1 = document.querySelector(
  ".bookingSummary__maximumCapacity"
);
const elementBookingsum2 = document.querySelector(
  ".bookingSummary__confirmRemove"
);
const elementBookingsum3 = document.querySelector(".bookingSummary__inputs");
const elementBookingsum4 = document.querySelector(
  ".bookingSummary__backtohome"
);

function confirmBookingSummary() {
  elementBookingsum1.classList.add("hidden");
  elementBookingsum2.classList.add("hidden");
  elementBookingsum3.classList.add("hidden");
  elementBookingsum4.classList.remove("hidden");
}

if (elementBookingsum1) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(".bookingSummary__confirmButton--input")) {
      confirmBookingSummary();
    }
  });
}

//
//CODES FOR THE SUPERUSER ROLE
//

const bookedRoomTimeSlotsContainer = document.querySelector(
  ".bookingSlotsList__container"
);

//Load Room
if (roomLaunchedListContainer) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Superuser Page Loaded!");
    for (const room of rooms) {
      let status = "";
      let className = "";
      if (room.isLaunch === true && room.isApprove === false) {
        status = "Pending Approval";
        className = "pending";
      }
      if (
        room.isLaunch === true &&
        room.isApprove === true &&
        room.bookedTime.length === 0
      ) {
        status = "Approved";
        className = "approved";
      }
      if (
        room.isLaunch === true &&
        room.isApprove === true &&
        room.bookedTime.length !== 0
      ) {
        status = "Booked";
        className = "booked";
      }

      if (room.isLaunch === true) {
        insertRoomForSuperuser(
          room,
          roomLaunchedListContainer,
          className,
          status
        );
      }
    }
  });
}

const filterBackground = document.querySelector(".modal-background2");
const filterOverlay = document.querySelector(".overlay2");
const roomDetailsBtnBackground = document.querySelector(".modal-background3");
const roomDetailsBtnOverlay = document.querySelector(".overlay3");
const filterBtn = document.querySelector(".filterbtnpos");
const detailBtn = document.querySelector(".detailbtnpos");
const filterRoomCancelBtn = document.querySelector(
  ".filterRoom__cancelButton--input"
);
const filterRoomApplyFilterBtn = document.querySelector(
  ".filterRoom__bookButton--input"
);
const roomDetailsOkBtn = document.querySelector(".bookingSlotsList__inputs");
const filterRoomSelectRoomContainer = document.querySelector(
  ".filter__checkboxes"
);

if (roomDetailsOkBtn) {
  roomDetailsOkBtn.addEventListener("click", (e) => {
    console.log("Room details ok button clicked!");

    if (superUserRoomDetailsRoomApprovalStatus.checked === true) {
      for (const room of rooms) {
        if (room.roomName === clickedRoom) {
          room.isApprove = true;
          break;
        }
      }
      searchElement('span', clickedRoom);
      let gonnaUpdate = currentElement.closest(".room-launched").children[2].children[0]
      if (gonnaUpdate.classList.contains("tag--pending")) {
        gonnaUpdate.classList.remove("tag--pending");
        gonnaUpdate.classList.add("tag--approved");
        gonnaUpdate.innerHTML = 'Approved'
      }
    }

    storeLocalData("rooms", rooms);

    bookedRoomTimeSlotsContainer.innerHTML = "";

    closeRoomDetailsBtnModal();
  });
}

if (roomDetailsBtnBackground && roomDetailsBtnOverlay) {
  document.addEventListener(
    "click",
    function (event) {
      if (
        !roomDetailsBtnBackground.classList.contains(".hidden") &&
        !roomDetailsBtnOverlay.classList.contains(".hidden")
      ) {
        if (
          event.target.matches(".closeButton") ||
          event.target.matches(".modal-background3")
        ) {
          closeRoomDetailsBtnModal();
        }
      }
    },
    false
  );

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        !roomDetailsBtnBackground.classList.contains(".hidden") &&
        !roomDetailsBtnOverlay.classList.contains(".hidden")
      ) {
        if (event.key === "Escape") {
          closeRoomDetailsBtnModal();
        }
      }
    },
    false
  );
}

function openFilterModal() {
  filterOverlay.classList.remove("hidden");
  filterBackground.classList.remove("hidden");
}

function openRoomDetailsBtnModal() {
  roomDetailsBtnBackground.classList.remove("hidden");
  roomDetailsBtnOverlay.classList.remove("hidden");
}

function closeFilterModal() {
  filterBackground.classList.add("hidden");
  filterOverlay.classList.add("hidden");
}

function closeRoomDetailsBtnModal() {
  roomDetailsBtnBackground.classList.add("hidden");
  roomDetailsBtnOverlay.classList.add("hidden");
}

if (filterBtn) {
  filterBtn.addEventListener("click", (e) => {
    for (const room of rooms) {
      if (room.isLaunch === true) {
        console.log(room.roomName);
        const html4 = `
        <div class="filterroom__roomNamebox"><input class="filterroom__subbox" type="checkbox" value="${room.roomName}"><span>${room.roomName}</span></div>
        `;

        filterRoomSelectRoomContainer.insertAdjacentHTML("beforeend", html4);
      }
    }
    openFilterModal();
    console.log("Filter Btn clicked!");
  });
}

const filterRoomSelectedStartDate = document.querySelector(
  ".filterRoom__dateStart--input"
);
const filterRoomSelectedEndDate = document.querySelector(
  ".filterRoom__dateEnd--input"
);
const filterRoomPendingApprovalCheckBox = document.querySelector(
  ".pendingApproval__checkbox"
);
const filterRoomApprovedCheckBox = document.querySelector(
  ".approved__checkbox"
);
const filterRoomBookedCheckBox = document.querySelector(".booked__checkbox");

if (filterRoomCancelBtn) {
  filterRoomCancelBtn.addEventListener("click", (e) => {
    console.log("Filter room cancel button clicked!");
    filterRoomSelectRoomContainer.innerHTML = `
    `;

    filterRoomSelectedStartDate.value = "";
    filterRoomSelectedEndDate.value = "";
    filterRoomPendingApprovalCheckBox.checked = false;
    filterRoomApprovedCheckBox.checked = false;
    filterRoomBookedCheckBox.checked = false;

    closeFilterModal();
  });
}

if (filterRoomApplyFilterBtn) {
  filterRoomApplyFilterBtn.addEventListener("click", (e) => {
    console.log("Filter room apply filter button clicked!");

    roomLaunchedListContainer.innerHTML = ``;

    let filterRoomArray = filterRoomSelectRoomContainer.querySelectorAll(
      ".filterroom__subbox"
    );
    let selectedRoomArray = [];
    let selectedStatusArray = [];

    for (const x of filterRoomArray) {
      if (x.checked === true) {
        selectedRoomArray.push(x.value);
      }
    }

    if (selectedRoomArray.length === 0) {
      for (const x of filterRoomArray) {
        selectedRoomArray.push(x.value);
      }
    }

    console.log(selectedRoomArray);

    if (filterRoomSelectedStartDate.value === "") {
      filterRoomSelectedStartDate.value = "1970-01-01";
    }

    if (filterRoomSelectedEndDate.value === "") {
      filterRoomSelectedEndDate.value = "2050-12-31";
    }

    let filterRoomSelectedStartDateInput = new Date(
      filterRoomSelectedStartDate.value
    );
    let filterRoomSelectedEndDateInput = new Date(
      filterRoomSelectedEndDate.value
    );

    let filterRoomSelectedStartDateValue = filterRoomSelectedStartDateInput.getTime();
    let filterRoomSelectedEndDateValue = filterRoomSelectedEndDateInput.getTime();

    if (filterRoomPendingApprovalCheckBox.checked === true) {
      selectedStatusArray.push(filterRoomPendingApprovalCheckBox.value);
      console.log(filterRoomPendingApprovalCheckBox.value);
    }

    if (filterRoomApprovedCheckBox.checked === true) {
      selectedStatusArray.push(filterRoomApprovedCheckBox.value);
      console.log(filterRoomApprovedCheckBox.value);
    }

    if (filterRoomBookedCheckBox.checked === true) {
      selectedStatusArray.push(filterRoomBookedCheckBox.value);
      console.log(filterRoomBookedCheckBox.value);
    }

    if (
      filterRoomPendingApprovalCheckBox.checked === false &&
      filterRoomApprovedCheckBox.checked === false &&
      filterRoomBookedCheckBox.checked === false
    ) {
      filterRoomPendingApprovalCheckBox.checked = true;
      filterRoomApprovedCheckBox.checked = true;
      filterRoomBookedCheckBox.checked = true;
      selectedStatusArray.push(filterRoomPendingApprovalCheckBox.value);
      selectedStatusArray.push(filterRoomApprovedCheckBox.value);
      selectedStatusArray.push(filterRoomBookedCheckBox.value);
    }

    console.log(selectedStatusArray);

    for (const room of rooms) {
      let filterRoomRoomLaunchedDate = new Date(room.launchDate);
      let filterRoomRoomLaunchedDateValue = filterRoomRoomLaunchedDate.getTime();

      let status = "";
      let className = "";
      if (room.isLaunch === true && room.isApprove === false) {
        status = "Pending Approval";
        className = "pending";
      }
      if (
        room.isLaunch === true &&
        room.isApprove === true &&
        room.bookedTime.length === 0
      ) {
        status = "Approved";
        className = "approved";
      }
      if (
        room.isLaunch === true &&
        room.isApprove === true &&
        room.bookedTime.length !== 0
      ) {
        status = "Booked";
        className = "booked";
      }

      for (const x of selectedRoomArray) {
        if (room.roomName === x) {
          if (
            filterRoomRoomLaunchedDateValue >=
              filterRoomSelectedStartDateValue &&
            filterRoomRoomLaunchedDateValue <= filterRoomSelectedEndDateValue
          ) {
            for (const y of selectedStatusArray) {
              if (status === y) {
                insertRoomForSuperuser(
                  room,
                  roomLaunchedListContainer,
                  className,
                  status
                );
              }
            }
          }
        }
      }
    }

    filterRoomSelectRoomContainer.innerHTML = `
    `;

    filterRoomSelectedStartDate.value = "";
    filterRoomSelectedEndDate.value = "";
    filterRoomPendingApprovalCheckBox.checked = false;
    filterRoomApprovedCheckBox.checked = false;
    filterRoomBookedCheckBox.checked = false;

    closeFilterModal();
  });
}

const superUserRoomDetailsRoomName = document.querySelector(
  ".editRoom__roomName--variable"
);
const superUserRoomDetailsRoomMaxCapacity = document.querySelector(
  ".editRoom__maximumCapacity--varible"
);
const superUserRoomDetailsRoomDate = document.querySelector(
  ".editRoom__date--varible"
);
const superUserRoomDetailsRoomAvailableBookingTime = document.querySelector(
  ".editRoom__availableBookingTimeRange--varible"
);
const superUserRoomDetailsRoomApprovalStatus = document.querySelector(
  ".cmn-toggle"
);
const superUserRoomDetailsRoomPrice = document.querySelector(
  ".editRoom__discountPrice--varible"
);
const superUserRoomDetailsBookingStartTime = document.querySelector(
  ".bookingSlotsList__time1start--varible"
);
const superUserRoomDetailsBookingEndTime = document.querySelector(
  ".bookingSlotsList__time1end--varible"
);
const superUserBookingSlotsList = document.querySelector(".bookingSlotsList");

function superuserClickingEvent(target) {
  if (target.closest(".detailbtnpos")) {
    console.log("Room Details Btn clicked!");

    if (
      superUserRoomDetailsRoomName &&
      superUserRoomDetailsRoomMaxCapacity &&
      superUserRoomDetailsRoomDate &&
      superUserRoomDetailsRoomAvailableBookingTime &&
      superUserRoomDetailsRoomApprovalStatus &&
      superUserRoomDetailsRoomPrice &&
      superUserRoomDetailsBookingStartTime &&
      superUserRoomDetailsBookingEndTime
    ) {
      // Replacing inputs
      for (const room of rooms) {
        if (room.roomName === clickedRoom) {
          console.log(room.availableTime[0]);
          superUserRoomDetailsRoomName.textContent = `${room.roomName}`;
          superUserRoomDetailsRoomMaxCapacity.textContent = `${room.maxPax}`;
          superUserRoomDetailsRoomDate.textContent = `${room.launchDate}`;
          superUserRoomDetailsRoomAvailableBookingTime.textContent = `${String(
            room.availableTime[0]
          )} to ${String(room.availableTime[1])}`;
          superUserRoomDetailsRoomPrice.textContent = `${room.price}`;

          if (room.isApprove === true) {
            superUserRoomDetailsRoomApprovalStatus.checked = true;
          } else {
            superUserRoomDetailsRoomApprovalStatus.checked = false;
          }

          if (room.bookedTime.length === 0) {
            superUserBookingSlotsList.classList.add("hidden");
          } else {
            if (superUserBookingSlotsList.classList.contains("hidden")) {
              superUserBookingSlotsList.classList.remove("hidden");
            }
            bookedRoomTimeSlotsContainer.innerHTML = "";

            for (let i = 0; i < room.bookedTime.length; i++) {
              const html3 = `
                  <p class="bookingSlotsList__selectedtime1--text" for="time1">
                    <span class="bookingSlotsList__time1start--varible">${String(
                      room.bookedTime[i].time[0]
                    )}</span> to
                    <span class="bookingSlotsList__time1end--varible">${String(
                      room.bookedTime[i].time[1]
                    )}</span>
                  </p>
                   `;

              bookedRoomTimeSlotsContainer.insertAdjacentHTML(
                "beforeend",
                html3
              );
            }
          }
        }
      }
    }

    openRoomDetailsBtnModal();
    console.log("RoomDetailsModal Opened!");
  }
}

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
  }
}


// =================================================================== //
// ===================== Sender Name and Message ===================== //
// =================================================================== //


var form = document.getElementById("sender_form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var senderName = document.querySelector("#name").value;
    if (!senderName) {
      alert("Name field cannot be empty");
    }
    else {
      localStorage.setItem('senderName', senderName);
      window.location.href = "/chatroom/";
    }
  });
}

var senderName = localStorage.getItem('senderName');


var form = document.getElementById("message_form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = document.querySelector("#message").value;
    if (!message) {
      alert("Enter message!");
    }
    else {
      var url = '/chat/' + senderName + '/' + message + '/';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            document.querySelector("#message").value = "";
          }
        }
      };
      xhr.send();
    }
  });
}


// ======================================================================= //
// ===================== Time Interval: Fetch Message ==================== //
// ======================================================================= //


// let response = await fetch(`/get_chat/${CHANNEL}/${sessionStorage.getItem('lang')}/${sessionStorage.getItem('name')}`);



var chatBox = document.querySelector('.chat-box');
var profileName = document.querySelector('.profile-details');
if (chatBox) {
  setInterval(async () => {
    let response = await fetch(`/chatdata/`);
    let chatdata = await response.json();
    console.log(chatdata.chats);
    var parsedData = JSON.parse(chatdata.chats);
    var senderName = localStorage.getItem('senderName');
    var innerDom = '';
    var headerProfile = `
      <p class="tag">${senderName[0].toUpperCase()}</p>
      <div class="name">${senderName}</div>
      `;
    profileName.innerHTML = headerProfile;
    parsedData.forEach(function (item) {
      var fields = item.fields;

      var timestamp = fields.date_time;
      var date = new Date(timestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var amOrPm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var formattedTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + amOrPm;
      if (fields.sender == senderName) {
        innerDom += `
      <div class="my-chat chat">
            <div class="info">
                <p class="name">${fields.sender}</p>
                <p class="tag">${fields.sender[0].toUpperCase()}</p>
            </div>
            <div class="msg">
                <p class="message">${fields.message}</p>
                <p class="time">${formattedTime}</p>
            </div>
      </div>`
      }
      else {
        innerDom += `
      <div class="user-chat chat">
            <div class="info">
                <p class="tag">${fields.sender[0].toUpperCase()}</p>
                <p class="name">${fields.sender}</p>
            </div>
            <div class="msg">
                <p class="message">${fields.message}</p>
                <p class="time">${formattedTime}</p>
            </div>
      </div>`
      }
      chatBox.innerHTML = innerDom;
      chatBox.scrollTop = chatBox.scrollHeight;
    });

    // ===================== Populate ChatBox with messages ==================== //


  }, 3000);

}







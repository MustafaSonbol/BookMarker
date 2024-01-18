var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkUrlInput = document.getElementById("bookmarkUrlInput");
var searchInput = document.getElementById("searchInput");
var bookmarkList = [];
if (JSON.parse(localStorage.getItem("bookmarks"))) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}
// **************************************************Adding A Bookmark************************************************
function addBookmark() {
  if (nameValidation() && urlValidation()) {
    var bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    console.log(bookmarkList);
    display();
    clear();
  }
}
// **************************************************Displaying bookmark list ************************************************
function display() {
  var cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `
    <tr>
    <td>${i}</td>
    <td>${bookmarkList[i].name}</td>
    <td><a href="https://${bookmarkUrlInput.value}" target="_blank"><button class="btn bg-success visit text-white"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>
    <td><button onclick="deleteBookmark(${i})" class="btn bg-danger delete text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
</tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}
// **************************************************Input Clear Function ************************************************
function clear() {
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkNameInput.classList.remove("is-valid");
  nameAlert.classList.add("d-none");
  bookmarkUrlInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-valid");
  urlAlert.classList.add("d-none");
}
//*************************************************Input Delete Function ************************************************
function deleteBookmark(index) {
  var number = index;
  bookmarkList.splice(number, 1);
  display();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
}
//*************************************************Input Validation ************************************************
function nameValidation() {
  var nameRegex = /^[a-z]{3,13}$/i;
  var nameAlertRegex = document.getElementById("nameAlert");
  if (nameRegex.test(bookmarkNameInput.value)) {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkNameInput.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}
function urlValidation() {
  var urlRegex = /^(www\.)?[a-z]{3,13}\d*(\.com)$/i;
  if (urlRegex.test(bookmarkUrlInput.value)) {
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    urlAlert.classList.add("d-none");
    return true;
  } else {
    bookmarkUrlInput.classList.remove("is-valid");
    bookmarkUrlInput.classList.add("is-invalid");
    urlAlert.classList.remove("d-none");
    return false;
  }
}
//*************************************************Input Search ****************************************************
function SearchBookmark(keyword) {
  var keyword = searchInput.value;
  var cartona = "";
  // var keyword = document.getElementById("searchInput").value;
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
      cartona += `
    <tr>
    <td>${i}</td>
    <td>${bookmarkList[i].name}</td>
    <td><a href="https://${bookmarkUrlInput.value}" target="_blank"><button class="btn bg-success visit text-white"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>
    <td><button onclick="deleteBookmark(${i})" class="btn bg-danger delete text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
</tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = cartona;
}

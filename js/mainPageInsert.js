$(document).ready(function () {
  alert("ready yoo");
});
function insertNew() {
  alert("insert new task");
  //code that will call the ajax to get the task from the input box
  let task = $("#task").val();
  let status = $("#status").val();
  //ToDo: add error checking
  alert(`t:${task} s:${status}`);
  //Use AJAX to call back-end
  //POST to 127.0.0.1:3000 -> body taskand status in ajax
  let URL = "http://127.0.0.1:3000/tasks";
  let d = {
    task: `${task}`,
    status: `${status}`,
  };
  $.ajax({
    url: URL,
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(d),
    success: function (data) {
      let oStr = "<h2> Success </h2>";
      console.log(`Success`);
      console.log(data);
    },
    error: function (xhr, status, error) {
      alert("Error");
      console.log(`AJAX ERROR`);
      console.log(error);
    },
  });
}

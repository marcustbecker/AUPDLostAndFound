//ToDo: review to take this out
function startIt() {
  alert("LETSGOOOOO");
}

function deleteIt(id) {
  alert(`delete ${id}`);
  //AJAX call the delete id=id
  //delete -> verb -> DELETE
  //tasks/id
  //ToDo: Need to error check the ID
  let URL = `http://127.0.0.1:3000/tasks/${id}`;
  $.ajax({
    url: URL,
    contentType: "application/json",
    type: "DELETE",
    success: function (data) {
      console.log("SUCCESS");
      console.log(data);
      oStr = `<span style="color:red"> ${data.message}</span>`;
      $("ajaxResults").html(oStr);
      alert("Success");
      window.location.reload();
    },
    error: function (xhr, status, error) {
      console.log("Error");
      window.location.reload();
    },
  });
}

function updateIt(id, task, status) {
  alert(`UPDATE IT ${id}`);
  let oStr = `<h2> Update of id: ${id} </h2>`;
  oStr += `<input type="text" name="task" id="task" value="${task}">`;
  oStr += `<input type="text" name="status" id="status" value="${status}">`;
  oStr += `<button type="button" class="btn btn-primary" onClick="sendTheUpdate(${id})">Update ${id}</button>`;
  $("#results").html(oStr);
}

function sendTheUpdate(id) {
  alert(`SendTheUpdateIT! ${id}`);
  let task = $("#task").val();
  let status = $("#status").val();

  let URL = `http://127.0.0.1:3000/tasks/${id}`;
  let d = {
    task: `${task}`,
    status: `${status}`,
  };
  $.ajax({
    url: URL,
    contentType: "application/json",
    type: "PUT",
    data: JSON.stringify(d),
    success: function (data) {
      let oStr = "<h2> Success </h2>";
      console.log(`Success`);
      console.log(data);
      alert("SUCCESS");
      window.location.reload();
    },
    error: function (xhr, status, error) {
      alert("Error");
      console.log(`AJAX ERROR`);
      console.log(error);
    },
  });

  // PUT with the ID -> 127.0.0.1:3000/12
}

$(document).ready(function () {
  alert("Document Loaded");
  //ajax code here to start the tasks
  let id = document.getElementById("taskArea");
  let URL = "http://127.0.0.1:3000/tasks";
  $.ajax({
    url: URL,
    headers: { "Access-Control-Allow-Origin": "*" }, // <-------- set this
    contentType: "application/json",
    async: true,
    crossDomain: true,
    success: function (data) {
      let oStr = `<h2> Available Tasks </h2>`;
      oStr += "<table border='1'>";
      oStr += `<tr><th>ID</th><th>Task</th><th>Status<th>Created At</th></tr>`;
      alert("success");
      console.log(`data:`);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let ti = data[i].id;
        let t = data[i].task;
        let s = data[i].status;
        let c = data[i].created_at;

        oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}<td>${c}</td>`;
        oStr += `<td><button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button></td>`;
        oStr += `<td><button type="button" class="btn btn-primary" onClick="updateIt('${ti}', '${t}', '${s}')">Update ${ti} </button></td>`;
        oStr += `</tr>`;
      }
      oStr += `</table>`;
      id.innerHTML = oStr;
    },
    error: function (xhr, status, error) {
      alert("Error");
    },
  });
  console.log(`URL : ${URL}`);
  id.innerHTML = "Results are here";
});

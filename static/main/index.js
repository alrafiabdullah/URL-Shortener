document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");

  const mainForm = document.querySelector("#mainForm");
  const processed = document.querySelector(".processed");

  processed.style.display = "none";

  mainForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Clicked!");

    let csrfToken = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
      type: "POST",
      url: "/process",
      data: {
        mainURL: $("#mainURL").val(),
        csrfmiddlewaretoken: csrfToken,
        credentials: "include",
      },

      success: function (response) {
        console.log(response);

        processed.style.display = "block";

        processed.innerHTML = `
            <h5>Your processed link is ready!</h5>
            <a href="${response.message}">${response.message}</a>
        `;
      },

      error: function (err) {
        console.log(JSON.stringify(err));
      },
    });
  });
});

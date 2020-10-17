document.addEventListener("DOMContentLoaded", () => {
  const mainForm = document.querySelector("#mainForm");
  const processed = document.querySelector(".processed");

  processed.style.display = "none";

  mainForm.addEventListener("submit", function (e) {
    e.preventDefault();
    processed.style.display = "none";

    let csrfToken = $("input[name=csrfmiddlewaretoken]").val();

    $.ajax({
      type: "POST",
      url: "/process",
      data: {
        mainURL: $("#mainURL").val(),
        choice: $("#shortener").val(),
        csrfmiddlewaretoken: csrfToken,
        credentials: "include",
      },

      success: function (response) {
        processed.style.display = "block";

        if (response.message === "failed") {
          processed.innerHTML = `
              <h5 class="alert alert-danger">Please enter a GitHub link and try again!</h5>
          `;
        } else {
          processed.innerHTML = `
              <div class="alert alert-success">
                <h5>Your processed link is ready!</h5>
                <a id="shortened" target="_blank" href="${response.message}">${response.message}</a><span> (Opens in a new window)</span>
                <button class="btn btn-info" id="copy">Copy Link</button>
              </div>
          `;
          const copyButton = document.querySelector("#copy");

          $("#copy").click(function (e) {
            e.preventDefault();

            $.ajax({
              type: "POST",
              url: "/copy",
              data: {
                mainURL: `${response.message}`,
                csrfmiddlewaretoken: csrfToken,
                credentials: "include",
              },

              success: function (response) {
                const newDiv = document.createElement("div");
                newDiv.innerHTML = `
                  <div class="alert alert-info">
                    <h3>The URL has been copied to your clipboard!</h3>
                  </div>
                `;
                processed.append(newDiv);
              },

              error: function (err) {
                console.log(JSON.stringify(err));
              },
            });
          });
        }
      },

      error: function (err) {
        console.log(JSON.stringify(err));
      },
    });
  });
});

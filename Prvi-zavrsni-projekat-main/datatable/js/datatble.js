
$(document).ready(function () {
    $("#destinations-tbl").DataTable(function () {
        var request = $.get("http://localhost:3000/destinations");
        request.done(function (data) {
            $.each(data, function (key, item) {
                $("tbody").append(` <tr>
                        <td>${item.destinationName}</td>
                        <td>${item.startingDate}</td>
                        <td>${item.duration}</td>
                        <td>${item.price}</td>
                        <td>
                          <button id = "${item.id}"
                            type="button"
                            class="btn btn-outline btn-booking"
                            data-toggle="modal"
                            data-target="#detailsModal"
                          >
                            View Details
                          </button>
                        </td>
                        <td>
                          <button
                            id="id = "${item.id}"
                            type="button"
                            class="btn btn-outline btn-booking"
                            data-toggle="modal"
                            data-target="#resModal"
                          >
                            Make Reservation
                          </button>
                        </td>
                      </tr>`)

            });
        });
    });
});

$(document).ready(function () {
    $("#view-res").click(function () {
        let req = $.ajax({
            type: "GET",
            url: "booking1.html",
        });
        req.done(function (data) {
            $("#swap-tables").html(data);
        });
        req.fail(function (err) {
            $("#swap-tables").text(err.statusText);
        });
    });
}); //greska u konzoli *verovatno* zbog <script> tagova u html-u koji get-ujem

$(document).ready(function () {
    var request = $.ajax({
        type: "GET",
        url: "http://localhost:3000/reservations",
    });
    request.done(function (data) {
        $.each(data, function (key, value) {
            $("tbody").append(`
            <tr>
              <td>${value.name}</td>
              <td>${value.surname}</td>
              <td>${value.reservedDestination}</td>
              <td>${value.price} €</td>
              <td>${value.note}</td>
              <td>
                <button id="${value.id}"
                  onclick="changeReservation()"
                  type="button"
                  class="btn btn-outline btn-booking"
                  data-toggle="modal"
                  data-target="#detailsModal"
                >
                  Change <br />
                  Reservation
                </button>
              </td>
              <td>
                <button id="res${value.id}"
                  type="button"
                  class="btn btn-outline btn-booking"
                  data-toggle="modal"
                  data-target="#resModal"
                >
                  Delete <br />
                  Reservation
                </button>
              </td>
            </tr>`);
        });
        $("#reservationsTable").DataTable({
            responsive: true,
        });

        request.fail(function (err) {
            $("tbody").text(err.status + ":" + err.statusText);
        });
    });
});
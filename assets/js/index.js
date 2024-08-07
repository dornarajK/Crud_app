$(document).ready(function () {
    // Handle the form submission for adding a user
    $("#add_user").submit(function (event) {
        alert('Data inserted Successfully!');
    });

    // Handle the form submission for updating a user
    $("#update_user").submit(function (event) {
        event.preventDefault();

        var unindexed_array = $(this).serializeArray();
        var data = {};

        $.map(unindexed_array, function (n, i) {
            data[n['name']] = n['value'];
        });

        var request = {
            "url": `/api/users/${data.id}`, // Use relative URL
            "method": "PUT",
            "data": data
        };

        $.ajax(request).done(function (response) {
            alert('Data Updated Successfully!');
        });
    });

    // Handle the delete functionality on the homepage
    if (window.location.pathname == "/") {
        $(".table tbody td a.delete").click(function () {
            var id = $(this).attr('data-id');

            var request = {
                "url": `/api/users/${id}`, // Use relative URL
                "method": "DELETE"
            };

            if (confirm("Do you really want to delete this record?")) {
                $.ajax(request).done(function (response) {
                    alert('Data Deleted Successfully!');
                    location.reload();
                });
            }
        });
    }
});

$(document).ready(function () {
    function refresh() {
        $.ajax({
            url: "http://localhost:/rank",
            success: function (results) {
                console.log(results);
            }
        })
    }

    refresh();
    
})

$(function () {

    var showBugs = function (bugArray) {
        bugArray = bugArray || [];
        if (bugArray.length > 0) {
            $('#tip').text('You have ' + bugArray.length + ' numbers of bugs ');
            var tableHtml = _.map(bugArray, function (bug) {
                return "<div>" +
                    "<a target='_blank' href='http://61.161.238.158:8071/zentaopms/www/index.php?m=bug&f=view&bugID=" + bug.id + "'><strong>#" + bug.id + "</strong></a>" +
                    "<span>" + bug.title + "</span>" +
                    "</div>";
            });

            $('#list').html(tableHtml.join('<hr/>'));
        }
    };

    var update = function () {
        fetchBugs(core.url, function (error, data) {
            if (error) {
                $('#tip').text("Opps,I got some error");
                $('#list').html('');
            } else {
                localStorage.bugs = JSON.stringify(data.bugs);
                showBugs(data.bugs);
            }
        });
    };

    $('#update-button').click(update);

    showBugs(JSON.parse(localStorage.bugs || '[]'));
});






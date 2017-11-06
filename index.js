
$(function () {
    chrome.storage.local.get('configuration', function (storage) {
        if (_.isEmpty(storage.configuration)) {
            return requireOption();
        }

        var configuration = storage.configuration;

        var showBugs = function (bugArray, isShowTip) {
            bugArray = bugArray || [];
            if (bugArray.length > 0) {
                $('#tip').text('You have ' + bugArray.length + ' numbers of bugs ');
                var tableHtml = _.map(bugArray, function (bug) {
                    return "<div>" +
                        "<a target='_blank' href='" + getBugUrl(configuration.bugUrl, bug.id) + "'><strong>#" + bug.id + "</strong></a>" +
                        "<span>" + bug.title + "</span>" +
                        "</div>";
                });

                $('#list').html(tableHtml.join('<hr/>'));
            } else {
                if (isShowTip) {
                    alert('No more bugs found');
                }
            }
        };


        showBugs(JSON.parse(localStorage.bugs || '[]'));

        $('#update-button').click(function () {
            fetchBugs(configuration.serviceUrl, function (error, data) {
                if (error) {
                    $('#tip').text("Opps,I got some error");
                    $('#list').html('');
                } else {
                    localStorage.bugs = JSON.stringify(data.bugs);
                    showBugs(data.bugs, true);
                }
            });
        });
        $('#openSiteButton').click(function () {
            chrome.tabs.create({
                url:configuration.siteUrl
            });
        });
    });
});






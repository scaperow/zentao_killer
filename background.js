var task = function () {
    fetchBugs(core.url, function (error, data) {

        if (error) {
            new Notification("Zentao Bug Killer", {
                body: error,
                icon: 'images/icon48.png',
                tag: {}
            });
        } else {
            var newBugs = _.difference(_.pluck(data.bugs, 'id'), _.pluck(JSON.parse(localStorage.bugs || '[]'), 'id'));

            if (newBugs.length > 0) {
                var notification = new Notification("", {
                    body: 'You have ' + (newBugs.length) + 'numbers of new Bugs',
                    icon: 'images/icon48.png',
                    tag: {}
                });

                notification.onclick = function () {
                    window.open(core.pageUrl);
                };
            }
        }

        chrome.browserAction.setBadgeText({ text: (data.bugs.length > 0 ? data.bugs.length + '' : '') });
        localStorage.bugs = JSON.stringify(data.bugs);
        setTimeout(task, 5000);
    });
};

chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });
task();


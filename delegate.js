/**
 * fetch datas
 * @param {*} callback 
 * @param {String} fetchUrl
 * @requires jQuery
 */
var fetchBugs = function (fetchUrl, callback) {
    $.ajax({ url: core.url, dataType: 'json' })
        .done(function (responseData, textStatus, jqXHR) {
            callback(null, JSON.parse(responseData.data));
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            callback(errorThrown);
        });
};

var requireOption = function () {
    chrome.tabs.create({
        url: 'options.html'
    });
};

var getBugUrl = function () {
    var url = null;
    if (localStorage.monitorUri) {
        requireOption();
    } else {
        url = localStorage.monitorUri;
    }

    return url;
};

var getServiceUrl = function () {

};

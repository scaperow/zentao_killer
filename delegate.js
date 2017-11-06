/**
 * fetch datas
 * @param {*} callback 
 * @param {String} fetchUrl
 * @requires jQuery
 */
var fetchBugs = function (fetchUrl, callback) {
    $.ajax({ url: fetchUrl, dataType: 'json' })
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

/**
 * 
 * @param {String} bugId 
 */
var getBugUrl = function (bugUrl, bugId) {
    return bugUrl.replace('${0}', bugId);
};

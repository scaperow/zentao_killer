$(function () {
    $('#domain').val(localStorage.domain || '');

    $('#form').on('submit', function () {
        localStorage.domain = $('#domain').val();
    });
});

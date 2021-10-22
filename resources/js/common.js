

function izanagi(_action, _method, _data, _params, _callback) {

    var protocol = window.location.protocol;
    var hostname = window.location.hostname;

    var options = {
        baseURL: protocol + "//" + hostname + "/", url: _action, method: _method
    };

    if (typeof _data === 'object') {

        if (_data instanceof FormData) {
            options.headers = {};
            options.headers['Content-Type'] = 'multipart/form-data';
            options.data = _data;
        } else {
            options.data = qs.stringify(_data);
        }
    }

    if (typeof _params === 'object') {
        options.params = _params;
    }

    axios(options)
        .then(function (response) {
            setTimeout(function () {
                hideProgress();
            }, 500);
            if (typeof _callback == 'function') {
                _callback(response);
            }
        })
        .catch(function (error) {
            setTimeout(function () {
                hideProgress();
            }, 500);
            swalAlert('失敗しました。', 'error');

        });
}
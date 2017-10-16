kindpakketApp.filter('pretty_json', function() {
    return function(_in) {
        return JSON.stringify(_in, null, '    ');
    }
});

kindpakketApp.filter('to_fixed', function() {
    return function(_in, size) {
        return parseFloat(_in).toFixed(size);
    }
});
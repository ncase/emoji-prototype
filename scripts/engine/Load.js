(function(){

// Get the path to the JSON
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Load it & make it the model
var path = getParameterByName("model");
reqwest({
    url: path,
    type: 'json', 
    method: 'get',
    error: function(err){},
    success: function(model){
		Model.init(model);
	}
});

})();
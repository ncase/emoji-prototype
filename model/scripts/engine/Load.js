(function(){

// Get the path to the JSON
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Local or Remote or URL?
var path, local, remote, url;
if(local = getParameterByName("local")){ // note: assignment
    path = "models/"+local+".json";
}else if(remote = getParameterByName("remote")){ // also: assignment
    path = Save.baseURL+remote+".json?print=pretty";
}else if(url = getParameterByName("url")){ // yup: assignment
    path = url;
}else{
    path = "models/the_example.json";
}

// Load it & make it the model
reqwest({
    url: path,
    type: 'json', 
    method: 'get',
    error: function(err){},
    success: function(model){

        // UGH, FIREBASE DOESN'T ACTUALLY STORE ARRAYS
        // HENCE, SOME HACKY CODE TO DEAL WITH THE FACT
        // THAT EMPTY ARRAYS AREN'T SAVED OR STORED
        // JUST PLOP THOSE ARRAYS IN.

        // Recursive: every state, and action within, must have actions.
        // Yeah this over-does it, but whatever.
        var _mustHaveActions = function(array){
            for(var i=0;i<array.length;i++){
                var item = array[i];
                item.actions = item.actions || [];
                _mustHaveActions(item.actions);
            }
        };
        _mustHaveActions(model.states);

        // Now init 'em
		Model.init(model);

	}
});

})();
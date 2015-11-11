(function(exports){

var firebaseURL = 'https://torrid-inferno-877.firebaseio.com/models/';
var myDataRef = new Firebase(firebaseURL);

///////////////////

exports.Save = {};

Save.baseURL = firebaseURL;
Save.uploadModel = function(){

    var saved = myDataRef.push(Model.data,function(){
        publish("/save/success");
        console.log(firebaseURL+saved.key()+".json?print=pretty");
    });

};

})(window);
/* JavaScript */

/*
	This is just some sample code to show you how to use the
	filedata API and an event handler. Feel free to start fresh!
*/

var CURRENT_PATH = "/";

navigateToPath(CURRENT_PATH);


function navigateToPath(path) {
    filedata.getFilesForPath(path, function(err, files)
    {
        console.log(err);
        console.log(files);
        console.log(files[0]);
        console.log(files[0].name);
        if(err)
        {
            $("#log-output").text("ERROR: " + JSON.stringify(err));
        }
        else
        {
            buildFileList(files);
            $("#path-box").val(path);
        }
    });
}

function buildFileList(files) {
    var filesUl = $('<ul/>');
    for(i = 0; i < files.length; i++) {
        var file = files[i];
        var fileLi = $('<li/>');

        var link = $("<a/>");

        console.log(file);
        console.log(file.name);
        link.text(file.name);

        fileLi.append(link);
        filesUl.append(fileLi);
    };
    $("#files-window").empty();
    $("#files-window").append(filesUl);
}

$("#go-button").on('click', function() {
    var path = $("#path-box").val();
    console.log(path);
    navigateToPath(path);
});











$("button").on("click", function()
{
    filedata.getFilesForPath("/", function(err, files)
    {
    	if(err)
    	{
    		$("pre").text("ERROR: "+JSON.stringify(err));
    	}
    	else
    	{
    		$("pre").text(JSON.stringify(files, null, "\t"));
    	}
    });
});

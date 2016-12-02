/* JavaScript */

var CURRENT_PATH;
init();


function init() {
    navigateToPath('/');

    $("#go-button").on('click', function() {
        var path = $("#path-box").val();
        //TODO: path validation ?
        navigateToPath(path);
    });

    $("#up-button").on('click', upALevel);
}


function upALevel() {
    var pathArray = CURRENT_PATH.split('/');
    pathArray.splice(-1,1);
    var newPath = pathArray.join('/');
    if (newPath == '') {
        newPath = '/';
    }
    navigateToPath(newPath);
}

function navigateToPath(path) {
    filedata.getFilesForPath(path, function(err, files) {
        if(err) {
            $("#log-output").text("ERROR: " + JSON.stringify(err));
        }
        else {
            CURRENT_PATH = path;
            buildFileList(files);
            $("#path-box").val(CURRENT_PATH);
            $("#log-output").text('');
        }
    });
}

function buildFileList(files) {
    var filesUl = $('<ul/>');

    for(i = 0; i < files.length; i++) {
        var file = files[i];
        var fileLi = $('<li/>');
        var link = $("<a></a>");

        link.text(file.name);
        if(file.isFolder) {
            link.attr('is-folder', true);
            link.attr('folder-name', file.name);
        }

        fileLi.append(link);
        filesUl.append(fileLi);
    };

    filesUl.on('click', "a", navigateIntoFolder);

    $("#files-window").empty();
    $("#files-window").append(filesUl);
}

function navigateIntoFolder(e) {
    if(!e.target) {
        return;
    }
    var folderLink = $(e.target);
    if(folderLink.attr('is-folder')) {
        var newPath = CURRENT_PATH;
        var folder = folderLink.attr('folder-name');
        if(newPath == '/') {
            newPath += folder;
        }
        else {
            newPath += '/' + folder
        }
        navigateToPath(newPath);
    }
}













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

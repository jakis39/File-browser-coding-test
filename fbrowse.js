/* JavaScript */

var CURRENT_PATH;
var ICON_PATH = 'assets/images/';
var ICON_NAMES = {
    'folder' : 'Folder-48.png',
    'file'   : 'File-48.png',
    'audio'  : 'Audio-File-48.png',
    'video'  : 'Video-File-48.png'
}
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
        var fileLi = generateListItem(files[i]);
        filesUl.append(fileLi);
    };

    filesUl.on('click', "a", navigateIntoFolder);

    $("#files-window").empty();
    $("#files-window").append(filesUl);
}

function generateListItem(data) {
    var fileLi = $('<li/>');
    var link = $("<a></a>");
    var icon = determineIconAsset(data.isFolder, data.name);
    link.append($('<img src="' + icon + '" class="file-icon" />'));
    link.append($('<span class="file-name">' + data.name + '</span>'));

    if(data.isFolder) {
        link.attr('is-folder', true);
        link.attr('folder-name', data.name);
    }
    else if (data.size) {
        var formattedSize = formatFileSize(data.size);
        link.append($('<span class="file-size">' + formattedSize + '</span>'));
    }

    fileLi.append(link);
    return fileLi;
}

function determineIconAsset(isFolder, filename) {
    if (isFolder) {
        return ICON_PATH + ICON_NAMES.folder;
    }
    else {
        var nameParts = filename.split('.');
        var ext = nameParts[nameParts.length - 1];
        var iconName;
        switch (ext) {
            case "mp3":
                iconName = ICON_NAMES.audio;
                break;
            case "mp4":
                iconName = ICON_NAMES.video;
                break;
            default:
                iconName = ICON_NAMES.file;
                break;
        }
        return ICON_PATH + iconName;
    }
}

function formatFileSize(size) {
    var suffix;
    if (size < 1048576) {
        size = size / 1024;
        suffix = " KB";
    }
    else if (size < 1073741824) {
        size = size / 1048576;
        suffix = " MB";
    }
    else {
        size = size / 1073741824;
        suffix = " GB";
    }
    size = Math.round(size * 100) / 100
    return size + suffix;
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

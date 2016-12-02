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
    $("#up-button").on('click', upALevel);
    $("#breadcrumb-container").on('click','a', navigateToCrumb);
}

function upALevel() {
    if(CURRENT_PATH == '/') {
        return;
    }
    var pathArray = CURRENT_PATH.split('/');
    pathArray.splice(-1,1);
    var newPath = pathArray.join('/');
    if (newPath == '') {
        newPath = '/';
    }
    navigateToPath(newPath);
}

function navigateToPath(path) {
    if(path == CURRENT_PATH) {
        return;
    }
    filedata.getFilesForPath(path, function(err, files) {
        if(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }
        else {
            console.log('success');
            CURRENT_PATH = path;
            buildFileList(files);
            buildBreadcrumb();
            $("#log-output").text('');
        }
    });
}

function buildBreadcrumb() {
    var container = $("#breadcrumb-container");
    container.empty();

    if(CURRENT_PATH == '/') {
        var newCrumb = createCrumb(0, '/');
        container.append(newCrumb);
        return;
    }
    var pathArray = CURRENT_PATH.split('/');

    for(i = 0; i < pathArray.length; i++) {
        var crumbText = pathArray[i] ? pathArray[i] : '/';
        var newCrumb = createCrumb(i, crumbText);
        container.append(newCrumb);

        if(i < pathArray.length -1) {
            var divider = $('<span/>');
            divider.addClass('crumb-divider');
            divider.append($('<img src="assets/images/Chevron-Right-48.png"/>'));
            container.append(divider);
        }
    }
}

function createCrumb(level, text) {
    var newCrumb = $("<a/>");
    newCrumb.addClass('breadcrumb-link');
    newCrumb.attr('level', level);
    newCrumb.text(text);
    return newCrumb;
}

function navigateToCrumb(e) {
    if(!$(e.target).attr('level')) {
        return;
    }
    var level = $(e.target).attr('level');

    if(level == 0) {
        navigateToPath('/');
        return;
    }

    var newPath = '';
    var pathArray = CURRENT_PATH.split('/');
    for(i=1; i <= level; i++) {
        newPath += '/' + pathArray[i];
    }
    navigateToPath(newPath);
}

function buildFileList(files) {
    var filesUl = $('<ul/>');

    for(i = 0; i < files.length; i++) {
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

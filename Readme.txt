Web Dev Coding Test
===================

Create a simple JavaScript application that allows the user to navigate a file
system -- i.e. like Finder (Mac) or Explorer (Windows). Just navigation. No need
to provide any additional features, just the ability to "visit" folders and see
their contents.

Use the provided HTML, JS, CSS structure as a starting point. jQuery is
included. Use it if you like. Feel free to include other 3rd party libraries
too, but avoid ones that do too much rendering of content; that's kind of what
we're testing here.

The file system is provided for you in the form of JavaScript API. See below
for details.

Add a bit of CSS to make it look nice. Feel free to show off your CSS chops!

File System
-----------
The file system API is a very basic with a single function:

filedata.getFilesForPath( path, callback )

    path: String - the path whose child files/folders you want

    callback: Function(err, files) - function that gets called to provide the
              results. If an error occurs then err will be an error message,
              but will otherwise be null. The files argument will be an array
              of objects representing files or folders.

Example:

    filedata.getFilesForPath("/Documents", function(err, files) {
        console.log("Error: ", err);
        console.log("Files: ", files);
    });

Paths are Unix-style paths beginning with slash (/) -- i.e. /Documents/tax stuff/invoices
The root path is represented as /.

/* JavaScript */

/*
	This is just some sample code to show you how to use the
	filedata API and an event handler. Feel free to start fresh!
*/

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

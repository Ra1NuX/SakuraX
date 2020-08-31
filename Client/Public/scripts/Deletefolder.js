$DeleteFolder = $('.DeleteFolder')

$DeleteFolder.click(()=>{

    $.ajax({
    type: "POST",
    url: "/DeleteFolder",
    data: { "path": "Path"},
    success: (response) => {
        console.log('Deleted');
    }
})
})
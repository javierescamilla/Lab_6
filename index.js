let myURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDL_aesiIp-Xw2fA4u6LQVhbmtvWOsJYTU&part=snippet&maxResults=10&q=";
let newLink
let nextPage
let prevPage
let pageCounter = 0

function searchForVideos(){
    $("#SearchButton").on("click",function(e){
        $("ul").empty()
        pageCounter = 0;
        let keyword = $("#TextInput").val()
        newLink = myURL+keyword;
        createResponse(newLink)
        newLink = newLink + '&pageToken='
        e.preventDefault();
    });
    $("#Prev").on("click",function(e){
        if(pageCounter != 0){
            $("ul").empty()
            createResponse(newLink + prevPage)
            pageCounter = pageCounter - 1;
        }
        e.preventDefault();
    });
    $("#Next").on("click",function(e){
        $("ul").empty()
        createResponse(newLink + nextPage)
        e.preventDefault();
        pageCounter = pageCounter + 1;
    });
}

function createResponse(myURL){
    $.ajax({
        url:(myURL), //url/endpointToAPI,
        method: "GET", 
        data: {}, //Info sent to the API
        dataType : "json", //Returned type od the response
        ContentType : "application/json", //Type of sent data in the request (optional)
        success : function(responseJSON){
            loadPage(responseJSON);
            nextPage = responseJSON.nextPageToken
            if(pageCounter != 0){
                prevPage = responseJSON.prevPageToken
            }
        }, 
        error: function(err){
            console.log(err);
        }
    });
}

function loadPage(json){
    for(var i = 0; i < json.pageInfo.resultsPerPage; i++){
        let baseURL = 'https://www.youtube.com/watch?v=';
        let videoId = json.items[i].id.videoId;
        $("ul").append(`
                        <p id="VideoName"> ${json.items[i].snippet.title} </p>
                        <img src= "${json.items[i].snippet.thumbnails.medium.url}" onclick = "window.open('${baseURL + videoId}')" />
                    `);
    }	
}

searchForVideos()
document.getElementById('myform').addEventListener('submit',saveBookmark);


function saveBookmark(e){

    var sitename=document.getElementById('sitename').value;
    var siteurl=document.getElementById('siteurl').value;

    var bookmark={
        name:sitename,
        url:siteurl
    }

    if(localStorage.getItem('bookmarks')===null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else{
        console.log(localStorage.getItem('bookmarks'));
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    //always keep this
    e.preventDefault();
}

function fetchBookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

    var results=document.getElementById('results');
    results.innerHTML='';

    for(var i=0;i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;
        //results.innerHTML+=name
        results.innerHTML+= '<div class="well">'+
            '<h3>'+name+'</h3>'+
            ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
            ' <a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a> '+
            '</div>';
    }
}

function deleteBookmark(url){

    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

function searchBookmarks(){
    var name=document.getElementById('searchitem').value.toUpperCase();
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    var results=document.getElementsByClassName('well');
    for(var i=0;i<results.length;i++){
        var res=results[i].getElementsByTagName("h3")[0];
        if(res){
            console.log(res.innerHTML.toUpperCase().indexOf(name));
            if(res.innerHTML.toUpperCase().indexOf(name) == -1){
                results[i].style.display="none";
            }
            else{
                results[i].style.display="";
            }
        }
    }
}


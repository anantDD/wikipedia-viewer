  var url;
  $("#search").click(function(){
      
    //removing everything
    hide("centeredDIV");
    
    //placing the searchbox
    $('body').append("<div id=searchBar><form id='frm1'><input type='text' placeholder='press enter to search'  style='color:gray width:100%'></form><br><br><button id='backOne'>Go back</button></div>") ;
    
    $("#backOne").click(function(){
                        goBack("searchBar","centeredDIV");
                        });
    
    $("#searchBar").keypress(function(event){
    if(event.which==13)
        { 
     //getting the value from the searchbox
      var x = document.getElementById("frm1");
      var text = x[0].value;
               
    //url for calling the api
         url="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+text+"&srprop=snippet&callback=?";
    
    //api call jsonp        
    $.getJSON(url, function(jsonp){
      
              var textA='<ul>';
              var hrefWiki='';
        for (i=0;i<jsonp.query.search.length;i++){
          hrefWiki="https://en.wikipedia.org/wiki/"+jsonp.query.search[i].title;
          textA+="<li><a href='"+hrefWiki+"' target='_blank'>"+jsonp.query.search[i].title + "</a><br>" + jsonp.query.search[i].snippet+ "</li><br>";
              }
      hide("searchBar");// refreshing the page to load search results
        $("body").append('<div  style="text-align:left" id="jsonp-response"></div>');
        $("#jsonp-response").html(textA+"<br><button id=backTwo>Go Back</button>");//search results
     
        $("#backTwo").click(function(){
                    goBack("jsonp-response","searchBar");
                    });
     
    });//end of get JSON
   
      return false;
     }
  });// End of searchbox
 
    
});// end of click function
  
function hide(id){
          document.getElementById(id).style.display = "None";     
               };

function goBack(hidden,shown) {
  var a='#'+hidden;  
  $(a).remove();
  
  document.getElementById(shown).style.display = "";

}
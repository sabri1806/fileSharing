$(document).ready(function(){
  $(".google").click(function(e){
   var f=this.id;
   e.preventDefault();
  $('<form action="/download" method="POST">' + 
    '<input type="hidden" name="file" value="' + f + '">' +
    '</form>').submit();
      return false;
    });
});
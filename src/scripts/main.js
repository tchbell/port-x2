$(document).ready(function(){
    
//    $('.port-pix').waypoint({
//      handler: function(direction) {
//        $('.pic-left').addClass('pic-left-visible');
//      }
//    })
    
    //animation on scroll
    $('.wp-1').waypoint(function(direction){
        $('.pic-left').addClass('pic-left-visible');
    }, 
        {
        offset: '50%'
    });
    

    
    
    
    
})
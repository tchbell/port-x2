$(document).ready(function(){
    
    //sticky nav
    var skillsSection = $('#skills').offset().top /1.1;
    $(document).on('scroll', function(){
        if($(document).scrollTop() > skillsSection){
           $('nav').addClass('navbar-fixed-top sticky');
        }else if($(document).scrollTop() < skillsSection){
            $('nav').removeClass('navbar-fixed-top sticky');
        }
    })
    
    //slow scroll
    $('nav ul li a').click(function () {
        var href = $(this).attr('href');
        $('html, body').animate({ 
            scrollTop: $(href).offset().top
        }, 1000);
        return false;
    });
    
    //animation on scroll
    //pic1
    var picScroll = $('.pic-left-1').offset().top / 1.5;
    $(document).on('scroll', function() {
        if($(document).scrollTop() > picScroll){
            $('.pic-left-1').removeClass('pic-left-hidden');
        }
    })    
    
    //pic2
    var picScrollRight1 = $('.pic-right-1').offset().top / 1.5;
    $(document).on('scroll', function() {
        if($(document).scrollTop() > picScrollRight1){
            $('.pic-right-1').removeClass('pic-right-1-hidden');
        }
    })   
    
    //pic3
    var picScrollLeft2 = $('.pic-left-2').offset().top / 1.3;
    $(document).on('scroll', function() {
        if($(document).scrollTop() > picScrollLeft2){
            $('.pic-left-2').removeClass('pic-left-2-hidden');
        }
    }) 
    
    //pic4
    var picScrollRight2 = $('.pic-right-2').offset().top / 1.5;
    $(document).on('scroll', function() {
        if($(document).scrollTop() > picScrollRight2){
            $('.pic-right-2').removeClass('pic-right-2-hidden');
        }
    }) 
    
    
    //hover skills icons
    //github icon
    $('.github-skill').hover(function(){
        if($('.github').hasClass('ion-social-github')){
            $('.github').toggleClass('ion-social-octocat');
           }
    })
    
    //github contact icon
    $('.github-contact').hover(function(){
        if($('.github-contact-icon').hasClass('ion-social-github')){
            $('.github-contact-icon').toggleClass('ion-social-octocat');
           }
    })
    
    //jquery icon
    $('.jquery-skill').hover(function(){
        if($('.jquery-icon').attr("src", "../images/jquery.png")){
            $('.jquery-icon').attr("src", "../images/jquery -color.png");
        }
    }, function(){
        $('.jquery-icon').attr("src", "../images/jquery.png")
        }
    );
    
    //gulp icon
    $('.gulp-skill').hover(function(){
        if($('.gulp-icon').attr("src", "../images/gulp-icon.png")){
            $('.gulp-icon').attr("src", "../images/gulp-pink.png");
        }
    }, function(){
        $('.gulp-icon').attr("src", "../images/gulp-icon.png")
        }
    );
    
    //chrome icon
    $('.chrome-skill').hover(function(){
        if($('.chrome-icon').attr("src", "../images/chrome-black.png")){
            $('.chrome-icon').attr("src", "../images/chrome-color.png");
        }
    }, function(){
        $('.chrome-icon').attr("src", "../images/chrome-black.png")
        }
    );
    
    
})
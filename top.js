const backTopButton = document.getElementById('backTopButton');

window.onscroll = function() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        backTopButton.classList.add('header__box-icon--up-active');
    }
    else
    {
        backTopButton.classList.remove('header__box-icon--up-active');
    }
};

backTopButton.addEventListener('click',function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


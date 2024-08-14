const startLink = document.getElementById('start-link')

startLink.addEventListener('click', function(e){
    e.preventDefault()
    document.body.classList.add('fade-out')

    setTimeout(function(){

        window.location.href = e.target.href="level-one.html"
    }, 1000)
})

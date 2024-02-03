var rect = document.querySelector("#center");

rect.addEventListener("mousemove",function(details){
    var rectangle = rect.getBoundingClientRect();
    var insidrectval = details.clientX - rectangle.left;
    if(insidrectval<rectangle.width/2){
      var redcolor = gsap.utils.mapRange(0,rectangle.width/2,255,0,insidrectval);
      gsap.to(rect,{
       backgroundColor: `rgb(${redcolor},0,0)`,
        ease: Power4,    
      })
    }
    else{
        var bluecolor = gsap.utils.mapRange(rectangle.width/2,rectangle.width,0,255,insidrectval);
        gsap.to(rect,{
            backgroundColor: `rgb(0,0,${bluecolor})`,
             ease: Power4,    
           })
    }
})
rect.addEventListener("mouseleave",function(){
    gsap.to(rect,{
       backgroundColor : 'white' 
    })
   
})

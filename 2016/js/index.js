  		var SEPARATION = 200, AMOUNTX = 100, AMOUNTY = 100;

			var container, stats;
			var camera, scene, renderer;

			var particles, particle, count = 0;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.getElementById("bg").appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 700;

				scene = new THREE.Scene();

				particles = new Array();

				var PI2 = Math.PI * 2;
				

				var material2 = new THREE.LineBasicMaterial({
							color: 0xdedede,
							linewidth: 1
						});

				var geometry = new THREE.Geometry();
				
				geometry.vertices.push(
					new THREE.Vector3( -20, 0, 0 ),
					new THREE.Vector3( 20, 0, 0 ),
					new THREE.Vector3( 0, 0, 0 ),
					new THREE.Vector3( 0, 0, -20 ),
					new THREE.Vector3( 0, 0, 20 )

				);
				
			

				var i = 0;

				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

						particle = particles[ i ++ ] = new THREE.Line( geometry, material2 );
						particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
						particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
						scene.add( particle );

					}

				}

				renderer = new THREE.WebGLRenderer();
				//renderer.setClearColor(0xffb46e, 1); // orange Baggrunds farve
        renderer.setClearColor(0xf4f4f4, 1); // Blaa Baggrunds farve
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
/*
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );
*/
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				/*document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );*/

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}
/*
			function onDocumentTouchStart( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}
*/
			//

			function animate() {

				requestAnimationFrame( animate );

				render();
		

			}

			function render() {

				// Follow mouse
        
				camera.position.x +=  (( mouseX - camera.position.x ) * .003);
				camera.position.y = 2000 + (( - mouseY - camera.position.y ) * .005); //neutral
        
        //camera.position.y = 1700 + (( - mouseY - camera.position.y ) * .005); //hoej
				
        //Without mouse
        /*
        camera.position.x = 100;
        camera.position.y = 1200;
        */ 
         
				/*static position
				camera.position.x = 10;
				camera.position.y = 1000;
				*/
				camera.lookAt( scene.position );

				var i = 0;

				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
						// Original
						particle = particles[ i++ ];
						particle.position.y = ( Math.sin( ( ix + count ) * 0.1 ) * 300 ) +
							( Math.sin( ( iy + count ) * 0.4 ) * 50 );

					}

				}

				renderer.render( scene, camera );

				count += 0.05;

			}

<!--
/*
Copyright (c) 2016 by Kasper Schou
*/-->




 TweenLite.to('#wrapper', 1, {opacity:1, delay:1});

$('.clickable, #logo a, .w_clickable').click(function (e) {
    e.preventDefault();
    var goTo = this.getAttribute("href");
   if(e.metaKey || (navigator.platform.toUpperCase().indexOf('WIN')!==-1 && e.ctrlKey)) {
    window.open(goTo,'_blank');
  } else {
  
    TweenLite.to('#wrapper', 0.2, {opacity:0});  
  
    setTimeout(function(){
         window.location = goTo;
    },500);
    }
}); 

$(".work_tgl .ipad, .work_folc .ipad, .work_tmc .ipad, .work_bymd .ipad").hover(
  function() {
   	TweenLite.to($(this).children('.title'), 0.5, {opacity:1, ease:Sine.easeInOut}); 
   	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-8%', ease:Sine.easeInOut}); 


  }, function() {
  	TweenLite.to($(this).children('.title'), 0.5, {opacity:0.3, ease:Sine.easeInOut}); 
  	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-11%', ease:Sine.easeInOut}); 
  });


$(".work_bravo .ipad").hover(
  function() {
   	TweenLite.to($(this).children('.title'), 0.5, {opacity:1, ease:Sine.easeInOut}); 
   	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'2%', ease:Sine.easeInOut}); 


  }, function() {
  	TweenLite.to($(this).children('.title'), 0.5, {opacity:0.3, ease:Sine.easeInOut}); 
  	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-1%', ease:Sine.easeInOut}); 
  });

$(".work_vm .ipad").hover(
  function() {
   	TweenLite.to($(this).children('.title'), 0.5, {opacity:1, ease:Sine.easeInOut}); 
   	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-2%', ease:Sine.easeInOut}); 


  }, function() {
  	TweenLite.to($(this).children('.title'), 0.5, {opacity:0.3, ease:Sine.easeInOut}); 
  	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-5%', ease:Sine.easeInOut}); 
  });

$(".work_coma .ipad").hover(
  function() {
   	TweenLite.to($(this).children('.title'), 0.5, {opacity:1, ease:Sine.easeInOut}); 
   	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-5%', ease:Sine.easeInOut}); 


  }, function() {
  	TweenLite.to($(this).children('.title'), 0.5, {opacity:0.3, ease:Sine.easeInOut}); 
  	TweenLite.to($(this).children('.title'), 0.5, {marginRight:'-8%', ease:Sine.easeInOut}); 
  });

	$(".credit_trigger").click(function(){
      $(".overlay").fadeIn();
	});
	$(".close_overlay").click(function(){
      $(".overlay").fadeOut();
	});	

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
      $(".overlay").fadeOut();
    }
});	

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
      $(".scroll_prompt").fadeOut();
   } else {
      // upscroll code
   }
   lastScrollTop = st;
});


var isBookinPageLoaded	=	false;
var filePath	=	"https://my.setmore.com/";
var initalFrameLoad			=	function()
{
jQuery('.iframe_loader').hide();
jQuery('#iframeContent').show();

fancyBoxHeight = $("#setmore-fancy-box").height();

if(windowHeight> fancyBoxHeight)
{
$('#setmore-fancy-box-content').css('height', '635px');
}
else
{
$('#setmore-fancy-box-content').css('height', windowHeight-50);
}

}
var setmorePopup    =    function(bookingPageLink,k,isReschedule,isbookAppointmentResource,e)
{

if( e )
{
e.preventDefault();
e.stopPropagation();
e.stopImmediatePropagation();
}

var windowWidth		=	jQuery(window).width();
if( windowWidth < 600 )
{
window.open( bookingPageLink , '_blank' );
return;
}

var templ		=	{};
templ.overlay	=	'<div id="setmore-overlay"></div>';
templ.popup		=	'<div id="setmore-fancy-box" style= " background-color: #FFFFFF;height: auto;left: 50%;position: absolute;top: 0;width: 545px;z-index: 9999;">'+
'<div id="setmore-fancy-box-close-icon"></div>'+
'<div id="setmore-fancy-box-content">'+
'<div class="iframe_loader" style="position: absolute; left: 50%;top: 22%; -ms-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%)"><img src="'+location.protocol+'//my.setmore.com/setmore-loader.gif"></div>'+
'<div id="iframeContent" style="height:100%;width:100%" ">'+
'</div>'+
'</div>';
init	=	function(ck)
{
if( !isBookinPageLoaded )
{
isBookinPageLoaded	=	true;
this.renderTempl();
}
else
{
this.loadIframe();
this.positionPopup();
this.showPopup();
}
};
renderTempl	=	function()
{
jQuery("body").append( templ.overlay ).append( templ.popup );
this.positionPopup();
this.loadIframe();
this.bindEvents();
};
loadIframe		=	function()
{
if(isReschedule)
{
if(isbookAppointmentResource=="true")
{
jQuery(".iframe_loader").show();
jQuery("#iframeContent").hide();
jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" onload="return initalFrameLoad();" frameborder="0" hspace="0" scrolling="auto" src= "'+bookingPageLink+'&isStaffBookingPage=true"></iframe>');
}
else
{
jQuery(".iframe_loader").show();
jQuery("#iframeContent").hide();
jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" onload="return initalFrameLoad();" frameborder="0" hspace="0" scrolling="auto" src="'+bookingPageLink+'"></iframe>');
}
}
else
{
jQuery(".iframe_loader").show();
jQuery("#iframeContent").hide();
jQuery("#iframeContent").html('<iframe id="setmore-fancy-box-iframe" onload="return initalFrameLoad();" frameborder="0" hspace="0" scrolling="auto" src="'+bookingPageLink+'"></iframe>');
}
};
bindEvents		=	function()
{
var self	=	this;
jQuery("#setmore-overlay , #setmore-fancy-box-close-icon").bind("click",function(){ 									self.hidePopup();
});
};
positionPopup	=	function()
{
var windowHeight		=	jQuery(window).height();
var windowScrollHeight	=	jQuery(document).height();
var windowScrollTop		=	jQuery(document).scrollTop();
var popupWidth			=	jQuery("#setmore-fancy-box").width();
var popupHeight			=	windowHeight - 100;

jQuery("#setmore-overlay").height( windowScrollHeight+"px" );
jQuery("#setmore-fancy-box").css( { 'margin-left' : "-"+(popupWidth/2)+"px" , 'margin-top' : ( ( ( windowHeight - popupHeight ) / 2 ) + windowScrollTop ) +"px"  } );
jQuery('html,body').css('overflow','hidden');
};
hidePopup	=	function()
{
jQuery("#setmore-overlay,#setmore-fancy-box").hide();
jQuery('html,body').css('overflow','auto');
};
showPopup	=	function()
{
jQuery("#setmore-overlay,#setmore-fancy-box").show();
}
this.init(k);
}

//include required css file
loadCss	=	function()
{
var cssFilePath		=	'<link href="'+filePath+'css/setmorePopup.css" rel="stylesheet" type="text/css" />';

var appendCssFiles	=	function()
{
jQuery("head").append( cssFilePath );
setTimeout( function(){
loadSetmoreFancyBox();
}, 600);

};

//Binding click event to the "a" tag. Added this to override the FancyBox plugin
var loadSetmoreFancyBox	=	function()
{
jQuery("[id=Setmore_button_iframe]").on('click', function( e )
{
e.preventDefault();
e.stopPropagation();
e.stopImmediatePropagation();

var bookingPageLink	=	jQuery(this).attr("href");
var urlSplitArray	=	bookingPageLink.split("/");
var companyKey		=	urlSplitArray[ urlSplitArray.length - 1 ];
if(companyKey.indexOf("?") != -1)
{
companyKey		=	companyKey.split("?")[0];
}

setmorePopup(bookingPageLink,companyKey);
});
};

if( typeof jQuery !== "undefined" )
{
appendCssFiles();
}
else
{
var script = document.createElement("SCRIPT");
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);

var checkReady = function(callback)
{
if (window.jQuery)
{
callback(jQuery);
}
else
{
window.setTimeout(function() { checkReady(callback); }, 100);
}
};

checkReady( function(jQuery)
{
appendCssFiles();
windowHeight = window.innerHeight;
});
}
}
loadCss();
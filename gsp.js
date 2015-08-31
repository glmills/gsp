/* 
	GSP Website Loader Utilities
	Coded by Garrett Mills
	30 August 2015
	Licensed under the GNU Affero 3.0 License
	http://glmills.gq/mycode/licenses
*/

var gsp = {

	"wdkOnly":false,																//if false, use GSP loader or only load the GSP WDK
	"version":0.5,																	//gsp loader version
	"urlExtension":window.location.search,											//get the url extension
	"jQueryLocation":"jquery.js",													//location of the jQuery library. if none, use standard
	
	"formatUrlVars":function(){														//uses the url extension to format and add any variables
		var tempVar = gsp.urlExtension;
		var varNames = [];
		var varVals = [];
		tempVar = tempVar.replace("?", "");
		tempVar = tempVar + "&";
		tempVar = tempVar.split("&");
		gsp.urlVars = tempVar;
		
		for(var counter1 = 0; counter1 < gsp.urlVars.length; ++counter1){
			var currVarName = gsp.urlVars[counter1];
			currVarName = currVarName.substring(0, currVarName.indexOf('='));
			varNames.push(currVarName);
			gsp.urlVarNames = varNames;
			
			var currVarVal = gsp.urlVars[counter1];
			currVarVal = currVarVal.substring(currVarVal.indexOf("=") + 1);
			varVals.push(currVarVal);
			gsp.urlVarVals = varVals;
			
			gsp[gsp.urlVarNames[counter1]] = gsp.urlVarVals[counter1];
			
		}
	},
	
	"isNumeric":function(n){														//checks if a value (n) is numeric
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	
	"isBoolean":function(str){														//checks if a string is a bln value (needs attention)
		if (str === 'true'){
        return true;
		}
		else {
			return false;
		}
	},
	
	"load":function(){																//executed on page load
		if(!gsp.wdkOnly){
			$('#header').load('home.gsp #header');
			gsp.loadPageContent();
			$('#footer').load('home.gsp #footer');
			$('#mainStyle').load('main.css');
			$('#pageStyle').load(gsp.p+'.css');
		}
	},
	
	"loadPageContent":function(){
		var pageString = gsp.p+".gsp";
		
		$('#content').load(pageString+ ' #content');
		
	},
	
	"getXML":function(url){
		var xhttp, xmlDoc;
		if (window.XMLHttpRequest)
		  {
		  xhttp=new XMLHttpRequest();
		  }
		else // code for IE5 and IE6
		  {
		  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xhttp.open("GET",url,false);
		xhttp.send();
		xmlDoc=xhttp.responseXML;
		return xmlDoc;
	},
	
	"jq":{
		"callback":false,
		"get":function(){
			document.write('<script src="'+gsp.jQueryLocation+'"></script>');
		},
		
		"load":function(url, tag){
			$(tag).load(url);
		}
	
	},
	
	"info":function(){
		alert('This site is loaded using Garretts Scripted Pageloader');
		alert('Version ' +gsp.version);
		alert('The GSP loader is licensed under a GNU Affero GPL version 3.0');
		alert("For more license information, visit: http://glmills.gq/mycode/licenses");
	},
	
	"nav":function(page){
		window.location="?p="+page;
	}

}

gsp.jq.get();
gsp.formatUrlVars();
if (!gsp.wdkOnly){
	if(gsp.p == undefined){gsp.p='home'};
}
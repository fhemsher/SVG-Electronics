var Xr
var Yr
function trackDrawSchematic()
{
	//---creating new rect follows mouse til second click
	if( ActiveSchematicRectPath&&SecondCornerPointSet==false&&FirstCornerPointSet==true    )
	{
		Dx=Xr
		Dy=SVGy
		Hx=SVGx
		Hy=Yr
		me="M"+Xr+" "+Yr+" "+Dx+" "+Dy+" "+SVGx+" "+SVGy+" "+Hx+" "+Hy+"Z"
		ActiveSchematicRectPath.setAttribute("d",me)


	}

     if(FirstCornerPointSet==false && !ActiveSchematicRectPath)
     {

        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }

}



//---create groupRect---

var ActiveSchematicRectPath
function startSchematicDraw()
{    	SchematicArray=[]
       OpaqueSchematicElements=[]

	mySVG.setAttribute("onmousedown","buildNewSchematicRect(evt)")
       mySVG.setAttribute("onmouseup","finishNewSchematicRect();")

    coverOn()
}
var FirstCornerPointSet=false
var SecondCornerPointSet=false

function buildNewSchematicRect(evt)
{

		if(!ActiveSchematicRectPath &&
		 FirstCornerPointSet==false && SecondCornerPointSet==false)
		{
		     DrawX.style("display", "block")
            DrawX.attr("stroke", "violet")
            mySVG.style.cursor="default"
			ActiveSchematicRectPath=document.createElementNS(NS,"path")
			ActiveSchematicRectPath.setAttribute("stroke","black");
			ActiveSchematicRectPath.setAttribute("fill","none");
			ActiveSchematicRectPath.setAttribute("stroke-width","1");
			ActiveSchematicRectPath.setAttribute("stroke-dasharray","5,5");
			mySVG.appendChild(ActiveSchematicRectPath)
			Xr=SVGx;
			Yr=SVGy;
			firstPoint="M"+Xr+" "+Yr;
			ActiveSchematicRectPath.setAttribute("d",firstPoint);
			FirstCornerPointSet=true;
			DrawX.attr("transform","translate("+Xr+","+Yr+")")


		}
       // else
         //finishNewSchematicRect();

}
//---onmouse move;see main.showCoords(evt)



//---onmouseup-----
function finishNewSchematicRect()
{

	if(ActiveSchematicRectPath)
	{//---2nd click---

		/*---build a rect from the path points---
		1. compute the upper left, x,y
		2. compute the width
		3. compute the height
		*/
         SecondPoint=true
		var reM=/M/
		var reZ=/Z/
		d=ActiveSchematicRectPath.getAttribute("d")
		d=d.replace(reM,"")
		d=d.replace(reZ,"")
		dSplit=d.split(" ")

		for(i=0;i<dSplit.length;i++)
		{
			x=parseFloat(dSplit[i])
			y=parseFloat(dSplit[i+1])

			XY=x+y
			if(i==0)
			{
				minXY=XY
				minPnt=0
			}
			else
			if(XY<minXY)
			{
				minXY=XY
				minPnt=(i/2)
			}
			i++
		}

		if(minPnt==0)
		{
			rectX=Xr
			rectY=Yr
			width=SVGx-Xr
			height=SVGy-Yr
		}
		else if(minPnt==1)
		{
			rectX=Xr
			rectY=SVGy
			width=SVGx-Xr
			height=Yr-SVGy
		}
		else if(minPnt==2)
		{
			rectX=SVGx
			rectY=SVGy
			width=Xr - SVGx
			height=Yr - SVGy
		}
		else if(minPnt==3)
		{
			rectX=SVGx
			rectY=Yr
			width=Xr - SVGx
			height=SVGy-Yr
		}

		if(width!=0 && height!=0)
		{
		    mySVG.removeAttribute("onmousedown")
       mySVG.removeAttribute("onmouseup")
		 ActiveSchematicRectPath.setAttribute("fill",'gainsboro')
		 ActiveSchematicRectPath.setAttribute("fill-opacity",'.4')
           var cw = addElemSchematicCw
           cw.finishButton.disabled = false


        cw.cancelButton.disabled = false
		  // ActiveSchematicRectPath.removeAttribute("d")
		 //  ActiveSchematicRectPath=null

			DrawX.style("display","none")
           SecondCornerPointSet=true
			getElemsInSchematicGroup(rectX,rectY,width,height)
		}

	}
    coverOff()


}






var SchematicArray=[]

function getElemsInSchematicGroup(x,y,w,h)
{


	var X0=x
	var Y0=y
	var X1=x+w
	var Y1=y+h


   //	var wrapper=document.createElementNS(NS,"svg")
   //	mySVG.appendChild(wrapper)
    for(var k = 0; k<domElemG.childNodes.length; k++)
    {
        var elem = domElemG.childNodes.item(k)
        if(elem.nodeName!="#text")
        {
            checkSchematicEnclosed(elem,X0,Y0,X1,Y1)
        }

    }

     var cw = addElemSchematicCw
      cw.finishButton.disabled=false
    if(SchematicArray.length==0)
    cw.finishButton.disabled=true

	showSourceSVG()
}
var OpaqueSchematicElements=[]
function checkSchematicEnclosed(el,X0,Y0,X1,Y1)
{
   var clone=el.cloneNode("true")
		domWrapper.appendChild(clone)
		var bb=domWrapper.getBBox()
		domWrapper.removeChild(clone)

		var x0=bb.x
		var y0=bb.y
		var x1=x0+bb.width
		var y1=y0+bb.height
		var isEnclosed=false
		if(x0>X0 &&y0>Y0 && x1<X1 && y1<Y1)
			isEnclosed =true
		if(isEnclosed==true)
		{
			//el.setAttribute("pointer-events","none")
			SchematicArray.push(el)
		}
		else
        {
		 el.setAttribute("opacity",.3)
         OpaqueSchematicElements.push(el)   //---finsish cancel
        }
}




function cancelSchematic()
{        var cw=addElemSchematicCw
       cw.cancelButton.disabled=true
      FirstCornerPointSet=false
      SecondCornerPointSet=false

       cw.finishButton.disabled=true
     for(var k=0;k<OpaqueSchematicElements.length;k++)
     {

       OpaqueSchematicElements[k].removeAttribute("opacity")


     }


      OpaqueSchematicElements=[]
     SchematicArray =[]
     if(ActiveSchematicRectPath)
       mySVG.removeChild(ActiveSchematicRectPath)



   ActiveSchematicRectPath=null
 DrawX.style("display", "none")
     startSchematicDraw()


}
function finishSchematic()
{
   var cw=addElemSchematicCw
   cw.sendButton.disabled=false
   var componentG=document.createElementNS(NS,"g")
    var utcMS=new Date().getTime()
    var id="component"+utcMS
     componentG.setAttribute("id",id)

     for(var k=0;k<SchematicArray.length;k++)
    {
         elem=SchematicArray[k]

         //---remove cover rects----
          if(elem.getAttribute("class")!="rectElem")
          {
             var rects=elem.getElementsByTagName("rect")
               if(rects.length>0&&rects[rects.length-1].getAttribute("onmousedown")!=-1)
                elem.removeChild(rects[rects.length-1])
          }

         domWrapper.appendChild(elem.cloneNode(true))
         elem.parentNode.removeChild(elem)

    }

     for(var k=0;k<OpaqueSchematicElements.length;k++)
     {

       OpaqueSchematicElements[k].removeAttribute("opacity")


     }





    //----translate all elements: center of component(0,0)---


    var bbW=domWrapper.getBBox()
    var cxW=bbW.x+.5*bbW.width
    var cyW=bbW.y+.5*bbW.height
     for(k=0;k<domWrapper.childNodes.length;k++)
    {
       var clone=domWrapper.childNodes.item(k).cloneNode(true)

      clone.removeAttribute("pointer-events")
      clone.removeAttribute("style")
      clone.removeAttribute("class")
      clone.removeAttribute("onmousedown")
      clone.removeAttribute("onclick")
      clone.removeAttribute("id")
      if(clone.childNodes.length>1)
      {
          clone.lastChild.removeAttribute("pointer-events")
          clone.lastChild.removeAttribute("style")
          clone.lastChild.removeAttribute("class")
          clone.lastChild.removeAttribute("onmousedown")
          clone.lastChild.removeAttribute("onclick")
          clone.lastChild.removeAttribute("id")
      }

      if(clone.getAttribute("fill")&&clone.getAttribute("fill").indexOf("url")!=-1)
      {
         var myUrl=clone.getAttribute("fill").split("url(#")[1].replace(/\)/,"")
         var cloneUrl=document.getElementById(myUrl).cloneNode(true)
         var fillId="fill"+utcMS+k
         cloneUrl.setAttribute("id",fillId)
         var defs=document.createElementNS(NS,"defs")
          defs.appendChild(cloneUrl)
          componentG.appendChild(defs)
          clone.setAttribute("fill","url(#"+fillId+")")


      }
      if(clone.getAttribute("stroke")&&clone.getAttribute("stroke").indexOf("url")!=-1)
      {
         var myUrl=clone.getAttribute("stroke").split("url(#")[1].replace(/\)/,"")
         var cloneUrl=document.getElementById(myUrl).cloneNode(true)
         var strokeId="stroke"+utcMS+k
         cloneUrl.setAttribute("id",strokeId)
         var defs=document.createElementNS(NS,"defs")
          defs.appendChild(cloneUrl)
          componentG.appendChild(defs)
          clone.setAttribute("stroke","url(#"+strokeId+")")
      }

      componentG.appendChild(clone)
    }
    for(var k=domWrapper.childNodes.length-1;k>=0;k--)
    domWrapper.removeChild(domWrapper.childNodes.item(k))

      domElemG.appendChild(componentG)

    var rect=document.createElementNS(NS,"rect")
    rect.setAttribute("width",bbW.width )
    rect.setAttribute("height",bbW.height)
    rect.setAttribute("stroke","none")
    rect.setAttribute("fill","white")
    rect.setAttribute("fill-opacity","0")
       rect.setAttribute("onmousedown","editDrawSchematic("+id+",evt)")
    //rect.setAttribute("transform","translate("+(-bbW.width/2)+","+(-bbW.height/2)+")")
    rect.setAttribute("transform","translate("+(bbW.x)+","+(bbW.y)+")")
     componentG.appendChild(rect)

   // componentG.setAttribute("transform","translate("+(cxW)+","+(cyW)+")")
    componentG.setAttribute("nativeWidth",bbW.width)
    componentG.setAttribute("nativeHeight",bbW.height)
    componentG.setAttribute("myscale","1.0")



     	mySVG.removeAttribute("onmousedown")
       mySVG.removeAttribute("onmouseup")


   DrawX.style("display", "none")
    SchematicArray =[]

     cw.cancelButton.disabled=true

        cw.finishButton.disabled=true
     cancelSchematic()
      cw.sendSchematicMessageSpan.innerHTML=""
     cw.saveToLibraryDiv.style.opacity=1
     FirstCornerPointSet=false
SecondCornerPointSet=false
 startSchematicDraw()
}



///---X button and iframe close all---
function closeDrawSchematic()
{
    if(addElemSchematicViz==true)
    {    var cw=addElemSchematicCw
           	mySVG.removeAttribute("onmousedown")
       mySVG.removeAttribute("onmouseup")
    cancelSchematic()
   cw.sendSchematicMessageSpan.innerHTML=""
        closeIframe("addElemSchematic");
        coverOff()

    }
}
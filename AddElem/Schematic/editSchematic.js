
function rotateSchematicAdjust(factor)
{
    var cw = editElemSchematicCw
    var mult = parseFloat(cw.rotateEditSchematicAdjustSelect.options[cw.rotateEditSchematicAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateSchematicValue.value = rotateAdd+parseFloat(cw.adjustedRotateSchematicValue.value)

    if(EditSchematicObj)
    {

     if(SetSchematicCenter.length==0)
     {
         //---rotate from center---
    //var wrapperClone=activeElem.cloneNode(true)
    //domWrapper.appendChild(wrapperClone)
    var bb=EditSchematicObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width
    SetSchematicCenter=[cx,cy]

   }
    var tfm=decomposeMatrix(EditSchematicObj.getCTM())
     var rotation=tfm.rotation

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditSchematicObj.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(rotateAdd,SetSchematicCenter[0],SetSchematicCenter[1])
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()



    }
}

var EditSchematic = false
var DrawSchematicEditId
var EditThisSchematic
//--mousedown/right button on schematic---
function editDrawSchematic(elemObjEdit, evt)
{

   var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;


EditSchematic = false
DrawSchematicEditId = null
EditThisSchematic = null
        ActiveElem = null
        activeElem = null

    if(isRightMB&&ZoomDrawing==false)
    {
        SetSchematicCenter=[]

        EditThisSchematic = elemObjEdit

        DrawSchematicEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditSchematic = true
        if(editElemSchematicLoad==false)
        {
            openIframe("AddElem", "editElemSchematic", 10)

        }
        else if(editElemSchematicViz==false)
        {
            openIframe("AddElem", "editElemSchematic", 10)
            setEditSchematic()
        }
        else
            setEditSchematic()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target.parentNode

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.lastChild.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editDrawSchematic("+dragTarget.id+",evt)",classed])
    }

}

var EditSchematicObj
function setEditSchematic()
{
    coverOn()
    domWrapper.removeAttribute("style")
    var cw = editElemSchematicCw



    var elemObjEdit = document.getElementById(DrawSchematicEditId)
    if(elemObjEdit)
    {
    EditThisSchematic=elemObjEdit






    cw.scaleRangeValue.value=elemObjEdit.getAttribute("myscale")
    cw.scaleValue.value=elemObjEdit.getAttribute("myscale")
    cw.adjustedRotateSchematicValue.value=0

    if(elemObjEdit.getAttribute("filter"))
        cw.editSchematicShadowCheck.checked = true
   else
      cw.editSchematicShadowCheck.checked = false


    EditSchematicObj = elemObjEdit.cloneNode(true)
     elemObjEdit.style.display = "none"


    EditSchematicObj.setAttribute("id", "activeElem")


   EditSchematicObj.setAttribute("class", "dragTargetObj")
   var rects=EditSchematicObj.getElementsByTagName("rect")
  rects[rects.length-1].removeAttribute("onmousedown")
rects[rects.length-1].setAttribute("stroke","orange")
rects[rects.length-1].setAttribute("vector-effects","non-scaling-stroke")
rects[rects.length-1].setAttribute("stroke-width","6")
rects[rects.length-1].setAttribute("stroke-opacity",".5")
rects[rects.length-1].style.cursor="move"

    ActiveElem = d3.select("#activeElem")
   activeElem = document.getElementById("activeElem")


        domActiveElemG.insertBefore(EditSchematicObj,domActiveElemG.firstChild)


          setSchematicEditDrag()

            mySVG.style.cursor = ""
    }
}

function setSchematicEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragSchematic(evt)")
    mySVG.setAttribute("onmousemove", "dragSchematic(evt)")
    mySVG.setAttribute("onmouseup", "endDragSchematic(evt)")

  showSourceSVG()
}

function finishEditSchematic()
{

    if(document.getElementById("activeElem"))
    {
        var cw = editElemSchematicCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "schematicElem")


             finishedElem.setAttribute("id", DrawSchematicEditId)


        finishedElem.setAttribute("id", DrawSchematicEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        activeElem=null
        ActiveElem=null
            var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editDrawSchematic("+DrawSchematicEditId+", evt)")



        finishedElem.setAttribute("myscale", cw.scaleValue.value)



        domElemG.insertBefore(finishedElem, EditThisSchematic)
        domElemG.removeChild(EditThisSchematic)



        EditSchematicObj=null
     }
       if(CopySchematicArray.length>0)
       {
           for(var k=0;k<CopySchematicArray.length;k++)
           {

              var schematicCopy=CopySchematicArray[k]
                schematicCopy.removeAttribute("style")
                 var rects=schematicCopy.getElementsByTagName("rect")
                rects[rects.length-1].style.cursor = "default"
                rects[rects.length-1].removeAttribute("stroke")



             rects[rects.length-1].setAttribute("onmousedown", "editDrawSchematic("+schematicCopy.id+", evt)")


           }
            CopySchematicArray=[]

         var elemObjEdit = document.getElementById(DrawSchematicEditId)

         var rects=elemObjEdit.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editDrawSchematic("+DrawSchematicEditId+", evt)")




       }

      DrawSchematicEditId=null

    closeEditSchematic()
}



function cancelDrawEditSchematic()
{
          var cw = editElemSchematicCw

       var elemObjEdit = document.getElementById(DrawSchematicEditId)
       elemObjEdit.style.display = ""



   if(CopySchematicArray.length>0)
       {
           for(var k=0;k<CopySchematicArray.length;k++)
           {

              var schematicCopy=CopySchematicArray[k]
               domElemG.removeChild(schematicCopy)


           }

          CopySchematicArray=[]
            cw.editSchematicEditSpan.innerHTML = "Edit Schematic"
       }
       else if(EditSchematicObj)
        domActiveElemG.removeChild(EditSchematicObj)
     activeElem = null
    ActiveElem = null
    EditSchematicObj = null
     DrawSchematicEditId=null

setEditSchematic()

}
//-------------------copy schematic-----------------
var ActiveSchematicCopy = false
var CopySchematicArray =[]
var CopySchematicTransX
var CopySchematicTransY
//---toggle copy button----
function copyEditSchematic()
{
    var cw = editElemSchematicCw
    ActiveSchematicCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawSchematicEditId)

        CopySchematicTransX = 0
        CopySchematicTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "schematicElem")
           var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"

        finishedElem.setAttribute("id", DrawSchematicEditId)
        domActiveElemG.removeChild(EditSchematicObj)
        activeElem = null
       ActiveElem = null
         EditSchematicObj=null
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawSchematicEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        //CopySchematicArray.push(finishedElem)

       cw.editSchematicEditSpan.innerHTML = "Copy &amp; drag copies"
       cw.editSchematicDeleteButton.disabled=true
        coverOff()

        //mySVG.appendChild(dragDot) //--place drag dot on top---
        //dragDot.removeAttribute("cx")



        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


        DraggingObj = false
        DrawSchematic = false
        EditSchematic = false
        SchematicDeleted = false

        mySVG.setAttribute("onmousedown", "startDragSchematic(evt)")
        mySVG.setAttribute("onmousemove", "dragSchematic(evt)")
        mySVG.setAttribute("onmouseup", "endDragSchematic(evt)")

        mySVG.removeAttribute('onclick')

    }
    var copyMe = document.getElementById(DrawSchematicEditId)
    var copied = copyMe.cloneNode(true)
      var rects=copied.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "move"
    var id = "schematic"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopySchematic(evt)")
    CopySchematicTransX += 10
    CopySchematicTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopySchematicTransX, CopySchematicTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopySchematicArray.push(copied)

}
var CopySchematic
function tagCopySchematic(evt)
{
    CopySchematic = evt.target

}

function flipSchematicX()
{
    if(EditSchematicObj)
    {
        var bb=EditSchematicObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditSchematicObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(-1,1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
     transformRequestObj.setTranslate(-bb.width,0)
   transformList.appendItem(transformRequestObj)
    transformList.consolidate()



    }




}
function flipSchematicY()
{

     if(EditSchematicObj)
    {
        var bb=EditSchematicObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditSchematicObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(1,-1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
        transformRequestObj.setTranslate(0,-bb.height)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    }




}


//=======================delete schematic==================
var SchematicDeleted = false
//---button---
function removeCurrentDrawSchematic()
{

       domActiveElemG.removeChild(EditSchematicObj)
    var elemObjEdit = document.getElementById(DrawSchematicEditId)
    domElemG.removeChild(elemObjEdit)
    SchematicDeleted = true

    var cw = editElemSchematicCw
     activeElem=null
     ActiveElem=null
     EditSchematicObj=null
    closeEditSchematic()


}
//====================Top/Bot===================
function topEditSchematic()
{

    var elemObjEdit = document.getElementById(DrawSchematicEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "schematicElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawSchematicEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
    EditSchematicObj=null
    closeEditSchematic()
}
function botEditSchematic()
{
    var elemObjEdit = document.getElementById(DrawSchematicEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "schematicElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawSchematicEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)
    EditSchematicObj=null
   closeEditSchematic()
}

var ScaleSchematic=false
var SetSchematicCenter=[]
function scaleSchematic(scale)
{
   if(EditSchematicObj)
   {

       if(ScaleSchematic==true)
       {
           var cw = editElemSchematicCw
           cw.scaleValue.value=scale


         EditSchematicObj.setAttribute("myscale",scale)

   if(SetSchematicCenter.length==0)
   {

    var bb=EditSchematicObj.getBBox()
    //domWrapper.removeChild(wrapperClone)
    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.height
     SetSchematicCenter=[cx,cy]
   }

   var tfm=decomposeMatrix(EditSchematicObj.getCTM())
var currentScale=tfm.scaleX
 scale=+scale/currentScale

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditSchematicObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(-SetSchematicCenter[0]*(scale-1), -SetSchematicCenter[1]*(scale-1))
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()
    transformRequestObj.setScale(scale,scale)
    transformList.appendItem(transformRequestObj)

	transformList.consolidate()




       }

   }




}


function editSchematicShadowChecked()
{

    var cw = editElemSchematicCw
    if(cw.editSchematicShadowCheck.checked==true)
    {
        if(document.getElementById("activeElem"))
            document.getElementById("activeElem").setAttribute("filter", "url(#drop-shadow)")

    }
    else
    {
        if(document.getElementById("activeElem"))
            document.getElementById("activeElem").removeAttribute("filter")

    }

}
//---X---
function closeEditSchematic()
{


if(EditSchematicObj)
        domActiveElemG.removeChild(EditSchematicObj)
     activeElem = null
    ActiveElem = null
    EditSchematicObj = null

   var elemObjEdit = document.getElementById(DrawSchematicEditId)
   if(elemObjEdit)
   {
       elemObjEdit.style.display = ""
   var rects=elemObjEdit.getElementsByTagName("rect")
  rects[rects.length-1].setAttribute("onmousedown", "editDrawSchematic("+DrawSchematicEditId+",evt)")
    rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")

   }


       DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

      //----copies---
        for(var k = 0; k<CopySchematicArray.length; k++)
        {
            var copy = CopySchematicArray[k]
            var id = copy.getAttribute("id")

            var rects=copy.getElementsByTagName("rect")
            rects[rects.length-1].setAttribute("onmousedown", "editDrawSchematic("+id+",evt)")

            rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")




        }
        ActiveSchematicCopy = false
        CopySchematicArray =[]

        EditSchematic = false

EditThisSchematic = null

     closeIframe("editElemSchematic")


      coverOff()

     //coverRect.style.display="none"
        var cw = editElemSchematicCw
        cw.editSchematicEditSpan.innerHTML="Edit Schematic"
          cw.editSchematicDeleteButton.disabled=false


}




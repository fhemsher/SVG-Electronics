function trackDrawImage()
{
    var cw = addElemImageCw

    if(ZoomDrawing==false&&ActiveElem==null&&EditImage==false && ImageDeleted==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}
var EditImage = false
var DrawImage = false
var ImageDeleted = false

function startImageDraw()
{
    var cw = addElemImageCw
    if(EditImage==false)
    {
        ActiveElem = null
        activeElem = null
        DrawImage = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
        cw.drawImageTopButton.style.visibility="hidden"

    }

}

function placeDrawImage()
{
                 var cw = addElemImageCw
    if( cw.bgImgFile.value!="")
    {



    coverOn()

    var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text

        ActiveElem = d3.select("#domActiveElemG")
        .attr("id", "activeElem")
    .attr("class", "dragTargetObj")
   .attr("pointer-events", null)
    .style("cursor", "move")
    .attr("opacity", opacity)
    .attr("transform", "translate("+SVGx+" "+SVGy+")")




    ActiveElem.append("image")






    //---place dragDot in g---
    activeElem = document.getElementById("activeElem")
    activeElem.appendChild(dragDot)

    activeElem.firstChild.setAttribute("height", 200)
    activeElem.firstChild.setAttribute("width", 200)
     activeElem.firstChild.setAttribute("href",ImageHREF)



      DragDot.style("visibility", "visible")
      //DragDot.attr("cx", 20)

        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(200)+" "+(200)+")")

         cw.bgImageWidthValue.value=200
      cw.bgImageHeightValue.value=200
        ImageCorner =[SVGx, SVGy]


        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragImage(evt)")
        mySVG.setAttribute("onmousemove", "dragImage(evt)")
        mySVG.setAttribute("onmouseup", "endDragImage(evt)")

        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false
        console.log(activeElem)
      }
}


var ImageHREF
 function loadImageFile() {

    var cw=addElemImageCw

    var file    = cw.document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.addEventListener("load", function ()
    {

        ImageHREF=reader.result


  }, false);

  if (file) {
    reader.readAsDataURL(file);

  }
}




///---X button and iframe close all---
function closeDrawImage()
{
    if(addElemImageViz==true)
    {
        RotateAngle = 0
        closeIframe("addElemImage");
        var cw = addElemImageCw

        if(EditImage==true && ImageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawImageEditId)
            elemObjEdit.style.visibility = ""

            elemObjEdit.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")
        }
        DraggingObj = false
        DrawImage = false
        EditImage = false
        ImageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        mySVG.removeAttribute('onclick')
        if(activeElem)
        {
           activeElem.removeChild(activeElem.firstChild)
           dragDot.removeAttribute("transform")
            document.getElementById("activeElem").removeAttribute("class")
            document.getElementById("activeElem").removeAttribute("transform")
             activeElem.id="domActiveElemG"

            ActiveElem = null
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null
            DrawX.style("display", "none")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", null)
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)

            var cw = addElemImageCw


            cw.drawImageFinishButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.drawImageDeleteButton.style.visibility = "hidden"
            cw.drawImageEditSpan.innerText = "Add Images"
            cw.drawImageTopTable.style.backgroundColor = "linen"
            cw.containerDiv.style.backgroundColor = "linen"

            coverOff()
            //domWrapper.style.display = "none"

            cw.adjustedRotateImageValue.value = 0
          if(!document.getElementById("domActiveElemG"))
          {
              if(document.getElementById("activeElem"))
              {
                  activeElem=document.getElementById("activeElem")
                   activeElem.removeChild(activeElem.firstChild)
                   activeElem.id="domActiveElemG"
                   activeElem.removeAttribute("transform")
                   activeElem.removeAttribute("class")
                   activeElem.removeAttribute("style")
             if(!document.getElementById("dragDot") )
             {
                   DragDot = ActiveElemG.append("circle")
                .attr("id", "dragDot")
                .attr("class", "dragTargetObj")
                .attr("cx", "0")
                .attr("cy", "0")
                .attr("r", "12")
                .attr("fill", "white")
                .attr("fill-opacity", ".5")
                .attr("stroke", "black")
                .attr("stroke-width", "1")
                .attr("vector-effect", "non-scaling-stroke")
                .style("visibility", "hidden")
                .style("cursor", "default")
                 activeElem.appendChild(dragDot)

              }
               ActiveElemG=d3.select("#domActiveElemG")

                activeElem=null

               dragDot.removeAttribute("transform")
               dragDot.setAttribute("cx",0)
               dragDot.setAttribute("cy",0)


          }

    }
}
}



var EditImage = false
var DrawImage = false
var ImageDeleted = false



function startImageDraw()
{
    RotateAngle = 0
   // elemSizeDiv.innerHTML = "w = <input id=drawImageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawImageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemImageCw
    if(EditImage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawImage = true
        mySVG.setAttribute('onclick', " placeDrawImage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateImageValue)
        cw.adjustedRotateImageValue.value = 0
      cw.bgImgFile.value=""
      cw.bgImageWidthValue.value=""
      cw.bgImageHeightValue.value=""
      ImageHREf=null

}

//--click on svg---


function finishDrawImage()
{

    if(EditImage==true)
        finishEditImage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemImageCw
            activeElem.removeAttribute("class")

            var finishedElem = activeElem.firstChild.cloneNode(true)

            DrawImageEditId = "image"+new Date().getTime()
            finishedElem.setAttribute("id", DrawImageEditId)

            if(activeElem.getAttribute("transform"))
            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "imageElem")

            finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")

    finishedElem.setAttribute("width", cw.bgImageWidthValue.value)
    finishedElem.setAttribute("height", cw.bgImageHeightValue.value)


            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)

            cw.drawImageFinishButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            coverOff()
            activeElem.id="domActiveElemG"
            domActiveElemG.appendChild(dragDot)
            domActiveElemG.removeChild(activeElem.firstChild)
            domActiveElemG.removeAttribute('class')
            ActiveElem = null
            activeElem = null

            domElemG.appendChild(finishedElem)
           // closeDrawImage()
            startImageDraw()

        }


}

function cancelDrawImage()
{
    if(EditImage==true)
        cancelEditImage()
        else
        closeDrawImage() 
}

//====================edit/update rect===============================
//====================edit/update circle===============================

var EditImage = false
var DrawImageEditId
var EditThisImage
//--mousedown/right button on circle---
function editImageDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawImage==false&&ZoomDrawing==false)
    {
      //  elemSizeDiv.innerHTML = "r = <input id=drawImageRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisImage = elemObjEdit

        DrawImageEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditImage = true
        if(addElemImageLoad==false)
        {
            openIframe("AddElem", "addElemImage", 10)

        }
        else if(addElemImageViz==false)
        {
            openIframe("AddElem", "addElemImage", 10)
            setEditImage()
        }
        else
            setEditImage()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")
        ZoomDraggedElems.push([dragTarget,"editImageDraw("+dragTarget.id+",evt)",classed])
    }



}
















var EditImage = false
var DrawImageEditId
var EditThisImage

//---after iframe loaded see sendSize() at addElemImage.htm---
var EditImageObj
function setEditImage()
{
    coverOn()
    mySVG.removeAttribute('onclick')
    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)

    EditImage=true

    ActiveElem = d3.select("#domActiveElemG")
    .attr("id", "activeElem")
  .attr("transform", elemObjEdit.getAttribute("transform"))
    .attr("class", "dragTargetObj")


    activeElem = document.getElementById("activeElem")
    EditImageObj = elemObjEdit.cloneNode(true)
    EditImageObj.removeAttribute("transform")
    EditImageObj.removeAttribute("unmousedown")
    EditImageObj.removeAttribute("style")
    activeElem.appendChild(EditImageObj)

    activeElem.appendChild(dragDot)

    //---is this text rotated?---
    var ctm = elemObjEdit.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateImageValue.value = rotatedDeg

        elemObjEdit.style.visibility = "hidden"



         cw.drawImageTopButton.style.visibility="visible"

        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false

           cw.drawImageDeleteButton.style.visibility="visible"


                var opacity = EditImageObj.getAttribute("opacity")




            cw.drawImageEditSpan.innerHTML = "Edit Image"
            cw.drawImageTopTable.style.backgroundColor = "orange"

            cw.containerDiv.style.backgroundColor = "orange"
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))

            //--place dragDot----
            var width = parseFloat(activeElem.firstChild.getAttribute("width"))
            var height = parseFloat(activeElem.firstChild.getAttribute("height"))
           cw.bgImageWidthValue.value=width
    cw.bgImageHeightValue.value=height

            DragDot.attr("transform", "translate("+(width)+" "+(height)+")")

            setImageEditDrag()

}

function setImageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragImage(evt)")
    mySVG.setAttribute("onmousemove", "dragImage(evt)")
    mySVG.setAttribute("onmouseup", "endDragImage(evt)")
    ActiveElem.style("cursor", "move")

}
function finishEditImage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemImageCw
        activeElem.removeAttribute("class")
        var finishedElem = activeElem.firstChild.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))

        finishedElem.setAttribute("class", "addElem")

     finishedElem.setAttribute("opacity", ActiveElem.attr("opacity"))


            finishedElem.setAttribute("rotateAngle", RotateAngle)

            activeElem.removeChild(activeElem.firstChild)
             activeElem.removeAttribute("transform")
            ActiveElem.id="domActiveElemG"
            dragDot.removeAttribute("transform")



            ActiveElem = null
            activeElem = null
            finishedElem.style.cursor = "default"
            finishedElem.style.visibility = ""
            //---is this a timelined elem---

           finishedElem.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")
            finishedElem.setAttribute("id", DrawImageEditId)
            UpdateThisImage = finishedElem
            //updateImage()
           domElemG.insertBefore(finishedElem, EditThisImage)
           domElemG.removeChild(EditThisImage)

            EditImage = false

    }
    closeDrawImage()
}

function resetEditImage()
{

    var cw = addElemImageCw
    EditImage = false
    cw.editImageSpan.innerText = "Draw Images"
    cw.drawImageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawImageCopyButton.style.visibility = "hidden"
    cw.drawImageDeleteButton.style.visibility = "hidden"
    cw.drawImageCancelButton.disabled = false
    cw.drawImageFinishButton.disabled = false
    DrawImage = true


    //---click to add more circles for this session---

}

function cancelEditImage()
{

 closeDrawImage()
 /*
       var cw = addElemImageCw
    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawImageEditId)
    elemObjEdit.style.visibility = ""
  mySVG.appendChild(dragDot)
  domActiveElemG.removeChild(document.getElementById("activeElem"))
    //--place dragDot----
            var width = parseFloat(elemObjEdit.getAttribute("width"))
            var height = parseFloat(elemObjEdit.getAttribute("height"))
              cw.bgImageWidthValue.value = width.toFixed(0)
                cw.bgImageHeightValue.value = width.toFixed(0)
            dragDot.setAttribute("transform", "translate("+(width)+" "+(height)+")")
   // ActiveElem = null
    //setEditImage()
    */
}


//=======================delete rect==================
var ImageDeleted = false
//---button---
function removeCurrentDrawImage()
{

         var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
    domElemG.removeChild(elemObjEdit)
    ImageDeleted = true

           EditImage = false
            DrawImage = false

            DrawImageEditId=null
    closeDrawImage()

}

function showDrawImageStrokeBg()
{
    var cw = addElemImageCw
    var stroke = cw.drawImageStrokeSelect.options[cw.drawImageStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawImageStrokeBg.style.backgroundColor = stroke
        else
            cw.drawImageStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveImage.attr("stroke", stroke)

}

function drawImageStrokeSelected()
{
    var cw = addElemImageCw
    var stroke = cw.drawImageStrokeSelect.options[cw.drawImageStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveImage.attr("stroke", stroke)

}

function showDrawImageFillBg()
{
    var cw = addElemImageCw
    var fill = cw.drawImageFillSelect.options[cw.drawImageFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawImageFillBg.style.backgroundColor = fill
        else
            cw.drawImageFillBg.style.backgroundColor = ""
            if(cw.drawImageFillSelect.selectedIndex==0)
        {
            ActiveImage.attr("fill", "white")
            ActiveImage.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveImage.attr("fill", fill)
            var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text

            ActiveImage.attr("fill-opacity", opacity)

        }

}

function drawImageFillSelected()
{
    var cw = addElemImageCw
    var fill = cw.drawImageFillSelect.options[cw.drawImageFillSelect.selectedIndex].value
    if(cw.drawImageFillSelect.selectedIndex==0)
    {
        ActiveImage.attr("fill", "white")
        ActiveImage.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveImage.attr("fill", fill)
        var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text

        ActiveImage.attr("fill-opacity", opacity)

    }

}

function drawImageOpacitySelected()
{
    var cw = addElemImageCw
    var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveImage.attr("opacity", opacity)

}

function drawImageStrokeWidthSelected()
{
    var cw = addElemImageCw
    var strokeWidth = cw.drawImageStrokeWidthSelect.options[cw.drawImageStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
    {
        ActiveImage.attr("stroke-width", strokeWidth)
        if(cw.drawImageStrokeDashCheck.checked==true)
        {
            da1 = 8
            da2 = 3

            ActiveImage.attr("stroke-dasharray", da1+" "+da2)

        }
        if(cw.drawImageStrokeRoundCheck.checked==true)
        {
            rxy = 5*strokeWidth

            ActiveImage.attr("rx", rxy)
            ActiveImage.attr("ry", rxy)

        }

    }

}

function drawImageStrokeRoundChecked()
{
    var cw = addElemImageCw
    var strokeWidth = parseFloat(cw.drawImageStrokeWidthSelect.options[cw.drawImageStrokeWidthSelect.selectedIndex].text)
    if(ActiveElem)
    {
        if(cw.drawImageStrokeRoundCheck.checked==true)
        {

            ActiveImage.attr("rx", 5*strokeWidth)
            ActiveImage.attr("ry", 5*strokeWidth)

        }
        else
        {
            ActiveImage.attr("rx", null)
            ActiveImage.attr("ry", null)

        }

    }
}

function drawImageStrokeDashChecked()
{
    var cw = addElemImageCw
    if(cw.drawImageStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
        {
            var strokeWidth = parseFloat(cw.drawImageStrokeWidthSelect.options[cw.drawImageStrokeWidthSelect.selectedIndex].text)
            da1 = 8
            da2 = 3

            ActiveImage.attr("stroke-dasharray", da1+" "+da2)

        }

    }
    else
    {
        if(ActiveElem)
            ActiveImage.attr("stroke-dasharray", null)
    }

}

function rotateImageAdjust(factor)
{
    var cw = addElemImageCw
    var mult = parseFloat(cw.rotateDrawImageAdjustSelect.options[cw.rotateDrawImageAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateImageValue.value = rotateAdd+parseFloat(cw.adjustedRotateImageValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

//====================Top/Bot===================
function topDrawImage()
{

    var elemObjEdit = document.getElementById(DrawImageEditId)
        var finishedElem = document.getElementById("activeElem").firstChild.cloneNode(true)

        finishedElem.setAttribute("transform", document.getElementById("activeElem").getAttribute("transform"))
        finishedElem.setAttribute("class", "imageElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawImageEditId)

        activeElem.id="domActiveElemG"
        activeElem.removeAttribute("transform")
        dragDot.removeAttribute("transform")

        activeElem.removeChild(activeElem.firstChild)

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
     activeElem=null
    closeDrawImage()
}
function botDrawImage()
{
    if(EditImage)
    {
        var elemObjEdit = document.getElementById(DrawImageEditId)
        var finishedElem = document.getElementById("activeElem").firstChild.cloneNode(true)

        finishedElem.setAttribute("transform", document.getElementById("activeElem").getAttribute("transform"))
        finishedElem.setAttribute("class", "imageElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawImageEditId)

        activeElem.id="domActiveElemG"
        activeElem.removeAttribute("transform")
        dragDot.removeAttribute("transform")
        domElemG.removeChild(elemObjEdit)
        activeElem.removeChild(activeElem.firstChild)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)
        activeElem=null
       closeDrawImage()
   }
   else
   {
        finishDrawImage()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}

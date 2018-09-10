function trackDrawImage()
{
    var cw = addElemImageCw

    if(ActiveElem==null&&ImageHREF&&EditImage==false && ImageDeleted==false)
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
        cw.drawImageTopButton.style.visibility = "hidden"
        MyMap.scrollWheelZoom.disable();
        MyMap.dragging.disable()
    mySVG.setAttribute("cursor","default")

    }

}

function placeDrawImage()
{
    var cw = addElemImageCw
    if(cw.bgImgFile.value!="")
    {

        coverOn()

        var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text


        ActiveElem = ActiveElemG.append("image")
        .attr("id", "activeElem")
        .attr("fill-opacity", opacity)

        activeElem=document.getElementById("activeElem")
        activeElem.setAttribute("height", ImageHeight)
        activeElem.setAttribute("width", ImageWidth)
        activeElem.setAttribute("href", ImageHREF)
        activeElem.setAttribute("InitZoom", MyMap.getZoom()       )

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")

        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        domActiveElemG.appendChild(dragDot)




         DragDot.attr("class", "dragTargetObj")
        DragDot.attr("transform", "translate("+(SVGx+ImageWidth)+" "+(SVGy+ImageHeight)+")")
        DragDot.style("visibility", "visible")


        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")


        cw.bgImageWidthValue.value = ImageWidth
        cw.bgImageHeightValue.value = ImageHeight
        ImageCorner =[SVGx, SVGy]

        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragImage(evt)")
        mySVG.setAttribute("onmousemove", "dragImage(evt)")
        mySVG.setAttribute("onmouseup", "endDragImage(evt)")

        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false

    }
}

var ImageHREF
var ImageWidth
var ImageHeight
function loadImageFile()
{

    var cw = addElemImageCw

    var file = cw.document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function ()
        {

            ImageHREF = reader.result
             var image = new Image();
            image.src = reader.result;
            image.onload = function() {

                ImageWidth=image.naturalWidth
                ImageHeight=image.naturalHeight

            }
        }
        , false);

    if (file)
    {
        reader.readAsDataURL(file);

    }
}

///---X button and iframe close all---
function closeDrawImage()
{
    if(addElemImageViz==true)
    {
        closeIframe("addElemImage");
        coverOff()

        RotateAngle = 0
        var cw = addElemImageCw
        cw.adjustedRotateImageValue.value = 0
        var elemTimelinded = false

        if(EditImage==true && ImageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawImageEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")

        }
        DraggingObj = false
        DrawImage = false
        EditImage = false
        ImageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        MyMap.dragging.enable()
        MyMap.scrollWheelZoom.enable();
        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            mySVG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")
            dragDot.removeAttribute("cy")

        }
        activeElem = null
        ActiveElem = null
        ImageHREF = null
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")

        cw.drawImageTopButton.style.visibility = "hidden"
        // cw.drawImageBotButton.style.visibility = "hidden"
        cw.drawImageBotButton.disabled = true
        cw.drawImageFinishButton.disabled = true
        cw.drawImageCancelButton.disabled = true
        cw.drawImageCancelButton.style.borderColor = ""
        cw.drawImageDeleteButton.style.visibility = "hidden"
        cw.drawImageEditSpan.innerText = "Draw Images"
        cw.drawImageTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"



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
          MyMap.scrollWheelZoom.disable();
        MyMap.dragging.disable()
    mySVG.setAttribute("cursor","default")
  }


        cw.adjustedRotateImageValue.value = 0
        cw.bgImgFile.value = ""
        cw.bgImageWidthValue.value = ""
        cw.bgImageHeightValue.value = ""
        ImageHREf = null

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
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "image"+new Date().getTime()
            domElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("onmousedown", "editImageDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "imageElem")

            ActiveElem = null
            activeElem = null
             ImageHREF = null
            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
            finishedElem.setAttribute("onmouseover", "myZoomLevel("+MapZoom+","+id+")")
            finishedElem.setAttribute("onmouseout", "removeZoomLevel()")
          setLatLng(finishedElem) //---helperFuncts.js---
           MyMap.dragging.enable()
           MyMap.scrollWheelZoom.enable();


            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            //topG.appendChild(dragDot)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.drawImageBotButton.disabled = true
        }

}

function cancelDrawImage()
{
    var cw = addElemImageCw
    if(EditImage==true)
        cancelEditImage()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null
             ImageHREF = null
            mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            //topG.appendChild(dragDot)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageBotButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.adjustedRotateImageValue.value = 0


            coverOff()

        }

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

    var myZoomLevel=+elemObjEdit.getAttribute("InitZoom")
    if(isRightMB&&DrawImage==false&&myZoomLevel==MapZoom)
    {
        //  elemSizeDiv.innerHTML = "r = <input id=drawImageRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisImage = elemObjEdit

        DrawImageEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null
         ImageHREF = null
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
}

var EditImage = false
var DrawImageEditId
var EditThisImage

//---after iframe loaded see sendSize() at addElemImage.htm---
var EditImageObj
function setEditImage()
{
    coverOn()
    MyMap.dragging.disable()
    MyMap.scrollWheelZoom.disable();


    mySVG.removeAttribute('onclick')
    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
 EditImageObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditImageObj.setAttribute("id", "activeElem")
    EditImageObj.setAttribute("class", "dragTargetObj")

    EditImageObj.removeAttribute("onmousedown")

        domActiveElemG.insertBefore(EditImageObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawImageDeleteButton.style.visibility = "visible"
        cw.drawImageEditSpan.innerHTML = "Edit Image"

        cw.drawImageTopButton.style.visibility = "visible"
        cw.drawImageBotButton.style.visibility = "visible"
        cw.drawImageTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false
        cw.drawImageBotButton.disabled = false

        //...slocate dargdot---
        var bb=activeElem.getBBox()
        dragDot.setAttribute("cx",bb.width)
        dragDot.setAttribute("cy",bb.height)
                dragDot.setAttribute("transform",activeElem.getAttribute("transform"))

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
        var finishedElem = activeElem.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))

        finishedElem.setAttribute("class", "addElem")

        finishedElem.setAttribute("opacity", ActiveElem.attr("opacity"))

        finishedElem.setAttribute("rotateAngle", RotateAngle)


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
            setLatLng(finishedElem) //---helperFuncts.js---

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

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawImageEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    //topG.appendChild(dragDot) //--place drag dot on top---
    closeDrawImage()
    //setEditEllipse()

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

    DrawImageEditId = null
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

    activeElem.id = "domActiveElemG"
    activeElem.removeAttribute("transform")
    dragDot.removeAttribute("transform")

    activeElem.removeChild(activeElem.firstChild)

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
    activeElem = null
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

        activeElem.id = "domActiveElemG"
        activeElem.removeAttribute("transform")
        dragDot.removeAttribute("transform")
        domElemG.removeChild(elemObjEdit)
        activeElem.removeChild(activeElem.firstChild)
        domElemG.insertBefore(finishedElem, domElemG.firstChild)
        activeElem = null
        closeDrawImage()
    }
    else
    {
        finishDrawImage()
        domElemG.insertBefore(domElemG.lastChild, domElemG.firstChild)
    }

}
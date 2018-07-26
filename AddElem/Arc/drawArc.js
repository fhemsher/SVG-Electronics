///---X button and iframe close all---
function closeDrawArc()
{
    if(addElemArcViz==true)
    {
        closeIframe("addElemArc");
        coverOff()

        var cw = addElemArcCw

        if(EditArc==true && ArcDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawArcEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editArcDraw("+DrawArcEditId+",evt)")

        }
        DraggingObj = false
        DrawArc = false
        EditArc = false
        ArcDeleted = false
        Enclosed=false
        CenterLine=false
        cw.encloseCheck.checked=false
        cw.centerLineCheck.checked=false
        cw.xRadiusSliderValue.vlaue=55
        cw.xRadiusValue.value=55
        cw.yRadiusSliderValue.vlaue=250
        cw.yRadiusValue.value=250
    cw.angleSliderValue.value=0
    cw.angleValue.value=0
    cw.largeArcFlagCheck.checked=false
    cw.sweepFlagCheck.checked=false

    cw.drawArcStrokeDashCheck.checked=false
    cw.drawArcShadowCheck.checked=false
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
            document.getElementById("activeElem").removeAttribute("class")
            for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
            domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))


        }
        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")
        cw.drawArcFinishButton.disabled = true
        cw.drawArcCancelButton.disabled = true
        cw.drawArcShadowCheck.checked = false
        cw.drawArcCancelButton.style.borderColor = ""
        cw.drawArcDeleteButton.style.visibility = "hidden"
        cw.drawArcBotButton.disabled=true

        cw.drawArcEditSpan.innerText = "Draw Arcs"
        cw.drawArcTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"


    }
}

//---on add icon DrawX follows cursor
function trackDrawArc()
{
    var cw = addElemArcCw

    if(ZoomDrawing==false&&ActiveElem==null&&EditArc==false && ArcDeleted==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}

function writeArcD(ArcPoints)
{
    var d=""
    for(k=0;k<ArcPoints.length;k++)
    {
        var pnt=ArcPoints[k]+" "
        d+=pnt
    }
    if(ActiveElem)
    myArc.setAttribute("d",d)

    if(CenterLine==true)
        drawCenterLines()


}
var EditArc = false
var DrawArc = false
var ArcDeleted = false

function startArcDraw()
{
    var cw = addElemArcCw
    elemSizeDiv.innerHTML = "r = <input id=drawArcRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditArc==false)
    {
        ActiveElem = null
        activeElem = null
        DrawArc = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawArc()") //---click to add more icons for this session---

    }

}
//[M x1,y1,A, rx, ry, rotate, large_arc_flag, sweep_flag, x2 ,y2]
var ArcPoints=[] //=[M x1,y1,A, rx, ry, rotate, large_arc_flag, sweep_flag, x2 ,y2]
//--click on svg---
function placeDrawArc()
{
    var cw = addElemArcCw
    coverOn()

    var strokeColor = cw.drawArcStrokeSelect.options[cw.drawArcStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawArcStrokeWidthSelect.options[cw.drawArcStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawArcFillSelect.options[cw.drawArcFillSelect.selectedIndex].value
    var opacity = cw.drawArcOpacitySelect.options[cw.drawArcOpacitySelect.selectedIndex].text
    if(cw.drawArcFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("class","dragTarget")

     ActiveElem.append("path")
    .attr("id","myArc")
    .attr("class","dragTarget")
    .attr("stroke",strokeColor)
    .attr("stroke-width",strokeWidth)
    .attr("fill-rule","evenodd")
    .attr("fill",fillColor)
    .attr("fill-opacity", opacity)
    .attr("cursor","move")




    ///----start/end circles----
     ActiveElem.append("circle")
    .attr("id","circle1")
    .attr("class","dragTarget")
    .attr("fill","orange")
    .attr("r","10")
    .attr("stroke","gainsboro")
    .attr("stroke-width","2")
    .attr("pointer-events","all")
    .attr("fill-opacity",".8")
    .attr("cursor","pointer")
     ActiveElem.append("circle")
    .attr("id","circle2")
    .attr("class","dragTarget")
    .attr("fill","red")
    .attr("r","10")
    .attr("stroke","gainsboro")
    .attr("stroke-width","2")
    .attr("pointer-events","all")
    .attr("fill-opacity",".8")
    .attr("cursor","pointer")


    if(cw.drawArcShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawArcStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")


        DrawX.style("display", "none")

        ArcCenter =[SVGx, SVGy]

var mArc="M"
var x1=SVGx
var y1=SVGy
var aArc="A"
var rx=55   //----circular ry=rx
var ry=250
var rotate=0
var large_arc_flag=0
var sweep_flag=0
var x2=SVGx+50
var y2=SVGy

ArcPoints=[mArc,x1,y1,aArc, rx, ry, rotate, large_arc_flag, sweep_flag, x2 ,y2]

     writeArcD(ArcPoints)

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragArc(evt)")
        mySVG.setAttribute("onmousemove", "dragArc(evt)")
        mySVG.setAttribute("onmouseup", "endDragArc(evt)")

        cw.drawArcCancelButton.disabled = false
        cw.drawArcFinishButton.disabled = false
            cw.drawArcBotButton.disabled=false

    circle1.setAttribute("cx",x1)
    circle1.setAttribute("cy",y1)
    circle2.setAttribute("cx",x2)
    circle2.setAttribute("cy",y2)


}


var TransformRequestObjRotate
var TransListRotate

function rotateArcAdjust(factor)
{      var cw = addElemArcCw

    var mult = parseFloat(cw.rotateDrawArcAdjustSelect.options[cw.rotateDrawArcAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    TransformRequestObjRotate = activeElem.ownerSVGElement.createSVGTransform()
    //---attach new or existing transform to element, init its transform list---
    var myTransListAnim=activeElem.transform
    TransListRotate=myTransListAnim.baseVal
    TransformRequestObjRotate.setRotate(rotateAdd,ArcPoints[1],ArcPoints[2])
    TransListRotate.appendItem(TransformRequestObjRotate)
    TransListRotate.consolidate()


}

var TransformRequestObjScale
var TransListScale
function scaleArcAdjust(factor)
{
    var cw = addElemArcCw
    var mult = parseFloat(cw.scaleDrawArcAdjustSelect.options[cw.scaleDrawArcAdjustSelect.selectedIndex].text)
    var scaleAdd = parseFloat(factor)*mult+1.00

    //---get center of activeElem-----
    domWrapper.appendChild(activeElem) //--inser in Wrapper--
    var bb=domWrapper.getBBox()
    bbx=bb.x
    bby=bb.y
    bbw=bb.width
    bbh=bb.height
    var cx=bbx+.5*bbw
    var cy=bby+.5*bbh

    domActiveElemG.appendChild(activeElem) //---extract from wrapper--


    TransformRequestObjScale = activeElem.ownerSVGElement.createSVGTransform()
    //---attach new or existing transform to element, init its transform list---
    var myTransListAnim=activeElem.transform
    TransListScale=myTransListAnim.baseVal

    TransformRequestObjScale.setTranslate(cx,cy)
    TransListScale.appendItem(TransformRequestObjScale)
    TransListScale.consolidate()
    TransformRequestObjScale.setScale(scaleAdd,scaleAdd)
    TransListScale.appendItem(TransformRequestObjScale)
    TransListScale.consolidate()
     TransformRequestObjScale.setTranslate(-cx,-cy)
    TransListScale.appendItem(TransformRequestObjScale)

    TransListScale.consolidate()



}

var XRadius=false
function radiusXset(value)
{
    var cw = addElemArcCw
   if(XRadius==true)
   {
        ArcPoints[4]=value
        cw.xRadiusSliderValue.value=value
        cw.xRadiusValue.value=ArcPoints[4]

        writeArcD(ArcPoints)
   }
}
var YRadius=false
function radiusYset(value)
{
    var cw = addElemArcCw
   if(YRadius==true)
   {
        ArcPoints[5]=value
        cw.yRadiusSliderValue.value=value
        cw.yRadiusValue.value=ArcPoints[5]

        writeArcD(ArcPoints)
   }
}

var Angle=false
function setAngle(value)
{
    var cw = addElemArcCw
   if(Angle==true)
   {
        ArcPoints[6]=value
        cw.angleSliderValue.value=value
        cw.angleValue.value=ArcPoints[6]

        writeArcD(ArcPoints)
   }
}

function largeArcFlagChecked()
{
    var cw = addElemArcCw
    if(cw.largeArcFlagCheck.checked)
        ArcPoints[7]=1
    else
        ArcPoints[7]=0

    writeArcD(ArcPoints)
}
function sweepFlagChecked()
{
    var cw = addElemArcCw
    if(cw.sweepFlagCheck.checked)
        ArcPoints[8]=1
    else
        ArcPoints[8]=0

    writeArcD(ArcPoints)
}

var Enclosed=false
function encloseChecked()
{
    var cw = addElemArcCw
    if(cw.encloseCheck.checked)
    {
        Enclosed=true
        cw.centerLineCheck.checked=false
        CenterLine=false
        ArcPoints[11]="z"
        writeArcD(ArcPoints)
    }
    else
    {
        Enclosed=false
        ArcPoints.pop()
        writeArcD(ArcPoints)
    }
}
var CenterLine=false
function centerLineChecked()
{
    var cw = addElemArcCw
    if(cw.centerLineCheck.checked)
    {
        CenterLine=true
        cw.encloseCheck.checked=false
        Enclosed=false
        if(ArcPoints.length==12)
        {
            ArcPoints.pop()

        }

        drawCenterLines()
         writeArcD(ArcPoints)
    }
    else
    {
        CenterLine=false
        writeArcD(ArcPoints)
    }
}

var ArcCenterLines
function drawCenterLines()
{
    if(ActiveElem)
    {
    //---get center of activeElem-----
        domWrapper.appendChild(myArc) //--insert in Wrapper--
        var bb=domWrapper.getBBox()
        bbx=bb.x
        bby=bb.y
        bbw=bb.width
        bbh=bb.height
        var cx=bbx+.5*bbw
        var cy=bby+.5*bbh
        activeElem.appendChild(myArc) //---extract from wrapper--

        ArcCenterLines="M"+ArcPoints[1]+" "+ArcPoints[2]+"L"+cx+" "+cy+"L"+ArcPoints[9]+" "+ArcPoints[10]
        var arcD=myArc.getAttribute("d")+ArcCenterLines
        myArc.setAttribute("d",arcD)
    }
}


function finishDrawArc()
{

    if(EditArc==true)
        finishEditArc()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemArcCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            activeElem.removeChild(circle1)
            activeElem.removeChild(circle2)
            activeElem.lastChild.removeAttribute("id")
            activeElem.lastChild.removeAttribute("cursor")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "arc"+new Date().getTime()
      //ArcPoints=[m,x1,y1,a, rx, ry, rotate, large_arc_flag, sweep_flag, x2 ,y2]

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("x1",ArcPoints[1])
            finishedElem.setAttribute("y1",ArcPoints[2])
            finishedElem.setAttribute("rx",ArcPoints[4])
            finishedElem.setAttribute("ry",ArcPoints[5])
            finishedElem.setAttribute("rotate",ArcPoints[6])
            finishedElem.setAttribute("large_arc_flag",ArcPoints[7])
            finishedElem.setAttribute("sweep_flag",ArcPoints[8])
            finishedElem.setAttribute("x2",ArcPoints[9])
            finishedElem.setAttribute("y2",ArcPoints[10])
            finishedElem.setAttribute("enclosed",Enclosed)
            finishedElem.setAttribute("center_line",CenterLine)
            if(CenterLine==true)
            {
               finishedElem.setAttribute("lines",ArcCenterLines)


            }

             finishedElem.setAttribute("class", "arcElem")
             finishedElem.setAttribute("onmousedown", "editArcDraw("+id+",evt)")
            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")


            domElemG.appendChild(finishedElem)


            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawArc()") //---click to add more icons for this session---
            DrawX.style("display", "none")

            // topG.appendChild(dragDot)
            cw.drawArcFinishButton.disabled = true
            cw.drawArcCancelButton.disabled = true
            cw.drawArcBotButton.disabled=true
            console.log(finishedElem)
            console.log(domActiveElemG)
        }
}

function cancelDrawArc()
{
    var cw = addElemArcCw
    if(EditArc==true)
        cancelEditArc()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawArc()") //---click to add more icons for this session---

            cw.drawArcFinishButton.disabled = true
            cw.drawArcCancelButton.disabled = true
            cw.drawArcBotButton.disabled=true
            coverOff()

        }

        cw.drawArcCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditArc = false
var DrawArcEditId
var EditThisArc
//--mousedown/right button on circle---
function editArcDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawArc==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "r = <input id=drawArcRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisArc = elemObjEdit

        DrawArcEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditArc = true
        if(addElemArcLoad==false)
        {
            openIframe("AddElem", "addElemArc", 10)

        }
        else if(addElemArcViz==false)
        {
            openIframe("AddElem", "addElemArc", 10)
            setEditArc()
        }
        else
            setEditArc()

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
        ZoomDraggedElems.push([dragTarget,"editArcDraw("+dragTarget.id+",evt)",classed])
    }



}
//---after iframe loaded see sendSize() at addElemArc.htm---
var EditArcObj
function setEditArc()
{
    coverOn()

    var cw = addElemArcCw

    var elemObjEdit = document.getElementById(DrawArcEditId)

    EditArcObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditArcObj.setAttribute("id", "activeElem")
    EditArcObj.setAttribute("class", "dragTarget")
    EditArcObj.removeAttribute("onmousedown")
     var mArc="M"
var x1=+EditArcObj.getAttribute("x1")
var y1=+EditArcObj.getAttribute("y1")
var aArc="A"
var rx=+EditArcObj.getAttribute("rx")
var ry=+EditArcObj.getAttribute("ry")
var rotate=+EditArcObj.getAttribute("rotate")
var large_arc_flag=+EditArcObj.getAttribute("large_arc_flag")
var sweep_flag=+EditArcObj.getAttribute("sweep_flag")
var x2=+EditArcObj.getAttribute("x2")
var y2=+EditArcObj.getAttribute("y2")


    ArcPoints=[mArc,x1,y1,aArc, rx, ry, rotate, large_arc_flag, sweep_flag, x2 ,y2]
    domActiveElemG.appendChild(EditArcObj)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")
    activeElem.getElementsByTagName("path")[0].setAttribute("id","myArc")
 ///----start/end circles----
     ActiveElem.append("circle")
    .attr("id","circle1")
    .attr("class","dragTarget")
    .attr("fill","orange")
    .attr("r","10")
    .attr("stroke","gainsboro")
    .attr("stroke-width","2")
    .attr("pointer-events","all")
    .attr("fill-opacity",".8")
    .attr("cursor","pointer")
    .attr("cx",x1)
    .attr("cy",y1)

     ActiveElem.append("circle")
    .attr("id","circle2")
    .attr("class","dragTarget")
    .attr("fill","red")
    .attr("r","10")
    .attr("stroke","gainsboro")
    .attr("stroke-width","2")
    .attr("pointer-events","all")
    .attr("fill-opacity",".8")
    .attr("cursor","pointer")
    .attr("cx",x2)
    .attr("cy",y2)

    if(EditArcObj.getAttribute("enclosed")=="true")
    {
       Enclosed=true
       cw.encloseCheck.checked=true
       ArcPoints[11]="z"
    }
    else
    {
       Enclosed=false
       cw.encloseCheck.checked=false
        ArcPoints[11]=""
    }
    if(EditArcObj.getAttribute("center_line")=="true")
    {
       CenterLine=true
       cw.centerLineCheck.checked=true
       ArcCenterLines=EditArcObj.getAttribute("lines")
    }
    else
    {
       CenterLine=false
       cw.centerLineCheck.checked=false
    }

    cw.xRadiusValue.value=rx
    cw.yRadiusValue.value=ry
    cw.angleValue.value=rotate
    if(large_arc_flag==1)
        cw.largeArcFlagCheck.checked=true
    else
        cw.largeArcFlagCheck.checked=false
    if(sweep_flag==1)
        cw.sweepFlagCheck.checked=true
    else
        cw.sweepFlagCheck.checked=false



    if(EditArcObj.getElementsByTagName("path")[0].getAttribute("filter"))
        cw.drawArcShadowCheck.checked = true
    else
        cw.drawArcShadowCheck.checked = false
       // domActiveElemG.insertBefore(EditArcObj, domActiveElemG.firstChild)

        cw.drawArcDeleteButton.style.visibility = "visible"
        cw.drawArcTopButton.style.visibility = "visible"
        cw.drawArcBotButton.style.visibility = "visible"

        cw.drawArcEditSpan.innerHTML = "Edit Arc"
        cw.drawArcTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawArcCancelButton.disabled = false
        cw.drawArcFinishButton.disabled = false
            cw.drawArcBotButton.disabled=false


        var stroke = EditArcObj.getElementsByTagName("path")[0].getAttribute("stroke")
        var strokeWidth = EditArcObj.getElementsByTagName("path")[0].getAttribute("stroke-width")
        var fill = EditArcObj.getElementsByTagName("path")[0].getAttribute("fill")


        var opacity = EditArcObj.getElementsByTagName("path")[0].getAttribute("fill-opacity")

     if(opacity!="0")
    {
        setSelect("Arc", "Opacity", opacity)
        setSelect("Arc", "Fill", fill)
        cw.drawArcFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawArcFillBg.style.backgroundColor = ""
        cw.drawArcFillSelect.selectedIndex = 0

    }
     if(fill.indexOf("url")!=-1) //---gradient or pattern---
     {
        cw.drawArcFillBg.style.backgroundColor = ""
        cw.drawArcFillSelect.selectedIndex = 0

     }




    setSelect("Arc", "Stroke", stroke)
    setSelect("Arc", "StrokeWidth", strokeWidth)
    //---update bg colors---
    cw.drawArcStrokeBg.style.backgroundColor = stroke
    if(activeElem.getElementsByTagName("path")[0].getAttribute("stroke-dasharray"))
        cw.drawArcStrokeDashCheck.checked = true
        else
            cw.drawArcStrokeDashCheck.checked = false

            var matrix = activeElem.getCTM()

            var transX = matrix.e
            var transY = matrix.f




            setArcEditDrag()

            mySVG.style.cursor = ""

}

function setArcEditDrag()
{

    activeElem.removeAttribute("onmousedown")
   // DragDot.style("visibility", "visible")
    mySVG.setAttribute("onmousedown", "startDragArc(evt)")
    mySVG.setAttribute("onmousemove", "dragArc(evt)")
    mySVG.setAttribute("onmouseup", "endDragArc(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditArc()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemArcCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "arcElem")

        finishedElem.setAttribute("id", DrawArcEditId)
        for(var k=finishedElem.childNodes.length-1;k>=0;k--)
        {
            var node=finishedElem.childNodes.item(k)
            if(node.nodeName=="circle")
                finishedElem.removeChild(node)
             if(node.nodeName=="path")
                node.removeAttribute("id")

        }
        for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
        if(domActiveElemG.childNodes.item(k).id!="dragDot")
            domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))

         domActiveElemG.appendChild(dragDot)

        finishedElem.style.cursor = "default"
                finishedElem.setAttribute("x1",ArcPoints[1])
                finishedElem.setAttribute("y1",ArcPoints[2])
                finishedElem.setAttribute("rx",ArcPoints[4])
                finishedElem.setAttribute("ry",ArcPoints[5])
                finishedElem.setAttribute("rotate",ArcPoints[6])
                finishedElem.setAttribute("large_arc_flag",ArcPoints[7])
                finishedElem.setAttribute("sweep_flag",ArcPoints[8])
                finishedElem.setAttribute("x2",ArcPoints[9])
                finishedElem.setAttribute("y2",ArcPoints[10])
                finishedElem.setAttribute("enclosed",Enclosed)
                finishedElem.setAttribute("center_line",CenterLine)
                if(CenterLine==true)
                {
                    finishedElem.setAttribute("lines",ArcCenterLines)


                }
        finishedElem.setAttribute("onmousedown", "editArcDraw("+DrawArcEditId+",evt)")
        finishedElem.setAttribute("id", DrawArcEditId)
        domElemG.insertBefore(finishedElem, EditThisArc)
        domElemG.removeChild(EditThisArc)

    }
    console.log(finishedElem)
    console.log(domActiveElemG)


    closeDrawArc()
}

function resetEditArc()
{

    var cw = addElemArcCw

    document.getElementById(DrawArcEditId).setAttribute("opacity", 1)

    EditArc = false
    cw.drawArcEditSpan.innerText = "Draw Arcs"
    cw.drawArcTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
   // mySVG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawArcDeleteButton.style.visibility = "hidden"
    cw.drawArcCancelButton.disabled = false
    cw.drawArcFinishButton.disabled = false
    DrawArc = true
    mySVG.setAttribute('onclick', "placeDrawArc()")

}

function cancelEditArc()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawArcEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawArc()

}

//=======================delete circle==================
var ArcDeleted = false
//---button---
function removeCurrentDrawArc()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawArcEditId)
    domElemG.removeChild(elemObjEdit)
    ArcDeleted = true

    var cw = addElemArcCw

    closeDrawArc()

}

//====================Top/Bot===================
function topDrawArc()
{

    var elemObjEdit = document.getElementById(DrawArcEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "arcElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawArcEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawArc()
}
function botDrawArc()
{
    if(EditArc)
    {
        var elemObjEdit = document.getElementById(DrawArcEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "arcElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawArcEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))

        domElemG.removeChild(elemObjEdit)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)

       closeDrawArc()
   }
   else
   {
        finishDrawArc()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}


function showDrawArcStrokeBg()
{
    var cw = addElemArcCw
    var stroke = cw.drawArcStrokeSelect.options[cw.drawArcStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawArcStrokeBg.style.backgroundColor = stroke
        else
            cw.drawArcStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            myArc.setAttribute("stroke", stroke)

}

function drawArcStrokeSelected()
{
    var cw = addElemArcCw
    var stroke = cw.drawArcStrokeSelect.options[cw.drawArcStrokeSelect.selectedIndex].value

    if(ActiveElem)
         myArc.setAttribute("stroke", stroke)

}

function showDrawArcFillBg()
{
    var cw = addElemArcCw
    var fill = cw.drawArcFillSelect.options[cw.drawArcFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawArcFillBg.style.backgroundColor = fill
        else
            cw.drawArcFillBg.style.backgroundColor = ""
        if(ActiveElem&&cw.drawArcFillSelect.selectedIndex==0)
        {
             myArc.setAttribute("fill", "white")
             myArc.setAttribute("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
             myArc.setAttribute("fill", fill)
            var opacity = cw.drawArcOpacitySelect.options[cw.drawArcOpacitySelect.selectedIndex].text

             myArc.setAttribute("fill-opacity", opacity)

        }

}

function drawArcFillSelected()
{
    var cw = addElemArcCw
    var fill = cw.drawArcFillSelect.options[cw.drawArcFillSelect.selectedIndex].value
    if(cw.drawArcFillSelect.selectedIndex==0)
    {
         myArc.setAttribute("fill", "white")
         myArc.setAttribute("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
         myArc.setAttribute("fill", fill)
        var opacity = cw.drawArcOpacitySelect.options[cw.drawArcOpacitySelect.selectedIndex].text

         myArc.setAttribute("fill-opacity", opacity)

    }

}

function drawArcOpacitySelected()
{
    var cw = addElemArcCw
    var opacity = cw.drawArcOpacitySelect.options[cw.drawArcOpacitySelect.selectedIndex].text
    if(ActiveElem)
         myArc.setAttribute("fill-opacity", opacity)

}

function drawArcStrokeWidthSelected()
{
    var cw = addElemArcCw
    var strokeWidth = cw.drawArcStrokeWidthSelect.options[cw.drawArcStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
         myArc.setAttribute("stroke-width", strokeWidth)

}

function drawArcStrokeDashChecked()
{
    var cw = addElemArcCw
    if(cw.drawArcStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
             myArc.setAttribute("stroke-dasharray", "8 4")

    }
    else
    {
        if(ActiveElem)
             myArc.removeAttribute("stroke-dasharray")

    }

}

function drawArcShadowChecked()
{

    var cw = addElemArcCw
    if(cw.drawArcShadowCheck.checked==true)
    {
        if(ActiveElem)
             myArc.setAttribute("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
             myArc.removeAttribute("filter")

    }

}
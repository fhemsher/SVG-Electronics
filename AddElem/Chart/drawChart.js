 var Slices
function drawChartSliceButtonClicked()
{

    var cw = addElemChartCw
    if(cw.drawChartSliceValue.value !="")
    {
      for(var k=cw.drawChartSliceTable.rows.length-1;k>0;k--)
       cw.drawChartSliceTable.deleteRow(k)


    Slices=+cw.drawChartSliceValue.value
      var rowCnt=1
      for(var k=0;k<Slices;k++)
      {
         var row=cw.drawChartSliceTable.insertRow(rowCnt++)
         var numCell=row.insertCell(0).innerHTML=k+1
         var titleCell=row.insertCell(1).innerHTML="<input type=text style=width:60px; id=pieSliceTitleValue"+k+" />"
         var dataCell=row.insertCell(2).innerHTML="<input type=text style=width:60px; id=pieSliceDataValue"+k+" />"

      }


    }
}

 var ScaleChart=false
function scaleChart(value)
{
     var cw = addElemChartCw
    if(ScaleChart)
    {

      cw.scaleValue.value=value
      if(ActiveElem)
      {
        var currentMatrix=domActiveElemG.getCTM()

        var matrix = mySVG.createSVGMatrix();
        matrix.a=1
        matrix.b=0
        matrix.c=0
        matrix.d=1
        matrix.e=currentMatrix.e
        matrix.f=currentMatrix.f

        var m2s=matrix.a+","+matrix.b+","+matrix.c+","+matrix.d+","+matrix.e+","+matrix.f
        domActiveElemG.setAttribute("transform","matrix("+m2s+")")
        var transformRequest = mySVG.createSVGTransform()
        //---attach new or existing transform to element, init its transform list---
        var myTransListAnim = domActiveElemG.transform
        var transList = myTransListAnim.baseVal


        transformRequest.setScale(value, value)
        transList.appendItem(transformRequest)
        transList.consolidate()
      }


    }

}




///---X button and iframe close all---
function closeDrawChart()
{
    if(addElemChartViz==true)
    {
        closeIframe("addElemChart");
        coverOff()

        var cw = addElemChartCw

        if(EditChart==true && ChartDeleted==false) //---closes when editing not finished
        {
            var elemObjEdit = document.getElementById(DrawChartEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editChartDraw("+DrawChartEditId+",evt)")
            if(ActiveElem)
            {
               domActiveElemG.removeChild(document.getElementById("activeElem"))
               domActiveElemG.removeAttribute("transform")


            }
        }
        if(DrawChart==true && ActiveElem)
        {

           domActiveElemG.removeChild(document.getElementById("chartG"))
           domActiveElemG.removeAttribute("transform")



        }

        DraggingObj = false
        DrawChart = false
        EditChart = false
        ChartDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        DrawX.style("display", "none")
        mySVG.removeAttribute('onclick')

        if(document.getElementById("chartG"))
        {
          cancelDrawChart()


        }
        activeElem = null
        ActiveElem = null

         DrawX.attr("stroke", "violet")
        cw.drawChartFinishButton.disabled = true
        cw.drawChartCancelButton.disabled = true

        cw.drawChartCancelButton.style.borderColor = ""
        cw.drawChartDeleteButton.style.visibility = "hidden"

        cw.drawChartEditSpan.innerText = "Draw Pie Charts"
         cw.drawChartTopTable.style.backgroundColor = "#3cb371"

        cw.drawChartSliceButton.disabled=false
            cw.valuesCompletedSpan.innerHTML="(Click on drawing after values are completed)"
          cw.scaleRangeValue.value=1
            cw.scaleValue.value=1

                 for(var k=cw.drawChartSliceTable.rows.length-1;k>0;k--)
                        cw.drawChartSliceTable.deleteRow(k)
          cw.drawChartTitleValue.disabled=false
          cw.drawChartTitleValue.value=""


                cw.drawChartSliceValue.disabled=false
                cw.drawChartSliceValue.value=""
    }
}

//---on add icon DrawX follows cursor
function trackDrawChart()
{
    var cw = addElemChartCw

    if(ZoomDrawing==false&&ActiveElem==null&&EditChart==false && ChartDeleted==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}

var EditChart = false
var DrawChart = false
var ChartDeleted = false

function startChartDraw()
{
    var cw = addElemChartCw
    if(EditChart==false)
    {
        ActiveElem = null
        activeElem = null
        DrawChart = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawChart()") //---click to add more icons for this session---

    }

}

//--click on svg---


//var ChartData=[]
//var FinishedData=[]

 var SliceTitleArray=[]
 var SliceDataArray=[]

function placeDrawChart()
{
    var cw = addElemChartCw


    if(cw.drawChartSliceTable.rows.length>1)
    {   coverOn()


        var title=cw.drawChartTitleValue.value

        if(title!="")
        {
            var scale=cw.scaleRangeValue.value

           SliceTitleArray =[]
          SliceDataArray =[]
          for(var k=0;k<Slices;k++)
          {
             var slice=Slices[k]
             var sliceTitle=cw.document.getElementById("pieSliceTitleValue"+k).value
             var sliceData=+cw.document.getElementById("pieSliceDataValue"+k).value

             if(sliceTitle!="")
             {

                 SliceTitleArray.push(sliceTitle)
                 SliceDataArray.push(sliceData)
              }
          }

               console.log(SliceTitleArray)
               console.log(SliceDataArray)


         buildDrawChart(title,scale,SliceTitleArray,SliceDataArray)

                     for(var k=cw.drawChartSliceTable.rows.length-1;k>0;k--)
                        cw.drawChartSliceTable.deleteRow(k)
                cw.drawChartSliceValue.value=""
        }




        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        //DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        ChartCenter =[SVGx, SVGy]





        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragChart(evt)")
        mySVG.setAttribute("onmousemove", "dragChart(evt)")
        mySVG.setAttribute("onmouseup", "endDragChart(evt)")

        cw.drawChartCancelButton.disabled = false
        cw.drawChartFinishButton.disabled = false
    }
}

function finishDrawChart()
{

    if(EditChart==true)
        finishEditChart()
        else if(document.getElementById("chartG"))
        {
            var cw = addElemChartCw
            //activeElem.removeAttribute("class")
            //activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("chartG").cloneNode(true)


            finishedElem.setAttribute("transform",domActiveElemG.getAttribute("transform"))


            finishedElem.lastChild.setAttribute("cursor","default")
            domActiveElemG.removeChild(document.getElementById("chartG"))
            domActiveElemG.removeAttribute("transform")
            var id = "chart"+new Date().getTime()

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("sliceTitle",SliceTitleArray.toString())
            finishedElem.setAttribute("sliceData", SliceDataArray.toString())
            finishedElem.setAttribute("title", cw.drawChartTitleValue.value )
            finishedElem.setAttribute("scale", cw.scaleRangeValue.value )


           // finishedElem.setAttribute("fill-opacity", cw.drawChartOpacitySelect.options[cw.drawChartOpacitySelect.selectedIndex].text)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmouseup",)
            mySVG.removeAttribute("onmousemove",)

            finishedElem.setAttribute("onmousedown", "editChartDraw("+id+",evt)")

            domElemG.appendChild(finishedElem)

            finishedElem.setAttribute("class", "chartElem")

            ActiveElem = null
            activeElem = null


            mySVG.setAttribute('onclick', "placeDrawChart()") //---click to add more icons for this session---
            DrawX.style("display", "none")

            // topG.appendChild(dragDot)
            cw.drawChartFinishButton.disabled = true
            cw.drawChartCancelButton.disabled = true


        }
}

function cancelDrawChart()
{
    var cw = addElemChartCw
    if(EditChart==true)
        cancelEditChart()
        else if(document.getElementById("chartG"))
        {
            domActiveElemG.removeChild(document.getElementById("chartG"))
           domActiveElemG.removeAttribute("transform")
            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawChart()") //---click to add more icons for this session---

            ChartData=[]
            cw.drawChartFinishButton.disabled = true
            cw.drawChartCancelButton.disabled = true


            coverOff()

        }

        cw.drawChartCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditChart = false
var DrawChartEditId
var EditThisChart
//--mousedown/right button on circle---
function editChartDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawChart==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "r = <input id=drawChartRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisChart = elemObjEdit

        DrawChartEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditChart = true
        if(addElemChartLoad==false)
        {
            openIframe("AddElem", "addElemChart", 10)

        }
        else if(addElemChartViz==false)
        {
            openIframe("AddElem", "addElemChart", 10)
            setEditChart()
        }
        else
            setEditChart()

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
        ZoomDraggedElems.push([dragTarget,"editChartDraw("+dragTarget.id+",evt)",classed])
    }



}
//---after iframe loaded see sendSize() at addElemChart.htm---
var EditChartObj
function setEditChart()
{
    coverOn()

    var cw = addElemChartCw

    var elemObjEdit = document.getElementById(DrawChartEditId)

    EditChartObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditChartObj.setAttribute("id", "activeElem")

    EditChartObj.removeAttribute("onmousedown")
    EditChartObj.lastChild.setAttribute("cursor","move")
   ActiveElem=d3.select("#domActiveElemG")
   ActiveElem.attr("class", "dragTargetObj")

 EditChartObj.removeAttribute("transform")



        domActiveElemG.appendChild(EditChartObj)
        domActiveElemG.setAttribute('transform',elemObjEdit.getAttribute("transform"))

                 for(var k=cw.drawChartSliceTable.rows.length-1;k>0;k--)
                        cw.drawChartSliceTable.deleteRow(k)
        //---write slice title/data table---???
        var scale=EditChartObj.getAttribute("scale")
        var title=EditChartObj.getAttribute("title")
         var sliceTitle=EditChartObj.getAttribute("sliceTitle").split(",")
         var sliceData=EditChartObj.getAttribute("sliceData").split(",")
         var points=sliceData.length
         cw.drawChartTitleValue.value=title
         cw.drawChartSliceValue.value=points
               var rowCnt=1
              for(var k=0;k<points;k++)
              {
                 var row=cw.drawChartSliceTable.insertRow(rowCnt++)
                 var numCell=row.insertCell(0).innerHTML=k+1
                 var titleCell=row.insertCell(1).innerHTML="<input disabled type=text style=width:60px; id=pieSliceTitleValue"+k+" value='"+sliceTitle[k]+"' />"
                 var dataCell=row.insertCell(2).innerHTML="<input disabled  type=text style=width:60px; id=pieSliceDataValue"+k+" value="+sliceData[k]+" />"

              }
            cw.drawChartSliceButton.disabled=true
            cw.valuesCompletedSpan.innerHTML="Current data values"
            cw.scaleRangeValue.value=scale
            cw.scaleValue.value=scale
             cw.drawChartTitleValue.disabled=true
              cw.drawChartSliceButton.disabled=true
                cw.drawChartSliceValue.disabled=true
        cw.drawChartDeleteButton.style.visibility = "visible"


        cw.drawChartEditSpan.innerHTML = "Edit Chart"

        cw.drawChartTopTable.style.backgroundColor = "orange"
        cw.drawChartCancelButton.disabled = false
        cw.drawChartFinishButton.disabled = false



            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))



            setChartEditDrag()

            mySVG.style.cursor = ""

}


function setChartEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragChart(evt)")
    mySVG.setAttribute("onmousemove", "dragChart(evt)")
    mySVG.setAttribute("onmouseup", "endDragChart(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditChart()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemChartCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)



        finishedElem.setAttribute("class", "chartElem")

        finishedElem.setAttribute("id", DrawChartEditId)
        finishedElem.setAttribute("transform", domActiveElemG.getAttribute("transform"))

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        domActiveElemG.removeAttribute("transform")
        finishedElem.lastChild.setAttribute("cursor","default")

        finishedElem.setAttribute("onmousedown", "editChartDraw("+DrawChartEditId+",evt)")
        finishedElem.setAttribute("id", DrawChartEditId)
        domElemG.insertBefore(finishedElem, EditThisChart)
        domElemG.removeChild(EditThisChart)
       EditChart=false //---let close be aware===
    }

    closeDrawChart()
}

function cancelEditChart()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawChartEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawChart()

}


//=======================delete circle==================
var ChartDeleted = false
//---button---
function removeCurrentDrawChart()
{

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    domActiveElemG.removeAttribute("transform")
    var elemObjEdit = document.getElementById(DrawChartEditId)
    domElemG.removeChild(elemObjEdit)
    ChartDeleted = true



    closeDrawChart()

}




function showDrawChartStrokeBg()
{
    var cw = addElemChartCw
    var stroke = cw.drawChartStrokeSelect.options[cw.drawChartStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawChartStrokeBg.style.backgroundColor = stroke
        if(ActiveElem)
        {    if(cw.drawChartCurveRadio.checked)
             document.getElementById('curvePath').setAttribute("stroke", stroke)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("stroke",stroke)




             }
        }
}


function showDrawChartFillBg()
{
    var cw = addElemChartCw
    var fill = cw.drawChartFillSelect.options[cw.drawChartFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawChartFillBg.style.backgroundColor = fill
        else
            cw.drawChartFillBg.style.backgroundColor = ""
        if(ActiveElem)
        {    if(cw.drawChartCurveRadio.checked)
             document.getElementById('areaCurve').setAttribute("fill", fill)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("fill",fill)




             }
        }

}

function drawChartFillSelected()
{
    var cw = addElemChartCw
    var fill = cw.drawChartFillSelect.options[cw.drawChartFillSelect.selectedIndex].value
    if(ActiveElem)
    {
        if(cw.drawChartCurveRadio.checked)
        document.getElementById('areaCurve').setAttribute("fill", fill)
        else
        {



        }


    }

}

function drawChartOpacitySelected()
{
    var cw = addElemChartCw
    var opacity = cw.drawChartOpacitySelect.options[cw.drawChartOpacitySelect.selectedIndex].text
    if(ActiveElem)
        areaCurve.setAttribute("fill-opacity", opacity)

}

function drawChartStrokeWidthSelected()
{
    var cw = addElemChartCw
    var strokeWidth = cw.drawChartStrokeWidthSelect.options[cw.drawChartStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
    {
            if(cw.drawChartCurveRadio.checked)
             document.getElementById('curvePath').setAttribute("stroke-width", strokeWidth)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("stroke-width",strokeWidth)
             }
    }


}


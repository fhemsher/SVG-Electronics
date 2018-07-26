
var DataType
function drawGraphCSVButtonClicked()
{
     var cw = addElemGraphCw

                    cw.validDataSpan.innerHTML="(After points are completed, click on drawing to locate graph.)"
                   cw.validDataSpan.style.color=""

 cw.drawGraphDataTable.style.display="none"
     cw.drawGraphDataValue.style.display="block"
     cw.drawGraphDataValue.placeholder='Paste CSV Data here...\n\n'+
    'xData,yData\n'+
    'xdata 1,ydata 1\n'+
    'xdata 2,ydata 2\n'+
    'xdata 3,ydata 3\n'+
    '...'
   DataType="CSV"
}
function drawGraphJSONButtonClicked()
{
    var cw = addElemGraphCw
                    cw.validDataSpan.innerHTML="(After points are completed, click on drawing to locate graph.)"
                   cw.validDataSpan.style.color=""
         cw.drawGraphDataTable.style.display="none"
     cw.drawGraphDataValue.style.display="block"
     cw.drawGraphDataValue.placeholder='Paste JSON Data here...\n\n'+
    '[\n{xData:"xdata 1",yData:"ydata 1"},{xData:"xdata 2",yData:"ydata 2"},{xData:"xdata 3",yData:"ydata 3"},\n...\n]'

  DataType="JSON"


}

function resetError()
{
   var cw = addElemGraphCw
                    cw.validDataSpan.innerHTML="(After points are completed, click on drawing to locate graph.)"
                   cw.validDataSpan.style.color=""





}
function drawGraphDataPointsButtonClicked()
{
var cw = addElemGraphCw
                    cw.validDataSpan.innerHTML="(After points are completed, click on drawing to locate graph.)"
                   cw.validDataSpan.style.color=""

  if(cw.drawGraphDataPointsValue.value!="")
  {
      DataType="POINT"
     cw.drawGraphDataTable.style.display="block"
     cw.drawGraphDataValue.style.display="none"


        //---clear previous---
         var rows=cw.drawGraphDataTable.rows
         for(var k=rows.length-1;k>0;k--)
          cw.drawGraphDataTable.deleteRow(k)

        var points=+cw.drawGraphDataPointsValue.value
        for(var k=0;k<points;k++)
        {
            var rowCnt=k+1
            var row=cw.drawGraphDataTable.insertRow(rowCnt)
            var cntCell=row.insertCell(0).innerHTML=rowCnt
            var xCell=row.insertCell(1).innerHTML="<input type=text style=width:120px id=xValue"+k+" >"
            var yCell=row.insertCell(2).innerHTML="<input type=text style=width:120px id=yValue"+k+" >"

        }

  }

}


var DrawGraphTimeFormat=false
function drawGraphTimeFormatChecked()
{
    var cw = addElemGraphCw
    if(cw.drawGraphTimeFormatCheck.checked)
    {
      cw.drawGraphDateFormatSelect.disabled=false
       DrawGraphTimeFormat=true
    }
    else
    {
       cw.drawGraphDateFormatSelect.disabled=true
       DrawGraphTimeFormat=false
        cw.drawGraphDateFormatSelectedIndex=0
        cw.drawGraphDateFormatDiv.innerHTML = ''
    }


}
 var ScaleGraph=false
function scaleGraph(value)
{
     var cw = addElemGraphCw
    if(ScaleGraph)
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
function drawGraphDateFormatSelected()
{
var cw = addElemGraphCw



       var iso1 = d3.timeFormat("%Y-%m-%d");
    var iso2 = d3.timeFormat("%Y/%m/%d %H:%M:%S");
    var iso3 = d3.timeFormat("%Y-%m-%dT%H:%M");



    //---typical U.S. times---
    var mdy=d3.timeFormat("%m/%d/%Y")
    var mdyhm=d3.timeFormat("%m/%d/%Y %H:%M")
    var mdyhms=d3.timeFormat("%m/%d/%Y %H:%M:%S")
    var hms=d3.timeFormat("%H:%M:%S")
    var ms= d3.timeFormat("%M:%S")
      var selIndex = cw.drawGraphDateFormatSelect.selectedIndex

    //---show example of this date format---
    var date = new Date()
    if(selIndex==1)
        var now = iso1(date)
    else if(selIndex==2)
        var now = iso2(date)
     else if(selIndex==3)
        var now = iso3(date)
     else if(selIndex==4)
        var now = mdy(date)
    else if(selIndex==5)
        var now = mdyhm(date)
    else if(selIndex==6)
        var now = mdyhms(date)
    else if(selIndex==7)
        var now = hms(date)
    else if(selIndex==8)
        var now = ms(date)

    cw.drawGraphDateFormatDiv.innerHTML = now



}




///---X button and iframe close all---
function closeDrawGraph()
{
    if(addElemGraphViz==true)
    {
        closeIframe("addElemGraph");
        coverOff()

        var cw = addElemGraphCw

        if(EditGraph==true && GraphDeleted==false) //---closes when editing not finished
        {
            var elemObjEdit = document.getElementById(DrawGraphEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editGraphDraw("+DrawGraphEditId+",evt)")
            if(ActiveElem)
            {
               domActiveElemG.removeChild(document.getElementById("activeElem"))
               domActiveElemG.removeAttribute("transform")


            }
        }
        if(DrawGraph==true && ActiveElem)
        {

           domActiveElemG.removeChild(document.getElementById("graphG"))
           domActiveElemG.removeAttribute("transform")



        }

        DraggingObj = false
        DrawGraph = false
        EditGraph = false
        GraphDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        DrawX.style("display", "none")
        mySVG.removeAttribute('onclick')

        if(document.getElementById("graphG"))
        {
          cancelDrawGraph


        }
        activeElem = null
        ActiveElem = null
           //---clear previous---
         var rows=cw.drawGraphDataTable.rows
         for(var k=rows.length-1;k>0;k--)
          cw.drawGraphDataTable.deleteRow(k)
          cw.drawGraphDataPointsValue.value=""
          cw.drawGraphDataValue.value=""
            cw.drawGraphDataTable.style.display="block"
            cw.drawGraphDataValue.style.display="none"
        DataType=null
        cw.drawGraphFinishButton.disabled = true
        cw.drawGraphCancelButton.disabled = true

        cw.drawGraphCancelButton.style.borderColor = ""
        cw.drawGraphDeleteButton.style.visibility = "hidden"

        cw.drawGraphEditSpan.innerText = "Draw Graphs"
         cw.drawGraphTopTable.style.backgroundColor = "#0000cd"

        cw.drawGraphCurveRadio.checked=true
        cw.drawGraphScatterPlotRadio.checked=false

                   cw.drawGraphCurveRadio.disabled=false
           cw.drawGraphScatterPlotRadio.disabled=false
              cw.drawGraphTitleValue.disabled=false
              cw.drawGraphXaxisValue.disabled=false
              cw.drawGraphYaxisValue.disabled=false
             cw.drawGraphTimeFormatCheck.disabled=false
              // .drawGraphDateFormatSelect.disabled=false
              cw.drawGraphCSVButton.disabled=false
              cw.drawGraphJSONButton.disabled=false
              cw.drawGraphDataPointsValue.disabled=false
              cw.drawGraphDataPointsButton.disabled=false
                cw.drawGraphTimeFormatCheck.checked=false
              cw.drawGraphDateFormatSelect.selectedIndex=0
              cw.drawGraphDateFormatSelect.disabled=true
    }
}

//---on add icon DrawX follows cursor
function trackDrawGraph()
{
    var cw = addElemGraphCw

    if(ZoomDrawing==false&&ActiveElem==null&&EditGraph==false && GraphDeleted==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}

var EditGraph = false
var DrawGraph = false
var GraphDeleted = false

function startGraphDraw()
{
    var cw = addElemGraphCw
    if(EditGraph==false)
    {
        ActiveElem = null
        activeElem = null
        DrawGraph = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawGraph()") //---click to add more icons for this session---

    }

}

//--click on svg---

var ParseTime=false
var DateFormat=false
var GraphData=[]
var FinishedData=[]
function placeDrawGraph()
{
    var cw = addElemGraphCw


    if(cw.drawGraphDataTable.rows.length>3||cw.drawGraphDataValue.value!="")
    {   coverOn()
       if(cw.drawGraphDateFormatSelect.selectedIndex!=0)
           {

                var iso1 = d3.timeParse("%Y-%m-%d");
                var iso2 = d3.timeParse("%Y/%m/%d %H:%M:%S");
                var iso3 = d3.timeParse("%Y-%m-%dT%H:%M");

                //---typical U.S. times---
                var mdy=d3.timeParse("%m/%d/%Y")
                var mdyhm=d3.timeParse("%m/%d/%Y %H:%M")
                var mdyhms=d3.timeParse("%m/%d/%Y %H:%M:%S")
                        var hms=d3.timeFormat("%H:%M:%S")
                        var ms= d3.timeFormat("%M:%S")

                var selIndex = cw.drawGraphDateFormatSelect.selectedIndex

                if(selIndex==1)
                {   ParseTime = iso1
                   DateFormat=d3.timeFormat("%Y-%m-%d");
                }

                else if(selIndex==2)
             {   ParseTime = iso2
                  DateFormat= d3.timeFormat("%Y/%m/%d %H:%M:%S");
                }

                else if(selIndex==3)
             {
                    ParseTime = iso3
                    DateFormat=d3.timeFormat("%Y-%m-%dT%H:%M");

                }

                else if(selIndex==4)
             {     ParseTime = mdy
                   DateFormat=d3.timeFormat("%m/%d/%Y")
                }

                else if(selIndex==5)
             {    ParseTime = mdyhm
                    DateFormat=d3.timeFormat("%m/%d/%Y %H:%M")
                }


                else if(selIndex==6)
                {     ParseTime = mdyhms
                    DateFormat=d3.timeFormat("%m/%d/%Y %H:%M:%S")
                }
               else if(selIndex==7)
                {     ParseTime = hms
                    DateFormat=d3.timeFormat("%H:%M:%S")
                }
               else if(selIndex==8)
                {     ParseTime = ms
                    DateFormat=d3.timeFormat("%M:%S")
                }

           }
           else
                DateFormat=false

        var title=cw.drawGraphTitleValue.value
        var  xAxisName=cw.drawGraphXaxisValue.value
        var  yAxisName=cw.drawGraphYaxisValue.value
        if(title!=""&&xAxisName!=""&&yAxisName!="")
        {
            var scale=cw.scaleRangeValue.value

            var stroke=cw.drawGraphStrokeSelect.options[cw.drawGraphStrokeSelect.selectedIndex].value
            var strokeWidth=cw.drawGraphStrokeWidthSelect.options[cw.drawGraphStrokeWidthSelect.selectedIndex].text
            var fill=cw.drawGraphFillSelect.options[cw.drawGraphFillSelect.selectedIndex].value
            var fillOpacity=cw.drawGraphOpacitySelect.options[cw.drawGraphOpacitySelect.selectedIndex].text
          GraphData =[]
          FinishedData =[]
           cw.drawGraphCurveRadio.disabled=true
           cw.drawGraphScatterPlotRadio.disabled=true
              cw.drawGraphTitleValue.disabled=true
              cw.drawGraphXaxisValue.disabled=true
              cw.drawGraphYaxisValue.disabled=true
              cw.drawGraphTimeFormatCheck.disabled=true
              cw.drawGraphDateFormatSelect.disabled=true
              cw.drawGraphCSVButton.disabled=true
              cw.drawGraphJSONButton.disabled=true
              cw.drawGraphDataPointsValue.disabled=true
              cw.drawGraphDataPointsButton.disabled=true

           if(DataType=="POINT")
           {
               var points=+cw.drawGraphDataPointsValue.value
                for(var k=0;k<points;k++)
                {
                    if(DateFormat)
                    var xData=cw.document.getElementById("xValue"+k).value
                    else
                    var xData=+cw.document.getElementById("xValue"+k).value


                    var yData=+cw.document.getElementById("yValue"+k).value
                    
                    if(xData!="" && yData!="")
                    {
                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }


            }
            if(DataType=="JSON")
            {
                var jsonObj=eval(cw.drawGraphDataValue.value)

               if(jsonObj[0].xData&&jsonObj[0].yData)
               {
                     for(var k=0;k<jsonObj.length;k++)
                    {
                        var xData=jsonObj[k].xData
                        var yData=jsonObj[k].yData

                        if(!DateFormat)
                            xData=+xData

                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }
                else
                {
                   cw.validDataSpan.innerHTML="***JSON format error***"
                   cw.validDataSpan.style.color="red"

                }


            }
            if(DataType=="CSV")
            {
                var csv=cw.drawGraphDataValue.value
                var jsonObj=csvJSON(csv)
               if(jsonObj[0].xData&&jsonObj[0].yData)
               {
                   for(var k=0;k<jsonObj.length;k++)
                    {
                        var xData=jsonObj[k].xData
                        var yData=jsonObj[k].yData

                        if(!DateFormat)
                            xData=+xData

                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }
                else
                {
                   cw.validDataSpan.innerHTML="***CSV format error***"
                   cw.validDataSpan.style.color="red"

                }


            }


           buildDrawGraph(title,xAxisName,yAxisName,scale,stroke,strokeWidth,fill,fillOpacity,GraphData,DateFormat)



        }



        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        //DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        GraphCenter =[SVGx, SVGy]





        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragGraph(evt)")
        mySVG.setAttribute("onmousemove", "dragGraph(evt)")
        mySVG.setAttribute("onmouseup", "endDragGraph(evt)")

        cw.drawGraphCancelButton.disabled = false
        cw.drawGraphFinishButton.disabled = false
    }
}

function finishDrawGraph()
{

    if(EditGraph==true)
        finishEditGraph()
        else if(document.getElementById("graphG"))
        {
            var cw = addElemGraphCw
            //activeElem.removeAttribute("class")
            //activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("graphG").cloneNode(true)
            for(k=0;k<finishedElem.childNodes.length;k++)
            {
                finishedElem.childNodes.item(k).removeAttribute("id")
            }

            finishedElem.setAttribute("transform",domActiveElemG.getAttribute("transform"))


            finishedElem.lastChild.setAttribute("cursor","default")
            domActiveElemG.removeChild(document.getElementById("graphG"))
            domActiveElemG.removeAttribute("transform")
            var id = "graph"+new Date().getTime()

            finishedElem.setAttribute("id", id)


            finishedElem.setAttribute("dataType", DataType)
            finishedElem.setAttribute("myScale", cw.scaleValue.value)
            finishedElem.setAttribute("title", cw.drawGraphTitleValue.value)
            finishedElem.setAttribute("xaxis", cw.drawGraphXaxisValue.value)
            finishedElem.setAttribute("yaxis", cw.drawGraphYaxisValue.value)
            if(cw.drawGraphCurveRadio.checked)
                var type="curve"
            else
                var type='scatterplot'
            finishedElem.setAttribute("type", type)
            finishedElem.setAttribute("data", JSON.stringify(FinishedData))
            finishedElem.setAttribute("dateFormat", cw.drawGraphDateFormatSelect.selectedIndex)

           // finishedElem.setAttribute("fill-opacity", cw.drawGraphOpacitySelect.options[cw.drawGraphOpacitySelect.selectedIndex].text)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editGraphDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)

            finishedElem.setAttribute("class", "graphElem")

            ActiveElem = null
            activeElem = null


            mySVG.setAttribute('onclick', "placeDrawGraph()") //---click to add more icons for this session---
            DrawX.style("display", "none")

            // topG.appendChild(dragDot)
            cw.drawGraphFinishButton.disabled = true
            cw.drawGraphCancelButton.disabled = true
            //---clear previous---
         var rows=cw.drawGraphDataTable.rows
         for(var k=rows.length-1;k>0;k--)
          cw.drawGraphDataTable.deleteRow(k)
          cw.drawGraphDataPointsValue.value=""
                    cw.drawGraphCurveRadio.disabled=false
           cw.drawGraphScatterPlotRadio.disabled=false
              cw.drawGraphTitleValue.disabled=false
              cw.drawGraphXaxisValue.disabled=false
              cw.drawGraphYaxisValue.disabled=false
              cw.drawGraphTimeFormatCheck.disabled=false
              cw.drawGraphDateFormatSelect.disabled=true
              cw.drawGraphCSVButton.disabled=false
              cw.drawGraphJSONButton.disabled=false
              cw.drawGraphDataPointsValue.disabled=false
              cw.drawGraphDataPointsButton.disabled=false
               cw.drawGraphDateFormatSelect.selectedIndex=0
          console.log(finishedElem)
        }
}

function cancelDrawGraph()
{
    var cw = addElemGraphCw
    if(EditGraph==true)
        cancelEditGraph()
        else if(document.getElementById("graphG"))
        {
            domActiveElemG.removeChild(document.getElementById("graphG"))
           domActiveElemG.removeAttribute("transform")
            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawGraph()") //---click to add more icons for this session---

            GraphData=[]
            cw.drawGraphFinishButton.disabled = true
            cw.drawGraphCancelButton.disabled = true
                     cw.drawGraphCurveRadio.disabled=false
           cw.drawGraphScatterPlotRadio.disabled=false
              cw.drawGraphTitleValue.disabled=false
              cw.drawGraphXaxisValue.disabled=false
              cw.drawGraphYaxisValue.disabled=false
              cw.drawGraphTimeFormatCheck.disabled=false
              cw.drawGraphDateFormatSelect.disabled=false
              cw.drawGraphCSVButton.disabled=false
              cw.drawGraphJSONButton.disabled=false
              cw.drawGraphDataPointsValue.disabled=false
              cw.drawGraphDataPointsButton.disabled=false

            coverOff()

        }

        cw.drawGraphCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditGraph = false
var DrawGraphEditId
var EditThisGraph
//--mousedown/right button on circle---
function editGraphDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawGraph==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "r = <input id=drawGraphRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisGraph = elemObjEdit

        DrawGraphEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditGraph = true
        if(addElemGraphLoad==false)
        {
            openIframe("AddElem", "addElemGraph", 10)

        }
        else if(addElemGraphViz==false)
        {
            openIframe("AddElem", "addElemGraph", 10)
            setEditGraph()
        }
        else
            setEditGraph()

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
        ZoomDraggedElems.push([dragTarget,"editGraphDraw("+dragTarget.id+",evt)",classed])
    }



}
//---after iframe loaded see sendSize() at addElemGraph.htm---
var EditGraphObj
function setEditGraph()
{
    coverOn()

    var cw = addElemGraphCw

    var elemObjEdit = document.getElementById(DrawGraphEditId)

    EditGraphObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditGraphObj.setAttribute("id", "activeElem")

    EditGraphObj.removeAttribute("onmousedown")
    EditGraphObj.lastChild.setAttribute("cursor","move")
   ActiveElem=d3.select("#domActiveElemG")
   ActiveElem.attr("class", "dragTargetObj")

 EditGraphObj.removeAttribute("transform")



        domActiveElemG.appendChild(EditGraphObj)
        domActiveElemG.setAttribute('transform',elemObjEdit.getAttribute("transform"))


        var dataType=EditGraphObj.getAttribute("dataType")
        var pointData=eval(EditGraphObj.getAttribute("data"))
        var timeFormatSelect=+EditGraphObj.getAttribute("dateFormat")
        var myScale=EditGraphObj.getAttribute("myScale")
        var title=EditGraphObj.getAttribute("title")
        var xaxis=EditGraphObj.getAttribute("xaxis")
         var yaxis=EditGraphObj.getAttribute("yaxis")
         var type=EditGraphObj.getAttribute("type")
         cw.scaleValue.value=myScale
         cw.scaleRangeValue.value=myScale
         var dateFormatSelect=+EditGraphObj.getAttribute("dateFormat")

      cw.drawGraphTitleValue.value=title
      cw.drawGraphXaxisValue.value=xaxis
     cw.drawGraphYaxisValue.value=yaxis
     cw.drawGraphCurveRadio.disabled=true
           cw.drawGraphScatterPlotRadio.disabled=true
              cw.drawGraphTitleValue.disabled=true
              cw.drawGraphXaxisValue.disabled=true
              cw.drawGraphYaxisValue.disabled=true
              cw.drawGraphTimeFormatCheck.disabled=true

              cw.drawGraphCSVButton.disabled=true
              cw.drawGraphJSONButton.disabled=true
              cw.drawGraphDataPointsValue.disabled=true
              cw.drawGraphDataPointsButton.disabled=true
             cw.drawGraphDateFormatSelect.disabled=true









            if(type=='curve')
            {
                cw.drawGraphCurveRadio.checked=true
                cw.drawGraphOpacitySelect.disabled=false
                cw.drawGraphOpacitySelect.selectedIndex=9

            }

            if(type=='scatterplot')
            {
                cw.drawGraphScatterPlotRadio.checked=true
                cw.drawGraphOpacitySelect.disabled=true
                cw.drawGraphOpacitySelect.selectedIndex=9

            }
             cw.drawGraphDateFormatSelect.selectedIndex=dateFormatSelect
            if(dateFormatSelect!=0)
            {
               cw.drawGraphTimeFormatCheck.checked=true
               //cw.drawGraphDateFormatSelect.disabled=false
            }
            var data=eval(EditGraphObj.getAttribute("data"))
            if(dataType=="POINT")
            {
                  DataType="POINT"
                cw.drawGraphDataPointsValue.value=data.length
                for(var k=0;k<data.length;k++)
                {
                   var dataXY=data[k]
                   var xData=dataXY.xData
                   var yData=dataXY.yData

                  var rowCnt=k+1
                var row=cw.drawGraphDataTable.insertRow(rowCnt)
                var cntCell=row.insertCell(0).innerHTML=rowCnt
                var xCell=row.insertCell(1).innerHTML="<input type=text style=width:120px id=xValue"+k+" value='"+xData+"' >"
                var yCell=row.insertCell(2).innerHTML="<input type=text style=width:120px id=yValue"+k+" value="+yData+"  >"

                }

                cw.validDataSpan.innerHTML="<button id=drawGraphEditDataButton  onClick=parent.drawGraphEditData()>change data</button>"
            }
            if(dataType=="JSON")
            {
                 DataType="JSON"
                 cw.drawGraphDataTable.style.display="none"
                 cw.drawGraphDataValue.style.display="block"

                 cw.drawGraphDataValue.value=JSON.stringify(data)
                               cw.validDataSpan.innerHTML="<button id=drawGraphEditDataButton onClick=parent.drawGraphEditData()>change data</button>"

            }
            if(dataType=="CSV")
            {
                  DataType="CSV"
                 cw.drawGraphDataTable.style.display="none"
                 cw.drawGraphDataValue.style.display="block"
                   cw.drawGraphDataValue.value=jsonCSV(data)
                 cw.validDataSpan.innerHTML="<button id=drawGraphEditDataButton  onClick=parent.drawGraphEditData()>change data</button>"


            }


        cw.drawGraphDeleteButton.style.visibility = "visible"


        cw.drawGraphEditSpan.innerHTML = "Edit Graph"

        cw.drawGraphTopTable.style.backgroundColor = "orange"
        cw.drawGraphCancelButton.disabled = false
        cw.drawGraphFinishButton.disabled = false
        if(type=="curve")
        {

             var paths=EditGraphObj.getElementsByTagName("path")


             var areaCurve
             var curvePath

             for(var k=0;k<paths.length;k++)
             {
                if(paths[k].getAttribute("class")!="domain")
                  if(!areaCurve)
                  {
                     areaCurve=paths[k]
                     areaCurve.id="areaCurve"
                  }

                  else
                  {
                     curvePath=paths[k]
                     curvePath.id="curvePath"
                  }

             }




              var fill = areaCurve.getAttribute("fill")
            var opacity =  +areaCurve.getAttribute("fill-opacity")

            var stroke = curvePath.getAttribute("stroke")
            var strokeWidth = curvePath.getAttribute("stroke-width")

            cw.drawGraphOpacitySelect.selectedIndex=opacity*9

        }
        if(type=="scatterplot")
        {
            var circles=EditGraphObj.getElementsByTagName("circle")
             var stroke = circles[0].getAttribute("stroke")
            var strokeWidth = circles[0].getAttribute("stroke-width")
            var fill = circles[0].getAttribute("fill")

        }




     if(opacity!="0")
    {
        setSelect("Graph", "Opacity", opacity)
        setSelect("Graph", "Fill", fill)
        cw.drawGraphFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawGraphFillBg.style.backgroundColor = ""
        cw.drawGraphFillSelect.selectedIndex = 0

    }





    setSelect("Graph", "Stroke", stroke)
    setSelect("Graph", "StrokeWidth", strokeWidth)
    setSelect("Graph", "Fill", fill)
    //---update bg colors---

    if(stroke=="none")
    stroke=""
    cw.drawGraphStrokeBg.style.backgroundColor = stroke
    if(fill=="none")
    fill=""
    cw.drawGraphFillBg.style.backgroundColor = fill




            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))



            setGraphEditDrag()

            mySVG.style.cursor = ""

}

function drawGraphEditData()
{
           var cw = addElemGraphCw
          GraphData =[]
          FinishedData =[]
          DateFormat=false
          cw.drawGraphEditDataButton.disabled=true
                          var iso1 = d3.timeParse("%Y-%m-%d");
                var iso2 = d3.timeParse("%Y/%m/%d %H:%M:%S");
                var iso3 = d3.timeParse("%Y-%m-%dT%H:%M");

                //---typical U.S. times---
                var mdy=d3.timeParse("%m/%d/%Y")
                var mdyhm=d3.timeParse("%m/%d/%Y %H:%M")
                var mdyhms=d3.timeParse("%m/%d/%Y %H:%M:%S")
                        var hms=d3.timeFormat("%H:%M:%S")
                        var ms= d3.timeFormat("%M:%S")

                var selIndex = cw.drawGraphDateFormatSelect.selectedIndex

                if(selIndex==1)
                {   ParseTime = iso1
                   DateFormat=d3.timeFormat("%Y-%m-%d");
                }

                else if(selIndex==2)
             {   ParseTime = iso2
                  DateFormat= d3.timeFormat("%Y/%m/%d %H:%M:%S");
                }

                else if(selIndex==3)
             {
                    ParseTime = iso3
                    DateFormat=d3.timeFormat("%Y-%m-%dT%H:%M");

                }

                else if(selIndex==4)
             {     ParseTime = mdy
                   DateFormat=d3.timeFormat("%m/%d/%Y")
                }

                else if(selIndex==5)
             {    ParseTime = mdyhm
                    DateFormat=d3.timeFormat("%m/%d/%Y %H:%M")
                }


                else if(selIndex==6)
                {     ParseTime = mdyhms
                    DateFormat=d3.timeFormat("%m/%d/%Y %H:%M:%S")
                }
               else if(selIndex==7)
                {     ParseTime = hms
                    DateFormat=d3.timeFormat("%H:%M:%S")
                }
               else if(selIndex==8)
                {     ParseTime = ms
                    DateFormat=d3.timeFormat("%M:%S")
                }

           if(DataType=="POINT")
           {     var csvString="xData,yData\n"
               var points=+cw.drawGraphDataPointsValue.value
                for(var k=0;k<points;k++)
                {
                    if(DateFormat)
                    var xData=cw.document.getElementById("xValue"+k).value
                    else
                    var xData=+cw.document.getElementById("xValue"+k).value


                    var yData=+cw.document.getElementById("yValue"+k).value
                     csvString+=xData+","+yData+"\n"
                    if(xData!="" && yData!="")
                    {
                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }
                 //.value=JSON.stringify(GraphData)
                dataValue.value=csvString

            }
            if(DataType=="JSON")
            {
                var jsonObj=eval(cw.drawGraphDataValue.value)

               if(jsonObj[0].xData&&jsonObj[0].yData)
               {
                     for(var k=0;k<jsonObj.length;k++)
                    {
                        var xData=jsonObj[k].xData
                        var yData=jsonObj[k].yData

                        if(!DateFormat)
                            xData=+xData

                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }
                else
                {
                   cw.validDataSpan.innerHTML="***JSON format error***"
                   cw.validDataSpan.style.color="red"

                }


            }
            if(DataType=="CSV")
            {
                var csv=cw.drawGraphDataValue.value
                var jsonObj=csvJSON(csv)
               if(jsonObj[0].xData&&jsonObj[0].yData)
               {
                   for(var k=0;k<jsonObj.length;k++)
                    {
                        var xData=jsonObj[k].xData
                        var yData=jsonObj[k].yData

                        if(!DateFormat)
                            xData=+xData

                        GraphData.push({xData:xData,yData:yData})
                        FinishedData.push({xData:xData,yData:yData})  //---attach to finishedElem----
                    }
                }
                else
                {
                   cw.validDataSpan.innerHTML="***CSV format error***"
                   cw.validDataSpan.style.color="red"

                }


            }
          if(GraphData.length>0)
          {


                var title=cw.drawGraphTitleValue.value
                var  xAxisName=cw.drawGraphXaxisValue.value
                var  yAxisName=cw.drawGraphYaxisValue.value

                    var scale=cw.scaleRangeValue.value

            var stroke=cw.drawGraphStrokeSelect.options[cw.drawGraphStrokeSelect.selectedIndex].value
            var strokeWidth=cw.drawGraphStrokeWidthSelect.options[cw.drawGraphStrokeWidthSelect.selectedIndex].text
            var fill=cw.drawGraphFillSelect.options[cw.drawGraphFillSelect.selectedIndex].value
            var fillOpacity=cw.drawGraphOpacitySelect.options[cw.drawGraphOpacitySelect.selectedIndex].text

            var transform=domActiveElemG.getAttribute("transform")
            domActiveElemG.removeChild(EditGraphObj)
            editDrawGraph(title,xAxisName,yAxisName,scale,stroke,strokeWidth,fill,fillOpacity,GraphData,DateFormat,transform) //---drawGraphObject.js---





          }



}

function setGraphEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragGraph(evt)")
    mySVG.setAttribute("onmousemove", "dragGraph(evt)")
    mySVG.setAttribute("onmouseup", "endDragGraph(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditGraph()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemGraphCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)


         var paths=finishedElem.getElementsByTagName("path")
         for(var k=0;k<paths.length;k++)
         {

             paths[k].removeAttribute("id")


         }



        finishedElem.setAttribute("class", "graphElem")

        finishedElem.setAttribute("id", DrawGraphEditId)
        finishedElem.setAttribute("transform", domActiveElemG.getAttribute("transform"))

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        domActiveElemG.removeAttribute("transform")
        finishedElem.lastChild.setAttribute("cursor","default")

        finishedElem.setAttribute("onmousedown", "editGraphDraw("+DrawGraphEditId+",evt)")
        finishedElem.setAttribute("id", DrawGraphEditId)
        domElemG.insertBefore(finishedElem, EditThisGraph)
        domElemG.removeChild(EditThisGraph)
       EditGraph=false //---let close be aware===
    }

    closeDrawGraph()
}

function resetEditGraph()
{

    var cw = addElemGraphCw

    document.getElementById(DrawGraphEditId).setAttribute("opacity", 1)

    EditGraph = false
    cw.drawGraphEditSpan.innerText = "Draw Graphs"
    cw.drawGraphTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    mySVG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawGraphCopyButton.style.visibility = "hidden"
    cw.drawGraphDeleteButton.style.visibility = "hidden"
    cw.drawGraphCancelButton.disabled = false
    cw.drawGraphFinishButton.disabled = false
    DrawGraph = true
    mySVG.setAttribute('onclick', "placeDrawGraph()")

}

function cancelEditGraph()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawGraphEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawGraph()

}


//=======================delete circle==================
var GraphDeleted = false
//---button---
function removeCurrentDrawGraph()
{

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    domActiveElemG.removeAttribute("transform")
    var elemObjEdit = document.getElementById(DrawGraphEditId)
    domElemG.removeChild(elemObjEdit)
    GraphDeleted = true



    closeDrawGraph()

}




function showDrawGraphStrokeBg()
{
    var cw = addElemGraphCw
    var stroke = cw.drawGraphStrokeSelect.options[cw.drawGraphStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawGraphStrokeBg.style.backgroundColor = stroke
        if(ActiveElem)
        {    if(cw.drawGraphCurveRadio.checked)
             document.getElementById('curvePath').setAttribute("stroke", stroke)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("stroke",stroke)




             }
        }
}


function showDrawGraphFillBg()
{
    var cw = addElemGraphCw
    var fill = cw.drawGraphFillSelect.options[cw.drawGraphFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawGraphFillBg.style.backgroundColor = fill
        else
            cw.drawGraphFillBg.style.backgroundColor = ""
        if(ActiveElem)
        {    if(cw.drawGraphCurveRadio.checked)
             document.getElementById('areaCurve').setAttribute("fill", fill)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("fill",fill)




             }
        }

}

function drawGraphFillSelected()
{
    var cw = addElemGraphCw
    var fill = cw.drawGraphFillSelect.options[cw.drawGraphFillSelect.selectedIndex].value
    if(ActiveElem)
    {
        if(cw.drawGraphCurveRadio.checked)
        document.getElementById('areaCurve').setAttribute("fill", fill)
        else
        {



        }


    }

}

function drawGraphOpacitySelected()
{
    var cw = addElemGraphCw
    var opacity = cw.drawGraphOpacitySelect.options[cw.drawGraphOpacitySelect.selectedIndex].text
    if(ActiveElem)
        areaCurve.setAttribute("fill-opacity", opacity)

}

function drawGraphStrokeWidthSelected()
{
    var cw = addElemGraphCw
    var strokeWidth = cw.drawGraphStrokeWidthSelect.options[cw.drawGraphStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
    {
            if(cw.drawGraphCurveRadio.checked)
             document.getElementById('curvePath').setAttribute("stroke-width", strokeWidth)
             else
             {
                var circles=domActiveElemG.getElementsByTagName("circle")
                for(var k=0;k<circles.length;k++)
                   circles[k].setAttribute("stroke-width",strokeWidth)
             }
    }


}


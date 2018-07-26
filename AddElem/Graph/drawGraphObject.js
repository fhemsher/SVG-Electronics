function  buildDrawGraph(title,xAxisName,yAxisName,scale,stroke,strokeWidth,fill,fillOpacity,data,dateFormat)
{
    var nativeWidth=560
    var nativeHeight=300


    ActiveElem=d3.select("#domActiveElemG")
    ActiveElem.attr("transform","translate("+SVGx+" "+SVGy+")scale("+scale+")")
    ActiveElem.attr("class", "dragTargetObj")
    ActiveElem.attr("pointer-events", null)


     //---container for all axis---
    var graphG = ActiveElem.append("g")
    .attr("id", "graphG")
    .attr("shape-rendering" ,"geometricPrecision")
    //.attr("transform","translate(100,40)")


       // set the ranges

var yScale = d3.scaleLinear().range([nativeHeight, 0]);


     if(DateFormat)
     {   //var parseTime = d3.timeParse("%m/%d/%Y %H:%M")


        var xScale = d3.scaleTime().range([0, nativeWidth]);
         data.forEach(function(d, i){d.xData = ParseTime(d.xData);});
           xScale.domain(d3.extent(data, function(d) { return d.xData; }));
     }
     else
     {
    var xScale = d3.scaleLinear()
    .range([0, nativeWidth]) //---added .5 to assure tick visibility--
     .domain(d3.extent(data, function(d){return d.xData;}))

    }

     // Scale the range of the data

  yScale.domain([0, d3.max(data, function(d) { return d.yData; })]);

     // Add the X Axis
   if(DateFormat)
   {
     var xTickFormat=DateFormat
     var textAnchor="end"
     var rotate=-30
     var dx="-.8em"
   }
   else
   {
     var xTickFormat=null

   }

  var xAxisText= graphG.append("g")
      .attr("transform", "translate(0," + nativeHeight + ")")
      .call(d3.axisBottom(xScale)
   .tickFormat(xTickFormat)
      )
  if(DateFormat)
    xAxisText.selectAll("text")
    .attr("stroke-width", ".1")
    .attr("stroke", "black")
    .attr("font-size", "13")
    .attr("text-anchor", textAnchor)
    .attr("dx", dx)
    .attr("dy", ".15em")
    .attr("transform", "rotate("+rotate+")");



  // Add the Y Axis
  graphG.append("g")
      .attr("font-size", "14")
      .call(d3.axisLeft(yScale));
    var cw = addElemGraphCw

  if(cw.drawGraphCurveRadio.checked)
  {
  //======================fill under curve===============
    var curveArea = d3.area()  //---used to provide a fill color for the path---
    .x(function(d) {return xScale(d.xData);})
    .y0(nativeHeight)
    .y1(function(d) {return yScale(d.yData);})
    .curve(d3.curveMonotoneX) // apply smoothing to the line

    var curveLine = d3.line()
    .x(function(d) {return xScale(d.xData);})
    .y(function(d) {return yScale(d.yData);})
    .curve(d3.curveMonotoneX) // apply smoothing to the line

  //---draw paths---
    var areaCurve = graphG.append("path")
    .datum(data)
    .attr("id", "areaCurve")
    .attr("stroke", "none")
    .attr("fill", fill)
    .attr("fill-opacity", fillOpacity)
    .attr("d", curveArea)

    var curvePath = graphG.append("path")
    .datum(data)
    .attr("id", "curvePath")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", "none")
    .attr("d", curveLine)
   }
   else
   {
       for(var k=0;k<data.length;k++)
       {
          var cx=xScale(data[k].xData)
          var cy=yScale(data[k].yData)

          var circle=graphG.append("circle")
          .attr("cx",cx)
          .attr("cy",cy)
          .attr("r",3)
          .attr("fill",fill)
          .attr("stroke-width",strokeWidth)
          .attr("stroke",stroke)


       }






   }
       graphG.append("text")
    .attr("id", "yAxisText")
    .attr("transform", "translate(-60 150)rotate(-90)")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .attr("font-weight", "bold")
    .text(yAxisName);
    if(DateFormat)
     var xNameOffsetY=380
     else
      var xNameOffsetY=340

    graphG.append("text")
    .attr("id", "xAxisName")
    .attr("pointer-events", "none")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("x", nativeWidth/2)
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .text(xAxisName)
    .attr("y", xNameOffsetY)

       graphG.append("text")
    .attr("id", "graphTitle")
    .attr("pointer-events", "none")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("x", nativeWidth/2)
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .text(title)
    .attr("y", -10)




    // gridlines in x axis function
        function make_x_gridlines() {
                return d3.axisBottom(xScale)

        }

        // gridlines in y axis function
        function make_y_gridlines() {
                return d3.axisLeft(yScale)
        }

   // add the X gridlines
    graphG.append("g")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", "1")
            .attr("stroke-opacity", ".4")
            .attr("shape-rendering", "crispEdges")

            .attr("transform", "translate(0," + nativeHeight + ")")
            .call(make_x_gridlines()
                    .tickSize(-nativeHeight)
                    .tickFormat("")
            )

    // add the Y gridlines
    graphG.append("g")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", "1")
            .attr("shape-rendering", "crispEdges")
            .attr("stroke-opacity", ".4")

                .call(make_y_gridlines()
                    .tickSize(-nativeWidth)
                    .tickFormat("")
            )

       //----add covering rect--------
       graphG.append("rect")
       .attr("width",nativeWidth)
       .attr("height",nativeHeight)
       .attr("fill","white")
       .attr("fill-opacity","0")
       .attr("cursor","move")



}

function  editDrawGraph(title,xAxisName,yAxisName,scale,stroke,strokeWidth,fill,fillOpacity,data,dateFormat,transform)
{
    var nativeWidth=560
    var nativeHeight=300


    ActiveElem=d3.select("#domActiveElemG")
    ActiveElem.attr("transform",transform)
     ActiveElem.attr("class", "dragTargetObj")
    ActiveElem.attr("pointer-events", null)


     //---container for all axis---



    var graphG = ActiveElem.append("g")
    .attr("id", "graphG")
    .attr("shape-rendering" ,"geometricPrecision")
    //.attr("transform","translate(100,40)")


       // set the ranges

var yScale = d3.scaleLinear().range([nativeHeight, 0]);


     if(DateFormat)
     {   //var parseTime = d3.timeParse("%m/%d/%Y %H:%M")


        var xScale = d3.scaleTime().range([0, nativeWidth]);
         data.forEach(function(d, i){d.xData = ParseTime(d.xData);});
           xScale.domain(d3.extent(data, function(d) { return d.xData; }));
     }
     else
     {
    var xScale = d3.scaleLinear()
    .range([0, nativeWidth]) //---added .5 to assure tick visibility--
     .domain(d3.extent(data, function(d){return d.xData;}))

    }

     // Scale the range of the data

  yScale.domain([0, d3.max(data, function(d) { return d.yData; })]);

     // Add the X Axis
   if(DateFormat)
   {
     var xTickFormat=DateFormat
     var textAnchor="end"
     var rotate=-30
     var dx="-.8em"
   }
   else
   {
     var xTickFormat=null

   }

  var xAxisText= graphG.append("g")
      .attr("transform", "translate(0," + nativeHeight + ")")
      .call(d3.axisBottom(xScale)
   .tickFormat(xTickFormat)
      )
  if(DateFormat)
    xAxisText.selectAll("text")
    .attr("stroke-width", ".1")
    .attr("stroke", "black")
    .attr("font-size", "13")
    .attr("text-anchor", textAnchor)
    .attr("dx", dx)
    .attr("dy", ".15em")
    .attr("transform", "rotate("+rotate+")");



  // Add the Y Axis
  graphG.append("g")
      .attr("font-size", "14")
      .call(d3.axisLeft(yScale));
    var cw = addElemGraphCw

  if(cw.drawGraphCurveRadio.checked)
  {
  //======================fill under curve===============
    var curveArea = d3.area()  //---used to provide a fill color for the path---
    .x(function(d) {return xScale(d.xData);})
    .y0(nativeHeight)
    .y1(function(d) {return yScale(d.yData);})
    .curve(d3.curveMonotoneX) // apply smoothing to the line

    var curveLine = d3.line()
    .x(function(d) {return xScale(d.xData);})
    .y(function(d) {return yScale(d.yData);})
    .curve(d3.curveMonotoneX) // apply smoothing to the line

  //---draw paths---
    var areaCurve = graphG.append("path")
    .datum(data)
    .attr("id", "areaCurve")
    .attr("stroke", "none")
    .attr("fill", fill)
    .attr("fill-opacity", fillOpacity)
    .attr("d", curveArea)

    var curvePath = graphG.append("path")
    .datum(data)
    .attr("id", "curvePath")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", "none")
    .attr("d", curveLine)
   }
   else
   {
       for(var k=0;k<data.length;k++)
       {
          var cx=xScale(data[k].xData)
          var cy=yScale(data[k].yData)

          var circle=graphG.append("circle")
          .attr("cx",cx)
          .attr("cy",cy)
          .attr("r",3)
          .attr("fill",fill)
          .attr("stroke-width",strokeWidth)
          .attr("stroke",stroke)


       }






   }
       graphG.append("text")
    .attr("id", "yAxisText")
    .attr("transform", "translate(-60 150)rotate(-90)")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .attr("font-weight", "bold")
    .text(yAxisName);
    if(DateFormat)
     var xNameOffsetY=380
     else
      var xNameOffsetY=340

    graphG.append("text")
    .attr("id", "xAxisName")
    .attr("pointer-events", "none")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("x", nativeWidth/2)
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .text(xAxisName)
    .attr("y", xNameOffsetY)

       graphG.append("text")
    .attr("id", "graphTitle")
    .attr("pointer-events", "none")
    .attr("font-family", "arial")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .attr("font-family", "arial")
    .attr("x", nativeWidth/2)
    .style("text-anchor", "middle")
    .style("stroke", "none")
    .text(title)
    .attr("y", -10)




    // gridlines in x axis function
        function make_x_gridlines() {
                return d3.axisBottom(xScale)

        }

        // gridlines in y axis function
        function make_y_gridlines() {
                return d3.axisLeft(yScale)
        }

   // add the X gridlines
    graphG.append("g")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", "1")
            .attr("stroke-opacity", ".4")
            .attr("shape-rendering", "crispEdges")

            .attr("transform", "translate(0," + nativeHeight + ")")
            .call(make_x_gridlines()
                    .tickSize(-nativeHeight)
                    .tickFormat("")
            )

    // add the Y gridlines
    graphG.append("g")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", "1")
            .attr("shape-rendering", "crispEdges")
            .attr("stroke-opacity", ".4")

                .call(make_y_gridlines()
                    .tickSize(-nativeWidth)
                    .tickFormat("")
            )

       //----add covering rect--------
       graphG.append("rect")
       .attr("width",nativeWidth)
       .attr("height",nativeHeight)
       .attr("fill","white")
       .attr("fill-opacity","0")
       .attr("cursor","move")

        EditGraphObj=domActiveElemG.firstChild
       EditGraphObj.setAttribute("id", "activeElem")
        EditGraphObj.setAttribute("class", "dragTargetObj")
        EditGraphObj.removeAttribute("onmousedown")

}
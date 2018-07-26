var SchematicDoc
function getSchematicLibrary()
{

if(!SchematicDoc)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Schematic.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        SchematicDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        //---clear previous table----
        var rows = schematicTable.rows
        for(var k = rows.length-1; k>=0; k--)
            schematicTable.deleteRow(rows[k])

           var rowCnt=1

            var row = schematicTable.insertRow(0)
            row.align = "center"
           // var titleCell = row.insertCell(0).innerHTML = "Title"
            //var categoryCell = row.insertCell(1).innerHTML = "Category"
            var descriptionCell = row.insertCell(0).innerHTML = "Description"
           // var nameCell = row.insertCell(3).innerHTML = "Created By"
           // var dateCell = row.insertCell(4).innerHTML = "Date Created/Edited"

            var previewCell = row.insertCell(1)

            //----write table---
            var groups = SchematicDoc.childNodes

        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
           if(group.nodeName!="#text")
           {
            var id = group.getAttribute("id")
            var category = group.getAttribute("category")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var name = group.getAttribute("name")
            var utcMS = +group.getAttribute("utcMS")
            var date = new Date(utcMS).toLocaleString()

            var svgContainer=document.createElementNS(NS,"svg")
        svgContainer.setAttribute("width","100%")
        svgContainer.setAttribute("height","100%")
        svgContainer.setAttribute("overflow","visible")
              var clone=group.cloneNode(true)


              
              svgContainer.appendChild(clone)
              var idSVG="SVG_Schematic"+k
              svgContainer.setAttribute("id",idSVG)
           //var bb=clone.getBBox()
          // clone.setAttribute("viewBox","0 0 "+bb.width+" "+bb.height)
            // var svgString=new XMLSerializer().serializeToString(svg)
            var row = schematicTable.insertRow(rowCnt++)

            var cntr = (rowCnt)/2+""
            if(cntr.indexOf('.')!=-1)
                var bg = "#aadc82"
                else
                    var bg = "#f0e99c"
                    row.style.background = bg

                    var titleCell = row.insertCell(0).innerHTML = title
                   // var categoryCell = row.insertCell(1).innerHTML = category
                  //  var descriptionCell = row.insertCell(2).innerHTML = description
                    //var nameCell = row.insertCell(3).innerHTML = name
                    //var dateCell = row.insertCell(4).innerHTML = date
                    var previewCell = row.insertCell(1)
                     previewCell.style.padding="5px"

                     //previewCell.style.width=group.getAttribute("nativeWidth")+"px"
                     //previewCell.style.height=group.getAttribute("nativeHeight")+"px"
                     var svgString=new XMLSerializer().serializeToString(svgContainer)
                    previewCell.innerHTML ="<div style='width:80px;height:80px;'>"+svgString+"</div>"
                    previewCell.title="Click to place in drawing"
                    previewCell.setAttribute("onClick","this.style.border='4px inset violet';placeSchematicInDrawing("+id+")")
                        var svg=document.getElementById(idSVG)
                    	var bb=svg.getBBox()
                    	var bbw=bb.width
                    	var bbh=bb.height
                          var divWH=80


                        //--use greater of bbw vs bbh--
                    	if(bbw>=bbh)
                    		var factor=bbw/divWH
                    	else
                    		var factor=bbh/divWH

                    	var vbWH=divWH*factor

                    	var vbX=(bbw-vbWH)/2
                    	var vbY=(bbh-vbWH)/2
                        //---IE/CH---
                    	if(!mySVG.viewBox.baseVal )
                    	{
                       	 	var ViewBox=svg.viewBox.baseVal
                    		ViewBox.x=vbX
                    		ViewBox.y=vbY
                    		ViewBox.width=vbWH
                    		ViewBox.height=vbWH
                    	}
                    	else
                    		svg.setAttribute("viewBox",vbX+" "+vbY+" "+vbWH+" "+vbWH)


              }

          }
         schematicTableCloseButton.style.visibility = "visible"
        LoadedSchematicArray=[]
        schematicTableDiv.style.top = "60px"
        schematicTableDiv.style.visibility = "visible"
        setSchematicEditDrag()
         getSchematicLibraryButton.style.borderStyle = "inset"

       CookieEmail=getCookie("email")
       CookieName=getCookie("name")


      if(CookieEmail)
      {  listMySchematicIDs()

      }



          disableAllButtons()
    }
    xhr.send()
    }
    else
    {
         schematicTableCloseButton.style.visibility = "visible"
        LoadedSchematicArray=[]
        schematicTableDiv.style.top = "60px"
        schematicTableDiv.style.visibility = "visible"
        setSchematicEditDrag()
         disableAllButtons()
    }
}

function refreshSchematicLibrary()
{
   var cw=addElemSchematicCw
    SchematicDoc=null
    closeDrawSchematic()
    getSchematicLibrary()
   cw.refreshSchematicLibraryButton.disabled=true
}


function placeSchematicInDrawing(id)
{



   var schematic=id.cloneNode("true")





   schematic.setAttribute("parentid",schematic.id)

   schematic.removeAttribute("title")
   schematic.removeAttribute("description")

    var utcms=new Date().getTime()
    var id="schematic"+utcms
   schematic.setAttribute("id",id)

    schematic.setAttribute("class", "dragTargetObj")
    var rects=schematic.getElementsByTagName("rect")
    var coverRect=rects[rects.length-1]
    coverRect.style.cursor = "move"

     var rects=schematic.getElementsByTagName("rect")
        var coverRect=rects[rects.length-1]
        coverRect.setAttribute('onmousedown',"editDrawSchematic("+id+",evt)")

    LoadedSchematicArray.push(schematic)

   domElemG.appendChild(schematic)

  //---reduce scale of large custom schematics----
    var bb=schematic.getBBox()
    if(bb.width>150 || bb.height>150)
    {
     addScale(schematic,.3)  //---transformAdd.js---

    }



}


function closeSchematicTable()
{
   for(var k=0;k<LoadedSchematicArray.length;k++)
   {
        var schematic=LoadedSchematicArray[k]
        var rects=schematic.getElementsByTagName("rect")
        var coverRect=rects[rects.length-1]
        coverRect.setAttribute('onmousedown',"editDrawSchematic("+schematic.id+",evt)")
        schematic.setAttribute("class","schematicElem")
        coverRect.style.cursor="default"
    }
   mySVG.removeAttribute("onmousedown")
   mySVG.removeAttribute("onmousemove")
   mySVG.removeAttribute("onmouseup")

   LoadedSchematicArray=[]
  showSourceSVG()
 schematicTableDiv.style.visibility='hidden'
  schematicTableCloseButton.style.visibility = "hidden"
  getSchematicLibraryButton.style.borderStyle = ""
   enableAllButtons()
}


var InsertSchematic
function addSchematic(myId)
{
    for(var k = 0; k<SchematicDoc.childNodes.length; k++)
    {
        var schematic = SchematicDoc.childNodes.item(k)
        var schematicId = schematic.getAttribute("id")
        {
            if(schematicId==myId)
            {
                InsertSchematic = schematic.cloneNode(true)
                previewTitleDiv.innerHTML = schematic.getAttribute("title")
                var width = +schematic.getAttribute("width")
                var height = +schematic.getAttribute("height")
               previewSchematicFrameDiv.style.width = (width+10)+"px"
               // previewSchematicFrameDiv.style.height = (height+60) +"px"

                previewSchematicFrame.style.width = width+"px"
                previewSchematicFrame.style.height = height+"px"
                previewSchematicFrame.contentWindow.document.body.innerHTML += new XMLSerializer().serializeToString(schematic)
                previewSchematicFrameDiv.style.display = "block"

                var pos = getPosition(openLibraryButton)
                previewSchematicFrameDiv.style.top = (pos.y+10)+"px"
                d3.select("#previewSchematicFrameDiv").transition(900).style("height",(height+60)+"px" )
               // d3.select("#previewSchematicFrameDiv").transition(900).style("width",(width+10)+"px" )

                break
            }

        }

    }
}

function listMySchematicIDs()
{

       //---clear previous table----
        var rows = schematicListTable.rows
        for(var k = rows.length-1; k>=0; k--)
            schematicListTable.deleteRow(rows[k])

              var myEmail=CookieEmail

            //----write table---
            var groups = SchematicDoc.childNodes
            var cnt=0
        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
           if(group.nodeName!="#text")
           {
            var id = group.getAttribute("id")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var email = group.getAttribute("email")

            if(email==myEmail)
            {
                var row = schematicListTable.insertRow(cnt++)
                row.id="row"+id
               // var idCell = row.insertCell(0).innerHTML = id
                var titleCell = row.insertCell(0).innerHTML = title
                var descriptionCell = row.insertCell(1).innerHTML = description
                var removeCell = row.insertCell(2).innerHTML ="<button style=background:red onClick=this.disabled=true;removeMySchematic('"+id+"')>remove</button>"
            }
           }

        }
        schematicListTable.style.display = "block"


}


function removeMySchematic(id)
{

    var svgString = "<remove myId='"+id+"' myEmail='"+CookieEmail+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeSchematic.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

           document.getElementById("row"+id).style.background="gainsboro"

        }


    };

    xhr.send(svgString);

}


function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
    },15);
}


//=============================Retrieve(Edit)/Remove==============================
function schematicRetrieveButtonClicked()
{

    coverRect.style.display="none"
    sendSchematicUpdateMessageSpan.innerHTML = ""

    var myId = retrieveSchematicIdValue.value
    var myEmail = retrieveSchematicEmailValue.value
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "LIBRARY/Schematic.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        SchematicDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        var schematics = SchematicDoc.childNodes

        for(var k = 0; k<schematics.length; k++)
        {
            var schematic  = schematics.item(k)
           if(schematic.nodeName!="#text")
           {
            var id = schematic.getAttribute("id")
            var email = schematic.getAttribute("email")

            if(id==myId&&myEmail==email)
            {


                //---split schematic()----
                splitSchematic(schematic)
               var category=schematic.getAttribute("category")
                for(j=0;j<mySchematicCategoryUpdateSelect.length;j++)
                {
                   var cat=mySchematicCategoryUpdateSelect.options[j].text
                   if(cat==category)
                   {
                     mySchematicCategoryUpdateSelect.selectedIndex=j
                    break
                   }
                }


                mySchematicTitleUpdateValue.value = schematic.getAttribute("title")
                mySchematicDescriptionUpdateValue.value = schematic.getAttribute("description")
                mySchematicNameUpdateValue.value = schematic.getAttribute("name")
                mySchematicEmailUpdateValue.value = email
                retrieveSchematicUpdateDiv.style.display = "block"
                  scrollToTop(600)
                break;
            }
           }
        }

    }
    xhr.send()
}

var SchematicEditArray=[]
function splitSchematic(schematic)
{


 var matrix = schematic.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
     console.log(transX)
SchematicEditArray=[]
   //---place at center---
   var cx=+mySVG.getAttribute("width")/2
   var cy=+mySVG.getAttribute("height")/2
   clearButtonClicked()

schematic.removeChild(schematic.lastChild) //--the cover rect---
   var elems=schematic.childNodes
   var utcMS=new Date().getTime()
   for(var k=0;k<elems.length;k++)
   {



       var clone=elems.item(k).cloneNode(true)



        var cloneTfmRequest = mySVG.createSVGTransform()
        var myTransList = clone.transform
        var objTransList = myTransList.baseVal
        cloneTfmRequest.setTranslate(transX, transY)
        objTransList.appendItem(cloneTfmRequest)
        objTransList.consolidate()



       parent=clone.getAttribute('parent')
       if(parent=="domAddElemG")
       {
         if(clone.nodeName=="circle")
         {
            clone.id="circle"+(utcMS+k)
            clone.setAttribute("onmousedown", "editCircleDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="ellipse")
         {
            clone.id="ellipse"+(utcMS+k)
            clone.setAttribute("onmousedown", "editEllipseDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="text")
         {
            clone.id="text"+(utcMS+k)
            clone.setAttribute("onmousedown", "editTextDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="rect")
         {
            clone.id="rect"+(utcMS+k)
            clone.setAttribute("onmousedown", "editRectDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
         if(clone.nodeName=="polygon")
         {
            clone.id="polygon"+(utcMS+k)
            clone.setAttribute("onmousedown", "editPolygonDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addElem")
            domAddElemG.appendChild(clone)
         }
       }
       if(parent=="domAddPathG")
       {
            clone.id="path"+(utcMS+k)
            clone.setAttribute("onmousedown", "editPathDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addPath")
            domAddPathG.appendChild(clone)
       }
       if(parent=="domAddIconG")
       {
            clone.id="icon"+(utcMS+k)
            clone.setAttribute("onmousedown", "editIconStart(evt)")

            domAddIconG.appendChild(clone)
       }
       if(parent=="domAddSymbolG")
       {
            clone.id="symbol"+(utcMS+k)
            clone.setAttribute("onmousedown", "editSymbolDraw("+clone.id+",evt)")

            domAddSymbolG.appendChild(clone)
       }

       if(parent=="domElemG")
       {
            clone.id="schematic"+(utcMS+k)
            clone.setAttribute("onmousedown", "editSchematicDraw("+clone.id+",evt)")
            domElemG.appendChild(clone)
       }
       SchematicEditArray.push(clone)

    }


    showSourceSVG()
}

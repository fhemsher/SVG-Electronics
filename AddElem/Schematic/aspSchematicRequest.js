
var LoadedSchematicArray=[]  //---hide edit send div---
//---'send' button---
var AddArrowDefs
function sendSchematic()
{
           var cw=addElemSchematicCw

    var name = cw.mySchematicNameValue.value
    var email = cw.mySchematicEmailValue.value
    var title = cw.mySchematicTitleValue.value
    if(cw.schematicCategorySelect.selectedIndex!=0)
    var category = cw.schematicCategorySelect.options[cw.schematicCategorySelect.selectedIndex].text
   else
   var category="Other"
setCookie("name",name,720)
setCookie("email",email,720)
setCookieValues(name,email)


    var schematicG=domElemG.lastChild
     var bb=schematicG.getBBox()
     var cx=bb.x+.5*bb.width
     var cy=bb.y+.5*bb.height


    var saveSchematic = schematicG.cloneNode(true)



      var transX=+saveSchematic.getAttribute("nativeWidth")/2
      var transY=+saveSchematic.getAttribute("nativeHeight")/2
    saveSchematic.setAttribute("transform", "translate("+(-cx+transX)+","+(-cy+transY)+")")  //---upper left at(0,0)--

     AddArrowDefs=document.createElementNS(NS,"defs")
  for(var k=0;k<saveSchematic.childNodes.length;k++)
    {
       saveSchematic.childNodes.item(k).removeAttribute("onmousedown")
       saveSchematic.childNodes.item(k).removeAttribute("style")
       saveSchematic.childNodes.item(k).removeAttribute("rotateAngle")
       saveSchematic.childNodes.item(k).removeAttribute("class")
       //--- //----include defs for arrow markers---
       var elem=saveSchematic.childNodes.item(k)
       if(elem.getAttribute("marker-end"))
       {
            var marker=elem.getAttribute("marker-end")


            var arrows=arrowDefs.childNodes

            for(m=0;m<arrows.length;m++)
            {
                var arrowDef=arrows[m]
                var arrowId=arrowDef.id
                if(marker.indexOf(arrowId)!=-1)
                {
                    AddArrowDefs.appendChild(arrowDef.cloneNode(true))
                }
            }

       }


    }

    if(AddArrowDefs.childNodes.length>0)
    {
        saveSchematic.insertBefore(AddArrowDefs,saveSchematic.firstChild)


    }

    saveSchematic.setAttribute("category", category)
    saveSchematic.setAttribute("title", title)

    saveSchematic.setAttribute("name", name)
    saveSchematic.setAttribute("email", email)

    var utcMS = new Date().getTime()
    saveSchematic.setAttribute("utcMS", utcMS)
    var myId = "schematic"+utcMS
    saveSchematic.setAttribute("id", myId)
    saveSchematic.setAttribute("parentid", myId)



    LoadedSchematicArray.push(saveSchematic)
    var svgString = new XMLSerializer().serializeToString(saveSchematic)
     console.log(svgString)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendSchematic.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
           
            cw.sendSchematicMessageSpan.innerHTML = "Thanks, your schematic has been received and placed in the library."
             cw.refreshSchematicLibraryButton.disabled=false
               cw.sendButton.disabled=true
        }
        console.log(xhr.responseText)

    };

    xhr.send(svgString);
}

function librarySchematicRemoveButtonClicked()
{
    sendSchematicUpdateMessageSpan.innerHTML = ""
    librarySchematicRemoveButton.disabled = true
    var myId = retrieveSchematicIdValue.value
    var myEmail = retrieveSchematicEmailValue.value
    var svgString = "<remove myId='"+myId+"' myEmail='"+myEmail+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeSchematic.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

             sendSchematicUpdateMessageSpan.innerHTML = "Your schematic has been successfully removed from the library."

            retrieveSchematicIdValue.value = ""

        }


    };

    xhr.send(svgString);

}

function sendUpdateSchematic()
{
    sendSchematicUpdateMessageSpan.innerHTML=''
    var myId = retrieveSchematicIdValue.value
    var title = mySchematicTitleUpdateValue.value
    var description = mySchematicDescriptionUpdateValue.value
    var name = mySchematicNameUpdateValue.value
    var email = mySchematicEmailUpdateValue.value
    if(mySchematicCategoryUpdateSelect.selelectedIndex!=0)
        var category = mySchematicCategoryUpdateSelect.options[mySchematicCategoryUpdateSelect.selelectedIndex].text
    else
        var category="Other"


     var schematicG=document.createElementNS(NS,"g")

     //---get all elements in the drawing and build the schematic---
     var paths=domAddPathG.childNodes
     var elems=domAddElemG.childNodes
      var HMIs=domAddHmiG.childNodes
     var symbols=domAddSymbolG.childNodes
     var icons=domAddIconG.childNodes
     var schematics=domAddSchematicG.childNodes


     schematicG.setAttribute("id",myId)
     schematicG.setAttribute("category",category)
     schematicG.setAttribute("title",title)
     schematicG.setAttribute("description",description)
     schematicG.setAttribute("name",name)
     schematicG.setAttribute("email",email)

    for(k=0;k<paths.length;k++)
    {
        var el=paths.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      schematicG.appendChild(el)
    }
    for(k=0;k<elems.length;k++)
    {
        var el=elems.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      schematicG.appendChild(el)
    }
    for(k=0;k<HMIs.length;k++)
    {
        var el=HMIs.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      schematicG.appendChild(el)
    }
    for(k=0;k<symbols.length;k++)
    {
        var el=symbols.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      schematicG.appendChild(el)
    }
    for(k=0;k<icons.length;k++)
    {
        var el=icons.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      schematicG.appendChild(el)
    }
    for(k=0;k<schematics.length;k++)
    {
        var el=schematics.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        schematicG.appendChild(el)
    }
    domWrapper.style.display="block"
    domWrapper.appendChild(schematicG)
    var bbW=domWrapper.getBBox()
    var cxW=bbW.x+.5*bbW.width
    var cyW=bbW.y+.5*bbW.height



    var rect=document.createElementNS(NS,"rect")
    rect.setAttribute("width",bbW.width )
    rect.setAttribute("height",bbW.height)
    rect.setAttribute("stroke","none")
    rect.setAttribute("fill","orange")
    rect.setAttribute("fill-opacity",".4")
   // rect.setAttribute("onmousedown","editSchematic("+myId+",evt)")
     rect.setAttribute("transform","translate("+(bbW.x)+","+(bbW.y)+")")
     schematicG.appendChild(rect)


          schematicG.setAttribute("transform","translate(0,0)")

   // schematicG.setAttribute("transform","translate("+(cxW)+","+(cyW)+")")
    schematicG.setAttribute("nativeWidth",bbW.width)
    schematicG.setAttribute("nativeHeight",bbW.height)




    domAddSchematicG.appendChild(schematicG)


     schematicG.lastChild.setAttribute("fill","white")
     schematicG.lastChild.setAttribute("fill-opacity","0")

    SchematicEditArray=[]
    var svgString = new XMLSerializer().serializeToString(schematicG)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendUpdateSchematic.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
             retrieveSchematicUpdateDiv.style.display="none"
            sendSchematicUpdateMessageSpan.innerHTML = "Your edited schematic (<b>"+myId+"</b>) has been received and updated in the library."

        }


    };

    xhr.send(svgString);
}

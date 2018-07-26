<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement

    var updateSchematicSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Schematic.svg'
    var svgMap=Server.MapPath(svgFile)
    updateSchematicSVG.load(svgMap)

    var docSVG=updateSchematicSVG.documentElement

    docSVG.appendChild(mySVG)
    updateSchematicSVG.save(svgMap)

   Response.Write("OK")

%>
//----mouse down---
var DraggingObjSchematic = false
var objTransformRequestObjSchematic
var objTransListSchematic
var objDragTargetSchematic = null;
var ObjStartXSchematic
var ObjStartYSchematic
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragSchematic(evt)
{
              //----drag component 
    if((!DraggingObjSchematic &&editElemSchematicViz==true)||LoadedSchematicArray.length>0) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetSchematic = evt.target.parentNode

         if(objDragTargetSchematic)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetSchematic.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetSchematic.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjSchematic = objDragTargetSchematic.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetSchematic.transform
            objTransListSchematic = myTransListAnim.baseVal

            ObjStartXSchematic = Pnt.x
            ObjStartYSchematic = Pnt.y

            DraggingObjSchematic = true

        }
    }
    else
        DraggingObjSchematic = false

}
//---mouse move---
function dragSchematic(evt)
{
    if(DraggingObjSchematic)
    {

        var pnt = objDragTargetSchematic.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetSchematic.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXSchematic;
        Pnt.y -= ObjStartYSchematic;

        objTransformRequestObjSchematic.setTranslate(Pnt.x, Pnt.y)
        objTransListSchematic.appendItem(objTransformRequestObjSchematic)
        objTransListSchematic.consolidate()



    }
}
//--mouse up---
function endDragSchematic(evt)
{
    if(DraggingObjSchematic)
    {

        DraggingObjSchematic = false;

        objDragTargetSchematic = null
        DraggingObjSchematic = false

        removeNoSelectAtText()

    }
}

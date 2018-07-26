
var TransformRequestObj
var TransList
var DragTarget=null;
var Dragging = false;
var OffsetX = 0;
var OffsetY = 0;
//---mouse down over element---
function startDragArc(evt)
{
    if(!Dragging) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("class")=="dragTarget")
        {
            if(evt.target.id=='myArc')
                DragTarget=activeElem
            else
                DragTarget = evt.target;

            //---reference point to its respective viewport--
            var pnt = DragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements transformed and/or in different(svg) viewports---
            var sCTM = DragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            TransformRequestObj = DragTarget.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim=DragTarget.transform
            TransList=myTransListAnim.baseVal

            OffsetX = Pnt.x
            OffsetY = Pnt.y

            Dragging=true;
        }
    }
}
//---mouse move---
function dragArc(evt)
{
    if(Dragging)
    {
        var pnt = DragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = DragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());
        Pnt.x -= OffsetX;
        Pnt.y -= OffsetY;

        TransformRequestObj.setTranslate(Pnt.x,Pnt.y)
        TransList.appendItem(TransformRequestObj)
        TransList.consolidate()

        if(DragTarget.id=="circle1")
        {
        ArcPoints[1]=ArcPoints[1]+Pnt.x
        ArcPoints[2]=ArcPoints[2]+Pnt.y

        }
        if(DragTarget.id=="circle2")
        {
            ArcPoints[9]=ArcPoints[9]+Pnt.x
            ArcPoints[10]=ArcPoints[10] +Pnt.y
          
        }
        if(DragTarget.id!="activeElem")
            writeArcD(ArcPoints)


    }
}
//--mouse up---
function endDragArc()
{
    Dragging = false ;


}

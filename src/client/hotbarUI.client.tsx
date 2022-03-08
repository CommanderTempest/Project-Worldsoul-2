import Roact, { Event } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

interface UIProperties 
{
  // custom props!
}

interface UIState
{

}

let actionIsMoving = false;
let actionDebounce = false;
let prevAction: TextButton;
let orgPos: UDim2;

const mouseToButtonOffsetX = 56; // 112/2 -> half of the UI button's size
const mouseToButtonOffsetY = 20; // an offset to put the mouse in the middle of the button
const frameXOffset = 200;        // The frame's X position
const frameYOffset = 474;        // The frame's Y Position

class HotbarUI extends Roact.Component<UIProperties, UIState>
{
  render()
  {
    return (
      <screengui ResetOnSpawn={false}>
        <frame 
          Size={new UDim2(0, 856, 0, 50)} 
          Position={new UDim2(0, 200, 0, 474)}         // Center bottom
          BackgroundColor3={new Color3(138, 138, 138)} // A lightish gray
          >

          <textbutton 
            Text = {"Button1"}
            Position = {new UDim2(0,0,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <textbutton 
            Text = {"Button2"}
            Position = {new UDim2(0,112,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
        </frame>
      </screengui>
    )
  } // end render
}

/********************************************
  actionMoving moves the textButton's around
  based on the position of the player's mouse
*********************************************/

function actionMoving(x: number, y: number, action: TextButton)
{
  orgPos = action.Position;
  let mouse; 
  actionIsMoving = true;
  
  if (actionDebounce === false)
  {
    actionDebounce = true;

    // move button based on mouse position and calculations while mouse is held down
    while (actionIsMoving)
    {
      mouse = Players.LocalPlayer.GetMouse();
      wait(0.01);
      action.Position =
        new UDim2(
          0, ((Players.LocalPlayer.GetMouse().X - frameXOffset) - mouseToButtonOffsetX), 
          0, ((Players.LocalPlayer.GetMouse().Y - frameYOffset) - mouseToButtonOffsetY));
    } // end while
  } // end if-debounce
} // end actionMoving

/********************************************
  stopActionMoving halts the while loop in
  actionMoving as well as handles placement
  of the button onto the hotbar
*********************************************/

function stopActionMoving(x: number, y: number, action: TextButton)
{
  let xOffset = x - frameXOffset;
  let temp: UDim2;
  actionIsMoving = false; // stop the while loop in actionMoving()

  // update the button's position to a prespecified spot on the hotbar
  wait(0.1);
  if (xOffset >= 0 && xOffset < 112)       
  {
    if (checkForMatches(new UDim(0,0)) === true)
    {
      print("test1");
      print(prevAction.Position);
      print(orgPos);
      prevAction.Position = orgPos;
    } // end if
    action.Position = new UDim2(0,0,0,0);    
  } // end if
  else if(xOffset >= 112 && xOffset < 224) {action.Position = new UDim2(0,112,0,0);}
  else if(xOffset >= 224 && xOffset < 336) {action.Position = new UDim2(0,224,0,0);}

  // debounce reset here, to prevent user from
  // moving button again while it's still being moved.
  actionDebounce = false;
} // end stopActionMoving

function checkForMatches(xToSwapTo: UDim): boolean
{
  // I need this variable, because I can't return inside
  // of the forEach loop I guess *shrug*
  let foundToBeTrue: boolean = false;

  myButtonArray.forEach((element) => {
    if (element.Position.X === xToSwapTo)
    {
      prevAction = element;
      foundToBeTrue = true;
    }
  })
  return foundToBeTrue;
  return false;
}

let myHandle = Roact.mount(<HotbarUI/>, playerGui, "HotbarUI");
let myFrame = playerGui.FindFirstChild("HotbarUI")?.FindFirstChild("1") as Frame;
let myButtonArray = myFrame.GetChildren() as Array<TextButton>;

let i = 0;
myButtonArray?.forEach((element) => {
  element.Name = tostring(i);
  i++;
  element.MouseButton1Down.Connect((x, y) => actionMoving(x, y, element));
  element.MouseButton1Up.Connect((x,y) => stopActionMoving(x, y, element));
})


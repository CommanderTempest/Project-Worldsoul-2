import Roact, { Event } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

interface UIProperties 
{
  // custom props!
}

interface UIState
{
  positions: Array<UDim2>;
}

let actionIsMoving = false;
let actionDebounce = false;
let action;

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
          Size={new UDim2(0, 900, 0, 50)} 
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
  }
}

/* stored here cuz it caused a problem
<imagelabel
            Size = {new UDim2(0, 44, 0, 50)}
            Position = {new UDim2(0, 900, 0, 0)}
            // Insert image into here too
          />
*/

// the action is currently moving

function actionMoving(x: number, y: number, action: TextButton)
{
  print(action);
  print(y);
  actionIsMoving = true;
  let mouse;
  if (actionDebounce === false)
  {
    actionDebounce = true;

    while (actionIsMoving)
    {
      mouse = Players.LocalPlayer.GetMouse();
      wait(0.01);
      action.Position =
        new UDim2(
          0, ((Players.LocalPlayer.GetMouse().X - frameXOffset) - mouseToButtonOffsetX), 
          0, ((Players.LocalPlayer.GetMouse().Y - frameYOffset) - mouseToButtonOffsetY));
      // move button based on mouse position and calculations
    } // end while
    actionDebounce = false;
  } // end if-debounce

} // end actionMoving

function stopActionMoving()
{
  print("Stopping movement!");
  actionIsMoving = false; // stop the while loop in the other function...? Wait does this stop it.
}

let myHandle = Roact.mount(<HotbarUI/>, playerGui, "HotbarUI");
let myFrame = playerGui.FindFirstChild("HotbarUI")?.FindFirstChild("1") as Frame;
let myButtonArray = myFrame.GetChildren() as Array<TextButton>;

myButtonArray?.forEach((element) => {
  element.MouseButton1Down.Connect((x, y) => actionMoving(x, y, element));
  element.MouseButton1Up.Connect(() => stopActionMoving());
})


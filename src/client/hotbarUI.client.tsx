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
            Position = {new UDim2(0,112,0,0)}
            Size = {new UDim2(0, 112, 0, 50)}
          />
          <textbutton 
            Text = {"Button2"}
            Event = {{}}
            Size = {new UDim2(0, 112, 0, 50)}
          />

          <imagelabel
            Size = {new UDim2(0, 44, 0, 50)}
            // Insert image into here too
          />
        </frame>
      </screengui>
    )
  }
}

// the action is currently moving

function actionMoving(action: TextButton)
{
  actionIsMoving = true;
  if (actionDebounce === false)
  {
    actionDebounce = true;

    while (actionIsMoving)
    {
      // move button based on mouse position and calculations
    } // end while
    actionDebounce = false;
  } // end if-debounce

} // end actionMoving

function stopActionMoving(action: TextButton)
{
  print("Stopping movement!");
  actionIsMoving = false; // stop the while loop in the other function...? Wait does this stop it.
}

let myHandle = Roact.mount(<HotbarUI/>, playerGui, "HotbarUI");
let myButtonArray = playerGui.FindFirstChild("HotbarUI")?.GetChildren() as Array<TextButton>;

myButtonArray?.forEach((element) => {
  print("Connection Made!");
  element.MouseButton1Down.Connect(() => actionMoving);
  element.MouseButton1Up.Connect(() => stopActionMoving);
})


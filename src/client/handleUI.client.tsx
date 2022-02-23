import Roact, { update } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

// the player's UI
let playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

// these are the positions of each action slot in the hotbar
let firstActionPos: UDim2, secondActionPos: UDim2, thirdActionPos: UDim2, fourthActionPos: UDim2,  
    fifthActionPos: UDim2, sixthActionPos: UDim2, seventhActionPos: UDim2, eighthActionPos: UDim2;

function hotbarUI()
{
  const [uiPosition, updateButtonPosition] = Roact.createBinding(firstActionPos = new UDim2(0,0,0,0))
  const [uiPosition2, updateButtonPosition2] = Roact.createBinding(secondActionPos = new UDim2(0,113,0,0))
  const [uiPosition3, updateButtonPosition3] = Roact.createBinding(thirdActionPos = new UDim2(0,226,0,0))
  const [uiPosition4, updateButtonPosition4] = Roact.createBinding(fourthActionPos = new UDim2(0,339,0,0))
  const [uiPosition5, updateButtonPosition5] = Roact.createBinding(fifthActionPos = new UDim2(0,0,0,0))
  const [uiPosition6, updateButtonPosition6] = Roact.createBinding(sixthActionPos = new UDim2(0,0,0,0))
  const [uiPosition7, updateButtonPosition7] = Roact.createBinding(seventhActionPos = new UDim2(0,0,0,0))
  const [uiPosition8, updateButtonPosition8] = Roact.createBinding(eighthActionPos = new UDim2(0,0,0,0))
  return (
    <screengui ResetOnSpawn={false}>
      <frame 
        
        Size={new UDim2(0, 900, 0, 50)} 
        Position={new UDim2(0, 200, 0, 474)} // Center bottom
        BackgroundColor3={new Color3(138, 138, 138)} // A lightish gray
        >

        <textbutton 
          Event = {{MouseMoved: (x, y) => updateButtonPosition(moveButton(x,y))}}
          Size = {new UDim2(0, 112, 0, 50)}
          Position = {uiPosition}
        />
        <textbutton 
          Event = {{MouseMoved: (x, y) => updateButtonPosition2(moveButton(x,y))}}
          Size = {new UDim2(0, 112, 0, 50)}
          Position = {uiPosition2}
        />
        <textbutton 
          Event = {{MouseMoved: (x, y) => updateButtonPosition3(moveButton(x,y))}}
          Size = {new UDim2(0, 112, 0, 50)}
          Position = {uiPosition3}
        />
        <textbutton 
          Event = {{MouseMoved: (x, y) => updateButtonPosition4(moveButton(x,y))}}
          Size = {new UDim2(0, 112, 0, 50)}
          Position = {uiPosition4}
        />

        <imagelabel
          Size = {new UDim2(0, 44, 0, 50)}
          Position = {new UDim2(0, 896, 0, 0)}
          // Insert image into here too
        />
      </frame>
    </screengui>
  ) // end of return
}

let myHandle = Roact.mount(hotbarUI(), playerGui, "hotbarUI");

//*********************************************************

// the moveButton function moves the button UI from the hotbar 
// and follows the player's mouse until released

function moveButton(button: TextButton, y: number) : UDim2
{
  const mouseToButtonOffsetX = 56; // 112/2 -> half of the UI button's size
  const mouseToButtonOffsetY = 20; // an offset to put the mouse in the middle of the button
  const frameXOffset = 200;        // The frame's X position
  const frameYOffset = 474;        // The frame's Y Position
  
  if (UserInputService.IsMouseButtonPressed("MouseButton1"))
  {
    wait(0.01);
    return new UDim2(0, ((Players.LocalPlayer.GetMouse().X - frameXOffset) - mouseToButtonOffsetX), 
                     0, ((Players.LocalPlayer.GetMouse().Y - frameYOffset) - mouseToButtonOffsetY));
  } // end while
  else
  {
    print("DETECT ELSE?");
    // maybe run releasebutton instead?
    return releaseButton(frameXOffset, frameYOffset, button);
  }
} 

//*********************************************************

// releaseButton handles either dropping a hotbar action
// onto a blank spot, or swapping if otherwise

function releaseButton(xOffset: number, yOffset: number, button: TextButton) : UDim2
{
  // How to check and swap with other button?

  let mouse = Players.LocalPlayer.GetMouse();
  let x = mouse.X - xOffset;
  let y = mouse.Y - yOffset;

  print("X: " + x + "Y: " + y);

  if (x > 112 && x < 225)
  {
    // assign button to spot
    return secondActionPos;
  }
  else if (x > 224 && x < 340)
  {
    return thirdActionPos;
  }
  else if (x > 339 && x < 452)
  {
    return fourthActionPos;
  }
  else
  {
    return firstActionPos;
  }

  //return new UDim2(0,0,0,0);
} // end releaseButton
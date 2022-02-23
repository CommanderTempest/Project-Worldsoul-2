/*

This file is deprecated.
It is the functional version of 
    hotbarUI.client.tsx




import Roact, { update } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

// the player's UI
let playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

// these are the positions of each action slot in the hotbar
let positions: Array<UDim2>, orgPos: Array<UDim2>



function hotbarUI()
{

  const [uiPosition, updateButtonPosition] = Roact.createBinding(positions = orgPos = 
    [new UDim2(0,0,0,0), new UDim2(0,112,0,0), new UDim2(0,224,0,0), new UDim2(0,336,0,0),
     new UDim2(0,0,0,0), new UDim2(0,0,0,0), new UDim2(0,0,0,0), new UDim2(0,0,0,0)])
  
  return (
    <screengui ResetOnSpawn={false}>
      <frame 
        
        Size={new UDim2(0, 900, 0, 50)} 
        Position={new UDim2(0, 200, 0, 474)} // Center bottom
        BackgroundColor3={new Color3(138, 138, 138)} // A lightish gray
        >

        <textbutton 
          Event = {{MouseMoved: (button, y) => updateButtonPosition(moveButton(button, y, 0))}}
          Size = {new UDim2(0, 112, 0, 50)}
          Position = {uiPosition.getValue()[0]}
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

function moveButton(button: TextButton, y: number, posIndex: number) : UDim2[]
{
  const mouseToButtonOffsetX = 56; // 112/2 -> half of the UI button's size
  const mouseToButtonOffsetY = 20; // an offset to put the mouse in the middle of the button
  const frameXOffset = 200;        // The frame's X position
  const frameYOffset = 474;        // The frame's Y Position
    
  if (UserInputService.IsMouseButtonPressed("MouseButton1"))
  {
    wait(0.01);
    print("L" + positions[posIndex]);
    positions[posIndex] = 
      new UDim2(
        0, ((Players.LocalPlayer.GetMouse().X - frameXOffset) - mouseToButtonOffsetX), 
        0, ((Players.LocalPlayer.GetMouse().Y - frameYOffset) - mouseToButtonOffsetY));

    print("W" + positions[posIndex]);
    //print("U" + uiPosition.getValue()[0]);
    return positions;
  } // end while
  else
  {
    print("DETECT ELSE?");
    return releaseButton(frameXOffset, frameYOffset, posIndex);
  }
} 

//*********************************************************

// releaseButton handles either dropping a hotbar action
// onto a blank spot, or swapping if otherwise

function releaseButton(xOffset: number, yOffset: number, posIndex: number): UDim2[]
{
  //let temp = this.state.positions[posIndex];

  let mouse = Players.LocalPlayer.GetMouse();
  let x = mouse.X - xOffset;
  let y = mouse.Y - yOffset;
  let temp, temp2;

  if (x > 112 && x <= 224)
  {
    temp = positions[1]
    temp2 = positions[posIndex]
    positions[posIndex] = orgPos[1];
    positions[0] = temp;
  }
  else if (x > 224 && x <= 336)
  {
    positions[posIndex] = orgPos[1];
  }
  return positions;
} // end releaseButton
*/
export {}

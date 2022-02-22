import Roact, { update } from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

// the player's UI
let playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

function hotbarUI()
{
  const [uiPosition, updateButtonPosition] = Roact.createBinding(new UDim2(0,0,0,0))
  return (
    <screengui ResetOnSpawn={false}>
      <frame 
        
        Size={new UDim2(0, 900, 0, 50)} 
        Position={new UDim2(0, 200, 0, 474)} // Center bottom
        BackgroundColor3={new Color3(138, 138, 138)} // A lightish gray
        >

        <textbutton 
          Event = {{MouseButton1Down: (x, y) => updateButtonPosition(moveButton(x,y)),
            // Where I left off:
            /* How do I constantly update the UI's position, yet check if the button is still down? Could use a coroutine?*/
          MouseButton1Up: () => updateButtonPosition(releaseButton())}}
        
          Size = {new UDim2(0, 112.5, 0, 50)}
          Position = {uiPosition}
          
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

function moveButton(x: TextButton, y: number) : UDim2
{
  
  let myNewPosition;

  // this while loop constantly checks if the left mouse is being pressed
  // then will update the position of the action UI if it is.

  if (UserInputService.IsMouseButtonPressed("MouseButton1"))
  {
    print("RUNNING!");
    wait(0.01);
    // if this works right, follow the player's mouse and update myAction's position
    return new UDim2(0, Players.LocalPlayer.GetMouse().X, 0, Players.LocalPlayer.GetMouse().Y);
  } // end while

  print("DETECT ELSE?");
  return new UDim2(0, 0, 0, 0);
} 

//*********************************************************

// releaseButton handles either dropping a hotbar action
// onto a blank spot, or swapping if otherwise

function releaseButton() : UDim2
{
  print("Mouse released");
  return new UDim2(0,0,0,0);
} // end releaseButton
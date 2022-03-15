//idk put this on server?

import Roact from "@rbxts/roact";
import {Players, UserInputService} from "@rbxts/services";

const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

let actionIsMoving = false;
let actionDebounce = false;
let prevAction: ActionButton;
let orgPos: UDim2;

let myFrame = playerGui.FindFirstChild("HotbarUI")?.FindFirstChild("1") as Frame;

const mouseToButtonOffsetX = 56; // 112/2 -> half of the UI button's size
const mouseToButtonOffsetY = 20; // an offset to put the mouse in the middle of the button
const frameXOffset = 200;        // The frame's X position
const frameYOffset = 474;        // The frame's Y Position

interface ActionProperties {
  Text: string
  Position: UDim2
  Size?: UDim2
}

class ActionButton extends Roact.Component<ActionProperties>
{
  static actionButtonArray: Array<ActionButton> = new Array<ActionButton>();
  public Position: UDim2 = this.props.Position;

  didMount()
  {
    ActionButton.actionButtonArray.push(this);
  }

  render()
  {
    // cards on my website need to be 300px large and no larger than 375px -- university note
    //maybe include image, one for empty, one for the action
    return (
      <textbutton
        Event = {{MouseButton1Down: (button: TextButton, x: number, y: number) => {actionMoving(x,y,button);},
                  MouseButton1Up: (button: TextButton, x: number, y: number) => {stopActionMoving(x,y,button);}
      }}
        Text = {this.props.Text}
        Position = {this.props.Position}
        Size = {this.props.Size}
      />
    )
  }
} // end ActionButton

/********************************************
  actionMoving moves the textButton's around
  based on the position of the player's mouse
*********************************************/

function actionMoving(x: number, y: number, action: TextButton)
{
  action.ZIndex = 99;
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
  let yOffset = y - frameYOffset;  
  actionIsMoving = false; // stop the while loop in actionMoving()

  // update the button's position to a prespecified spot on the hotbar
  wait(0.1);
  if (yOffset > 150 || yOffset < -150) // reset to original position if too far off hotbar
  {
    action.Position = orgPos;
  } // end if
  else
  {
    if (xOffset >= 0 && xOffset < 112)       
    {
      if (checkForMatches(new UDim(0,0)) === true)
      {
        prevAction.Position = orgPos;
      } // end if
      action.Position = new UDim2(0,0,0,0);    
    } // end if
    else if(xOffset >= 112 && xOffset < 224) 
    {
      if(checkForMatches(new UDim(0, 112)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,112,0,0);
    }
    else if(xOffset >= 224 && xOffset < 336) 
    {
      if (checkForMatches(new UDim(0, 224)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,224,0,0);
    }
    else if(xOffset >= 336 && xOffset < 448) 
    {
      if (checkForMatches(new UDim(0, 336)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,336,0,0);
    }
    else if(xOffset >= 448 && xOffset < 560) 
    {
      if (checkForMatches(new UDim(0, 448)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,448,0,0);
    }
    else if(xOffset >= 560 && xOffset < 672) 
    {
      if (checkForMatches(new UDim(0, 560)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,560,0,0);
    }
    else if(xOffset >= 672 && xOffset < 784) 
    {
      if (checkForMatches(new UDim(0, 672)) === true)
      {
        prevAction.Position = orgPos;
      }
      action.Position = new UDim2(0,672,0,0);
    }
    else if(xOffset >= 784 && xOffset < 856) 
    {
      if (checkForMatches(new UDim(0, 784)) === true)
      {
        prevAction.Position = orgPos;
      } // end if
      action.Position = new UDim2(0,784,0,0);
    }
  } // end else
  

  // debounce reset here, to prevent user from
  // moving button again while it's still being moved.
  action.ZIndex = 1;
  actionDebounce = false;
} // end stopActionMoving


/* this function looks for a button in the location
 * the currently moving button is over and returns
 * when it was found                                 */
function checkForMatches(xToSwapTo: UDim, currentAction: TextButton): boolean
{
  // I need this variable, because I can't return inside
  // of the forEach loop I guess *shrug*
  let foundToBeTrue: boolean = false;
  
  ActionButton.actionButtonArray.forEach((element2) => {
    if (element2.Position.X === xToSwapTo)
    {
      //print(prevAction);
      print("Prev:" + prevAction);
      print("Element: " + element2);
      prevAction = element2;
      element2.Position = orgPos;
      foundToBeTrue = true;
    }
  })
  return foundToBeTrue;
} // end checkForMatches



export {ActionButton}
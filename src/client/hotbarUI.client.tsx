import Roact from "@rbxts/roact";
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

class HotbarUI extends Roact.Component<UIProperties, UIState>
{
  state = {
    positions: [
      new UDim2(0,0,0,0), new UDim2(0,112,0,0), new UDim2(0,224,0,0), new UDim2(0,336,0,0),
      new UDim2(0,0,0,0), new UDim2(0,0,0,0), new UDim2(0,0,0,0), new UDim2(0,0,0,0)
    ]
  }
  private orgPos: Array<UDim2> = this.copyArray(this.state.positions); // a copy of the initial pos's of our action's

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
            Event = {{MouseMoved: (button, y) => this.setState({positions: this.moveButton(button, y, 0)})}}
            Size = {new UDim2(0, 112, 0, 50)}
            Position = {this.state.positions[0]}
          />

          <imagelabel
            Size = {new UDim2(0, 44, 0, 50)}
            Position = {new UDim2(0, 896, 0, 0)}
            // Insert image into here too
          />
        </frame>
      </screengui>
    )
  }

  moveButton(button: TextButton, y: number, posIndex: number): UDim2[]
  {
    const mouseToButtonOffsetX = 56; // 112/2 -> half of the UI button's size
    const mouseToButtonOffsetY = 20; // an offset to put the mouse in the middle of the button
    const frameXOffset = 200;        // The frame's X position
    const frameYOffset = 474;        // The frame's Y Position
    
    if (UserInputService.IsMouseButtonPressed("MouseButton1"))
    {
      wait(0.01);
      this.state.positions[posIndex] = 
        new UDim2(
          0, ((Players.LocalPlayer.GetMouse().X - frameXOffset) - mouseToButtonOffsetX), 
          0, ((Players.LocalPlayer.GetMouse().Y - frameYOffset) - mouseToButtonOffsetY));

      return this.state.positions
    } // end while
    else
    {
      print("DETECT ELSE?");
      return this.releaseButton(frameXOffset, frameYOffset, posIndex);
    }
  }

  releaseButton(xOffset: number, yOffset: number, posIndex: number): UDim2[]
  {
    //let temp = this.state.positions[posIndex];

    let mouse = Players.LocalPlayer.GetMouse();
    let x = mouse.X - xOffset;
    let y = mouse.Y - yOffset;

    if (x >= 0 && x < 112)
    {
      this.state.positions[posIndex] = new UDim2(0,0,0,0);
    }
    else if (x >= 112 && x < 224)
    {
      this.state.positions[posIndex] = new UDim2(0,112,0,0);
    }
    else 
    {
      this.state.positions[posIndex] = this.orgPos[posIndex];
    }
    return this.state.positions;
  }
  
  private swap(button1: TextButton, button2: TextButton)
  {

  }

  private copyArray<T>(arrayToCopyFrom: Array<T>): Array<T>
  {
    let myNewArray = new Array<T>();

    for (let i=0; i<arrayToCopyFrom.size(); i++)
    {
      myNewArray[i] = arrayToCopyFrom[i];
    }
    return myNewArray;
  }
}

Roact.mount(<HotbarUI/>, playerGui, "HotbarUI");


//idk put this on server?

import Roact from "@rbxts/roact";

interface ActionProperties {
  Text: string
  Position?: UDim2
  Size?: UDim2
}

class ActionButton extends Roact.Component<ActionProperties>
{
  render()
  {
    // cards on my website need to be 300px large and no larger than 375px -- university note
    //maybe include image, one for empty, one for the action
    return (
    <textbutton
      Event = {{MouseButton1Down: (rbx: TextButton, x: number, y: number) => {},
                MouseButton1Up: (rbx: TextButton, x: number, y: number) => {}
    }}
      Text = {this.props.Text}
      Position = {this.props.Position}
      Size = {this.props.Size}
    />)
  }
}

export {ActionButton}
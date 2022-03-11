import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";
import Remotes from "shared/remotes.module";

interface UIProps {
  text: string
}

let myProps: UIProps = {text: ""} // no target

function targetUI(props: UIProps)
{
  return (
    <screengui ResetOnSpawn={true}>
      <frame
        Size={new UDim2(0, 100, 0, 50)}
        Position={new UDim2(0, 200, 0, 674)} // idk where this is
      >
        <textlabel
          Text = {props.text}
        />
      </frame>
  </screengui>
  )
} // end targetUI

let ui = Roact.mount(targetUI(myProps), Players.LocalPlayer.FindFirstChild("PlayerGui"), "Targeting")

Remotes.Client.Get("targetEntity").Connect(() => {
  wait(0.1); // target being set
  let myUpdatedProps: UIProps = {text: Players.LocalPlayer.GetAttribute("target") as string};
  Roact.update(ui, targetUI(myUpdatedProps));
})

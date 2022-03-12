import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";
import Remotes from "shared/remotes.module";
import {myStore, setTarget} from "client/roduxSetTarget.module";

interface UIProps {
  text: string
}

let myProps: UIProps = {text: ""} // no target

function targetUI(props: UIProps)
{
  return (
    <screengui ResetOnSpawn={true}>
      <frame
        Size={new UDim2(0, 300, 0, 50)}
        Position={new UDim2(0, 800, 0, 274)} // idk where this is
      >
        <textlabel
          Text = {props.text}
          Position = {new UDim2(0, 150, 0, 25)}
        />
      </frame>
  </screengui>
  )
} // end targetUI

let ui = Roact.mount(targetUI(myProps), Players.LocalPlayer.FindFirstChild("PlayerGui"), "Targeting")

Remotes.Client.Get("targetEntity").Connect((target: Part) => {
  Players.LocalPlayer.SetAttribute("target", target.Name);
  myStore.dispatch(setTarget(target));
  let myUpdatedProps: UIProps = {text: Players.LocalPlayer.GetAttribute("target") as string};
  Roact.update(ui, targetUI(myUpdatedProps));
})

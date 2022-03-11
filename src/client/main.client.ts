import { Players } from "@rbxts/services";
import Remotes from "shared/remotes.module";

Remotes.Client.Get("targetEntity").Connect((part: Part) => setTarget(part));

function setTarget(target: Part)
{
  Players.LocalPlayer.SetAttribute("target", target);
} // end setTarget


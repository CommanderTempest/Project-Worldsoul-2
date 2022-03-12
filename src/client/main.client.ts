import { Players } from "@rbxts/services";
import Remotes from "shared/remotes.module";

let targetedEntity: Part;
Remotes.Client.Get("targetEntity").Connect((target: Part) => {
  Players.LocalPlayer.SetAttribute("target", target.Name);
});


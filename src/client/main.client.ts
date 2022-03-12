import { Players } from "@rbxts/services";
import Remotes from "shared/remotes.module";
import {myStore, setTarget} from "client/roduxSetTarget.module";

let targetedEntity: Part;
Remotes.Client.Get("targetEntity").Connect((target: Part) => {
  Players.LocalPlayer.SetAttribute("target", target.Name);
  myStore.dispatch(setTarget(target));
  print(myStore.getState().target);
});


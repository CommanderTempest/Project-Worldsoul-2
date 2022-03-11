import Remotes from "shared/remotes.module";
import {setTarget, myTarget} from "client/target.module";

/*
  If needed, re-do this in future to prevent client tampering,
  like set the target on the server to a specific player.

  i.e. player clicks target, this is set as a value and the key is the player
*/

Remotes.Client.OnEvent("targetEntity", (part: Part) => {
  setTarget(part);
  print(part.Name);
  //print("Target set: " + myTarget.Name);
})

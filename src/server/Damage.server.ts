/*

*/

import Remotes from "shared/remotes.module";
import { myStore } from "client/roduxSetTarget.module";

const damage = 25; // dummy damage value for testing

Remotes.Server.OnEvent("sendDamage", () => sendDamageToEntity)

function sendDamageToEntity()
{
  
}
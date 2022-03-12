
import Rodux, { Action, Store } from "@rbxts/rodux";
/*
This is poorly named because this is more of a test or Rodux practice bit than anything else

Programmer: krukovv (Discord: Commander Tempest#1406)
This file sets the target in a Rodux store, to be utilized in other files.
*/

interface targetEntity
{
  target: Part
}

interface targetEntity2 extends Rodux.Action
{
  type: string,
  value: Part
}

function reducer(state: targetEntity, action: targetEntity2): targetEntity
{
  switch (action.type)
  {
    case "setTarget":
      print("setting new target");
      let newState: targetEntity = {target: action.value};
      return newState;
    default:
      return state;
  }
}

let myStore = new Store(reducer);

//ACTIONS

function setTarget(target: Part) : targetEntity2
{
  return {
    type: "setTarget",
    value: target
  }
}


export {setTarget, myStore} 
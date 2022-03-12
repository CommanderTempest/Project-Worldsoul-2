
import Rodux, { Action, Store } from "@rbxts/rodux";
/*
This is poorly named because this is more of a test or Rodux practice bit than anything else

My goal in this file is to store the targeted ENTITY in a Rodux store, to be retrieved by other files.
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
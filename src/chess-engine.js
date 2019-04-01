export let knightPosition = [2, 2];
let observer  = null;

export function emitChange(){
    //observer(knightPosition);
    observer(knightPosition); //
}

export function observe(obj){
    //if(observer){
    //    throw new Error('Multiple observers not implemented');
    //}
    console.log(obj);

    observer = obj;
    emitChange();
}

export function moveKnight(toX, toY){
    knightPosition = [toX, toY];
    emitChange();
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
var w = 160,
    d = 30,
    h = 9;

var cageMargin = 50;
var lateralPieceW = 9; // lateral W for the small pieces
var lateralMax = 8.5;
var lateralMin = 7;
var frontWall = 2.2; //front wall
var topDownLayer = 1; // top and down layer
var backCageW = 39; // back cage width

function createCube(params) {
    return cube(params);
}
function removeCage (origin) {
    var cW = 60,
        cD = 24,
        cH = 7;
    
    var a = createCube({size: [cW,cD,cH]});

    return difference(origin,
        a.translate([cageMargin,0,1])
    );
}
function removeTopCage(origin) {
    var cW = 47.7,
        cD = 17.6,
        cH = topDownLayer;
    
    var a = createCube({size: [cW,cD,cH]});

    return difference(origin,
        a.translate([55.5,0,h-topDownLayer])
    );
}
function removeLaterals(origin) {
    var cW = lateralPieceW,
        cD = 30, 
        cH = topDownLayer;
        
    var wall = frontWall;
   
    var params = {size: [cW,cD,cH]};
    
    var a = new createCube(params),
        b = new createCube(params),
        c = new createCube(params),
        d = new createCube(params);
    
    return difference(origin,
        a.translate([0,wall,0]),
        b.translate([0,wall,h-cH]),
        c.translate([w-cW,wall,0]),
        d.translate([w-cW,wall,h-cH])
  );
}
function removeBottomLateral(origin) {
    var cW = lateralPieceW,
        cD = 4.5,
        cH = h;
    
    var params = {size: [cW,cD,cH]};
    var cA = new createCube(params),
        cB = new createCube(params);
        
    return difference(origin,
        cA.translate([0,d-cD,0]),
        cB.translate([w-cW,d-cD,0])
    )
}
function removeLateralLateral(origin) {
    var margin = frontWall;
    
    var cW = frontWall,
        cD = d,
        cH = h;
    
    var params = {size: [cW,cD,cH]};
    
    var cA = new createCube(params),
        cB = new createCube(params);
        
    return difference(origin,
        cA.translate([0,margin,0]),
        cB.translate([w-margin,margin,0])
    )
}
function removeRail(origin) {
    var margin = topDownLayer;
    
    var cW = w,
        cD = 5,
        cH = h-(2*topDownLayer);
    
    var params = {size: [cW,cD,cH]};
    
    var cA = new createCube(params);

    return difference(origin,
        cA.translate([0,d-cD,margin])
    );
}
function removeBackCages(origin) {
//    return origin;
     var margin = topDownLayer;
    
    var cW = backCageW,
        cD = d-frontWall,
        cH = h-(2*topDownLayer);
    
    var params = {size: [cW,cD,cH]};
    
    var a = new createCube(params),
        b = new createCube(params);

    return difference(origin,
        a.translate([lateralPieceW+1,d-cD,margin]),
        b.translate([w-lateralPieceW-cW-1,d-cD,margin]) // total w - lateral piece - cage w
    );
}
function removeRailCage(origin) {
//   return origin;
  var margin = topDownLayer;
    
    var cW = 2,
        cD =20,
        cH = 2;
    
    var params = {size: [cW,cD,cH]};
    
    var a = new createCube(params),
        b = new createCube(params);

    return difference(origin,
        a.translate([cageMargin-1,2,(h/2)-(cH/2)]),
        b.translate([w-cageMargin,2,(h/2)-(cH/2)]) // total w - lateral piece - cage w
    );}

function main () {
    var block = createCube({size: [w,d,h]});
    
    var result = 
        removeRailCage(
        removeBackCages(
        removeRail(
        removeLateralLateral(
        removeBottomLateral(
        removeLaterals(
        removeTopCage(
        removeCage(block)
    )))))));
  

  return result;

}

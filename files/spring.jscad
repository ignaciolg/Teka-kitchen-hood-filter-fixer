// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad
//[x,y,z] => [w, d, h] => [largo, ancho, alto] 
var w = 59.5,
    d = 24,
    h = 5.5;
    
var lateral = 7.5;
var tip = 5;
var spring = 4.5


function createCube(params) {
    return cube(params);
}
function createRegularPrism(params) {
     var w = params.size[0],
        d = params.size[1], 
        h = params.size[2];
        
    return polyhedron({      // openscad-like (e.g. pyramid)
        points: [ 
            [0,0,0],    [0,d,0],   [w,0,0],   [w, d, 0], //base 4 poins
            [0,0,h],   [0,d,h]
        ],                                  // top 2 points
        triangles: [
            [0,2,1],    [2,3,1],    // base
            [0,1,4],    [1,5,4],    // back wall
            [0,4,2],    [5,1,3],    // laterals
            [2,4,5],    [3,2,5]     // top
        ]                           
    });
   
}

function removeFront(origin) {
     var cW = w-2*lateral,
        cD = d-lateral,
        cH = h;
    
    var params = {size: [cW,cD,cH]};
    
    var cA = new createCube(params);

    return difference(origin,
        cA.translate([lateral,0,0])
    );
}
function removeTip(origin){
    var margin = 1.7;
    var cW = w,
        cD = tip,
        cH = margin;
    
    var params = {size: [cW,cD,cH]};
    
    var a = new createCube(params);
    var b = new createCube(params);

    return difference(origin,
        a.translate([0,0,0]),
        b.translate([0,0,h-margin])
    );
}
function removeSpringCages(origin) {
     var side = 4;
    var cW = side,
        cD = 18,
        cH = side;
    
    var params = {size: [cW,cD,cH]};
    
    var a = new createCube(params);
    var b = new createCube(params);

    return difference(origin,
        a.translate([1,tip+1,(h-side)/2]),
        b.translate([w-side-1,tip+1,(h-side)/2])
    );
}

function addResort(origin) {
    var margin = 1.5;
     var cW = 10,
        cD = 1,
        cH = 1;
        var params = {size: [cW,cD,cH]};

    var a = rotate([-90,0,90],createRegularPrism(params)),
        b = rotate([90,0,90],createRegularPrism(params))

    return union(origin,
    a.translate([0,tip+margin,(h/2)+(cH/2)]),
    b.translate([w,tip+margin,(h/2)-(cH/2)])
    
    );
}

function main () {
    var block = createCube({size: [w,d,h]});
    //var prism = createRegularPrism({size: [10,4,4]})
    
    var result = 
        addResort(
        removeSpringCages(
        removeTip(
        removeFront(
        block))));
    
    //     removeRailCage(
    //     removeBackCages(
    //     removeRail(
    //     removeLateralLateral(
    //     removeBottomLateral(
    //     removeLaterals(
    //     removeTopCage(
    //     removeCage(block)
    // )))))));
  

  return [result];

}

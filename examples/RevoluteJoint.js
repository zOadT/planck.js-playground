planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -20));

    let ground = world.createBody();
    ground.createFixture(
        planck.Edge(planck.Vec2(-40, 0), planck.Vec2(40, 0))
    );
    let lever1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-20, 20),
    });
    lever1.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    world.createJoint(planck.RevoluteJoint({
        bodyA: lever1,
        bodyB: ground,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(-3, 0),
        localAnchorB: planck.Vec2(-20, 20),
        referenceAngle: 0,
        
        // enableLimit: boolean,
        // lowerAngle: number,
        // upperAngle: number,
        // enableMotor: boolean,
        // maxMotorTorque: number,
        // motorSpeed: number,
    }));

    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 20),
    });
    box1.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 20),
    });
    box2.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    world.createJoint(planck.RevoluteJoint({
        bodyA: box1,
        bodyB: box2,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(-3, 0),
        localAnchorB: planck.Vec2(3, 0),
        referenceAngle: 0,
        
        enableLimit: true,
        lowerAngle: -Math.PI*7/8,
        upperAngle: Math.PI*7/8,
        // enableMotor: boolean,
        // maxMotorTorque: number,
        // motorSpeed: number,
    }));

    let box3 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, 20),
        angle: -Math.PI / 4,
    });
    box3.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    let hinge = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, 20),
    });
    world.createJoint(planck.RevoluteJoint({
        bodyA: box3,
        bodyB: hinge,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(0, 0),
        localAnchorB: planck.Vec2(0, 0),
        referenceAngle: 0,
        
        enableLimit: true,
        lowerAngle: Math.PI / 4,
        upperAngle: Math.PI * 3 / 4,
        // enableMotor: boolean,
        // maxMotorTorque: number,
        // motorSpeed: number,
    }));

    return world;
});
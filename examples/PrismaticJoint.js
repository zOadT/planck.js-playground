planck.testbed(testbed => {
    let world = planck.World(planck.Vec2(0, -10));

    let ground = world.createBody({
        type: "static",
    });
    ground.createFixture(planck.Edge(
        planck.Vec2(-30, 0), planck.Vec2(30, 0)
    ));

    let box = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 40),
    });
    box.createFixture({
        shape: planck.Box(1, 1),
        density: 1
    });

    world.createJoint(planck.PrismaticJoint({
        bodyA: ground,
        bodyB: box,

        // userData: null,
        // collideConnected: false,

        localAnchorA: planck.Vec2(0, 40),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(1, 0),
        // referenceAngle: Math.PI/4,

        enableLimit: true,
        lowerTranslation: -30,
        upperTranslation: 30,
        enableMotor: true,
        maxMotorForce: 4,
        motorSpeed: 2,
    }));

    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 10),
    });
    box1.createFixture(planck.Box(4, 2), {density: 1});
    
    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 20),
    });
    box2.createFixture(planck.Box(2, 2), {density: 1});

    world.createJoint(planck.PrismaticJoint({
        bodyA: box1,
        bodyB: box2,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(0, 3),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(0, 1),
        // referenceAngle: Math.PI/4,

        enableLimit: true,
        lowerTranslation: 0,
        upperTranslation: 30,
        // enableMotor: boolean,
        // maxMotorForce: number,
        // motorSpeed: number,
    }));

    return world;
});
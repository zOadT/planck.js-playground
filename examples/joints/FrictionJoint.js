planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -10));

    let ground = world.createBody();
    ground.createFixture(
        planck.Edge(planck.Vec2(-35, 0), planck.Vec2(35, 0))
    );
    ground.createFixture(
        planck.Edge(planck.Vec2(10, 20), planck.Vec2(20, 20))
    );

    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-15, 40),
        angularVelocity: 3,
    });
    box1.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });

    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-5, 40),
        angularVelocity: 3,
    });
    box2.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    world.createJoint(planck.FrictionJoint({
        bodyA: ground,
        bodyB: box2,

        // userData: null,
        collideConnected: true,

        localAnchorA: planck.Vec2(-5, 40),
        localAnchorB: planck.Vec2(0, 0),

        maxForce: 10,
        maxTorque: 2,
    }));

    let box3 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(5, 40),
        angularVelocity: 3,
    });
    box3.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    let box4 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(15, 40),
        angularVelocity: 3,
    });
    box4.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    world.createJoint(planck.FrictionJoint({
        bodyA: box3,
        bodyB: box4,

        // userData: null,
        // collideConnected: false,

        localAnchorA: planck.Vec2(0, 0),
        localAnchorB: planck.Vec2(0, 0),

        maxForce: 100,
        maxTorque: 1,
    }));

    return world;
});
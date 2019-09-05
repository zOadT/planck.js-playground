planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -10));

    let ground = world.createBody();
    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-20, -10),
    });
    box1.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    world.createJoint(planck.DistanceJoint({
        bodyA: ground,
        bodyB: box1,

        // userData: null,
        // collideConnected: false,

        localAnchorA: planck.Vec2(-20, 20),
        localAnchorB: planck.Vec2(0, 1),

        // frequencyHz: 1,
        // dampingRatio: 0.5,
        length: 20,
    }));

    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, -10),
    });
    box2.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    world.createJoint(planck.DistanceJoint({
        bodyA: ground,
        bodyB: box2,

        // userData: null,
        // collideConnected: false,

        localAnchorA: planck.Vec2(0, 20),
        localAnchorB: planck.Vec2(0, 1),

        frequencyHz: 1,
        // dampingRatio: 0.5,
        length: 20,
    }));

    let box3 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, -10),
    });
    box3.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });

    world.createJoint(planck.DistanceJoint({
        bodyA: ground,
        bodyB: box3,

        // userData: null,
        // collideConnected: false,

        localAnchorA: planck.Vec2(20, 20),
        localAnchorB: planck.Vec2(0, 1),

        frequencyHz: 1,
        dampingRatio: 0.2,
        length: 20,
    }));

    return world;
});
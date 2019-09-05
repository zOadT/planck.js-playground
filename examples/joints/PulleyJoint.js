planck.testbed(testbed => {
    let world = planck.World(planck.Vec2(0, -10));

    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-20, 0),
    });
    box1.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });

    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, 0),
    });
    box2.createFixture({
        shape: planck.Box(2, 2),
        density: 1,
    });

    let groundAnchorA = planck.Vec2(-20, 20);
    let groundAnchorB = planck.Vec2(20, 20);

    world.createJoint(planck.PulleyJoint({
        bodyA: box1,
        bodyB: box2,

        // userData: null,
        // collideConnected: true,

        groundAnchorA,
        groundAnchorB,
        localAnchorA: planck.Vec2(0, 0),
        localAnchorB: planck.Vec2(0, 0),
        lengthA: 20,
        lengthB: 20,
        ratio: 4,
    }));

    testbed.step = function() {
        testbed.drawSegment(groundAnchorA, groundAnchorB, "blue");
        testbed.drawSegment(box1.getPosition(), groundAnchorA, "green");
        testbed.drawSegment(box2.getPosition(), groundAnchorB, "red");
    }

    return world;
});
planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -10));

    let ground = world.createBody();

    let box = world.createBody({
        type: "dynamic",
    });
    box.createFixture({
        shape: planck.Box(3, 3),
        density: 1,
    });

    let mouseJoint = world.createJoint(planck.MouseJoint({
        bodyA: ground,
        bodyB: box,

        // userData: null,
        // collideConnected: false,

        target: planck.Vec2(0, 3),

        maxForce: 1000,
        // frequencyHz: number,
        // dampingRatio: number,
    }));

    window.setTimeout(
        () => mouseJoint.setTarget(planck.Vec2(10, 20)),
        500);

    return world;
});
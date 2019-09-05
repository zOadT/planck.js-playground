planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -10));

    world.createBody()
        .createFixture(
            planck.Edge(planck.Vec2(-40, 0), planck.Vec2(40, 0))
        );

    let length = 20;

    let prevPearl = null;
    for(let i = 0; i < length; i++) {
        let pearl = world.createBody({
            type: "dynamic",
            position: planck.Vec2(i - length / 2, 30),
        });
        pearl.createFixture({
            shape: planck.Circle(1),
            density: 1,
        });
        if(prevPearl) {
            world.createJoint(planck.RopeJoint({
                bodyA: prevPearl,
                bodyB: pearl,

                // userData: null,
                collideConnected: true,

                localAnchorA: planck.Vec2(0, -1),
                localAnchorB: planck.Vec2(0, 1),

                maxLength: 1,
            }))
        }
        prevPearl = pearl;
    }

    return world;
});
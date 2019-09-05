planck.testbed(function(testbed) {
    let world = planck.World(planck.Vec2(0, -10));

    let ground = world.createBody();
    ground.createFixture(
        planck.Edge(planck.Vec2(-40, 0), planck.Vec2(40, 0))
    );

    let car = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 10),
    });
    car.createFixture({
        shape: planck.Box(4, 2),
        density: 1,
    });

    let tyre1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-2, 3),
    });
    tyre1.createFixture({
        shape: planck.Circle(1),
        density: 1,
    });
    let tyre2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(2, 3),
    });
    tyre2.createFixture({
        shape: planck.Circle(1),
        density: 1,
    });

    world.createJoint(planck.WheelJoint({
        bodyA: car,
        bodyB: tyre1,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(-2, -4),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(0, 1),

        // enableMotor: boolean,
        // maxMotorTorque: number,
        // motorSpeed: number,
        // frequencyHz: number,
        // dampingRatio: number,
    }));
    world.createJoint(planck.WheelJoint({
        bodyA: car,
        bodyB: tyre2,

        // userData: null,
        // collideConnected: true,

        localAnchorA: planck.Vec2(2, -4),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(0, 1),

        // enableMotor: boolean,
        // maxMotorTorque: number,
        // motorSpeed: number,
        // frequencyHz: number,
        // dampingRatio: number,
    }));

    return world;
});
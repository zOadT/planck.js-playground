planck.testbed(function(testbed) {
    let world = planck.World();

    let ground = world.createBody();

    let lever1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-20, 20),
    });
    lever1.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    let jointA = world.createJoint(planck.RevoluteJoint({
        bodyA: ground,
        bodyB: lever1,
        localAnchorA: planck.Vec2(-20, 20),
        localAnchorB: planck.Vec2(-3, 0),
        referenceAngle: 0,
    }));

    let box1 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(-20, 0),
    });
    box1.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    let jointB = world.createJoint(planck.PrismaticJoint({
        bodyA: ground,
        bodyB: box1,
        localAnchorA: planck.Vec2(-20, 0),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(1, 0),
    }));

    world.createJoint(planck.GearJoint({
        bodyA: lever1,
        bodyB: box1,
        joint1: jointA,
        joint2: jointB,
        ratio: 1,
    }));

    let box2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 20),
    });
    box2.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    let jointC = world.createJoint(planck.PrismaticJoint({
        bodyA: ground,
        bodyB: box2,
        localAnchorA: planck.Vec2(0, 20),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(1, 0),
    }));

    let box3 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(0, 0),
    });
    box3.createFixture({
        shape: planck.Box(1, 1),
        density: 1,
    });
    let jointD = world.createJoint(planck.PrismaticJoint({
        bodyA: ground,
        bodyB: box3,
        localAnchorA: planck.Vec2(0, 0),
        localAnchorB: planck.Vec2(0, 0),
        localAxisA: planck.Vec2(1, 0),
    }));

    world.createJoint(planck.GearJoint({
        bodyA: box2,
        bodyB: box3,
        joint1: jointC,
        joint2: jointD,
        ratio: 1,
    }));

    let lever2 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, 20),
    });
    lever2.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    let jointE = world.createJoint(planck.RevoluteJoint({
        bodyA: ground,
        bodyB: lever2,
        localAnchorA: planck.Vec2(20, 20),
        localAnchorB: planck.Vec2(-3, 0),
        referenceAngle: 0,
    }));

    let lever3 = world.createBody({
        type: "dynamic",
        position: planck.Vec2(20, 0),
    });
    lever3.createFixture({
        shape: planck.Box(4, 1),
        density: 1,
    });
    let jointF = world.createJoint(planck.RevoluteJoint({
        bodyA: ground,
        bodyB: lever3,
        localAnchorA: planck.Vec2(20, 0),
        localAnchorB: planck.Vec2(-3, 0),
        referenceAngle: 0,
    }));

    world.createJoint(planck.GearJoint({
        bodyA: lever2,
        bodyB: lever3,
        joint1: jointE,
        joint2: jointF,
        ratio: 1,
    }));

    return world;
});
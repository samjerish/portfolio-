import * as THREE from 'three';
import Application from '../Application';
import Resources from '../Utils/Resources';
import TWEEN from '@tweenjs/tween.js';

export default class Boy {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    model: any;
    armature: THREE.Object3D;
    
    // Bones
    bones: { [key: string]: THREE.Bone } = {};

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        this.model = this.resources.items.gltfModel.boyModel;
        this.setModel();
        this.poseSitting();
    }

    setModel() {
        this.model.scene.scale.set(400, 400, 400); 
        this.model.scene.position.set(200, -500, 500); // adjust to fit the chair
        this.model.scene.rotation.y = Math.PI; // face computer

        this.scene.add(this.model.scene);

        this.model.scene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if (child.isBone) {
                this.bones[child.name] = child;
            }
        });
    }

    poseSitting() {
        // Bend legs to sit
        if (this.bones['LeftUpLeg_60']) this.bones['LeftUpLeg_60'].rotation.x = -Math.PI / 2.5;
        if (this.bones['RightUpLeg_65']) this.bones['RightUpLeg_65'].rotation.x = -Math.PI / 2.5;
        if (this.bones['LeftLeg_59']) this.bones['LeftLeg_59'].rotation.x = Math.PI / 2;
        if (this.bones['RightLeg_64']) this.bones['RightLeg_64'].rotation.x = Math.PI / 2;

        // Adjust arms slightly
        if (this.bones['LeftShoulder_28']) this.bones['LeftShoulder_28'].rotation.z = -Math.PI / 4;
        if (this.bones['LeftArm_27']) this.bones['LeftArm_27'].rotation.x = -Math.PI / 6;
        if (this.bones['LeftForeArm_26']) this.bones['LeftForeArm_26'].rotation.x = -Math.PI / 4;

        if (this.bones['RightShoulder_52']) this.bones['RightShoulder_52'].rotation.z = Math.PI / 4;
        if (this.bones['RightArm_51']) this.bones['RightArm_51'].rotation.x = -Math.PI / 6;
        if (this.bones['RightForeArm_50']) this.bones['RightForeArm_50'].rotation.x = -Math.PI / 4;
    }

    drinkCoffee(coffeeOriginal: THREE.Object3D) {
        if (!this.bones['RightArm_51'] || !this.bones['RightForeArm_50'] || !this.bones['RightHand_49']) return;

        // Clone the coffee cup so the original shadow stays baked on the desk
        const coffeeClone = coffeeOriginal.clone();
        
        // Ensure scale is correct since coffee is inside decor scale group (900)
        coffeeClone.scale.set(900, 900, 900);
        
        const originalPos = new THREE.Vector3();
        coffeeOriginal.getWorldPosition(originalPos);
        coffeeClone.position.copy(originalPos);
        
        this.scene.add(coffeeClone);

        // Arm bones
        const rArm = this.bones['RightArm_51'];
        const rForeArm = this.bones['RightForeArm_50'];

        // Save original rotations
        const origArmRot = rArm.rotation.clone();
        const origForeArmRot = rForeArm.rotation.clone();

        // 1. Reach for the cup
        new TWEEN.Tween(rArm.rotation)
            .to({ x: -Math.PI / 2.5, y: -Math.PI / 6, z: Math.PI / 8 }, 800)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(rForeArm.rotation)
            .to({ x: -Math.PI / 8 }, 800)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => {
                // Attach cup to hand
                this.bones['RightHand_49'].attach(coffeeClone);
                // Adjust local pos/rot of cup in hand to look like holding
                coffeeClone.position.set(0, 5, 5);
                coffeeClone.rotation.set(0, 0, 0);

                // 2. Bring to mouth
                new TWEEN.Tween(rArm.rotation)
                    .to({ x: -Math.PI / 2, y: -Math.PI / 4, z: Math.PI / 4 }, 800)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .delay(200)
                    .start();

                new TWEEN.Tween(rForeArm.rotation)
                    .to({ x: -Math.PI / 1.2 }, 800)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .delay(200)
                    .onComplete(() => {
                        // 3. Put back on table
                        new TWEEN.Tween(rArm.rotation)
                            .to({ x: -Math.PI / 2.5, y: -Math.PI / 6, z: Math.PI / 8 }, 800)
                            .easing(TWEEN.Easing.Quadratic.InOut)
                            .delay(1000)
                            .start();

                        new TWEEN.Tween(rForeArm.rotation)
                            .to({ x: -Math.PI / 8 }, 800)
                            .easing(TWEEN.Easing.Quadratic.InOut)
                            .delay(1000)
                            .onComplete(() => {
                                // Detach cup back to scene at original pos
                                this.scene.add(coffeeClone);
                                coffeeClone.position.copy(originalPos);
                                coffeeClone.scale.set(900, 900, 900);

                                // 4. Arm back to rest
                                new TWEEN.Tween(rArm.rotation)
                                    .to({ x: origArmRot.x, y: origArmRot.y, z: origArmRot.z }, 800)
                                    .easing(TWEEN.Easing.Quadratic.InOut)
                                    .delay(200)
                                    .start();
                                
                                new TWEEN.Tween(rForeArm.rotation)
                                    .to({ x: origForeArmRot.x, y: origForeArmRot.y, z: origForeArmRot.z }, 800)
                                    .easing(TWEEN.Easing.Quadratic.InOut)
                                    .delay(200)
                                    .onComplete(() => {
                                        // Destroy clone
                                        this.scene.remove(coffeeClone);
                                        coffeeOriginal.userData.isDrinking = false;
                                    })
                                    .start();
                            })
                            .start();
                    })
                    .start();
            })
            .start();
    }
}

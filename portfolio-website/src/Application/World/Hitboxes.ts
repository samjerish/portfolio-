import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Application from '../Application';
import Camera from '../Camera/Camera';
import Mouse from '../Utils/Mouse';

const RENDER_WIREFRAME = true;

export default class Hitboxes {
    application: Application;
    scene: THREE.Scene;
    hitboxes: {
        [key: string]: {
            action: () => void;
        };
    };
    camera: Camera;
    mouse: Mouse;
    raycaster: THREE.Raycaster;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.mouse = this.application.mouse;
        this.raycaster = new THREE.Raycaster();

        this.createRaycaster();
        // this.createComputerHitbox(); // Removing this so it doesn't block the screen!
    }

    createRaycaster() {
        // Track the currently hovered paper to animate it
        let currentlyHoveredPaper: THREE.Object3D | null = null;
        
        window.addEventListener('mousedown', (event) => {
            const ndcX = (this.mouse.x / window.innerWidth) * 2 - 1;
            const ndcY = -(this.mouse.y / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(
                { x: ndcX, y: ndcY },
                this.camera.instance
            );
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
            
            if (intersects.length > 0) {
                const objectName = intersects[0].object.name;
                if (objectName === 'paper' || objectName === 'paper_stack_1' || objectName === 'paper_stack_2') {
                    const paperMesh = intersects[0].object;
                    
                    if (!paperMesh.userData.isAnimatingAway) {
                        paperMesh.userData.isAnimatingAway = true;
                        
                        const originalPos = new THREE.Vector3(
                            paperMesh.position.x, 
                            paperMesh.userData.originalY !== undefined ? paperMesh.userData.originalY : paperMesh.position.y, 
                            paperMesh.position.z
                        );
                        const originalRot = paperMesh.rotation.clone();

                        // Compute target position in front of camera
                        const dir = new THREE.Vector3();
                        this.camera.instance.getWorldDirection(dir);
                        const targetPos = this.camera.position.clone().add(dir.multiplyScalar(400));

                        // Compute target rotation so it faces the camera
                        const dummy = new THREE.Object3D();
                        dummy.position.copy(targetPos);
                        dummy.lookAt(this.camera.position);
                        // If the paper was modeled lying flat (normal is +Y), rotate so +Y points to camera
                        dummy.rotateX(-Math.PI / 2);

                        // Clone the paper so the original stays on the desk (avoiding black baked shadow spots)
                        const paperClone = paperMesh.clone();
                        this.scene.add(paperClone);

                        new TWEEN.Tween(paperClone.position)
                            .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 800)
                            .easing(TWEEN.Easing.Quadratic.InOut)
                            .start();

                        new TWEEN.Tween(paperClone.rotation)
                            .to({ x: dummy.rotation.x, y: dummy.rotation.y, z: dummy.rotation.z }, 800)
                            .easing(TWEEN.Easing.Quadratic.InOut)
                            .onComplete(() => {
                                window.open('https://drive.google.com/file/d/1GHR7zz6k51wn_LIt4UnoYSVmmbzLQS2l/view?usp=share_link', '_blank');
                                
                                // Reset after opening
                                setTimeout(() => {
                                    this.scene.remove(paperClone);
                                    paperMesh.userData.isAnimatingAway = false;
                                }, 500);
                            })
                            .start();
                    }
                }
                
                if (this.hitboxes && this.hitboxes[objectName]) {
                    this.hitboxes[objectName].action();
                }
            }
        });

        window.addEventListener('mousemove', () => {
            const ndcX = (this.mouse.x / window.innerWidth) * 2 - 1;
            const ndcY = -(this.mouse.y / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(
                { x: ndcX, y: ndcY },
                this.camera.instance
            );
            
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
            
            let hoveredInteractable = false;
            let hoveredPaperObject: THREE.Object3D | null = null;

            if (intersects.length > 0) {
                const objectName = intersects[0].object.name;
                if (objectName === 'paper' || objectName === 'paper_stack_1' || objectName === 'paper_stack_2') {
                    hoveredInteractable = true;
                    hoveredPaperObject = intersects[0].object;
                } else if (this.hitboxes && this.hitboxes[objectName]) {
                    hoveredInteractable = true;
                }
            }
            
            document.body.style.cursor = hoveredInteractable ? 'pointer' : 'default';

            // Animation logic for popping up the paper
            if (hoveredPaperObject !== currentlyHoveredPaper) {
                // If we were hovering a paper and now we're not, animate it back down
                if (currentlyHoveredPaper && !currentlyHoveredPaper.userData.isAnimatingAway) {
                    new TWEEN.Tween(currentlyHoveredPaper.position)
                        .to({ y: (currentlyHoveredPaper.userData.originalY || 0) }, 200)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                }

                // If we are now hovering a new paper, animate it up
                if (hoveredPaperObject && !hoveredPaperObject.userData.isAnimatingAway) {
                    if (hoveredPaperObject.userData.originalY === undefined) {
                        hoveredPaperObject.userData.originalY = hoveredPaperObject.position.y;
                    }
                    new TWEEN.Tween(hoveredPaperObject.position)
                        .to({ y: hoveredPaperObject.userData.originalY + 20 }, 200)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                }

                currentlyHoveredPaper = hoveredPaperObject;
            }
        });
    }

    createComputerHitbox() {
        this.createHitbox(
            'computerHitbox',
            () => {
                // this.camera.focusOnMonitor();
            },
            new THREE.Vector3(0, 650, 0),
            new THREE.Vector3(2000, 2000, 2000)
        );
    }

    createHitbox(
        name: string,
        action: () => void,
        position: THREE.Vector3,
        size: THREE.Vector3
    ) {
        const wireframeOptions = RENDER_WIREFRAME
            ? {
                  //   wireframe: true,
                  //   wireframeLinewidth: 50,
                  opacity: 1,
              }
            : {};

        // create hitbox material
        const hitboxMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            ...wireframeOptions,
        });

        // create hitbox
        const hitbox = new THREE.Mesh(
            new THREE.BoxBufferGeometry(size.x, size.y, size.z),
            hitboxMaterial
        );

        // set name of the hitbox object
        hitbox.name = name;

        // set hitbox position
        hitbox.position.copy(position);

        // add hitbox to scene
        this.scene.add(hitbox);

        // add hitbox to hitboxes
        this.hitboxes = {
            ...this.hitboxes,
            [name]: {
                action,
            },
        };
    }
}

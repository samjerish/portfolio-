import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';
import GithubActivity from '../Utils/GithubActivity';

export default class Decor {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    bakedModel: BakedModel;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        this.bakeModel();
        this.setModel();
        this.updatePlantFromActivity();
    }

    bakeModel() {
        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.decorModel,
            this.resources.items.texture.decorTexture,
            900
        );
    }

    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }

    async updatePlantFromActivity() {
        const decorGroup = this.bakedModel.getModel();
        const plant = decorGroup.getObjectByName('plant');
        
        if (plant && plant instanceof THREE.Mesh) {
            // Clone the material so it can be tinted independently
            plant.material = plant.material.clone();
            
            // Fetch activity score for github username
            const score = await GithubActivity.getActivityScore('samjerish');
            
            const material = plant.material as THREE.MeshBasicMaterial;
            
            if (score > 10) {
                // Thriving (highly active)
                plant.scale.set(950, 1000, 950); 
                material.color = new THREE.Color(0xbbffbb); // vibrant green tint
            } else if (score > 0) {
                // Normal (active)
                plant.scale.set(900, 900, 900);
                material.color = new THREE.Color(0xffffff); // default baked colors
            } else {
                // Dry (inactive)
                plant.scale.set(800, 700, 800); // smaller and droopy
                material.color = new THREE.Color(0xccaa77); // yellowish-brown dry tint
            }
        }
    }
}

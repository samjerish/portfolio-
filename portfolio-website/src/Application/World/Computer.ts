import Application from '../Application';
import Resources from '../Utils/Resources';
import BakedModel from '../Utils/BakedModel';

export default class Computer {
    application: Application;
    resources: Resources;
    bakedModel: BakedModel;

    constructor() {
        this.application = new Application();
        this.resources = this.application.resources;

        this.setModel();
    }

    setModel() {
        // Use the original baked computer setup — same approach as environment & decor.
        // The model + texture are baked in Blender so no extra lights are needed.
        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.computerModel,
            this.resources.items.texture.computerTexture,
            900 // same scale as environment and decor
        );

        this.application.scene.add(this.bakedModel.getModel());
    }
}

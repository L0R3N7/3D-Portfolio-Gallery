export class Theme{
    id : number;
    thumbnail_url: string;
    mat_wall_or_object: string;
    mat_floor ?: string;
    light_intensity: number;
    model_path ?: string;
    isFor3D: boolean;


  constructor(id: number, thumbnail_url: string, mat_wall_or_object: string, light_intensity: number, isFor3D: boolean = true, mat_floor?: string, model_path?: string) {
    this.id = id;
    this.thumbnail_url = thumbnail_url;
    this.mat_wall_or_object = mat_wall_or_object;
    this.mat_floor = mat_floor;
    this.light_intensity = light_intensity;
    this.model_path = model_path;
    this.isFor3D = isFor3D;
  }
}
